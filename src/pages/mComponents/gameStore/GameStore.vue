<template>
    <div class="game_center_m content" v-cloak>
        <div class="game_store_wrapper">
            <form
                role="form"
                id="myForm"
                name="myForm"
                ref="myForm"
                enctype="multipart/form-data"
                action
                method
                target="_blank"
            >
                <div class="recharge-account">
                    <div class="game_select">
                        <label class="label_name">儲值帳號：</label>
                        <span>{{userInfo.account}}</span>
                    </div>
                    <div class="game_select">
                        <label>荷米斯遊戲平台幣：</label>
                        <span>{{userInfo.overage}}</span>
                    </div>

                    <div class="recharge-game herms-game clearfix">
                        <div class="label">
                            <span class="label_name">儲值遊戲：</span>
                        </div>
                        <div class="game-content el-select">
                            <div class="birth el-input__inner" @click="openPicker_game('game')">
                                <span
                                    v-if="valueSelected_game"
                                    class="ep-one"
                                >{{valueSelected_game}}</span>
                                <span v-else>{{defaultValue_game}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="game-area el-select-two">
                        <span class="label_name">伺服器：</span>

                        <div
                            class="birth el-input__inner two_width"
                            @click="openPicker_server('server')"
                            :class="{disabled_m:options.isShowD}"
                        >
                            <span
                                v-if="valueSelected_server"
                                class="ep-one"
                            >{{valueSelected_server}}</span>
                            <span v-else>{{defaultValue_server}}</span>
                        </div>

                        <div
                            class="birth el-input__inner two_width"
                            @click="openPicker_role('role')"
                            :class="{disabled_m:options.isShowD}"
                        >
                            <span v-if="valueSelected_role" class="ep-one">{{valueSelected_role}}</span>
                            <span v-else>{{defaultValue_role}}</span>
                        </div>
                    </div>
                    <div class="recharge-game clearfix">
                        <div class="label">
                            <span class="label_name">儲值商品：</span>
                        </div>
                        <div class="game-content el-select">
                            <div
                                class="birth el-input__inner"
                                @click="openPicker_commodity('commodity')"
                                :class="{disabled_m:options.isShowD}"
                            >
                                <span
                                    v-if="valueSelected_commodity"
                                    class="ep-one"
                                >{{valueSelected_commodity}}</span>
                                <span v-else>{{defaultValue_commodity}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="recharge-game clearfix">
                        <div class="label">
                            <span class="label_name">儲值方式：</span>
                        </div>
                        <div class="game-content el-select">
                            <div
                                class="birth el-input__inner"
                                @click="openPicker_pay('pay')"
                                :class="{disabled_m:options.isShowD}"
                            >
                                <span v-if="valueSelected_pay" class="ep-one">{{valueSelected_pay}}</span>
                                <span v-else>{{defaultValue_pay}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="total-amount total-product">
                        <span class="fzjb1 label_name fl">儲值商品：</span>

                        <div class="p_pic">
                            <div class="pic">
                                <img :src="commodity.commodity_icon" alt width="100%" />
                            </div>
                            <span class="ep-one">{{commodity.commodity_name}}</span>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div class="total-amount">
                        <span class="fzjb label_name">應付金額：</span>
                        <span class="money">{{commodity.commodity_price}}美元</span>
                    </div>
                    <a href="javascript:;" class="pay_now" @click="handleClickPay($event)">立即支付</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import "../../../assets/styles_m/recharge_m.css";
import GameSwiper from "@/pages/pcComponents/gameStore/GameSwiper.vue";
export default {
    name: "GameStore",
    props: {
        options: Object,
        curId: Number,
        valueSelected_game: String,
        valueSelected_server: String,
        valueSelected_role: String,
        valueSelected_commodity: String,
        valueSelected_pay: String,
        commodity: Object,
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
            s_value: "",
            roleNameList: [],
            r_value: "",
            form: {
                gameInfo: "",
                severInfo: "",
                roleInfo: "",
                commodityInfo: "",
                payInfo: "",
            },
            userRegisteredGamesList: [],
            serverNameList: [],
            commodityList: [],
            payList: [],
            commodityprice: "",
            commodityName: "",
            radio: "1",
            commodity_icon: "",
            commodity_name: "",
            commodity_price: "",
            userGameName: "請選擇遊戲",
            defaultValue_game: "請選擇遊戲",
            defaultValue_server: "伺服器",
            defaultValue_role: "角色名",
            defaultValue_commodity: "請選擇儲值商品",
            defaultValue_pay: "請選擇儲值方式",
        };
    },
    computed: {
        userInfo: function () {
            return this.$store.state.userInfo;
        },
        gameId: function () {
            return this.game_id;
        },
    },
    mounted() {
        this.updateUserInfo();
    },
    methods: {
        openPicker_game: function (type) {
            this.$emit("openPicker_game", type);
        },
        openPicker_server: function (type) {
            this.$emit("openPicker_server", type);
        },
        openPicker_role: function (type) {
            this.$emit("openPicker_role", type);
        },
        openPicker_commodity: function (type) {
            this.$emit("openPicker_commodity", type);
        },
        openPicker_pay: function (type) {
            this.$emit("openPicker_pay", type);
        },
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
                    console.log("更新用戶信息失敗！");
                }
            });
        },
        handleClickPay: function (event) {
            this.$emit("handleClickPay", event);
        },
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles_m/varibles.styl';

