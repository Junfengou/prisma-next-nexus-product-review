import { objectType, extendType, intArg, stringArg, nonNull, enumType } from "nexus"

export const Review = objectType({
    name: "Review",
    definition(t) {
        t.string('body'),
        t.int('rating'),
        t.string('id'),
        t.string('productId')
    }
})

export const ReviewQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field('reviews', {
            type: Review,
            resolve(_parent, _args, ctx) {
                return ctx.prisma.review.findMany();
            }
        })
    }
})


/*
    id        String   @id @default(uuid())
    user_id   User     @relation(fields: [userId], references: [id])
    userId    String
    product   Product @relation(fields: [productId], references: [id])
    productId String
    rating Int
    body String
*/