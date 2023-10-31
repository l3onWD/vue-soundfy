import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import PlaylistDetailPage from '@/pages/PlaylistDetailPage.vue';


const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes: [
        { path: '/', name: 'home', component: HomePage },
        { path: '/playlists/:id', name: 'playlist-detail', component: PlaylistDetailPage },

        { path: '/:pathMatch(.*)*', redirect: '/' },
    ]
});

export { router };