import { promises as fs, Stats } from "fs";
import filePathHelper from "../utils/filePathHelper";

interface User {
  username: String;
  pin: String;
}

export default async (user: User): Promise<User | Boolean> => {
  const { username, pin } = user;

  const file_path = filePathHelper(username, pin);

  type xdd = Stats | null;

  let userExists: xdd = null;

  try {
    userExists = await fs.stat(file_path);
  } catch (e) {
    userExists = null;
  }

  if (userExists) {
    const user = await fs.readFile(file_path, { encoding: "utf-8" });

    return JSON.parse(user);
  }

  return false;
};
