import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Handler } from "aws-lambda";

export type HandlerResponse = {
  message: string;
};

export const sayHello = (): string => {
  return "Hello, Lambda!";
};

const dynamoDBClient = new DynamoDBClient({ region: "eu-central-1" });

export const handler: Handler = async (): Promise<HandlerResponse> => {
  const putItemCommand = new PutItemCommand({
    Item: {
      Test: {
        BOOL: true,
      },
    },
    TableName: process.env.TABLE_NAME,
  });

  try {
    await dynamoDBClient.send(putItemCommand);
  } catch (error) {
    throw error;
  }

  return {
    message: sayHello(),
  };
};
