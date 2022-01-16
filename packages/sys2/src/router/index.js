const routes = [
  {
    path: '/example',
    component: () => import('@/views/example'),
  },
  {
    path: '/example2',
    component: () => import('@/views/example2'),
  },
];

export default routes;
