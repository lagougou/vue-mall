<template>
    <div class="backtop" v-show="visible" @click="backToTop">
        <i class="iconfont icon-backtop">
        </i>
    </div>
</template>

<script>
    export default {
        name: 'BackTop',
        props: {
            visible: {
                type: Boolean,
                default: true
            }
        },

        methods: {
            backToTop(){
                console.log("backtop");
                this.$emit('back-top', null);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixins';
    .backtop{
        position: absolute;
        right: 10px;
        bottom: 10px;
        background-color: rgba(0,0,0,.6);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        @include flex-center();
        .iconfont{
            color: $icon-color-default;
            font-size: 32px;
        }
    }
</style>