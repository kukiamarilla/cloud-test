import { RefreshProvider } from "@/contexts/refresh-context";
import { Header } from "../custom/header";
import { PullToRefresh } from "../ui/pull-to-refresh";
import { AddMovement } from "../custom/add-movement";
import { AddGrouper } from "../custom/add-grouper";
import { Notifications } from "../ui/notifications";
import { GrouperManagementView } from "../custom/grouper-management-view";
import { CategoryManagementView } from "../custom/category-management-view";
import { AddCategory } from "../custom/add-category";
import { ExpenseChartContainer } from "../containers/expense-chart-container";
import { BalancePerMonthContainer } from "../containers/balance-per-month-container";
import { MovementsContainer } from "../containers/movements-container";
import { useAuth } from "@/contexts/auth-context";

export default function Dashboard() {
    const { auth, loading } = useAuth();

    // Show loading state while auth is being checked
    if (loading || !auth) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Cargando dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <RefreshProvider>
            <div className="min-h-screen bg-background text-foreground">
                <Header />
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
    );
}