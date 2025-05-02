import * as React from 'react';

interface IndeedIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  title?: string;
}

const IndeedIcon: React.FC<IndeedIconProps> = ({
  width = 24,
  height = 24,
  title = 'Indeed Icon',
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
    <rect x={4} y={4} width={40} height={40} rx={8} fill='#003A9B' />
    <path
      fill='#FFFFFF'
      d='M24 16c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 12.8c-2.647 0-4.8-2.153-4.8-4.8s2.153-4.8 4.8-4.8c.884 0 1.694.243 2.4.643v-3.043c-.706-.1-1.416-.2-2.4-.2-4.418 0-8 3.582-8 8s3.582 8 8 8c.984 0 1.694-.1 2.4-.2v-3.043c-.706.4-1.516.643-2.4.643z'
    />
  </svg>
);

export default IndeedIcon;
