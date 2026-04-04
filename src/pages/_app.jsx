import { LanguageProvider } from '@/components/LanguageContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
