'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
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
import Filters from '@/components/custom-table/filters';
import DataTable from '@/components/custom-table/data-table';
import PaginationControls from '@/components/custom-table/pagination-controls';
import { RowActions } from '@/components/custom-table/row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { generateFakeTransactions } from '@/script/generateFakeTransactions';

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  const searchableRowContent =
    `${row.original.description} ${row.original.merchant} ${row.original.category}`.toLowerCase();
  const searchTerm = (filterValue ?? '').toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<any> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

const typeFilterFn: FilterFn<any> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const type = row.getValue(columnId) as string;
  return filterValue.includes(type);
};

const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: 'Transaction ID',
    accessorKey: 'transactionId',
    cell: ({ row }) => (
      <div className='font-mono text-sm'>{row.getValue('transactionId')}</div>
    ),
    size: 120,
  },
  {
    header: 'Date',
    accessorKey: 'date',
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue('date')).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })}
      </div>
    ),
    size: 100,
  },
  {
    header: 'Description',
    accessorKey: 'description',
    cell: ({ row }) => (
      <div className='flex flex-col gap-1'>
        <div className='font-medium line-clamp-1'>
          {row.getValue('description')}
        </div>
        <div className='text-sm text-muted-foreground line-clamp-1'>
          {row.original.merchant}
        </div>
      </div>
    ),
    size: 250,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: 'Category',
    accessorKey: 'category',
    cell: ({ row }) => (
      <Badge variant='outline' className='rounded-full'>
        {row.getValue('category')}
      </Badge>
    ),
    size: 140,
  },
  {
    header: 'Type',
    accessorKey: 'type',
    cell: ({ row }) => (
      <Badge
        variant='secondary'
        className={cn(
          'capitalize rounded-full',
          row.getValue('type') === 'credit'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        )}
      >
        <div
          className={cn(
            row.getValue('type') === 'credit' ? 'bg-green-400' : 'bg-red-400',
            'w-2 h-2 rounded-full mr-1'
          )}
        />
        {row.getValue('type')}
      </Badge>
    ),
    size: 100,
    filterFn: typeFilterFn,
  },
  {
    header: 'Payment Method',
    accessorKey: 'paymentMethod',
    cell: ({ row }) => (
      <div className='text-sm'>{row.getValue('paymentMethod')}</div>
    ),
    size: 130,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => (
      <Badge variant='secondary' className={cn('capitalize rounded-full')}>
        <div
          className={cn(
            row.getValue('status') === 'completed'
              ? 'bg-green-400'
              : row.getValue('status') === 'pending'
              ? 'bg-yellow-400'
              : 'bg-red-400',
            'w-2 h-2 rounded-full mr-1'
          )}
        />
        {row.getValue('status')}
      </Badge>
    ),
    size: 100,
    filterFn: statusFilterFn,
  },
  {
    header: () => <div className='w-full text-right'>Amount</div>,
    accessorKey: 'amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(Math.abs(amount));
      return (
        <div
          className={cn(
            'text-md font-medium text-right',
            amount < 0 ? 'text-red-600' : 'text-green-600'
          )}
        >
          {amount < 0 ? '-' : '+'}
          {formatted}
        </div>
      );
    },
    size: 120,
  },
  {
    header: () => <div className='w-full text-right'>Balance</div>,
    accessorKey: 'balance',
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue('balance'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(balance);
      return (
        <div
          className={cn('text-md font-medium text-right text-muted-foreground')}
        >
          {formatted}
        </div>
      );
    },
    size: 120,
  },
  {
    id: 'actions',
    header: () => <span className='sr-only'>Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
];

export default function TransactionTable() {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'date',
      desc: true,
    },
  ]);

  const [data, setData] = useState<any[]>(generateFakeTransactions());

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

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const updatedData = data.filter(
      (item) =>
        !selectedRows.some(
          (row) => row.original.transactionId === item.transactionId
        )
    );
    setData(updatedData);
    table.resetRowSelection();
  };

  return (
    <Card className='bg-background shadow-xs'>
      <CardTitle className='px-6 text-md font-medium text-muted-foreground'>
        Transaction History
      </CardTitle>
      <Filters table={table} id={id} handleDeleteRows={handleDeleteRows} />
      <CardContent className='space-y-4 overflow-hidden rounded-lg bg-background'>
        <DataTable table={table} columns={columns} />
        <PaginationControls table={table} id={id} />
      </CardContent>
    </Card>
  );
}
