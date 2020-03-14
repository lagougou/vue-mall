<template>
    <div>
        <CNavbar class="header">
            <div slot="center"><SearchBox placeholder="开学有礼，好货5折起" @query="getQuery" @click.native="goToSearch"></SearchBox></div>
            <i class="iconfont icon-msg" slot="right"></i>
        </CNavbar>
    </div>
</template>
<script>
 import CNavbar from '@/base/navbar';
 import SearchBox from '@/base/search-box';
export default {
    name: 'category-header',
    components: {
        CNavbar,
        SearchBox
    },

    methods: {
        goToSearch(){},
        getQuery(str){
            console.log(str);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins"; 
    div.header{
        background-color: $header-bgc-translucent;
        transition: background-color 0.4s;
        .iconfont{
            color: $icon-color-default;
            font-size: $icon-font-size;
        }

        .search-box-wrapper{
                background-color: #ccc;
            }
        
    }
    
</style>