import { User } from "./user";

export interface Auth {
    token: string;
    expiresAt: number;
    user: User;
}