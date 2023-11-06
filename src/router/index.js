import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import MediaDetailPage from '@/pages/MediaDetailPage.vue';
import SearchPage from '@/pages/SearchPage.vue';


const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes: [
        { path: '/', name: 'home', component: HomePage },

        { path: '/playlists/:id', name: 'playlist-detail', component: MediaDetailPage },
        { path: '/albums/:id', name: 'album-detail', component: MediaDetailPage },
        { path: '/tracks/:id', name: 'track-detail', component: MediaDetailPage },

        { path: '/search', name: 'search', component: SearchPage },

        { path: '/:pathMatch(.*)*', redirect: '/' },
    ]
});

export { router };