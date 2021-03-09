<template>
    <div class="wrapper_mebmer">
        <!-- <h2 class="animated fadeInLeft">會員中心</h2> -->

        <div class="sub_login_wrapper login fl recordStore">
            <div class="login_box login_in" :class="{bounceOut:isAni}">
                <form class="form">
                    <dl>
                        <span class="logo">個人資料</span>
                        <div class="con">
                            <div>
                                <el-form
                                    :model="ruleForm"
                                    :rules="rules"
                                    ref="ruleForm"
                                    label-width="100px"
                                    class="demo-ruleForm"
                                >
                                    <el-form-item label="姓名" prop="username">
                                        <el-input v-model="ruleForm.username" placeholder="請輸入姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="性別" prop="sex" class="sex">
                                        <el-radio-group v-model="ruleForm.sex">
                                            <el-radio :label="1">男</el-radio>
                                            <el-radio :label="2">女</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="生日" prop="birth_date">
                                        <div class="block">
                                            <el-date-picker
                                                v-model="birth_date"
                                                type="date"
                                                placeholder="選擇日期 :"
                                            ></el-date-picker>
                                            <!-- 不为空置灰 -->
                                            <!-- <el-date-picker class="1" v-model="ruleForm.birth_date" type="date" placeholder="选择日期 :" :disabled="birth_value"></el-date-picker> -->
                                            <!-- 为空的是白的 -->
                                            <!-- <el-date-picker class="2" v-model="ruleForm.birth_date" type="date" placeholder="选择日期2 :" id="birth_date" @blur="handleChange()" :disabled="birth_value" v-else ></el-date-picker> -->
                                        </div>
                                        <!-- <span class="tips">· 生日填寫後不可修改</span> -->
                                    </el-form-item>
                                    <el-form-item label="Email" prop="email">
                                        <el-input v-model="ruleForm.email" placeholder="請輸入電子郵箱"></el-input>
                                    </el-form-item>
                                    <el-form-item label="行動電話" prop="phone">
                                        <el-input v-model="ruleForm.phone" placeholder="請輸入純數字電話號碼"></el-input>
                                    </el-form-item>
                                    <el-form-item label="地區" prop="area">
                                        <el-select v-model="ruleForm.area" placeholder="請選擇地區">
                                            <el-option label="臺灣" value="taiwan"></el-option>
                                            <el-option label="香港" value="xianggang"></el-option>
                                            <el-option label="澳門" value="aomen"></el-option>
                                            <el-option label="中國大陸" value="zhongguodalu"></el-option>
                                            <el-option label="韓國" value="hanguo"></el-option>
                                            <el-option label="日本" value="riben"></el-option>
                                            <el-option label="新加坡" value="xinjiapo"></el-option>
                                            <el-option label="馬來西亞" value="malaixiya"></el-option>
                                            <el-option label="美國" value="meiguo"></el-option>
                                            <el-option label="其他" value="qita"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="地址" prop="addr_details">
                                        <el-input
                                            v-model="ruleForm.addr_details"
                                            placeholder="請輸入地址"
                                        ></el-input>
                                    </el-form-item>

                                    <el-form-item>
                                        <dd>
                                            <el-button
                                                type="primary"
                                                class="btn_login btn_save"
                                                @click="submitForm('ruleForm')"
                                            >保存資料</el-button>
                                            <el-button
                                                type="primary"
                                                class="btn_login btn_out"
                                                @click="loginOut"
                                            >登 出</el-button>
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
// import Vue from 'vue'
import defined from "@/assets/js/defined.js";

