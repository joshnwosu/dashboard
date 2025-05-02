import { Switch } from '@/components/ui/switch';
import {
  GithubIcon,
  GmailIcon,
  GoogleCalendarIcon,
  IndeedIcon,
  LinkedinIcon,
} from '@/icon';

const data = [
  {
    name: 'LinkedIn',
    description:
      'Connect your LinkedIn account to view and manage your connections.',
    icon: <LinkedinIcon width={60} height={60} />,
    checked: true,
  },
  {
    name: 'Github',
    description:
      'Connect your Github account to manage your repositories and projects.',
    icon: <GithubIcon width={50} height={50} />,
    checked: false,
  },
  {
    name: 'Indeed',
    description:
      'Connect your Indeed account to manage your job postings and applications.',
    icon: <IndeedIcon width={50} height={50} />,
    checked: false,
  },
  {
    name: 'Gmail',
    description:
      'Connect your Gmail account to send and receive emails directly from the app.',
    icon: <GmailIcon width={50} height={50} />,
    checked: true,
  },
  {
    name: 'Google Calendar',
    description:
      'Connect your Google Calendar to schedule and manage your events.',
    icon: <GoogleCalendarIcon width={50} height={50} />,
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
            {item.icon}
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
