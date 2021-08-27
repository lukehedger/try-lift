import { Handler } from "aws-lambda";

type HandlerResponse = {
  isAuthorized: boolean;
};

const authorizeRequest = (): boolean => {
  return true;
};

export const handler: Handler = async (): Promise<HandlerResponse> => {
  const isAuthorized = authorizeRequest();

  return {
    isAuthorized: isAuthorized,
  };
};
