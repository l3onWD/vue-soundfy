// Vue
import { createApp } from 'vue'
import App from './App.vue'


// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHouse, faSearch, faBook, faPlay, faBackwardStep, faForwardStep, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

library.add(faHouse, faSearch, faBook, faPlay, faBackwardStep, faForwardStep, faVolumeHigh);


// Init Vue
const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
