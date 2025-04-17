export default function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <p>Hi</p>
      {children}
    </>
  );
}
