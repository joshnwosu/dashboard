import CardGrid, { ItemProps } from '@/components/card-grid';
import { shuffleArray } from '@/utils/shuffleArray';
import { notFound } from 'next/navigation';

interface HistoryPageProps {
  params: Promise<{ id: string }>;
}

const items: ItemProps[] = [
  {
    avatar: 'https://i.pravatar.cc/150?img=1',
    name: 'John Doe',
    about:
      'John is a seasoned Software Engineer with over 8 years of experience building scalable web applications and microservices architectures. Specializing in full-stack development, he is proficient in JavaScript, Python, and Go, with a strong focus on cloud-native solutions using AWS and Kubernetes. At Tech Corp, John leads a team of developers in creating robust APIs and optimizing system performance, reducing latency by 30% through innovative caching strategies. Passionate about clean code and agile methodologies, he mentors junior engineers and contributes to open-source projects in his spare time.',
    jobTitle: 'Software Engineer',
    company: 'Tech Corp',
    status: 'Active',
    value: '93%',
    type: 'increase',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=2',
    name: 'Jane Smith',
    about:
      'Jane is an accomplished Product Manager with a knack for transforming complex ideas into user-centric products. With a background in business strategy and 6 years of experience in tech, she excels at bridging the gap between engineering, design, and marketing teams. At Business Inc, Jane spearheaded the launch of a flagship SaaS platform, increasing user retention by 25% through data-driven feature prioritization. Her expertise in Agile and Scrum frameworks, combined with her ability to conduct market analysis, ensures that her products consistently meet customer needs and drive business growth.',
    jobTitle: 'Product Manager',
    company: 'Business Inc',
    status: 'Inactive',
    value: '25%',
    type: 'decrease',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=3',
    name: 'Alice Johnson',
    about:
      'Alice is a creative UI/UX Designer with a passion for crafting intuitive and visually stunning user experiences. With 5 years of experience in the design industry, she specializes in user research, wireframing, and high-fidelity prototyping using tools like Figma and Adobe XD. At Creative Studio, Alice redesigned the company’s flagship mobile app, improving user satisfaction scores by 40% through iterative testing and empathetic design. Her expertise in accessibility standards and design systems ensures that her interfaces are both inclusive and scalable, earning her recognition in industry design awards.',
    jobTitle: 'UI/UX Designer',
    company: 'Creative Studio',
    status: 'Pending',
    value: '50%',
    type: 'neutral',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=4',
    name: 'Bob Brown',
    about:
      'Bob is a dynamic Marketing Manager with a proven track record of driving brand growth and customer engagement. With 7 years of experience in digital marketing, he specializes in content strategy, SEO, and paid advertising campaigns across platforms like Google Ads and LinkedIn. At Data Solutions, Bob developed a multi-channel marketing campaign that boosted lead generation by 35% and increased brand awareness in key markets. His analytical mindset and expertise in tools like HubSpot and Google Analytics allow him to optimize campaigns in real-time, delivering measurable ROI for his team.',
    jobTitle: 'Marketing Manager',
    company: 'Data Solutions',
    status: 'Active',
    value: '45%',
    type: 'medium',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=5',
    name: 'Emma Wilson',
    about:
      'Emma is a skilled Data Scientist with a passion for uncovering insights from complex datasets. With 6 years of experience in machine learning and statistical analysis, she specializes in predictive modeling and data visualization using Python, R, and Tableau. At Insight Analytics, Emma developed a churn prediction model that improved customer retention by 20%. Her ability to communicate technical findings to non-technical stakeholders has made her a key asset in cross-functional teams, and she actively contributes to data science communities.',
    jobTitle: 'Data Scientist',
    company: 'Insight Analytics',
    status: 'Active',
    value: '20%',
    type: 'increase',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=6',
    name: 'Michael Chen',
    about:
      'Michael is an experienced DevOps Engineer with a focus on automating infrastructure and improving CI/CD pipelines. With 7 years in the field, he is proficient in tools like Docker, Terraform, and Jenkins, and has a strong background in AWS and Azure. At CloudWorks, Michael reduced deployment times by 40% by implementing automated workflows. His expertise in monitoring and observability ensures high availability for critical systems, and he enjoys mentoring teams on best practices for cloud architecture.',
    jobTitle: 'DevOps Engineer',
    company: 'CloudWorks',
    status: 'Pending',
    value: '15%',
    type: 'decrease',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=7',
    name: 'Sarah Davis',
    about:
      'Sarah is a talented Content Strategist with a knack for creating compelling narratives that resonate with audiences. With 5 years of experience in content marketing, she specializes in blog writing, social media strategy, and video scripting. At BrandBuzz, Sarah increased organic traffic by 30% through SEO-optimized content. Her collaborative approach and proficiency in tools like SEMrush and Hootsuite make her a vital part of any marketing team, and she’s passionate about storytelling.',
    jobTitle: 'Content Strategist',
    company: 'BrandBuzz',
    status: 'Inactive',
    value: '30%',
    type: 'neutral',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=8',
    name: 'David Lee',
    about:
      'David is a strategic Business Analyst with expertise in process optimization and requirements gathering. With 8 years of experience, he excels at translating business needs into technical solutions, using tools like Jira and Confluence. At Growth Partners, David streamlined operations, reducing costs by 25% through process automation. His strong analytical skills and ability to work with cross-functional teams ensure successful project delivery, and he’s known for his attention to detail.',
    jobTitle: 'Business Analyst',
    company: 'Growth Partners',
    status: 'Active',
    value: '60%',
    type: 'medium',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=9',
    name: 'Laura Martinez',
    about:
      'Laura is an innovative Mobile Developer with a focus on creating high-performance iOS and Android applications. With 6 years of experience in Swift, Kotlin, and React Native, she builds seamless user experiences. At AppCrafters, Laura led the development of a fitness app that gained 100,000 downloads in its first year. Her expertise in mobile architecture and passion for clean code make her a leader in app development, and she frequently speaks at tech meetups.',
    jobTitle: 'Mobile Developer',
    company: 'AppCrafters',
    status: 'Pending',
    value: '75%',
    type: 'increase',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=10',
    name: 'Thomas Patel',
    about:
      'Thomas is a dedicated Cybersecurity Analyst with a focus on protecting organizations from digital threats. With 7 years of experience in penetration testing and threat analysis, he is skilled in tools like Wireshark, Metasploit, and Splunk. At SecureNet, Thomas reduced security incidents by 50% through proactive vulnerability assessments. His ability to stay ahead of emerging threats and educate teams on security best practices makes him a trusted expert in the field.',
    jobTitle: 'Cybersecurity Analyst',
    company: 'SecureNet',
    status: 'Active',
    value: '10%',
    type: 'decrease',
  },
];

export default async function HistoryPage({ params }: HistoryPageProps) {
  const { id } = await params;

  const historyItem = { id };

  if (!historyItem) {
    notFound();
  }

  return <CardGrid items={shuffleArray(items)} />;
}

export async function generateStaticParams() {
  const ids = ['1', '2', '3'];
  return ids.map((id) => ({ id }));
}

export const revalidate = 60;
