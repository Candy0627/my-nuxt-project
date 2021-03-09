<template>
    <div class="wrapper wrapper_pc">
        <common-nav :options="options"></common-nav>
        
        <div class="game_wrapper">
            <div class="hot hot_comWidth">
                <!-- <h2 class="animated" v-if="options.isAni" :class="{fadeInLeft: options.isAni}">會員中心</h2> -->
                <div class="hot_wrapper">
                    <div
                        class="hms_ul fl animated"
                        v-if="options.isAni"
                        :class="{fadeInLeft: options.isAni}"
                    >
                        <ul class="hot_tab">
                            <li
                                :class="{yellow:curId === index}"
                                v-for="(item,index) in tabList"
                                :key="index"
                                @click="tab(index, item.name)"
                            >
                                <div :class="'yellow-'+item.title">
                                    <a href="javascript:;" :class="'gray-'+item.title">{{item.name}}</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <h2 class="animated fadeInLeft">會員中心</h2>
                    <div
                        class="hot_con fl animated"
                        v-if="options.isAni"
                        :class="{fadeInRight: options.isAni}"
                    >
                        <div v-if="tabId == 0 && options.showLogin == true">
                            <sub-login 
                                :options="options" 
                                @toRegisterLink="toRegisterLink"
                                @thirdLoginDialog="thirdLoginDialog"
                            ></sub-login>
                        </div>
                        <div v-if="tabId == 1 && options.showLogin == true">
                            <sub-register :options="options"></sub-register>
                        </div>
                        <div v-if="tabId == 2 || options.showLogin == false">
                            <!-- 个人资料 -->
                            <sub-myprofile
                                :options="options"
                                @LoginRegisterShow="LoginRegisterShow"
                            ></sub-myprofile>
                        </div>
                        <div v-if="tabId == 3 && options.showLogin == true">
                            <!-- 忘記密碼 -->
                            <forget-password :options="options"></forget-password>
                        </div>
                        <div v-if="tabId == 4 && options.showLogin == true">
                            <!-- 修改密碼 -->
                            <update-password :options="options"></update-password>
                        </div>
                        <div v-if="tabId == 5 && options.showLogin == true">
                            <!-- 表单下载 -->
                            <form-download :options="options"></form-download>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <common-footer :options="options"></common-footer>
        <loading :options="options"></loading>
        <common-mask :options="options" @closeDialog="closeDialog"></common-mask>
        <fb-dialog
            :options="options"
            :isFbDialog="isFbDialog"
            :gamesList="gamesList"
            :platFormType="platFormType"
            @closeFbDialog="closeFbDialog"
        ></fb-dialog>
    </div>
</template>

<script>
import "@/assets/styles/myProgress.css";
import Loading from "@/pages/pcComponents/common/Loading";
import CommonNav from "@/pages/pcComponents/common/CommonNav.vue";
import CommonFooter from "@/pages/pcComponents/common/CommonFooter.vue";
import SubLogin from "@/pages/pcComponents/memberCenter/SubLogin";
import SubRegister from "@/pages/pcComponents/memberCenter/SubRegister";
import SubMyprofile from "@/pages/pcComponents/memberCenter/SubMyprofile";
import ForgetPassword from "@/pages/pcComponents/memberCenter/ForgetPassword";
import UpdatePassword from "@/pages/pcComponents/memberCenter/UpdatePassword";
import FormDownload from "@/pages/pcComponents/memberCenter/FormDownload";
import FbDialog from "@/pages/pcComponents/memberCenter/FbDialog.vue";
import CommonMask from "@/pages/pcComponents/common/CommonMask.vue";

