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
import PaginationControls from './custom-table/pagination-controls';
import { useCreditHistoryStore } from '@/store/creditHistoryStore';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

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
    accessorKey: 'createdAt',
    cell: ({ row }) => (
      <div className='text-xs'>
        {new Date(row.getValue('createdAt')).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: '2-digit',
        })}
      </div>
    ),
    size: 70,
  },
  {
    header: 'Reference',
    accessorKey: 'transaction_ref',
    cell: ({ row }) => {
      const ref = row.getValue('transaction_ref') as string;

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(ref);
          // You can add a toast notification here if you have one
          toast.success('Reference copied to clipboard');
        } catch (err) {
          toast.error('Failed to copy reference');
        }
      };

      return (
        <div className='group relative flex items-center gap-2'>
          <div className='font-mono text-sm'>{ref}</div>
          <button
            onClick={handleCopy}
            className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-muted rounded-sm'
            title='Copy reference'
          >
            <Copy className='h-4 w-4 text-muted-foreground hover:text-foreground' />
          </button>
        </div>
      );
    },
    size: 250,
  },

  {
    header: () => <div className='w-full text-right'>Credit</div>,
    accessorKey: 'credit',
    cell: ({ row }) => {
      const credit = parseFloat(row.getValue('credit'));
      const currencyCode = row.original.currency_code;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode === 'NGN' ? 'NGN' : 'USD',
        minimumFractionDigits: 2,
      }).format(credit);
      return (
        <div className='text-md font-medium text-right text-green-600'>
          {formatted}
        </div>
      );
    },
    size: 100,
  },

  {
    header: () => <div className='w-full text-right'>Balance</div>,
    accessorKey: 'available_balance',
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue('available_balance'));
      const currencyCode = row.original.currency_code;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode === 'NGN' ? 'NGN' : 'USD',
        minimumFractionDigits: 2,
      }).format(balance);
      return (
        <div className='text-sm font-medium text-right text-muted-foreground'>
          {formatted}
        </div>
      );
    },
    size: 100,
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

  const { creditHistory } = useCreditHistoryStore();

  const table = useReactTable({
    data: creditHistory || [],
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
