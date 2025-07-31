import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { BarChart, Bar, XAxis } from "recharts"
import { useEffect, useState } from "react"
import { Movement } from "@/model/movement";
import { listMovements } from "@/service/movements";

interface DateExpense {
    date: string;
    amount: number;
}

interface ExpenseChartProps {
    expenses: DateExpense[];
}

export const ExpenseChart = ({ expenses }: ExpenseChartProps) => {
    const chartConfig = {
        amount: {
            label: "Monto",
            color: "#60a5fa"
        },
    }
    return (
        <div>
            <Card className='mb-5'>
                <CardHeader>
                    <CardTitle>Comportamiento de Gastos</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart data={expenses}>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 10)}
                            />
                            <Bar dataKey="amount" fill="#e4696c" radius={4}/>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}