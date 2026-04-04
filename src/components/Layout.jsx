import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { t } from '@/lib/i18n';
import { BRAND_COLORS } from '@/lib/constants';

export default function Layout({ children }) {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ borderColor: BRAND_COLORS.border }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <span style={{ color: BRAND_COLORS.primary }}>Silma</span>tervis
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              {t('home', language)}
            </Link>
            <Link
              href="#conditions"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              {t('conditions', language) || 'Conditions'}
            </Link>
            <Link
              href="#procedures"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              {t('procedures', language) || 'Procedures'}
            </Link>
            <Link
              href="#about"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              {t('about', language)}
            </Link>
          </nav>

          {/* Language Selector */}
          <LanguageSelector />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="border-t mt-16"
        style={{ borderColor: BRAND_COLORS.border }}
      >
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div>
              <h3 className="font-bold mb-4">Silmatervis</h3>
              <p className="text-sm text-gray-600">
                {t('brand_description', language) || 'Eye health education platform by KSA Vision Clinic'}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">{t('quick_links', language) || 'Quick Links'}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {t('home', language)}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://ksa.ee"
                    target="_blank"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    KSA.ee
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://blog.ksa.ee"
                    target="_blank"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">{t('resources', language) || 'Resources'}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://rendia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Rendia Videos
                  </a>
                </li>
                <li>
                  <a
                    href="https://schema.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Medical Schema
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">{t('contact', language) || 'Contact'}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>info@ksa.ee</li>
                <li>+372 6 88 0000</li>
                <li>Tallinn, Estonia</li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div
            className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600"
            style={{ borderColor: BRAND_COLORS.border }}
          >
            <p>
              &copy; 2026{' '}
              <a href="https://ksa.ee" className="hover:text-gray-900">
                KSA Vision Clinic
              </a>
              . All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#privacy" className="hover:text-gray-900">
                {t('privacy', language) || 'Privacy'}
              </a>
              <a href="#terms" className="hover:text-gray-900">
                {t('terms', language) || 'Terms'}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="px-3 py-2 border rounded text-sm"
      style={{
        borderColor: BRAND_COLORS.border,
        color: BRAND_COLORS.dark,
      }}
    >
      <option value="en">English</option>
      <option value="est">Eesti</option>
      <option value="ru">Русский</option>
    </select>
  );
}
