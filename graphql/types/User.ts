import { objectType, extendType, intArg, stringArg, nonNull, enumType } from "nexus"
import { resolve } from "path"
import { Review } from "./Review"
export const User = objectType({
    name: "User",
    definition(t) {
        t.string('id')
        t.string('name')
        t.string('email')
        t.string('image')
        t.field('role', {type: Role}),
        t.list.field('reviews',{
          type: Review,
          async resolve(parent, _args, ctx) {
            return await ctx.prisma.user.findUnique({
              where: {
                id: parent.id
              }
            }).reviews()
          }
        })
    }
})


const Role = enumType({
    name: "Role",
    members: ['USER', 'ADMIN']
})


export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field('users', {
            type: User,
            resolve(_parent, _args, ctx) {
                return ctx.prisma.user.findMany();
            }
        })
    }
})

export const UserIDQuery = extendType({
    type: 'Query',
    definition(t) {
      t.nonNull.field('user', {
        type: User,
        args: { id: nonNull(stringArg()) },
        resolve(_parent, args, ctx) {
          const user = ctx.prisma.user.findUnique({
            where: {
              id: args.id,
            },
          });
          return user;
        },
      });
    },
  });