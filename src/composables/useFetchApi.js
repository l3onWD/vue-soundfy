import { ref, computed } from 'vue';
import axios from 'axios';

// Axios global settings
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

// Global state
const activeRequests = ref(0);

export default function useFetchApi() {

    // Loading state
    const isLoading = computed(() => Boolean(activeRequests.value));

    // Get request
    const makeGetRequest = async (endpoint, params) => {

        // Update global state
        activeRequests.value++;

        // Make axios get request
        try {
            const { data } = await apiClient.get(endpoint, { params });
            return data;
        } catch (err) {
            console.error(err);
        } finally {
            // Update global state
            activeRequests.value--;
        }
    }

    return { isLoading, makeGetRequest };
}