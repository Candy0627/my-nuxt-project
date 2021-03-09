<template>
    <div class="wrapper_mebmer mp">
        <!-- <h2 class="animated fadeInLeft">會員中心</h2> -->
        <div class="sub_login_wrapper login_rig">
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
                                            <dd class="register mar20">
                                                <el-radio
                                                    v-model="radio"
                                                    label="1"
                                                    @change="radioD(radio)"
                                                >
                                                    同意接受
                                                    <router-link
                                                        to="/mobile/customerCenter"
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
// import "@/assets/styles/login.css";
export default {
    name: "SubRegister",
    props: {
        options: Object,
    },
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
    mounted() {
        this.$bus.emit("delTabList");
    },
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
                            obj.$toast(data.message);
                            let token = data.data.bear_token;
                            let userInfo = data.data.user_info;
                            obj.$store.commit("setToken", token);
                            obj.$store.commit("setUserInfo", userInfo);
                            localStorage.setItem("token", token);
                            localStorage.setItem(
                                "userInfo",
                                JSON.stringify(userInfo)
                            ); //保存登录状态
                            obj.options.widths = "78%"
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
                this.$toast("請勾選服務條款！");
                return;
            }
        },
        submitForm: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleRegister();
                } else {
                    // console.log("錯誤的提交 !!");
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

.login_rig >>> .el-radio__inner {
    width: 0.26rem !important;
    height: 0.26rem !important;
    vertical-align: -webkit-baseline-middle;
    margin-bottom: 0.05rem;
}

.login_rig >>> .el-radio__input.is-checked .el-radio__inner {
    color: #fcc814;
    border-color: #fcc814;
    background: #fcc814;
}

.login_rig >>> .el-radio__inner:hover {
    border-color: #fcc505;
}

.login_rig >>> .userName .el-input__inner, .login_rig >>> .passWord .el-input__inner {
    width: 100% !important;
    height: 0.454rem !important;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border-radius: inherit;
}

.login_rig >>> .register .el-radio__input {
    margin-top: -9px;
    margin-right: 3px;
}

.el-form-item__content.el-form-item__error {
    color: #F56C6C;
    top: 99%;
    left: 0;
    font-size: 10px;
}

.login_rig >>> .el-form-item__content {
    line-height: inherit;
    margin-top: 0.2rem;
}

.login_rig >>> .el-form-item {
    margin-top: 0.02rem;
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
            background: url('../../../assets/imgs_m/hms-icon.png') no-repeat center;
            background-size: 300px 300px;
            background-position: -218px 0;
        }
    }
}

.mar10 {
    margin-top: 0.2rem;
}

.sub_login_wrapper {
    width: 100%;
    height: 100%;
    padding: 0.2rem 0 0.4rem;
    margin-top: 0;
    border: 2px solid #898888;
    border-radius: 40px;
    box-sizing: border-box;

    .btn_login, .el-form-item {
        margin-bottom: 0 !important;
    }

    .btn_login {
        width: 1.85rem !important;
        height: 0.58rem !important;
        margin-top: 0.02rem !important;
        text-indent: -9999px;
        background: url('../../../assets/imgs_m/btn/btn_rig.png') no-repeat center !important;
        background-size: 100% 100% !important;
        transition: all 0.9s;
        margin-top: 0.4rem;
        border: none !important;

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

    .mar20 {
        margin-top: 0.38rem !important;
        text-align: center !important;
    }

    .register {
        text-align: left;
        margin: 0.2rem 0 !important;

        >>> .el-radio__label {
            color: #4b4b4b;
            font-size: 0.3rem;

            a {
                font-size: 0.3rem;
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
        width: 100%;
        height: 100%;
        text-align: center;
        color: #4b4b4b;

        .form {
            .con {
                width: 90%;
                margin: 0 auto;
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
            font-size: 0.3rem;
            color: #4b4b4b;
            border-bottom: 2px solid #fcc505;

            &::before {
                content: '';
                position: absolute;
                width: 0.27rem;
                height: 0.27rem;
                top: 50%;
                left: 50%;
                margin-left: -0.93rem;
                margin-top: -0.22rem;
                background: url('../../../assets/imgs_m/hms-icon.png') no-repeat center;
                background-size: 3rem 3rem;
                background-position: -2.73rem -1.92rem;
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
            margin: 0 auto;
            padding: 0 0.1rem;
            margin-top: 0.15rem;

            .hms_account, .hms_password {
                position: relative;
                width: 87%;
                text-align: left;
                color: #4b4b4b;
                font-size: 0.3rem;
                text-indent: 0.3rem;
            }

            .hms_account {
                &::before {
                    content: '';
                    position: absolute;
                    width: 0.2rem;
                    height: 0.2rem;
                    top: 50%;
                    left: 0;
                    margin-top: -0.09rem;
                    background: url('../../../assets/imgs_m/hms-icon.png') no-repeat center;
                    background-size: 3rem 3rem;
                    background-position: -2.79rem -1.2rem;
                }
            }

            .hms_password {
                &::before {
                    content: '';
                    position: absolute;
                    width: 0.22rem;
                    height: 0.22rem;
                    top: 50%;
                    left: 0;
                    margin-top: -0.09rem;
                    background: url('../../../assets/imgs_m/hms-icon.png') no-repeat center;
                    background-size: 3rem 3rem;
                    background-position: -2.78rem -1.42rem;
                }
            }

            .hms_email {
                &::before {
                    background-position: -2.78rem -1.71rem;
                }
            }

            .hms_after {
                font-size: 0.3rem;
            }

            dd {
                position: relative;
                margin-top: 0.2rem;
            }

            .el-input__inner {
                text-indent: 0.47rem;
                text-align: left;
            }

            .el-input {
                display: inherit;
            }
        }
    }
}
</style>