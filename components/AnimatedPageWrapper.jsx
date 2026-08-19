export default function AnimatedPageWrapper({ children, className = "" }) {
  return (
    <main className={`page-enter ${className}`}>
      {children}
    </main>
  );
}
