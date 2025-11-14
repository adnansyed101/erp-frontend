export default function HRManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Create Employee
        </h1>
        <div>{children}</div>
      </div>
    </main>
  );
}
