import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as productApi from "../api/product.js";
import { useCart } from "../contexts/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart(); 

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productApi.fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-10 flex justify-center mt-7">
      <div className="w-3/4">
        <button onClick={() => navigate(-1)} className="btn btn-outline mb-5">
          ← Back to Products
        </button>

        <div className="grid grid-cols-2 gap-10">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
          <div>
            <h1 className="text-4xl font-bold text-primary mb-3">{product.name}</h1>
            <p className="text-lg mb-4 text-gray-700">Category: {product.category}</p>
            <p className="text-xl font-semibold mb-4 text-primary">${product.price}</p>
            <p className="text-gray-600 mb-4">In stock: {product.stock}</p>

            <div className="flex items-center gap-3">
              <button
                className="btn btn-outline"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
