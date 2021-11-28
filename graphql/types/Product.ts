import { objectType, extendType, intArg, stringArg, nonNull } from "nexus"
import { Review } from "./Review"

export const Product = objectType({
    name: "Product",
    definition(t) {
      // Definitions are just the fields you want to display in GraphQL playground
        t.string('id')
        t.string('name')
        t.string('photoLink')
        t.string('description')
        t.int('price'),
        t.list.field('reviews', {
          type: Review, // return type
          async resolve(parent, _args, ctx) {
            return await ctx.prisma.product.findUnique({where: {id: parent.id}}).reviews()
          }
        })
    }
})

export const ProductQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field('products', {
            type: Product,
            resolve(_parent, _args, ctx) {
                return ctx.prisma.product.findMany();
            }
        })
    }
})


export const ProductIDQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.field('product', {
        type: Product,
        args: { id: nonNull(stringArg()) },
        resolve(_parent, args, ctx) {
          const product = ctx.prisma.product.findUnique({
            where: {
              id: args.id,
            },
          });
          return product;
        },
      });
    },
  });
  