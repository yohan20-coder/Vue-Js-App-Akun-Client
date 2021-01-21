import { createRouter, createWebHistory } from 'vue-router'

const routes = [
        {
             // Membuat Route alamat url untuk index
            path : '/',
            name : 'transaction.index',
            component : () => import("../views/transaction/Index.vue")
        },

        {
            //Membuat Route alamat url untuk create
           path : '/create',
           name : 'transaction.create',
           component : () => import("../views/transaction/Create.vue")
       },

       {
            //Membuat Route alamat url untuk create
        path : '/edit/:id',
        name : 'transaction.edit',
        component : () => import("../views/transaction/Edit.vue")
       }
 
];

//membuat route menjadi aktif
  const router = createRouter({
      history : createWebHistory(),
      routes
  });

  export default router;