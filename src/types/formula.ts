export interface FormulaInput {
  id?: number; // Optional because it's only returned after creation
  name: string;
  symbol: string;
  coefficient: number;
  description?: string;
}

export interface Formula {
  id: number;
  name: string;
  description: string;
  category_id: number;
  usage_count: number;
  inputs: FormulaInput[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateFormulaData {
  name: string;
  description: string;
  category_id: number;
  inputs: FormulaInput[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateFormulaData extends Partial<CreateFormulaData> {}
