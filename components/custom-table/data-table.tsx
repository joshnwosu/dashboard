'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataTableProps {
  table: ReactTable<any>;
  columns: ColumnDef<any>[];
}

export default function DataTable({ table, columns }: DataTableProps) {
  return (
    <Table className='table-fixed'>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className='hover:bg-transparent'>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  style={{ width: `${header.getSize()}px` }}
                  className='h-11'
                >
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <div
                      className={cn(
                        header.column.getCanSort() &&
                          'flex h-full cursor-pointer select-none items-center justify-between gap-2'
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                      onKeyDown={(e) => {
                        if (
                          header.column.getCanSort() &&
                          (e.key === 'Enter' || e.key === ' ')
                        ) {
                          e.preventDefault();
                          header.column.getToggleSortingHandler()?.(e);
                        }
                      }}
                      tabIndex={header.column.getCanSort() ? 0 : undefined}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: (
                          <ChevronUp
                            className='shrink-0 opacity-60'
                            size={16}
                            strokeWidth={2}
                            aria-hidden='true'
                          />
                        ),
                        desc: (
                          <ChevronDown
                            className='shrink-0 opacity-60'
                            size={16}
                            strokeWidth={2}
                            aria-hidden='true'
                          />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className='last:py-0'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              <div className='flex flex-col gap-2 justify-center items-center py-8'>
                No results.
                <FileText className='w-12 h-12 opacity-25 rotate-12' />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
