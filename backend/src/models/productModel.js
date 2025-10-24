import prisma from "../db.js";

export const getAllProducts = async (q, category, sort) => {
  let where = {};
  if (q) {
    where.name = { contains: q };
  }
  if (category) {
    where.category = category;
  }

  const orderBy = sort
    ? { price: sort === 'asc' ? 'asc' : 'desc' }
    : undefined;

  return await prisma.product.findMany({
    where,
    orderBy,
  });
}

export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id: id },
  });
}

export const getProductsForOrder = async (productIds) => {
  return await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true, stock: true, price: true },
  });
}