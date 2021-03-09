<template>
    <div class="wrapper_mebmer mp">
        <!-- <h2 class="animated fadeInLeft">會員中心</h2> -->
        <div class="sub_login_wrapper login recordStore">
            <div class="login_box" :class="{bounceOut:isAni}">
                <form class="form">
                    <dl>
                        <span class="logo">忘記密碼</span>
                        <ul class="step">
                            <li>
                                <em v-if="options.isStep1">1</em>
                                <i v-else>1</i>
                                帳號驗證
                            </li>
                            <span></span>
                            <li>
                                <em v-if="options.isStep2">2</em>
                                <i v-else>2</i>
                                密碼填寫
                            </li>
                            <span></span>
                            <li>
                                <em v-if="options.isStep3">3</em>
                                <i v-else>3</i>
                                完成
                            </li>
                        </ul>
                        <div class="clear"></div>
                        <div class="con">
                            <div class="step1" v-if="options.isStep1">
                                <el-form
                                    :model="ruleForm"
                                    :rules="rules"
                                    ref="ruleForm"
                                    label-width="100px"
                                    class="demo-ruleForm"
                                >
                                    <el-form-item label="Email" prop="email">
                                        <el-input v-model="ruleForm.email" placeholder="驗證郵箱以便找回密碼"></el-input>
                                        <input
                                            type="button"
                                            class="getVerifyCode btn_email fl"
                                            @click="handleSendMailVerifyCode"
                                        />
                                        <!-- <span class="txt">(驗證電子信箱以便找回密碼)</span> -->
                                    </el-form-item>
                                    <el-form-item label="驗證碼" prop="verifyCode">
                                        <el-input
                                            v-model="ruleForm.verifyCode"
                                            placeholder="填寫電子訊息驗證碼"
                                        ></el-input>
                                        <!-- <span class="txt">(填寫電子訊息驗證碼)</span> -->
                                    </el-form-item>

                                    <el-form-item>
                                        <dd>
                                            <el-button
                                                type="primary"
                                                class="btn_login btn_one"
                                                @click="oneStepVerifyEmail()"
                                            >下一步</el-button>
                                        </dd>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="step2" v-if="options.isStep2">
                                <el-form
                                    :model="ruleForm"
                                    :rules="rules"
                                    ref="ruleForm"
                                    label-width="100px"
                                    class="demo-ruleForm"
                                >
                                    <el-form-item label="新密碼" prop="pass">
                                        <el-input
                                            type="password"
                                            v-model="ruleForm.pass"
                                            placeholder="(密碼需為6-16個字元,英字母分大小寫)"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="確認密碼" prop="checkPass">
                                        <el-input
                                            type="password"
                                            v-model="ruleForm.checkPass"
                                            placeholder="(與上面填寫的密碼相同)"
                                        ></el-input>
                                    </el-form-item>

                                    <el-form-item>
                                        <dd>
                                            <el-button
                                                type="primary"
                                                class="btn_login btn_two"
                                                @click="twoStepUpdatePassword('ruleForm')"
                                            >下一步</el-button>
                                        </dd>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="step3" v-if="options.isStep3">
                                <el-form
                                    :model="ruleForm"
                                    :rules="rules"
                                    ref="ruleForm"
                                    label-width="100px"
                                    class="demo-ruleForm"
                                >
                                    <span class="success_txt">成功完成密碼修改</span>
                                    <el-form-item>
                                        <dd>
                                            <el-button
                                                type="primary"
                                                class="btn_login btn_three"
                                                @click="ThreeUpdatePasswordSuccess()"
                                            >首页</el-button>
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
    </div>
</template>

