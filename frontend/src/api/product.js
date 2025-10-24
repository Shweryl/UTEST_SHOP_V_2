import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const fetchProducts = async (filters) => {
    try {
        const params = new URLSearchParams(filters).toString();
        const res = await fetch(`${API_URL}?${params}`);
        return res.json();
    } catch (err) {
        console.error("Failed to fetch products:", err);
        return [];
    }
};

export const fetchProductById = async (id) => {

    try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        return data;
    } catch (err) {
        console.error(`Failed to fetch product with id ${id}:`, err);
        return null;
    }
};
