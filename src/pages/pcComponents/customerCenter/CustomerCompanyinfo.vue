<template>
  <div class="cs_title">
    <h2 class="animated">客服中心</h2>
    <div class="cus_login_wrapper login fl">
      <div class="login_box">
        <span class="logo">公司介紹</span>
        <div class="c_content">
          <p class="title">公司介紹</p>
          <p class="ind">
            荷米斯遊戲(Hermes Game CO.,
            LTD)是由眾多熱血遊戲玩家匯集組成的團隊，致力於創造最優質的遊戲殿堂。</p>
			<p class="ind">發行地區涵蓋了台灣、香港以及澳門，遊戲產品包含SLG戰略、MMORPG，棋牌、二次元等豐富多元的類型，
            旗下另設有YouTube頻道「荷米斯瘋GAME」，以遊戲產品為核心，開拓至娛樂、知識、行銷等多方位發展。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerCompanyinfo",
  data: function() {
    return {};
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

/* 滚动槽 */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(252,197,5,0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(252,197,5,0.08);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    max-height: 10px;
    border-radius: 3px;
    background: rgba(252,197,5,0.8);
    -webkit-box-shadow: inset 0 0 10px rgba(252,197,5,1);
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
.cus_login_wrapper {
    position: absolute;
    width: 900px;
    height:378px;
    border: 3px solid #898888;
    box-sizing: border-box;

    .login_box {
        margin: 0 auto;

        .c_content {
            overflow-y: auto;
            width: 800px;
            margin: 0 auto;
            height: 227px;
            line-height: 24px;
            margin-top: 10px;
            padding: 20px;
            border: 2px solid #898888;
            text-align: left;
            font-size: 14px;

            p {
                width: 100%;
                text-align: left;
                font: size 16px;
                font-weight: 700;
                margin-top: 20px;
                margin-bottom: 10px;

                &.title {
                    font-size: 16px;
                    text-align: center;
                }

                &.ind {
                    text-indent: 2em;
                    font-weight inherit
                }
            }
        }

        .con {
            li {
                position: relative;
                text-align: left;
                font-size: 20px;

                &.mart {
                    margin-top: 38px;
                    margin-bottom: 18px;
                    text-indent: 2rem;

                    &::before {
                        content: '';
                        position: absolute;
                        width: 25px;
                        height: 26px;
                        top: 0;
                        left: 0;
                        background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                        background-size: 300px 300px;
                        background-position: -232px -155px;
                    }
                }
            }
        }

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
            display: inline-block;
            width: 460px;
            margin: 17px auto 10px;
            font-size: 26px;
            color: #4b4b4b;
            padding-bottom: 10px;
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
    }
}
</style>
