<template>
    <div class="loading" :class="{'loading-img-inline': inline}">
        <span class="loading-img" v-if="indicator==='on'">
        <slot><img src="./loading.gif" alt=""></slot></span>
        
        <span class="loading-text" v-if="loadingText">{{loadingText}}</span>
    </div>
</template>
<style lang="scss" scoped>
    @import "src/assets/scss/mixins";

    .loading{
        height: 100%;
        width: 100%;
        @include flex-center(column);
        &-img ~ &-text{
            margin-top:6px;
        }
    }
    .loading-img-inline{
        flex-direction: row;
        .loading-img ~ .loading-text{
            margin-top: 0;
            margin-left: 6px;
        }
    }
    
</style>
<script>
  export default {
    name: 'loading',
    data() {
        return {
            imgUrl: require('@/assets/img/loading.gif'),
            loadingText: this.text
        }
    },
    methods: {
        setText(text) {
            this.loadingText = text;
        }
    },

    watch: {
        text(text) {
            this.loadingText = text;
        }
    },
    props:{
        indicator:{
            type: String,
            default: 'on',
            validator(value){
                return ['on', 'off'].indexOf(value) > -1;
            }
        },
        text:{
            type: String,
            default: '加载中...'
        },
        inline:{
            type: Boolean,
            default: false
        }
    }
  }
</script>