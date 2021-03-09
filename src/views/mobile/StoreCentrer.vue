<template>
    <div class="wrapper_ms herms_comwidth">
        <common-nav :options="options"></common-nav>
        <screentips-mask></screentips-mask>
        <div class="game_wrapper_ms">
            <h2
                class="animated box_shadow"
                v-if="options.isAni"
                :class="{fadeInLeft: options.isAni}"
            >儲值中心</h2>
            <div class="hot hot_comWidth">
                <!-- <h2 class="animated" v-if="options.isAni" :class="{fadeInLeft: options.isAni}">儲值中心</h2> -->
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
                        <div v-if="curId == 0">
                            <div class="wait">
                                <game-store
                                    :options="options"
                                    :curId="curId"
                                    :valueSelected_game="valueSelected_game"
                                    :valueSelected_server="valueSelected_server"
                                    :valueSelected_role="valueSelected_role"
                                    :valueSelected_commodity="valueSelected_commodity"
                                    :valueSelected_pay="valueSelected_pay"
                                    :commodity="commodity"
                                    @openPicker_game="openPicker_game"
                                    @openPicker_server="openPicker_server"
                                    @openPicker_role="openPicker_role"
                                    @openPicker_commodity="openPicker_commodity"
                                    @openPicker_pay="openPicker_pay"
                                    @handleClickPay="handleClickPay"
                                    v-cloak
                                    v-if="token"
                                ></game-store>
                                <sub-login
                                    @handleClickThirdLogin="handleClickThirdLogin"
                                    @loadStoreUserGamesList="loadStoreUserGamesList"
                                    :options="options"
                                    v-cloak
                                    v-else
                                ></sub-login>
                            </div>
                        </div>
                        <div v-if="curId == 1">
                            <div class="wait">
                                <store-record :options="options" @handleStoreNow="handleStoreNow"></store-record>
                            </div>
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

        <!-- 遊戲 -->
        <template>
            <mt-popup
                v-model="options.popVisible_game"
                position="bottom"
                :closeOnClickModal="false"
                :lockScroll="true"
            >
                <div class="popup-container" @touchmove.prevent>
                    <mt-picker
                        :slots="slots"
                        :showToolbar="true"
                        ref="picker_game"
                        valueKey="name"
                        @change="onValuesChange"
                    >
                        <span @click="cancel()" class="mint-datetime-action mint-datetime-cancel">取消</span>
                        <span
                            @click="confirm()"
                            class="mint-datetime-action mint-datetime-confirm"
                        >確認</span>
                    </mt-picker>
                </div>
            </mt-popup>
        </template>

        <!-- 区服 -->
        <template>
            <mt-popup
                v-model="options.popVisible_server"
                position="bottom"
                :closeOnClickModal="false"
                :lockScroll="true"
            >
                <div class="popup-container" @touchmove.prevent>
                    <mt-picker
                        :slots="slots_server"
                        :showToolbar="true"
                        ref="picker_server"
                        valueKey="server_name"
                        @change="onValuesChange"
                    >
                        <span
                            @click="cancel_server()"
                            class="mint-datetime-action mint-datetime-cancel"
                        >取消</span>
                        <span
                            @click="confirm_server()"
                            class="mint-datetime-action mint-datetime-confirm"
                        >確認</span>
                    </mt-picker>
                </div>
            </mt-popup>
        </template>

        <!-- 角色 -->
        <template>
            <mt-popup
                v-model="options.popVisible_role"
                position="bottom"
                :closeOnClickModal="false"
                :lockScroll="true"
            >
                <div class="popup-container" @touchmove.prevent>
                    <mt-picker
                        :slots="slots_role"
                        :showToolbar="true"
                        ref="picker_role"
                        valueKey="role_name"
                        @change="onValuesChange"
                    >
                        <span
                            @click="cancel_role()"
                            class="mint-datetime-action mint-datetime-cancel"
                        >取消</span>
                        <span
                            @click="confirm_role()"
                            class="mint-datetime-action mint-datetime-confirm"
                        >確認</span>
                    </mt-picker>
                </div>
            </mt-popup>
        </template>

        <!-- 儲值商品 -->
        <template>
            <mt-popup
                v-model="options.popVisible_commodity"
                position="bottom"
                :closeOnClickModal="false"
                :lockScroll="true"
            >
                <div class="popup-container" @touchmove.prevent>
                    <mt-picker
                        :slots="slots_commodity"
                        :showToolbar="true"
                        ref="picker_commodity"
                        valueKey="name"
                        @change="onValuesChange"
                    >
                        <span
                            @click="cancel_commodity()"
                            class="mint-datetime-action mint-datetime-cancel"
                        >取消</span>
                        <span
                            @click="confirm_commodity()"
                            class="mint-datetime-action mint-datetime-confirm"
                        >確認</span>
                    </mt-picker>
                </div>
            </mt-popup>
        </template>

        <!-- 儲值方式 -->
        <template>
            <mt-popup
                v-model="options.popVisible_pay"
                position="bottom"
                :closeOnClickModal="false"
                :lockScroll="true"
            >
                <div class="popup-container" @touchmove.prevent>
                    <mt-picker
                        :slots="slots_pay"
                        :showToolbar="true"
                        ref="picker_pay"
                        valueKey="name"
                        @change="onValuesChange"
                    >
                        <span
                            @click="cancel_pay()"
                            class="mint-datetime-action mint-datetime-cancel"
                        >取消</span>
                        <span
                            @click="confirm_pay()"
                            class="mint-datetime-action mint-datetime-confirm"
                        >確認</span>
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
// import "@/assets/styles/myProgress.css";
import Loading from "@/pages/mComponents/common/Loading";
import CommonNav from "@/pages/mComponents/common/CommonNav.vue";
import CommonFooter from "@/pages/mComponents/common/CommonFooter.vue";
import GameStore from "@/pages/mComponents/gameStore/GameStore.vue";
import StoreRecord from "@/pages/mComponents/gameStore/StoreRecord.vue";
import NavMask from "@/pages/mComponents/common/NavMask.vue";
import ScreentipsMask from "@/pages/mComponents/common/ScreenTips.vue";
import SubLogin from "@/pages/mComponents/memberCenter/SubLogin";

