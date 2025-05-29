import CreditHistoryTable from '@/components/credit-history-table';
import { DashboardAnalysis } from '@/components/dashboard-analysis';
import TransactionTable from '@/components/transaction-table';

export default function Home() {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <DashboardAnalysis />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-6 gap-4 w-full'>
          <div className='min-w-0 lg:col-span-3'>
            <CreditHistoryTable />
          </div>

          <div className='min-w-0 lg:col-span-3'>
            <TransactionTable />
          </div>
        </div>
      </div>
    </div>
  );
}