export default {
    name: "GameCenter",
    components: {
        Loading,
        CommonNav,
        CommonFooter,
        SubLogin,
        SubRegister,
        SubMyprofile,
        ForgetPassword,
        UpdatePassword,
        FormDownload,
        FbDialog,
        CommonMask
    },
    data: function () {
        return {
            rid: this.$route.params.id,
            tabList: [
                {
                    id: "001",
                    name: "登入帳號",
                    title: "drzh",
                },
                {
                    id: "002",
                    name: "註冊帳號",
                    title: "zczh",
                },
                {
                    id: "003",
                    name: "個人資料",
                    title: "grzl",
                },
                {
                    id: "004",
                    name: "忘記密碼",
                    title: "wjmm",
                },
                {
                    id: "005",
                    name: "修改密碼",
                    title: "xgmm",
                },
                {
                    id: "006",
                    name: "表單下載",
                    title: "bdxz",
                },
            ],
            curId: 0,
            tabId: 0,
            platFormType: "",
            gamesList: [],
            isFbDialog: false,
            options: {
                isLoading: false,
                showLogin: true,
                isAni: false,
                isMask: false
            }
        }
    },
    computed: {
        
    },
    watch: {
        '$route' (to, from) {
            // console.log("2此時鏈接上傳過來的路由參數", to.params.rid);
        }
    },
    created() {
        let self = this;

        this.$bus.on("toRegister", function (val) {
            self.curId = val;
            self.tabId = 1;
        });

        this.$bus.on("toForgetPassword", function (val) {
            // console.log("第二次点击触发", val);
            self.curId = val;
            self.tabId = 3;
        });

        this.$bus.on("sub_loginSuccess", function (val) {
            self.options.showLogin = false;
            self.tabList.splice(0, 3);
            // console.log("此时的导航菜单数组是", self.tabList);
            self.tabList.splice(0, 1);
            // js 数组中追加多个对象方法
            var addList = {
                id: "003",
                name: "個人資料",
                title: "grzl",
            };
            var addList1 = {
                id: "005",
                name: "修改密碼",
                title: "xgmm",
            };
            var addList2 = {
                id: "006",
                name: "表單下載",
                title: "bdxz",
            };
            self.tabList.push(addList, addList1, addList2);
            // self.tabList.push("個人資料");
            // self.tabList.push("修改密碼");
            console.log("现在的导航成员", self.tabList);
        });

        this.$bus.on("registerNow", function (val, bool) {
            self.cuId = val;
            // console.log("bool的值", bool);
            self.options.showLogin = bool;
            self.tabList.splice(0, 3);
            self.tabList.splice(0, 1);
            var addList = {
                id: "003",
                name: "個人資料",
                title: "grzl",
            };
            var addList1 = {
                id: "005",
                name: "修改密碼",
                title: "xgmm",
            };
            var addList2 = {
                id: "006",
                name: "表單下載",
                title: "bdxz",
            };
            self.tabList.push(addList, addList1, addList2);
            // console.log("现在的导航成员", self.tabList);
        });
    },
    mounted() {
        this.$router.onReady(() => {
            // console.log("1此時鏈接上傳過來的路由參數", this.$route.params.rid);
            let rid = this.$route.params.rid;
            if(rid == 1) {
                this.curId = 1;
                this.tabId = 1;
            }
        })
        
        this.$store.commit("setIsLogin", true);
        this.$store.commit("setIsLoginCustomer", false);
        this.$store.commit("setIsLoginStore", false);
        this.options.isAni = true;
        if (localStorage.getItem("token")) {
            // 登录成功
            this.options.showLogin = false;
            this.tabList.splice(0, 2);
            this.tabList.splice(1, 1);
        } else {
            this.tabList.splice(2, 1);
            this.tabList.splice(3, 1);
        }
        // this.$bus.on("toForgetPassword", val => {
        //     console.log("这次第一次能监控到值了吗", val);
        // })

        let type = this.$utils.getUrlKey("type");
        let token = localStorage.getItem("token");

        if(type == "register") {
            if(token) {
                this.curId = 0;
                this.tabId = 2;
                this.options.showLogin = false;
            } else {
                this.curId = 1;
                this.tabId = 1;
                this.options.showLogin = true;
            }
            
        }
        if(type == "forgetPassword") {
            if(token) {
                this.curId = 0;
                this.tabId = 2;
                this.options.showLogin = false;
            } else {
                this.curId = 2;
                this.tabId = 3;
                this.options.showLogin = true;
            }
        }
        if(type == "formDownload") {
            if(token) {
                this.curId = 2;
                this.tabId = 5;
                this.options.showLogin = true;
            } else {
                this.curId = 3;
                this.tabId = 5;
                this.options.showLogin = true;
            }
        }
    },
    methods: {
        tab: function (i, name) {
            this.curId = i;
            this.tabId = i;
            if (localStorage.getItem("token")) {
                // 已登录
                if (name == "個人資料") {
                    this.tabId = 2;
                }
                if (i == 1 && name == "修改密碼") {
                    this.tabId = 4;
                    this.options.showLogin = true;
                }
                if (i == 2 && name == "表單下載") {
                    this.tabId = 5;
                    this.options.showLogin = true;
                }
            } else {
                if (name == "忘記密碼") {
                    this.tabId = 3;
                }
                if (name == "修改密碼") {
                    this.tabId = 4;
                }
            }
            if (name == "表單下載") {
                this.tabId = 5;
            }
        },
        handleStoreNow: function () {
            this.curId = 0;
        },
        toRegisterLink: function (val) {
            this.curId = val;
            this.tabId = 1;
        },
        LoginRegisterShow: function (val) {
            this.options.showLogin = val;
        },
        closeFbDialog: function () {
            this.isFbDialog = false;
            this.options.isMask = false;
        },
        closeDialog: function () {
            this.options.isMask = false;
            this.isFbDialog = false;
        },
        getAllGamesList: function () {
            let datas = datas;
            this.getHttp(this, datas, "/front/game/all", function (obj, data) {
                if (data.status == "2000") {
                    obj.gamesList = data.data;
                    obj.firstGameId = data.data[0].id;
                }
            });
        },
        thirdLoginDialog: function (type) {
            this.getAllGamesList();
            this.platFormType = type;
            this.options.isMask = true;
            this.isFbDialog = true;
        }
    }
};
</script>

