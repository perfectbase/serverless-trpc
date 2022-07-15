import { NextApiHandler } from 'next'
import { appRouter } from '../../../../sls/src/functions/trpc/routers'
import { nextHandler } from 'trpc-playground/handlers/next'

const setupHandler = nextHandler({
  router: appRouter,
  // tRPC api path, pages/api/trpc/[trpc].ts in this case
  trpcApiEndpoint: 'http://localhost:4000/api/trpc',
  playgroundEndpoint: '/api/trpc-playground',
  // uncomment this if you're using superjson
  // request: {
  //   superjson: true,
  // },
})

const handler: NextApiHandler = async (req, res) => {
  const playgroundHandler = await setupHandler
  await playgroundHandler(req, res)
}

export default handler