import { CalendarData, MenuData, MenuItem, Season } from "@/types";

/**
 * Parse a menu item value that may contain seasonal variations
 * Format: "Dish (inverno) / Alternative dish (estate)"
 * Returns the appropriate dish for the season and whether it's seasonal
 */
export function parseSeasonalItem(
  value: string | undefined,
  season: Season
): { value: string; isSeasonal: boolean } | null {
  if (!value) return null;

  // Check if item has seasonal variants (contains " / " and "(inverno)" or "(estate)")
  if (
    value.includes(" / ") &&
    (value.includes("(inverno)") || value.includes("(estate)"))
  ) {
    const parts = value.split(" / ");
    const seasonalItem = parts.find((part) =>
      part.includes(`(${season === "winter" ? "inverno" : "estate"})`)
    );

    if (seasonalItem) {
      // Remove the season label from the value
      const cleanValue = seasonalItem
        .replace(/\s*\((inverno|estate)\)\s*/g, "")
        .trim();
      return { value: cleanValue, isSeasonal: true };
    }
  }

  // No seasonal variant, return as is
  return { value, isSeasonal: false };
}

/**
 * Parse an entire menu item, extracting seasonal dishes
 */
export function parseMenuItem(
  menuItem: MenuItem,
  season: Season
): MenuItem & { seasonalItems: Set<string> } {
  const parsed: any = { seasonalItems: new Set<string>() };

  (Object.keys(menuItem) as Array<keyof MenuItem>).forEach((key) => {
    const result = parseSeasonalItem(menuItem[key], season);
    if (result) {
      parsed[key] = result.value;
      if (result.isSeasonal) {
        parsed.seasonalItems.add(key);
      }
    }
  });

  return parsed;
}

export function getMenuForDate(
  date: Date,
  calendarData: CalendarData,
  menuData: MenuData
): any {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const dateString = `${year}-${month}-${day}`;

  // Check if it's a holiday
  if (calendarData.holidays.includes(dateString)) {
    return null;
  }

  // Check if it's Sunday (0) or Saturday (6)
  if (date.getDay() === 0 || date.getDay() === 6) {
    return null;
  }

  // Find the week number by checking if date falls within any week range
  const currentDate = new Date(dateString);
  let weekNumber: number | null = null;

  for (const range of calendarData.weekRanges) {
    const startDate = new Date(range.start);
    const endDate = new Date(range.end);

    if (currentDate >= startDate && currentDate <= endDate) {
      weekNumber = range.week;
      break;
    }
  }

  if (!weekNumber) {
    return null;
  }

  // Determine season based on transition dates
  let season: Season = "summer"; // Default to summer

  if (calendarData.seasonTransitions) {
    const currentDate = new Date(dateString);
    const { winterStart, summerStart } = calendarData.seasonTransitions;

    if (winterStart && summerStart) {
      const winterStartDate = new Date(winterStart);
      const summerStartDate = new Date(summerStart);

      // Check if we're in the winter period
      if (currentDate >= winterStartDate && currentDate < summerStartDate) {
        season = "winter";
      }
    }
  }

  // Get day of week (1 = Monday, 5 = Friday)
  const dayOfWeek = date.getDay();
  const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayName = dayNames[dayOfWeek] as keyof (typeof menuData.weeks)[string];

  // Get menu for this week and day
  const weekMenu = menuData.weeks[weekNumber.toString()];
  if (!weekMenu || !weekMenu[dayName]) {
    return null;
  }

  // Parse the menu to extract seasonal items
  const parsedMenu = parseMenuItem(weekMenu[dayName], season);

  return {
    menu: parsedMenu,
    weekNumber,
    dayName,
    season,
  };
}

export function getSeason(date: Date): "winter" | "summer" {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Winter: November 1 - April 15 (approx)
  if (
    month === 11 ||
    month === 12 ||
    month === 1 ||
    month === 2 ||
    month === 3
  ) {
    return "winter";
  }
  if (month === 4 && day <= 15) {
    return "winter";
  }

  return "summer";
}

/**
 * Check if a date has a menu available
 */
export function hasMenuForDate(
  date: Date,
  calendarData: CalendarData
): boolean {
  // Check if it's a weekend
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return false;

  // Check if it's a holiday
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;

  if (calendarData.holidays.includes(dateString)) return false;

  // Normalize the input date to midnight for comparison
  const normalizedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // Check if this date falls within any week range
  return calendarData.weekRanges.some((range) => {
    const startDate = new Date(range.start + "T00:00:00");
    const endDate = new Date(range.end + "T00:00:00");
    return normalizedDate >= startDate && normalizedDate <= endDate;
  });
}

export function getNextAvailableDate(
  startDate: Date,
  calendarData: CalendarData,
  direction: "forward" | "backward" = "forward"
): Date | null {
  const maxDays = 365;
  let currentDate = new Date(startDate);

  for (let i = 0; i < maxDays; i++) {
    if (hasMenuForDate(currentDate, calendarData)) {
      return currentDate;
    }

    // Move to next/previous day based on direction
    if (direction === "forward") {
      currentDate.setDate(currentDate.getDate() + 1);
    } else {
      currentDate.setDate(currentDate.getDate() - 1);
    }
  }

  return null;
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("it-IT", options);
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
