import React from 'react';
import { Star, Calculator } from 'lucide-react';
import { Formula } from '../types/formula';

interface FormulaCardProps {
  formula: Formula;
}
// id: number;
//   name: string;
//   description: string;
//   category_id: number;
//   usage_count: number;
//   inputs: FormulaInput[];
//   created_at?: string;
//   updated_at?: string;

const FormulaCard: React.FC<FormulaCardProps> = ({ formula }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{formula.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">{formula.usage_count}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2"></p>
        
        <div className="bg-gray-50 p-3 rounded-md mb-3">
          <p className="text-center font-medium text-gray-800">{formula.description}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
            {formula.category_id}
          </span>
          
          <div className="flex items-center text-gray-500 text-sm">
            <Calculator className="h-4 w-4 mr-1" />
            <span>{formula.usage_count || 0} uses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaCard;