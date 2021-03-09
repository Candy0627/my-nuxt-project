<template>
    <div class="cus_login_wrapper login">
        <div class="login_box">
            <!-- <span class="logo">
                聯繫我們
            </span> -->
            <ul class="con">
                <li class="mart">廣告媒體合作 </li>
                <li>Email: marketing@hermesgames.com.tw </li>
                <li class="mart">客服信箱</li>
                <li>Email: service@hermesgames.com.tw </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "CustomerContactus",
    data: function() {
        return {};
    }
};
</script>

<style lang="stylus" scoped>
/** CSS loader 会把非根路径的url解释为相对路径， 加~前缀才会解释成模块路径。**/
@import '~@/assets/styles_m/varibles.styl'

.v-enter, .v-enter-to {
    opacity: 0;
}

.v-enter-active, .v-leave-active {
    transition: opacity 1s;
}

.cus_login_wrapper {
    height: 2.7rem;
    margin: .29rem auto;
    border: 2px solid $bdColor;
    border-radius: $bdRadius;
    box-sizing: border-box;
    .login_box {
        margin: 0 auto;
        .con{
            width: 5.2rem;
            margin: 0 auto;
            li{
                position relative
                text-align left
                font-size: .28rem
                color: $fontColor
                &:nth-child(3) {
                    margin-top: .57rem
                }
                &.mart{
                    margin-top: .38rem;
                    margin-bottom: .18rem;
                    text-indent .33rem
                    &::before{
                        content:'';
                        position: absolute;
                        width: .25rem;
                        height: .26rem;
                        top: 0;
                        left: 0;
                        background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                        background-size: 3rem 3rem;
                        background-position -2.32rem -1.55rem
                    }
                }
            }
        }
        .form {
            dl {
                overflow: inherit;
            }

            .con {
                width: 2.9rem;
            }
        }

        .login_close {
            position: absolute;
            width: .89rem;
            height: .82rem;
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
            margin-top: 17px;
            padding-bottom: 10px;
            font-size: 26px;
            color: #4b4b4b;
            border-bottom: 3px solid #fcc505;

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
                font-size: 26px;
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