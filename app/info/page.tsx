'use client';

import Drawer from '@/components/Drawer';
import Header from '@/components/Header';
import { useAppStore } from '@/store/useAppStore';

export default function AboutPage() {
  const { drawerOpen, setDrawerOpen } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setDrawerOpen(true)} />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="card animate-slide-up">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            ℹ️ Informazioni sull'App
          </h1>

          <div className="space-y-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <strong>⚠️ Disclaimer:</strong> Questa non è un'applicazione ufficiale del Comune di Genova. 
                I dati sono forniti a scopo informativo e potrebbero non essere aggiornati.
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <h4 className="font-bold text-primary mb-2">📄 Fonte Ufficiale</h4>
                <p>
                  Per informazioni ufficiali, consultare sempre il sito del Comune di Genova 
                  o il{' '}
                  <a 
                    href="https://www.comune.genova.it/sites/default/files/2025-08/Brochure%20menu%202025-2026%20_%20Inf-Prim-Sec.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    PDF ufficiale del menu scolastico
                  </a>.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-primary mb-2">👨‍💻 Sviluppo</h4>
                <p>
                  App sviluppata per facilitare la consultazione del menu scolastico 
                  da parte di genitori e studenti.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-primary mb-2">🔄 Aggiornamenti</h4>
                <p>
                  Ultimo aggiornamento dati: <strong>Giugno 2025</strong>
                </p>
              </div>

              <div>
                <h4 className="font-bold text-primary mb-2">💡 Caratteristiche</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Consultazione offline (PWA)</li>
                  <li>Menu settimanale completo</li>
                  <li>Info su alimenti biologici e DOP</li>
                  <li>Aggiornamento automatico</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Drawer */}
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
