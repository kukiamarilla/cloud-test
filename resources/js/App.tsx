import './App.css';
import { MovementsContainer } from './components/containers/movements-container';
import { ExpenseChartContainer } from './components/containers/expense-chart-container';
import { BalancePerMonthContainer } from './components/containers/balance-per-month-container';
import { Header } from './components/custom/header';
import { AddMovement } from './components/custom/add-movement';
import { AddCategory } from './components/custom/add-category';
import { AddGrouper } from './components/custom/add-grouper';
import { PullToRefresh } from './components/ui/pull-to-refresh';
import { useState } from 'react';

const App = () => {
    const [refreshSeed, setRefreshSeed] = useState(0);

    const handleRefresh = async () => {
        // Delay breve para mostrar la animación
        await new Promise((r) => setTimeout(r, 500));
        setRefreshSeed((s) => s + 1);
    };

    return (
        <div>
            <Header />
            <PullToRefresh onRefresh={handleRefresh}>
                <div className='container mx-auto mt-10 px-4'>
                    <div className='flex flex-col sm:flex-row gap-4 justify-between items-stretch'>
                        <AddMovement />
                        <div className='flex flex-col sm:flex-row gap-4 items-stretch'>
                            <AddGrouper />  
                            <AddCategory />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 items-stretch mb-5'>
                        <div className='w-full md:w-1/2'>
                            <ExpenseChartContainer key={`expense-${refreshSeed}`} />
                        </div>
                        <div className='w-full md:w-1/2'>
                            <BalancePerMonthContainer key={`balance-${refreshSeed}`} />
                        </div>
                    </div>
                    <div className='overflow-x-auto'>
                        <MovementsContainer key={`movs-${refreshSeed}`} />
                    </div>
                </div>
            </PullToRefresh>
        </div>
    );
};

export default App;