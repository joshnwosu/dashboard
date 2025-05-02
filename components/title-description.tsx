import { Separator } from '@/components/ui/separator';

interface TitleDescriptionProps {
  title: string;
  description?: string;
}

export default function TitleDescription({
  title,
  description,
}: TitleDescriptionProps) {
  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl font-semibold'>{title}</h1>
      {description && (
        <p className='text-lg text-gray-500 mt-1'>{description}</p>
      )}
      <Separator className='my-4' />
    </div>
  );
}
