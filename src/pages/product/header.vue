<template>
    <div class="g-product-header">
        <CNavbar>
            <i class="iconfont icon-back" slot="left" @click="goBack"></i>
            <div slot="center" class="text">商品详情</div>
            <i class="iconfont icon-msg" slot="right"></i>
        </CNavbar>
    </div>
</template>

<style lang="scss">
@import '../../assets/scss/mixins';
    .g-product-header{
        .common-navbar{
            background-color: $header-bgc-translucent;
            font-size: 14px;
            color: #fff;
            text-align: center;
            .iconfont {
                font-size: 14px;
            }
        }
    }
</style>
<script>
import CNavbar from '@/base/navbar';
import SearchBox from '@/base/search-box';

export default {
    name: 'product-header',
    components: {
        CNavbar
    },
    methods: {
        goBack(){
            this.$router.back();
        }
    },
    created(){
        this.obj = this.$route.params.obj;
        console.log(this.obj);
    }
}
</script>