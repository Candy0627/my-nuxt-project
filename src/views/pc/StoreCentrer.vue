<template>
    <div class="wrapper wrapper_pc">
        <common-nav :options="options"></common-nav>
        <div class="game_wrapper">
            <div class="hot hot_comWidth">
                <!-- <h2 class="animated" v-if="options.isAni" :class="{fadeInLeft: options.isAni}">儲值中心</h2> -->
                <div class="hot_wrapper">
                    <div
                        class="hms_ul fl animated"
                        v-if="options.isAni"
                        :class="{fadeInLeft: options.isAni}"
                    >
                        <ul class="hot_tab">
                            <li
                                :class="{active:curId === index}"
                                class="gray"
                                v-for="(item,index) in tabList"
                                :key="index"
                                @click="tab(index)"
                            >{{item}}</li>
                        </ul>
                    </div>
                    <div
                        class="hot_con fl animated"
                        v-if="options.isAni"
                        :class="{fadeInRight: options.isAni}"
                    >
                        <div v-if="curId == 0">
                            <div class="wait1">
                                <!-- <img src="../assets/imgs/wait.png" alt /> -->
                                <game-store :curId="curId" :options="options" v-if="token"></game-store>
                                <sub-login 
                                    :options="options"
                                    @thirdLoginDialog="thirdLoginDialog"
                                    v-else
                                ></sub-login>
                            </div>
                        </div>
                        <div v-if="curId == 1">
                            <div class="wait">
                                <store-record :options="options" @handleStoreNow="handleStoreNow"></store-record>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <common-footer :options="options"></common-footer>
        <loading :options="options"></loading>
        <common-mask :options="options" @closeDialog="closeDialog"></common-mask>
        <fb-dialog
            :options="options"
            :isFbDialog="isFbDialog"
            :gamesList="gamesList"
            :platFormType="platFormType"
            @closeFbDialog="closeFbDialog"
        ></fb-dialog>
    </div>
</template>

<script>
import "@/assets/styles/myProgress.css";
import Loading from "@/pages/pcComponents/common/Loading";
import CommonNav from "@/pages/pcComponents/common/CommonNav.vue";
import CommonFooter from "@/pages/pcComponents/common/CommonFooter.vue";
import GameStore from "@/pages/pcComponents/gameStore/GameStore.vue";
import StoreRecord from "@/pages/pcComponents/gameStore/StoreRecord.vue";
import SubLogin from "@/pages/pcComponents/memberCenter/SubLogin";
import FbDialog from "@/pages/pcComponents/memberCenter/FbDialog.vue";
import CommonMask from "@/pages/pcComponents/common/CommonMask.vue";
export default {
    name: "GameCenter",
    components: {
        Loading,
        CommonNav,
        CommonFooter,
        GameStore,
        StoreRecord,
        SubLogin,
        FbDialog,
        CommonMask
    },
    data: function () {
        return {
            tabList: ["儲值遊戲", "儲值紀錄 "],
            curId: 0,
            platFormType: "",
            gamesList: [],
            isFbDialog: false,
            options: {
                isLoading: false,
                isAni: false,
                isMask: false
            },
        }
    },
    computed: {
        token: function () {
            console.log("此時token 有值嗎",this.$store.state.token);
			return this.$store.state.token;
        }
	},
    mounted() {
        // this.token = localStorage.getItem["token"];
        this.options.isAni = true;
        this.$store.commit("setIsLoginStore", true);
        this.$store.commit("setIsLoginCustomer", false);
        this.$store.commit("setIsLogin", false);
    },
    methods: {
        tab: function (i) {
            this.curId = i;
        },
        handleStoreNow() {
            this.curId = 0;
        },
        closeDialog: function () {
            this.options.isMask = false;
            this.isFbDialog = false;
        },
        closeFbDialog: function () {
            this.isFbDialog = false;
            this.options.isMask = false;
        },
        getAllGamesList: function () {
            let datas = datas;
            this.getHttp(this, datas, "/front/game/all", function (obj, data) {
                if (data.status == "2000") {
                    obj.gamesList = data.data;
                    obj.firstGameId = data.data[0].id;
                }
            });
        },
        thirdLoginDialog: function (type) {
            this.getAllGamesList();
            this.platFormType = type;
            this.options.isMask = true;
            this.isFbDialog = true;
        }
    }
};
</script>

<style lang="stylus" scoped>
.game_wrapper {
    margin-bottom: 130px;

    .hot_comWidth {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
    }

    .hot {
        margin-top: 65px;
        margin-bottom: 46px;
        min-height: 680px;

        &>h2 {
            position: relative;
            display: block;
            width: 100%;
            text-indent: 30px;
            font-size: 47.02px;
            color: #4b4b4b;
            font-weight: 500;

            &::before {
                content: '';
                position: absolute;
                width: 37px;
                height: 44px;
                top: 50%;
                left: 475px;
                margin-top: -19px;
                background: url('../../assets/imgs/hms-icon.png') no-repeat center;
                background-size: 300px 300px;
                background-position: -261px -90px;
            }
        }
    }
}

.hot_wrapper {
    margin-top: 32px;
    width: 1220px;

    /** .wait {
        margin-left: 169px;
    }

    .waitR {
        margin-left: 158px;
    }*/

    .hms_ul {
        width: 150px;
        padding: 18px 0 30px 0;
        margin-top: 130px;
        border-right: 2px solid #fcc505;
    }

    ul.hot_tab {
        width: 150px;

        li {
            width: 150px;
            text-align: center;
            font-size: 26px;
            color: #4b4a47;
            background: #fff;
            cursor: pointer;
            margin-top: 25px;

            &.active {
                color: #fcc814;
                font-size: 26px;
            }

            &:nth-child(1) {
                margin-top: 0;
            }
        }
    }

    .hot_con {
        width: 621px;
        margin-left: 169px;
    }
}
</style>