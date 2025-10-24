import * as productApi from "../api/product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export default function Products() {
    const [products, setProducts] = useState([]);

    const [filters, setFilters] = useState({
        q: "",
        category: "",
        sort: "",
    });

    const categories = ["shoes", "furniture", "clothes", "electronics", "cosmetics"];


    const loadProducts = async () => {
        const data = await productApi.fetchProducts(filters);
        setProducts(data);
    };


    useEffect(() => {
        loadProducts();
    }, [filters.category, filters.sort]);

    
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            loadProducts();
        }
    };


    return (
        <div className="mt-10">
            <div className="h-38 bg-primary flex items-center justify-center">
                <div className="">
                    <h1 className="text-3xl font-bold text-center text-white mb-7">Welcome to U-TEST Shop</h1>
                    <h1 className="text-md text-center text-white ">Explore our products</h1>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6 px-10">

                <input
                    type="text"
                    placeholder="Search by name..."
                    className="input input-bordered w-1/3"
                    value={filters.q}
                    onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                    onKeyPress={handleKeyPress}
                />

                <select
                    className="select select-bordered"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                    <option value="">All Categories</option>
                    {
                        categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))
                    }
                </select>

                <select
                    className="select select-bordered"
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                >
                    <option value="">Sort by Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>
            <div className="grid grid-cols-4 gap-4 px-20 mt-6">
                {products.map((p) => (
                    <div key={p.id} className="card p-5 shadow">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover" />
                        <div className="text-center mt-4">
                            <h2 className="font-bold text-md">{p.name}</h2>
                            <p className="mt-2">{p.categoryId}</p>
                            <p className="mt-2">${p.price}</p>
                            <Link
                                to={`/products/${p.id}`}
                                className="btn btn-primary mt-3"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}