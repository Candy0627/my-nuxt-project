<template>
    <div class="game_center content">
        <h2 class="animated fadeInLeft">儲值中心</h2>
        <div class="game_store_wrapper">
            <form
                role="form"
                id="myForm"
                name="myForm"
                ref="myForm"
                enctype="multipart/form-data"
                action=""
                method
                target="_blank"
            >
                <!-- <input type="hidden" name="token" value="">
                <input type="hidden" name="uuid" value="">
                <input type="hidden" name="order_id" value="">
                <input type="hidden" name="device_type" value="5">
                <input type="hidden" name="extInfo" value="">-->

                <div class="recharge-account">
                    <div class="game_select">
                        <label class="label_name fl">儲值帳號：</label>
                        <span>{{userInfo.account}}</span>
                        <label>平台幣：</label>
                        <span>{{userInfo.overage}}</span>
                    </div>
                    <div class="clear"></div>
                    <div class="recharge-game clearfix">
                        <div class="label fl">
                            <span class="label_name">儲值遊戲：</span>
                        </div>
                        <div class="game-content fl">
                            <game-swiper
                                :userRegisteredGamesList="userRegisteredGamesList"
                                :curId="curId"
                                :gameId="gameId"
                                @getGameStoreSwiperIndex="getGameStoreSwiperIndex"
                            ></game-swiper>
                        </div>
                    </div>
                    <div class="game-area">
                        <span class="label_name">遊戲伺服器：</span>
                        <template>
                            <el-select
                                v-model="form.severInfo"
                                placeholder="請選擇"
                                no-data-text="無數據"
                                @change="handleChangedServer($event)"
                            >
                                <el-option
                                    v-for="item in serverNameList"
                                    :key="item.server_id"
                                    :label="item.server_name"
                                    :value="item.server_id"
                                ></el-option>
                            </el-select>
                        </template>

                        <span class="label_name">角色名：</span>
                        <template>
                            <el-select
                                v-model="form.roleInfo"
                                placeholder="請選擇"
                                no-data-text="無數據"
                                @change="handleChangedRole($event)"
                            >
                                <el-option
                                    v-for="item in roleNameList"
                                    :key="item.role_id"
                                    :label="item.role_name"
                                    :value="item.role_id"
                                ></el-option>
                            </el-select>
                        </template>
                    </div>
                    <div class="recharge-money clearfix">
                        <div class="label fl">
                            <span class="label_name">儲值商品：</span>
                        </div>
                        <div class="game-content fl">
                            <ul class="clearfix czmoney">
                                <li
                                    class="xzsp"
                                    v-for="(item, index) in commodityList"
                                    :key="index"
                                    :class="{active:commodityId == item.id}"
                                    @click="getCommodityId(item.id, item.name, item.price)"
                                >
                                    <img :src="item.icon" />
                                    <p class="txt2">{{item.name}}</p>
                                    <!-- <p class="txt21" style="display:none">0.99</p> -->
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="method-money clearfix">
                        <div class="label fl" style="margin-top: 5px;">
                            <span class="label_name">儲值方式：</span>
                        </div>
                        <div class="method-content">
                            <ul class="clearfix paylist">
                                <li v-for="(item,index) in payList" :key="index">
                                    <template>
                                        <el-radio-group v-model="radio">
                                            <el-radio
                                                :label="item.payid"
                                                @change="getPlayId(item.payid)"
                                            >
                                                <label for="card1" style="margin-left:9px">
                                                    <span class="img">
                                                        <img
                                                            :src="item.icon"
                                                            :class="{imgWidth:item.payid == 32 || item.payid == 33}"
                                                        />
                                                    </span>
                                                    <span
                                                        style="margin-left:9px"
                                                        class="name"
                                                    >{{item.name}}</span>
                                                </label>
                                            </el-radio>
                                        </el-radio-group>
                                    </template>
                                    <!-- <input type="radio" value="MycardTW" name="gateway" id="card1" /> -->
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="total-amount total-product">
                        <span class="fzjb1 label_name fl">儲值商品：</span>
                        <span class="fl">{{commodityName}}</span>
                    </div>
                    <div class="clear"></div>
                    <div class="total-amount">
                        <span class="fzjb label_name fl">應付金額：</span>
                        <span class="fl money">{{commodityprice}}美元</span>
                    </div>
                    <a
                        href="javascript:;"
                        class="game_select pay1 fr"
                        @click="handleClickPay($event)"
                    >立即支付</a>
                    <!-- <input type="submit" name="submit" class="pay1 fr" value="立即支付" @click="handleClickPay($event)" /> -->
                    <!-- <div class="pay1" @click="onSubmit($event)">立即支付</div> -->
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import "../../../assets/styles/recharge.css";
import GameSwiper from "@/pages/pcComponents/gameStore/GameSwiper.vue";
export default {
    name: "GameStore",
    props: {
        curId: Number,
        options: Object,
    },
    components: {
        GameSwiper,
    },
    data: function () {
        return {
            uuid: 0,
            game_id: 0,
            commodityId: 0,
            serverId: 0,
            payId: 0,
            roleId: 0,
            appId: 0,
            firstIndex: 0,
            serverNameList: [],
            s_value: "",
            roleNameList: [],
            r_value: "",
            form: {
                severInfo: "",
                roleInfo: "",
            },
            userRegisteredGamesList:[],
            commodityList: [],
            payList: [],
            commodityprice: "",
            commodityName: "",
            radio: "1",
        };
    },
    computed: {
        userInfo: function () {
            return this.$store.state.userInfo;
        },
        gameId: function () {
            return this.game_id;
        }
    },
    mounted() {
        
        this.getUserRegisteredGamesList();
        this.updateUserInfo();
    },
    methods: {
        updateUserInfo: function () {
            let datas = {};
            this.options.isLoading = true;
            this.getHttp(this, datas, "/front/info", function (obj, data) {
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    let userInfo = data.data;
                    let token = data.data.token;
                    obj.$store.commit("setUserInfo", userInfo);
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                } else {
                    obj.options.isLoading = false;
                    // console.log("更新用戶信息失敗！");
                }
            });
        },
        getUserRegisteredGamesList: function () {
            let datas = {};
            this.options.isLoading = true;
            this.getHttp(this, datas, "/front/user/games", function (
                obj,
                data
            ) {
                console.log(data.status);
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    let d = data.data;
                    obj.userRegisteredGamesList = d.games_list;
                    // console.log("儲值遊戲", obj.userRegisteredGamesList);
                    // obj.$store.commit("setuserRegisteredGamesList",obj.userRegisteredGamesList);
                    obj.game_id = d.games_list[0].id;
                    obj.uuid = d.games_list[0].uuid;
                    obj.appId = d.games_list[0].appid;
                    obj.getServerRoleInfo(obj.gameId, obj.uuid, obj.firstIndex);
                    obj.getGamescommodityPay(obj.gameId, obj.firstIndex);
                } else {
                    obj.options.isLoading = false;
                    obj.$message(data.message);
                }
            });
        },
        getGameStoreSwiperIndex: function (gameId, uuid, index) {
            this.game_id = gameId;
            this.uuid = uuid;
            this.firstIndex = index;
            this.getServerRoleInfo(gameId, uuid, index);
            this.getGamescommodityPay(gameId, index);
            this.form.severInfo = "";
            this.form.roleInfo = "";
            this.serverNameList = "";
            this.roleNameList = "";
        },
        getServerRoleInfo: function (gameId, uuid, index) {
            let datas = {
                game_id: gameId,
                appid: this.appId,
                uuid: uuid,
            };
            this.getHttp(this, datas, "/front/game/server/role", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    let d = data.data;
                    obj.serverNameList = d;
                    obj.form.severInfo = obj.serverNameList[0].server_id;
                    obj.handleChangedServer(obj.form.severInfo);
                    // console.log("当前伺服器对应的哪个角色名",obj.serverNameList);
                } else {
                    obj.$message(data.message);
                    obj.options.isLoading = false;
                }
            });
        },
        getGamescommodityPay: function (gameId, index) {
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
                    // console.log("获取用户指定游戏商品以及支付方式",d);
                    obj.commodityList = d.commodity_list;
                    obj.payList = d.pay_list;
                    obj.radio = d.pay_list[0].payid;
                    obj.payId = d.pay_list[0].payid;
                    obj.commodityId = d.commodity_list[0].id;
                    obj.commodityName = d.commodity_list[0].name;
                    obj.commodityprice = d.commodity_list[0].price;
                } else {
                    obj.options.isLoading = false;
                }
            });
        },
        handleChangedServer: function (s_id) {
            this.serverId = s_id;
            this.form.roleInfo = "";
            // this.form.severInfo = s_id;
            if (s_id !== null && s_id !== "" && s_id !== undefined) {
                // 根据服务器id检索出对应的角色信息数组
                for (var item of this.serverNameList) {
                    if (item.server_id == s_id) {
                        this.roleNameList = item.role_info;
                        this.roleId = item.role_info[0].role_id;
                        this.form.roleInfo = this.roleId;
                        // console.log("已经检索到",item.server_id, s_id);
                    }
                }
            }
        },
        handleChangedRole(r_id){
            console.log("此时选择的角色id是什么", r_id);
            this.roleId = r_id;
        },
        getCommodityId: function (id, name, price) {
            console.log("當前的商品id", id, name , price);
            this.commodityId = id;
            this.commodityName = name;
            this.commodityprice = price;
        },
        getPlayId: function (id) {
            this.payId = id;
            // console.log("支付id", id);
        },
        handleClickPay: function (event) {
            // console.log("提交参数", event);
            event.preventDefault();
            console.log(
                "890",
                this.userRegisteredGamesList,
                this.serverNameList,
                this.roleNameList
            );
            if (this.userRegisteredGamesList.length == 0) {
                this.$message({
                    duration: 1500,
                    message: "您還未登入遊戲!",
                });
                return false;
            }

            if (this.serverNameList.length == 0) {
                this.$message({
                    duration: 1500,
                    message: "您還未登入遊戲!",
                });
                return false;
            }

            if (this.roleNameList.length == 0) {
                this.$message({
                    duration: 1500,
                    message: "您還未創建角色!",
                });
                return false;
            }

            let datas = {
                game_id: this.gameId,
                uuid: this.uuid,
                commodity_id: this.commodityId,
                payid: this.payId,
                server_id: this.serverId,
                role_id: this.roleId,
            };

            if (!this.gameId) {
                this.$message({
                    duration: 1500,
                    message: "請選擇儲值遊戲!",
                });
                return false;
            }
            if (!this.commodityId) {
                this.$message({
                    duration: 1500,
                    message: "請選擇儲值商品!",
                });
                return false;
            }
            if (!this.payId) {
                this.$message({
                    duration: 1500,
                    message: "請選擇支付方式!",
                });
                return false;
            }

            this.options.isLoading = true;
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
                    console.log("參數跳轉22",params.redirect_url);

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
                        params.redirect_url+'#/pc/home';

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
                        params.redirect_url+'#/mobile/home';

                        console.log("此时储值成功之后的重定向地址", params.redirect_url);

                    alert("即將跳轉支付頁面，請確認!");

                    let gateway = d.jump_url_info.params.gateway;

                    if (gateway == "Mcoin") {
                        // console.log("2266");
                        document.myForm.method = "GET";
                        if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
                            document.myForm.action = newUrl_mb;
                            window.location.href = newUrl_mb;
                        } else {
                            document.myForm.action = newUrl_pc;
                            window.location.href = newUrl_pc;
                        }
                    } else {
                        // console.log("2268");
                        document.myForm.method = "POST";
                        if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
                            document.myForm.action = newUrl_mb;
                        } else {
                            document.myForm.action = newUrl_pc;
                        }
                        obj.$refs["myForm"].submit();
                    }

                    // obj.$nextTick(() => {
                    //     obj.$refs["myForm"].submit();
                    // })

                    // document.getElementById("myForm").submit();
                    // document.myForm.submit();
                    obj.$confirm("確定是否支付成功?", "確認", {
                        confirmButtonText: "確定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                            console.log("訂單id", orderId);
                            obj.PaySuccessCallback(orderId);
                        })
                        .catch(() => {
                            obj.$message({
                                type: "info",
                                message: "支付失敗！",
                            });
                        });
                    // console.log('获取原生dom看acticon 和 method两个属性是否绑定上去【vue的动态绑定不适合】', document.myForm);
                } else {
                    obj.options.isLoading = false;
                    obj.$message(data.message);
                }
            });
        },
        PaySuccessCallback: function (order_id) {
            let datas = {
                order_id: order_id, //订单号
            };
            this.postHttp(this, datas, "/front/pay/complete", function (
                obj,
                data
            ) {
                if (data) {
                    obj.$message(data.message);
                }
            });
        },
        toJumpPayLink: function (toPayLink, params) {
            this.options.isLoading = false;
            console.log("链接", toPayLink);
            console.log("参数", params);
            // this.postHttp(this, params, toPayLink, function(obj, data) {
            //     console.log('链接后post',data);
            // })
            console.log("转化后的对象", params, params.token);
            // var formData = new FormData();
            // formData.append("token",params.token);
            // formData.append("product_id",params.product_id);
            // formData.append("order_id",params.order_id);
            // formData.append("device_type",params.device_type);
            // formData.append("extInfo",params.extInfo);
            // formData.append("ServerId",params.ServerId);
            // formData.append("RoleId",params.RoleId);
            // formData.append("gateway",params.gateway);
            this.$axios.post(toPayLink, params).then(function (response) {
                console.log("88链接拼接", response);
            });
        },
    },
};
</script>

