<template>
    
    <swiper :options="swiperOption" ref="swiper">
        <div class="mine-loading-pulldown" v-if="pullDown">
            <MineLoad :text="initialText" inline ref="pullDownLoading"></MineLoad>
        </div>
        <swiper-slide>
            <slot></slot>
        </swiper-slide>
        <div class="swiper-scrollbar" v-if="scrollbar"  slot="scrollbar"></div>
        <div class="mine-loading-pullup" v-if="pullUp">
            <MineLoad :text="initialText" inline ref="pullUpLoading"></MineLoad>
        </div>
    </swiper>
</template>
<style lang="scss" scoped>
    .swiper-container {
        overflow: hidden;
        width: 100%;
        height: 100%;
     };

    .swiper-slide {
        height: auto;
    }
    .mine-loading-pulldown{
        position:absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
        height: 80px;
        
    }

    .mine-loading-pullup{
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 50px;
    }
    
</style>
<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import MineLoad from '../loading';
import {PULL_DOWN_TEXT_INIT, PULL_DOWN_TEXT_START, PULL_DOWN_TEXT_ING, PULL_DOWN_HEIGHT, PULL_DOWN_TEXT_END, 
PULL_UP_TEXT_INIT, PULL_UP_TEXT_START, PULL_UP_TEXT_ING, PULL_UP_HEIGHT, PULL_UP_TEXT_END} from './config';
 
export default {
    
    
    name: 'scroll',
    components:{
        swiper,
        swiperSlide,
        MineLoad
    },
    props: {
        scrollbar: {
            type: Boolean,
            default: true
        },
        data: {
            type: [Array, Object]
        },
        pullDown: {
            type: Boolean,
            default: false
        },
        pullUp: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        data() {
            console.log(this.data);
           this.update(); 
        }
    },
    methods: {
        update() {
            this.$refs.swiper.update();
        },

        scroll() {
            const swiper = this.$refs.swiper.swiper;
            if (swiper.translate > 0){ 
                if (!this.pullDown) {
                    return;
                }

                if (swiper.translate > PULL_DOWN_HEIGHT) {
                    this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
                } else {
                    this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
                } 
            }else {
                if (!this.pullUp) {
                    return;
                }
                let totalHeight = parseFloat(swiper.wrapperEl.style.height);
                let isPullEnd = -(swiper.translate - swiper.height + totalHeight) > PULL_UP_HEIGHT;
                
                if(isPullEnd){
                    this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
                }else{
                    this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
                }
            }
            //swiper.height + Math.abs(swiper.translate)

            this.$emit('scroll', swiper.translate);
        },

        touchEnd() {
            const swiper = this.$refs.swiper.swiper;
            let totalHeight = parseFloat(swiper.wrapperEl.style.height);
            let isPullEnd = -(swiper.translate - swiper.height + totalHeight) > PULL_UP_HEIGHT;
            if (swiper.translate > PULL_DOWN_HEIGHT){ 
                if (!this.pullDown) {
                    return;
                }
                this.ispulling = true;
                swiper.allowTouchMove = false;
                swiper.setTransition(swiper.params.speed);
                swiper.setTranslate(PULL_DOWN_HEIGHT);
                swiper.params.virtualTranslate = true;
                this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
                this.$emit('pull-down', this.pullDownEnd);
            } else if (isPullEnd) {
                if (!this.pullUp) {
                    return;
                }
                swiper.allowTouchMove = false;
                swiper.setTransition(swiper.params.speed);
                swiper.setTranslate( swiper.height - totalHeight - PULL_UP_HEIGHT);
                swiper.params.virtualTranslate = true;
                this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
                this.$emit('pull-up', this.pullUpEnd);
            }

            
        },

        pullDownEnd(){
            const swiper = this.$refs.swiper.swiper;
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
            swiper.params.virtualTranslate = false;
            swiper.allowTouchMove = true;
            swiper.setTransition(swiper.params.speed);
            swiper.setTranslate(0);
            this.ispulling = false;
            this.$emit('pull-down-transition-end', null);
        },

        pullUpEnd(){
            const swiper = this.$refs.swiper.swiper;
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
            swiper.params.virtualTranslate = false;
            swiper.allowTouchMove = true;
        },

        scrollEnd(){
            const swiper = this.$refs.swiper.swiper;
            this.$emit('scroll-end', swiper.translate, swiper, this.ispulling);
        },

        backTop(speed, runCallbacks){
            //console.log(this.$refs.swiper);
            this.$refs.swiper.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks);
        }
    },
    data() {

        return{
            ispulling: false,
            initialText: PULL_DOWN_TEXT_INIT,
            swiperOption:{
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: true,
                setWrapperSize: true,
                scrollbar: {
                    el: this.scrollbar ? '.swiper-scrollbar' : null,
                    hide: true
                },
                on: {
                    sliderMove: this.scroll,
                    touchEnd: this.touchEnd,
                    transitionEnd: this.scrollEnd
                }
            }
        }
    }
    
}
</script>