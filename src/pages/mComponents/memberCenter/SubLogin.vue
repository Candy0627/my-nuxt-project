<template>
    <div class="wrapper_mebmer mp" v-cloak>
        <!-- <h2 class="animated fadeInLeft">會員中心</h2> -->
        <div class="sub_login_wrapper login">
            <div class="login_box animated" :class="{bounceOut:isAni}">
                <form class="form">
                    <dl>
                        <span class="logo">
                            登入帳號
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

                                        <el-form-item prop="passWord" class="martmm">
                                            <div>
                                                <dd class="hms_password">
                                                    密碼
                                                    <span class="hms_after">Password</span>
                                                </dd>
                                                <dd class="passWord">
                                                    <el-input
                                                        type="password"
                                                        placeholder="密碼限6-18字元"
                                                        class="inp"
                                                        v-model="ruleForm.passWord"
                                                        @keyup.enter.native="submitForm('ruleForm')"
                                                    ></el-input>
                                                </dd>
                                            </div>
                                        </el-form-item>

                                        <div class="clear"></div>

                                        <el-form-item>
                                            <dd class="register">
                                                <em></em>
                                                <router-link
                                                    to="/mobile/memberCenter"
                                                    @click.native="toForgetPassword()"
                                                >忘記密碼</router-link>
                                                <em class="marl_em"></em>
                                                <router-link
                                                    to="/mobile/memberCenter"
                                                    @click.native="toRegister(1)"
                                                >註冊帳號</router-link>
                                                <!-- <em></em>
                                                <a href="javascript:;" @click="toRegisterLink">註冊帳號</a>-->
                                            </dd>
                                        </el-form-item>

                                        <el-form-item>
                                            <dd>
                                                <el-button
                                                    type="primary"
                                                    class="btn_login mart27"
                                                    @click="submitForm('ruleForm')"
                                                >登 入</el-button>
                                            </dd>
                                        </el-form-item>

                                        <el-form-item>
                                            <dd class="thirdLogin">
                                                <a
                                                    href="javascript:;"
                                                    @click="handleClickThirdLogin('facebook')"
                                                ></a>
                                                <a
                                                    href="javascript:;"
                                                    @click="handleClickThirdLogin('google')"
                                                ></a>
                                                <a
                                                    href="javascript:;"
                                                    @click="handleClickThirdLogin('apple')"
                                                ></a>
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
        <!-- <router-link to="/mobile/memberCenter" class="download_form" @click.native="login_download()">表单下载</router-link> -->
    </div>
</template>

