'use client';
import CardIntergratins from '@/components/card-integration';
import TitleDescription from '@/components/title-description';

export default function intergratins() {
  return (
    <div className=''>
      <TitleDescription
        title='Integration'
        description='Connect all your tools to leverage the best performance'
      />

      <CardIntergratins />
    </div>
  );
}
