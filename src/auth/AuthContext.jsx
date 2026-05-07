import { createContext, useContext, useState } from "react";

const API = import.meta.env.VITE_API;

const AuthContext = createContext();

function getApiUrl() {
  if (!API) {
    throw Error("Missing VITE_API. Add it to your .env file.");
  }

  return API;
}

async function readResponse(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  const register = async (credentials) => {
    const response = await fetch(`${getApiUrl()}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await readResponse(response);
    if (!response.ok) {
      throw Error(result.message || "Registration failed.");
    }
    setToken(result.token);
  };

  const login = async (credentials) => {
    const response = await fetch(`${getApiUrl()}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await readResponse(response);
    if (!response.ok) {
      throw Error(result.message || "Login failed.");
    }
    setToken(result.token);
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth must be used within AuthProvider");
  }
  return context;
}
