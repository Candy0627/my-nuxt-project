<template>
    <div class="login_wrapper_pc login fl">
        <div class="login_box login_in" :class="{bounceOut:isAni}" v-if="isHmsLogin">
            <form class="form">
                <dl>
                    <span class="logo">
                        會員中心
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

                                    <el-form-item prop="passWord">
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
                                            <router-link
                                                to="/memberCenter"
                                                @click.native="toForgetPassword()"
                                            >忘記密碼</router-link>
                                            <router-link
                                                to="/memberCenter"
                                                @click.native="toRegister(1)"
                                            >註冊帳號</router-link>
                                            <!-- <a href="javascript:;">註冊帳號</a> -->
                                        </dd>
                                    </el-form-item>

                                    <el-form-item>
                                        <dd>
                                            <el-button
                                                type="primary"
                                                class="btn_login"
                                                @click="submitForm('ruleForm')"
                                            >登 入</el-button>
                                        </dd>
                                    </el-form-item>
                                    <el-form-item>
                                        <!-- <div id="appleid-signin" data-color="black" data-border="true" data-type="sign in">我是官方的苹果登录</div> -->
                                        <dd class="thirdLogin">
                                            <a
                                                href="javascript:;"
                                                @click="thirdLoginDialog('facebook')"
                                            ></a>
                                            <a
                                                href="javascript:;"
                                                @click="thirdLoginDialog('google')"
                                            ></a>
                                            <a 
                                                href="javascript:;"
                                                @click="thirdLoginDialog('apple')"
                                            >
                                            </a>
                                        </dd>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </dl>
            </form>
        </div>
        <div class="login_box login_in" :class="{bounceOut:isAni}" v-else>
            <form class="form">
                <dl>
                    <span class="logo pic_logo">
                        <span class="pic">
                            <img
                                :src="this.$store.state.userInfo.head_img || defaultHead"
                                alt
                                width="100%"
                            />
                        </span>
                    </span>
                    <div class="sys_name">
                        <span>{{this.$store.state.userInfo.account}}</span>
                        <router-link to="/" @click.native="loginOut">登出</router-link>
                    </div>
                </dl>
            </form>
        </div>
    </div>
</template>

<script>
import "@/assets/styles/login.css";

