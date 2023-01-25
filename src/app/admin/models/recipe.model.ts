export class Recipe {
    id: number = 0;
    name: string = '';
    description: string = '';
    ingredients: string[] = [];
    instructions: string[] = [];
    imageUrl: string = '';
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
  }