import React, { useState } from 'react';
import { Plus, Trash2, Info, Calculator } from 'lucide-react';
import { useFormulaStore } from '../stores/formulaStore';
import { useAuthStore } from '../stores/authStore';
import { CreateFormulaData } from '../types/formula';

interface CreateFormulaPageProps {
  onFormulaCreated: () => void;
}

const CreateFormulaPage: React.FC<CreateFormulaPageProps> = ({ onFormulaCreated }) => {
  const [formulaName, setFormulaName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expression, setExpression] = useState('');
  const [variables, setVariables] = useState([{ name: '', symbol: '', coefficient: '1', description: '' }]);
  const [previewResult, setPreviewResult] = useState<string | null>(null);
  const [previewValues, setPreviewValues] = useState<Record<string, string>>({});
  const { createFormula } = useFormulaStore();
  const { isAuthenticated } = useAuthStore();
  
  const categories = [
    { id: 1, name: 'Education' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'Business' },
  ];

  const handleAddVariable = () => {
    setVariables([...variables, { name: '', symbol: '', coefficient: '1', description: '' }]);
  };

  const handleRemoveVariable = (index: number) => {
    const newVariables = [...variables];
    newVariables.splice(index, 1);
    setVariables(newVariables);
  };

  const handleVariableChange = (index: number, field: string, value: string) => {
    const newVariables = [...variables];
    newVariables[index] = { ...newVariables[index], [field]: value };
    setVariables(newVariables);
    
    // Update preview values if the symbol changes
    if (field === 'symbol' && newVariables[index].symbol !== '') {
      setPreviewValues(prev => ({
        ...prev,
        [value]: prev[newVariables[index].symbol] || ''
      }));
    }
  };
  
  const handlePreviewValueChange = (symbol: string, value: string) => {
    setPreviewValues({
      ...previewValues,
      [symbol]: value
    });
  };
  
  const generateExpression = () => {
    if (variables.length === 0) return '';
    
    // Create the numerator (sum of each variable multiplied by its coefficient)
    const numerator = variables.map(v => 
      `(${v.symbol} * ${v.coefficient})`
    ).join(' + ');
    
    // Create the denominator (sum of coefficients)
    const denominator = variables.map(v => v.coefficient).join(' + ');
    
    // Return the complete expression
    return `(${numerator}) / (${denominator})`;
  };
  
  const handleGenerateExpression = () => {
    setExpression(generateExpression());
  };
  
  const calculatePreview = () => {
    try {
      // Create a function to evaluate the expression
      const evalExpression = (expr: string, values: Record<string, string>) => {
        let evalString = expr;
        
        // Replace variable symbols with their values
        for (const [symbol, value] of Object.entries(values)) {
          const regex = new RegExp(symbol, 'g');
          evalString = evalString.replace(regex, value || '0');
        }
        
        // Evaluate the expression
        return eval(evalString);
      };
      
      const result = evalExpression(expression, previewValues);
      setPreviewResult(Number.isFinite(result) ? result.toFixed(2) : 'Error');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setPreviewResult('Error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please sign in to create a formula');
      return;
    }

    try {
      const formulaData: CreateFormulaData = {
        name: formulaName,
        description,
        category_id: parseInt(category),
        expression,
        inputs: variables.map(v => ({
          name: v.name,
          symbol: v.symbol,
          coefficient: parseFloat(v.coefficient),
          description: v.description
        }))
      };

      await createFormula(formulaData);
      alert('Formula created successfully!');
      onFormulaCreated();
    } catch (error) {
      console.error('Error creating formula:', error);
      alert('Error creating formula. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create a Custom Formula</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
            
            <div>
              <label htmlFor="formula-name" className="block text-sm font-medium text-gray-700 mb-1">
                Formula Name
              </label>
              <input
                id="formula-name"
                type="text"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formulaName}
                onChange={(e) => setFormulaName(e.target.value)}
                placeholder="e.g., My University Grade Calculator"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                required
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what this formula calculates and when to use it..."
              />
            </div>
          </div>
          
          {/* Variables */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Variables & Coefficients</h2>
              <button
                type="button"
                onClick={handleAddVariable}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Variable
              </button>
            </div>
            
            {variables.map((variable, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium text-gray-900">Variable {index + 1}</h3>
                  {variables.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveVariable(index)}
                      className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor={`var-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      id={`var-name-${index}`}
                      type="text"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={variable.name}
                      onChange={(e) => handleVariableChange(index, 'name', e.target.value)}
                      placeholder="e.g., Math"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`var-symbol-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Symbol
                    </label>
                    <input
                      id={`var-symbol-${index}`}
                      type="text"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={variable.symbol}
                      onChange={(e) => handleVariableChange(index, 'symbol', e.target.value)}
                      placeholder="e.g., Math"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`var-coef-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Coefficient
                    </label>
                    <input
                      id={`var-coef-${index}`}
                      type="number"
                      required
                      min="0"
                      step="0.1"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={variable.coefficient}
                      onChange={(e) => handleVariableChange(index, 'coefficient', e.target.value)}
                      placeholder="e.g., 2"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor={`var-desc-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    id={`var-desc-${index}`}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={variable.description}
                    onChange={(e) => handleVariableChange(index, 'description', e.target.value)}
                    placeholder="e.g., Your math grade"
                  />
                </div>
              </div>
            ))}
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleGenerateExpression}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Generate Weighted Average Formula
              </button>
            </div>
          </div>
          
          {/* Formula Expression */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Formula Expression</h2>
            
            <div>
              <label htmlFor="expression" className="block text-sm font-medium text-gray-700 mb-1">
                Mathematical Expression
              </label>
              <div className="relative">
                <input
                  id="expression"
                  type="text"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder="e.g., (Math * 2 + Physics * 3 + Chemistry * 1) / (2 + 3 + 1)"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Info className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Use standard mathematical notation. Use * for multiplication, / for division, + for addition, - for subtraction, and ^ for exponents.
              </p>
            </div>
          </div>
          
          {/* Preview Calculator */}
          {expression && (
            <div className="space-y-4 bg-indigo-50 p-4 rounded-md">
              <div className="flex items-center">
                <Calculator className="h-5 w-5 text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Preview Your Formula</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {variables.map((variable, index) => (
                  variable.symbol && (
                    <div key={index}>
                      <label htmlFor={`preview-${variable.symbol}`} className="block text-sm font-medium text-gray-700 mb-1">
                        {variable.name} ({variable.symbol})
                      </label>
                      <input
                        id={`preview-${variable.symbol}`}
                        type="number"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={previewValues[variable.symbol] || ''}
                        onChange={(e) => handlePreviewValueChange(variable.symbol, e.target.value)}
                        placeholder={`Enter value for ${variable.symbol}`}
                      />
                    </div>
                  )
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={calculatePreview}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Calculate Preview
                </button>
                
                {previewResult && (
                  <div className="bg-white px-4 py-2 rounded-md">
                    <span className="text-sm text-gray-500 mr-2">Result:</span>
                    <span className="font-medium text-indigo-700">{previewResult}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Formula
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFormulaPage;