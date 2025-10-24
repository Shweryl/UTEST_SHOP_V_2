import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const orderSubmit = async (payload) => {
  try {
    const res = await axios.post(API_URL, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    alert("Order placed successfully!");
    return res.data;
  } catch (err) {
    console.error(err);
    alert(err.response.data.error); 
  }
};

export const fetchOrders = async () => {
  try {
    const res = await axios.get(`${API_URL}/my-orders`, {
      withCredentials: true,
    });

    return res;
  } catch (err) {
    console.error("Error fetching orders:", err);
  } 
};
