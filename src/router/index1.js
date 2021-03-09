import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'pcHome',
        component: () => import('../views/pc/Home.vue')
    },
    {
        path: '/pc/home',
        name: 'pcHome',
        component: () => import('../views/pc/Home.vue')
    },
    {
        path: '/memberCenter',
        name: 'pcMemberCenter',
        component: () => import('../views/pc/MemberCenter.vue')
    },
    {
        path: '/memberCenter?type=register',
        name: 'pcMemberCenter',
        component: () => import('../views/pc/MemberCenter.vue')
    },
    {
        path: '/memberCenter?type=forgetPassword',
        name: 'pcMemberCenter',
        component: () => import('../views/pc/MemberCenter.vue')
    },
    {
        path: '/memberCenter?type=formDownload',
        name: 'pcMemberCenter',
        component: () => import('../views/pc/MemberCenter.vue')
    },
    {
        path: '/memberCenter/:rid',
        name: 'pcMemberCenter',
        component: () => import('../views/pc/MemberCenter.vue')
    },
    {
        path: '/gameStoreCenter',
        name: 'pcGameStoreCenter',
        meta: {
            requireAuth: true,
        },
        component: () => import('../views/pc/StoreCentrer.vue')
    },
    {
        path: '/customerCenter',
        name: 'pcCustomerCenter',
        component: () => import('../views/pc/CustomerCenter.vue')
    },
    {
        path: '/customerCenter?id=1',
        name: 'pcCustomerCenter',
        component: () => import('../views/pc/CustomerCenter.vue')
    },
    {
        path: '/customerCenter?id=2',
        name: 'pcCustomerCenter',
        component: () => import('../views/pc/CustomerCenter.vue')
    },
    {
        path: '/customerCenter?id=3',
        name: 'pcCustomerCenter',
        component: () => import('../views/pc/CustomerCenter.vue')
    },
	{
        path: '/customerCenter?id=companyInfo',
        name: 'pcCustomerCenter',
        component: () => import('../views/pc/CustomerCenter.vue')
    },
    {
        path: '/mobile/home',
        name: 'mbHome',
        component: () => import('../views/mobile/Home.vue')
    },
    {
        path: '/mobile/memberCenter',
        name: 'mbMemberCenter',
        component: () => import('../views/mobile/MemberCenter.vue')
    },
    {
        path: '/mobile/memberCenter?type=register',
        name: 'mbMemberCenter',
        component: () => import('../views/mobile/MemberCenter.vue')
    },
    {
        path: '/mobile/memberCenter?type=forgetPassword',
        name: 'mbMemberCenter',
        component: () => import('../views/mobile/MemberCenter.vue')
    },
    {
        path: '/mobile/memberCenter?type=formDownload',
        name: 'mbMemberCenter',
        component: () => import('../views/mobile/MemberCenter.vue')
    },
    {
        path: '/mobile/gameStoreCenter',
        name: 'mbGameStoreCenter',
        meta: {
            requireAuth: true,
        },
        component: () => import('../views/mobile/StoreCentrer.vue')
    },
    {
        path: '/mobile/customerCenter',
        name: 'mbCustomerCenter',
        component: () => import('../views/mobile/CustomerCenter.vue')
    },
    {
        path: '/mobile/memberCenter?type=register',
        name: 'mbMemberCenter',
        component: () => import('../views/mobile/MemberCenter.vue')
    },
    {
        path: '/mobile/memberCenter?type=forgetPassword',
        name: 'mbMemberCenter',
        component: () => import('../views/mobile/MemberCenter.vue')
    }
]

const router = new VueRouter({
    routes,
    linkExactActiveClass: 'current'
})

export default router