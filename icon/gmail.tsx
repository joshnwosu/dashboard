import * as React from 'react';

interface GmailIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  title?: string;
}

const GmailIcon: React.FC<GmailIconProps> = ({
  width = 24,
  height = 24,
  title = 'Gmail Icon',
  className,
  ...props
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 48 48'
    preserveAspectRatio='xMidYMid meet'
    className={className}
    role='img'
    aria-label={title}
    {...props}
  >
    {title && <title>{title}</title>}
    <path fill='#4caf50' d='m45 16.2-5 2.75-5 4.75V40h7a3 3 0 0 0 3-3V16.2z' />
    <path
      fill='#1e88e5'
      d='m3 16.2 3.614 1.71L13 23.7V40H6a3 3 0 0 1-3-3V16.2z'
    />
    <path
      fill='#e53935'
      d='m35 11.2-11 8.25-11-8.25-1 5.8 1 6.7 11 8.25 11-8.25 1-6.7z'
    />
    <path
      fill='#c62828'
      d='M3 12.298V16.2l10 7.5V11.2L9.876 8.859A4.298 4.298 0 0 0 3 12.298z'
    />
    <path
      fill='#fbc02d'
      d='M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A4.298 4.298 0 0 1 45 12.298z'
    />
  </svg>
);

export default GmailIcon;
