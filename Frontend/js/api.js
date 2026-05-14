/**
 * SkillSync API Configuration
 * Dynamically switches between local development and production (Render).
 */
const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000/api" 
  : "https://skillsync-backend.onrender.com/api";

// Local Storage Management
function setToken(token) { localStorage.setItem("token", token); }
function getToken() { return localStorage.getItem("token"); }
function setUser(user) { localStorage.setItem("user", JSON.stringify(user)); }
function getUser() { 
  const u = localStorage.getItem("user"); 
  try {
    return u ? JSON.parse(u) : null; 
  } catch (e) {
    return null;
  }
}

const Auth = {
  logout: function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
  }
};

/**
 * Universal API Request Handler
 * Automatically handles JSON parsing, Authorization headers, and error catching.
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...options.headers
    }
  };

  try {
    const res = await fetch(url, config);
    
    // Handle 401 Unauthorized (Expired Token)
    if (res.status === 401) {
      Auth.logout();
      throw new Error("Session expired. Please log in again.");
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || "Request failed");
    }

    return await res.json();
  } catch (error) {
    console.error(`❌ API Error [${endpoint}]:`, error.message);
    throw error;
  }
}