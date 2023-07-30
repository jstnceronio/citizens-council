import type { App } from 'vue';
import { MotionPlugin } from '@vueuse/motion'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



export default (app: App) => {
    app.use(MotionPlugin);
    app.component('font-awesome-icon', FontAwesomeIcon);
};