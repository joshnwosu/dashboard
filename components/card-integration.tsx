import { Switch } from '@/components/ui/switch';

const data = [
  {
    name: 'LinkedIn',
    description:
      'Connect your LinkedIn account to view and manage your connections.',
    icon: '/images/linkedin.png',
    checked: true,
  },
  {
    name: 'Github',
    description:
      'Connect your Github account to manage your repositories and projects.',
    icon: '/images/github.png',
    checked: false,
  },
  {
    name: 'Indeed',
    description:
      'Connect your Indeed account to manage your job postings and applications.',
    icon: '/images/indeed.png',
    checked: false,
  },
  {
    name: 'Gmail',
    description:
      'Connect your Gmail account to send and receive emails directly from the app.',
    icon: '/images/gmail.png',
    checked: true,
  },
  {
    name: 'Google Calendar',
    description:
      'Connect your Google Calendar to schedule and manage your events.',
    icon: '/images/google-calendar.png',
    checked: false,
  },
];

export default function CardIntergratins() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {data.map((item) => (
        <div
          key={item.name}
          className='flex flex-col gap-4 p-6 rounded-lg bg-muted/50'
        >
          <div className='flex justify-between items-start'>
            <img
              src={item.icon}
              alt={item.name}
              className='w-12 h-12 rounded-md'
            />
            <Switch
              defaultChecked={item.checked}
              onCheckedChange={() => console.log('Hi')}
              variant='default'
            />
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-sans'>{item.name}</h2>
            <p className='text-md text-muted-foreground'>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