<style lang="stylus" scoped>
.game_center >>> .el-input__inner {
    border: 1px solid #b3b3b3 !important;
}

.total-amount .fzjb{
    padding-top: 4px;
}
.money {
    margin-top: 5px;
    font-size: 20.5px;
    color: #5d5d5d;
}

.game_center {
    .game-area {
        text-align: left;
    }

    h2 {
        position: relative;
        display: block;
        width: 100%;
        margin-bottom: 40px;
        font-size: 47.02px;
        color: #4b4b4b;
        font-weight: 500;
        text-indent: 46px;

        &::before {
            content: '';
            position: absolute;
            width: 37px;
            height: 44px;
            top: 50%;
            left: 333px;
            margin-top: -19px;
            background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
            background-size: 300px 300px;
            background-position: -261px -90px;
        }
    }
}

form >>> .el-radio__input.is-checked .el-radio__inner {
    border-color: #fcc814;
    background: #fcc814;
}

form >>> .el-radio__input {
    margin-top: -17px;
}

form >>> .el-radio__inner:hover {
    border-color: #fcc814;
}

.game_store_wrapper {
    width: 899px;
    padding-top: 36px;
    padding-bottom: 100px;
    border: 3px solid #898888;
    box-sizing: border-box;
}

.label_name {
    display: inline-block;
    width: 135px !important;
    font-size: 22.35px;
    color: #5d5d5d;
    text-align: left;
}

