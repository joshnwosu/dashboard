// Reusable Components
const SkeletonLine = ({
  width = 'w-full',
  height = 'h-3',
  className = '',
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    className={`${height} bg-muted/90 rounded animate-pulse ${width} ${className}`}
  />
);

export default SkeletonLine;
