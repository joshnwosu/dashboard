import { faker } from '@faker-js/faker';

function generateFakeTransactions(count = 0): any[] {
  return Array.from({ length: count }, () => {
    const amount = faker.number.float({
      min: 25,
      max: 2500,
      fractionDigits: 2,
    });
    const transactionType = faker.helpers.arrayElement(['debit', 'credit']);
    const categories = [
      'Food & Dining',
      'Shopping',
      'Transportation',
      'Entertainment',
      'Bills & Utilities',
      'Healthcare',
      'Travel',
      'Gas & Fuel',
      'Groceries',
      'Transfer',
    ];
    const paymentMethods = [
      'Credit Card',
      'Debit Card',
      'Bank Transfer',
      'Cash',
      'PayPal',
      'Apple Pay',
    ];
    const statuses = ['completed', 'pending', 'failed'];

    return {
      transactionId: `TXN-${faker.string
        .alphanumeric({ length: 8 })
        .toUpperCase()}`,
      date: faker.date.recent({ days: 90 }).toISOString().split('T')[0],
      description: faker.helpers.arrayElement([
        faker.company.name(),
        `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
        faker.location.city() + ' Restaurant',
        faker.company.name() + ' Store',
        'Online Purchase',
        'Subscription Service',
        'Gas Station',
        'Grocery Store',
      ]),
      merchant: faker.company.name(),
      category: faker.helpers.arrayElement(categories),
      amount: transactionType === 'debit' ? -amount : amount,
      type: transactionType,
      paymentMethod: faker.helpers.arrayElement(paymentMethods),
      status: faker.helpers.arrayElement(statuses),
      balance: faker.number.float({ min: 500, max: 15000, fractionDigits: 2 }),
      reference: faker.string.alphanumeric({ length: 12 }).toUpperCase(),
      location: `${faker.location.city()}, ${faker.location.state()}`,
      accountNumber: `****${faker.string.numeric({ length: 4 })}`,
    };
  });
}

// Generate fake credit history data
function generateCreditHistory(count = 0) {
  return Array.from({ length: count }, () => {
    const reportDate = faker.date.past({ years: 2 });
    const score = faker.number.int({ min: 300, max: 850 });
    const previousScore = score + faker.number.int({ min: -50, max: 50 });
    const change = score - previousScore;

    return {
      id: faker.string.uuid(),
      date: reportDate.toISOString().split('T')[0],
      score,
      previousScore,
      change,
      provider: faker.helpers.arrayElement([
        'Experian',
        'Equifax',
        'TransUnion',
      ]),
      reportType: faker.helpers.arrayElement([
        'Monthly',
        'Quarterly',
        'Annual',
      ]),
      status: faker.helpers.arrayElement(['good', 'fair', 'poor', 'excellent']),
      utilization: faker.number.int({ min: 5, max: 95 }),
      accounts: faker.number.int({ min: 2, max: 15 }),
      inquiries: faker.number.int({ min: 0, max: 8 }),
    };
  });
}

export { generateFakeTransactions, generateCreditHistory };
