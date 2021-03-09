<template>
    <div class="mask" @click="closeDialog" v-if="options.isMask"></div>
</template>

<script>
export default {
    name: "CommonMask",
    props:{
        options:Object
    },
    methods: {
        closeDialog: function() {
            this.$emit('closeDialog');
        }
    }
};
</script>

<style lang="stylus" scoped>

</style>