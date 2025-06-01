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
import { useTransactionStore } from '@/store/transactionStore';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

// Transaction interface based on your data structure
interface Transaction {
  id: number;
  ref: string;
  status: string;
  seat_count: number;
  transaction_type: string;
  fee: string;
  amount: string;
  total: string;
  payment_provider: string;
  currency_code: string;
  link_url: string;
  plan_id: number;
  user_id: number;
  company_id: number;
  subscription_id: number | null;
  flw_ref: string | null;
  createdAt: string;
  updatedAt: string;
}

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Transaction> = (
  row,
  columnId,
  filterValue
) => {
  const searchableRowContent =
    `${row.original.ref} ${row.original.payment_provider} ${row.original.transaction_type}`.toLowerCase();
  const searchTerm = (filterValue ?? '').toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<Transaction> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

const typeFilterFn: FilterFn<Transaction> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const type = row.getValue(columnId) as string;
  return filterValue.includes(type);
};

const columns: ColumnDef<Transaction>[] = [
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
  // {
  //   header: 'Transaction ID',
  //   accessorKey: 'id',
  //   cell: ({ row }) => (
  //     <div className='font-mono text-sm'>#{row.getValue('id')}</div>
  //   ),
  //   size: 100,
  // },
  // {
  //   header: 'Reference',
  //   accessorKey: 'ref',
  //   cell: ({ row }) => (
  //     <div className='font-mono text-xs'>{row.getValue('ref')}</div>
  //   ),
  //   size: 180,
  // },
  {
    header: 'Reference',
    accessorKey: 'ref',
    cell: ({ row }) => {
      const ref = row.getValue('ref') as string;

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
    header: 'Date',
    accessorKey: 'createdAt',
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue('createdAt')).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })}
      </div>
    ),
    size: 120,
  },
  {
    header: 'Type',
    accessorKey: 'transaction_type',
    cell: ({ row }) => (
      <Badge variant='outline' className='rounded-full capitalize'>
        {row.getValue('transaction_type')}
      </Badge>
    ),
    size: 120,
    filterFn: typeFilterFn,
  },
  {
    header: 'Provider',
    accessorKey: 'payment_provider',
    cell: ({ row }) => (
      <div className='flex flex-col gap-1'>
        <div className='font-medium capitalize'>
          {row.getValue('payment_provider')}
        </div>
        <div className='text-sm text-muted-foreground'>
          {row.original.currency_code}
        </div>
      </div>
    ),
    size: 120,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  // {
  //   header: 'Seats',
  //   accessorKey: 'seat_count',
  //   cell: ({ row }) => (
  //     <div className='text-left pl-3'>{row.getValue('seat_count')}</div>
  //   ),
  //   size: 80,
  // },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => (
      <Badge variant='secondary' className={cn('capitalize rounded-full')}>
        <div
          className={cn(
            row.getValue('status') === 'successful'
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
    size: 120,
    filterFn: statusFilterFn,
  },
  {
    header: () => <div className='w-full text-right'>Fee</div>,
    accessorKey: 'fee',
    cell: ({ row }) => {
      const fee = parseFloat(row.getValue('fee'));
      const currencyCode = row.original.currency_code;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode === 'NGN' ? 'NGN' : 'USD',
        minimumFractionDigits: 2,
      }).format(fee);
      return (
        <div className='text-sm font-medium text-right text-muted-foreground'>
          {formatted}
        </div>
      );
    },
    size: 100,
  },
  {
    header: () => <div className='w-full text-right'>Amount</div>,
    accessorKey: 'amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const currencyCode = row.original.currency_code;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode === 'NGN' ? 'NGN' : 'USD',
        minimumFractionDigits: 2,
      }).format(amount);
      return (
        <div className='text-md font-medium text-right text-green-600'>
          {formatted}
        </div>
      );
    },
    size: 120,
  },
  {
    header: () => <div className='w-full text-right'>Total</div>,
    accessorKey: 'total',
    cell: ({ row }) => {
      const total = parseFloat(row.getValue('total'));
      const currencyCode = row.original.currency_code;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode === 'NGN' ? 'NGN' : 'USD',
        minimumFractionDigits: 2,
      }).format(total);
      return <div className='text-md font-medium text-right'>{formatted}</div>;
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

// Sample data generator based on your data structure
const generateSampleTransactions = (): Transaction[] => {
  return [
    {
      id: 2,
      ref: 'TX-1748717530813.T3DGZ3J',
      status: 'successful',
      seat_count: 1,
      transaction_type: 'subscription',
      fee: '0.00',
      amount: '0.00',
      total: '0.00',
      payment_provider: 'sourzer',
      currency_code: 'NGN',
      link_url: 'NONE',
      plan_id: 0,
      user_id: 2,
      company_id: 2,
      subscription_id: null,
      flw_ref: null,
      createdAt: '2025-05-31T18:52:10.000Z',
      updatedAt: '2025-05-31T18:52:10.000Z',
    },
    {
      id: 1,
      ref: 'TX-1748435326826.GYJBI69',
      status: 'successful',
      seat_count: 1,
      transaction_type: 'subscription',
      fee: '0.00',
      amount: '0.00',
      total: '0.00',
      payment_provider: 'sourzer',
      currency_code: 'NGN',
      link_url: 'NONE',
      plan_id: 0,
      user_id: 2,
      company_id: 2,
      subscription_id: null,
      flw_ref: null,
      createdAt: '2025-05-28T12:28:46.000Z',
      updatedAt: '2025-05-28T12:28:46.000Z',
    },
  ];
};

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
      id: 'createdAt',
      desc: true,
    },
  ]);

  const { transactions, fecthAllTransactions } = useTransactionStore();

  const [data, setData] = useState<Transaction[]>(generateSampleTransactions());

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
      (item) => !selectedRows.some((row) => row.original.id === item.id)
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