<script>
import "@/assets/styles/login.css";
export default {
    name: "ForgetPassword",
    inject: ["reload"], //注入reload方法
    data: function () {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密碼"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("請再次輸入密碼"));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error("兩次輸入的密碼不一致!"));
            } else {
                callback();
            }
        };
        return {
            radio: "2",
            isAni: false,
            account: "",
            passWord: "",
            isRemember: "",
            checked: true,
            birth_date: "",
            options: {
                isLoading: false,
                isStep1: true,
                isStep2: false,
                isStep3: false,
            },
            rules: {},
            step1: false,
            step2: false,
            step3: false,
            ruleForm: {
                userName: "",
                pass: "",
                checkPass: "",
                email: "",
                verifyCode: "",
            },
            rules: {
                userName: [
                    { required: true, message: "請輸入帳號", trigger: "blur" },
                    {
                        min: 6,
                        max: 18,
                        message: "用戶名長度在6-18位字符",
                        trigger: "blur",
                    },
                ],
                pass: [
                    {
                        required: true,
                        message: "請輸入密碼",
                        validator: validatePass,
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 18,
                        message: "密碼長度在6-18位字符",
                        trigger: "blur",
                    },
                ],
                checkPass: [
                    {
                        required: true,
                        message: "請輸入確認密碼",
                        trigger: "blur",
                    },
                    {
                        required: true,
                        message: "兩次輸入的密碼不一致!",
                        validator: validatePass2,
                        trigger: "blur",
                    },
                ],
                email: [
                    {
                        required: true,
                        message: "請輸入郵箱地址",
                        trigger: "blur",
                    },
                    {
                        type: "email",
                        message: "請輸入正確的郵箱地址",
                        trigger: ["blur", "change"],
                    },
                ],
                verifyCode: [
                    {
                        required: true,
                        message: "請輸入驗證碼",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    computed: {},
    mounted() {
        // setTimeout(() =>{
            this.$bus.emit("delTabList");
        // })
    },
    methods: {
        handleSendMailVerifyCode: function () {
            let datas = {
                email: this.ruleForm.email,
            };
            this.postHttp(this, datas, "/front/verify/captcha", function (
                obj,
                data
            ) {
                if (data) {
                    obj.$toast(data.message);
                }
            });
        },
        oneStepVerifyEmail: function () {
            let datas = {
                email: this.ruleForm.email,
                captcha: this.ruleForm.verifyCode,
            };
            this.postHttp(this, datas, "/front/forgot/email/verify", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.options.isStep1 = false;
                    obj.options.isStep2 = true;
                    obj.options.isStep3 = false;
                } else {
                    obj.$toast(data.message);
                }
            });
        },
        twoStep: function () {
            let datas = {
                password: this.ruleForm.pass,
                password_confirmation: this.ruleForm.checkPass,
                email: this.ruleForm.email,
            };
            this.postHttp(this, datas, "/front/forgot/pass", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.$toast(data.message);
                    obj.options.isStep1 = false;
                    obj.options.isStep2 = false;
                    obj.options.isStep3 = true;
                } else {
                    obj.$toast(data.message);
                }
            });
        },
        twoStepUpdatePassword: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.twoStep();
                } else {
                    return false;
                }
            });
        },
        ThreeUpdatePasswordSuccess: function () {
            this.$router.push("/mobile/home");
        },
        toTermsservice: function (val) {
            this.$bus.emit("toTermsservice", val);
        },
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

.login >>> .el-input__inner {
    float: left;
}

.login >>> .el-input {
    width: auto;
    float: left;
}

.login >>> .el-form-item__label {
    line-height: 30px !important;
}

.login >>> .userName .el-input__inner, .login >>> .passWord .el-input__inner {
    width: 2.45rem !important;
    height: 0.46rem !important;
    background: #fff !important;
    font-size: 16.67px !important;
    color: #756e6e !important;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border-radius: inherit;
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
    font-size: 0.3rem;
    color: #4b4b4b;
    padding: 0;
    text-align: left;
    width: 1.15rem !important;
}

.login >>> .step2 .el-form-item__label {
    font-size: 0.275rem;
    color: #4b4b4b;
    padding: 0;
    text-align: left;
    width: 1.42rem !important;
    margin-right: 0.16rem;
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
    width: 2.45rem !important;
    height: 0.46rem !important;
    margin-top: 0.02rem;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border: none !important;
    margin-right: 0.12rem;
    text-align: center;
}

.login >>> .step2 .el-input__inner {
    width: 3.8rem !important;
}

.login >>> .el-form-item__content {
    line-height: inherit;
    margin-left: 0 !important;
    position: relative;
}

.login >>> .rig .el-form-item__content {
    margin-left: 0 !important;
}

.login >>> .el-form-item__error {
    color: #F56C6C;
    top: 93%;
    left: 1.2rem;
    font-size: 0.12rem;
}

.login >>> .step2 .el-form-item__error {
    color: #F56C6C;
    top: 93%;
    left: 1.6rem;
    font-size: 0.12rem;
}

.register >>> .el-radio__inner {
    margin-top: -3px;
}

.wrapper_mebmer {
    h2 {
        position: relative;
        display: block;
        width: 100%;
        text-indent: 30px;
        font-size: 47.02px;
        color: #4b4b4b;
        font-weight: 500;
        text-indent: 55px;
        margin-bottom: 40px;

        &::before {
            content: '';
            position: absolute;
            width: 28px;
            height: 42px;
            top: 50%;
            left: 208px;
            margin-top: -18px;
            background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
            background-size: 300px 300px;
            background-position: -218px 0;
        }
    }
}

