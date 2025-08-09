import './App.css';
import { MovementsContainer } from './components/containers/movements-container';
import { ExpenseChartContainer } from './components/containers/expense-chart-container';
import { BalancePerMonthContainer } from './components/containers/balance-per-month-container';
import { Header } from './components/custom/header';
import { AddMovement } from './components/custom/add-movement';
import { AddCategory } from './components/custom/add-category';
import { AddGrouper } from './components/custom/add-grouper';
import { PullToRefresh } from './components/ui/pull-to-refresh';
import { RefreshProvider } from './contexts/refresh-context';

const App = () => {
    return (
        <RefreshProvider>
            <div>
                <Header />
                <PullToRefresh>
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
                                <ExpenseChartContainer />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <BalancePerMonthContainer />
                            </div>
                        </div>
                        <div className='overflow-x-auto'>
                            <MovementsContainer />
                        </div>
                    </div>
                </PullToRefresh>
            </div>
        </RefreshProvider>
    );
};

export default App;