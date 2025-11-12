"use client";

import Drawer from "@/components/Drawer";
import Header from "@/components/Header";
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";

export default function InfoAlimentiPage() {
  const { drawerOpen, setDrawerOpen, infoAlimenti, loadData } = useAppStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!infoAlimenti) {
    return (
      <div className="min-h-screen bg-background">
        <Header onMenuClick={() => setDrawerOpen(true)} />
        <main className="container mx-auto px-4 py-6 max-w-2xl">
          <div className="card animate-slide-up">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Caricamento...
            </p>
          </div>
        </main>
        <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setDrawerOpen(true)} />

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="card animate-slide-up">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            🌱 Qualità degli Alimenti (CAM)
          </h1>

          <div className="space-y-6">
            {/* Note Importanti */}
            <section className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                📝 Note Importanti
              </h3>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                <li>• {infoAlimenti.notes.frozen}</li>
                <li>• {infoAlimenti.notes.bread}</li>
                <li>• {infoAlimenti.notes.cohabitation}</li>
              </ul>
            </section>

            {/* Preparazioni per Età */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-3">
                👶 Preparazioni per Età
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    {infoAlimenti.agePreparations.primary.title}
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {infoAlimenti.agePreparations.primary.items.map(
                      (item, idx) => (
                        <li key={idx}>• {item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    {infoAlimenti.agePreparations.infant.title}
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {infoAlimenti.agePreparations.infant.items.map(
                      (item, idx) => (
                        <li key={idx}>• {item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* Menu Emergenza */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-3">
                🚨 Menu Emergenza
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    {infoAlimenti.emergencyMenu.external.title}
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {infoAlimenti.emergencyMenu.external.items.map(
                      (item, idx) => (
                        <li key={idx}>• {item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    {infoAlimenti.emergencyMenu.delivered.title}
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {infoAlimenti.emergencyMenu.delivered.items.map(
                      (item, idx) => (
                        <li key={idx}>• {item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* Alimenti Biologici */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-3">
                {infoAlimenti.organicFoods.title}
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                {infoAlimenti.organicFoods.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Percentuali Minime Bio
              </h4>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {infoAlimenti.organicFoods.percentages.map((item, idx) => (
                  <p key={idx}>• {item}</p>
                ))}
              </div>
            </section>

            {/* Alimenti DOP */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-3">
                {infoAlimenti.dopFoods.title}
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {infoAlimenti.dopFoods.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Alimenti Equosolidali */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-3">
                {infoAlimenti.fairTrade.title}
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {infoAlimenti.fairTrade.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Alimenti Made in Italy */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-3">
                {infoAlimenti.madeInItaly.title}
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {infoAlimenti.madeInItaly.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Alimenti Senza Zuccheri Aggiunti */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-3">
                {infoAlimenti.noAddedSugar.title}
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {infoAlimenti.noAddedSugar.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Alimenti da Pesca Sostenibile */}
            <section>
              <h3 className="text-lg font-bold text-primary mb-3">
                {infoAlimenti.sustainableFishing.title}
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {infoAlimenti.sustainableFishing.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Credits */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                {infoAlimenti.generalInfo.credits}
                <br />
                Ultimo aggiornamento: {infoAlimenti.generalInfo.lastUpdate}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Drawer */}
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
