export type Ingredient = {
  id: string;
  title: string;
  description?: string;
  image?: string;
};
export type Drink = {
  id: string;
  title: string;
  source?: string;
  description?: string;
  image?: string;
  instructions: string[];
  ingredients: string[];
};