.el-select {
    margin-left: 0px;
}

.active {
    border: 1px solid #fcc814;
    box-sizing: border-box;
}

.active::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 26px;
    height: 26px;
    background: url('../../../assets/imgs/selected.png') no-repeat;
    background-size: 100% 100%;
}

.czmoney {
    margin-top: 2px;
}

iframe {
    border: none;
}

.pay1 {
    display: inline-block;
    width: 155px;
    height: 51px;
    text-indent: -9999px;
    background: url('../../../assets/imgs/btn/btn_pay.png') no-repeat;
    background-size: 100% 100%;
    outline: none;
    appearance: none;

    &:hover {
        outline: none;
        appearance: none;
    }
}

.game-area {
    span {
        vertical-align: middle;

        &:nth-of-type(2) {
            margin-left: 30px;
        }
    }
}

.imgWidth {
    width: 28%;
}

.game_select {
    text-align: left;

    label {
        width: 100%;
        color: #5d5d5d;
        font-size: 22.35px;
        margin-bottom: 42px;

        &:nth-of-type(1) {
        }

        &:nth-of-type(2) {
            margin-left: 50px;
        }
    }

    span {
        font-size: 22.35px;

        &:nth-of-type(1) {
            color: #222222;
        }

        &:nth-of-type(2) {
            color: #fcc814;
        }
    }
}

.content {
    width: 899px;
    height: 275px;
    margin-top: 5px;
    background: #fff;

    .hot_img {
        margin-top: 15px;

        .gift_info {
            margin-top: 9px;

            span {
                font-size: 19px;

                &:nth-of-type(1) {
                    color: #202020;
                }

                &:nth-of-type(2) {
                    color: #8d8c8c;
                }
            }
        }
    }

    .hot_download {
        width: 430px;
        margin-top: 20px;
        margin-left: 37px;

        .hot_top {
            .left {
                width: 100%;
            }

            h2 {
                color: #191919;
                font-size: 29px;
                font-weight: 500;
            }

            .span {
                margin-top: 4px;
                color: #999999;
                font-size: 23px;
            }
        }

        .hot_center {
            font-size: 21px;
            color: #202020;
            margin-top: 37px;
        }

        .hot_bottom {
            margin-top: 17px;

            .btn_get {
                display: inline-block;
                width: 198px;
                height: 49px;
                line-height: 49px;
                text-align: center;
                color: #fcc814;
                font-size: 27.08px;
                border: 2px solid #f5854e;
                border-radius: 5px;
            }
        }
    }
}
</style>