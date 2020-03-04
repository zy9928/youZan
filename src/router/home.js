// import Banner from "./../views/bannerPage.vue";
export default  [
  {
    path: "banner/:id",
    name: "banner",
    props: true,
    component: () => import(/* webpackChunkName: "banner" */ '../views/bannerPage.vue')
  },
  {
    path: "shopeCont/:id",
    name: "shopeCont",
    props: true,
    component: () => import(/* webpackChunkName: "shopeCont" */ '../views/shopeCont.vue'),
    children: [
      {
        path: 'goNext',
        name: "goNext",
        props: true,
        component: () => import(/* webpackChunkName: "goNext" */ '../views/goNext.vue'),
      }
    ]
  }
]