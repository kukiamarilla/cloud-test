import { Bar, BarChart, Cell, XAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "../ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ChartTooltipContent } from "../ui/chart"
import { Movement } from "../../model/movement"
import { useEffect, useState } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { setTimezone } from "@/lib/utils"

export const BalancePerMonth = ({movements, onYearChange, year}: {movements: Movement[], year: number, onYearChange: (year: number) => void}) => {
    const chartConfig = {
        amount: {
            label: "Saldo",
        },
    }
    const [chartData, setChartData] = useState<{month: string, amount: number}[]>([]);
    useEffect(() => {
        const chartData = Array(12).fill(0);
        movements.forEach((movement) => {
            //get local timezone
            const month = new Date(setTimezone(movement.date, -3)).getMonth();
            const rawAmount = movement.amount;
            const type = movement.type;
            const amount = type === "income" ? rawAmount : -rawAmount;
            chartData[month] += amount;
        });
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const chartDataWithNames = monthNames.map((month, index) => {
            return {
                month: month,
                amount: chartData[index]
            }
        });
        setChartData(chartDataWithNames);
    }, [movements]);
    return (
        <Card className='h-full'>
        <CardHeader>
            <CardTitle>
                <h1>Resultado por meses</h1>
            </CardTitle>
        </CardHeader>
        <CardContent>
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => onYearChange(year-1)}/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" onClick={() => onYearChange(year-1)} className="w-[60px]">{year-1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive={true} className="w-[60px]">{year}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" onClick={() => onYearChange(year+1)} className="w-[60px]">{year+1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" onClick={() => onYearChange(year+1)}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
        <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
                <ChartTooltip content={<ChartTooltipContent hideLabel hideIndicator />} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 10)}
                />
                <Bar dataKey="amount" fill="#e4696c" radius={4}>
                    {chartData.map((item) => (
                        <Cell key={item.month} fill={item.amount > 0 ? "#5cc460" : "#e4696c"} />
                    ))}
                </Bar>
            </BarChart>
        </ChartContainer>   
        </CardContent>
    </Card> 
    )
}