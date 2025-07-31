import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Movement } from "../../model/movement";
import { formatDate } from "../../lib/utils";
import { CustomPagination } from "../ui/custom-pagination";
import { DatePicker } from "../ui/date-picker";

interface MovementsProps {
    dateFrom: Date | undefined;
    dateTo: Date | undefined;
    movements: Movement[];
    page: number;
    per_page: number;
    total: number;
    loading?: boolean;
    onPageChange?: (page: number) => void;
    onPerPageChange?: (perPage: number) => void;
    onDateFromChange: (date: Date) => void;
    onDateToChange: (date: Date) => void;
}

export const Movements = ({ 
    dateFrom,
    dateTo,
    movements, 
    page, 
    per_page, 
    total, 
    loading = false,
    onPageChange,
    onPerPageChange,
    onDateFromChange,
    onDateToChange
}: MovementsProps) => {
    const totalPages = Math.ceil(total / per_page);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Movimientos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row gap-2">
                    <DatePicker date={dateFrom} onChange={onDateFromChange} label="Fecha desde" />
                    <DatePicker date={dateTo} onChange={onDateToChange} label="Fecha hasta" />
                </div>
                {loading ? (
                    <div className="text-center py-4">Cargando...</div>
                ) : (
                    <>
                        <Table className="font-bold">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead>Monto</TableHead>
                                    <TableHead>Categoría</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {movements.map((movement: Movement) => (
                                    <TableRow className={movement.type} key={movement.id}>
                                        <TableCell>{formatDate(movement.date)}</TableCell>
                                        <TableCell>{movement.description}</TableCell>
                                        <TableCell>{movement.type === 'income' ? '+' : '-'}{movement.amount}Gs.</TableCell>
                                        <TableCell>{movement.category.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        
                        {onPageChange && (
                            <CustomPagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};