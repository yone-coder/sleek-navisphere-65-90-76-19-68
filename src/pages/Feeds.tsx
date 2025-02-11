
import { useLanguage } from "@/contexts/LanguageContext";

export default function Feeds() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 px-6 animate-fade-in">
      <h1 className="text-4xl font-bold">{t('nav.feeds')}</h1>
    </div>
  );
}
