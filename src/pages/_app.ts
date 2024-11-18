import type { App } from 'vue';
import { MotionPlugin } from '@vueuse/motion'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default (app: App) => {
    app.use(MotionPlugin);
    app.component('font-awesome-icon', FontAwesomeIcon);
};