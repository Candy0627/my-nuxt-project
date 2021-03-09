<template>
    <div class="bg_wrapper">
        <div
            class="game_wrapper animated"
            v-if="options.isGameani"
            :class="{fadeInRight:options.isGameani}"
        >
            <div class="hms_game_center">
                <h2>最新遊戲</h2>
                <ul>
                    <template>
                        <div class="news_swiper_wrapper animated">
                            <div class="swiper">
                                <swiper :options="swiperOption" v-if="showSwiper">
                                    <swiper-slide
                                        v-for="(item, index) in homeGamesList"
                                        :key="item.id"
                                    >
                                        <li>
                                            <a :href="item.game_url" target="_blank">
                                                <img :src="item.icon_img" alt />
                                            </a>
                                            <span>{{item.name}}</span>
                                            <div class="downLoad">
                                                <a :href="item.android_url" target="_blank"></a>
                                                <a :href="item.ios_url" target="_blank"></a>
                                                <a :href="item.apk_url" target="_blank"></a>
                                                <a
                                                    href="javascript:;"
                                                    class="level12"
                                                    style="cursor:default"
                                                    v-if="item.systematics===1"
                                                ></a>
                                                <a
                                                    href="javascript:;"
                                                    class="level15"
                                                    style="cursor:default"
                                                    v-if="item.systematics===2"
                                                ></a>
                                            </div>
                                        </li>
                                    </swiper-slide>
                                </swiper>
                                <div class="swiper-button-prev" slot="button-prev"></div>
                                <div class="swiper-button-next" slot="button-next"></div>
                            </div>
                        </div>
                    </template>

                    <!-- <li v-for="(item, index) in homeGamesList" :key="item.id">
                    <a :href="item.game_url" target="_blank">
                        <img :src="item.icon_img" alt="">
                    </a>
                    <span>{{item.name}}</span>
                    <div class="downLoad">
                        <a :href="item.android_url" target="_blank"></a>
                        <a :href="item.ios_url" target="_blank"></a>
                        <a :href="item.apk_url" target="_blank"></a>
                        <a href="javascript:;" style="cursor:default"></a>
                    </div>
                    </li>-->
                </ul>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
// import "swiper/css/swiper.css";
import $ from "jquery";
export default {
    name: "HomeGame",
    props: {
        gameList: Array,
        homeGamesList: Array,
        options: Object,
    },
    computed: {
        showSwiper: function () {
            // console.log("轮播长度1", this.homeGamesList.length);
            return this.homeGamesList.length;
        },
    },
    data() {
        return {
            curId: 110,
            swiperOption: {
                initialSlide: 0,
                slidesPerView: 4,
                spaceBetween: 20,
                grabCursor: true,
                autoHeight: true,
                observeParents: true,
                prevButton: ".game_wrapper .swiper-button-prev",
                nextButton: ".game_wrapper .swiper-button-next",
            },
        };
    },
    components: {},
    methods: {
        botShow: function (i) {
            this.curId = i;
        },
        botHide: function (i) {
            this.curId = i;
            this.curId = -1;
        },
        tips: function () {
            this.$toast("【敬請期待】");
            // this.$layer.tips('【盡請期待】', '#ios', {
            //     tips: [1, '#fcc916'],
            //     time: 1000
            // });
        },
    },
};
</script>

<style lang="stylus" scoped>
.v-enter, .v-enter-to {
    opacity: 0;
}

.v-enter-active, .v-leave-active {
    transition: opacity 1s;
}

/* * 分页样式修改 */
.swiper >>> .swiper-button-prev:after, .swiper >>> .swiper-button-next:after {
    content: '';
    margin-top: -27.5px;
}

.swiper >>> .swiper-button-prev {
    width: 55px;
    height: 55px;
    left: -58px;
    background: url('../../../assets/imgs/h_prev.png') no-repeat center;
    background-size: 100% 100%;
}

.swiper >>> .swiper-button-next {
    width: 55px;
    height: 55px;
    right: -60px;
    background: url('../../../assets/imgs/h_prev.png') no-repeat center;
    background-size: 100% 100%;
    transform: rotate(180deg);
}

.bg_wrapper {
    background: #dcdcdc;
}

.swiper {
    position: relative;
}

.game_wrapper >>> .swiper-container {
    padding: 28px 8px;
}

.game_wrapper >>> .swiper-slide {
    width: 274px;
    text-align: center;
}

