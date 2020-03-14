<template>
    <div class="hot-product">
       <h4 class="hot-title">
        热门搜索
       </h4> 
       <div class="loading-content" v-if="!hotList.length">
            <Loading></Loading>
       </div>
       <ul class="hot-list" v-else>
            <li class="hot-item" v-for="(item, index) in hotList" :key="index" @click="$_search_selectItem(item.hotWord)">{{item.hotWord}}</li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>

    .hot-product{
        height: 100px;
        background-color: #fff;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        padding-left: 10px;
        .hot-title{
            font-size: 14px;
            color: #131313;
            font-weight: bold;
            padding: 8px 0;
        }

        .hot-list {
            display: flex;
            flex-wrap: wrap;
            .hot-item{
                padding: 8px;
                background-color: #f0f2f5;
                border-radius: 4px;
                margin: 0 10px 10px 0;
                color: #686868;
            }
        }
    }
</style>
<script>
import Loading from '../../base/loading';
import {getHotList} from '../../api/hotcontent';
import {searchMixin} from '../../assets/js/mixins';
 
export default {
    name: 'product-hot',
    components: {
        Loading
    },
    data(){
        return {
            hotList: []
        }
    },
    mixins: [searchMixin],
    created(){
        
        getHotList().then(res => {
            // console.log(res);
            this.hotList = res;
        });
    },

    methods: {
        selectItem(keyword){
            let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
            
            if (keywords.length !== 0){
                keywords = keywords.filter(val => val !== keyword);
            }

            keywords.unshift(keyword);
            storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);
            location.href = `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&q=${keyword}`;
        }
    }
}
</script>