<script>
import "@/assets/styles/login.css";
export default {
    name: "SubLogin",
    props: {
        options: Object,
    },
    inject: ["reload"], //注入reload方法
    data: function () {
        return {
            isAni: false,
            account: "",
            passWord: "",
            isRemember: "",
            checked: true,
            optionsAni: {
                isHmsLogin: true,
            },
            ruleForm: {
                userName: "",
                passWord: "",
            },
            rules: {
                userName: [
                    { required: true, message: "請輸入帳號", trigger: "blur" }
                ],
                passWord: [
                    { required: true, message: "請輸入密碼", trigger: "blur" },
                    {
                        min: 6,
                        max: 18,
                        message: "用户名长度在6-18位字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    mounted() {
        this.ruleForm.userName = "";
        this.ruleForm.passWord = "";
        setTimeout(() => {
            this.$bus.emit("downloadSend", false);
        }, 200);
    },
    methods: {
        handleClickThirdLogin: function (type) {
            this.$emit("handleClickThirdLogin", type);
        },
        morefunLogin: function (userName, passWord) {
            this.options.isLoading = true;
            let datas = {
                account: userName,
                password: passWord,
            };
            this.postHttp(this, datas, "/front/login", function (obj, data) {
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    obj.$toast(data.message);
                    obj.$store.commit("setIsLoginIn", false);
                    obj.options.isloginNav = false;
                    let token = data.data.bear_token;
                    let userInfo = data.data.user_info;
                    obj.$store.commit("setToken", token);
                    obj.$store.commit("setUserInfo", userInfo);
                    localStorage.setItem("token", token);
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                    obj.ruleForm.userName = "";
                    obj.ruleForm.passWord = "";
                    obj.options.isDownload = true;
                    obj.options.widths = "78%";
                    obj.$bus.emit("sub_loginSuccess", false);
                    obj.$emit("loadStoreUserGamesList");
                    obj.$emit("loadCustomerUserGamesList");
                } else {
                    obj.options.isLoading = false;
                    obj.ruleForm.userName = "";
                    obj.ruleForm.passWord = "";
                    obj.options.isHmsLogin = true;
                    obj.$toast(data.message);
                }
            });
        },
        submitForm: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.morefunLogin(
                        this.ruleForm.userName,
                        this.ruleForm.passWord
                    );
                } else {
                    console.log("錯誤的提交 !!");
                    return false;
                }
            });
        },
        toForgetPassword: function () {
            // 没有通过点击事件，直接触发，那么需要再触发$emit的时候使用异步的方式来调用，原因是由于on先于emit执行了，所以通过异步的方式来改变过来。
            setTimeout(() => {
                this.$bus.emit("toForgetPassword", 2);
            }, 3);
        },
        toRegister: function () {
            setTimeout(() => {
                this.$bus.emit("toRegisterLink", 1);
            }, 3);
            // this.$emit("toRegisterLink", 1);
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

.download_form {
    display: inline-block;
    width: 1.68rem;
    height: 0.55rem;
    text-indent: -9999px;
    background: url('../../../assets/imgs_m/btn//btn_bdxz.png') no-repeat center !important;
    background-size: 100% 100% !important;
}

.login >>> .el-form-item__content {
    line-height: inherit !important;
}

.login >>> .martmm {
    margin-top: 0.3rem;
}

.login >>> .userName .el-input__inner, .login >>> .passWord .el-input__inner {
    width: 4.03rem !important;
    height: 0.46rem !important;
    background: #fff !important;
    font-size: 0.22rem !important;
    color: #756e6e !important;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border-radius: inherit;
    text-align: center;
}

.login >>> .el-input__inner {
    text-indent: inherit;
}

.login >>> .el-form-item__error {
    color: #F56C6C;
    top: 98%;
    left: 2px;
    font-size: 0.15rem;
}

.wrapper_mebmer {
    h2 {
        position: relative;
        display: block;
        width: 100%;
        text-indent: 0.3rem;
        font-size: 0.4702rem;
        color: #4b4b4b;
        font-weight: 500;
        text-indent: 0.55rem;
        margin-bottom: 0.4rem;
        /* *&::before {
            content: '';
            position: absolute;
            width: 0.28rem;
            height: 0.42rem;
            top: 50%;
            left: 2.08rem;
            margin-top: -0.18rem;
            background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
            background-size: 3rem 3rem;
            background-position: -2.18rem 0;
        }* */
    }
}

.sub_login_wrapper {
    margin: 0 auto;
    margin-bottom: .16rem;
    height: 6.68rem;
    border: 2px solid #c0bfbf;
    box-sizing: border-box;
    border-radius: 40px;

    .btn_login, .el-form-item {
        margin-bottom: 0 !important;
    }

    .btn_login {
        color: #434341 !important;
        font-size: 0.26rem !important;
        width: 1.68rem !important;
        height: 0.55rem !important;
        margin-bottom: 0.1rem !important;
        text-indent: -9999px;
        background: url('../../../assets/imgs_m/btn/btn_login.png') no-repeat center !important;
        background-size: 100% 100% !important;
        transition: all 0.9s;
        border: none;

        &:hover {
            animation: fadeIn 0.7s ease-in-out;
        }
    }

    .forgetPassword {
        input[name='checkbox'] {
            margin-top: 0.12rem !important;
            margin-right: 0.09rem !important;
        }
    }

    .register {
        text-align: center;
        margin-top: 0.36rem !important;
        margin-bottom: 0.2rem;

        a {
            font-size: 0.2451rem;
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
            width: 0.1529rem;
            height: 0.1529rem;
            background: #4b4b4b;
            margin-right: 0.08rem;
        }

        .marl_em {
            margin-left: 0.23rem;
        }
    }

    .login_box {
        text-align: center;
        color: #4b4b4b;
        padding: 0.4rem 0;

        .form {
            dl {
                overflow: inherit;
            }
        }

        .login_close {
            position: absolute;
            width: 0.89rem;
            height: 0.82rem;
            right: 0;
            top: 0;
            border-top-right-radius: 30%;
            background: url('../../../assets/imgs/close.png') no-repeat center;
            background-size: 100% 100%;
            cursor: pointer;

            i {
                display: inline-block;
                width: 0.3167rem;
                height: 0.565rem;
                position: absolute;
                right: 0.09rem;
                top: 0.18rem;
                background: #ffffff;
                border-radius: 2.5px;
            }
        }

        .logo {
            position: relative;
            display: inline-block;
            width: 4rem;
            margin-top: 0.17rem;
            padding-bottom: 0.1rem;
            font-size: 0.3rem;
            color: #4b4b4b;
            padding-bottom: 0.34rem;
            border-bottom: 2px solid #fcc505;

            &::before {
                content: '';
                position: absolute;
                width: 0.26rem;
                height: 0.26rem;
                top: 50%;
                left: 1.06rem;
                margin-top: -0.29rem;
                background: url('../../../assets/imgs_m/hms-icon.png') no-repeat center;
                background-size: 3rem 3rem;
                background-position: -2.72rem -0.35rem;
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
            width: 4rem;
            margin: 0 auto;

            /**.thirdLogin {
                position: relative;
                width: 1.59rem;
                height: 0.68rem;
                margin: 0 auto;

                a {
                    content: '';
                    position: absolute;
                    width: 0.69rem;
                    height: 0.69rem;
                    top: 50%;
                    margin-top: -0.15rem;
                    background: url('../../../assets/imgs_m/btn-download.png') no-repeat center;
                    background-size: 1.59rem 0.68rem;
                    opacity: 0.9;

                    &:hover {
                        opacity: 1;
                    }

                    &:nth-child(1) {
                        left: 0;
                        background-position: 0 0;
                    }

                    &:nth-child(2) {
                        right: 0;
                        background-position: -0.9rem 0;
                    }
                }
            }*/
            .thirdLogin {
                position: relative;
                width: 2.29rem;
                height: 0.63rem;
                margin: 0 auto;

                a {
                    content: '';
                    position: absolute;
                    width: .69rem;
                    height: .69rem;
                    top: 50%;
                    margin-top: -0.15rem;
                    background: url('../../../assets/imgs_m/btn_third_login.png') no-repeat center;
                    background-size: 2.29rem 0.63rem;
                    opacity: 1;
                    &:hover {
                        opacity: .85;
                    }

                    &:nth-child(1) {
                        left: 0;
                        background-position: 0 0;
                    }

                    &:nth-child(2) {
                        left: 50%;
                        margin-left:-.345rem;
                        background-position: -0.84rem 0;
                    }

                    &:nth-child(3) {
                        right: 0;
                        background-position: -1.66rem 0;
                    }
                }
            }

            .hms_account, .hms_password {
                position: relative;
                width: 100%;
                text-align: left;
                color: #4b4b4b;
                font-size: 0.3rem;
                text-indent: 0.3rem;
                margin-top: 0.21rem;
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
                    background-position: -2.8rem -0.65rem;
                }
            }

            .hms_password {
                margin-top: 0.15rem;

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
                    background-position: -2.78rem -0.9rem;
                }
            }

            .hms_after {
                font-size: 0.2244rem;
                color: #4b4b4b;
            }

            dd {
                position: relative;
                margin-top: 0.11rem;
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