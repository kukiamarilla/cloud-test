import { Category } from "./category";

export interface Grouper {
    id: number;
    name: string;
    categories: Category[];
    created_at: string;
    updated_at: string;
}