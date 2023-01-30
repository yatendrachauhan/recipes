export interface Recipes {
  id: number;
  title?: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
