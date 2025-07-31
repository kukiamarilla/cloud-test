import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export const CustomPagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange,
    className = ""
}: CustomPaginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageClick = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className={`flex justify-center my-2 ${className}`}>
            <Pagination>
                <PaginationContent>
                    {/* Previous button */}
                    <PaginationItem>
                        <PaginationPrevious 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(currentPage - 1);
                            }}
                        />
                    </PaginationItem>

                    {/* Always show first page */}
                    <PaginationItem>
                        <PaginationLink 
                            href="#" 
                            isActive={currentPage === 1}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(1);
                            }}
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>

                    {/* Show ellipsis if needed */}
                    {currentPage > 3 && (
                        <PaginationItem>
                            <span className="px-2">...</span>
                        </PaginationItem>
                    )}

                    {/* Show up to 3 pages around current */}
                    {pages
                        .filter(
                            (p) =>
                                p !== 1 &&
                                p !== totalPages &&
                                p >= currentPage - 1 &&
                                p <= currentPage + 1
                        )
                        .map((pageNum) => (
                            <PaginationItem key={pageNum}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === pageNum}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageClick(pageNum);
                                    }}
                                >
                                    {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                    {/* Show ellipsis if needed */}
                    {currentPage < totalPages - 2 && (
                        <PaginationItem>
                            <span className="px-2">...</span>
                        </PaginationItem>
                    )}

                    {/* Always show last page (if more than 1 page) */}
                    {totalPages > 1 && (
                        <PaginationItem>
                            <PaginationLink 
                                href="#" 
                                isActive={currentPage === totalPages}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageClick(totalPages);
                                }}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {/* Next button */}
                    <PaginationItem>
                        <PaginationNext 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageClick(currentPage + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}; 