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
  //   {
  //     query:
  //       'Nigerian engineers skilled in JavaScript and React Native, employed at Series B startups in the last 12 months',
  //     time: '2025-05-01T09:00:00Z',
  //   },
  //   {
  //     query:
  //       'Series B software companies in Nigeria hiring JavaScript and React Native engineers in 2025',
  //     time: '2025-02-17T11:20:00Z',
  //   },
  //   {
  //     query:
  //       'In-demand Nigerian engineers at Series B-funded companies this year with skills in React Native and JavaScript',
  //     time: '2025-04-05T15:30:00Z',
  //   },
  //   {
  //     query:
  //       'Current job holders in Nigeria working at Series B companies with JavaScript and React Native skills',
  //     time: '2025-01-01T08:00:00Z',
  //   },
  //   {
  //     query:
  //       'Nigerian software engineers at Series B startups as of 2024/2025, skilled in JavaScript and React Native',
  //     time: '2025-03-10T10:15:00Z',
  //   },
  //   {
  //     query:
  //       'Recent profiles of engineers in Nigeria at Series B stage companies with React Native and JavaScript expertise',
  //     time: '2025-04-28T13:45:00Z',
  //   },
];