<style lang="stylus" scoped>
.game_wrapper {
    margin-bottom: 130px;

    h2 {
        position: relative;
        display: block;
        width: 100%;
        font-size: 47.02px;
        color: #4b4b4b;
        font-weight: 500;
        text-indent: 244px;
        margin-bottom: 40px;

        &::before {
            content: '';
            position: absolute;
            width: 28px;
            height: 42px;
            top: 50%;
            left: 544px;
            margin-top: -18px;
            background: url('../../assets/imgs/hms-icon.png') no-repeat center;
            background-size: 300px 300px;
            background-position: -218px 0;
        }
    }

    .hot_comWidth {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
    }

    .hot {
        margin-top: 98px;
        margin-bottom: 46px;
        min-height: 680px;

        &>h2 {
            position: relative;
            display: block;
            width: 100%;
            text-indent: 30px;
            font-size: 47.02px;
            color: #4b4b4b;
            font-weight: 500;

            &::before {
                content: '';
                position: absolute;
                width: 28px;
                height: 42px;
                top: 50%;
                left: 485px;
                margin-top: -21px;
                background: url('../../assets/imgs/hms-icon.png') no-repeat center;
                background-size: 300px 300px;
                background-position: -218px 0;
            }
        }
    }
}

.hot_wrapper {
    margin-top: 32px;
    width: 943px;

    .hms_ul {
        width: 150px;
        padding: 18px 0 30px 0;
        margin-top: 130px;
        border-right: 2px solid #fcc505;
    }

    ul.hot_tab {
        width: 150px;

        li {
            position: relative;
            width: 150px;
            text-align: center;
            background: #fff;
            cursor: pointer;
            margin-top: 25px;

            a {
                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    background: url('../../assets/imgs/hms-icon.png') no-repeat center;
                    background-size: 300px 300px;
                }
            }

            a {
                display: inline-block;
                width: 100%;
                font-size: 26px;
                color: #4b4a47;

                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    background: url('../../assets/imgs/hms-icon.png') no-repeat center;
                    background-size: 300px 300px;
                }

                &.gray-drzh {
                    &::before {
                        width: 18px;
                        height: 18px;
                        margin-top: -7px;
                        left: -3px;
                        background-position: -40px -192px;
                    }
                }

                &.gray-zczh {
                    &::before {
                        width: 23px;
                        height: 22px;
                        background-position: -242px -225px;
                        margin-top: -9px;
                        left: -3px;
                    }
                }

                &.gray-grzl {
                    &::before {
                        width: 18px;
                        height: 24px;
                        background-position: -40px -253px;
                        margin-top: -9px;
                        left: -3px;
                    }
                }

                &.gray-wjmm {
                    &::before {
                        width: 18px;
                        height: 22px;
                        margin-top: -11px;
                        left: 0;
                        background-position: -39px -223px;
                    }
                }

                &.gray-xgmm {
                    &::before {
                        width: 24px;
                        height: 24px;
                        background-position: -268px -186px;
                        margin-top: -9px;
                        left: -5px;
                    }
                }

                &.gray-bdxz {
                    &::before {
                        width: 24px;
                        height: 24px;
                        background-position: -148px -190px;
                        margin-top: -9px;
                        left: -5px;
                    }
                }
            }

            &.active {
                color: #fcc814;
                font-size: 26px;
            }

            &:nth-child(1) {
                margin-top: 0;
            }

            &.yellow {
                .yellow-drzh {
                    a {
                        color: #fcc814;

                        &::before {
                            width: 18px;
                            height: 18px;
                            margin-top: -7px;
                            left: -3px;
                            background-position: -68px -192px;
                        }
                    }
                }

                .yellow-zczh {
                    a {
                        color: #fcc814;

                        &::before {
                            width: 23px;
                            height: 22px;
                            background-position: -216px -225px;
                            margin-top: -9px;
                            left: -3px;
                        }
                    }
                }

                .yellow-grzl {
                    a {
                        color: #fcc814;

                        &::before {
                            width: 18px;
                            height: 24px;
                            margin-top: -9px;
                            left: -3px;
                            background-position: -90px -252px;
                        }
                    }
                }

                .yellow-wjmm {
                    a {
                        color: #fcc814;

                        &::before {
                            width: 18px;
                            height: 22px;
                            margin-top: -11px;
                            left: 0;
                            background-position: -70px -223px;
                        }
                    }
                }

                .yellow-xgmm {
                    a {
                        color: #fcc814;

                        &::before {
                            width: 24px;
                            height: 24px;
                            margin-top: -9px;
                            left: -5px;
                            background-position: -236px -186px;
                        }
                    }
                }

                .yellow-bdxz {
                    a {
                        color: #fcc814;

                        &::before {
                            width: 24px;
                            height: 24px;
                            margin-top: -9px;
                            left: -5px;
                            background-position: -178px -190px;
                        }
                    }
                }
            }
        }
    }

    .hot_con {
        position: relative;
        width: 622px;
        height: 468px;
        margin-left: 169px;
    }
}
</style>