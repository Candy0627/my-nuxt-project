<template>
    <div class="wrapper wrapper_pc">
        <common-nav :options="options"></common-nav>
        <div class="hms_login_banner">
            <div class="hms_center">
                <home-swiper :options="options" :swiperList="swiperList"></home-swiper>
                <home-login :options="options" @thirdLoginDialog="thirdLoginDialog"></home-login>
            </div>
        </div>
        <home-game :options="options" :homeGamesList="homeGamesList"></home-game>
        <common-mask :options="options" @closeDialog="closeDialog"></common-mask>
        <fb-dialog
            :options="options"
            :isFbDialog="isFbDialog"
            :gamesList="gamesList"
            :platFormType="platFormType"
            @closeFbDialog="closeFbDialog"
        ></fb-dialog>
        <common-footer :options="options"></common-footer>
        <loading :options="options"></loading>
    </div>
</template>

<script>
import axios from "axios";
import CommonNav from "@/pages/pcComponents/common/CommonNav.vue";
import CommonFooter from "@/pages/pcComponents/common/CommonFooter.vue";
import HomeSwiper from "@/pages/pcComponents/home/HomeSwiper.vue";
import HomeGame from "@/pages/pcComponents/home/HomeGame.vue";
import HomeLogin from "@/pages/pcComponents/home/HomeLogin.vue";
import CommonMask from "@/pages/pcComponents/common/CommonMask.vue";
import FbDialog from "@/pages/pcComponents/memberCenter/FbDialog.vue";
import Loading from "@/pages/pcComponents/common/Loading";

export default {
    name: "Home",
    data: function () {
        return {
            platFormType: "",
            gamesList: [],
            homeGamesList: [],
            swiperList: [],
            isFbDialog: false,
            options: {
                isGameani: true,
                isnswiper: false,
                isMask: false,
                isnlist: false,
                isLoading: false,
                isHmsLogin: true,
            },
        };
    },
    components: {
        CommonNav,
        CommonFooter,
        HomeSwiper,
        HomeGame,
        HomeLogin,
        FbDialog,
        CommonMask,
        Loading,
    },
    inject: ["reload"],
    mounted() {
        if (
            navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            )
        ) {
            this.options.isFootani = true;
        } else {
            window.addEventListener("scroll", this.handleScroll);
        }
        this.thirdLogin();
        this.getSwiperList();
        this.getHomeGamesList();
        if (localStorage.getItem("token")) {
            this.options.isHmsLogin = false;
        }
    },
    methods: {
        closeDialog: function () {
            this.options.isMask = false;
            this.isFbDialog = false;
        },
        closeFbDialog: function () {
            this.isFbDialog = false;
            this.options.isMask = false;
        },
        getSwiperList: function () {
            let datas = datas;
            this.getHttp(this, datas, "/front/home/banner", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.swiperList = data.data;
                } else {
                    obj.$message(data.message);
                }
            });
        },
        getHomeGamesList: function () {
            let datas = datas;
            this.getHttp(this, datas, "/front/home/games", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.homeGamesList = data.data;
                } else {
                    obj.$message(data.message);
                }
            });
        },
        getAllGamesList: function () {
            let datas = datas;
            this.getHttp(this, datas, "/front/game/all", function (obj, data) {
                if (data.status == "2000") {
                    obj.gamesList = data.data;
                    obj.firstGameId = data.data[0].id;
                    // obj.firstAppIdInit(obj.firstGameId);
                }
            });
        },
        thirdLoginDialog: function (type) {
            this.isFbDialog = true;
            this.getAllGamesList();
            console.log("home.vue 现在登录的类型", type);
            this.platFormType = type;
            this.options.isMask = true;
        },
        thirdLogin: function () {
            // 三方登录接口
            this.options.isLoading = true;
            this.account = this.$utils.getUrlKey("account");
            this.name = this.$utils.getUrlKey("name");
            this.token = this.$utils.getUrlKey("token");
            this.type = this.$utils.getUrlKey("type");
            this.signature = this.$utils.getUrlKey("signature");
            if (this.account && this.name && this.token && this.type) {
                let datas = {
                    account: this.account,
                    name: this.name,
                    token: this.token,
                    type: this.type, //facebook/google/apple
                };
                this.postHttp(this, datas, "/front/others/login", function (
                    obj,
                    data
                ) {
                    if (data.status == "2000") {
                        obj.options.isHmsLogin = false;
                        obj.options.isLoading = false;
                        obj.options.isMask = false;
                        obj.$notify({
                            title: "成功",
                            message: data.message,
                            type: "success",
                        });
                        let token = data.data.bear_token;
                        let userInfo = data.data.user_info;
                        obj.$store.commit("setToken", token);
                        obj.$store.commit("setUserInfo", userInfo);
                        localStorage.setItem("token", token);
                        localStorage.setItem(
                            "userInfo",
                            JSON.stringify(userInfo)
                        );
                        // obj.reload();
                    } else {
                        obj.$notify.error({
                            title: "錯誤",
                            message: data.message
                        });
                        obj.options.isLoading = false;
                    }
                });
            } else {
                this.options.isLoading = false;
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.wrapper {
    width: 100%;
    background: #fff;
}

.hms_login_banner {
    width: 100%;
    height: 447px;
    background: #dcdcdc;

    .hms_center {
        width: 1400px;
        margin: 0 auto;
    }
}

.center_bg {
    position: relative;
    width: 100%;
}
</style>