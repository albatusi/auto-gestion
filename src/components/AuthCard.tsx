interface Props {
  title: string;
  children: React.ReactNode;
}

export default function AuthCard({ title, children }: Props) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">{title}</h2>
        {children}
      </div>
    </section>
  );
}
