'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useId, useState } from 'react';
import DataTable from '@/components/custom-table/data-table';
import { Badge } from '@/components/ui/badge';
import { generateCreditHistory } from '@/script/generateFakeTransactions';
import PaginationControls from './custom-table/pagination-controls';

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'excellent':
      return 'bg-green-100 text-green-800';
    case 'good':
      return 'bg-blue-100 text-blue-800';
    case 'fair':
      return 'bg-yellow-100 text-yellow-800';
    case 'poor':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const columns: ColumnDef<any>[] = [
  {
    header: 'Date',
    accessorKey: 'date',
    cell: ({ row }) => (
      <div className='text-xs'>
        {new Date(row.getValue('date')).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: '2-digit',
        })}
      </div>
    ),
    size: 70,
  },
  {
    header: 'Provider',
    accessorKey: 'provider',
    cell: ({ row }) => (
      <div className='text-xs text-muted-foreground'>
        {row.getValue('provider')}
      </div>
    ),
    size: 70,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => (
      <Badge
        variant='secondary'
        className={cn(
          'text-xs capitalize rounded-full px-2 py-0',
          getStatusVariant(row.getValue('status'))
        )}
      >
        {row.getValue('status')}
      </Badge>
    ),
    size: 80,
  },

  {
    header: 'Accounts',
    accessorKey: 'accounts',
    cell: ({ row }) => (
      <div className='text-xs text-center'>{row.getValue('accounts')}</div>
    ),
    size: 60,
  },
];

export default function CreditHistoryTable() {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'date',
      desc: true,
    },
  ]);

  const [data] = useState<any[]>(generateCreditHistory());

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <Card className='bg-background shadow-xs'>
      <CardTitle className='px-6 text-md font-medium text-muted-foreground'>
        Credit History
      </CardTitle>
      <CardContent className='space-y-4 overflow-hidden rounded-lg bg-background'>
        <DataTable table={table} columns={columns} />
        <PaginationControls table={table} id={id} />
      </CardContent>
    </Card>
  );
}
