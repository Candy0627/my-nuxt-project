<template>
    <div
        class="home_swiper_wrapper_m animated"
        v-if="options.isAni"
        :class="{fadeInUp: options.isAni}"
    >
        <div class="swiper_m">
            <swiper :options="swiperOption">
                <!-- <swiper-slide>
                    <img src="../../../assets/imgs_m/banner01.jpg" alt width="100%" />
                </swiper-slide>
                <swiper-slide>
                    <img src="../../../assets/imgs_m/banner01.jpg" alt width="100%" />
                </swiper-slide>
                <swiper-slide>
                    <img src="../../../assets/imgs_m/banner01.jpg" alt width="100%" />
                </swiper-slide>
                <swiper-slide>
                    <img src="../../../assets/imgs_m/banner01.jpg" alt width="100%" />
                </swiper-slide> -->
                <swiper-slide v-for="(item, index) in swiperList" :key="index">
                    <a :href="item.jump_link" target="_blank">
                        <img :src="item.img_url" width="100%" />
                    </a>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeSwiper",
    props: {
        swiperList: Array,
    },
    data() {
        return {
            options: {
                isAni: false,
            },
            swiperOption: {
                pagination: ".home_swiper_wrapper_m .swiper-pagination",
                paginationClickable: true,
                grabCursor: true,
                loop: true,
                autoplay: 5000,
                autoplayDisableOnInteraction: false,
                coverflow: {
                    rotate: 30,
                    stretch: 10,
                    depth: 60,
                    modifier: 2,
                    slideShadows: true,
                },
                observeParents: true,
            },
        };
    },
    mounted() {
        this.isLoading = false;
        this.options.isAni = true;
    },
};
</script>

<style lang="stylus" scoped>
.swiper_m >>> .swiper-container {
    z-index: 0 !important;
}

.swiper_m >>> .swiper-pagination-bullet-active {
    background: #fcc916 !important;
}

.swiper_m >>> .swiper-pagination-bullet {
    width: .325rem;
    height: .325rem;
    opacity: 1;
    margin-left: 10px !important;
    box-sizing: border-box;
    border-radius: 100%;
    border: 1px solid #fcc916;
    background: none;
    cursor: pointer;
}

.swiper_m >>> .swiper-pagination-bullets {
    width: 100%;
    bottom: 10px;
}

.home_swiper_wrapper_m {
    width: 100%;
    margin-top: 1.16rem;
}

.swiper_m {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 0;
    padding-bottom: 156.6666667%;
    background: #dcdcdc;

    .swiper-container {
        width: 100%;
    }
}
</style>