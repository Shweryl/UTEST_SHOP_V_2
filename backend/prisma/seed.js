import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Running Shoes",
        price: 19.99,
        category: "shoes",
        stock: 20,
        imageUrl: "http://localhost:5000/images/shoe_2.jpg",
      },
      {
        name: "Living room furniture",
        price: 1229.99,
        category: "furniture",
        stock: 40,
        imageUrl: "http://localhost:5000/images/furniture_1.jpg",
      },
      {
        name: "Skincare Set",
        price: 129.99,
        category: "cosmetics",
        stock: 100,
        imageUrl: "http://localhost:5000/images/cosmetic_1.jpg",
      },
      {
        name: "Walking Shoes",
        price: 29.99,
        category: "shoes",
        stock: 145,
        imageUrl: "http://localhost:5000/images/shoe_1.png",
      },
      {
        name: "Luxury Sofa",
        price: 1529.99,
        category: "furniture",
        stock: 50,
        imageUrl: "http://localhost:5000/images/furniture_2.jpg",
      },
      {
        name: "Blush Set",
        price: 110.99,
        category: "cosmetics",
        stock: 15,
        imageUrl: "http://localhost:5000/images/cosmetic_2.jpg",
      },
    ],
  });
  console.log("Seeded products successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
