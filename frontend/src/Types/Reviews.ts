
export type Review = {
  id: number;
  text: string;
  user?: {
    name: string;
  };
};