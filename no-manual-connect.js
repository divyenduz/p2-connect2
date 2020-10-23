const { PrismaClient } = require('@prisma/client')

const prisma1 = new PrismaClient()
const prisma2 = new PrismaClient()

// 1. To be run with a Prisma version that doesn't auto connect i.e. @prisma/client@2.10.0-dev.30 or lower
// 2. To be run with a Prisma version that doesn't auto connect i.e. @prisma/client@2.10.0-dev.31 or higher
async function main() {
  const SLEEP = 20

  await prisma1.$connect()
  console.log(`1st connect`)
  prisma1
    .$executeRaw(`SELECT pg_sleep(${SLEEP});`)
    .then(() => {
      console.log('1st query returned')
    })
    .catch((e) => {
      console.log('1st query errored', e.toString())
    })
  console.log(`1st sleep ${SLEEP} query sent async`)

  await prisma2.$connect()
  console.log(`2nd connect`)
  prisma2
    .$executeRaw(`SELECT pg_sleep(${SLEEP});`)
    .then(() => {
      console.log('2nd query returned')
    })
    .catch((e) => {
      console.log('2nd query errored', e.toString())
    })
  console.log(`2nd sleep ${SLEEP} query sent async`)
}

main()
