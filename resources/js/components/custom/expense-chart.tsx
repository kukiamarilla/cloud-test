import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { BarChart, Bar, XAxis } from "recharts"
import { useEffect, useState } from "react"
import { Movement } from "@/model/movement";
import { listMovements } from "@/service/movements";
import { DatePicker } from "../ui/date-picker";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

interface DateExpense {
    date: string;
    amount: number;
}

interface ExpenseChartProps {
    expenses: DateExpense[];
    onPeriodChange: (period: string) => void;
}

export const ExpenseChart = ({ expenses, onPeriodChange }: ExpenseChartProps) => {
    const [period, setPeriod] = useState("1M");
    const handlePeriodChange = (value: string) => {
        setPeriod(value);
        onPeriodChange(value);
    }
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
                    <ToggleGroup type="single" variant="outline" value={period} onValueChange={handlePeriodChange}>
                        <ToggleGroupItem value="1W">
                            1W
                        </ToggleGroupItem>
                        <ToggleGroupItem value="1M">
                            1M
                        </ToggleGroupItem>
                        <ToggleGroupItem value="3M">
                            3M
                        </ToggleGroupItem>
                        <ToggleGroupItem value="6M">
                            6M
                        </ToggleGroupItem>
                        <ToggleGroupItem value="1Y">
                            1Y
                        </ToggleGroupItem>
                    </ToggleGroup>
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