<template>
    <div class="wrapper herms_comwidth">
        <common-nav :options="options" @loginInMemberCenter="loginInMemberCenter"></common-nav>
        <div class="game_wrapper_m">
            <h2
                class="animated box_shadow"
                v-if="options.isAni"
                :class="{fadeInLeft: options.isAni}"
            >會員中心</h2>
            <div class="hot hot_comWidth">
                <div class="hot_wrapper">
                    <div
                        class="hms_ul animated"
                        v-if="options.isAni"
                        :class="{fadeInLeft: options.isAni}"
                    >
                        <ul class="hot_tab" :style="{width:options.widths}">
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
                    <div
                        class="hot_con animated"
                        v-if="options.isAni"
                        :class="{fadeInRight: options.isAni}"
                    >
                        <div v-if="tabId == 0 && showLogin == true" v-cloak>
                            <sub-login
                                :options="options"
                                @handleClickThirdLogin="handleClickThirdLogin"
                                @loadCustomerUserGamesList="loadCustomerUserGamesList"
                                v-cloak
                            ></sub-login>
                        </div>
                        <div v-if="tabId == 1 && showLogin == true" v-cloak>
                            <!-- 注册 22link -->
                            <sub-register :options="options"></sub-register>
                        </div>
                        <div v-if="tabId == 2 || showLogin == false" v-cloak>
                            <!-- 个人资料 -->
                            <sub-myprofile
                                :options="options"
                                :datePickerSelected="datePickerSelected"
                                :areaSelected="areaSelected"
                                @LoginRegisterShow="LoginRegisterShow"
                                @openPicker="openPicker"
                                @openPickerArea="openPickerArea"
                            ></sub-myprofile>
                        </div>
                        <div v-if="tabId == 3 && showLogin == true" v-cloak>
                            <!-- 忘記密碼  22link -->
                            <forget-password :options="options"></forget-password>
                        </div>
                        <div v-if="tabId == 4 && showLogin == true" v-cloak>
                            <!-- 修改密碼 -->
                            <update-password :options="options"></update-password>
                        </div>
                        <div v-if="tabId == 5 && showLogin == true" v-cloak>
                            <!-- 表单下载 22link -->
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
        <nav-mask :options="options"></nav-mask>
        <!-- 第三方登录选择 -->
        <template>
            <mt-popup
                v-model="options.popupVisible"
                position="bottom"
                :closeOnClickModal="false"
                :lockScroll="true"
            >
                <div class="popup-container" @touchmove.prevent>
                    <mt-picker
                        :slots="slots"
                        :showToolbar="true"
                        ref="picker"
                        valueKey="name"
                        @change="onValuesChange"
                    >
                        <span @click="cancel" class="mint-datetime-action mint-datetime-cancel">取消</span>
                        <span @click="confirm" class="mint-datetime-action mint-datetime-confirm">確認</span>
                    </mt-picker>
                </div>
            </mt-popup>
        </template>
        <!-- 生日日期选择 -->
        <template>
            <mt-datetime-picker
                ref="pickerDate"
                type="date"
                confirmText="確認"
                v-model="pickerValue"
                :pickerValue="pickerValue"
                :startDate="startDate"
                :lockScroll="true"
                @touchmove.prevent
                @confirm="handleConfirm"
                @visible-change="ieventDataTime"
            ></mt-datetime-picker>
        </template>
        <!-- 地区选择 -->
        <template>
            <mt-popup
                v-model="options.areaVisible"
                position="bottom"
                :closeOnClickModal="false"
                :lockScroll="true"
            >
                <div class="popup-container" @touchmove.prevent>
                    <mt-picker
                        :slots="slots_area"
                        :showToolbar="true"
                        ref="pickerArea"
                        valueKey="zh_name"
                        @change="onValuesChange"
                    >
                        <span
                            @click="cancel_area"
                            class="mint-datetime-action mint-datetime-cancel"
                        >取消</span>
                        <span
                            @click="confirm_area"
                            class="mint-datetime-action mint-datetime-confirm"
                        >確認</span>
                    </mt-picker>
                </div>
            </mt-popup>
        </template>
        <screentips-mask></screentips-mask>
        
    </div>
