<template>
    <div class="wrapper_mhers herms_comwidth">
        <common-nav :options="options"></common-nav>
        <home-swiper :options="options" :swiperList="swiperList"></home-swiper>
        <home-game :options="options" :homeGamesList="homeGamesList"></home-game>
        <!-- <keep-alive exclude="FooterDetail"> -->
        <!-- <router-view v-if="isRouterAlive" /> -->
        <!-- </keep-alive> -->
        <common-footer :options="options"></common-footer>
        <loading :options="options"></loading>
        <nav-mask :options="options"></nav-mask>
        <common-mask :options="options"></common-mask>
        <screentips-mask></screentips-mask>
        <download-dialog 
            :options="options"
            @closeDownloadDialog="closeDownloadDialog"
        ></download-dialog>
    </div>
</template>

<script>
import CommonNav from "@/pages/mComponents/common/CommonNav.vue";
import CommonFooter from "@/pages/mComponents/common/CommonFooter.vue";
import HomeSwiper from "@/pages/mComponents/home/HomeSwiper.vue";
import HomeGame from "@/pages/mComponents/home/HomeGame.vue";
import Loading from "@/pages/mComponents/common/Loading.vue";
import NavMask from "@/pages/mComponents/common/NavMask.vue";
import CommonMask from "@/pages/mComponents/common/CommonMask.vue";
import ScreentipsMask from "@/pages/mComponents/common/ScreenTips.vue";
import DownloadDialog from "@/pages/mComponents/home/DownloadDialog.vue";

export default {
    name: "App",
    provide() {
        return {
            reload: this.reload,
        };
    },
    components: {
        Loading,
        CommonNav,
        CommonFooter,
        HomeSwiper,
        HomeGame,
        NavMask,
        ScreentipsMask,
        DownloadDialog,
        CommonMask
    },
    data: function () {
        return {
            platFormType: "",
            gamesList: [],
            homeGamesList: [],
            swiperList: [],
            isFbDialog: false,
            options: {
                isLogin: false,
                isSign: false,
                isMask: false,
                isLoading: false,
                isIntegralNotes: false,
                isFootani: false,
                isLoginin: false,
                isLoginSuccess: false,
                isGameani: true,
                isnswiper: false,
                isnlist: false,
                isLoading: false,
                isHmsLogin: true,
                isNavMask: false,
                isMask: false,
                isDownloadDialog: false
            },
        };
    },
    created() {
        if (localStorage.getItem("token") && localStorage.getItem("userInfo")) {
            this.$store.commit("setToken", localStorage.getItem("token"));
            this.$store.commit(
                "setUserInfo",
                JSON.parse(localStorage.getItem("userInfo"))
            );
        }
    },
    mounted() {
        // 判断用户是否登录
        if (localStorage.getItem("token")) {
            this.options.isLoginin = true;
        }
        this.getSwiperList();
        this.getHomeGamesList();
        this.thirdLogin();
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        },
        showLoginDialog: function () {
            this.options.isMask = true;
            this.options.isLogin = true;
        },
        closeDialog: function () {
            this.options.isLogin = false;
            this.options.isSign = false;
            this.options.isMask = false;
            this.options.isIntegralNotes = false;
            this.options.isNavMask = false;
            this.isFbDialog = false;
        },
        closeDownloadDialog: function() {
            this.options.isMask = false;
            this.options.isDownloadDialog = false;
        },
        handleLogin: function () {
            this.options.isLogin = false;
            this.options.isSign = true;
        },
        getSwiperList: function () {
            this.options.isLoading = true;
            let datas = datas;
            this.getHttp(this, datas, "/front/home/mobile/banner", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    obj.swiperList = data.data;
                    // console.log("移动端banner", data.data);
                } else {
                    obj.options.isLoading = false;
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
        morefunLogin: function (userName, passWord) {
            this.options.isLoading = true;
            let datas = {
                account: userName,
                password: passWord,
            };
            this.postHttp(this, datas, "/front/login", function (obj, data) {
                console.log("app", obj, data);
                if (data) {
                    if (data.status == "2000") {
                        obj.options.isLoading = false;
                        obj.$notify({
                            title: "成功",
                            message: "登入成功!",
                            type: "success",
                        });
                        obj.options.isLogin = false;
                        obj.options.isLoginin = true;
                        obj.options.isLoginSuccess = true;
                        let token = data.data.bear_token;

                        let userInfo = data.data.user_info;

                        obj.$store.commit("setToken", token);
                        obj.$store.commit("setUserInfo", userInfo);

                        localStorage.setItem("token", token);
                        localStorage.setItem(
                            "userInfo",
                            JSON.stringify(userInfo)
                        ); //保存登录状态
                        console.log(
                            userInfo,
                            "保存的数据",
                            JSON.stringify(userInfo)
                        );

                        obj.reload(); //直接調用刷新方法
                        obj.options.isLoading = true;
                        obj.options.isMask = true;
                        obj.options.isSign = true;
                        obj.options.isLoading = false;
                        // obj.autoSigned();
                        // obj.$refs["signIn"].autoSigned();
                    } else {
                        obj.options.isLoading = false;
                        obj.options.isLogin = false;
                        obj.options.isSign = false;
                        obj.options.isMask = false;
                        obj.$notify.error({
                            title: "錯誤",
                            message: data.message,
                        });
                    }
                } else {
                    obj.options.isLoading = false;
                    obj.options.isSign = false;
                    obj.options.isMask = false;
                    obj.options.isLogin = false;
                    obj.$notify.error({
                        title: "錯誤",
                        message: "網絡錯誤，請稍候重試!",
                    });
                }
            });
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
                    type: this.type, //facebook/google
                };
                this.postHttp(this, datas, "/front/others/login", function (
                    obj,
                    data
                ) {
                    if (data.status == "2000") {
                        obj.options.isHmsLogin = false;
                        obj.options.isLoading = false;
                        obj.options.isMask = false;
                        obj.$toast("登入成功!");
                        // obj.$notify({
                        //     title: "成功",
                        //     message: data.message,
                        //     type: "success",
                        // });
                        console.log(
                            "第三方登录接口接入获取到的用户信息",
                            data.data
                        );
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
                        obj.$toast(data.message);
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

<style lang="stylus">
.wrapper_mhers
    max-width:750px
    min-width: 320px
    margin 0 auto
</style>
