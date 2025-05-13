import { Separator } from '@/components/ui/separator';
import { Button } from './ui/button';

interface TitleDescriptionProps {
  title: string;
  description?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function TitleDescription({
  title,
  description,
  showButton = false,
  buttonText = 'Continue',
  onButtonClick,
}: TitleDescriptionProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-3xl font-semibold'>{title ?? 'Page Title'}</h1>
          {description && (
            <p className='text-lg text-gray-500 mt-1'>{description}</p>
          )}
        </div>
        {showButton && (
          <Button onClick={onButtonClick} className='ml-4 mt-1'>
            {buttonText}
          </Button>
        )}
      </div>
      <Separator className='my-4' />
    </div>
  );
}
