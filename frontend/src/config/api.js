const configuredBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const API_BASE_URL = /\/api$/i.test(configuredBaseUrl)
  ? configuredBaseUrl
  : `${configuredBaseUrl}/api`;

export default API_BASE_URL;
