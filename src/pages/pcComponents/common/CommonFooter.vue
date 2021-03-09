<template>
    <div class="footer animated">
        <div class="nav footerWidth">
            <dl>
                <dd>
                    <router-link to="/customerCenter?id=1" @click.native="footerToLink(1)">聯繫我們</router-link>
                    <router-link to="/customerCenter?id=2" @click.native="footerToLink(2)">服務條款</router-link>
                    <router-link to="/customerCenter?id=3" @click.native="footerToLink(3)">隱私權政策</router-link>
                </dd>
                <dd>Copyright © 2020 Hermes Game Co.,LTD 荷米斯遊戲有限公司 All Rights Reserved</dd>
            </dl>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommonFooter",
    props: {
        options: Object,
        footerInfoList: Array
    },
    methods:{
        footerToLink: function(val) {
            setTimeout(() => {
                this.$bus.emit("footerToLink", val);
            }, 200)
            
        }
    }
};
</script>

<style lang="stylus" scoped>
.footer {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 90px;
    background: url('../../../assets/imgs/hms_foot_bg.jpg') repeat-x
    .footerWidth {
        width: 713px;
        margin: 0 auto;
        text-align: center;
        color: #fff;
        dl{
            dd{
                a{
                    display inline-block
                    width 96px
                    height 20px
                    line-height 20px
                    color: #fff;
                    margin-top: 24px;
                    border-right: 1px solid #fff;
                    &:last-child{
                        border-right none
                    }
                    &:hover{
                        color:#fcc916
                    }
                }
            }
        }
    }

    .nav {
        position: relative;
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