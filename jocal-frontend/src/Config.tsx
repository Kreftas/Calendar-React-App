import { IUser } from "./app/model/user/UserModel";

// Change whether backend is active
const ActiveBackendUser = null
const NoBackendUser = { username: "Guest" }
export const DEFUALTUSER: IUser | null = NoBackendUser

// Change to whatever the backend is
export const HOST = "http://localhost:"
export const PORT = "5000"