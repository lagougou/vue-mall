<template>
    <div class="recommend">
        <h3 class="recommend-title">热卖推荐</h3>

        <ul class="recommend-list" v-if="recommends.length">
            <li v-for="(item, index) in recommends" :key="index" class="recommend-item">
                <!--  -->
                <router-link :to="{name: 'home-product', params: {id: item.baseinfo.itemId, obj: item}}" class="recommend-link">
                    <p class="recommend-pic"> <img v-lazy="item.baseinfo.picUrlNew" alt=""></p>
                    <p class="recommend-name">{{item.name.shortName}}</p>
                    <p class="origin-price">￥{{item.price.origPrice}}</p>
                    <p class="item-info"><span class="act-price">￥<span class="act-price-num">{{item.price.actPrice}}</span></span> <span class="item-sold-count">{{item.remind.soldCount}}件已售</span></p>
                </router-link>
            </li> 
        </ul>
        <div class="loading" v-else>
            <Loading inline></Loading>
        </div>
    </div>
    
</template>
<script>
   import {getHomeRecommend} from '../../api/home';
   import Loading from '../../base/loading';
import { resolve } from 'url';
    export default {
        name: 'recommend',
        data() {
            return {
                curPage: 1,
                totalPage: 1,
                recommends: []
            };
        },
        created() {
          this.getRecommend();
        },
        components: {
            Loading
        },
        methods: {
            update(){
                return this.getRecommend();
            },
            getRecommend(){
                if (this.curPage > this.totalPage) {
                    return Promise.reject(new Error('没有更多的数据了...'));
                }
                return getHomeRecommend(this.curPage).then(data => {
                    return new Promise(resolve => {
                        if (data) {
                            this.curPage++;
                            this.totalPage = data.totalPage;
                            this.recommends = this.recommends.concat(data.itemList);
                            this.$emit('loaded', this.recommends);
                            resolve();
                        }
                    });
  
                })
            }
        }
        
    }

</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixins';
    .recommend{
        width: 100%;
        .recommend-title{
            font-size: 14px;
            text-align: center;
            position: relative;
            background-color: transparent;
            color: #5d5d5d;
        }
        .loading{
          padding: 50px 0 ;
        }
        &-title::before{
                content: ' ';
                display: block;
                height: 1px;
                background-color: #ccc;
                position: absolute;
                width: 40%;
                top: 50%;
                left: 0;
                z-index: 5;
            }
        &-title::after{
                content: ' ';
                display: block;
                height: 1px;
                background-color: #ccc;
                position: absolute;
                width: 40%;
                top: 50%;
                
                right: 0;
                z-index: 5;
            }

    }
    
    
     .recommend-list{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
        .recommend-item{
            width: 48.5%;
            margin-top: 10px;
            box-shadow: 0 0 2px 0 rgba(95, 93, 93, 0.3);
            background-color: #fff;
            padding-bottom: 8px;
            .recommend-pic {
                width: 100%;
                padding-top: 100%;
                position: relative;
                & img{
                    width: 100%;
                    height: 100%;

                    position: absolute;
                    top: 0;
                }
            }
            

            .recommend-name{
                color: #1d1919;
                margin-left: 4px;
                margin-top: 8px;
                height: 36px;
                @include multiline-ellipsis();
            }

            .origin-price{
                color: #bbb;
                text-decoration: line-through;
                margin-left: 4px;
                margin-top: 8px;
            }

            .item-info{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
                .act-price{
                    color: $link-active-color;
                    margin-left: 4px;
                    &-num{
                        font-size: 20px;
                    }
                }

                .item-sold-count{
                    color:#bbb;
                    margin-right: 6px;
                }
            }
        }
     }   
</style>