<template>
    <div class="bg_wrapper_m">
        <div
            class="game_wrapper_mh animated"
            v-if="options.isGameani"
            :class="{fadeInRight:options.isGameani}"
        >
            <div class="hms_game_center">
                <h2>最新遊戲</h2>
                <ul>
                    <li class="box_shadow" v-for="(item, index) in homeGamesList" :key="item.id">
                        <div class="left">
                            <a :href="item.game_url" target="_blank">
                                <img :src="item.icon_img" alt />
                            </a>
                        </div>
                        <div class="right">
                            <span class="ep-two">{{item.name}}</span>
                            <div class="downLoad">
                                <div class="top">
                                    <a class="fbfans fr" :href="item.fb_fans_url"></a>
                                </div>
                                <div class="bot">
                                    <em class="img12 fl" v-if="item.systematics===1"></em>
                                    <em class="img15 fl" v-if="item.systematics===2"></em>
                                    <em
                                        class="download fr"
                                        @click="downloadDialogShow(item.ios_url, item.android_url, item.apk_url)"
                                    ></em>
                                </div>
                            </div>
                            <!-- <div class="downLoad">
                                <a :href="item.android_url" target="_blank"></a>
                                <a :href="item.ios_url" target="_blank"></a>
                                <a :href="item.apk_url" target="_blank"></a>
                                <a
                                    href="javascript:;"
                                    class="level15"
                                    style="cursor:default"
                                    v-if="item.systematics===1"
                                ></a>
                                <a
                                    href="javascript:;"
                                    class="level12"
                                    style="cursor:default"
                                    v-if="item.systematics===2"
                                ></a>
                            </div>-->
                        </div>
                        <!-- <em class="next"></em> -->
                    </li>
                </ul>
            </div>
            <!-- <router-link class="more" to="/mobile/home">更多遊戲</router-link> -->
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
// import "swiper/css/swiper.css";
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
                slidesPerView: "auto",
                spaceBetween: 15,
                grabCursor: true,
                autoHeight: true,
                observeParents: true,
                prevButton: ".game_wrapper_mh .swiper-button-prev",
                nextButton: ".game_wrapper_mh .swiper-button-next",
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
        downloadDialogShow: function (ios_url, android_url, apk_url) {
            // 下载弹框
            this.options.isMask = true;
            this.options.isDownloadDialog = true;
            setTimeout(() => {
                this.$bus.emit("downloadSend", ios_url, android_url, apk_url);
            });
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

.bg_wrapper_m {
    background: #e3eaee;
    padding-bottom: 1.3rem;
}

.swiper {
    position: relative;
}

.game_wrapper_mh >>> .swiper-container {
    padding: 28px 1px;
}

.game_wrapper_mh >>> .swiper-slide {
    flex: 1;
    text-align: center;
    margin-left: 11px;
}

.game_wrapper_mh {
    .more {
        display: block;
        position: relative;
        width: 2.53rem;
        height: 0.3rem;
        margin: 0.36rem auto;
        font-size: 0.35rem;
        color: #4b4a47;
        text-align: center;
        vertical-align: middle;

        &::before {
            content: '';
            position: absolute;
            width: 0.4628rem;
            height: 0.4928rem;
            top: 50%;
            left: 0;
            margin-top: -0.2314rem;
            background: url('../../../assets/imgs_m/hms-icon.png') no-repeat center;
            background-size: 3rem 3rem;
            background-position: -1.79rem 0;
        }
    }

    .hms_game_center {
        ul {
            li {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 81%;
                border-radius: 0.4rem;
                margin-left: 0.19rem;
                margin-bottom: 0.3rem;
                transition: all 0.3s;
                margin: 0 auto;
                border: 2px solid #c0bfbf;
                padding: 0.2rem 0.28rem;
                margin-bottom: 0.25rem;
                box-sizing: content-box;

                /* * .next {
                    position: absolute;
                    width: 0.24rem;
                    height: 0.4rem;
                    top: 50%;
                    right: 0.18rem;
                    margin-top: -0.22rem;
                    background: url('../../../assets/imgs_m/hms-icon.png') no-repeat center;
                    background-size: 3rem 3rem;
                    background-position: -1.43rem 0;
                } */
                .left {
                    flex: 0.46;
                }

                .right {
                    flex: 1;
                    margin-left: 0.28rem;
                }

                img {
                    display: inline-block;
                    width: 2rem;
                    height: 2rem;
                    transition: all 0.3s;
                    cursor: pointer;
                }

                span {
                    color: #4b4a47;
                    font-size: 0.275rem;
                    margin: 0.16rem 0 0.05rem;
                    line-height: 0.3rem;
                }

                .downLoad {
                    .top, .bot {
                        width: 100%;

                        em {
                            display: inline-block;
                        }
                    }

                    .top {
                        text-align: right;
                        height: 0.7rem;

                        .fbfans {
                            width: 2rem;
                            height: 0.71rem;
                            background: url('../../../assets/imgs_m/btn/btn_fans.png') no-repeat center;
                            background-size: 100% 100%;
                        }
                    }

                    .bot {
                        display: flow-root;

                        .img12 {
                            width: 0.6rem;
                            height: 0.6rem;
                            background: url('../../../assets/imgs_m/12.png') no-repeat center;
                            background-size: 100% 100%;
                            margin-top: 0.13rem;
                        }

                        .img15 {
                            width: 0.6rem;
                            height: 0.6rem;
                            background: url('../../../assets/imgs_m/15.png') no-repeat center;
                            background-size: 100% 100%;
                            margin-top: 0.13rem;
                        }

                        .download {
                            width: 2rem;
                            height: 0.71rem;
                            background: url('../../../assets/imgs_m/btn/btn_download.png') no-repeat center;
                            background-size: 100% 100%;
                            margin-top: 0.08rem;
                        }
                    }

                    a {
                        display: inline-block;
                        width: 0.52rem;
                        height: 0.53rem;
                        background: url('../../../assets/imgs/hms_down_load.png') no-repeat center;
                        background-size: 2.82rem 0.54rem;
                        margin-left: 0.06rem;
                        cursor: pointer;

                        &:nth-child(1) {
                            background-position: 0 0;
                            margin-left: 0;
                        }

                        &:nth-child(2) {
                            background-position: -0.59rem 0;
                        }

                        &:nth-child(3) {
                            background-position: -1.16rem 0;
                        }

                        &.level12 {
                            background-position: -2.32rem 0;
                        }

                        &.level15 {
                            background-position: -1.75rem 0;
                        }
                    }
                }
            }
        }
    }

    h2 {
        position: relative;
        display: inline-block;
        color: #4b4a47;
        font-weight: 500;
        width: 100%;
        text-align: left;
        margin: 0.33rem 0 0.26rem;
        text-indent: 0.8rem;
        font-size: 0.45rem;

        &::before {
            position: absolute;
            content: '';
            width: 9.63px;
            height: 28.89px;
            top: 50%;
            left: 0.3rem;
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