</template>

<script>
import Loading from "@/pages/mComponents/common/Loading";
import CommonNav from "@/pages/mComponents/common/CommonNav.vue";
import CommonFooter from "@/pages/mComponents/common/CommonFooter.vue";
import SubLogin from "@/pages/mComponents/memberCenter/SubLogin";
import SubRegister from "@/pages/mComponents/memberCenter/SubRegister";
import SubMyprofile from "@/pages/mComponents/memberCenter/SubMyprofile";
import ForgetPassword from "@/pages/mComponents/memberCenter/ForgetPassword";
import UpdatePassword from "@/pages/mComponents/memberCenter/UpdatePassword";
import NavMask from "@/pages/mComponents/common/NavMask.vue";
import ScreentipsMask from "@/pages/mComponents/common/ScreenTips.vue";
import FormDownload from "@/pages/mComponents/memberCenter/FormDownload";

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
        NavMask,
        ScreentipsMask,
        FormDownload,
    },
    data: function () {
        return {
            tabList: [
                {
                    id: "001",
                    name: "登入帳號",
                    title: "drzh",
                },
                {
                    id: "002",
                    name: "",
                    title: "zczh",
                },
                {
                    id: "003",
                    name: "個人資料",
                    title: "grzl",
                },
                {
                    id: "004",
                    name: "",
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
            options: {
                isLoading: false,
                isAni: false,
                isLoginNav: false,
                popupVisible: false,
                areaVisible: false,
                isDownload: false,
                widths:'78%'
            },
            gamesList: [],
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: "slot1",
                    textAlign: "center",
                },
            ],
            areaList: [],
            slots_area: [
                {
                    flex: 1,
                    values: [
                        {
                            id: "001",
                            zh_name: "臺灣",
                            en_name: "taiwan",
                        },
                        {
                            id: "002",
                            zh_name: "香港",
                            en_name: "xianggang",
                        },
                        {
                            id: "003",
                            zh_name: "澳門",
                            en_name: "aomen",
                        },
                        {
                            id: "004",
                            zh_name: "中國大陸",
                            en_name: "zhongguodalu",
                        },
                        {
                            id: "005",
                            zh_name: "韓國",
                            en_name: "hanguo",
                        },
                        {
                            id: "006",
                            zh_name: "日本",
                            en_name: "riben",
                        },
                        {
                            id: "007",
                            zh_name: "新加坡",
                            en_name: "xinjiapo",
                        },
                        {
                            id: "008",
                            zh_name: "馬來西亞",
                            en_name: "malaixiya",
                        },
                        {
                            id: "009",
                            zh_name: "美國",
                            en_name: "meiguo",
                        },
                        {
                            id: "010",
                            zh_name: "其他",
                            en_name: "qita",
                        },
                    ],
                    className: "slot1",
                    textAlign: "center",
                },
            ],
            url: "",
            platFormType: "",
            pickerValue: "",
            datePickerSelected: 0,
            areaSelected: "",
            startDate: new Date("1960-01-01"),

            handler: function (e) {
                e.preventDefault();
            },
        };
    },
    computed: {
        tabId: function () {
            return this.$store.state.tabId
        },
        showLogin: function () {
            return this.$store.state.showLogin
        }
    },
    created() {
        let self = this;

        this.$bus.on("toRegister", function (val) {
            self.curId = val;
            self.$store.commit("setTabId", 1);
            // self.tabId = 1;
        });

        this.$bus.on("toForgetPassword", function (val) {
            self.curId = val;
            self.$store.commit("setTabId", 3);
        });

        this.$bus.on("toRegisterLink", function (val) {
            self.curId = val;
            self.$store.commit("setTabId", 1);
        });

        this.$bus.on("sub_loginSuccess", function (val) {
            // console.log("开始此时的导航数组", self.tabList);
            // self.options.showLogin = false;
            self.$store.commit("showLogin", false);
            self.tabList.splice(0, 2);
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
            self.tabList.splice(3, 2);
            // console.log("结束此时的导航数组", self.tabList);
        });

        this.$bus.on("registerNow", function (val, bool) {
            console.log("886开始此时的导航数组", self.tabList);
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
            self.$store.commit("setTabId", val);
            // self.tabId = val;
            self.curId = 0;
            // self.options.showLogin = bool;
            self.$store.commit("showLogin", bool);

            self.tabList.push(addList, addList1, addList2);
            console.log("886结束此时的顶部tab标签", self.tabList);
        });

        this.$bus.on("downloadSend", (val) => {
            if (val == false) {
                this.options.isDownload = val;
            } else {
                this.options.isDownload = true;
            }
        });

        this.$bus.on("delTabList", () => {
            this.tabList = [];
        });

        this.$bus.on("thirdLoginDialog", (type) => {
            console.log("bus组件on接收值——此时的登录类型", type);
            this.getAllGamesList();
            this.platFormType = type;
            this.options.isMask = true;
            this.isFbDialog = true;
            this.options.popupVisible = true;
        })
    },
    mounted() {
        if (localStorage.getItem("token")) {
            this.getUserGamesList();
            this.options.widths = "78%"
            // this.options.showLogin = false;
            this.$store.commit("showLogin", false);
            // this.options.isDownload = true;
            this.tabList.splice(0, 2);
            this.tabList.splice(1, 1);
        } else {
            // this.tabId = 0;
            this.options.widths = "48%"
            this.tabList.splice(1, 4);
            this.$store.commit("showLogin", true);
            this.$store.commit("setTabId", 0);
            // this.tabList.splice(2, 1);
            // this.tabList.splice(3, 1);
        }
        // this.$store.commit("setTabId", 0);
        this.options.isAni = true;
        // 登录都有
        this.options.isDownload = true;
        let type = this.$utils.getUrlKey("type");
        let token = localStorage.getItem("token");

        if(type == "register") {
            if(token) {
            } else {
                this.$store.commit("setTabId", 1);
                this.$store.commit("showLogin", true);
            }
        }
        if(type == "forgetPassword") {
            if(token) {

            } else {
                this.$store.commit("setTabId", 3);
                this.$store.commit("showLogin", true);
            }
        }
        if(type == "formDownload") {
            if(token) {
                this.curId = 2;
                this.$store.commit("setTabId", 5);
                this.$store.commit("showLogin", true);
            } else {
                this.curId = 1;
                this.$store.commit("setTabId", 5);
                this.$store.commit("showLogin", true);
            }
        }

    },
    methods: {
        //滚轮变化回调
        onValuesChange(picker, values) {
            // let appid = values[0].appid;
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        },
        cancel() {
            this.options.popupVisible = false;
            this.gamesList = "";
            this.slots[0].values = "";
        },
        confirm() {
            this.options.popupVisible = false;
            let values = this.$refs.picker.getValues();
            let appid = values[0].appid;
            this.gamesList = "";
            this.slots[0].values = "";
            // 第三方登录跳转
            if (this.platFormType == "facebook") {
                if (
                    navigator.userAgent.match(
                        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                    )
                ) {
                    // 移动端
                    this.url =
                        "https://sdk.gamemorefun.com/mobile/v1/passport/facebook/5?app_id=" +
                        appid +
                        "&redirect_url=https%3A%2F%2Fwww.hermesgames.com.tw%2F%23%2Fmobile%2Fhome";
                } else {
                    // PC端
                    this.url =
                        "https://sdk.gamemorefun.com/mobile/v1/passport/facebook/5?app_id=" +
                        appid +
                        "&redirect_url=https%3A%2F%2Fwww.hermesgames.com.tw%2F%23%2Fpc%2Fhome";
                }
            }
            
            if (this.platFormType == "google") {
                if (
                    navigator.userAgent.match(
                        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                    )
                ) {
                    this.url =
                        "https://sdk.gamemorefun.com/rest/v2/passport/google/5?app_id=" +
                        appid +
                        "&redirect_url=https%3A%2F%2Fwww.hermesgames.com.tw%2F%23%2Fmobile%2Fhome";
                } else {
                    this.url =
                        "https://sdk.gamemorefun.com/rest/v2/passport/google/5?app_id=" +
                        appid +
                        "&redirect_url=https%3A%2F%2Fwww.hermesgames.com.tw%2F%23%2Fpc%2Fhome";
                }
            }

            if (this.platFormType == "apple") {
                if (
                    navigator.userAgent.match(
                        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                    )
                ) {
                    this.url =
                        "https://sdk.gamemorefun.com/rest/v2/passport/apple/5?app_id=" +
                        appid +
                        "&redirect_url=https%3A%2F%2Fwww.hermesgames.com.tw%2F%23%2Fmobile%2Fhome";
                } else {
                    this.url =
                        "https://sdk.gamemorefun.com/rest/v2/passport/apple/5?app_id=" +
                        appid +
                        "&redirect_url=https%3A%2F%2Fwww.hermesgames.com.tw%2F%23%2Fpc%2Fhome";
                }
            }

            window.location.href = this.url;
        },
        openPicker: function () {
            this.$refs.pickerDate.open();
        },
        openPickerArea: function () {
            this.options.areaVisible = true;
            this.areaList = this.slots_area[0].values;
            // this.$refs.pickerArea.open();
        },
        handleConfirm: function (date) {
            this.openTouch();
            // console.log("點擊日期時候確定獲取的值",date,"轉化為時間戳",this.dateToMs(date));
            this.datePickerSelected = this.dateToMs(date);
        },
        dateToMs: function (date) {
            let result = new Date(date).getTime();
            return result;
        },
        cancel_area() {
            this.options.areaVisible = false;
        },
        confirm_area() {
            this.options.areaVisible = false;
            let values = this.$refs.pickerArea.getValues();
            // console.log("獲得地區是一個數組", values, values[0].zh_name);
            this.areaSelected = values[0].zh_name;
        },
        loginInMemberCenter: function () {
            if (this.tabId !== 0) {
                this.$store.commit("setTabId", 0);
                // this.tabId = 0;
                // this.options.showLogin = true;
                this.$store.commit("showLogin", true);
            }
        },
        getAllGamesList: function () {
            let datas = datas;
            this.getHttp(this, datas, "/front/game/all", function (obj, data) {
                if (data.status == "2000") {
                    obj.gamesList = data.data;
                    obj.slots[0].values = obj.gamesList;
                    obj.firstGameId = data.data[0].id;
                    obj.firstAppIdInit(obj.firstGameId);
                }
            });
        },
        tab: function (i, name) {
            this.curId = i;
            this.$store.commit("setTabId", i);
            // this.tabId = i;
            if (localStorage.getItem("token")) {
                if (name == "個人資料") {
                    this.$store.commit("setTabId", 2);
                    // this.tabId = 2;
                }
                if (i == 1 && name == "修改密碼") {
                    this.$store.commit("setTabId", 4);
                    // this.tabId = 4;
                    // this.options.showLogin = true;
                    this.$store.commit("showLogin", true);
                }
                if (i == 2 && name == "表單下載") {
                    this.$store.commit("setTabId", 5);
                    // this.tabId = 5;
                    // this.options.showLogin = true;
                    this.$store.commit("showLogin", true);
                }
            } else {
                if (name == "忘記密碼") {
                    this.$store.commit("setTabId", 3);
                    // this.tabId = 3;
                }
                if (name == "修改密碼") {
                    this.$store.commit("setTabId", 4);
                    // this.tabId = 4;
                }
            }
            if (name == "表單下載") {
                this.$store.commit("setTabId", 5);
                // this.tabId = 5;
            }
        },
        handleStoreNow: function () {
            this.curId = 0;
        },
        LoginRegisterShow: function (val) {
            // this.options.showLogin = val;
            this.$store.commit("showLogin", val);
        },
        // 弹出层打开时禁止body的滚动事件，弹出层关闭时恢复body的滚动事件
        closeTouch() {
            document
                .getElementsByTagName("body")[0]
                .addEventListener("touchmove", this.handler, {
                    passive: false,
                }); //阻止默认的滚动事件
        },
        openTouch() {
            document
                .getElementsByTagName("body")[0]
                .removeEventListener("touchmove", this.handler, {
                    passive: false,
                }); //打开默认的滚动事件
        },
        ieventDataTime: function (data) {
            if (data) {
                this.closeTouch();
            } else {
                this.openTouch();
            }
        },
        getUserGamesList: function () {
            this.options.isLoading = true;
            let datas = datas;
            this.getHttp(this, datas, "/front/user/games", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    let d = data.data;
                    if(d.games_list.length == 0) {
                        obj.$toast("您還沒有已註冊的遊戲!");
                        obj.options.isShowD = true;
                        obj.serverNameList="";
                        obj.roleNameList="";
                        obj.slots_server[0].values = "";
                        obj.slots_role[0].values = "";
                        obj.options.popVisible_server = false;
                        obj.options.popVisible_role = false;
                        obj.valueSelected_server = "";
                        obj.valueSelected_role = "";
                    }
                    obj.userGamesList = d.games_list;
                    obj.gameId = obj.userGamesList[0].id;
                    obj.slots[0].values = obj.userGamesList;
                    obj.valueSelected_game = obj.userGamesList[0].name;
                    obj.gameId = d.games_list[0].id;
                    obj.uuid = d.games_list[0].uuid;
                    obj.appid = d.games_list[0].appid;
                    obj.appName = d.games_list[0].name;
                    // console.log("此時的遊戲id", obj.gameId, obj.appid, obj.uuid);
                    
                    obj.getServerInfo(obj.gameId, obj.appid, obj.uuid);

                    if(obj.type_picker =="game") {
                        obj.options.popVisible_game = true;
                    }
                    
                    setTimeout(() => {
                        obj.$bus.emit("sendData", obj.userGamesList);
                    }, 200);

                    if (d.games_list.length == 0) {
                        obj.options.isLoading = false;
                        obj.$toast("暫無註冊的遊戲哦!");
                        return false;
                    }
                } else {
                    obj.options.isLoading = false;
                    obj.$toast(data.message);
                }
            });
        },
        handleClickThirdLogin: function(type) {
            this.getAllGamesList();
            this.platFormType = type;
            this.options.isMask = true;
            this.isFbDialog = true;
            this.options.popupVisible = true;
        },
        loadCustomerUserGamesList: function() {
            this.getUserGamesList();
        }
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles_m/varibles.styl';

