<template>
    <div class="wrapper_mebmer">
        <!-- <h2 class="animated fadeInLeft">會員中心</h2> -->
        <h2 class="storeValue animated fadeInLeft" v-if="isLoginStore">儲值中心</h2>
        <!-- <span class="animated fadeInLeft" v-else-if="isLoginCustomer"></span> -->
        <h2 class="customer animated fadeInLeft" v-else-if="isLoginCustomer">客服中心</h2>
        <span class="animated fadeInLeft" v-else></span>

        <div class="sub_login_wrapper_pc login fl">
            <div class="login_box login_in animated" :class="{bounceOut:isAni}">
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
                                                <!-- <em></em> -->
                                                <router-link
                                                    to="/memberCenter"
                                                    @click.native="toForgetPassword()"
                                                >忘記密碼</router-link>
                                                <!-- <em></em> -->
                                                <router-link
                                                    :to="'/memberCenter/'+this.rid"
                                                    @click.native="toRegisterLink"
                                                >註冊帳號</router-link>
                                                <!-- <router-link :to="{path:'/memberCenter', query: {rid:1}}">註冊帳號</router-link> -->
                                                <!-- <router-link :to="{name:'memberCenter', params: {id:1}}" @click.native="toRegisterLink">註冊帳號</router-link> -->
                                                <!-- <a href="/memberCenter" @click="toRegisterLink">註冊帳號</a> -->
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
            rid: 1,
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
    computed: {
        isLoginStore: function () {
            return this.$store.state.isLoginStore;
        },
        isLoginCustomer: function () {
            return this.$store.state.isLoginCustomer;
        },
    },
    mounted() {
        this.ruleForm.userName = "";
        this.ruleForm.passWord = "";
    },
    methods: {
        thirdLoginDialog: function(type) {
            // alert('type');
            this.$emit('thirdLoginDialog',type);
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
                    obj.$notify({
                        title: "成功",
                        message: data.message,
                        type: "success",
                    });
                    let token = data.data.bear_token;
                    let userInfo = data.data.user_info;
                    obj.$store.commit("setToken", token);
                    obj.$store.commit("setUserInfo", userInfo);
                    localStorage.setItem("token", token);
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                    obj.options.isHmsLogin = false;
                    obj.ruleForm.userName = "";
                    obj.ruleForm.passWord = "";
                    obj.$bus.emit("sub_loginSuccess", false);
                } else {
                    obj.options.isLoading = false;
                    obj.ruleForm.userName = "";
                    obj.ruleForm.passWord = "";
                    obj.options.isHmsLogin = true;
                    obj.$notify.error({
                        title: "錯誤",
                        message: data.message,
                    });
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
        toRegisterLink: function () {
            // setTimeout(() => {
            //     this.$bus.emit("toRegisterLink", 1);
            // })
            this.$emit("toRegisterLink", 1);
        },
        toForgetPassword: function () {
            // 没有通过点击事件，直接触发，那么需要再触发$emit的时候使用异步的方式来调用，原因是由于on先于emit执行了，所以通过异步的方式来改变过来。
            setTimeout(() => {
                this.$bus.emit("toForgetPassword", 2);
            }, 200);
        }
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

.login >>> .userName .el-input__inner, .login >>> .passWord .el-input__inner {
    width: 266px !important;
    height: 38px !important;
    background: #fff !important;
    font-size: 16.67px !important;
    color: #756e6e !important;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border-radius: inherit;
    text-align: center;
}

.login >>> .el-input__inner {
    text-indent: inherit;
}

.login >>> .el-input__inner:-webkit-autofill {
    background-color: #fff !important;
    -webkit-transition-delay: 9999s;
    -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
    box-shadow: 2px 0 2px 0 rgba(3, 3, 3, 0.35) inset, 0 2px 2px 0 rgba(3, 3, 3, 0.35) inset, 0 -2px 2px 0 rgba(3, 3, 3, 0.35) inset, -2px 0 2px 0 rgba(3, 3, 3, 0.35) inset !important;
}

.login >>> .el-input__inner:-internal-autofill-selected {
    background-color: #fff !important;
}

.login >>> .el-form-item__error {
    color: #F56C6C;
    top: 98%;
    left: 2px;
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

        &.storeValue {
            &::before {
                content: '';
                position: absolute;
                width: 37px;
                height: 44px;
                top: 50%;
                left: 200px;
                margin-top: -18px;
                background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                background-size: 300px 300px;
                background-position: -261px -90px;
            }
        }

        &.customer {
            &::before {
                content: '';
                position: absolute;
                width: 36px;
                height: 41px;
                top: 50%;
                left: 200px;
                margin-top: -18px;
                background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                background-size: 300px 300px;
                background-position: -205px -91px;
            }
        }
    }
}

.sub_login_wrapper_pc {
    position: absolute;
    width: 621px;
    height: 546px;
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
        background: url('../../../assets/imgs/btn/btn_login.png') no-repeat center !important;
        background-size: 100% 100% !important;
        transition: all 0.9s;

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
        margin: 10px 0;

        a {
            font-size: 24.51px;
            color: #4b4b4b;

            &:hover {
                color: #fcc916;
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
            background: #4b4b4b;
            margin-right: 8px;
        }
    }

    .login_box {
        position: absolute;
        width: 290px;
        height: 500px;
        text-align: center;
        color: #4b4b4b;
        left: 50%;
        top: 50%;
        margin-top: -250px;
        margin-left: -145px;

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
                background-position: -264px -253px;
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
                color: #4b4b4b;
                font-size: 26px;
                padding-left: 26px;
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
                margin-top: 15px;

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

            .hms_after {
                font-size: 20.83px;
            }

            dd {
                position: relative;
                margin-top: 10px;
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