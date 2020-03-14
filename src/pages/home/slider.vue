<template>
    <div class="slider-wrap">
      <swiper :options="swiperOption" v-if="sliders.length">
        <swiper-slide  v-for="(item, index) in sliders" :key="index"><img :src="item.picUrl" alt=""></swiper-slide>
        
        <div class="swiper-pagination" v-if="swiperOption.pagination"  slot="pagination"></div>
      </swiper> 
      <Loading v-else></Loading> 
    </div>
    
    
</template>
<style lang="scss" scoped>
    .slider-wrap{
      height: 183px;
    }
    .swiper-container{
        width: 100%;
        height: 100%;
        & img{
            width: 100%;
            height: 100%;
        }
    }
</style>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import {getHomeSlider} from '../../api/home';
import Loading from '../../base/loading';
export default {
    data(){
        return {
            sliders:[]
            
        }
    },
    name: 'slider',
    components: {
        swiper,
        swiperSlide,
        Loading
    },

    created() {
        this.getSliders();
        this.swiperOption={
              direction: 'horizontal',
              watchOverflow: true,
              loop: this.sliders.length === 1 ? false : true,
              pagination: {
                  el: '.swiper-pagination',
              },
              autoplay:{
                  stopOnLastSlide: true,
                  disableOnInteraction: false
              }
            };
    },

    methods: {
        getSliders(){
            getHomeSlider().then(data => {
               
                this.sliders = data;
            });
        }
    }
}
</script>