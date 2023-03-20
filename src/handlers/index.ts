import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  const x = { hello: "World", id, input: event };

  return { statusCode: 200, body: JSON.stringify(x) };
};

export const hello: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello world" }),
  };
};
