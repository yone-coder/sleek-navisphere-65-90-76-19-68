
import { useLanguage } from "@/contexts/LanguageContext";

export default function Profile() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 px-6 animate-fade-in">
      <h1 className="text-4xl font-bold">{t('nav.profile')}</h1>
    </div>
  );
}