.game_center_m >>> .el-input__inner {
    border: 1px solid #b3b3b3;
}

.money {
    margin-top: 0.05rem;
    font-size: 0.265rem;
    color: #5d5d5d;
}

.disabled_m {
    pointer-events: none;
    background: #ccc !important;
}

.game_center_m >>> .birth {
    position: relative;
    padding: 0 !important;
}

.game_center_m >>> .two_width, .game_center_m >>> .game-area .el-input__inner {
    width: 35% !important;
    text-align: center;
}

.herms-game >>> .el-input__inner {
    line-height: 0.52rem !important;
}

.birth::after {
    content: '';
    position: absolute;
    width: 0.2rem;
    height: 0.17rem;
    top: 50%;
    right: 0.12rem;
    margin-top: -0.068rem;
    background: url('../../../assets/imgs_m/hms-icon.png') no-repeat center;
    background-size: 3rem 3rem;
    background-position: 0 -1.82rem;
}

.birth span {
    width: 100%;
    height: 100%;
}

.game_center_m {
    .p_pic {
        float: left;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        padding-bottom: 0rem;
        border: 2px solid #fcc916;
        /* * width: 1.2rem;
        height: 1.2rem;
        text-align: center;
        box-sizing: border-box;
        background: #ebf0f3;
        line-height: inherit !important; * */
        .pic {
            width: 0.66rem;
            text-align: center;
            height: 0.66rem;
            margin: 0.05rem auto !important;

            img {
                width: 100%;
                margin-bottom: 0.06rem !important;
                margin-top: 0.08rem !important;
            }
        }

        span {
            display: block;
            width: 100%;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.2rem;
            border-top: 1px dashed #5d5d5d;
            text-align: center;
            margin-top: .09rem;
            padding-top: .02rem
        }
    }

    .game-area {
        text-align: left;
    }

    h2 {
        position: relative;
        display: block;
        width: 100%;
        margin-bottom: 0.4rem;
        font-size: 0.16rem;
        color: #4b4b4b;
        font-weight: 500;
        text-indent: 0.3rem;

        &::before {
            content: '';
            position: absolute;
            width: 0.37rem;
            height: 0.44rem;
            top: 50%;
            left: 3.33rem;
            margin-top: -0.19rem;
            background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
            background-size: 3rem 3rem;
            background-position: -2.61rem -0.9rem;
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
    border: 2px solid $bdColor;
    border-radius: $bdRadius;
    box-sizing: border-box;
    line-height: 0.6rem;
    padding: 0.5rem 0.3rem;
}

.label_name {
    display: inline-block;
    width: 1.4rem !important;
    font-size: 0.28rem;
    color: #5d5d5d;
    text-align: left;
}

.el-select {
    width: 73%;
}

.el-select-two >>> .el-input__inner {
    width: 37% !important;
    height: 0.47rem !important;
    line-height: 0.51rem;
    padding: 0 0.2rem !important;
    font-size: 0.225rem;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border-radius: inherit;
}

.el-select-two >>> .el-input__inner:nth-of-type(2) {
    margin-left: 2.99999999999%;
}

.el-select >>> .el-input__inner {
    width: 100% !important;
    height: 0.47rem;
    line-height: 0.5rem;
    font-size: 0.225rem;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border-radius: inherit;
}

.game-area .el-select {
    width: 35%;
}

.game-area .el-select .el-input__inner {
}

.game-area .el-select:nth-of-type(2) {
    margin-left: 3%;
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

.pay_now {
    display: inline-block;
    width: 1.67rem;
    height: 0.54rem;
    text-indent: -9999px;
    background: url('../../../assets/imgs/btn/btn_pay.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 0.5rem;
    outline: none;
    appearance: none;

    &:hover {
        outline: none;
        appearance: none;
    }
}

.game-area {
    span {
        width: 100%;
        display: inline-block;

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
        font-size: 0.28rem;
        margin-bottom: 0.42rem;

        &:nth-of-type(1) {
        }

        &:nth-of-type(2) {
            margin-left: 50px;
        }
    }

    span {
        font-size: 0.28rem;

        &:nth-of-type(1) {
            color: #222222;
        }

        &:nth-of-type(2) {
            color: #fcc814;
        }
    }
}

.content {
    width: 100%;
    margin-top: 0.26rem;

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