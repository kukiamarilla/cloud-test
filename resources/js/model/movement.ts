import { Category } from "./category";

export interface Movement {
    id: number;
    date: string;
    amount: number;
    category: Category;
    type: string;
    description: string;
    created_at: string;
    updated_at: string;
}