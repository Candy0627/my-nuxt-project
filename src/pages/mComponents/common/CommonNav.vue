<template>
    <div class="header_m_wrapper herms_comwidth">
        <div class="header_m animated" v-if="isAni" :class="{fadeInDown: isAni}">
            <div class="nav">
                <img src="../../../assets/imgs_m/logo.png" align="absmiddle" />
                <em @click="loginNavShow()"></em>
                <transition name="slide-fade">
                    <ul class="nav_ul animated fadeInTop box_shadow" v-if="isHermsLogin">
                        <li class="white" v-if="isLoginInM">
                            <router-link to="/mobile/memberCenter" @click.native="loginIn()">登入</router-link>
                        </li>
                        <li class="white" v-else>
                            <router-link to="/mobile/home" @click.native="loginOut()">登出</router-link>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommonNav",
    props: {
        options: Object
    },
    data: function () {
        return {
            isAni: false,
        };
    },
    computed: {
        isHermsLogin: function () {
            return this.$store.state.isHermsLogin;
        },
        isLoginInM: function () {
            return this.$store.state.isLoginInM;
        }
    },
    mounted() {
        this.isAni = true;
        if (localStorage.getItem("token")) {
            this.$store.commit("setIsLoginIn", false);
        } else {
            this.$store.commit("setIsLoginIn", true);
        }
    },
    methods: {
        loginDialog: function () {
            this.$emit("showLoginDialog");
        },
        loginOut: function () {
            this.options.isLoading = true;
            this.$toast("已登出");
            this.options.isLoading = false;

            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");

            this.$store.commit("setToken", '');
            this.$store.commit("setUserInfo", {});
            
            this.$store.commit("setIsNavMask", false);
            this.$store.commit("setIsLoginIn", true);
            this.$store.commit("setIsHermsLogin", false);


            // this.$emit("LoginRegisterShow", true);
            this.$router.push({ path: "/mobile/home" });
        },
        loginNavShow: function () {
            this.$store.commit("setIsNavMask", true);
            if (localStorage.getItem("token")) {
                this.$store.commit("setIsHermsLogin", true);
                this.$store.commit("setIsLoginIn", false);
            } else {
                this.$store.commit("setIsHermsLogin", true);
                this.$store.commit("setIsLoginIn", true);
            }
        },
        loginIn: function () {
            this.$emit("loginInMemberCenter");
            this.$store.commit("setIsNavMask", false);
            this.$store.commit("setIsHermsLogin", false);
            this.$router.push("/mobile/memberCenter");
        },
    },
};
</script>

<style lang="stylus" scoped>
/* * fade animate */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

/* * slide-fade animate */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}

.header_m_wrapper {
    position: fixed;
    top: 0;
    z-index: 110;
    width: 100%;
    height: 1.16rem;
    background: #202020;

    .my {
        width: 0.48rem !important;
        height: 0.48rem !important;
        position: absolute !important;
        right: 0.27rem !important;
        top: 50% !important;
        margin-top: -0.24rem !important;
        margin-left: -0.24rem !important;
    }
}

.header_m {
    position: relative;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 1.16rem;
    box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.75) inset;
    transition: top 0.5s;

    .navWidth {
        width: 1200px;
        margin: 0 auto;
    }

    .nav {
        position: relative;
        height: 100%;

        img {
            vertical-align: middle;
            width: 2.48rem;
            height: 0.66rem;
            position: absolute;
            left: 0.27rem;
            top: 50%;
            margin-top: -0.33rem;
        }

        em {
            display: inline-block;
            position: absolute;
            width: 0.48rem;
            height: 0.48rem;
            z-index: 1;
            top: 50%;
            right: 0.46rem;
            margin-top: -0.24rem;
            background: url('../../../assets/imgs_m/my.png') no-repeat center;
            background-size: 100% 100%;
        }

        ul {
            width: 100%;
            position: absolute;
            left: 0;
            top: 1.16rem;
            background: #ebf0f3;

            li {
                width: 100%;
                height: 0.57rem;
                line-height: 0.57rem;
                text-align: center;
                border-bottom: 1px solid #c0bfbf;

                &:last-child {
                    border-bottom: none;
                }

                &.current {
                    background: #3a3a3a;
                }

                a {
                    display: inline-block;
                    position: relative;
                    width: 100%;
                    height: 100%;
                    font-size: 0.3rem;
                    color: #4b4a47;

                    i {
                        display: inline-block;
                        width: 27px;
                        height: 25px;
                        background: url('../../../assets/imgs/icon.png') no-repeat center;
                        background-size: 300px 300px;
                        background-position: 0 0;
                        vertical-align: middle;
                    }

                    &.active {
                        width: 107px;
                        height: 128px;
                        color: #fff;

                        span {
                            color: #fff;
                            font-size: 26px;
                        }
                    }

                    span {
                        color: #ffffff;
                        font-size: 24px;
                    }
                }
            }
        }
    }
}
</style>