/**
 * A custom fetch wrapper that automatically adds the
 * Authorization header with the JWT token from localStorage.
 * It also handles 401 Unauthorized errors by logging the user out.
 *
 * @param {string} url The API endpoint (e.g., '/api/dashboard/stats')
 * @param {object} options The options for the fetch call (method, body, etc.)
 * @returns {Promise<Response>} The fetch response
 */
const apiClient = async (url, options = {}) => {
  // 1. Get the token from localStorage
  const token = localStorage.getItem('token');

  // 2. Prepare the headers
  const headers = new Headers(options.headers || {});
  
  // 3. Add the token if it exists
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  // 4. IMPORTANT: If the body is FormData, do NOT set Content-Type.
  // The browser must set it automatically to include the 'boundary'
  if (!(options.body instanceof FormData)) {
    // Only set Content-Type if it's not a file upload
    if (!headers.has('Content-Type')) {
        headers.append('Content-Type', 'application/json');
    }
  }

  // 5. Merge headers into options
  const fetchOptions = {
    ...options,
    headers,
  };

  // 6. Make the fetch call
  const response = await fetch(url, fetchOptions);

  // 7. Check for 401 Unauthorized (e.g., expired token)
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

