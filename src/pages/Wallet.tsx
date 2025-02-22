
import { useLanguage } from "@/contexts/LanguageContext";

export default function Wallet() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen px-6 animate-fade-in">
      <h1 className="text-4xl font-bold">{t('nav.wallet')}</h1>
    </div>
  );
}
