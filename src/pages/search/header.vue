<template>
    <div class="search">
       <CNavbar class="header"> 
       <i class="iconfont icon-back" slot="left" @click="goBack"></i>
            <SearchBox class="search-box" placeholder="开学有礼，好货5折起" slot="center" @query="showText"></SearchBox>
        </CNavbar>
    </div>
</template>
<style lang="scss">
        @import '../../assets/scss/mixins';
        .header{
            .icon-back{
                font-size: 14px;
            }
           
            .search-box-wrapper{
                background-color: #f1f1f1;
            }
        }
</style>
<script>
import CNavbar from '@/base/navbar';
import SearchBox from '@/base/search-box';
export default {
    name: 'search-header',
    components: {
        CNavbar,
        SearchBox
    },
    methods:{
        goBack(){
            this.$router.back();
        },
        showText(text){
            this.$emit('showtext', text);
        }
    }
}
</script>

