<template>
    <div class="wrapper_mebmer">
        <!-- <h2 class="animated fadeInLeft">會員中心</h2> -->
        <div class="sub_login_wrapper_pc login fl">
            <div class="login_box login_in">
                <form class="form">
                    <dl>
                        <span class="logo">
                            註冊帳號
                            <!-- <i></i> -->
                        </span>
                        <div class="con">
                            <div>
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                                    <div class="userInput">
                                        <el-form-item prop="userName">
                                            <div>
                                                <dd class="hms_account">
                                                    帳號
                                                    <span class="hms_after">Account</span>
                                                </dd>
                                                <dd class="userName">
                                                    <el-input
                                                        placeholder="帳號限6-18字元"
                                                        class="inp"
                                                        v-model="ruleForm.userName"
                                                    ></el-input>
                                                </dd>
                                            </div>
                                        </el-form-item>

                                        <el-form-item prop="pass">
                                            <div>
                                                <dd class="hms_password mar10">
                                                    密碼
                                                    <span class="hms_after">Password</span>
                                                </dd>
                                                <dd class="passWord">
                                                    <el-input
                                                        type="password"
                                                        placeholder="密碼限6-18字元"
                                                        class="inp"
                                                        v-model="ruleForm.pass"
                                                    ></el-input>
                                                </dd>
                                            </div>
                                        </el-form-item>

                                        <el-form-item prop="checkPass">
                                            <div>
                                                <dd class="hms_password mar10">
                                                    確認密碼
                                                    <span class="hms_after">Password</span>
                                                </dd>
                                                <dd class="passWord">
                                                    <el-input
                                                        type="password"
                                                        placeholder="6-18個字元,英字母分大小寫"
                                                        class="inp"
                                                        v-model="ruleForm.checkPass"
                                                    ></el-input>
                                                </dd>
                                            </div>
                                        </el-form-item>

                                        <el-form-item prop="email">
                                            <div>
                                                <dd class="hms_password hms_email mar10">
                                                    電子信箱
                                                    <span class="hms_after">Email</span>
                                                </dd>
                                                <dd class="passWord">
                                                    <el-input
                                                        placeholder="驗證電子信箱以便找回密碼"
                                                        class="inp"
                                                        v-model="ruleForm.email"
                                                    ></el-input>
                                                </dd>
                                            </div>
                                        </el-form-item>

                                        <div class="clear"></div>

                                        <el-form-item>
                                            <dd class="register mar10">
                                                <el-radio
                                                    v-model="radio"
                                                    label="1"
                                                    @change="radioD(radio)"
                                                >
                                                    同意接受
                                                    <router-link
                                                        to="/customerCenter"
                                                        @click.native="toTermsservice(2)"
                                                    >《服務條款》</router-link>
                                                </el-radio>
                                            </dd>
                                        </el-form-item>

                                        <el-form-item>
                                            <dd>
                                                <el-button
                                                    type="primary"
                                                    class="btn_login"
                                                    @click="submitForm('ruleForm')"
                                                >確認送出</el-button>
                                            </dd>
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </div>
                        </div>
                    </dl>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// import Vue from 'vue'
