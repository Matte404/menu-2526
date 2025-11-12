export interface MenuItem {
  primo?: string;
  secondo?: string;
  formaggio?: string;
  contorno?: string;
  pane?: string;
  frutta?: string;
  dolce?: string;
  note?: string;
}

export interface WeekMenu {
  monday: MenuItem;
  tuesday: MenuItem;
  wednesday: MenuItem;
  thursday: MenuItem;
  friday: MenuItem;
}

export interface MenuData {
  weeks: {
    [key: string]: WeekMenu;
  };
  seasonInfo: {
    winter: {
      start: string;
      end: string;
      description: string;
    };
    summer: {
      start: string;
      end: string;
      description: string;
    };
  };
}

export interface WeekRange {
  week: number;
  start: string;
  end: string;
}

export interface CalendarData {
  seasonTransitions: {
    winterStart: string;
    summerStart: string;
  };
  weekRanges: WeekRange[];
  holidays: string[];
}

export type Season = "winter" | "summer";

export interface InfoAlimenti {
  generalInfo: {
    title: string;
    description: string;
    lastUpdate: string;
    credits: string;
  };
  notes: {
    frozen: string;
    bread: string;
    cohabitation: string;
  };
  agePreparations: {
    primary: {
      title: string;
      items: string[];
    };
    infant: {
      title: string;
      items: string[];
    };
  };
  emergencyMenu: {
    external: {
      title: string;
      items: string[];
    };
    delivered: {
      title: string;
      items: string[];
    };
  };
  organicFoods: {
    title: string;
    items: string[];
    percentages: string[];
  };
  dopFoods: {
    title: string;
    items: string[];
  };
  fairTrade: {
    title: string;
    items: string[];
  };
  madeInItaly: {
    title: string;
    items: string[];
  };
  noAddedSugar: {
    title: string;
    items: string[];
  };
  sustainableFishing: {
    title: string;
    items: string[];
  };
}