.game_wrapper {
    position: relative;
    width: 1400px;
    min-height: 478px;
    margin: 0 auto;
    background: #fff;

    .hms_game_center {
        width: 1235px;
        margin: 0 auto;

        ul {
            li {
                float: left;
                width: 278px;
                height: 330px;
                text-align: center;
                border: 3px solid #c0bfbf;
                border-radius: 40px;
                margin-left: 19px;
                margin-bottom: 30px;
                transition: all 0.3s;

                &:hover {
                    img {
                        /* *animation swing .9s ease-in-out* */
                        transform: scale(1.08, 1.08);
                    }

                    -webkit-box-shadow: 0 5px 10px 0 rgba(32, 32, 32, 0.7);
                    -ms-box-shadow: 0 5px 10px 0 rgba(32, 32, 32, 0.7);
                    -o-box-shadow: 0 0 26px 0 rgba(50, 50, 50, 0.7);
                    box-shadow: 0 0 26px 0 rgba(50, 50, 50, 0.7);
                    border-radius: 15px;
                }

                &:nth-child(1) {
                    margin-left: 0;
                }

                &:nth-child(5) {
                    margin-left: 0;
                }

                img {
                    display: inline-block;
                    width: 160px;
                    height: 160px;
                    margin-top: 28px;
                    transition: all 0.3s;
                    cursor: pointer;
                }

                span {
                    display: block;
                    color: #4b4a47;
                    font-size: 22px;
                    margin: 16px 0 18px;
                }

                .downLoad {
                    a {
                        display: inline-block;
                        width: 46px;
                        height: 45px;
                        background: url('../../../assets/imgs/hms_down_load.png') no-repeat center;
                        background-size: 250px 47px;
                        margin-left: 6px;
                        cursor: pointer;

                        &:nth-child(1) {
                            background-position: 0 0;
                            margin-left: 0;
                        }

                        &:nth-child(2) {
                            background-position: -52px 0;
                        }

                        &:nth-child(3) {
                            background-position: -103px 0;
                        }

                        &.level12 {
                            background-position: -155px 0;
                        }

                        &.level15 {
                            background-position: -205px 0;
                        }
                    }
                }
            }
        }
    }

    h2 {
        position: relative;
        display: inline-block;
        font-size: 27.78px;
        color: #4b4a47;
        font-weight: 500;
        width: 100%;
        text-align: left;
        margin: 20px 0;
        text-indent: 1.2rem;

        &::before {
            position: absolute;
            content: '';
            width: 9.63px;
            height: 28.89px;
            top: 50%;
            left: 0;
            margin-top: -14.445px;
            background: #fcc916;
            border-radius: 4.82px;
        }
    }

    .game_width {
        width: 980px;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        margin-left: -490px;
        top: 136px;
    }

    .game {
        ul {
            li {
                position: relative;
                width: 295px;
                height: 412px;
                float: left;
                margin-left: 30px;
                margin-top: 35px;
                cursor: pointer;
                overflow: hidden;

                .game_img_box {
                    position: absolute;
                    top: 0;
                    z-index: 0;
                    width: 276px;
                    height: 412px;
                    background: #f9673e;
                    -webkit-box-shadow: 0 5px 10px 0 rgba(32, 32, 32, 0.7);
                    -ms-box-shadow: 0 5px 10px 0 rgba(32, 32, 32, 0.7);
                    -o-box-shadow: 0 5px 10px 0 rgba(32, 32, 32, 0.7);
                    box-shadow: 0 5px 10px 0 rgba(32, 32, 32, 0.7);
                    box-sizing: border-box;
                    border-radius: 3px;
                }

                .game_txt {
                    position: absolute;
                    width: 276px;
                    height: 413px;
                    overflow: hidden;
                    top: 0;

                    .game_bot {
                        position: absolute;
                        bottom: 0;
                        z-index: 2;
                        width: 276px;
                        height: 75px;
                        line-height: 75px;
                        text-align: center;
                        background: #f9673e;

                        a {
                            font-size: 16.82px;
                            color: #fff;
                        }

                        span {
                            color: #fff;
                            font-size: 16.82px;
                            padding: 0 40px;
                        }
                    }
                }

                .img_box {
                    width: 295px;
                    height: 412px;
                    position: absolute;
                    z-index: 1;

                    img {
                        width: 295px;
                        height: 100%;
                        border-radius: 2px;
                        padding: 2px;
                        border-radius: 2px;
                        transition: all 0.9s;
                    }
                }

                &:nth-child(1) {
                    margin-top: 0;
                }

                &:nth-child(2) {
                    margin-top: 0;
                }

                &:nth-child(3) {
                    margin-top: 0;
                }

                cursor: pointer;

                .txt {
                    width: 91%;
                    height: 106px;
                    position: absolute;
                    bottom: -20px;
                    text-align: left;
                    padding-left: 22px;
                    z-index: 1;

                    img {
                        position: relative;
                    }

                    .shadow {
                        width: 95%;
                        height: 297px;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        z-index: -1;
                    }

                    span {
                        float: left;
                        color: #ffffff;

                        &:nth-of-type(1) {
                            width: 90%;
                            top: 0;
                            font-size: 24px;
                            padding-right: 5px;
                        }

                        &:nth-of-type(2) {
                            top: 0;
                            font-size: 21.03px;
                        }

                        &:nth-of-type(3) {
                            width: 45%;
                            top: 0;
                            font-size: 21px;
                            padding-left: 5px;
                            padding-top: 4px;
                        }

                        &.botTxt {
                            width: 87%;
                            margin-top: 10px;
                            font-size: 16px;
                            color: #d3d2d2;
                        }
                    }
                }
            }
        }
    }
}
</style>
