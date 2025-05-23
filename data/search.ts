interface SearchQuery {
  query: string;
  time: string; // ISO string or formatted date
}

export const searchQueries: SearchQuery[] = [
  {
    query:
      'Software Engineers in Nigeria working at Series B companies in 2024, skilled in JavaScript and React Native',
    time: '2024-11-01T10:00:00Z',
  },
  {
    query:
      'Top Nigerian Software Engineers at Series B startups this year with expertise in React Native and JavaScript',
    time: '2025-01-15T08:30:00Z',
  },
  {
    query:
      'React Native and JavaScript developers in Nigeria at Series B companies as of Q1 2025',
    time: '2025-03-20T12:45:00Z',
  },
  {
    query:
      'Software Engineers based in Nigeria working at Series B firms recently, proficient in JavaScript and React Native',
    time: '2024-12-10T14:00:00Z',
  },
];
