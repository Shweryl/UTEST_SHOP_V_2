

import * as productModel from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const { q, category, sort } = req.query;
    const products = await productModel.getAllProducts(q, category, sort);
    res.json(products);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


export const getProductById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        const product = await productModel.getProductById(id);

        if (!product) return res.status(404).json({ error: "Product not found" });

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};
