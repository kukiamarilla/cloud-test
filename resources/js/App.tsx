import './App.css';
import { MovementsContainer } from './components/containers/movements-container';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { useEffect, useState } from 'react';
import { Movement } from './model/movement';
import { listMovements } from './service/movements';
import { Bar, BarChart, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './components/ui/chart';
import { ExpenseChartContainer } from './components/containers/expense-chart-container';

interface DateExpense {
    date: string;
    amount: number;
}
const App = () => {
    
    return (
        <div className='container mx-auto mt-10'>
            <ExpenseChartContainer />
            <MovementsContainer />
        </div>
    );
};

export default App;