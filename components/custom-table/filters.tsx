'use client';

import { useRef, useMemo } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  CircleAlert,
  CircleX,
  Columns3,
  Filter,
  ListFilter,
  Trash,
} from 'lucide-react';
import { Table } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

interface FiltersProps {
  table: Table<any>;
  id: string;
  handleDeleteRows: () => void;
}

export default function Filters({ table, id, handleDeleteRows }: FiltersProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const uniqueTypeValues = useMemo(() => {
    const typeColumn = table.getColumn('status');
    if (!typeColumn) return [];
    const values = Array.from(typeColumn.getFacetedUniqueValues().keys());
    return values.sort();
  }, [table.getColumn('status')?.getFacetedUniqueValues()]);

  const typeCounts = useMemo(() => {
    const typeColumn = table.getColumn('status');
    if (!typeColumn) return new Map();
    return typeColumn.getFacetedUniqueValues();
  }, [table.getColumn('status')?.getFacetedUniqueValues()]);

  const selectedTypes = useMemo(() => {
    const filterValue = table.getColumn('status')?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn('status')?.getFilterValue()]);

  const handleTypeChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn('status')?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table
      .getColumn('status')
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return (
    <div className='flex items-center gap-3 px-6'>
      <div className='relative'>
        <Input
          id={`${id}-input`}
          ref={inputRef}
          className={cn(
            'peer min-w-60 ps-9',
            Boolean(table?.getColumn('customerName')?.getFilterValue()) &&
              'pe-9'
          )}
          value={
            (table.getColumn('customerName')?.getFilterValue() ?? '') as string
          }
          onChange={(e) =>
            table.getColumn('customerName')?.setFilterValue(e.target.value)
          }
          placeholder='Filter by customer name or category...'
          type='text'
          aria-label='Filter by customer name or category'
        />
        <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
          <ListFilter size={16} strokeWidth={2} aria-hidden='true' />
        </div>
        {Boolean(table.getColumn('customerName')?.getFilterValue()) && (
          <button
            className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
            aria-label='Clear filter'
            onClick={() => {
              table.getColumn('customerName')?.setFilterValue('');
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          >
            <CircleX size={16} strokeWidth={2} aria-hidden='true' />
          </button>
        )}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>
            <Filter
              className='-ms-1 me-2 opacity-60'
              size={16}
              strokeWidth={2}
              aria-hidden='true'
            />
            Status
            {selectedTypes.length > 0 && (
              <span className='-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70'>
                {selectedTypes.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='min-w-36 p-3' align='start'>
          <div className='space-y-3'>
            <div className='text-xs font-medium text-muted-foreground'>
              Filters
            </div>
            <div className='space-y-3'>
              {uniqueTypeValues.map((value, i) => (
                <div key={value} className='flex items-center gap-2'>
                  <Checkbox
                    id={`${id}-${i}`}
                    checked={selectedTypes.includes(value)}
                    onCheckedChange={(checked: boolean) =>
                      handleTypeChange(checked, value)
                    }
                  />
                  <Label
                    htmlFor={`${id}-${i}`}
                    className='flex grow justify-between gap-2 font-normal'
                  >
                    {value}{' '}
                    <span className='ms-2 text-xs text-muted-foreground'>
                      {typeCounts.get(value)}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            <Columns3
              className='-ms-1 me-2 opacity-60'
              size={16}
              strokeWidth={2}
              aria-hidden='true'
            />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  onSelect={(event) => event.preventDefault()}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      {table.getSelectedRowModel().rows.length > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className='ml-auto' variant='outline'>
              <Trash
                className='-ms-1 me-2 opacity-60'
                size={16}
                strokeWidth={2}
                aria-hidden='true'
              />
              Delete
              <span className='-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70'>
                {table.getSelectedRowModel().rows.length}
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className='flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4'>
              <div
                className='flex size-9 shrink-0 items-center justify-center rounded-full border border-border'
                aria-hidden='true'
              >
                <CircleAlert className='opacity-80' size={16} strokeWidth={2} />
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete{' '}
                  {table.getSelectedRowModel().rows.length} selected{' '}
                  {table.getSelectedRowModel().rows.length === 1
                    ? 'transaction'
                    : 'transactions'}
                  .
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteRows}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
