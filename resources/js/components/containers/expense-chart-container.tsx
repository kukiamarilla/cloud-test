import { Movement } from "@/model/movement";
import { ExpenseChart } from "../custom/expense-chart"
import { useEffect, useState } from "react";
import { listMovements } from "@/service/movements";

interface DateExpense {
    date: string;
    amount: number;
}

export const ExpenseChartContainer = () => {
    const [expenses, setExpenses] = useState<DateExpense[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        listMovements({
            page: 1,
            per_page: 1000,
            date_from: '2025-07-01',
            date_to: '2025-07-31',
            type: 'expense',
        }).then((data) => {
            const today = new Date();
            const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            const expenses = data.data;
            const dateExpenses: DateExpense[] = [];
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(today.getFullYear(), today.getMonth(), i);
                const dateStr = date.toISOString().split('T')[0];
                const amount = expenses.filter((movement: Movement) => movement.date.slice(0, 10) === dateStr).reduce((acc: number, movement: Movement) => acc + movement.amount, 0);
                dateExpenses.push({ date: dateStr, amount });
            }
            setExpenses(dateExpenses);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <ExpenseChart expenses={expenses} />
        </div>
    )
}