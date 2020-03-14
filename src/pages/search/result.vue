<template>
    <div class="results">
        <div v-if="isloading" class="loading">
            <Loading></Loading>
        </div>
        
        <div class="results-text" v-if="!results.length && !isloading">没有结果</div>
        <ul v-if="results.length && !isloading" class="results-list">
            <li  class="results-item" v-for="(item, index) in results" 
            :key="index"
            @click=" $_search_selectItem(item[0])">
                {{item[0]}}
            </li>
        </ul>
    </div>
</template>

<script>
import {getSearchResult} from '@/api/hotcontent';
import Loading from '../../base/loading';
import {searchMixin} from '../../assets/js/mixins';

export default {
    name: 'search-result',
    data(){
        return {
            isloading: false,
            results: []
        }
    },

    components: {
        Loading
    },

    mixins: [searchMixin],
    props: {
        query :{
            type: String,
            default: ''
        }
    },

    watch: {
        query(query){
            this.isloading = true;
            getSearchResult(query).then(res => {
                this.results = res;
                this.isloading = false;
                console.log(res);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .results{
        background-color: #fff;
        border-top: 1px solid #e5e5e5;
        .loading{
            padding: 20px 0;
        }
        &-text{
            text-align: center;
            padding: 10px 0;
        }
        .results-list{
            padding-left: 8px;
            .results-item{
                border-bottom: 1px solid #e5e5e5;
                height: 30px;
                line-height: 30px;
                font-size: 10px;
            }
        }
    }
</style>