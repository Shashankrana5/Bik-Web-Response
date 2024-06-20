import jwt from "jsonwebtoken";

// sign jwt
export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, process.env.AUTH_PRIVATE_KEY!, { algorithm: "RS256", expiresIn });
}

// verify jwt
export function verifyJWT(token: string) {
  try {
``
    const decoded = jwt.verify(token, process.env.AUTH_PUBLIC_KEY!);
    return { payload: decoded, expired: false };
  } catch (error) {
    //@ts-ignore
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
}
