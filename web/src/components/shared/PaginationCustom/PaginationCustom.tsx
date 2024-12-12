import React, { FC } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export interface IProps {
  onPageChange: any
  currentPage: number
  totalPages: number
}

export const PaginationCustom: FC<IProps> = ({
  onPageChange,
  totalPages,
  currentPage,
}) => {
  return (
    <div className="space-y-4 rounded-b-lg border border-b border-l border-r border-gray-200 bg-gray-100 p-4">
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                onPageChange((prev: number) => Math.max(prev - 1, 1))
              }
              isActive={currentPage !== 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPageChange((prev: number) => Math.min(prev + 1, totalPages))
              }
              isActive={currentPage !== totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
