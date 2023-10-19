// Vue
import { createApp } from 'vue'
import App from './App.vue'


// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHouse, faSearch, faBook, faPlay, faBackwardStep, faForwardStep, faVolumeHigh, faVolumeLow, faVolumeMute, faHeart as fasHeart, faPause, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

library.add(faHouse, faSearch, faBook, faPlay, faBackwardStep, faForwardStep, faVolumeHigh, faVolumeLow, faVolumeMute, fasHeart, farHeart, faPause, faRepeat);


// Init Vue
const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
