<template>
<transition name="slide-fade">
  <div class="mask_nav" @click="closeDialog" v-if="isNavMask"></div>
  </transition>
</template>

<script>
export default {
  name: "NavMask",
  props: {
    options: Object,
  },
  computed: {
        isNavMask: function () {
            return this.$store.state.isNavMask;
        }
    },
  methods: {
    closeDialog: function () {
        this.$store.commit("setIsNavMask", false);
        this.$store.commit("setIsHermsLogin", false);
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
.mask_nav {
  background: rgba(0, 0, 0, 0.65);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 109;
  text-align: center;
  cursor: pointer;
}
</style>