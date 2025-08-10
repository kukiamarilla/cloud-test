import './App.css';
import { MovementsContainer } from './components/containers/movements-container';
import { ExpenseChartContainer } from './components/containers/expense-chart-container';
import { BalancePerMonthContainer } from './components/containers/balance-per-month-container';
import { Header } from './components/custom/header';
import { AddMovement } from './components/custom/add-movement';
import { AddCategory } from './components/custom/add-category';
import { AddGrouper } from './components/custom/add-grouper';
import { GrouperManagementView } from './components/custom/grouper-management-view';
import { CategoryManagementView } from './components/custom/category-management-view';
import { PullToRefresh } from './components/ui/pull-to-refresh';
import { RefreshProvider } from './contexts/refresh-context';
import { NotificationProvider } from './contexts/notification-context';
import { Notifications } from './components/ui/notifications';
import { ThemeProvider } from './contexts/theme-context';

const App = () => {
    return (
        <ThemeProvider>
            <NotificationProvider>
                <RefreshProvider>
                    <div className="min-h-screen bg-background text-foreground">
                        <Header />
                        <Notifications />
                        <PullToRefresh>
                            <div className='container mx-auto mt-10 px-4 pb-safe'>
                                <div className='flex flex-col sm:flex-row gap-4 justify-between items-stretch '>
                                    <AddMovement />
                                    <div className='flex flex-col sm:flex-row gap-4 items-stretch mb-5'>
                                        <AddGrouper />  
                                        <AddCategory />
                                    </div>
                                </div>
                                <GrouperManagementView />
                                <CategoryManagementView />
                                <div className='flex flex-col md:flex-row gap-4 items-stretch mb-5'>
                                    <div className='w-full md:w-1/2'>
                                        <ExpenseChartContainer />
                                    </div>
                                    <div className='w-full md:w-1/2'>
                                        <BalancePerMonthContainer />
                                    </div>
                                </div>
                                <div className='overflow-x-auto' data-section="movements">
                                    <MovementsContainer />
                                </div>
                            </div>
                        </PullToRefresh>
                    </div>
                </RefreshProvider>
            </NotificationProvider>
        </ThemeProvider>
    );
};

export default App;