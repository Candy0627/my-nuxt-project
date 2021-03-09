<template>
    <div class="footer animated comWidth box_top_shadow herms_comwidth">
        <div class="nav footerWidth">
            <router-link to="/mobile/home" class="black" exact>首頁</router-link>
            <router-link to="/mobile/gameStoreCenter" class="black">儲值中心</router-link>
            <router-link to="/mobile/memberCenter" class="black">會員中心</router-link>
            <router-link to="/mobile/customerCenter" class="black">客服中心</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommonFooter",
    props: {
        options: Object,
        footerInfoList: Array,
    },
    methods: {
        footerToLink: function (val) {
            setTimeout(() => {
                this.$bus.emit("footerToLink", val);
            }, 200);
        },
    },
};
</script>

<style lang="stylus" scoped>
.footer {
    position: fixed;
    width: 100%;
    height: 1.04rem;
    bottom: 0;
    background: #eeeeee
    .footerWidth {
        text-align: center;
        color: #fff;

        a {
            display: inline-block;
            position: relative;
            flex: 1;
            line-height: 1.5rem;
            color: #4b4a47;
            font-size: 0.2778rem;
            vertical-align: middle;

            &.current {
                color: #ecbc13;
                border-bottom: 3px solid #fcc916;
                &:nth-child(1) {
                    &::before {
                        background-position: -0.4rem 0 !important;
                    }
                }

                &:nth-child(3) {
                    &::before {
                        background-position: -.4rem -.47rem!important;
                    }
                }

                &:nth-child(2) {
                    &::before {
                        background-position: -.41rem -.92rem !important;
                    }
                }

                &:nth-child(4) {
                    &::before {
                        background-position: -.42rem -1.35rem!important;
                    }
                }
            }

            &:before {
                position: absolute;
                content: '';
                z-index: 1;
                top: 28%;
                left: 50%;
                background: url('../../../assets/imgs_m/hms-icon.png') no-repeat center;
                background-size: 3rem 3rem;
            }

            &.black {
                &:nth-child(1) {
                    &::before {
                        width: .4rem;
                        height: .35rem;
                        margin-left: -.2rem;
                        margin-top: -.175rem;
                        background-position:0 0;
                    }
                }

                &:nth-child(3) {
                    &::before {
                        width: 0.26rem;
                        height: 0.37rem;
                        margin-left: -0.125rem;
                        margin-top: -0.185rem;
                        background-position: 0 -0.49rem;
                    }
                }

                &:nth-child(2) {
                    &::before {
                        width: .35rem;
                        height: .35rem;
                        margin-left: -.175rem;
                        margin-top: -.175rem;
                        background-position: 0 -.93rem;
                    }
                }

                &:nth-child(4) {
                    &::before {
                        width: .39rem;
                        height: .36rem;
                        margin-left: -.18rem;
                        margin-top: -.18rem;
                        background-position: 0 -1.36rem;
                    }
                }
            }
        }
    }

    .nav {
        position: relative;
        display: flex;
        height: 100%;

        img {
            vertical-align: middle;
            width: 85px;
            height: 85px;
            margin-top: 29.5px;
        }

        p {
            width: 100%;
            text-align: center;
        }

        ul {
            width: 292px;
            padding-top: 24px;
            height: 20px;

            li {
                float: left;
                width: 97px;
                text-align: center;

                &:nth-child(1) {
                    a {
                        border-left: none;
                    }
                }

                &.current {
                    background: #3a3a3a;
                }

                a {
                    width: 100%;
                    height: 18px;
                    line-height: 18px;
                    display: inline-block;
                    font-size: 16px;
                    color: #fff;
                    position: relative;
                    border-left: 1px solid #fff;

                    i {
                        display: inline-block;
                        width: 27px;
                        height: 25px;
                        background: url('../../../assets/imgs/icon.png') no-repeat center;
                        background-size: 300px 300px;
                        background-position: 0 0;
                        vertical-align: middle;
                    }

                    span {
                        color: #9d9d9d;
                        font-size: 22px;
                        width: 219px;
                        display: inline-block;
                        height: 100%;
                        line-height: 100%;

                        &:hover {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
}
</style>