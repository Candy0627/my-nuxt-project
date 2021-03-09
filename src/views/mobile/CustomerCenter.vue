<template>
    <div class="wrapper all_m herms_comwidth">
        <common-nav :options="options"></common-nav>
        <screentips-mask></screentips-mask>
        
        <div class="game_wrapper">
            <div class="hot">
                <h2
                    class="animated box_shadow"
                    v-if="options.isAni"
                    :class="{fadeInLeft: options.isAni}"
                >客服中心</h2>
                <div class="hot_wrapper">
                    <div
                        class="hms_ul animated"
                        v-if="options.isAni"
                        :class="{fadeInLeft: options.isAni}"
                    >
                        <ul class="hot_tab">
                            <li
                                :class="{active:curId === index}"
                                class="gray"
                                v-for="(item,index) in tabList"
                                :key="index"
                                @click="tab(index)"
                            >{{item}}</li>
                        </ul>
                    </div>
                    <div
                        class="hot_con animated"
                        v-if="options.isAni"
                        :class="{fadeInRight: options.isAni}"
                    >
                        <div v-if="curId == 0" v-cloak>
                            <customer-online
                                :options="options" 
                                :curId="curId"
                                :valueSelected_game="valueSelected_game"
                                :valueSelected_server="valueSelected_server"
                                :valueSelected_role="valueSelected_role"
                                @openPicker_game="openPicker_game"
                                @openPicker_server="openPicker_server"
                                @openPicker_role="openPicker_role"
                                @submitForm="submitForm"
                                v-cloak
                                v-if="token"
                            ></customer-online>
                            <sub-login
                                :options="options"
                                @handleClickThirdLogin="handleClickThirdLogin"
                                @loadCustomerUserGamesList="loadCustomerUserGamesList"
                                v-cloak
                                v-else
                            ></sub-login>

                        </div>
                        <div v-if="curId == 1">
                            <customer-contactus></customer-contactus>
                        </div>
                        <div v-if="curId == 2">
                            <customer-termsservice></customer-termsservice>
                        </div>
                        <div v-if="curId == 3">
                            <customer-privacypolicy></customer-privacypolicy>
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
        <!-- <common-pop :options="options"></common-pop> -->
        <!-- 遊戲 -->
        <template>
            <mt-popup v-model="options.popVisible_game" position="bottom" :closeOnClickModal="false" :lockScroll="true">
                <div class="popup-container" @touchmove.prevent>
                    <mt-picker :slots="slots" :showToolbar="true" ref="picker_game" valueKey="name" @change="onValuesChange">
                        <span @click="cancel()" class="mint-datetime-action mint-datetime-cancel">取消</span>
                        <span @click="confirm()" class="mint-datetime-action mint-datetime-confirm">確認</span>
                    </mt-picker>
                </div>
            </mt-popup>
        </template>

        <!-- 区服 -->
        <template>
            <mt-popup v-model="options.popVisible_server" position="bottom" :closeOnClickModal="false" :lockScroll="true">
                <div class="popup-container" @touchmove.prevent>
                    <mt-picker :slots="slots_server" :showToolbar="true" ref="picker_server" valueKey="server_name" @change="onValuesChange">
                        <span @click="cancel_server()" class="mint-datetime-action mint-datetime-cancel">取消</span>
                        <span @click="confirm_server()" class="mint-datetime-action mint-datetime-confirm">確認</span>
                    </mt-picker>
                </div>
            </mt-popup>
        </template>

        <!-- 角色 -->
        <template>
            <mt-popup v-model="options.popVisible_role" position="bottom" :closeOnClickModal="false" :lockScroll="true">
                <div class="popup-container" @touchmove.prevent>
                    <mt-picker :slots="slots_role" :showToolbar="true" ref="picker_role" valueKey="role_name" @change="onValuesChange">
                        <span @click="cancel_role()" class="mint-datetime-action mint-datetime-cancel">取消</span>
                        <span @click="confirm_role()" class="mint-datetime-action mint-datetime-confirm">確認</span>
                    </mt-picker>
                </div>
            </mt-popup>
        </template>

        <!-- 第三方登录选择 -->
        <template>
            <mt-popup
                v-model="options.popupVisible"
                position="bottom"
                :closeOnClickModal="false"
                :lockScroll="true"
            >
                <div class="popup-container" @touchmove.prevent>
                    <mt-picker :slots="slots" :showToolbar="true" ref="picker" valueKey="name">
                        <span
                            @click="cancel_third"
                            class="mint-datetime-action mint-datetime-cancel"
                        >取消</span>
                        <span
                            @click="confirm_third"
                            class="mint-datetime-action mint-datetime-confirm"
                        >確認</span>
                    </mt-picker>
                </div>
            </mt-popup>
        </template>

    </div>
