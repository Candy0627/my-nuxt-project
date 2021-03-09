<template>
    <div class="store_record">
        <h2 class="animated fadeInLeft">儲值中心</h2>
        <div class="recordStore">
            <table width="100%">
                <tr>
                    <td>訂單號</td>
                    <td>儲值遊戲</td>
                    <td>儲值金額</td>
                    <td>儲值時間</td>
                </tr>
                <tr v-for="(item,index) in storeRecordList" :key="index">
                    <td>{{item.order_num}}</td>
                    <td>{{item.game_name}}</td>
                    <td>${{item.pay_money}}</td>
                    <td>{{item.store_time | formatDate}}</td>
                </tr>
            </table>
            <el-pagination
                v-cloak
                v-if="isPage"
                :current-page="currentPage"
                :page-size="pageSize"
                :page-count.sync="pageCount"
                layout="prev, pager, next"
                :total="total"
                @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { formatDate } from "@/assets/js/date.js";
import CommonCalendar from "@/pages/pcComponents/common/CommonCalendar.vue";
export default {
    name: "StoreRecord",
    props: {
        options: Object,
    },
    components: {
        CommonCalendar,
    },
    data: function () {
        return {
            storeRecordList: [],
            allGameList: [],
            selectedValue: "",
            start_time: "",
            end_time: "",
            game_id: "",
            isPage: false,
            isShow: false,
            subNewsList: [],
            currentPage: 1, //初始页
            pageSize: 20, //每页的数据
            newsList: [],
            pageCount: 4,
            total: 0,
        };
    },
    filters: {
        formatDate: function (time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
    },
    computed: {
        userInfo: function () {
            return this.$store.state.userInfo;
        },
    },
    mounted() {
        this.handleQueryStoreRecord(1);
        // this.getGiftPackagesGameList();
    },
    methods: {
        calendarSelectedValue: function (start_time, end_time) {
            this.start_time = start_time;
            this.end_time = end_time;
        },
        handleChangeSelectValue(value) {
            this.game_id = value;
        },
        // getGiftPackagesGameList: function() {
        //     this.options.isLoading = true;
        //     let datas = datas;
        //     this.getHttp(this, datas, "/front/game/all", function(obj, data) {
        //         obj.options.isLoading = false;
        //         obj.allGameList = data.data;
        //     });
        // },
        handleCurrentChange: function (val) {
            console.log(`当前的是第几页:${val}`);
            this.handleQueryStoreRecord(val);
            this.$nextTick(() => {
                // 点击分页后回到顶部
                // this.scrollWindow()
                window.scrollTo(100, 500);
            });
        },
        handleQueryStoreRecord(page) {
            this.options.isLoading = true;
            let datas = {
                start_time: this.start_time,
                end_time: this.end_time,
                page: page,
                page_size: this.pageSize,
                game_id: this.game_id,
            };
            // 儲值記錄待排查原因，不走2000的藉口
            this.getHttp(this, datas, "/front/store/record", function (
                obj,
                data
            ) {
                if (data.status == "2000") {
                    obj.options.isLoading = false;
                    let d = data.data;
                    if (d.record_list.length == 0) {
                        obj.storeRecordList = "";
                        obj.$message("儲值記錄暫無數據哦~");
                        obj.isPage = false;
                    } else {
                        obj.isPage = true;
                        obj.storeRecordList = d.record_list;
                        obj.total = d.total;
                    }
                } else {
                    obj.options.isLoading = false;
                    // obj.$message(data.message);
                }
            });
        },
        handleStoreNow: function () {
            this.$emit("handleStoreNow");
        },
    },
};
</script>

<style lang="stylus" scoped>
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(252, 197, 5, 0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(252, 197, 5, 0.08);
}

::-webkit-scrollbar-thumb {
    wifth: 6px;
    height: 6px !important;
    border-radius: 3px;
    background: rgba(252, 197, 5, 0.8);
    -webkit-box-shadow: inset 0 0 10px rgba(252, 197, 5, 1);
}

.store_record {
    h2 {
        position: relative;
        display: block;
        width: 899px;
        font-size: 47.02px;
        color: #4b4b4b;
        font-weight: 500;
        text-indent: 46px;
        margin: 0 auto 40px;

        &::before {
            content: '';
            position: absolute;
            width: 37px;
            height: 44px;
            top: 50%;
            left: 333px;
            margin-top: -19px;
            background: url('../../../assets/imgs/hms-icon.png') no-repeat center;
            background-size: 300px 300px;
            background-position: -261px -90px;
        }
    }
}

.recordStore {
    width: 899px;
    height: 614px;
    text-align: center;
    border: 3px solid #898888;
    box-sizing: border-box;
    padding: 64px 18px 50px 18px;
    overflow-y: auto;

    table {
        width: 100% !important;
        margin-top: auto !important;

        tr {
            td {
                border: none !important;
            }
        }
    }

    .h2 {
        display: block;
        width: 834px;
        font-size: 26px;
        color: #2c2c2c;
        padding-bottom: 15px;
        text-align: left;
        border-bottom: 1px solid #bfbfbf;

        span {
            font-size: 25px;
            color: #5d5d5d;

            &.modou {
                color: #ff7a07;
                font-size: 28px;
            }
        }

        a {
            display: inline-block;
            width: 144px;
            height: 37px;
            line-height: 37px;
            padding: 0;
            border-radius: 3px;
            font-size: 20.16px;
            background: #f4f4f4;
            border: 2px solid #f5854e;
            vertical-align: bottom;
            margin-left: 70px;
        }
    }

    .content_date {
        font-size: 17px;
        color: #5d5d5d;
        margin-top: 40px;

        .before {
            margin-right: 16px;
        }

        .after {
            margin-left: 16px;
        }

        .el-select {
            float: left;
            width: 240px;
            height: 38px;
            margin-left: 16px;
            box-sizing: border-box;
        }

        a {
            display: inline-block;
            width: 99px;
            height: 38px;
            line-height: 38px;
            border-radius: 2px;
            text-align: center;
            color: #fff;
            background: #ff7a07;

            &.btn_search {
                cursor: pointer;
                border: 1px solid #ff7a07;
                box-sizing: border-box;
            }
        }
    }

    table {
        width: 834px;
        margin-top: 35px;
        table-layout: fixed;
        text-align: center;
        color: #565656;
        font-size: 16.28px;
        background: #ffffff;

        tr {
            td {
                word-break: break-all;
                border: 1px solid #bfbfbf;
            }
        }
    }
}
</style>