.wrapper {
    width: 100%;
    height: 100%;
    background: #ebf0f3;
}

.game_wrapper_m {
    h2 {
        position: relative;
        display: block;
        width: 100%;
        text-indent: 0.3rem;
        font-size: 0.3rem;
        color: #4b4b4b;
        font-weight: 500;
        text-align: center;
        margin-top: 1.16rem;
        height: 0.85rem;
        background: #eeeeee;
        line-height: 0.85rem;

        &::before {
            content: '';
            position: absolute;
            width: 0.21rem;
            height: 0.3rem;
            top: 50%;
            left: 50%;
            margin-top: -0.15rem;
            margin-left: -0.75rem;
            background: url('../../assets/imgs_m/hms-icon.png') no-repeat center;
            background-size: 3rem 3rem;
            background-position: -2.78rem 0;
        }
    }

    .hot_comWidth {
        margin: 0 auto;
        text-align: center;
    }

    .hot {
        width: 90%;
        margin: 0 auto;
    }
}

.hot_wrapper {
    margin-top: 0.32rem;
    width: 100%;
    padding-bottom: 0.6rem;
    margin-bottom: 1rem;

    .hms_ul {
    }

    ul.hot_tab {
        display: flex;
        width: 78%;
        margin: 0 auto;
        text-align: center;

        li {
            flex: 1;
            position: relative;
            text-align: center;
            cursor: pointer;

            a {
                display: inline-block;
                width: 100%;
                font-size: 0.28rem;
                color: #303030;
                text-shadow: rgba(0, 0, 0, 0.1) 0.03rem 0.03rem 0.02rem;

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
                    }
                }
            }
        }
    }

    .hot_con {
        position: relative;
        margin-top: 0.25rem;
    }
}
</style>