<template>
    <mt-popup v-model="options.popupVisible" position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
</template>

<script>
export default {
    name: "CommonPop",
    props: {
        options: Object,
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
            ],
        };
    },
    created() {
        this.$bus.on("send1", (val) => {
            console.log(
                "bus滚动下拉组件的获取到的数组",
                this.options.userGamesList
            );
            this.slots[0].values = this.options.userGamesList;
        });
    },
    mounted() {},
    methods: {
        onValuesChange(picker, values) {
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        },
    },
};
</script>

<style lang="stylus" scoped></style>