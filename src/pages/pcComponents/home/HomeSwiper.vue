<template>
    <div class="home_swiper_wrapper fl animated" v-if="options.isAni" :class="{fadeInUp: options.isAni}">
        <div class="swiper">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item, index) in swiperList" :key="index">
                    <a :href="item.jump_link" target="_blank">
                        <img :src="item.img_url" width="100%" />
                    </a>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <!-- <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeSwiper",
    props: {
        swiperList: Array
    },
    data() {
        return {
            options:{
                isAni:false
            },
            swiperOption: {
                pagination: ".home_swiper_wrapper .swiper-pagination",
                paginationClickable: true,
                grabCursor: true,
                loop: false,
                autoplay: 5000,
                autoplayDisableOnInteraction: false,
                coverflow: {
                    rotate: 30,
                    stretch: 10,
                    depth: 60,
                    modifier: 2,
                    slideShadows: true
                },
                observeParents: true
            }
        };
    },
    mounted() {
        this.isLoading = false;
        this.options.isAni = true
    }
};
</script>

<style lang="stylus" scoped>
.swiper >>> .swiper-container {
    z-index: 0 !important;
}

.swiper >>> .swiper-pagination-bullet-active {
    background: #ffffff !important;
}

.swiper >>> .swiper-pagination-bullet {
    width: 14px;
    height: 14px;
    opacity: 1;
    margin-left: 10px !important;
    box-sizing: border-box;
    border-radius: 100%;
    background: #4b4a47;
    cursor: pointer;
}

.swiper >>> .swiper-pagination-bullets {
    width 148%
    bottom: 10px;
}

.home_swiper_wrapper {
    width: 1106px;
    height: 447px;
}

.swiper {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 0;
    padding-bottom: 37.5%;
    background: #dcdcdc;

    .swiper-container {
        width: 1106px;
        height: 447px;
    }
}
</style>