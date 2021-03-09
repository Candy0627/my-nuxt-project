<template>
    <div class="wrapper_mebmer">
        <!-- <h2 class="animated fadeInLeft">會員中心</h2> -->
        <div class="sub_login_wrapper login fl recordStore rig_update">
            <div class="login_box login_in" :class="{bounceOut:isAni}">
                <form class="form">
                    <dl>
                        <span class="logo">修改密碼</span>
                        <div class="con">
                            <div>
                                <el-form
                                    :model="ruleForm"
                                    :rules="rules"
                                    ref="ruleForm"
                                    label-width="100px"
                                    class="demo-ruleForm"
                                >
                                    <el-form-item label="舊密碼" prop="pass">
                                        <el-input
                                            type="password"
                                            v-model="ruleForm.pass"
                                            placeholder="6-16個字元,英字母分大小寫"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="新密碼" prop="newPass">
                                        <el-input
                                            type="password"
                                            v-model="ruleForm.newPass"
                                            placeholder="6-16個字元,英字母分大小寫"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="確認密碼" prop="checkPass">
                                        <el-input
                                            type="password"
                                            v-model="ruleForm.checkPass"
                                            placeholder="與上面填寫的密碼相同"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <dd>
                                            <el-button
                                                type="primary"
                                                class="btn_login btn_complete"
                                                @click="submitForm('ruleForm')"
                                            >完成</el-button>
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
    name: "UpdatePassword",
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
            } else if (value !== this.ruleForm.newPass) {
                callback(new Error("兩次輸入的密碼不一致!"));
            } else {
                callback();
            }
        };
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
                pass: "",
                newPass: "",
                checkPass: "",
            },
            rules: {
                pass: [
                    {
                        required: true,
                        message: "請輸入舊密碼",
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
                newPass: [
                    {
                        required: true,
                        message: "請輸入新的密碼",
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
            },
        };
    },
    mounted() {},
    methods: {
        handleRegister: function () {
            this.options.isLoading = true;
            let datas = {
                password: this.ruleForm.pass,
                new_password: this.ruleForm.newPass,
                new_password_confirmation: this.ruleForm.checkPass,
            };
            this.postHttp(this, datas, "/front/change/password", function (
                obj,
                data
            ) {
                if (data) {
                    if (data.status == "2000") {
                        obj.options.isLoading = false;
                        obj.$notify({
                            title: "成功",
                            message: data.message,
                            type: "success",
                        });
                        obj.ruleForm.pass = "";
                        obj.ruleForm.newPass = "";
                        obj.ruleForm.checkPass = "";
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
    font-size: 25px;
    color: #4b4b4b;
    padding: 0;
    width: 116px !important;
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

.login >>> .el-input {
    display: inherit;
}

.login >>> .rig_update .el-form-item__error {
    top: 96% !important;
    left: 39px !important;
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

.hms_btn {
    width: 100%;
    text-align: center;
}

.border {
    margin-left: -47px;
}

.login >>> .el-input__inner {
    width: 264px !important;
    height: 36px !important;
    margin-top: 2px;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border: none !important;
}

.login >>> .rig .el-form-item__content {
    margin-left: 0 !important;
}

.login >>> .el-form-item__error {
    color: #F56C6C;
    top: 93%;
    left: 52px;
    font-size: 10px;
}

.register >>> .el-radio__inner {
    margin-top: -3px;
}

.sub_login_wrapper {
    position: absolute;
    width: 621px;
    height: 469px;
    border: 3px solid #898888;
    box-sizing: border-box;

    .btn_login, .el-form-item {
        margin-bottom: 15px !important;
        margin-top: 20px;
    }

    .btn_login {
        color: #434341 !important;
        font-size: 26px !important;
        width: 155px !important;
        height: 50px !important;
        margin-top: 2px;
        transition: all 0.9s;
        margin-top: 30px;
        text-indent: -9999px;

        &:hover {
            animation: fadeIn 0.7s ease-in-out;
        }
    }

    .btn_complete {
        background: url('../../../assets/imgs/btn/btn_complete.png') no-repeat center !important;
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
        width: 465px;
        height: 470px;
        text-align: center;
        color: #4b4b4b;
        left: 50%;
        top: 0;
        margin-left: -232.5px;

        .form {
            dl {
                overflow: inherit;
            }

            .con {
                width: 410px;

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
            width: 460px;
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
                background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                background-size: 300px 300px;
                background-position: -269px -186px;
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
                text-indent: 0.53rem;
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

            .el-input__inner {
                text-indent: 47px;
                text-align: left;
            }
        }
    }
}
</style>