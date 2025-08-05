import { useEffect, useState } from "react";
import { Movement } from "../../model/movement";
import { Movements } from "../custom/movements";
import { deleteMovement, listMovements } from "../../service/movements";

export const MovementsContainer = () => {
    const [movements, setMovements] = useState<Movement[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dateFrom, setDateFrom] = useState<string|null>(null);
    const [dateTo, setDateTo] = useState<string|null>(null);

    const handleDateFromChange = (date: Date) => {
        setDateFrom(date.toISOString());
    }

    const handleDateToChange = (date: Date) => {
        setDateTo(date.toISOString());
    }

    const loadMovements = async () => {
        setLoading(true);
        try {
            const data = await listMovements({
                page: page,
                per_page: perPage,
                ...(dateFrom && { date_from: dateFrom }),
                ...(dateTo && { date_to: dateTo }),
            });
            
            // Laravel pagination structure
            const sortedMovements = data.data
                .sort((a: Movement, b: Movement) => {
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                })
                .sort((a: Movement, b: Movement) => {
                    return a.date < b.date ? 1 : -1;
                });
            setMovements(sortedMovements);
            setTotal(data.total);
            setPage(data.current_page);
            setPerPage(data.per_page);
        } catch (error) {
            console.error('Error loading movements:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovements();
    }, [page, perPage, dateFrom, dateTo]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(1); // Reset to first page when changing per_page
    };

    const handleDeleteMovement = (id: number) => {
        if(confirm('¿Estás seguro de querer eliminar este movimiento?')){
            deleteMovement(id).then(() => {
                loadMovements();
            });
        }
    }

    return (
        <div>
            <Movements 
                dateFrom={dateFrom ? new Date(dateFrom) : undefined}
                dateTo={dateTo ? new Date(dateTo) : undefined}
                movements={movements} 
                page={page} 
                per_page={perPage} 
                total={total}
                loading={loading}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
                onDateFromChange={handleDateFromChange}
                onDateToChange={handleDateToChange}
                onDeleteMovement={handleDeleteMovement}
            />
        </div>
    );
};