import { PrismaClient } from "@prisma/client"
import { products } from "../data/products"

// Change this base on your model format in Prisma

const prisma = new PrismaClient();

export const main = async () => {
/*   await prisma.user.create({
    data: {
      email: 'junfengou@gmail.com',
      role: 'ADMIN',
    },
  }); */
  
  await prisma.review.createMany({
    data: [
      {
      rating: 2,
      body: "Bruh",
      productId: "b15420b9-9254-4ea9-9eb1-453966c7c870",
      userId: "9c3e03a4-f73b-4f4a-a3d1-1b6e3c03db98"
    },
    {
      rating: 1,
      body: "This sucks",
      productId: "b15420b9-9254-4ea9-9eb1-453966c7c870",
      userId: "9c3e03a4-f73b-4f4a-a3d1-1b6e3c03db98"
    },
  ]
  });

/*   await prisma.product.createMany({
    data: products,
  }); */
}

// Won't work if the main function is not called lol
main()
.catch((e) => {
    console.error(e);
    process.exit(1);
  })
.finally(async () => await prisma.$disconnect);