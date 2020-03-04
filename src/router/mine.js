export default [
  {
    path: 'myAddress',
    name: 'myAddress',
    component: () => import(/* webpackChunkName: "myAddress" */ './../views/myAddress.vue'),
    children: [
      {
        path: "newAddr",
        name: "newAddr",
        component: () => import( /* webpackChunkName: "newAddr" */ "./../views/newAddr.vue"),
      },
      {
        path: "newAddr/:addrId",
        name: "newAddr",
        props: true,
        component: () => import( /* webpackChunkName: "newAddr" */ "./../views/newAddr.vue"),
      }
    ]
  }
]