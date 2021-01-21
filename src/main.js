import { createApp } from 'vue'
import router from './router'
import App from './App.vue'		//component App : component utama yang menampung beberapa halaman web vue js

//mengimport Boostsrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)

app.use(router)
app.mount('#app')

