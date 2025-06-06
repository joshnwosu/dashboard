export interface CreditHistory {
  success: true;
  message: 'Request was successful';
  statusCode: 200;
  data: {
    creditHistory: Array<{
      id: number;
      user_id: number;
      company_id: number;
      suscription_id: number;
      credit: string;
      job_id: null;
      candidate_id: null;
      available_balance: string;
      created_at: string;
      transaction_ref: string;
      createdAt: string;
      updatedAt: string;
    }>;
    total: number;
    page: number;
    lastPage: number;
  };
}
