import { BalancePerMonth } from "../custom/balance-per-month"
import { Movement } from "../../model/movement"
import { useEffect } from "react"
import { useState } from "react"
import { listMovements } from "../../service/movements"

export const BalancePerMonthContainer = () => {
    const [movements, setMovements] = useState<Movement[]>([]);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    useEffect(() => {
        listMovements({
            page: 1,
            per_page: 1000,
            date_from: new Date().toISOString().slice(0,4)+ "-01-01"
        }).then((data) => {
            setMovements(data.data);
        });
    }, []);
    return (
        <BalancePerMonth movements={movements} year={year} onYearChange={setYear} />
    )
}