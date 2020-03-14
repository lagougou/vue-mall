<template>
    <div class="common-navbar">
        <div class="common-navbar-left" v-if="$slots.left">
            <slot name="left"></slot>
        </div>
        <div class="common-navbar-center" v-if="$slots.center">
            <slot name="center"></slot>
        </div>
        <div class="common-navbar-right" v-if="$slots.right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/scss/mixins';
    .common-navbar{
        @include flex-between();
        height: 50px;
        background-color: #fff;
        &-left {
            margin-left: 10px;
        }

        &-center{
            flex: 1;
            margin: 0 10px;
        }

        &-right{
            margin-right: 10px;
        }
    }
</style>
<script>
  export default {
    name: 'CNavbar'
  }
</script>
