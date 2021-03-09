<template>
    <div class="header_wrapper">
        <div class="header animated" v-if="isAni" :class="{fadeInDown: isAni}">
            <div class="nav navWidth">
                <img src="../../../assets/imgs/logo.png" alt class="fl" align="absmiddle" />
                <ul class="fl">
                    <li class="white">
                        <router-link to="/" exact>
                            <span>首&nbsp;&nbsp;&nbsp;&nbsp;頁</span>
                        </router-link>
                    </li>
                    <li class="white">
                        <router-link to="/gameStoreCenter">
                            <span>儲值中心</span>
                        </router-link>
                    </li>
                    <li class="white">
                        <router-link to="/memberCenter">
                            <span>會員中心</span>
                        </router-link>
                    </li>
                    <li class="white">
                        <router-link to="/customerCenter">
                            <span>客服中心</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommonNav",
    props: {
        options: Object,
    },
    data: function () {
        return {
            isAni: false,
        };
    },
    mounted() {
        this.isAni = true;
    },
    methods: {
        loginDialog: function () {
            this.$emit("showLoginDialog");
        },
        loginOut: function () {
            this.$emit("loginOut");
        },
    },
};
</script>

<style lang="stylus" scoped>
.header_wrapper {
    width: 100%;
    height: 93.14px;
    background: #202020;
}

.header {
    position: relative;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 93.14px;
    background: #4b4a47;
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
            width: 248px;
            height: 66px;
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -33px;
        }

        ul {
            width: 842px;
            position: absolute;
            right: 0;

            li {
                width: 25%;
                height: 93.14px;
                line-height: 93.14px;
                float: left;
                text-align: center;
                text-indent: 1rem;

                &.current {
                    background: #3a3a3a;
                }


                a {
                    display: inline-block;
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-indent: 40px;

                    &:before {
                        position: absolute;
                        content: '';
                        z-index: 1;
                        top: 50%;
                        left: 37px;
                        margin-top: -20px;
                        background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
                        background-size: 300px 300px;
                    }
                }

                &:nth-child(1) {
                    a:hover {
                        &::before {
                            width: 40px;
                            height: 35px;
                            background-position: -260px -37px !important;
                            left: 37px;
                        }
                    }
                }

                &:nth-child(2) {
                    a:hover {
                        &::before {
                            width: 31px;
                            height: 35px;
                            background-position: -58px -96px !important;
                        }
                    }
                }

                &:nth-child(3) {
                    a:hover {
                        &::before {
                            width: 25px;
                            height: 37px;
                            background-position: -58px -4px !important;
                            left: 44px;
                        }
                    }
                }

                &:nth-child(4) {
                    a:hover {
                        &::before {
                            width: 32px;
                            height: 36px;
                            background-position: -55px -137px !important;
                        }
                    }
                }

                &.white {
                    &:nth-child(1) {
                        a {
                            &::before {
                                width: 40px;
                                height: 35px;
                                background-position: -2px -45px;
                                left: 37px;
                            }
                        }
                    }

                    &:nth-child(2) {
                        a {
                            &::before {
                                width: 31px;
                                height: 35px;
                                background-position: -3px -91px;     
                            }
                        }
                    }

                    &:nth-child(3) {
                        a {
                            &::before {
                                width: 25px;
                                height: 37px;
                                background-position: -2px -1px;
                                left: 44px;
                            }
                        }
                    }

                    &:nth-child(4) {
                        a {
                            &::before {
                                width: 32px;
                                height: 36px;
                                background-position: -8px -135px;
                            }
                        }
                    }
                }

                &:nth-child(1) {
                    a.current {
                        span {
                            color: #4b4a47;
                        }

                        &::before {
                            width: 40px;
                            height: 35px;
                            background-position: -260px -37px;
                            left: 37px;
                        }
                    }
                }

                &:nth-child(2) {
                    a.current {
                        span {
                            color: #4b4a47;
                        }

                        &::before {
                            width: 31px;
                            height: 35px;
                            background-position: -58px -96px;    
                        }
                    }
                }

                &:nth-child(3) {
                    a.current {
                        span {
                            color: #4b4a47;
                        }

                        &::before {
                            width: 25px;
                            height: 37px;
                            background-position: -58px -4px;
                            left: 44px;
                        }
                    }
                }

                &:nth-child(4) {
                    a.current {
                        span {
                            color: #4b4a47;
                        }

                        &::before {
                            width: 32px;
                            height: 36px;
                            background-position: -55px -137px;
                        }
                    }
                }

                a {
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    color: #9d9d9d;
                    position: relative;

                    i {
                        display: inline-block;
                        width: 27px;
                        height: 25px;
                        background: url('../../../assets/imgs/icon.png') no-repeat center;
                        background-size: 300px 300px;
                        background-position: 0 0;
                        vertical-align: middle;
                    }

                    &:hover {
                        transition: background 0.3s ease-in;
                        background: #fcc916;
                        box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.75) inset;

                        span {
                            color: #4b4a47;
                        }
                    }

                    &.current {
                        background: #fcc916;
                        color: #4b4a47;
                        box-shadow: 0 -3px 3px 0 rgba(0, 0, 0, 0.75) inset;
                    }

                    &.active {
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