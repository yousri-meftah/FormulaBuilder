import React from 'react';
import { Search, Plus, TrendingUp, Star, BookOpen, Calculator } from 'lucide-react';
import { sampleFormulas } from '../data/sampleData';
import FormulaCard from '../components/FormulaCard';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Get trending and top-rated formulas
  const trendingFormulas = sampleFormulas.slice(0, 3);
  const topRatedFormulas = [...sampleFormulas]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Hero section */}
      <section className="bg-indigo-600 rounded-xl text-white p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Create Custom Formulas for Your Calculations
          </h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100">
            Build personalized formulas for grades, weighted averages, financial calculations, and more. Create once, calculate anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('search')}
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium flex items-center justify-center"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Formulas
            </button>
            <button
              onClick={() => onNavigate('create')}
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Formula
            </button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use Formula Builder?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Create Custom Formulas</h3>
            <p className="text-gray-600">
              Build formulas tailored to your specific needs with custom variables and coefficients.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Calculator className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Calculate Instantly</h3>
            <p className="text-gray-600">
              Input your values and get results instantly based on your custom formula.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Save & Reuse</h3>
            <p className="text-gray-600">
              Save your formulas and reuse them anytime. Share with classmates or colleagues.
            </p>
          </div>
        </div>
      </section>

      {/* Example use cases */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Example Use Cases</h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Grade Calculation (Moyenne)</h3>
            <p className="text-gray-600 mb-3">
              Create a formula with your subjects and their coefficients to calculate your weighted average.
            </p>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Example:</span> ((Math * 2) + (Physics * 3) + (Chemistry * 1)) / (2+3+1)
              </p>
            </div>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Financial Calculations</h3>
            <p className="text-gray-600 mb-3">
              Build formulas for loan payments, investment returns, or budget allocations.
            </p>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Example:</span> (Principal * (1 + Rate/100)^Years) - Principal
              </p>
            </div>
          </div>
          
          <div className="border-l-4 border-amber-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Custom Metrics</h3>
            <p className="text-gray-600 mb-3">
              Create formulas for personal or professional metrics that matter to you.
            </p>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Example:</span> (Sales * 0.7) + (CustomerSatisfaction * 0.3)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending formulas */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Popular Formulas</h2>
          <TrendingUp className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {trendingFormulas.map((formula) => (
            <FormulaCard key={formula.id} formula={formula} />
          ))}
        </div>
      </section>

      {/* Top rated formulas */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Rated Formulas</h2>
          <Star className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {topRatedFormulas.map((formula) => (
            <FormulaCard key={formula.id} formula={formula} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;