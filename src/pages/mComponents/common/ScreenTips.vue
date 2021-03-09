<template>
    <transition name="slide-fade">
        <div class="mask_nav_tips" v-if="isMaskScreenTips">
            <span>推薦使用豎屏瀏覽哦~</span>
        </div>
    </transition>
</template>

<script>
export default {
    name: "ScreentipsMask",
    props: {
        options: Object,
    },
    computed: {
        isMaskScreenTips: function () {
            return this.$store.state.isMaskScreenTips;
        },
    },
    methods: {
    }
};
</script>

<style lang="stylus" scoped>
/* * fade animate */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

/* * slide-fade animate */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}

.slide-fade-leave-active {
    transition: all 0.0000000001s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}

.mask_nav_tips {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999999;
    text-align: center;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.65);
    span{
        color: #fff
        font-size: .235rem
    }
}
</style>