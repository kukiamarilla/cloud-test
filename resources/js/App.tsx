import './App.css';
import { MovementsContainer } from './components/containers/movements-container';
import { ExpenseChartContainer } from './components/containers/expense-chart-container';
import { BalancePerMonthContainer } from './components/containers/balance-per-month-container';

const App = () => {
    return (
        <div className='container mx-auto mt-10'>
            <div className='flex flex-row gap-4 items-stretch mb-5'>
                <div className='flex-1 w-1/2'>
                    <ExpenseChartContainer />
                </div>
                <div className='flex-1 w-1/2'>
                    <BalancePerMonthContainer />
                </div>
            </div>
            <MovementsContainer />
        </div>
    );
};

export default App;