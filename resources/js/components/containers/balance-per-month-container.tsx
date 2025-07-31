import { BalancePerMonth } from "../custom/balance-per-month"
import { Movement } from "../../model/movement"
import { useEffect } from "react"
import { useState } from "react"
import { listMovements } from "../../service/movements"

export const BalancePerMonthContainer = () => {
    const [movements, setMovements] = useState<Movement[]>([]);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    useEffect(() => {
        console.log("year", year);
        listMovements({
            page: 1,
            per_page: 1000,
            date_from: `${year}-01-01`,
            date_to: `${year}-12-31`
        }).then((data) => {
            setMovements(data.data);
        });
    }, [year]);
    useEffect(() => {
        console.log("movements", movements);
    }, [movements]);
    return (
        <BalancePerMonth movements={movements} year={year} onYearChange={setYear} />
    )
}