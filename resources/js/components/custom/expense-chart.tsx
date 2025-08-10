import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { BarChart, Bar, XAxis } from "recharts"
import { useEffect, useState } from "react"
import { Movement } from "@/model/movement";
import { listMovements } from "@/service/movements";
import { DatePicker } from "../ui/date-picker";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import { ComboboxSelect } from "../ui/combobox-select";
import { Grouper } from "@/model/grouper";

interface DateExpense {
    date: string;
    amount: number;
}

interface ExpenseChartProps {
    expenses: DateExpense[];
    onPeriodChange: (period: string) => void;
    groupers: Grouper[];
    onGrouperChange: (grouperId: number) => void;
    currentGrouperId: number | null;
}

export const ExpenseChart = ({ expenses, onPeriodChange, groupers, onGrouperChange, currentGrouperId }: ExpenseChartProps) => {
    const [period, setPeriod] = useState("EM");
    const [sum, setSum] = useState(0);
    const [average, setAverage] = useState(0);
    const [monthlyProjection, setMonthlyProjection] = useState(0);

    useEffect(() => {
        setSum(expenses.reduce((acc, curr) => acc + curr.amount, 0));
        setAverage(expenses.length > 0 ? Math.round(expenses.reduce((acc, curr) => acc + curr.amount, 0) / expenses.length) : 0);
    }, [expenses]);

    useEffect(() => {
        const today = new Date();
        today.setMonth(today.getMonth() + 1);
        today.setDate(0);
        const daysInThisMonth = today.getDate();
        setMonthlyProjection(average * daysInThisMonth);
    }, [average])
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
        <div className='h-full'>
            <Card className='h-full'>
                <CardHeader>
                    <CardTitle>Comportamiento de Gastos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row gap-2">

                        <ToggleGroup type="single" variant="outline" value={period} onValueChange={handlePeriodChange}>
                            <ToggleGroupItem value="1W">
                                1W
                            </ToggleGroupItem>
                            <ToggleGroupItem value="EM">
                                EM
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
                        <div className="flex flex-row gap-2">
                            <ComboboxSelect
                                options={[{label: "Ninguno", value: 0}, ...groupers.map(g => ({ label: g.name, value: g.id }))] as {label: string, value: number | null}[]}
                                value={currentGrouperId}
                                onChange={(value) => {onGrouperChange(value)}}
                                emptyMessage="No hay agrupadores"
                                placeholder="Agrupar por"
                            />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">
                            Suma de gastos: {sum.toLocaleString()} Gs.
                        </p>
                        <p className="text-sm text-gray-500">
                            Promedio de gastos: {
                                average.toLocaleString()
                            } Gs.
                        </p>
                        {period === "EM" && (
                            <p className="text-sm text-gray-500">
                                Proyección de gastos: {monthlyProjection.toLocaleString()} Gs.
                            </p>
                        )}
                    </div>
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
                            <Bar dataKey="amount" fill="#e7210b" radius={4}/>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}