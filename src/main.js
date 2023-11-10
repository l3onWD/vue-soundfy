// Vue
import { createApp } from 'vue'
import App from './App.vue'

// Router
import { router } from './router/';

// Pinia
import { createPinia } from 'pinia'

// Custom Directives
import { clickOutside } from '@/directives/';


// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHouse, faSearch, faBook, faPlay, faBackwardStep, faForwardStep, faVolumeHigh, faVolumeLow, faVolumeMute, faHeart as fasHeart, faPause, faRepeat, faList, faTimes, faTrash, faSpinner, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

library.add(faHouse, faSearch, faBook, faPlay, faBackwardStep, faForwardStep, faVolumeHigh, faVolumeLow, faVolumeMute, fasHeart, farHeart, faPause, faRepeat, faList, faTimes, faTrash, faSpinner, faArrowLeft);


// Init Vue
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.directive('click-outside', clickOutside);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
