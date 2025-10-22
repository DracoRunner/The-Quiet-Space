export interface Confession {
  id: string;
  content: string;
  createdAt: Date;
}

export type ToggleModalFunction = (show: boolean) => void;
