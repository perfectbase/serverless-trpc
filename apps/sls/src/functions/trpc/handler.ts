import { Context, Handler } from "aws-lambda";
import serverlessExpress from "@vendia/serverless-express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { expressHandler } from "trpc-playground/handlers/express";
import { AppRouter, appRouter } from "./routers";

let serverlessExpressInstance: any;
const app = express();
app.use(cors());

const trpcApiEndpoint = "/trpc";
const playgroundEndpoint = "/trpc-playground";

app.use(
  trpcApiEndpoint,
  trpcExpress.createExpressMiddleware<AppRouter>({
    router: appRouter,
  })
);

async function setup(event: unknown, context: Context) {
  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint,
      playgroundEndpoint,
      router: appRouter,
      renderOptions: {
        cdnUrl: "http://localhost:45245",
        version: null,
      },
    })
  );
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

export const main: Handler = (event, context) => {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  return setup(event, context);
};

// export const main = serverlessExpress({ app });
