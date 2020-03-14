<template>
    <div>
      <swiper :options="swiperOption" v-if="sliders.length">
        <swiper-slide  v-for="(item, index) in sliders" :key="index"><img :src="item.picUrl" alt=""></swiper-slide>  
        <div class="swiper-pagination" v-if="swiperOption.pagination"  slot="pagination"></div>
      </swiper>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Loading from '../../base/loading';
import {getProductDetail} from '@/api/getProductDetail';
export default {
    name: 'product-slider',
    data(){
        return {
            sliders: []
        }
        
    },
    components: {
        swiper,
        swiperSlide,
        Loading
    },
    created(){
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
        
        getProductDetail(this.$route.params.id);
    }
}
</script>