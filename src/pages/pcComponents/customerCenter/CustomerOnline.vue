<template>
<div class="cs_title">
        <h2 class="animated">客服中心</h2>
    <div class="sub_login_wrapper login fl recordStore" v-if="options.isOnline">
        <div class="login_box login_in" :class="{bounceOut:isAni}">
            <form class="form">
                <dl>
                    <span class="logo">線上回報</span>
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
                                    <el-select
                                        v-model="ruleForm.gameInfo"
                                        placeholder="請選擇選擇遊戲"
                                        no-data-text="無數據"
                                        @change="handleChangeGameInfo($event)"
                                    >
                                        <el-option
                                            :label="item.name"
                                            :value="item.id"
                                            v-for="(item,index) in userGamesList"
                                            :key="index"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="選擇伺服器" prop="serverInfo">
                                    <el-select
                                        v-model="ruleForm.serverInfo"
                                        placeholder="請選擇遊戲伺服器"
                                        no-data-text="無數據"
                                        @change="handleChangedServer($event)"
                                    >
                                        <el-option
                                            v-for="item in serverNameList"
                                            :key="item.server_id"
                                            :label="item.server_name"
                                            :value="item.server_id"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="角色名稱" prop="roleInfo">
                                    <el-select 
                                        v-model="ruleForm.roleInfo" 
                                        no-data-text="無數據"
                                        placeholder="請填寫角色名稱"
                                    >
                                        <el-option
                                            v-for="item in roleNameList"
                                            :key="item.role_id"
                                            :label="item.role_name"
                                            :value="item.role_id"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item class="mar_contact">
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
</div>
</template>

