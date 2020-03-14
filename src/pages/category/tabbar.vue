<template>
    <div class="category-tabbar">
        <Scroll ref="scroll">
            <ul class="tabbar" v-if="itemList.length">
                <li class="tabbar-item" v-for="(item, index) in itemList" :key="index" @click="switchTab(item.id)" :class="{active : curId===item.id}">{{item.name}}</li>
            </ul>
        </Scroll>
    </div>
    
</template>
<script>
import Scroll from '../../base/scroll';
import {categoryNames} from './config';

export default {
    data(){
       return {
         curId: ''
       }
    },
    name: 'CategoryTab',
    components: {
        Scroll
    },


    created(){
        this.itemList = categoryNames;
        this.switchTab(this.itemList[0].id);
    },

    methods: {
        switchTab(id){
            if (this.curId === id){
                return;
            }
            this.curId = id;
            this.$emit('switch-tab', id);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins"; 
    .category-tabbar{
        width: 80px;
        height: 100%;
        overflow: hidden;
        .tabbar-item{
            display: block;
            font-size: $font-size-l;
            color: black;
            padding: 8px 0;
            background-color: #fff;
            border-bottom: 1px solid $border-color;
            text-align: center;
            width: 100%;
            &.active{
                color: $link-active-color;
                background-color: transparent;
            }
        }
        
    }
</style>