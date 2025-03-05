import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';
import { Formula, CreateFormulaData, UpdateFormulaData } from '../types/formula';

interface FormulaState {
  formulas: Formula[];
  top_formulas : Formula[];
  popular_formula : Formula[];
  userFormulas: Formula[];
  isLoading: boolean;
  error: string | null;
  createFormula: (data: CreateFormulaData) => Promise<Formula>;
  updateFormula: (id: number, data: UpdateFormulaData) => Promise<Formula>;
  deleteFormula: (id: number) => Promise<void>;
  getFormulas: () => Promise<void>;
  getTopRatedFormulas: () => Promise<void>;
  getPopularFormulas: () => Promise<void>;
  getUserFormulas: () => Promise<void>;
  getFormulaById: (id: number) => Promise<Formula>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useFormulaStore = create<FormulaState>((set, get) => ({
  formulas: [],
  top_formulas: [],
  popular_formula: [],
  userFormulas: [],
  isLoading: false,
  error: null,

  createFormula: async (data: CreateFormulaData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    set({ isLoading: true, error: null });
    try {
      const response = await axios.post<Formula>(
        `${API_URL}/formula`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      set(state => ({
        userFormulas: [...state.userFormulas, response.data],
        formulas: [...state.formulas, response.data],
        isLoading: false
      }));
      
      return response.data;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
      throw error;
    }
  },

  updateFormula: async (id: number, data: UpdateFormulaData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    set({ isLoading: true, error: null });
    try {
      const response = await axios.put<Formula>(
        `${API_URL}/formulas/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      set(state => ({
        userFormulas: state.userFormulas.map(f => f.id === id ? response.data : f),
        formulas: state.formulas.map(f => f.id === id ? response.data : f),
        isLoading: false
      }));
      
      return response.data;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
      throw error;
    }
  },

  deleteFormula: async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    set({ isLoading: true, error: null });
    try {
      await axios.delete(
        `${API_URL}/formulas/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      set(state => ({
        userFormulas: state.userFormulas.filter(f => f.id !== id),
        formulas: state.formulas.filter(f => f.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
      throw error;
    }
  },

  getFormulas: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Formula[]>(`${API_URL}/formula`);
      set({ formulas: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
    }
  },
  getTopRatedFormulas: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Formula[]>(`${API_URL}/formula/top-rated`);
      set({ top_formulas: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
    }
  },
  
  getPopularFormulas: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Formula[]>(`${API_URL}/formula/popular`);
      set({ popular_formula: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
    }
  },
  
  getUserFormulas: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ userFormulas: [] });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Formula[]>(
        `${API_URL}/formulas/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      set({ userFormulas: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
    }
  },

  getFormulaById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Formula>(`${API_URL}/formulas/${id}`);
      
      // Update the formula in both lists if it exists
      set(state => ({
        formulas: state.formulas.map(f => f.id === id ? response.data : f),
        userFormulas: state.userFormulas.map(f => f.id === id ? response.data : f),
        isLoading: false
      }));
      
      return response.data;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false 
      });
      throw error;
    }
  }
}));