<script>
import "@/assets/styles/login.css";
export default {
    name: "SubMyprofile",
    props: {
        options: Object,
    },
    inject: ["reload"],
    data: function () {
        return {
            radio: "2",
            isAni: false,
            account: "",
            passWord: "",
            isRemember: "",
            checked: true,
            birth_date: "",
            uuid: 0,
            appid: 0,
            appname: "",
            gameId: 0,
            serverId: 0,
            roleId: 0,
            serverNameList: [],
            roleNameList: [],
            userGamesList: [],
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
            current_appid: 0,
            current_uuid: 0,
            current_appname: "",
            current_server_name: "",
            current_role_name: "",
        };
    },
    computed: {
        userInfo: function () {
            return this.$store.state.userInfo;
        },
    },
    mounted() {
        if (localStorage.getItem("token")) {
            this.options.isOnline = true;
            this.getUserGamesList();
        } else {
            this.$message({
                duration: 1500,
                message: "如需聯繫客服,請先進行登入!",
            });
            this.options.isOnline = false;
        }
    },
    methods: {
        toTermsservice: function (val) {
            this.$bus.emit("toTermsservice", val);
        },
        getUserGamesList: function () {
            this.options.isLoading = true;
            let datas = datas;
            this.getHttp(this, datas, "/front/user/games", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    let d = data.data;
                    obj.userGamesList = d.games_list;

                    if (d.games_list.length == 0) {
                        obj.options.isLoading = false;
                        obj.$message({
                            duration: 1500,
                            message: "暫無註冊的遊戲哦!",
                        });
                        return false;
                    }
                    obj.ruleForm.gameInfo = d.games_list[0].name;

                    obj.gameId = d.games_list[0].id;
                    obj.uuid = d.games_list[0].uuid;
                    obj.appid = d.games_list[0].appid;
                    obj.appname = d.games_list[0].name;

                    obj.getServerInfo(obj.gameId, obj.appid, obj.uuid);
                } else {
                    obj.options.isLoading = false;
                }
            });
        },
        handleChangeGameInfo: function (id) {
            this.options.isLoading = true;
            this.roleNameList = "";
            this.serverNameList = "";
            this.ruleForm.serverInfo = "";
            this.ruleForm.roleInfo = "";
            // 根据id去数组中查取获得appid,uuid
            if (id !== null && id !== "" && id !== undefined) {
                for (var item of this.userGamesList) {
                    if (item.id == id) {
                        this.options.isLoading = false;
                        this.getServerInfo(id, item.appid, item.uuid);
                        this.current_appid = item.appid;
                        this.current_uuid = item.uuid;
                        this.current_appname = item.name;
                        // console.log("appid：", this.current_appid, "uuid：", this.current_uuid, "appname:", this.current_appname);
                    }
                }
            }
        },
        handleChangedServer: function (s_id) {
            this.options.isLoading = true;
            this.serverId = s_id;
            // this.ruleForm.serverInfo ='';
            this.ruleForm.roleInfo = "";
            if (s_id !== null && s_id !== "" && s_id !== undefined) {
                // 根据服务器id检索出对应的角色信息数组
                for (var item of this.serverNameList) {
                    if (item.server_id == s_id) {
                        this.options.isLoading = false;
                        this.roleNameList = item.role_info;
                        this.roleId = item.role_info[0].role_id;
                        this.ruleForm.roleInfo = this.roleId;
                        this.current_server_name = item.server_name;
                        this.current_role_name = item.role_info[0].role_name;
                        // console.log("伺服器：", this.current_server_name,"角色名：", this.current_role_name,"用户名：", this.userInfo.username);
                    }
                }
            }
        },
        getServerInfo: function (gameid, appid, uuid) {
            this.options.isLoading = true;
            let datas = {
                game_id: gameid,
                appid: appid,
                uuid: uuid,
            };
            this.getHttp(this, datas, "/front/game/server/role", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    let d = data.data;
                    obj.serverNameList = d;
                    // console.log("此时获取到的值", obj.ruleForm.serverInfo, obj.ruleForm.roleInfo);
                    obj.ruleForm.serverInfo = d[0].server_id;
                    obj.ruleForm.roleInfo = d[0].role_info[0].role_id;
                    obj.handleChangedServer(obj.ruleForm.serverInfo);
                } else {
                    obj.options.isLoading = false;
                    obj.$message({
                        duration: 1500,
                        message: data.message
                    });
                }
            });
        },
        submitForm: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.options.isLoading = true;
                    // 拼裝跳轉鏈接
                    if (
                        this.current_uuid == 0 ||
                        this.current_appid == 0 ||
                        this.current_appname == undefined
                    ) {
                        this.current_uuid = this.uuid;
                        this.current_appid = this.appid;
                        this.current_appname = this.appname;
                    }
                    this.options.isLoading = false;
                    console.log("userinfo",this.userInfo);
                    let newUrl =
                        "http://cs.hermesgames.com.tw/create?uid=" +
                        this.current_uuid +
                        "&app_id=" +
                        this.current_appid +
                        "&sname=" +
                        this.current_server_name +
                        "&app_name=" +
                        this.current_appname +
                        "&role=" +
                        this.current_role_name +
                        "&username=" +
                        this.userInfo.account +
                        "&platform=oms&";
                    window.open(newUrl);
                } else {
                    console.log(
                        this.rules.serverInfo,
                        formName,
                        valid,
                        "error submit!!"
                    );
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

.cs_title{
    width: 902px;
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
            width: 36px;
            height: 41px;
            top: 50%;
            left: 342px;
            margin-top: -18px;
            background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
            background-size: 300px 300px;
            background-position: -205px -91px;
        }
    }
}
.mar_contact >>> .el-form-item__content{
    margin-left: 0 !important;
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
    font-size: 22px;
    color: #4b4b4b;
    padding: 0;
    width: 124px !important;
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
    width: 549px !important;
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
    top: 99%;
    left: 51px;
    font-size: 10px;
}

.register >>> .el-radio__inner {
    margin-top: -3px;
}

.sub_login_wrapper {
    position: absolute;
    width: 900px;
    border: 3px solid #898888;
    box-sizing: border-box;

    .btn_login, .el-form-item {
        margin-bottom: 30px !important;
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

    .btn_online {
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
        width: 700px;
        text-align: center;
        margin: 0 auto;

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

            .el-input__inner {
                text-indent: 47px;
                text-align: left;
            }
        }
    }
}
</style>