export default {
    name: "GameCenter",
    components: {
        Loading,
        CommonNav,
        CommonFooter,
        GameStore,
        StoreRecord,
        NavMask,
        ScreentipsMask,
        SubLogin,
    },
    data: function () {
        return {
            tabList: ["儲值遊戲", "儲值紀錄 "],
            curId: 0,
            options: {
                isLoading: false,
                isAni: false,
                visible_game: false,
                popVisible_game: false,
                popVisible_server: false,
                popVisible_role: false,
                popVisible_commodity: false,
                popVisible_pay: false,
                isShowD: false,
                popupVisible: false,
            },
            uuid: 0,
            game_id: 0,
            commodityId: 0,
            serverId: 0,
            payId: 0,
            roleId: 0,
            appid: 0,
            firstIndex: 0,
            s_value: "",
            r_value: "",
            gamesAllList: [],
            serverNameList: [],
            roleNameList: [],
            userGamesList: [],
            valueSelected_game: "",
            type_picker: "",
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: "slot1",
                    textAlign: "center",
                },
            ],
            valueSelected_server: "",
            slots_server: [
                {
                    flex: 1,
                    values: [],
                    className: "slot1",
                    textAlign: "center",
                },
            ],
            valueSelected_role: "",
            slots_role: [
                {
                    flex: 1,
                    values: [],
                    className: "slot1",
                    textAlign: "center",
                },
            ],
            valueSelected_commodity: "",
            slots_commodity: [
                {
                    flex: 1,
                    values: [],
                    className: "slot1",
                    textAlign: "center",
                },
            ],
            valueSelected_pay: "",
            slots_pay: [
                {
                    flex: 1,
                    values: [],
                    className: "slot1",
                    textAlign: "center",
                },
            ],
            commodity: {
                commodity_icon: "",
                commodity_name: "",
                commodity_price: "",
            },
        };
    },
    computed: {
        token: function () {
            return this.$store.state.token;
        },
    },
    created() {
        this.$bus.on("thirdLoginDialog", (type) => {
            this.getAllGamesList();
            this.platFormType = type;
            this.options.isMask = true;
            this.isFbDialog = true;
            this.options.popupVisible = true;
        });
    },
    mounted() {
        this.options.isAni = true;
        if (localStorage.getItem("token")) {
            this.getUserGamesList();
        } else {
        }
    },
    methods: {
        loadStoreUserGamesList: function () {
            this.getUserGamesList();
        },
        tab: function (i) {
            this.curId = i;
        },
        handleStoreNow() {
            this.curId = 0;
        },
        openPicker_game: function (type) {
            this.type_picker = type;
            this.getUserGamesList();
        },
        openPicker_server: function (type) {
            this.type_picker = type;
            this.options.popVisible_server = true;
        },
        openPicker_role: function (type) {
            this.type_picker = type;
            this.options.popVisible_role = true;
            // this.getServerInfo();
        },
        openPicker_commodity: function (type) {
            this.type_picker = type;
            this.options.popVisible_commodity = true;
        },
        openPicker_pay: function (type) {
            this.type_picker = type;
            this.options.popVisible_pay = true;
        },
        getUserGamesList: function () {
            let datas = {};
            this.options.isLoading = true;
            this.getHttp(this, datas, "/front/user/games", function (
                obj,
                data
            ) {
                if (data) {
                    if (data.status == "2000") {
                        obj.options.isLoading = false;
                        let d = data.data;
                        if (d.games_list.length == 0) {
                            obj.$toast("您還沒有已註冊的遊戲!");
                            obj.options.isShowD = true;
                            obj.serverNameList = "";
                            obj.roleNameList = "";
                            obj.slots_server[0].values = "";
                            obj.slots_role[0].values = "";
                            obj.options.popVisible_server = false;
                            obj.options.popVisible_role = false;
                            obj.valueSelected_server = "";
                            obj.valueSelected_role = "";
                        }

                        obj.userGamesList = d.games_list;
                        obj.slots[0].values = obj.userGamesList;
                        obj.valueSelected_game = obj.userGamesList[0].name;
                        // obj.form.gameInfo = d.games_list[0].name;

                        obj.gameId = d.games_list[0].id;
                        obj.uuid = d.games_list[0].uuid;
                        obj.appid = d.games_list[0].appid;

                        obj.getServerInfo(obj.gameId, obj.appid, obj.uuid);
                        obj.getGamescommodityPay(obj.gameId);
                        // console.log("当前的点击类型", obj.type_picker);

                        if (obj.type_picker == "game") {
                            obj.options.popVisible_game = true;
                        }

                        if (d.games_list.length == 0) {
                            obj.options.isLoading = false;
                            obj.$toast("暫無註冊的遊戲哦!");
                            return false;
                        }
                    } else {
                        obj.options.isLoading = false;
                        obj.$toast(data.message);
                    }
                } else {
                    obj.options.isLoading = false;
                }
            });
        },
        getServerInfo: function (gameId, uuid, index) {
            let datas = {
                game_id: this.gameId,
                appid: this.appid,
                uuid: this.uuid,
            };
            this.getHttp(this, datas, "/front/game/server/role", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    obj.options.isShowD = false;
                    let d = data.data;
                    if (d.length == 0) {
                        obj.options.isLoading = false;
                        obj.$toast("您還沒有在遊戲中創建區服和角色！");
                        obj.options.isShowD = true;
                        obj.serverNameList = "";
                        obj.roleNameList = "";
                        obj.slots_server[0].values = "";
                        obj.slots_role[0].values = "";
                        obj.options.popVisible_server = false;
                        obj.options.popVisible_role = false;
                        obj.valueSelected_server = "";
                        obj.valueSelected_role = "";
                    }
                    obj.serverNameList = d;
                    obj.slots_server[0].values = obj.serverNameList;
                    obj.valueSelected_server =
                        obj.serverNameList[0].server_name;
                    // console.log(
                    //     "此时的服务器选中名称",
                    //     obj.slots_server[0].values,
                    //     obj.valueSelected_server
                    // );
                    // obj.form.severInfo = obj.serverNameList[0].server_id;
                    obj.serverId = d[0].server_id;
                    obj.roleId = d[0].role_info[0].role_id;
                    obj.handleChangedServer(obj.serverId);
                } else {
                    obj.$toast(data.message);
                    obj.options.isLoading = false;
                }
            });
        },
        handleChangedServer: function (s_id) {
            this.options.isLoading = true;
            this.serverId = s_id;
            // this.ruleForm.serverInfo ='';
            // this.ruleForm.roleInfo = "";
            if (s_id !== null && s_id !== "" && s_id !== undefined) {
                // 根据服务器id检索出对应的角色信息数组
                for (var item of this.serverNameList) {
                    if (item.server_id == s_id) {
                        this.options.isLoading = false;
                        this.roleNameList = item.role_info;
                        this.slots_role[0].values = item.role_info;
                        this.valueSelected_role = item.role_info[0].role_name;
                        // console.log("此時查出來的角色信息",item.role_info);
                        // this.valueSelected_role = item.role_info;
                        this.roleId = item.role_info[0].role_id;
                        this.ruleForm.roleInfo = this.roleId;
                        this.current_server_name = item.server_name;
                        this.current_role_name = item.role_info[0].role_name;
                        // console.log(
                        //     "伺服器：",
                        //     this.current_server_name,
                        //     "角色名：",
                        //     this.current_role_name,
                        //     "用户名：",
                        //     this.userInfo.username
                        // );
                    }
                }
            }
        },
        getGamescommodityPay: function (gameId) {
            let datas = {
                game_id: gameId,
            };
            this.getHttp(this, datas, "/front/games/commodity/pay", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    let d = data.data;
                    obj.commodityList = d.commodity_list;

                    obj.slots_commodity[0].values = d.commodity_list;
                    obj.valueSelected_commodity = d.commodity_list[0].name;

                    obj.commodity.commodity_icon = d.commodity_list[0].icon;
                    obj.commodity.commodity_name = d.commodity_list[0].name;
                    obj.commodity.commodity_price = d.commodity_list[0].price;

                    obj.payList = d.pay_list;

                    obj.slots_pay[0].values = d.pay_list;
                    obj.valueSelected_pay = d.pay_list[0].name;

                    obj.payId = d.pay_list[0].payid;

                    obj.commodityId = d.commodity_list[0].id;
                } else {
                    obj.options.isLoading = false;
                }
            });
        },
        onValuesChange: function (picker, values) {
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        },
        cancel: function () {
            this.options.popVisible_game = false;
            this.gamesList = "";
            this.slots[0].values = "";
        },
        confirm: function () {
            this.options.popVisible_game = false;
            let values = this.$refs.picker_game.getValues();

            this.gameId = values[0].id;
            this.appid = values[0].appid;
            this.uuid = values[0].uuid;

            this.getServerInfo(this.gameId, this.appid, this.uuid);
            this.getGamescommodityPay(this.gameId);
            this.valueSelected_game = values[0].name;
            this.gamesList = "";
            this.slots[0].values = "";
        },
        cancel_server: function () {
            this.options.popVisible_server = false;
        },
        confirm_server: function () {
            this.options.popVisible_server = false;
            let values = this.$refs.picker_server.getValues();
            this.serverId = values[0].server_id;
            this.valueSelected_server = values[0].server_name;
            // 根据server_id查询角色联动
            if (
                this.serverId !== null &&
                this.serverId !== "" &&
                this.serverId !== undefined
            ) {
                for (var item of this.serverNameList) {
                    if (item.server_id == this.serverId) {
                        // this.commodityId = item.id;
                        // console.log(
                        //     "此时服务器查询出来的角色名是",
                        //     this.serverNameList,
                        //     item,
                        //     item.role_info[0].role_name
                        // );
                        this.valueSelected_role = item.role_info[0].role_name;
                        this.slots_role[0].values = item.role_info;
                    }
                }
            }
        },
        cancel_role: function () {
            this.options.popVisible_role = false;
        },
        confirm_role: function () {
            this.options.popVisible_role = false;
            let values = this.$refs.picker_role.getValues();
            this.roleId = values[0].role_id;
            this.valueSelected_role = values[0].role_name;
        },
        cancel_commodity: function () {
            this.options.popVisible_commodity = false;
        },
        confirm_commodity: function () {
            this.options.popVisible_commodity = false;
            let values = this.$refs.picker_commodity.getValues();
            // console.log("当前选中的游戏的commodityid", values[0].id);

            this.commodityId = values[0].id;
            this.valueSelected_commodity = values[0].name;

            this.commodity.commodity_icon = values[0].icon;
            this.commodity.commodity_name = values[0].name;
            this.commodity.commodity_price = values[0].price;
        },
        cancel_pay: function () {
            this.options.popVisible_pay = false;
        },
        confirm_pay: function () {
            this.options.popVisible_pay = false;
            let values = this.$refs.picker_pay.getValues();
            this.payId = values[0].payid;
            this.valueSelected_pay = values[0].name;
        },
        handleClickPay: function (e) {
            e.preventDefault();
            if (this.userGamesList.length == 0) {
                this.$toast("您還未登入遊戲!");
                return false;
            }

            if (this.serverNameList.length == 0) {
                this.$toast("您還沒有在遊戲中創建區服和角色!");
                return false;
            }

            if (this.roleNameList.length == 0) {
                this.$toast("您還未創建角色!");
                return false;
            }

            if (!this.gameId) {
                this.$toast("請選擇儲值遊戲!");
                return false;
            }
            if (!this.commodityId) {
                this.$toast("請選擇儲值商品!");
                return false;
            }
            if (!this.payId) {
                this.$toast("請選擇支付方式!");
                return false;
            }

            this.options.isLoading = true;
            let datas = {
                game_id: this.gameId,
                uuid: this.uuid,
                commodity_id: this.commodityId,
                payid: this.payId,
                server_id: this.serverId,
                role_id: this.roleId,
            };

            // console.log(
            //     "当前支付的参数",
            //     "game_id",
            //     this.gameId,
            //     "uuid",
            //     this.uuid,
            //     "commodity_id",
            //     this.commodityId,
            //     "payid",
            //     this.payId,
            //     "server_id",
            //     this.serverId,
            //     "role_id",
            //     this.roleId
            // );

            this.postHttp(this, datas, "/front/pay/recharge", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    let d = data.data;
                    let toPayLinkInfo = d.jump_url_info;
                    let toPayLink = d.jump_url_info.jump_uri;
                    let params = d.jump_url_info.params;
                    let orderId = d.jump_url_info.params.order_id;
                    localStorage.setItem("orderId", orderId);
                    let newUrl_pc =
                        toPayLink +
                        "?token=" +
                        params.token +
                        "&app_id=" +
                        params.app_id +
                        "&uuid=" +
                        params.uuid +
                        "&product_id=" +
                        params.product_id +
                        "&order_id=" +
                        params.order_id +
                        "&device_type=" +
                        params.device_type +
                        "&extInfo=" +
                        params.extInfo +
                        "&ServerId=" +
                        params.ServerId +
                        "&RoleId=" +
                        params.RoleId +
                        "&gateway=" +
                        params.gateway +
                        "&redirect_url=" +
                        params.redirect_url +
                        "#/pc/home";

                    let newUrl_mb =
                        toPayLink +
                        "?token=" +
                        params.token +
                        "&app_id=" +
                        params.app_id +
                        "&uuid=" +
                        params.uuid +
                        "&product_id=" +
                        params.product_id +
                        "&order_id=" +
                        params.order_id +
                        "&device_type=" +
                        params.device_type +
                        "&extInfo=" +
                        params.extInfo +
                        "&ServerId=" +
                        params.ServerId +
                        "&RoleId=" +
                        params.RoleId +
                        "&gateway=" +
                        params.gateway +
                        "&redirect_url=" +
                        params.redirect_url +
                        "#/mobile/home";

                    // console.log("此时储值成功之后的重定向地址", params.redirect_url);

                    obj.$messagebox
                        .confirm("", {
                            message: "即將跳轉支付頁面，請確認!",
                            title: "提示",
                            confirmButtonText: "確定",
                            cancelButtonText: "取消",
                        })
                        .then((action) => {
                            let gateway = d.jump_url_info.params.gateway;

                            if (gateway == "Mcoin") {
                                document.myForm.method = "GET";

                                if (
                                    navigator.userAgent.match(
                                        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                                    )
                                ) {
                                    document.myForm.action = newUrl_mb;
                                    window.location.href = newUrl_mb;
                                } else {
                                    document.myForm.action = newUrl_pc;
                                    window.location.href = newUrl_pc;
                                }
                            } else {
                                document.myForm.method = "POST";
                                if (
                                    navigator.userAgent.match(
                                        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                                    )
                                ) {
                                    document.myForm.action = newUrl_mb;
                                } else {
                                    document.myForm.action = newUrl_pc;
                                }
                                document.myForm.submit();
                            }
                            setTimeout(() => {
                                obj.$messagebox
                                    .confirm("", {
                                        message: "確認是否支付成功?",
                                        title: "提示",
                                        confirmButtonText: "確定",
                                        cancelButtonText: "取消",
                                    })
                                    .then((action) => {
                                        // console.log("訂單id", orderId);
                                        obj.PaySuccessCallback(orderId);
                                    })
                                    .catch(() => {
                                        obj.$toast("支付失敗!");
                                    });
                            }, 1000);
                        });
                } else {
                    obj.options.isLoading = false;
                    obj.$toast(data.message);
                }
            });
        },
        PaySuccessCallback: function (order_id) {
            let datas = {
                order_id: order_id,
            };
            this.postHttp(this, datas, "/front/pay/complete", function (
                obj,
                data
            ) {
                if (data) {
                    obj.$toast(data.message);
                }
            });
        },
        handleClickThirdLogin: function (type) {
            console.log("获取到的类型",type);
            this.getAllGamesList();
            this.platFormType = type;
            this.options.isMask = true;
            this.isFbDialog = true;
            this.options.popupVisible = true;
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
    },
};
</script>

<style lang="stylus" scoped>
.game_wrapper_ms {
    margin-bottom: 1.3rem;

    .hot_con {
        margin-top: 0.25rem;
    }

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
            height: 0.35rem;
            top: 50%;
            left: 50%;
            margin-top: -0.175rem;
            margin-left: -0.85rem;
            background: url('../../assets/imgs_m/hms-icon.png') no-repeat center;
            background-size: 3rem 3rem;
            background-position: 0 -2.06rem;
        }
    }

    .hot_comWidth {
        margin: 0 auto;
        text-align: center;
    }

    .hot {
        width: 93%;
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
        width: 50%;
        margin: 0 auto;
        text-align: center;

        li {
            flex: 1;
            position: relative;
            text-align: center;
            font-size: 0.28rem;
            color: #4b4a47;
            text-shadow: rgba(0, 0, 0, 0.1) 0.03rem 0.03rem 0.02rem;

            &.active {
                color: #fcc814;
                font-size: 0.28rem;
            }
        }
    }
}
</style>