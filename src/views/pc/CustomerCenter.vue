<template>
	<div class="wrapper wrapper_pc">
		<common-nav :options="options"></common-nav>
		<div class="game_wrapper">
			<div class="hot hot_comWidth">
				<!-- <h2 class="animated" v-if="options.isAni" :class="{fadeInLeft: options.isAni}">客服中心</h2> -->
				<div class="hot_wrapper">
					<div class="hms_ul fl animated" v-if="options.isAni" :class="{fadeInLeft: options.isAni}">
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
						<div v-if="footerId === 0">
							<customer-online :options="options" v-if="token"></customer-online>
							<sub-login 
                                :options="options" 
                                @toRegisterLink="toRegisterLink"
                                @thirdLoginDialog="thirdLoginDialog"
                                v-else
                            ></sub-login>
						</div>
						<div v-if="footerId === 1">
							<customer-contactus></customer-contactus>
						</div>
						<div v-if="footerId === 2">
							<customer-termsservice></customer-termsservice>
						</div>
						<div v-if="footerId === 3">
							<customer-privacypolicy></customer-privacypolicy>
						</div>
						<div v-if="footerId === 4">
							<customer-companyinfo></customer-companyinfo>
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
import CustomerOnline from "@/pages/pcComponents/customerCenter/CustomerOnline";
import CustomerContactus from "@/pages/pcComponents/customerCenter/CustomerContactus";
import CustomerTermsservice from "@/pages/pcComponents/customerCenter/CustomerTermsservice";
import CustomerPrivacypolicy from "@/pages/pcComponents/customerCenter/CustomerPrivacypolicy";
import CustomerCompanyinfo from "@/pages/pcComponents/customerCenter/CustomerCompanyinfo";
import SubLogin from "@/pages/pcComponents/memberCenter/SubLogin";
import FbDialog from "@/pages/pcComponents/memberCenter/FbDialog.vue";
import CommonMask from "@/pages/pcComponents/common/CommonMask.vue";
export default {
	name: "GameCenter",
	components: {
		Loading,
		CommonNav,
		CommonFooter,
		CustomerContactus,
		CustomerTermsservice,
		CustomerPrivacypolicy,
		CustomerCompanyinfo,
        CustomerOnline,
        SubLogin,
        FbDialog,
        CommonMask
    },
	data: function () {
		return {
			tabList: ["聯繫客服", "聯繫我們", "服務條款", "隱私權政策","公司介紹"],
            curId: 0,
            platFormType: "",
            gamesList: [],
            isFbDialog: false,
			options: {
				isLoading: false,
				isAni: false,
                isOnline: false,
                isMask: false
			},
		};
	},
	computed: {
		footerId: function () {
            // console.log("此时当前的footerId",this.$store.state.footerId);
			return this.$store.state.footerId;
        },
        token: function () {
			return this.$store.state.token;
        }
	},
	created() {
		let self = this;
		this.$bus.on("toTermsservice", function (val) {
			self.curId = val;
			self.$store.commit("setFooterId", val);
		});
		this.$bus.on("footerToLink", function (val) {
			self.curId = val;
            self.options.isAni = true;
            // console.log("当前的footerId",val);
			self.$store.commit("setFooterId", val);
		});
	},
	mounted() {
        this.$store.commit("setIsLoginCustomer",true);
        this.$store.commit("setIsLoginStore", false);
        this.$store.commit("setIsLogin", false);
		this.curId = this.$store.state.footerId;
        this.options.isAni = true;
        // this.$store.commit("setFooterId", 0);
        this.tabId = 0;
        
	},
	methods: {
		tab: function (i) {
			this.curId = i;
			this.$store.commit("setFooterId", i);
		},
		handleStoreNow() {
			this.curId = 0;
        },
        toRegisterLink: function (val) {
            this.curId = val;
            this.tabId = 1;
        },
        closeFbDialog: function () {
            this.isFbDialog = false;
            this.options.isMask = false;
        },
        closeDialog: function () {
            this.options.isMask = false;
            this.isFbDialog = false;
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
}
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
		margin-top: 98px;
		margin-bottom: 46px;
		min-height: 680px;

		&>h2 {
			position: relative;
			display: block;
			width: 902px;
			text-indent: 30px;
			font-size: 40px;
			color: #4b4b4b;
			font-weight: 500;
			text-indent: 347px;
			text-align: center;
			margin: 0 auto;

			&::before {
				content: '';
				position: absolute;
				width: 36px;
				height: 41px;
				top: 50%;
				left: 503px;
				margin-top: -20px;
				background: url('../../assets/imgs/hms-icon.png') no-repeat center;
				background-size: 300px 300px;
				background-position: -205px -91px;
			}
		}
	}
}

.hot_wrapper {
	margin-top: 32px;
	width: 943px;

	.hms_ul {
		width: 150px;
        margin-top:130px;
		padding: 18px 0 30px 0;
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
		position: relative;
		width: 622px;
		height: 468px;
		margin-left: 169px;

		.wait {
			position: absolute;
			width: 621px;
			height: 468px;
			line-height: 468px;
			border: 3px solid #898888;
			box-sizing: border-box;

			img {
				vertical-align: middle;
			}
		}
	}
}
</style>