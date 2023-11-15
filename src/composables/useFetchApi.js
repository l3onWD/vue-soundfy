import { ref, computed } from 'vue';
import axios from 'axios';

// Axios global settings
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

// Global state
const activeRequests = ref(0);


export default function useFetchApi(loader = true) {

    // Loading state
    const isLoading = computed(() => Boolean(activeRequests.value));

    // Get request
    const makeGetRequest = async (endpoint, params, responseType = 'json') => {

        try {
            // Update global loading state
            if (loader) activeRequests.value++;

            // Make axios get request
            const response = await apiClient.get(endpoint, { params, responseType });

            // Remove this request from loading state
            if (loader) activeRequests.value--;

            return response;

        } catch (err) {

            // Remove this request from loading state
            if (loader) activeRequests.value--;

            // Check if is a network error [0] or there is a status code
            const status = err.response ? err.response.status : 0;

            throw status;

        }

    }

    return { isLoading, makeGetRequest };
}