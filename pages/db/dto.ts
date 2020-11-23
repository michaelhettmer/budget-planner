export type Person = {
  id: string;
  name: string;
};

export type BaseEntry = {
  id: string;
  label: string;
  value: number;
};

export type SingleEntry = BaseEntry & {
  date?: number;
};

export type RepeatingEntry = BaseEntry & {
  startDate?: number;
  endDate?: number;
  type: "monthly" | "yearly";
};

export type Entry = SingleEntry | RepeatingEntry;

export type Apartment = {
  id: string;
};

export type Database = {
  version: number;
  entries: Entry[];
  apartments: Apartment[];
};
