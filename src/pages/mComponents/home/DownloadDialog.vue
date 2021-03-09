<template>
    <div class="login_wrapper_h hms" v-if="options.isDownloadDialog">
        <div class="login_box_h login_in animated bounceIn">
            <span class="login_close" @click="closeDownloadDialog">
                <i></i>
            </span>
            <div class="dialog_download animated">
                <span>遊戲下載</span>
                <div class="d_in">
                    <a :href="ios_url" class="ios"></a>
                    <a :href="android_url" class="gp"></a>
                    <a :href="apk_url" class="apk"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/styles/login.css";
import axios from "axios";
export default {
    name: "DownloadDialog",
    props: {
        options: Object,
        isFbDialog: Boolean,
    },
    computed: {},
    data: function () {
        return {
            ios_url:'',
            android_url:'',
            apk_url: ''
        };
    },
    created() {
        this.$bus.on('downloadSend', (ios_url, android_url, apk_url) => {
            // console.log("此时接收到传过来的下载链接值了吗", ios_url, android_url, apk_url);
            this.ios_url = ios_url;
            this.android_url = android_url;
            this.apk_url = apk_url;
        })
    },
    mounted() {},
    methods: {
        closeDownloadDialog: function () {
            this.$emit("closeDownloadDialog");
        },
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles_m/varibles.styl';

.v-enter, .v-enter-to {
    opacity: 0;
}

.v-enter-active, .v-leave-active {
    transition: opacity 1s;
}

.login_wrapper_h {
    position: relative;
    width: 100%;

    .btn_login, .el-form-item {
        margin-bottom: 0 !important;
    }

    .forgetPassword {
        input[name='checkbox'] {
            margin-top: 12px !important;
            margin-right: 9px !important;
        }
    }

    .login_box_h {
        position: fixed;
        z-index: 122;
        width: 5.73rem;
        height: 5.33rem;
        left: 50%;
        top: 50%;
        margin-left: -45%;
        margin-top: -130px;
        border-radius: $bdRadius;
        text-align: center;
        background: #ebf0f3;
        border: 0.03rem solid #c0bfbf;

        .dialog_download {
            margin: 0.56rem auto;
            text-align: center;

            .d_in {
                position: absolute;
                width: 3.04rem;
                height: 3.53rem;
                left: 50%;
                top: 50%;
                margin-left: -1.52rem;
                margin-top: -1.385rem;
                background: url('../../../assets/imgs_m/download_bg.png') no-repeat center;
                background-size: 100% 100%;

                a {
                    position absolute;
                    width 100%;
                    height 1rem;
                    left: 0;
                    /** background pink
                    opacity .6 */
                    &.ios{
                        top 0
                    }
                    &.gp{
                        top 1.3rem
                    }
                    &.apk{
                        bottom 0
                    }
                }
            }

            span, a {
                display: inline-block;
            }

            span {
                font-size: 0.33rem;
                color: #434341;
            }
        }

        .login_close {
            position: absolute;
            width: 0.41rem;
            height: 0.41rem;
            right: 0.27rem;
            top: 0.27rem;
            background: url('../../../assets/imgs_m/d_close.png') no-repeat center;
            background-size: 100% 100%;
            cursor: pointer;
        }
    }
}

.login_wrapper_h >>> .swiper-container {
    position: absolute;
    list-style: none;
    padding: 0;
    z-index: 0;
    width: 690px;
    height: 173px;
    left: 50%;
    top: 72px;
    margin-left: -345px;
}

.login_wrapper_h >>> .swiper-slide {
    width: 126px;
    height: 126px;
    text-align: center;
    margin-left: 11px;
}

.login_wrapper_h >>> .swiper-slide div {
    width: 126px;
    height: 126px;
}

.login_wrapper_h >>> .swiper-slide p {
    color: #333333;
    font-size: 16px;
    margin-top: 10px;
}

.login_wrapper_h >>> .swiper-slide img {
    width: 126px;
    height: 126px;
    border-radius: 36px;
    transition: transform 0.9s ease 0s;
}

.login_wrapper_h >>> .swiper-slide img:hover {
    transform: scale(1.05, 1.05);
    animation: 0.9s ease-in-out;
}

.swiper-button-prev {
    width: 45px !important;
    height: 61px !important;
    background: url('../../../assets/imgs/prevfb.png') no-repeat !important;
    background-size: 100% 100% !important;
    left: 17px !important;
    outline: none !important;
    margin-top: -2px !important;
}

.swiper-button-next {
    width: 45px !important;
    height: 61px !important;
    background: url('../../../assets/imgs/nextfb.png') no-repeat !important;
    background-size: 100% 100% !important;
    right: 17px !important;
    outline: none !important;
    margin-top: -2px !important;
}

.swiper-button-prev:after, .swiper-container-rtl .swiper-button-next:after {
    content: '';
}

.swiper-button-next:after, .swiper-container-rtl .swiper-button-prev:after {
    content: '';
}
</style>