import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import getUser from "../services/getUser";

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let res = {
    statusCode: 400,
    body: JSON.stringify({ message: "User not found." }),
  };

  console.log(event.queryStringParameters)

  const { username, pin } = JSON.parse(event.body as string);

  const userExists = await getUser({ username, pin });

  if (userExists) {
    res = { statusCode: 200, body: JSON.stringify(userExists) };

    return res;
  }

  return res;
};
