import { Movement } from "@/model/movement";
import { ExpenseChart } from "../custom/expense-chart"
import { useEffect, useState } from "react";
import { listMovements } from "@/service/movements";
import { DatePicker } from "../ui/date-picker";

interface DateExpense {
    date: string;
    amount: number;
}

export const ExpenseChartContainer = () => {
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);

    const [expenses, setExpenses] = useState<DateExpense[]>([]);
    const [dateFrom, setDateFrom] = useState<Date>(monthAgo);

    const handlePeriodChange = (period: string) => {
        const daysLessMap = {
            "1W": 7,
            "1M": 30,
            "3M": 90,
            "6M": 180,
            "1Y": 365,
        }
        const daysLess = daysLessMap[period as keyof typeof daysLessMap];
        const dateFrom = new Date();
        dateFrom.setDate(dateFrom.getDate() - daysLess);
        setDateFrom(dateFrom);
    }

    useEffect(() => {
        listMovements({
            page: 1,
            per_page: 1000,
            date_from: dateFrom.toISOString(),
            type: 'expense',
        }).then((data) => {
            const expenses = data.data;
            const dateExpenses: Map<string, number> = new Map();
            const today = new Date();
            while (dateFrom.toISOString().split('T')[0] <= today.toISOString().split('T')[0]) {
                const date = dateFrom.toISOString().split('T')[0];
                dateExpenses.set(date, 0);
                dateFrom.setDate(dateFrom.getDate() + 1);
            }
            expenses.forEach((expense: Movement) => {
                const date = expense.date.slice(0, 10);
                const dateAmount = dateExpenses.get(date) || 0;
                dateExpenses.set(date, dateAmount + expense.amount);
            });
            const dateExpensesArray: DateExpense[] = [];
            dateExpenses.forEach((amount, date) => {
                dateExpensesArray.push({ date, amount });
            });
            dateExpensesArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setExpenses(dateExpensesArray);
        });
    }, [dateFrom]);

    return (
        <div>
            <ExpenseChart expenses={expenses} onPeriodChange={handlePeriodChange} />
        </div>
    )
}