import './App.css';
import { MovementsContainer } from './components/containers/movements-container';
import { ExpenseChartContainer } from './components/containers/expense-chart-container';

const App = () => {
    return (
        <div className='container mx-auto mt-10'>
            <ExpenseChartContainer />
            <MovementsContainer />
        </div>
    );
};

export default App;