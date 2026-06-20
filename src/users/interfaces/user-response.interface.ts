import type { User } from "../../generated/prisma/client.js";


export interface ILoginResponse{
  userData: User,
  jwt: string
}