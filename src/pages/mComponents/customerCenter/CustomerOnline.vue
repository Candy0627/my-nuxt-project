<template>
    <div>
        <div class="sub_login_wrapper login recordStore" v-cloak v-if="options.isOnline">
            <div class="login_box" :class="{bounceOut:isAni}">
                <form class="form">
                    <dl>
                        <div class="con">
                            <div>
                                <el-form
                                    :model="ruleForm"
                                    :rules="rules"
                                    ref="ruleForm"
                                    label-width="100px"
                                    class="demo-ruleForm"
                                >
                                    <el-form-item label="選擇遊戲" prop="gameInfo">
                                        <div class="birth el-input__inner" @click="openPicker_game('game')">
                                            <span v-if="valueSelected_game" class="ep-one">{{valueSelected_game}}</span>
                                            <span v-else>{{defaultValue_game}}</span>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="選擇伺服器" prop="serverInfo">
                                        <div class="birth el-input__inner" @click="openPicker_server('server')" :class="{disabled_m:options.isShowD}">
                                            <span v-if="valueSelected_server" class="ep-one">{{valueSelected_server}}</span>
                                            <span v-else>{{defaultValue_server}}</span>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="角色名稱" prop="roleInfo">
                                        <div class="birth el-input__inner" @click="openPicker_role('role')" :class="{disabled_m:options.isShowD}">
                                            <span v-if="valueSelected_role" class="ep-one">{{valueSelected_role}}</span>
                                            <span v-else>{{defaultValue_role}}</span>
                                        </div>
                                        <!-- <el-select
                                            v-model="ruleForm.roleInfo"
                                            placeholder="請填寫角色名稱"
                                        >
                                            <el-option
                                                v-for="item in roleNameList"
                                                :key="item.role_id"
                                                :label="item.role_name"
                                                :value="item.role_id"
                                            ></el-option>
                                        </el-select> -->
                                    </el-form-item>

                                    <el-form-item class="m_customer">
                                        <dd>
                                            <el-button
                                                type="primary"
                                                class="btn_login btn_online"
                                                @click="submitForm('ruleForm')"
                                            >聯繫客服</el-button>
                                        </dd>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </dl>
                </form>
            </div>
            <div class="clear"></div>
        </div>
        <!-- <common-pop :options="options"></common-pop> -->
    </div>
</template>

