import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "remixicon/fonts/remixicon.css";

createApp(App).use(router).mount('#app')

router.beforeEach((to, form, next) => {
    if (to.name === "ControlPanel") {
        const config = {
            baseURL: process.env.VUE_APP_backend_url,
            method: 'get',
            url: '/api/userAccess/userAuth',
            withCredentials: true // 允许携带cookie
        };
        axios(config)
            .then(response => {
                let data = response.data;
                if (data === true) {
                    next();
                } else {
                    next("/");
                    alert("请登录");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {
        next();
    }
})

