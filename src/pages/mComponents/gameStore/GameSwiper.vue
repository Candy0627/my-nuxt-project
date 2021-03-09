<template>
    <div class="game_swiper_wrapper_m">
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
import banner01 from "@/assets/imgs/r2.png";
import banner02 from "@/assets/imgs/r3.png";
import banner03 from "@/assets/imgs/r2.png";
import banner04 from "@/assets/imgs/r4.png";
import banner05 from "@/assets/imgs/r2.png";
export default {
    name: "GameSwiper",
    props: {
        curId: Number,
        gameId: Number,
        userRegisteredGamesList: Array
    },
    data() {
        return {
            swiperList: [banner01, banner02, banner03, banner04, banner05],
            swiperOption: {
                grabCursor: true,
                slidesPerView: 4,
                spaceBetween: 20,
                loop: false,
                prevButton: ".game_swiper_wrapper_m .swiper-button-prev",
                nextButton: ".game_swiper_wrapper_m .swiper-button-next"
            },
            swiperId: 0
        };
    },
    computed: {
        swiperShow: function() {
            return this.swiperList.length;
        }
    },
    watch: {
        gameId: function() {
            return this.swiperId;
        }
    },
    mounted() {
        this.swiperId = this.gameId;
    },
    methods: {
        handleGameStoreIndex: function(gameId, uuid, index) {
            this.swiperId = gameId;
            // console.log("当前游戏图标的id", this.swiperId, curId, uuid);
            this.$emit("getGameStoreSwiperIndex", gameId, uuid, index);
        }
    }
};
</script>

<style lang="stylus" scoped>
.game_swiper_wrapper_m >>> .active {
    border: 1px solid #fcc814;
    box-sizing: border-box;
}

.swiper-slide {
    padding: .05rem;
    box-sizing: border-box;
    border: 1px solid #d1d1d1;

    .swiper_img {
        width: .64rem;
    }
}

.game_swiper_wrapper_m >>> .active::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: .26rem;
    height: .26rem;
    background: url('../../../assets/imgs/selected.png') no-repeat;
    background-size: 100% 100%;
}

.game_swiper_wrapper_m >>> .swiper-button-prev {
    color: #fff;
    left: -0.8rem;
    width: .43rem;
    height: .63rem;
    top: .45rem;
    background: url('../../../assets/imgs/prev.png') no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
}

.game_swiper_wrapper_m >>> .swiper-button-next {
    color: #fff;
    right: -0.8rem;
    width: .43rem;
    height: .63rem;
    top: .45rem;
    transform: rotate(180deg);
    background: url('../../../assets/imgs/prev.png') no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
}

.swiper-wrapper {
    width: 5.19rem;
}

.game_swiper_wrapper_m {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;

    .game_name {
        display: block;
        margin: 0 auto;
        margin-top:.02rem;
        padding-top: 1px;
        text-align: center;
        border-top: 1px dashed #5d5d5d;
        font-size: .16rem;
    }
}
</style>