import "@/assets/styles/login.css";
export default {
    name: "SubMyprofile",
    inject: ["reload"], //注入reload方法
    data: function () {
        var checkPhone = (rule, value, callback) => {
            const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
            // if (!value) {
            //     return callback(new Error("電話號碼不能為空！"));
            // }
            setTimeout(() => {
                // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
                // 所以在前面加了一个+实现隐式转换

                if (!Number.isInteger(+value)) {
                    callback(new Error("請輸入數字值"));
                } else {
                    // if (phoneReg.test(value)) {
                    //     callback();
                    // } else {
                    //     callback(new Error("电话号码格式不正确"));
                    // }
                }
            }, 100);
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
            },
            rules: {},
        };
    },
    watch: {
        defined: function () {
            return defined;
        },
    },
    computed: {
        ruleForm: function () {
            let birth_date = this.dateToMs(
                this.$store.state.userInfo.birth_date
            );
            this.birth_date = birth_date;
            return this.$store.state.userInfo;
        },
    },
    created() {
        // let self = this;
        // this.$bus.on('loginOut', function() {
        //     console.log("tuichu22");
        //     self.loginOut();
        // });
    },
    mounted() {},
    methods: {
        toTermsservice: function (val) {
            this.$bus.emit("toTermsservice", val);
        },
        submitForm: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.options.isLoading = true;
                    let birthday = this.dateToMs(this.birth_date);
                    let datas = {
                        username: this.ruleForm.username,
                        sex: this.ruleForm.sex,
                        birth_date: birthday,
                        email: this.ruleForm.email,
                        phone: this.ruleForm.phone,
                        area: this.ruleForm.area,
                        addr_details: this.ruleForm.addr_details,
                    };
                    this.postHttp(this, datas, "/front/save/info", function (
                        obj,
                        data
                    ) {
                        if (data.status == "2000") {
                            // obj.$notify({
                            //     title: "成功",
                            //     message: "保存成功！",
                            //     type: "success"
                            // });
                            obj.options.isLoading = false;
                            obj.$message(data.message);
                            var userInfoObj = JSON.parse(
                                localStorage.getItem("userInfo")
                            );
                            userInfoObj.username = obj.ruleForm.username;
                            userInfoObj.sex = obj.ruleForm.sex;
                            userInfoObj.birth_date = birthday;
                            userInfoObj.email = obj.ruleForm.email;
                            userInfoObj.phone = obj.ruleForm.phone;
                            userInfoObj.area = obj.ruleForm.area;
                            userInfoObj.addr_details =
                                obj.ruleForm.addr_details;
                            localStorage["userInfo"] = JSON.stringify(
                                userInfoObj
                            ); //更新登录状态
                            obj.$store.commit("setUserInfo", userInfoObj);

                            if (birthday) {
                                obj.typeBirth = true;
                                obj.ruleForm.birth_date = birthday;
                                // obj.disabled = true;
                            }

                            obj.$bus.emit("reloadInfo");
                        } else {
                            obj.$message(data.message);
                        }
                    });
                } else {
                    console.log("error submit!!");
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
            
            this.$emit("LoginRegisterShow", true);
            this.$bus.emit("homeLoginShow", true);
            
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            this.$store.commit("setToken", '');
            this.$store.commit("setUserInfo", {});

            this.$router.push({ path: "/pc/home" });
        },
        dateToMs: function (date) {
            let result = new Date(date).getTime();
            return result;
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
    font-size: 22px;
    color: #4b4b4b;
    padding: 0;
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
    position: absolute;
    width: 621px;
    height: 680px;
    border: 3px solid #898888;
    box-sizing: border-box;

    .btn_login, .el-form-item {
        margin-bottom: 15px !important;
    }

    .btn_login {
        color: #434341 !important;
        font-size: 26px !important;
        width: 155px !important;
        height: 50px !important;
        margin-top: 2px;
        text-indent: -9999px;
        transition: all 0.9s;
        margin-top: 10px;

        &:hover {
            animation: fadeIn 0.7s ease-in-out;
        }
    }

    .btn_save {
        background: url('../../../assets/imgs/btn/btn_save_profile.png') no-repeat center !important;
        background-size: 100% 100% !important;
    }

    .btn_out {
        background: url('../../../assets/imgs/btn/btn_login_out.png') no-repeat center !important;
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
                width: 460px;

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
                background-position: -40px -253px;
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
                text-indent: .53rem;
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

            .el-input {
                display: inherit;
            }
        }
    }
}
</style>