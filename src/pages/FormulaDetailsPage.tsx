import React, { useState } from 'react';
import { Star, Share2, BookOpen, Calculator, ArrowRight } from 'lucide-react';

interface FormulaDetailsPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formula: any;
}

const FormulaDetailsPage: React.FC<FormulaDetailsPageProps> = ({ formula }) => {
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('calculator');

  if (!formula) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <p className="text-gray-500">Formula not found.</p>
      </div>
    );
  }

  const handleInputChange = (variable: string, value: string) => {
    setInputValues({
      ...inputValues,
      [variable]: parseFloat(value) || 0
    });
  };

  const calculateResult = () => {
    try {
      // Create a function to evaluate the expression
      const evalExpression = (expr: string, values: Record<string, number>) => {
        let evalString = expr;
        
        // Replace variable symbols with their values
        for (const [symbol, value] of Object.entries(values)) {
          const regex = new RegExp(symbol, 'g');
          evalString = evalString.replace(regex, value.toString());
        }
        
        // Replace ^ with ** for exponentiation
        evalString = evalString.replace(/\^/g, '**');
        
        // Evaluate the expression
        return eval(evalString);
      };
      
      const result = evalExpression(formula.expression, inputValues);
      setResult(Number.isFinite(result) ? result : null);
    } catch (error) {
      console.error("Calculation error:", error);
      alert("Error calculating result. Please check your inputs.");
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{formula.name}</h1>
          
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="text-gray-700">{formula.rating.toFixed(1)}</span>
            </div>
            
            <button className="text-gray-500 hover:text-indigo-600">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
            {formula.category}
          </span>
          {formula.tags && formula.tags.map((tag: string, index: number) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-gray-700 mb-6">{formula.description}</p>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Formula</h2>
          <div className="text-center p-4 text-xl font-medium text-gray-900">
            {formula.expression}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'calculator'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('calculator')}
          >
            <div className="flex items-center justify-center">
              <Calculator className="h-5 w-5 mr-2" />
              Calculator
            </div>
          </button>
          
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'explanation'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('explanation')}
          >
            <div className="flex items-center justify-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Explanation
            </div>
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'calculator' ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Values</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {formula.variables && formula.variables.map((variable: any, index: number) => (
                  <div key={index}>
                    <label htmlFor={`var-${variable.symbol}`} className="block text-sm font-medium text-gray-700 mb-1">
                      {variable.name} ({variable.symbol})
                    </label>
                    <input
                      id={`var-${variable.symbol}`}
                      type="number"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={inputValues[variable.symbol] || ''}
                      onChange={(e) => handleInputChange(variable.symbol, e.target.value)}
                      placeholder={`Enter value for ${variable.symbol}`}
                    />
                    {variable.description && (
                      <p className="mt-1 text-sm text-gray-500">{variable.description}</p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={calculateResult}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Calculate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                
                {result !== null && (
                  <div className="bg-gray-50 p-4 rounded-md w-full text-center">
                    <p className="text-sm text-gray-500">Result</p>
                    <p className="text-2xl font-bold text-indigo-600">{result.toFixed(4)}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="prose max-w-none">
              <h3>How It Works</h3>
              <p>{formula.explanation || "This formula is used to calculate a specific value based on the input variables you provide."}</p>
              
              <h3>Example</h3>
              <p>{formula.example || "Here's an example of how to use this formula with sample values."}</p>
              
              <h3>Applications</h3>
              <ul>
                {(formula.applications || ["General purpose calculations"]).map((app: string, index: number) => (
                  <li key={index}>{app}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormulaDetailsPage;