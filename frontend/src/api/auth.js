import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (payload) => {
  // console.log(payload)
  try {
    const res = await axios.post(`${API_URL}/register`, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    alert("Registration successful!");
    return res.data;
  } catch (err) {
    console.error(err);
    alert(`${err.response?.data?.error || "Registration failed."}`);
  }
};

export const loginUser = async (payload) => {
  try {
    const res = await axios.post(`${API_URL}/login`, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    alert("Login successful!");
    return res.data;

  } catch (err) {
    console.error(err);
    alert(`${err.response?.data?.error || "Login failed."}`);
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(`${API_URL}/logout`, {}, {
      withCredentials: true,
    });
    alert("Logged out successfully!");
    return res.data;
  } catch (err) {
    console.error(err);
    alert(`${err.response?.data?.error || "Logout failed."}`);
  }
};

export const getProfile = async () => {
  try {
    const res = await axios.get(`${API_URL}/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("something went wrong", error)
  }
};
