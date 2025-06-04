import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  SubscriptionPayload,
  SubscriptionResponse,
} from '@/types/subscription';

export async function POST(request: NextRequest) {
  try {
    const body: SubscriptionPayload = await request.json();

    // TODO: Integrate with your actual payment provider (e.g., Flutterwave)
    // This is a mock response
    const response: SubscriptionResponse = {
      success: true,
      message: 'Resource created successfully',
      statusCode: 201,
      data: {
        payment_url:
          'https://checkout-v2.dev-flutterwave.com/v3/hosted/pay/ae30dea5b20bb0f7a07a',
        ref: `TX-${Date.now()}${Math.floor(Math.random() * 10000)}`,
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Internal server error',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
