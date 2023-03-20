import { PathLike } from "fs";

export default (username: String, pin: String): PathLike => {
  return `public/agents/${username
    .trim()
    .toLowerCase()
    .split(" ")
    .join("_")}_${pin}.json`;
};
