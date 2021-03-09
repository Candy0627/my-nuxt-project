<template>
    <div>
        <mt-popup v-model="options.popupVisible" position="bottom">
            <div class="popup-container">
                <div class="title">
                    <div class="text" @click="cancel()">取消</div>
                    <div class="text confirm" @click="confirm()">确定</div>
                </div>
                <mt-picker :slots="slots" ref="picker" valueKey="name" @change="onValuesChange">
                </mt-picker>
            </div>
        </mt-popup>
    </div>
</template>

<script>
export default {
    name: "MemberPop",
    props:{
        options: Object,
        gamesList: Array
    },
    data: function () {
        return {
            slots: [
                {
                    flex: 1,
                    values: [
                        "2015-01",
                        "2015-02",
                        "2015-03",
                        "2015-04",
                        "2015-05",
                        "2015-06",
                    ],
                    className: "slot1",
                    textAlign: "center",
                },
            ]
        };
    },
    mounted() {
        console.log("獲取到遊戲列表", this.gamesList);
        this.slots[0].values = this.gamesList;
    },
    methods: {
        //滚轮变化回调
        onValuesChange(picker, values) {
            // let appid = values[0].appid;
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        },
        cancel() {
            this.slots[0].values="";
            this.$emit("cancel");

        },
        confirm() {
            let values = this.$refs.picker.getValues();
            console.log("點擊確定後得到的值也是一個數組",values);
            let appid = values[0].appid;
            this.$emit("confirm", appid);
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles_m/varibles.styl';
</style>