.sub_login_wrapper {
    padding: .3rem 0 0;
    border: 2px solid $bdColor;
    border-radius: $bdRadius;

    .btn_login, .el-form-item {
        margin-bottom: 25px !important;
    }

    .btn_login {
        color: #434341 !important;
        font-size: 26px !important;
        width: 1.55rem !important;
        height: 0.5rem !important;
        margin-top: 0.02rem;
        text-indent: -9999px;
        transition: all 0.9s;
        margin-top: 0.1rem;
        border: none;

        &:hover {
            animation: fadeIn 0.7s ease-in-out;
        }
    }

    .btn_one, .btn_two {
        background: url('../../../assets/imgs/btn/btn_next.png') no-repeat center !important;
        background-size: 100% 100% !important;
    }

    .btn_three {
        background: url('../../../assets/imgs/btn/btn_to_index.png') no-repeat center !important;
        background-size: 100% 100% !important;
    }

    .forgetPassword {
        input[name='checkbox'] {
            margin-top: 12px !important;
            margin-right: 9px !important;
        }
    }

    .txt {
        width: 100%;
        display: inline-block;
        text-align: left;
        color: #756e6e;
        font-size: 16.67px;
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
            width: 5.5rem;
            margin: 0 auto;

            .success_txt {
                display: inline-block;
                width: 100%;
                color: #4b4b4b;
                font-size: 0.3rem;
                margin: 0.6rem 0 0.7rem;
            }

            .step {
                width: 91%;
                height: 1rem;
                margin: 0 auto;

                em {
                    display: block;
                    width: 0.5rem !important;
                    height: 0.51rem !important;
                    margin: 0 auto;
                    line-height: 0.5rem;
                    font-style: inherit;
                    font-size: 0.28rem;
                    margin-bottom: 0.03rem;
                    margin-bottom: 0.08rem;
                    background: url('../../../assets/imgs/radio.png') no-repeat center !important;
                    background-size: 100% 100% !important;
                }

                i {
                    display: block;
                    width: 0.5rem !important;
                    height: 0.51rem !important;
                    margin: 0 auto;
                    line-height: 0.5rem;
                    font-style: inherit;
                    font-size: 0.28rem;
                    margin-bottom: 0.08rem;
                    color: #fff;
                    border-radius: 100%;
                    background: #7a7a78;
                    background-size: 100% 100% !important;
                }

                li {
                    float: left;
                    font-size: 0.3rem;
                    color: #4b4b4b;
                }

                span {
                    float: left;
                    width: 0.9rem;
                    height: 0.0325rem;
                    background: #7a7a78;
                    margin-top: 0.26rem;
                    margin-right: 0.06rem;
                }
            }

            dl {
                overflow: inherit;
            }

            .con {
                width: 100%;
                margin-top: 0.4rem;

                .btn_email {
                    display: inline-block;
                    width: 1.54rem;
                    height: 0.5rem;
                    line-height: 0.5rem;
                    font-size: 0.18rem;
                    color: #323231;
                    margin-left: 0.03rem;
                    border: none;
                    cursor: pointer;
                    background: url('../../../assets/imgs_m/btn/btn-email-send.png') no-repeat center;
                    background-size: 100% 100%;
                }

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
            width: 5rem;
            margin-top: 0.24rem;
            padding-bottom: 0.1rem;
            margin-bottom: 0.4rem;
            font-size: 0.3rem;
            color: #4b4b4b;
            border-bottom: 2px solid #fcc505;

            &::before {
                content: '';
                position: absolute;
                width: 0.24rem;
                height: 0.24rem;
                top: 50%;
                left: 1.52rem;
                margin-top: -0.15rem;
                background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                background-size: 3rem 3rem;
                background-position: -0.37rem -2.24rem;
            }

            i {
                display: inline-block;
                width: 0.7rem;
                height: 0.51rem;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -0.35rem;
                margin-top: -0.255rem;
                background: #4b4b4b;
                border-radius: 0.025rem;
            }
        }

        .icon {
            span {
                display: inline-block;
                color: #545454;
                font-size: 0.14rem;
                vertical-align: top;
                margin-right: 0.25rem;
                margin-top: 0.08rem;
            }

            div {
                display: inline-block;
                width: 0.39rem;
                height: 0.46rem;
                margin-top: 0.08rem;
                background: url('../../../assets/imgs/game-icon.png') no-repeat center;
                background-size: 5rem 5rem;
                cursor: pointer;

                &.gg {
                    background-position: 0 -1.66rem;
                }

                &.tw {
                    background-position: -0.61rem -1.66rem;
                }

                &.fb {
                    background-position: -1.23rem -1.66rem;
                }
            }
        }

        .login_reg {
            a {
                color: #2c2c2c;
                font-size: 0.14rem;
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

            .el-input {
                display: inherit;
                width: inherit;
            }
        }
    }
}
</style>