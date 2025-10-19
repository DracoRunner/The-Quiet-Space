
export interface Confession {
  id: string;
  text: string;
  timestamp: Date;
}

export type ToggleModalFunction = (show: boolean) => void;
