/**
 
 * @param {string} url The API endpoint (e.g., '/auth/login')
 * @param {object} options The options for the fetch call (method, body, etc.)
 * @returns {Promise<Response>} The fetch response
 */

// 1. Read the Base URL from your Netlify environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

// This is a failsafe in case the variable is missing during local development
if (!BASE_URL && import.meta.env.MODE === 'production') {
  console.error("CRITICAL ERROR: VITE_API_URL is not defined. API calls will fail.");
}

const apiClient = async (url, options = {}) => {
  // 2. Create the full, absolute URL for the API request
  // e.g., "https://.../api" + "/auth/login"
  const fullUrl = `${BASE_URL}${url}`;

  // 3. Get the token from localStorage
  const token = localStorage.getItem('token');

  // 4. Prepare the headers
  const headers = new Headers(options.headers || {});

  // 5. Add the token if it exists
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  // 6. IMPORTANT: If the body is FormData, do NOT set Content-Type.
  // The browser must set it automatically to include the 'boundary'
  if (!(options.body instanceof FormData)) {
    // Only set Content-Type if it's not a file upload
    if (!headers.has('Content-Type')) {
      headers.append('Content-Type', 'application/json');
    }
  }

  // 7. Merge headers into options
  const fetchOptions = {
    ...options,
    headers,
  };

  // 8. Make the fetch call to the *fullUrl*
  const response = await fetch(fullUrl, fetchOptions);

  // 9. Check for 401 Unauthorized (e.g., expired token)
  if (response.status === 401) {
    // Clear the token and force a reload to the login page
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
    // Throw an error to stop the original component from processing
    throw new Error("Session expired. Please log in again.");
  }

  return response;
};

export default apiClient;