<template>
    <div class="wrapper_mebmer mp">
        <div class="sub_login_wrapper login recordStore">
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
                                        <!-- <el-input v-model="ruleForm.username" :placeholder="defaultValue" :value="birth_date | formatDate" @click="openPicker()" readonly></el-input> -->
                                        <div class="birth el-input__inner" @click="openPicker()">
                                            <span v-if="birth_date">{{birth_date | formatDate}}</span>
                                            <span v-else>{{defaultValue}}</span>
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
                                        <div class="birth el-input__inner" @click="openPickerArea()">
                                            <span v-if="area">{{area}}</span>
                                            <span v-else>{{defaultValue_area}}</span>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="地址" prop="addr_details">
                                        <el-input
                                            v-model="ruleForm.addr_details"
                                            placeholder="請輸入地址"
                                        ></el-input>
                                    </el-form-item>

                                    <el-form-item class="btn_marl">
                                        <dd>
                                            <el-button
                                                type="primary"
                                                class="btn_login btn_save"
                                                @click="submitForm('ruleForm')"
                                            >保存資料</el-button>
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
import { formatDate } from "@/assets/js/date.js";
import "@/assets/styles/login.css";
export default {
    name: "SubMyprofile",
    props: {
        datePickerSelected: Number,
        datePickerSelected_area: String,
        areaSelected: String
    },
    inject: ["reload"],
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
            area:"",
            options: {
                isLoading: false,
            },
            rules: {},
            defaultValue:'請選擇生日',
            defaultValue_area:'請選擇地區'
        };
    },
    filters: {
        formatDate: function (time) {
            if (time) {
                var date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            }
        },
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
            
            if(this.datePickerSelected) {
                this.birth_date = this.datePickerSelected;
            } else {
                this.birth_date = birth_date;
            }

            let area = this.$store.state.userInfo.area;
            if(this.areaSelected) {
                this.area = this.areaSelected;
            } else {
         
                switch(area){
                    case "taiwan":
                        area = "台灣";
                        break;
                    case "xianggang":
                        area = "香港";
                        break;
                    case "aomen":
                        area = "澳門";
                        break;
                    case "zhongguodalu":
                        area = "中國大陸";
                        break;
                    case "hanguo":
                        area = "韓國";
                        break;
                    case "riben":
                        area = "日本";
                        break;
                    case "xinjiapo":
                        area = "新加坡";
                        break;
                    case "malaixiya":
                        area = "馬來西亞";
                        break;
                    case "meiguo":
                        area = "美國";
                        break;
                    case "qita":
                        area = "其他";
                        break;
                }
                this.area = area;
            }
            return this.$store.state.userInfo;
        },
    },
    created() {
    },
    mounted() {

    },
    methods: {
        openPicker: function() {
            this.$emit("openPicker");
        },
        openPickerArea: function() {
            this.$emit("openPickerArea");
        },
        toTermsservice: function (val) {
            this.$bus.emit("toTermsservice", val);
        },
        submitForm: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.options.isLoading = true;
                    // let birthday = this.dateToMs(this.birth_date);
                    let datas = {
                        username: this.ruleForm.username,
                        sex: this.ruleForm.sex,
                        birth_date: this.datePickerSelected,
                        email: this.ruleForm.email,
                        phone: this.ruleForm.phone,
                        area: this.areaSelected,
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
                            obj.$toast(data.message);
                            var userInfoObj = JSON.parse(
                                localStorage.getItem("userInfo")
                            );
                            
                            userInfoObj.username = obj.ruleForm.username;
                            userInfoObj.sex = obj.ruleForm.sex;
                            userInfoObj.birth_date =  obj.datePickerSelected;
                            userInfoObj.email = obj.ruleForm.email;
                            userInfoObj.phone = obj.ruleForm.phone;
                            userInfoObj.area = obj.areaSelected;
                            userInfoObj.addr_details = obj.ruleForm.addr_details;

                            
                            localStorage["userInfo"] = JSON.stringify(
                                userInfoObj
                            ); //更新登录状态

                            obj.$store.commit("setUserInfo", userInfoObj);

                            if (obj.datePickerSelected) {
                                obj.typeBirth = true;
                                obj.ruleForm.birth_date = obj.datePickerSelected;
                                // obj.disabled = true;
                            }

                            obj.$bus.emit("reloadInfo");
                        } else {
                            obj.$toast(data.message);
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
            this.$toast("已登出");
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            this.$emit("LoginRegisterShow", true);
            this.$bus.emit("homeLoginShow", true);
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

.login >>> .birth{
    position relative
}
.birth::after {
    content: '';
    position: absolute;
    width: .2rem;
    height: .17rem;
    top: 50%;
    right: .16rem;
    margin-top: -.085rem;
    background: url('../../../assets/imgs_m/hms-icon.png') no-repeat center;
    background-size: 3rem 3rem;
    background-position: 0 -1.82rem;
}

.login >>> .btn_marl .el-form-item__content{
    margin-left: 0;
}

.login >>> .btn_marl{
    margin-top: .4rem !important;
}

.login >>> .el-input__inner{
    width: 100% !important;
    height: 0.454rem !important;
    background: #fff !important;
    font-size: 0.2rem !important;
    color: #756e6e !important;
    background: url('../../../assets/imgs/inp_bg.jpg') no-repeat center !important;
    background-size: 100% 100% !important;
    border-radius: inherit;
    text-align: center;
}
.login >>> .el-select{
  width: 100% !important;  
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
}

.login >>> .el-radio__inner:hover {
    border-color: #fcc505;
}

.login >>> .el-radio-group {
    float: left;
    margin-top: 12px;
}

.hms_btn {
    width: 100%;
    text-align: center;
}

.border {
    margin-left: -47px;
}

.login >>> .el-input__inner {
    height: 0.4539rem;
    font-size: 0.265rem;
    border: 1px solid #a1a0a0;
}
.login >>> .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: inherit;
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
    width: 100%;
    border: 2px solid #c0bfbf;
    box-sizing: border-box;
    border-radius: 40px;
    padding: 0.7rem 0.25rem;
    text-align: start;

    .btn_login, .el-form-item {
        margin-bottom: 0.15rem !important;
    }

    .btn_login {
        color: #434341 !important;
        font-size: 0.337rem !important;
        margin-top: 0.02rem;
        transition: all 0.9s;
        margin-top: 0.1rem;
        border: none;

        &:hover {
            animation: fadeIn 0.7s ease-in-out;
        }
    }

    .btn_save {
        width: 1.96rem;
        height: .64rem;
        text-indent: -9999px;
        background: url('../../../assets/imgs_m/btn/btn_save.png') no-repeat center !important;
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

    .birth{
        line-height: 0.454rem;
    }
    .login_box {
        .form {
            dl {
                overflow: inherit;
            }

            .con {
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
            width: 4.6rem;
            margin-top: 0.24rem;
            padding-bottom: 0.1rem;
            margin-bottom: 0.4rem;
            font-size: 0.26rem;
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