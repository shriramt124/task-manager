import { PrismaClient } from '@prisma/client'

let prisma:PrismaClient 

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    //@ts-expect-error "it may not be bug"
    if (!global.prisma) {
      //@ts-expect-error "it may not be bug"
        global.prisma = new PrismaClient()
    }
     //@ts-expect-error "it may not be bug"
    prisma = global.prisma
}
 
export default prisma;



 