import defined from "@/assets/js/defined.js";
import "@/assets/styles/login.css";
export default {
    name: "SubRegister",
    props: {
        options: Object,
    },
    inject: ["reload"], //注入reload方法
    data: function () {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("請輸入密碼"));
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
            ruleForm: {
                userName: "",
                pass: "",
                checkPass: "",
                email: "",
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
                        message: "用戶名長度在6-18位字符",
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
            },
        };
    },
    mounted() {},
    methods: {
        radioD(val) {
            this.radio = val;
            console.log("此時選中的值", val);
        },
        toTermsservice: function (val) {
            setTimeout(() => {
                this.$bus.emit("toTermsservice", val);
            }, 200);
        },
        handleRegister: function () {
            if (this.radio == 1) {
                this.options.isLoading = true;
                let datas = {
                    account: this.ruleForm.userName,
                    password: this.ruleForm.pass,
                    password_confirmation: this.ruleForm.checkPass,
                    email: this.ruleForm.email,
                };
                this.postHttp(this, datas, "/front/register", function (
                    obj,
                    data
                ) {
                    if (data) {
                        if (data.status == "2000") {
                            obj.options.isLoading = false;
                            obj.$notify({
                                title: "成功",
                                message: "註冊成功!",
                                type: "success",
                            });
                            let token = data.data.bear_token;
                            let userInfo = data.data.user_info;
                            obj.$store.commit("setToken", token);
                            obj.$store.commit("setUserInfo", userInfo);
                            localStorage.setItem("token", token);
                            localStorage.setItem(
                                "userInfo",
                                JSON.stringify(userInfo)
                            ); //保存登录状态
                            obj.$bus.emit("registerNow", 2, false);
                            obj.$bus.emit("registerSuccess", false);
                        } else {
                            obj.options.isLoading = false;
                            obj.$notify.error({
                                title: "錯誤",
                                message: data.message,
                            });
                        }
                    } else {
                        obj.options.isLoading = false;
                    }
                });
            } else {
                console.log("1選中條款的值", this.radio);
                this.$message("請勾選服務條款！");
                return;
            }
        },
        submitForm: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleRegister();
                } else {
                    console.log("錯誤的提交 !!");
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="stylus" scoped>
.v-enter, .v-enter-to {
    opacity: 0;
}

.v-enter-active, .v-leave-active {
    transition: opacity 1s;
}

.login >>> .el-radio__input.is-checked .el-radio__inner {
    color: #fcc814;
    border-color: #fcc814;
    background: #fcc814;
}

.login >>> .el-radio__inner:hover {
    border-color: #fcc505;
}

.login >>> .userName .el-input__inner, .login >>> .passWord .el-input__inner {
    width: 266px !important;
    height: 38px !important;
    background: #fff !important;
    font-size: 16.67px !important;
    color: #756e6e !important;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border-radius: inherit;
}

.login >>> .el-input__inner:-webkit-autofill {
    background-color: #fff !important;
    background: #fff !important;
    box-shadow: 2px 0 2px 0 rgba(3, 3, 3, 0.35) inset, 0 2px 2px 0 rgba(3, 3, 3, 0.35) inset, 0 -2px 2px 0 rgba(3, 3, 3, 0.35) inset, -2px 0 2px 0 rgba(3, 3, 3, 0.35) inset !important;
}

.login >>> .el-input__inner {
}

.login >>> .register .el-radio__input {
    margin-top: -9px;
    margin-right: 3px;
}

.login >>> .el-form-item__error {
    color: #F56C6C;
    top: 99%;
    left: 0;
    font-size: 10px;
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

.mar10 {
    margin-top: 20px;
}

.sub_login_wrapper_pc {
    position: absolute;
    width: 621px;
    height: 603px;
    border: 3px solid #898888;
    box-sizing: border-box;

    .btn_login, .el-form-item {
        margin-bottom: 0 !important;
    }

    .btn_login {
        color: #434341 !important;
        font-size: 26px !important;
        width: 155px !important;
        height: 50px !important;
        margin-top: 2px;
        text-indent: -9999px;
        background: url('../../../assets/imgs/btn/btn_rig.png') no-repeat center !important;
        background-size: 100% 100% !important;
        transition: all 0.9s;
        margin-top: 10px;

        &:hover {
            animation: fadeIn 0.7s ease-in-out;
        }
    }

    .forgetPassword {
        input[name='checkbox'] {
            margin-top: 12px !important;
            margin-right: 9px !important;
        }
    }

    .register {
        text-align: left;
        margin: 20px 0;

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
        width: 290px;
        height: 447px;
        text-align: center;
        color: #4b4b4b;
        left: 50%;
        top: 0;
        margin-left: - 145px;

        .form {
            dl {
                overflow: inherit;
            }

            .con {
                width: 290px;
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
            width: 274px;
            margin-top: 17px;
            padding-bottom: 10px;
            font-size: 26px;
            color: #4b4b4b;
            border-bottom: 2px solid #fcc505;

            &::before {
                content: '';
                position: absolute;
                width: 24px;
                height: 24px;
                top: 50%;
                left: 52px;
                margin-top: -15px;
                background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                background-size: 300px 300px;
                background-position: -266px -224px;
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
                padding-left: 26px
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
                    margin-top: -12px;
                    background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                    background-size: 300px 300px;
                    background-position: -38px -224px;
                }
            }

            .hms_email {
                &::before {
                    margin-top: -8px;
                    background-position: -277px -161px;
                }
            }

            .hms_after {
                font-size: 20.83px;
            }

            dd {
                position: relative;
            }

            .el-input__inner {
                text-indent: 47px;
                text-align: left;
            }

            .el-input {
                display: inherit;
            }
        }
    }
}
</style>