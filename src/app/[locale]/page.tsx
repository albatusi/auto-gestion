import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage({ params }: { params: { locale: string } }) {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-6">
      <h1 className="text-4xl font-bold text-blue-600">{t('welcome')}</h1>
      <p className="text-gray-600">{t('description')}</p>

      <div className="space-x-4 mt-4">
        <Link href={`/${params.locale}/dashboard`} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
