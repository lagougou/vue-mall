<template>
    <div class="history" v-if="historys.length">
        <h4 class="history-title">历史搜索</h4>
        <transition-group class="history-list" tag="ul" name="list">
            <li class="history-item" v-for="(item, index) in historys" :key="index" @click="$_search_selectItem(item)">{{item}}<i class="iconfont icon-delete" @click.stop="removeItem(item)"></i></li>
        </transition-group>
        <div class="clear-history"><a class="clear-button" @click="showConfirm"><i class="iconfont icon-clear"></i>清空历史记录</a></div>
    </div>
</template>
<script>
import storage from '../../assets/js/storage';
import {SEARCH_HISTORY_KEYWORD_KEY} from '@/pages/search/config';
import {searchMixin} from '../../assets/js/mixins';

export default {
    name: 'product-history',
    data(){
        return{
            historys: []
        }
        
    },
    mixins: [searchMixin],
    created(){
        this.getHisotory();
    },
    methods:{
        getHisotory(){
            this.historys = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
        },

        removeItem(item){
            this.historys = this.historys.filter(val => val !== item);
            storage.set(SEARCH_HISTORY_KEYWORD_KEY, this.historys);
            this.$emit('removeItem', item);
        },
        showConfirm(){
            this.$emit('show-confirm');
        },
        clear() {
            storage.remove(SEARCH_HISTORY_KEYWORD_KEY);
            this.getHisotory();
        }
    }


}
</script>
<style lang="scss">
    .history{
        margin-top: 10px;
        background-color: #fff;
        &-title{
             font-size: 14px;
            color: #131313;
            font-weight: bold;
            padding: 8px 0;
            padding-left: 10px;
            border-bottom: 1px solid #e5e5e5;
        }
        .history-list{
            padding-left: 8px;
            .history-item{
                border-bottom: 1px solid #e5e5e5;
                height: 30px;
                line-height: 30px;
                display: flex;
                justify-content: space-between;
                .iconfont{
                    display: inline-block;
                    margin-top: 1px;
                    margin-right: 10px;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        .list-enter-active, 
        .list-leave-active {
            transition: height 0.1s;
        }
        .list-enter, 
        .list-leave-to {
            height: 0;
        }
        .clear-history{
            border-top: 1px solid #e5e5e5;
            text-align: center;
            padding: 12px 0 20px;
            .clear-button{
                display: inline-block;
                 padding: 8px;
                 width: 80%;
                 border-radius: 4px;
                 border: 1px solid #ccc;
                 .iconfont {
                     margin-right: 4px;
                     position: relative;
                     top: 1px;
                 }
            }
           
        }
    }
</style>
