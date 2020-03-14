<template>
    <div>
        <me-navbar class="header" v-show="isTransition" :class="{'trans-head': transStatu}">
            <i class="iconfont icon-scan" slot="left"></i>
            <div slot="center"><SearchBox placeholder="开学有礼，好货5折起" @query="getQuery" @click.native="goToSearch"></SearchBox></div>
            <i class="iconfont icon-msg" slot="right"></i>
        </me-navbar>        
    </div>
</template>
<style lang="scss" scoped>
    @import "../../assets/scss/mixins"; 
    div.header{
        background-color: transparent;
        transition: background-color 0.4s;
        .iconfont{
            color: $icon-color-default;
            font-size: $icon-font-size;
        }
        &.trans-head{
            background-color: $header-bgc-translucent;
        }
    }
    
</style>
<script>

import CNavbar from '@/base/navbar';
import SearchBox from '@/base/search-box';


export default {
    name:'HomeHeader',
    components:{
        'me-navbar': CNavbar,
        SearchBox
    },
    props: {
        transStatu:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isTransition : true,
        }
    },
    methods: {
        show(){
            this.isTransition = true;
        },

        hide(){
            this.isTransition = false;
        },
        getQuery(str) {
            console.log(str);
        },
        goToSearch() {
            this.$router.push('/search');    
        }
    }
}
</script>