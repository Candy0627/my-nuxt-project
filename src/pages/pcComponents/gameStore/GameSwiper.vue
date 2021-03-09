<template>
    <div class="game_swiper_wrapper_pc">
        <div class="swiper">
            <swiper :options="swiperOption" v-if="swiperShow">
                <swiper-slide
                    v-for="(item, index) in userRegisteredGamesList"
                    :key="index"
                    :class="{active:gameId == item.id}"
                >
                    <div @click="handleGameStoreIndex(item.id, item.uuid, index)">
                        <img :src="item.icon_img" width="100%" class="swiper_img" />
                        <span class="game_name ep-one">{{item.name}}</span>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GameSwiper",
    props: {
        curId: Number,
        gameId: Number,
        userRegisteredGamesList: Array,
    },
    data() {
        return {
            swiperOption: {
                grabCursor: true,
                slidesPerView: 4,
                spaceBetween: 20,
                loop: false,
                prevButton: ".game_swiper_wrapper_pc .swiper-button-prev",
                nextButton: ".game_swiper_wrapper_pc .swiper-button-next",
            },
            swiperId: 0,
        };
    },
    computed: {
        swiperShow: function () {
            return this.userRegisteredGamesList.length;
        },
    },
    watch: {
        gameId: function () {
            return this.swiperId;
        },
    },
    mounted() {
        this.swiperId = this.gameId;
    },
    methods: {
        handleGameStoreIndex: function (gameId, uuid, index) {
            this.swiperId = gameId;
            this.$emit("getGameStoreSwiperIndex", gameId, uuid, index);
        },
    },
};
</script>

<style lang="stylus" scoped>
.game_swiper_wrapper_pc >>> .active {
    border: 1px solid #fcc814;
    box-sizing: border-box;
}

.swiper-slide {
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid #d1d1d1;

    .swiper_img {
        width: 64px;
    }
}

.game_swiper_wrapper_pc >>> .active::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 26px;
    height: 26px;
    background: url('../../../assets/imgs/selected.png') no-repeat;
    background-size: 100% 100%;
}

.game_swiper_wrapper_pc >>> .swiper-button-prev {
    color: #fff;
    left: -80px;
    width: 43px;
    height: 63px;
    top: 45px;
    background: url('../../../assets/imgs/prev.png') no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
}

.game_swiper_wrapper_pc >>> .swiper-button-next {
    color: #fff;
    right: -80px;
    width: 43px;
    height: 63px;
    top: 45px;
    transform: rotate(180deg);
    background: url('../../../assets/imgs/prev.png') no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
}

.swiper-wrapper {
    width: 519px;
}

.game_swiper_wrapper_pc {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;

    .game_name {
        display: block;
        margin: 0 auto;
        margin-top: 1px !important;
        padding-top: 6px !important;
        text-align: center;
        border-top: 1px dashed #5d5d5d;
        font-size: 15px;
    }
}
</style>