<script>
import "@/assets/styles/login.css";
import CommonPop from "@/pages/mComponents/common/CommonPop.vue";
export default {
    name: "SubMyprofile",
    components:{
        CommonPop
    },
    props: {
        options: Object,
        curId: Number,
        valueSelected_game: String,
        valueSelected_server: String,
        valueSelected_role: String
    },
    inject: ["reload"],
    data: function () {
        return {
            isAni: false,
            account: "",
            passWord: "",
            isRemember: "",
            checked: true,
            rules: {
                gameInfo: [
                    { required: true, message: "請選擇遊戲", trigger: "blur" },
                ],
                serverInfo: [
                    {
                        required: true,
                        message: "請選擇遊戲伺服器",
                        trigger: "blur",
                    },
                ],
                roleInfo: [
                    {
                        required: true,
                        message: "請填寫角色名稱",
                        trigger: "blur",
                    },
                ],
            },
            ruleForm: {
                game: "",
                server: "",
                role: "",
                gameInfo: "",
                serverInfo: "",
                roleInfo: "",
            },
            userGameName: "請選擇遊戲",
            defaultValue_game:'請選擇遊戲',
            defaultValue_server:'請選擇伺服器',
            defaultValue_role:'請選擇角色名',
        };
    },
    created() {
        this.$bus.on("sendValue", (val) => {
            console.log("此時獲得selected值", val);
            this.userGameName = val.name;
        });
    },
    mounted() {
        if (localStorage.getItem("token")) {
            this.options.isOnline = true;
            this.$emit("loadUserGamesList");
        } else {
        }
    },
    methods: {
        openPicker_game: function (type) {
            this.$emit("openPicker_game", type);
        },
        openPicker_server: function (type) {
            this.$emit("openPicker_server",type);
        },
        openPicker_role: function(type) {
            this.$emit("openPicker_role",type);
        },
        toTermsservice: function (val) {
            this.val = val;
            this.$bus.emit("toTermsservice", val);
        },
        submitForm: function(formName) {
            this.$emit("submitForm", formName);
        }
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles_m/varibles.styl';

.v-enter, .v-enter-to {
    opacity: 0;
}

.v-enter-active, .v-leave-active {
    transition: opacity 1s;
}
.disabled_m{
    pointer-events: none;
    background: #ccc !important;
}

.login >>> .birth{
    position relative
    padding 0 !important
}
.birth::after {
    content: '';
    position: absolute;
    width: .2rem;
    height: .17rem;
    top: 50%;
    right: 0.12rem;
    margin-top: -0.068rem;
    background: url('../../../assets/imgs_m/hms-icon.png') no-repeat center;
    background-size: 3rem 3rem;
    background-position: 0 -1.82rem;
}

.login >>> .userName .el-input__inner, .login >>> .passWord .el-input__inner {
    width: 3.938rem !important;
    height: 0.4539rem !important;
    background: #fff !important;
    font-size: 0.22rem !important;
    color: #756e6e !important;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border-radius: inherit;
}
.login >>> .m_customer .el-form-item__content{
    margin-left: 0 !important
}

.login >>> .el-input {
    display: inherit;
}

.login >>> .el-radio__input.is-checked .el-radio__inner {
    color: #fcc505;
}

.login >>> .sex .el-radio__label {
    color: #4b4b4b;
}

.login >>> .el-radio__input.is-checked .el-radio__inner {
    border-color: #fcc505;
    background: #fcc505;
}

.login >>> .el-form-item__label {
    font-size: 0.275rem;
    color: #4b4b4b;
    padding: 0;
    margin-right: 0.15rem;
    width: 1.7rem !important;
}

.login >>> .el-radio__inner:hover {
    border-color: #fcc505;
}

.login >>> .el-radio-group {
    float: left;
    margin-left: 50px;
    margin-top: 12px;
}

.login >>> .el-date-editor--date {
    float: left;
    margin-left: 50px;
}

.hms_btn {
    width: 100%;
    text-align: center;
}

.border {
    margin-left: -47px;
}

.login >>> .el-input__inner {
    width: 3.4rem !important;
    height: 0.4539rem !important;
    line-height: 0.479rem !important;
    margin-top: .02rem;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border: none !important
}
.login >>> .el-input__inner span{
    font-size: .22rem;
}

.login >>> .rig .el-form-item__content {
    margin-left: 0 !important;
}
.login >>> .el-form-item{
    margin-bottom: .45rem
}
.login >>> .el-form-item__error {
    color: #F56C6C;
    top: 99%;
    left: 51px;
    font-size: 10px;
}

.register >>> .el-radio__inner {
    margin-top: -3px;
}

.sub_login_wrapper {
    margin-top: 0.36rem;
    border-radius: $bdRadius;
    border: 2px solid $bdColor;
    box-sizing: border-box;
    text-align: center;
    padding: 0.45rem 0.2rem 0;

    .btn_login, .el-form-item {
        margin-bottom: 0.3rem !important;
    }

    .btn_login {
        color: #434341 !important;
        font-size: 0.26rem !important;
        width: 1.55rem !important;
        height: 0.5rem !important;
        margin-top: 0.02rem;
        text-indent: -9999px;
        transition: all 0.9s;
        margin-top: 0.1rem;

        &:hover {
            animation: fadeIn 0.7s ease-in-out;
        }
    }

    .btn_online {
        border: none;
        background: url('../../../assets/imgs/btn/btn_online_customer.png') no-repeat center !important;
        background-size: 100% 100% !important;
    }

    .forgetPassword {
        input[name='checkbox'] {
            margin-top: 12px !important;
            margin-right: 9px !important;
        }
    }

    .register {
        text-align: left;
        margin: 10px 0;
        margin-left: 47px;

        >>> .el-radio__label {
            color: #4b4b4b;
            font-size: 24px;

            a {
                font-size: 24px;
                color: #0c22ef;
            }
        }

        a {
            font-size: 24.51px;
            color: #4b4b4b;

            &:hover {
                color: #fcc916;
            }
        }

        .el-checkbox__label {
            color: #fff;
        }

        em {
            display: inline-block;
            width: 15.29px;
            height: 15.29px;
            background: #4b4b4b;
            margin-right: 8px;
        }
    }

    .login_box {
        .form {
            dl {
                overflow: inherit;
            }

            .con {
                width: 100%;

                .tips {
                    text-align: left;
                }
            }
        }

        .login_close {
            position: absolute;
            width: 89px;
            height: 82px;
            right: 0;
            top: 0;
            border-top-right-radius: 30%;
            background: url('../../../assets/imgs/close.png') no-repeat center;
            background-size: 100% 100%;
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

        .logo {
            position: relative;
            display: inline-block;
            width: 100%;
            margin-top: 24px;
            padding-bottom: 10px;
            margin-bottom: 40px;
            font-size: 26px;
            color: #4b4b4b;
            border-bottom: 3px solid #fcc505;

            &::before {
                content: '';
                position: absolute;
                width: 24px;
                height: 24px;
                top: 50%;
                left: 152px;
                margin-top: -15px;
                /* *background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                background-size: 300px 300px;
                background-position: -40px -253px;* */
            }

            i {
                display: inline-block;
                width: 70px;
                height: 51px;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -35px;
                margin-top: -25.5px;
                background: #4b4b4b;
                border-radius: 2.5px;
            }
        }

        .icon {
            span {
                display: inline-block;
                color: #545454;
                font-size: 14px;
                vertical-align: top;
                margin-right: 25px;
                margin-top: 8px;
            }

            div {
                display: inline-block;
                width: 39px;
                height: 46px;
                margin-top: 8px;
                background: url('../../../assets/imgs/game-icon.png') no-repeat center;
                background-size: 500px 500px;
                cursor: pointer;

                &.gg {
                    background-position: 0 -166px;
                }

                &.tw {
                    background-position: -61px -166px;
                }

                &.fb {
                    background-position: -123px -166px;
                }
            }
        }

        .login_reg {
            a {
                color: #2c2c2c;
                font-size: 14px;
            }
        }

        .userInput {
            width: 264px;
            height: 190px;
            margin: 0 auto;
            padding: 0 10px;
            margin-top: 15px;

            .hms_account, .hms_password {
                position: relative;
                width: 100%;
                text-align: left;
                color: #4b4b4b;
                font-size: 24px;
                text-indent: 1.53rem;
            }

            .hms_account {
                &::before {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    top: 50%;
                    left: 0;
                    margin-top: -9px;
                    background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                    background-size: 300px 300px;
                    background-position: -38px -192px;
                }
            }

            .hms_password {
                &::before {
                    content: '';
                    position: absolute;
                    width: 22px;
                    height: 22px;
                    top: 50%;
                    left: 0;
                    margin-top: -9px;
                    background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                    background-size: 300px 300px;
                    background-position: -38px -224px;
                }
            }

            .hms_email {
                &::before {
                    background-position: -277px -161px;
                }
            }

            .hms_after {
                font-size: 20.83px;
            }

            dd {
                position: relative;
            }
        }
    }
}
</style>