</template>

<script>
import Loading from "@/pages/mComponents/common/Loading";
import CommonNav from "@/pages/mComponents/common/CommonNav.vue";
import CommonPop from "@/pages/mComponents/common/CommonPop.vue";
import CommonFooter from "@/pages/mComponents/common/CommonFooter.vue";
import CustomerOnline from "@/pages/mComponents/customerCenter/CustomerOnline";
import CustomerContactus from "@/pages/mComponents/customerCenter/CustomerContactus";
import CustomerTermsservice from "@/pages/mComponents/customerCenter/CustomerTermsservice";
import CustomerPrivacypolicy from "@/pages/mComponents/customerCenter/CustomerPrivacypolicy";
import NavMask from "@/pages/mComponents/common/NavMask.vue";
import ScreentipsMask from "@/pages/mComponents/common/ScreenTips.vue";
import SubLogin from "@/pages/mComponents/memberCenter/SubLogin";

export default {
    name: "GameCenter",
    components: {
        Loading,
        CommonNav,
        CommonPop,
        CommonFooter,
        CustomerContactus,
        CustomerTermsservice,
        CustomerPrivacypolicy,
        CustomerOnline,
        NavMask,
        ScreentipsMask,
        SubLogin
    },
    data: function () {
        return {
            tabList: ["聯絡客服", "聯繫我們", "服務條款", "隱私權政策"],
            curId: 0,
            val: 0,
            options: {
                isLoading: false,
                isAni: false,
                isOnline: false,
                popupVisible: false,
                popVisible_game: false,
                popVisible_server: false,
                popVisible_role: false,
                isShowD: false
            },
            uuid: 0,
            appid: 0,
            gameId: 0,
            serverId: 0,
            roleId: 0,
            appName: "",
            roleName:'',
            serverName:"",
            serverNameList: [],
            gamesAllList: [],
            roleNameList: [],
            userGamesList: [],
            valueSelected_game:'',
            type_picker:'',
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: "slot1",
                    textAlign: "center",
                }
            ],
            valueSelected_server:'',
            slots_server: [
                {
                    flex: 1,
                    values: [],
                    className: "slot1",
                    textAlign: "center",
                }
            ],
            valueSelected_role:'',
            slots_role: [
                {
                    flex: 1,
                    values: [],
                    className: "slot1",
                    textAlign: "center",
                }
            ],
        };
    },
    computed: {
        token: function () {
            return this.$store.state.token;
        },
        userInfo: function () {
            return this.$store.state.userInfo;
        }
    },
    created() {
        let self = this;
        this.$bus.on("toTermsservice", function (val) {
            this.val = val;
            self.curId = val;
        });
        this.$bus.on("footerToLink", function (val) {
            self.curId = val;
            self.options.isAni = true;
        });
    },
    mounted() {
        this.options.isAni = true;
        if (localStorage.getItem("token")) {
            // this.options.isOnline = true;
            this.getUserGamesList();
        } else {
            // this.options.isOnline = false;
        }
    },
    methods: {
        tab: function (i) {
            this.curId = i;
        },
        handleStoreNow() {
            this.curId = 0;
        },
        openPicker_game: function(type) {
            this.type_picker = type;
            this.getUserGamesList();
        },
        openPicker_server: function(type) {
            this.type_picker = type;
            this.options.popVisible_server = true;
        },
        openPicker_role: function(type) {
            this.type_picker = type;
            this.options.popVisible_role = true;
            // this.getServerInfo();
        },
        onValuesChange: function(picker, values) {
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        },
        cancel: function() {
            this.options.popVisible_game = false;
            this.gamesList = "";
            this.slots[0].values=""
        },
        confirm: function() {
            this.options.popVisible_game = false;
            let values = this.$refs.picker_game.getValues();
            // console.log("当前选中的游戏的id",values,values[0].id);
            this.gameId = values[0].id;
            this.appid = values[0].appid;
            this.uuid = values[0].uuid;
            this.getServerInfo(this.gameId, this.appid, this.uuid);
            this.valueSelected_game = values[0].name;
            this.gamesList = "";
            this.slots[0].values=""
        },
        cancel_server: function() {
            this.options.popVisible_server = false;
        },
        confirm_server: function() {
            this.options.popVisible_server = false;
            let values = this.$refs.picker_server.getValues();
            // console.log("当前选中的游戏的serverid",values[0].server_id);
            this.serverId = values[0].server_id;
            this.valueSelected_server = values[0].server_name;
            // 根据server_id查询角色联动
            if (this.serverId !== null && this.serverId !== "" && this.serverId !== undefined) {
                for (var item of this.serverNameList) {
                    if (item.server_id == this.serverId) {
                        // console.log("此时服务器查询出来的角色名是", item, item.role_info);
                        this.valueSelected_role = item.role_info[0].role_name;
                        this.slots_role[0].values = item.role_info;
                    }
                }
            }
        },
        cancel_role: function() {
            this.options.popVisible_role = false;
        },
        confirm_role: function() {
            this.options.popVisible_role = false;
            let values = this.$refs.picker_role.getValues();
            // console.log("当前选中的游戏的roleid",values[0].role_id);
            this.roleId = values[0].role_id;
            this.valueSelected_role = values[0].role_name;
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
        getServerInfo: function (gameid, appid, uuid) {
            this.options.isLoading = true;
            let datas = {
                game_id: gameid,
                appid: appid,
                uuid: uuid,
            };
            this.getHttp(this, datas, "/front/game/server/role", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    obj.options.isShowD = false;
                    let d = data.data;
                    if(d.length == 0) {
                        obj.options.isLoading = false;
                        obj.$toast("您還沒有創建區服和角色！");
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
                    obj.serverNameList = d;
                    obj.slots_server[0].values = obj.serverNameList;
                    obj.valueSelected_server = obj.serverNameList[0].server_name;
                    // obj.ruleForm.serverInfo = d[0].server_id;
                    // obj.ruleForm.roleInfo = d[0].role_info[0].role_id;
                    // obj.handleChangedServer(obj.ruleForm.serverInfo);
                    obj.serverId = d[0].server_id;
                    obj.roleId = d[0].role_info[0].role_id;
                    obj.handleChangedServer(obj.serverId);
                } else {
                    obj.options.isLoading = false;
                    obj.$toast(data.message);
                }
            });
        },
        handleChangedServer: function (s_id) {
            this.options.isLoading = true;
            this.serverId = s_id;
            if (s_id !== null && s_id !== "" && s_id !== undefined) {
                // 根据服务器id检索出对应的角色信息数组
                for (var item of this.serverNameList) {
                    if (item.server_id == s_id) {
                        this.options.isLoading = false;
                        this.roleNameList = item.role_info;
                        this.slots_role[0].values = item.role_info;
                        this.valueSelected_role= item.role_info[0].role_name;
                        this.roleId = item.role_info[0].role_id;
                        this.ruleForm.roleInfo = this.roleId;
                        this.current_server_name = item.server_name;
                        this.current_role_name = item.role_info[0].role_name;
                        console.log("伺服器：", this.current_server_name,"角色名：", this.current_role_name,"用户名：", this.userInfo.username);
                    }
                }
            }
        },
        submitForm: function (formName) {
            this.options.isLoading = true;
            // 拼裝跳轉鏈接
            if(!this.valueSelected_game) {
                this.options.isLoading = false;
                this.$toast("您還沒有已註冊過的遊戲！");
                return
            }
            if(!this.valueSelected_server) {
                this.options.isLoading = false;
                this.$toast("您還沒有創建區服和角色！");
                return
            }
            if(!this.valueSelected_role) {
                this.options.isLoading = false;
                this.$toast("您還沒有創建區服和角色！");
                return
            }
            this.options.isLoading = false;
            console.log("當前的鏈接參數",'uuid',this.uuid,'appid', this.appid,'s_name', this.serverName, 'app_name',this.appName, 'role_name',this.roleName, 'username',this.userInfo.username);
            let newUrl =
                "http://cs.hermesgames.com.tw/create?uid=" +
                this.uuid +
                "&app_id=" +
                this.appid +
                "&sname=" +
                this.valueSelected_server +
                "&app_name=" +
                this.valueSelected_game +
                "&role=" +
                this.valueSelected_role +
                "&username=" +
                this.userInfo.account +
                "&platform=oms&";
            window.open(newUrl);
                
        },
        getAllGamesList: function () {
            let datas = datas;
            this.getHttp(this, datas, "/front/game/all", function (obj, data) {
                if (data.status == "2000") {
                    obj.gamesAllList = data.data;
                    obj.slots[0].values = obj.gamesAllList;
                    obj.firstGameId = data.data[0].id;
                    obj.firstAppIdInit(obj.firstGameId);
                }
            });
        },
        confirm_third: function () {
            this.options.popupVisible = false;
            let values = this.$refs.picker.getValues();
            console.log("點擊確定後得到的值也是一個數組", values);
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
        cancel_third: function () {
            this.options.popupVisible = false;
            this.gamesAllList = "";
            this.slots[0].values = "";
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
    }
};
</script>

<style lang="stylus" scoped>
.mint-popup {
    width: 100%;
}

/* * .bot_content{
    width 100%
    li{
        width 100%
        height .5rem
    }
} */
.picker-toolbar-title {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    line-height: 100%;
    font-size: 0.7rem;

    .usi-btn-cancel, .usi-btn-sure {
        color: #FF6600;
    }
}

.game_wrapper {
    padding-bottom 1rem
    .hot {
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
                width: 0.31rem;
                height: 0.33rem;
                top: 50%;
                left: 50%;
                margin-top: -0.165rem;
                margin-left: -0.85rem;
                background: url('../../assets/imgs_m/hms-icon.png') no-repeat center;
                background-size: 3rem 3rem;
                background-position: 0 -2.49rem;
            }
        }
    }
}

.hot_wrapper {
    .hms_ul {
        width: 100%;
    }

    ul.hot_tab {
        width: 5.74rem;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;

        li {
            flex: 1;
            text-align: center;
            font-size: 0.28rem;
            color: #303030;
            cursor: pointer;
            margin-top: 0.25rem;
            text-shadow: rgba(0,0,0,.1) 0.03rem 0.03rem 0.02rem
            &.active {
                color: #fcc916;
                font-size: 0.28rem;
            }
        }
    }

    .hot_con {
        position: relative;
        width: 90%;
        margin: .25rem auto 0;

        .wait {
            position: absolute;
            width: 621px;
            height: 468px;
            line-height: 468px;
            border: 3px solid #898888;
            box-sizing: border-box;

            img {
                vertical-align: middle;
            }
        }
    }
}
</style>