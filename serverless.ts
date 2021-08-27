import type { AWS } from "@serverless/typescript";
import type { Lift } from "serverless-lift";

const serverlessConfiguration: AWS & Lift = {
  constructs: {
    liftSingleTable: {
      type: "database/dynamodb-single-table",
    },
    adyenWebhookEndpoint: {
      authorizer: {
        handler: "bin/adyenAuthorizer.handler",
      },
      path: "/adyen-webhook",
      type: "webhook",
    },
  },
  frameworkVersion: "2",
  functions: {
    writeToDatabase: {
      handler: "bin/writeToDatabase.handler",
      environment: {
        TABLE_NAME: "${construct:liftSingleTable.tableName}",
      },
    },
  },
  provider: {
    lambdaHashingVersion: "20201221",
    name: "aws",
    runtime: "nodejs14.x",
  },
  plugins: ["serverless-lift"],
  service: "try-lift",
};

module.exports = serverlessConfiguration;