export default {
    name: "UserLogin",
    props: {
        options: Object,
    },
    inject: ["reload"],
    data: function () {
        return {
            isAni: false,
            account: "",
            passWord: "",
            isRemember: "",
            checked: true,
            account: "",
            isFbDialog: false,
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
                        message: "用戶名長度在6-18位字符",
                        trigger: "blur",
                    },
                ],
            },
            defaultHead: "../../imgs/head.png",
        };
    },
    created() {
        let self = this;
        this.$bus.on("registerSuccess", function (val) {
            // self.options.isHmsLogin = val;
            self.$store.commit('setIsHmsLogin', val);
        });
        this.$bus.on("homeLoginShow", function (val) {
            // self.options.isHmsLogin = val;
            self.$store.commit('setIsHmsLogin', val);
        });
    },
    computed: {
        isHmsLogin: function () {
            return this.$store.state.isHmsLogin;
        }
    },
    mounted() {
        this.ruleForm.userName = "";
        this.ruleForm.passWord = "";
        if (localStorage.getItem("token")) {
            this.$store.commit('setIsHmsLogin', false);
        } else {
            this.$store.commit('setIsHmsLogin', true);
        }
    },
    methods: {
        thirdLoginDialog: function (type) {
            this.$emit("thirdLoginDialog", type);
        },
        toRegister: function (val) {
            setTimeout(() => {
                this.$bus.emit("toRegister", val);
            }, 200);
        },
        toForgetPassword: function () {
            // 没有通过点击事件，直接触发，那么需要再触发$emit的时候使用异步的方式来调用，原因是由于on先于emit执行了，所以通过异步的方式来改变过来。
            setTimeout(() => {
                this.$bus.emit("toForgetPassword", 2);
            }, 200);
        },
        morefunLogin: function (userName, passWord) {
            this.options.isLoading = true;
            // console.log("登录1进来了");
            let datas = {
                account: userName,
                password: passWord,
            };
            this.postHttp(this, datas, "/front/login", function (obj, data) {
                if (data) {
                    if (data.status == "2000") {
                        obj.account = data.data.user_info.account;
                        let token = data.data.bear_token;
                        let userInfo = data.data.user_info;
                        obj.$store.commit("setToken", token);
                        obj.$store.commit("setUserInfo", userInfo);
                        localStorage.setItem("token", token);
                        localStorage.setItem(
                            "userInfo",
                            JSON.stringify(userInfo)
                        );
                        obj.$store.commit('setIsHmsLogin', false);
                        obj.options.isLoading = false;
                        obj.$notify({
                            title: "成功",
                            message: data.message,
                            type: "success",
                        });
                        obj.ruleForm.userName = "";
                        obj.ruleForm.passWord = "";
                        obj.$bus.emit("loginSuccess", 0);
                        
                    } else {
                        obj.options.isLoading = false;
                        obj.ruleForm.userName = "";
                        obj.ruleForm.passWord = "";
                        obj.$store.commit('setIsHmsLogin', true);
                        obj.$notify.error({
                            title: "錯誤",
                            message: data.message,
                        });
                    }
                } else {
                    obj.$message({
                        message: data.message,
                    });
                    obj.options.isLoading = false;
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
        loginOut: function () {
            this.options.isLoading = true;
            this.$notify({
                title: "成功",
                message: "已登出",
                type: "success",
            });
            this.options.isLoading = false;
            this.$store.commit('setIsHmsLogin', true);
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            this.$store.commit("setToken", '');
            this.$store.commit("setUserInfo", {});
            this.$emit("LoginRegisterShow", true);
            this.$router.push({ path: "/pc/home" });
        },
        dateToMs: function (date) {
            let result = new Date(date).getTime();
            return result;
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

.login >>> .el-form-item__error {
    color: #F56C6C;
    top: 97%;
    left: 4px;
    font-size: 10px;
}

.login >>> .el-input__inner:-webkit-autofill {
    background-color: #fff !important;
    background: #fff !important;
    box-shadow: 2px 0 2px 0 rgba(3, 3, 3, 0.35) inset, 0 2px 2px 0 rgba(3, 3, 3, 0.35) inset, 0 -2px 2px 0 rgba(3, 3, 3, 0.35) inset, -2px 0 2px 0 rgba(3, 3, 3, 0.35) inset !important;
}

.login >>> .userName .el-input__inner, .login >>> .passWord .el-input__inner {
    width: 264px;
    height: 36px;
    border-radius: inherit;
    background: url('../../../assets/imgs/inp_bg.jpg');
    background-size: 100% 100%;
}

.login >>> .el-input__inner:-webkit-autofill {
    background-color: transparent;
}

.login_wrapper_pc {
    position: relative;
    width: 290px;
    height: 447px;
    background: #ffe900;

    .btn_login {
        font-family: '微软雅黑';
    }

    .btn_login, .el-form-item {
        margin-bottom: 0 !important;
    }

    .btn_login {
        color: #434341 !important;
        font-size: 26px !important;
        width: 155px !important;
        height: 50px !important;
        margin-top: 2px;
        background: url('../../../assets/imgs/btn/btn_login.png') no-repeat center !important;
        background-size: 100% 100% !important;
        transition: all 0.9s;
        text-indent: -9999px;

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
        margin: 10px 0 5px;

        a {
            font-size: 22px;
            color: #ffffff;

            &:hover {
                color: #fcc916;
                text-decoration: underline;
            }

            &:nth-child(2) {
                margin-left: 22px;
            }
        }

        .el-checkbox__label {
            color: #fff;
        }

        em {
            display: inline-block;
            width: 15.29px;
            height: 15.29px;
            background: #fff;
            margin-right: 8px;
        }
    }

    .login_box {
        width: 294px;
        height: 447px;
        background: rgba(122, 122, 120, 0.85);
        text-align: center;

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
            height: 50px;
            margin-top: 17px;
            font-size: 26px;
            color: #ffffff;
            border-bottom: 2px solid #fcc505;

            &::before {
                content: '';
                position: absolute;
                width: 25px;
                height: 37px;
                top: 50%;
                left: 52px;
                margin-top: -26px;
                background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                background-size: 300px 300px;
                background-position: -2px 0;
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
                background: #ffffff;
                border-radius: 2.5px;
            }
        }

        .pic {
            display: inline-block;
            width: 42px;
            height: 50px;
        }

        .pic_logo {
            height: 56px;

            &::before {
                content: '';
                background: none;
            }
        }

        .sys_name {
            margin-top: 10px;

            span {
                color: #fff;
                font-size: 18px;
            }

            a {
                margin-left: 6px;
                color: #fff;
                font-size: 10px;

                &:hover {
                    text-decoration: underline;
                }
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

            .thirdLogin {
                position: relative;
                width: 229px;
                height: 63px;
                margin: 0 auto;
                /**a {
                    content: '';
                    position: absolute;
                    width: 64px;
                    height: 64px;
                    top: 50%;
                    margin-top: -15px;
                    background: url('../../../assets/imgs/btn-download.png') no-repeat center;
                    background-size: 147px 63px;
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
                        background-position: -83px 0;
                    }
                }**/
                a {
                    content: '';
                    position: absolute;
                    width: 64px;
                    height: 64px;
                    top: 50%;
                    margin-top: -15px;
                    background: url('../../../assets/imgs/btn_third_login.png') no-repeat center;
                    background-size: 229px 63px;
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
                        margin-left:-32px;
                        background-position: -84px 0;
                    }

                    &:nth-child(3) {
                        right: 0;
                        background-position: -166px 0;
                    }
                }
            }

            .hms_account, .hms_password {
                position: relative;
                width: 100%;
                text-align: left;
                color: #fff;
                font-size: 26px;
                padding-left: 26px;
            }

            .hms_account {
                margin-top: 10px;

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
                    background-position: 0 -192px;
                }
            }

            .hms_password {
                margin-top: 10px;

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
                    background-position: 0 -224px;
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