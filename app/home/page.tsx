"use client";

import Drawer from "@/components/Drawer";
import Header from "@/components/Header";
import { hasMenuForDate } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function HomePage() {
  // Zustand store
  const {
    drawerOpen,
    setDrawerOpen,
    isCalendarOpen,
    setCalendarOpen,
    selectedDate,
    selectDate,
    infoAlimenti,
    currentMenu,
    calendarData,
    loadData,
    goToPreviousDay,
    goToNextDay,
  } = useAppStore();

  const calendarRef = useRef<HTMLDivElement>(null);

  // Load data only once on mount
  useEffect(() => {
    loadData();
  }, []);

  // Handle click outside calendar to close it
  useEffect(() => {
    if (!isCalendarOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen, setCalendarOpen]);

  const renderMenuItem = (
    label: string,
    value?: string,
    isSeasonal?: boolean
  ) => {
    if (!value) return null;

    const isWinter = currentMenu?.season === "winter";
    const seasonIcon = isWinter ? "❄️" : "☀️";
    const seasonLabel = isWinter ? "Invernale" : "Estivo";
    const seasonBgColor = isWinter
      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";

    return (
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-primary uppercase mb-1">
          {label}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-base text-gray-800 dark:text-gray-200">{value}</p>
          {isSeasonal && (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${seasonBgColor}`}
            >
              {seasonIcon} {seasonLabel}
            </span>
          )}
        </div>
      </div>
    );
  };

  // Check if menu has frozen items (indicated with *)
  const hasFrozenItems =
    currentMenu &&
    Object.values(currentMenu.menu).some(
      (value) => typeof value === "string" && value.includes("*")
    );

  // Function to disable dates without menu (weekends, holidays, out of calendar)
  const isDateDisabled = (date: Date): boolean => {
    if (!calendarData) return true;
    return !hasMenuForDate(date, calendarData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setDrawerOpen(true)} />

      <main className="container mx-auto px-4 py-6 max-w-2xl ">
        {/* Date Selector */}
        <div className="card mb-6 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={goToPreviousDay}
              className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
              aria-label="Giorno precedente"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex-1 relative" ref={calendarRef}>
              <button
                onClick={() => setCalendarOpen(!isCalendarOpen)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-primary focus:border-primary focus:outline-none transition-colors text-center font-medium flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {format(selectedDate, "dd/MM/yyyy", { locale: it })}
              </button>

              {isCalendarOpen && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-primary/20 p-4">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && selectDate(date)}
                    locale={it}
                    fromDate={new Date(2025, 8, 1)}
                    toDate={new Date(2026, 5, 30)}
                    disabled={isDateDisabled}
                    className="custom-daypicker"
                  />
                </div>
              )}
            </div>

            <button
              onClick={goToNextDay}
              className="p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
              aria-label="Giorno successivo"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* <p className="text-center text-gray-600 dark:text-gray-400 font-medium">
            {formatDate(selectedDate)}
          </p> */}
        </div>

        {/* Menu Display */}
        {currentMenu ? (
          <div
            className="card animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                🍽️ Menu del giorno
              </h2>
              <span className="px-3 py-1 bg-secondary text-gray-800 rounded-full text-sm font-semibold">
                Settimana {currentMenu.weekNumber}
              </span>
            </div>

            <div className="space-y-2">
              {renderMenuItem(
                "Primo",
                currentMenu.menu.primo,
                currentMenu.menu.seasonalItems?.has("primo")
              )}
              {renderMenuItem(
                "Secondo",
                currentMenu.menu.secondo,
                currentMenu.menu.seasonalItems?.has("secondo")
              )}
              {renderMenuItem(
                "Formaggio",
                currentMenu.menu.formaggio,
                currentMenu.menu.seasonalItems?.has("formaggio")
              )}
              {renderMenuItem(
                "Contorno",
                currentMenu.menu.contorno,
                currentMenu.menu.seasonalItems?.has("contorno")
              )}
              {renderMenuItem(
                "Pane",
                currentMenu.menu.pane,
                currentMenu.menu.seasonalItems?.has("pane")
              )}
              {renderMenuItem(
                "Frutta",
                currentMenu.menu.frutta,
                currentMenu.menu.seasonalItems?.has("frutta")
              )}
              {renderMenuItem(
                "Dolce",
                currentMenu.menu.dolce,
                currentMenu.menu.seasonalItems?.has("dolce")
              )}

              {currentMenu.menu.note && (
                <div className="mt-4 p-3 bg-secondary/20 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Note:</strong> {currentMenu.menu.note}
                  </p>
                </div>
              )}
            </div>

            {/* Important Notes - Always show frozen products info */}
            {infoAlimenti && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 text-sm">
                  📝 Nota Importante
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  {infoAlimenti.notes.frozen}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div
            className="card text-center animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Nessun menu disponibile
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Non c'è menu per questa data (weekend, festivo o fuori calendario
              scolastico)
            </p>
          </div>
        )}
      </main>

      {/* Drawer */}
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
