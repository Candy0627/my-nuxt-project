<template>
    <div class="login_wrapper hms" v-if="isFbDialog">
        <div class="login_box login_in animated bounceIn">
            <!-- <span class="login_close" @click="closeFbDialog">
                <i></i>
            </span> -->
            <template>
                <div class="news_swiper_wrapper animated">
                    <div class="swiper">
                        <swiper :options="swiperOption" v-if="showSwiper">
                            <swiper-slide v-for="(item, index) in gamesList" :key="item.id">
                                    <div @click='toLink(item.appid)'>
                                        <img :src="item.icon_img" width="100%" class="swiper_img" />
                                        <p>{{item.name}}</p>
                                    </div>
                            </swiper-slide>
                        </swiper>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </div>
                </div>
            </template>
            <loading :options="options"></loading>
        </div>
    </div>
</template>

<script>
import "@/assets/styles/login.css";
import axios from "axios";
import Loading from "@/pages/pcComponents/common/Loading"
export default {
    name: "FbDialog",
    props: {
        isFbDialog: Boolean,
        gamesList: Array,
        platFormType: String
    },
    inject: ["reload"], //注入reload方法
    computed: {
        showSwiper: function() {
            // console.log('轮播长度1',this.gamesList.length);
            return this.gamesList.length;
        }
    },
    components:{
        Loading
    },
    data: function() {
        return {
            url:'',
            swiperOption: {
                initialSlide: 0,
                slidesPerView: 5,
                grabCursor: true,
                autoHeight: true,
                observeParents: true,
                prevButton: '.hms .swiper-button-prev',
                nextButton: '.hms .swiper-button-next',
            },
            options: {
                isLoading: false
            }
        };
    },
    mounted() {},
    methods: {
        closeFbDialog: function() {
            this.$emit("closeFbDialog");
        },
        toLink: function(appid) {
            this.options.isLoading = true;
            if(this.platFormType == "facebook") {
                this.url = "https://sdk.gamemorefun.com/mobile/v1/passport/facebook/5?app_id="+ appid +"&redirect_url=https%3A%2F%2Fwww.hermesgames.com.tw%2F%23%2F";
            }
            if(this.platFormType == "google") {
                this.url = "https://sdk.gamemorefun.com/rest/v2/passport/google/5?app_id="+ appid +"&redirect_url=https%3A%2F%2Fwww.hermesgames.com.tw%2F%23%2F";
            }
            if(this.platFormType == "apple") {
                this.url = "https://sdk.gamemorefun.com/rest/v2/passport/apple/5?app_id="+ appid +"&redirect_url=https%3A%2F%2Fwww.hermesgames.com.tw%2F%23%2F";
            }
            window.location.href = this.url;
        }
    }
};
</script>

<style lang="stylus" scoped>
.v-enter, .v-enter-to {
    opacity: 0;
}

.v-enter-active, .v-leave-active {
    transition: opacity 1s;
}


.login_wrapper {
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

    .login_box {
        position: fixed;
        z-index: 122;
        width: 900px;
        height: 260px;
        left: 50%;
        top: 50%;
        margin-left: -450px;
        margin-top: -130px;
        text-align: center;
        background: url('../../../assets/imgs/bg_login_type_pop.png') no-repeat center;
        background-size: 100% 100%;

        .login_close {
            position: absolute;
            width: 89px;
            height: 82px;
            right: 0;
            top: 0;
            border-top-right-radius: 30%;
            /* *background: url('../../../assets/imgs/close.png') no-repeat center;
            background-size: 100% 100%;* */
            cursor: pointer;

            i {
                display: inline-block;
                width: 31.67px;
                height: 5.65px;
                position: absolute;
                right: 9px;
                top: 18px;
                background: #ffffff;
                border-radius: 2.5px;
            }
        }
    }
}

.login_wrapper >>> .swiper-container {
    position: absolute;
    list-style: none;
    padding: 0;
    z-index: 0;
    width: 686px;
    height: 166px;
    left: 50%;
    top: 76px;
    margin-left: -343px;
}

.login_wrapper >>> .swiper-slide {
    width: 126px;
    height: 126px;
    flex: 1;
    text-align: center;
    margin-left: 11px;
}
.login_wrapper >>> .swiper-slide div {
    width: 126px;
    height: 126px;
}

.login_wrapper >>> .swiper-slide p {
    color: #333333;
    font-size: 14px;
}

.login_wrapper >>> .swiper-slide img {
    width: 126px;
    height: 126px;
    transition: transform 0.9s ease 0s;
}

.login_wrapper >>> .swiper-slide img:hover{
    transform: scale(1.05,1.05);
    animation: .9s ease-in-out;
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
.swiper-button-prev:after, .swiper-container-rtl .swiper-button-next:after{
    content: '';
}
.swiper-button-next:after, .swiper-container-rtl .swiper-button-prev:after{
    content: '';
}
</style>