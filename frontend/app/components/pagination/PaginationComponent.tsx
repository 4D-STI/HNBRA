// components/PaginationComponent.tsx

import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <Pagination className="mt-4">
            <PaginationContent>
                {/* Botão anterior */}
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => onPageChange(currentPage - 1)}
                        />
                    </PaginationItem>
                )}

                {/* Links das páginas */}
                {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href="#"
                            className={currentPage === index + 1 ? "font-bold text-blue-600" : ""}
                            onClick={() => onPageChange(index + 1)}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Botão próximo */}
                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => onPageChange(currentPage + 1)}
                            aria-label='ir para a próxima página'
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
