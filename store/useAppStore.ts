import { apiFetch } from "@/lib/api";
import { getMenuForDate, getNextAvailableDate } from "@/lib/utils";
import type { CalendarData, InfoAlimenti, MenuData } from "@/types";
import { create } from "zustand";

interface AppState {
  // UI State
  drawerOpen: boolean;
  isCalendarOpen: boolean;

  // Data State
  selectedDate: Date;
  calendarData: CalendarData | null;
  menuData: MenuData | null;
  infoAlimenti: InfoAlimenti | null;
  currentMenu: any | null;
  isLoading: boolean;

  // Actions
  setDrawerOpen: (open: boolean) => void;
  setCalendarOpen: (open: boolean) => void;
  selectDate: (date: Date) => void;
  loadData: () => Promise<void>;
  goToPreviousDay: () => void;
  goToNextDay: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  drawerOpen: false,
  isCalendarOpen: false,
  selectedDate: new Date(),
  calendarData: null,
  menuData: null,
  infoAlimenti: null,
  currentMenu: null,
  isLoading: true,

  // Simple Setters
  setDrawerOpen: (open) => set({ drawerOpen: open }),
  setCalendarOpen: (open) => set({ isCalendarOpen: open }),

  // Select date and update menu automatically
  selectDate: (date) => {
    const { calendarData, menuData } = get();
    if (!calendarData || !menuData) return;

    const menu = getMenuForDate(date, calendarData, menuData);
    set({
      selectedDate: date,
      currentMenu: menu,
      isCalendarOpen: false, // Close calendar when selecting a date
    });
  },

  // Load all data on app init
  loadData: async () => {
    try {
      set({ isLoading: true });

      const [calendar, menu, infoAlimenti] = await Promise.all([
        apiFetch("/data/menu-calendar.json").then((r) => r.json()),
        apiFetch("/data/menu-data.json").then((r) => r.json()),
        apiFetch("/data/info-alimenti.json").then((r) => r.json()),
      ]);

      // Set initial date to today or next available date
      const nextDate = getNextAvailableDate(new Date(), calendar);
      const currentMenu = nextDate
        ? getMenuForDate(nextDate, calendar, menu)
        : null;

      set({
        calendarData: calendar,
        menuData: menu,
        infoAlimenti: infoAlimenti,
        selectedDate: nextDate || new Date(),
        currentMenu,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error loading data:", error);
      set({ isLoading: false });
    }
  },

  // Navigate to previous available day
  goToPreviousDay: () => {
    const { selectedDate, calendarData, menuData } = get();
    if (!calendarData || !menuData) return;

    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevAvailable = getNextAvailableDate(
      prevDate,
      calendarData,
      "backward"
    );

    if (prevAvailable && prevAvailable < selectedDate) {
      const menu = getMenuForDate(prevAvailable, calendarData, menuData);
      set({
        selectedDate: prevAvailable,
        currentMenu: menu,
      });
    }
  },

  // Navigate to next available day
  goToNextDay: () => {
    const { selectedDate, calendarData, menuData } = get();
    if (!calendarData || !menuData) return;

    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const nextAvailable = getNextAvailableDate(
      nextDate,
      calendarData,
      "forward"
    );

    if (nextAvailable) {
      const menu = getMenuForDate(nextAvailable, calendarData, menuData);
      set({
        selectedDate: nextAvailable,
        currentMenu: menu,
      });
    }
  },
}));
