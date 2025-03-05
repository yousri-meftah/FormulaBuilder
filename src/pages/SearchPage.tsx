import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { useFormulaStore } from '../stores/formulaStore';
import FormulaCard from '../components/FormulaCard';

interface SearchPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectFormula: (formula: any) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onSelectFormula }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { formulas, getFormulas } = useFormulaStore();

  useEffect(() => {
    getFormulas();
  }, []);
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'education', name: 'Education' },
    { id: 'finance', name: 'Finance' },
    { id: 'business', name: 'Business' },
    { id: 'health', name: 'Health & Fitness' },
    { id: 'science', name: 'Science' },
    { id: 'other', name: 'Other' },
  ];

  const filteredFormulas = formulas.filter(formula => {
    const matchesSearch = formula.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         formula.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || formula.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Browse Formulas</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for formulas..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category.id
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {filteredFormulas.length} {filteredFormulas.length === 1 ? 'Result' : 'Results'}
        </h2>
        
        {filteredFormulas.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">No formulas found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFormulas.map(formula => (
              <div key={formula.id} onClick={() => onSelectFormula(formula)}>
                <FormulaCard formula={formula} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;