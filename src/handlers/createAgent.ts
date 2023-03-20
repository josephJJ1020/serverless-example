import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { promises as fs } from "fs";
import getUser from "../services/getUser";
import filePathHelper from "../utils/filePathHelper";

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = event.body as string;

  const parsedBody = JSON.parse(body);

  const { username, pin } = parsedBody;

  let res = { statusCode: 400, body: JSON.stringify({ message: "Error" }) };

  if (!username.length || pin.length !== 4) {
    return res;
  }

  const user_exists = await getUser({ username, pin });

  if (user_exists) {
    res = { ...res, body: JSON.stringify({ message: "User already exists" }) };

    return res;
  }

  const file_path = filePathHelper(username, pin);

  const create_user = await fs.writeFile(
    file_path,
    JSON.stringify({ username, pin })
  );

  res = {
    statusCode: 201,
    body: JSON.stringify({ message: `User ${username} created successfully` }),
  };

  return res;
};
