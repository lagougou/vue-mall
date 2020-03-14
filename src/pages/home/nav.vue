<template>
    <nav class="nav-list">
        <ul class="nav-list">
            <li class="nav-list-item" v-for="(item, index) in navs" :key="index">
                <a :href="item.linkUrl" class="nav-list-link">
                <img class="nav-list-pic"  :src="item.picUrl" alt="">
                <span>{{item.text}}</span>
                </a>
                
            </li>

        </ul>
    </nav>
</template>
<script>
    import {navItems} from './config';
    export default {
        name: 'nvalist',
        data() {
            return {
                navs: navItems
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixins';
    .nav-list{
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        &-item{
            flex-basis: 20%;
            margin-bottom: 15px;
        };
        &-link{
            @include flex-center(column);
        };
        &-pic{
            width: 60%;
            margin-bottom: 8px;
        }

        
    }
</style>