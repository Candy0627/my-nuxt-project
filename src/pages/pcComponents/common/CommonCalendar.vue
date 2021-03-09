<template>
    <div class="block calendar fl">
        <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="selectTime(value2)"
        ></el-date-picker>
    </div>
</template>

<script>
export default {
    name:'CommonCalendar',
    data() {
        return {
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            value1: "",
            value2: ""
        };
    },
    mounted() {
        // this.$emit('calendarSelectedValue',this.value2);
    },
    methods: {
        selectTime: function(value2) {
            var start_time = this.dateToMs(value2[0]);
            var end_time = this.dateToMs(value2[1]);
            this.$emit('calendarSelectedValue', start_time, end_time);
        },
        // 中国标准时间转换成时间戳
        dateToMs: function(date) {
            let result = new Date(date).getTime();
            return result;
        }
    },
};
</script>

<style lang="stylus" scoped>
    .calendar{
        width: 350px;
    }
</style>
