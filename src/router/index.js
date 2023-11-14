import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import MediaDetailPage from '@/pages/MediaDetailPage.vue';
import SearchPage from '@/pages/SearchPage.vue';
import ErrorPage from '@/pages/ErrorPage.vue';


const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes: [
        // Home
        { path: '/', name: 'home', component: HomePage },

        // Media
        {
            path: '/playlists/:id',
            name: 'playlist-detail',
            component: MediaDetailPage,
            props: (route) => ({
                id: route.params.id,
                mediaType: 'playlist'
            })
        },
        {
            path: '/albums/:id',
            name: 'album-detail',
            component: MediaDetailPage,
            props: (route) => ({
                id: route.params.id,
                mediaType: 'album'
            })
        },
        {
            path: '/tracks/:id',
            name: 'track-detail',
            component: MediaDetailPage,
            props: (route) => ({
                id: route.params.id,
                mediaType: 'track'
            })
        },

        // Search
        {
            path: '/search',
            name: 'search',
            component: SearchPage,
            props: (route) => ({
                searchedTerm: route.query.title || '',
            })
        },

        // Errors
        {
            path: '/error',
            name: 'error',
            component: ErrorPage,
            props: (route) => ({
                code: route.query.code || ''
            })
        },

        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});

export { router };