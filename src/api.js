// Central API base URL config
// In development: Vite proxies /api → localhost:5000 (no prefix needed)
// In production: use the live Render backend URL via env variable
const API_BASE = import.meta.env.VITE_API_URL || ''

export default API_BASE
