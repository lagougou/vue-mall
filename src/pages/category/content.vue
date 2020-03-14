<template>  
        
            <div class="g-content">
               
                <Scroll
                 @scroll-end="scrollEvent" pull
                 ref="mineScroll">
                    
                    <div class="banner" v-if="content.banner">
                        <a :href="content.banner.linkUrl"><img class="banner-img" :src="content.banner.picUrl" alt=""></a>
                    </div>

                    <div class="content-item" v-if="content.data">
                        <div class="content-item-focus" v-for="(item1, index) in content.data" :key="index">
                            <h4 class="title">{{item1.name}}</h4>
                            <div class="item-list-view">
                                <p class="item-focus" v-for="(item2, index) in item1.itemList" :key="index">
                                    <img class="item-pic" :src="item2.picUrl" alt="">
                                    <span class="item-name">{{item2.name}}</span>
                                </p>
                            </div>
                        </div>  
                    </div>
                </Scroll>
                
                <div class="load-wrapper" v-if="!loadingDone">
                    <Loading></Loading>
                </div>

                
                <div class="g-backtop-container">
                    <BackTop :visible="isBacktopVisible" @back-top="backToTop"></BackTop>
                </div> 
                
        
            </div>
           
            
           
        
        
    
    
</template>

<script>
import {getContent} from '../../api/category.js';
import Scroll from '../../base/scroll'; 
import { resolve } from 'url';
import Loading from '../../base/loading';
import BackTop from '../../base/backtop';

export default {
    name: 'CategoryContent',
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            content: {},
            loadingDone: false,
            isBacktopVisible: false
        }
    },
    watch: {
        id(id) {
            this.loadingDone = false;
            this.getNewContent(this.id).then( () => {
                this.loadingDone = true;
                this.$refs.mineScroll.backTop(0);
                this.$refs.mineScroll.update(); 
            }
            );
        }
    },

    methods: {
        getNewContent(id){
             return getContent(id).then(data=>{
                return new Promise(resolve => {
                  if(data){
                    this.content = data;
                    resolve();
                  }   
                })
                
             });
        },
        backToTop(){

            this.$refs.mineScroll.backTop();
        },
        scrollEvent(translate, swiper, pulling){
            console.log(translate);
            this.isBacktopVisible = -translate > swiper.height;
        }
    },
    components: {
        Scroll,
        Loading,
        BackTop
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';
    
    .g-content{
        position: relative;
        flex: 1;
        margin-left: 8px;
        height: 100%;
        .load-wrapper{
            width: 60px;
            height: 40px;
            background-color: $modal-bgc;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -30px;
            margin-top: -20px;
            z-index: 1200;
        }
        .banner{
            margin-top: 8px;
            &-img {
                width: 100%;
                height: 96px;
            }
        }

        .content-item-focus{
            margin-top: 8px;
            .title{
              font-size: $font-size-base;
              color: black;
              font-weight: bold; 
            }

            .item-list-view{
                margin-top: 5px;
                width: 100%;
                padding: 6px;
                @include flex-center();
                flex-wrap: wrap;
                background-color: #fff;

                .item-focus{
                    flex-basis: 33.3333%;
                    @include flex-center(column);

                    .item-pic {
                        width: 80px;
                        margin-bottom: 8px;
                    }
                    .item-name{
                        margin-bottom: 4px;
                    }
                }
            }
        }

        .g-backtop-container{
            bottom: 50px;
        }
    }
</style>