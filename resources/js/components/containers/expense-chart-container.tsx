import { Movement } from "@/model/movement";
import { ExpenseChart } from "../custom/expense-chart"
import { useEffect, useState } from "react";
import { listMovements } from "@/service/movements";
import { DatePicker } from "../ui/date-picker";
import { Grouper } from "@/model/grouper";
import { listGrouper, listMovementsByGrouper } from "@/service/grouper";

interface DateExpense {
    date: string;
    amount: number;
}

export const ExpenseChartContainer = () => {
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);

    const [groupers, setGroupers] = useState<Grouper[]>([]);
    const [movements, setMovements] = useState<Movement[]>([]);
    const [expenses, setExpenses] = useState<DateExpense[]>([]);
    const [dateFrom, setDateFrom] = useState<Date>(monthAgo);
    const [currentGrouperId, setCurrentGrouperId] = useState<number>(0);

    const handleGrouperChange = (grouperId: number) => {
        setCurrentGrouperId(grouperId);
    }

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
        if(currentGrouperId && currentGrouperId !== 0) {
            listMovementsByGrouper(currentGrouperId, dateFrom.toISOString(), dateFrom.toISOString()).then((data) => {
                setMovements(data);
            });
        }
    }, [currentGrouperId, dateFrom]);

    useEffect(() => {
        listMovements({
            page: 1,
            per_page: 1000,
            date_from: dateFrom.toISOString(),
            type: 'expense',
        }).then((data) => {
            setMovements(data.data);
        });
    }, [dateFrom]);

    useEffect(() => {
        const dateExpenses: Map<string, number> = new Map();
        const today = new Date();
        const cursor = new Date(dateFrom);
        while (cursor.toISOString().split('T')[0] <= today.toISOString().split('T')[0]) {
            const date = cursor.toISOString().split('T')[0];
            dateExpenses.set(date, 0);
            cursor.setDate(cursor.getDate() + 1);
        }
        movements.forEach((movement: Movement) => {
            const date = movement.date.slice(0, 10);
            const dateAmount = dateExpenses.get(date) || 0;
            dateExpenses.set(date, dateAmount + movement.amount);
        });
        const dateExpensesArray: DateExpense[] = [];
        dateExpenses.forEach((amount, date) => {
            dateExpensesArray.push({ date, amount });
        });
        dateExpensesArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setExpenses(dateExpensesArray);
    }, [movements, dateFrom]);

    useEffect(() => {
        listGrouper().then((data) => {
            setGroupers(data);
        });
    }, []);
    return (
        <div className='h-full'>
            <ExpenseChart expenses={expenses} onPeriodChange={handlePeriodChange} groupers={groupers} onGrouperChange={handleGrouperChange} currentGrouperId={currentGrouperId} />
        </div>
    )
}