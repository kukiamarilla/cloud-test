import { useEffect, useState } from "react";
import { Movement } from "../../model/movement";
import { Movements } from "../custom/movements";
import { listMovements } from "../../service/movements";

export const MovementsContainer = () => {
    const [movements, setMovements] = useState<Movement[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const loadMovements = async () => {
        setLoading(true);
        try {
            const data = await listMovements({
                page: page,
                per_page: perPage,
            });
            
            // Laravel pagination structure
            setMovements(data.data);
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
    }, [page, perPage]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(1); // Reset to first page when changing per_page
    };

    return (
        <div>
            <Movements 
                movements={movements} 
                page={page} 
                per_page={perPage} 
                total={total}
                loading={loading}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
            />
        </div>
    );
};