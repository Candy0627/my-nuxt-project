<template>
    <div id="app">
        移动端页面
        <!-- <common-nav :options="options"></common-nav> -->
        <!-- <keep-alive exclude="FooterDetail"> -->
            <!-- <router-view v-if="isRouterAlive" /> -->
        <!-- </keep-alive> -->
        <!-- <common-footer :options="options"></common-footer> -->
        <loading :options="options"></loading>
    </div>
</template>

<script>
import CommonNav from "@/pages/pcComponents/common/CommonNav.vue";
import CommonFooter from "@/pages/pcComponents/common/CommonFooter.vue";
import Loading from "@/pages/pcComponents/common/Loading";
export default {
    name: "App",
    provide() {
        return {
            reload: this.reload
        };
    },
    components: {
        CommonNav,
        CommonFooter,
        Loading
    },
    data: function() {
        return {
            isRouterAlive: true,
            options: {
                isLogin: false,
                isSign: false,
                isMask: false,
                isLoading: false,
                isIntegralNotes: false,
                isFootani: false,
                isLoginin: false,
                isLoginSuccess: false //未登入狀態
            },
            isFbDialog: false,
            signInfoList: {},
            footerInfoList: [],
            signDateList: [],
            gamesList: [],
            firstGameId: 0,
            firstAppId: 0,
            platFormType:'',
            account: "",
            name: "",
            token: "",
            type: "",
            signature: ""
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
        window.addEventListener("scroll", this.handleScroll);
        // 判断用户是否登录
        if (localStorage.getItem("token")) {
            this.options.isLoginin = true;
        }
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            });
        },
        showLoginDialog: function() {
            this.options.isMask = true;
            this.options.isLogin = true;
        },
        closeDialog: function() {
            this.options.isLogin = false;
            this.options.isSign = false;
            this.options.isMask = false;
            this.options.isIntegralNotes = false;
            this.isFbDialog = false;
        },
        handleLogin: function() {
            this.options.isLogin = false;
            this.options.isSign = true;
        },
        handleScroll: function() {
            var st = document.documentElement.scrollTop;
            if (st >= 2500) {
                this.options.isFootani = true;
            }
        },
        morefunLogin: function(userName, passWord) {
            this.options.isLoading = true;
            let datas = {
                account: userName,
                password: passWord
            };
            this.postHttp(this, datas, "/front/login", function(obj, data) {
                console.log("app",obj, data);
                if (data) {
                    if (data.status == "2000") {
                        obj.options.isLoading = false;
                        obj.$notify({
                            title: "成功",
                            message: "登入成功!",
                            type: "success"
                        });
                        obj.options.isLogin = false;
                        obj.options.isLoginin = true;
                        obj.options.isLoginSuccess = true;
                        let token = data.data.bear_token;

                        let userInfo = data.data.user_info;

                        obj.$store.commit("setToken", token);
                        obj.$store.commit("setUserInfo", userInfo);

                        localStorage.setItem("token", token);
                        localStorage.setItem("userInfo",JSON.stringify(userInfo));//保存登录状态
                        console.log(userInfo,'保存的数据',JSON.stringify(userInfo));

                        
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
                            message: data.message
                        });
                    }
                } else {
                    obj.options.isLoading = false;
                    obj.options.isSign = false;
                    obj.options.isMask = false;
                    obj.options.isLogin = false;
                    obj.$notify.error({
                        title: "錯誤",
                        message: "網絡錯誤，請稍候重試!"
                    });
                }
            });
        }
    }
};
</script>

<style lang="stylus">
#app{
    max-width: 1920px;
    min-width: 1920px;
    height: 100%;
    overflow-x: hidden;
    font-family: Arial, "微软雅黑", "Microsoft YaHei";
}

#app >>> .toast{
    height: 30px !important
}
</style>
