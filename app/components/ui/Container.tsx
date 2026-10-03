export default function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-5 md:px-6 lg:px-10 xl:px-12 ${className}`}>
      {children}
    </div>
  );
}
