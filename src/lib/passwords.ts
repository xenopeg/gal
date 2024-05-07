import { pbkdf2, randomBytes } from "crypto";

export default async function getHash(
  password: string,
  salt: string,
  iterations: number
): Promise<string> {
  return new Promise((res, rej) => {
    pbkdf2(password, salt, iterations, 64, "sha512", (err, derivedKey) => {
      if (err) rej(err);
      res(derivedKey.toString("hex")); // '3745e48...08d59ae'
    });
  });
}

export function getSalt() {
  return "saltyboie:" + randomBytes(128).toString("base64");
}

export const ITERATIONS = 10000;
