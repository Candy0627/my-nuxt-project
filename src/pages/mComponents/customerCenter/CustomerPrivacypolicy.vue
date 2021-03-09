<template>
    <div class="cus_login_wrapper login">
        <div class="login_box">
            <!-- <span class="logo">隱私權政策</span> -->
            <div class="c_content">
                <p class="title">隱私權政策</p>
                <p
                    class="ind"
                >歡迎您蒞臨荷米斯遊戲網站（以下簡稱本網站），為了尊重您個人的隱私權，讓您能夠安心的使用本網站的各項服務與資訊，因此制訂了隱私權保護政策。對於本網站如何蒐集、應用及保護您所提供的個人資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：</p>
                <p>隱私權保護政策的適用範圍</p>隱私權保護政策內容，包括本網站如何處理您在使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的第三人。
                <p>個人資料的蒐集、處理及利用方式</p>1.單純在本網站瀏覽或檔案下載行為，本網站並不會蒐集任何有關您個人的識別資料。
                <br />2.當您註冊成為本網站的會員時，本網站會請您提供包括姓名、身份證字號或護照號碼(外國人)、住址、電話、電子信箱等個人資訊，我們取得這些資訊是為了提供您購買、記錄道具、累積幣值、訊息傳遞等服務（法務部個人資料特定目的項目代號：090消費者、客戶管理與服務；135資(通)訊服務；136資(通)訊與資料庫管理；148網路購物及其他電子商務服務）。
                <br />3.利用本網站所提供的客戶服務信箱或各項線上申辦服務，需申請人提供個人資料時，會依案件辦理需求請您提供姓名、聯絡電話、電子郵箱、通訊住址及戶籍地址等個人最新、真實之資料。
                <br />
                <p>資料之保護</p>1.請妥善保管您的帳號及密碼或任何個人資料，不要將任何個人資料，提供給任何人，若您是與人共享電腦或用公共電腦，請務必記得登出，並切記關閉瀏覽器視窗，以防止他人讀取您的個人資料或信件。
                <br />2.如有必要委託本網站相關單位提供服務時，只有經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約。
                <br />3.本網站亦會恪守台灣個人資料保護法之規定，提供適當安全維護措施以保護您的個人資料之安全性。對於任何違法盜用或揭露個人資料的不法及不當行為，本網站定將採取必要的法律行動，以確保您的權益。
                <br />
                <p>網站對外的相關連結</p>本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站，但該連結網站不適用本網站的隱私權保護政策，點選進入其他網站前，建議您務必瀏覽該連結網站中的隱私權保護政策。
                <p>與第三人共用個人資料之政策</p>本網站不會提供、交換、出租或出售任何您的個人資料給未經您授權的第三人、團體、私人企業或公務機關。但有下列情形者除外：
                <br />1.為了提供您其它服務或優惠權益，需要與提供該服務或優惠之其他人士或公司共用您的資料時，本網站會在活動時提供充分說明，你可以自由選擇是否接受這項特定服務或優惠。
                <br />2.經司法機關依法要求提供，或我們發覺你在網站上有違法行為，本網站將依法配合司法單位協助調查。
                <br />
                <p>Cookie之使用</p>為了提供更好的個人化服務，本網站可能會使用Cookies來存儲並在某些時候追蹤有關使用者的資料。本網站的Cookies使用是基於：估算瀏覽人數、測量瀏覽模式。這些資料僅止於商業及市場分析或學術用途。Cookies亦可供作第三人，例如廣告服務公司在我們的網頁設立廣告，這些廣告服務公司可以利用Cookies蒐集到非相關於您個人可資辨識之的資料，廣告業者可以利用這種資訊，作為分析行銷指標並評估其影響力，所有資料僅供資料分析用。
                <p>其他依法告知事項</p>對於本網站蒐集、處理及利用個人資料，您可以依台灣個人資料保護法第3條規定行使下列權利：
                <br />1.查詢或請求閱覽。
                <br />2.請求製給複製本。
                <br />3.請求補充或更正。
                <br />4.請求停止蒐集、處理或利用。
                <br />5.請求刪除。
                <br />
                <p>隱私權保護政策之修正</p>為提供給您更好的服務，本站將配合各項相關法令規定定期增刪修改本隱私權政策，經過增刪或修改後的內容應以本網站公告時間為生效日。
                <br />
                <br />最新公告日期：西元2020年06月。
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CustomerContactus",
    data: function () {
        return {};
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles_m/varibles.styl';

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
    background: rgba(252, 197, 5, 0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(252, 197, 5, 0.08);
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    max-height: 10px;
    border-radius: 3px;
    background: rgba(252, 197, 5, 0.8);
    -webkit-box-shadow: inset 0 0 10px rgba(252, 197, 5, 1);
}

.cus_login_wrapper {
    height: 10.6rem;
    margin: 0.29rem auto 0.4rem;
    border: 2px solid $bdColor;
    box-sizing: border-box;
    border-radius: $bdRadius;

    .login_box {
        margin: 0 auto;

        .c_content {
            overflow-y: auto;
            margin: 0 auto;
            height: 9.74rem;
            margin-top: 0.25rem;
            padding: 0 0.2rem;
            line-height: 0.4rem;
            text-align: left;
            font-size: 0.16rem;

            p {
                width: 100%;
                text-align: left;
                font-size: 0.16rem;
                font-weight: 700;
                margin-top: 0.2rem;
                margin-bottom: 0.1rem;

                &.title {
                    font-size: 0.18rem;
                    text-align: center;
                }

                &.ind {
                    text-indent: 0.25rem;
                    font-weight: inherit;
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