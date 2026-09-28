export default function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`w-full px-4 md:px-6 ${className}`}>
      {children}
    </div>
  );
}
