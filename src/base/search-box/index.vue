<template>
    <div class="box">
        <div class="search-box-wrapper">
            <i class="iconfont icon-search"></i>
            <input type="text" title="" class="search-box" :placeholder="placeholder" v-model="query">
            <i class="iconfont icon-close" v-show="query" @click="clear"></i>    
        </div>
    </div>
</template>
<script>
    import {debounce} from '@/assets/js/utils';
    export default {
        name: 'search-box',
        props:{
            "placeholder": {
                type: String,
                default: '请输入搜索内容'
            }
        },
        data() {
            return {
                query: '',
            }
        },
        watch: {
             query: debounce( function (){
                this.$emit('query' ,this.query);
            })
        },
        methods: {
            clear() {
                this.query = '';
            }           
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixins';
    .box{
        .search-box-wrapper{
        background-color: #fff;
        height: 22px;
        border-radius: 10px;
        @include flex-center();
        .iconfont{
            display: block;
            font-size: 14px;
            padding: 0 3px;
        }
        .search-box{
            display: block;
            flex: 1;
            margin: 0 3px;
            height: 100%;
            border: none;
            outline: none;
            margin-right: 10px;
            font-size: $font-size-base - 2;
            background-color: transparent;
        }
    }
    }
    
</style>