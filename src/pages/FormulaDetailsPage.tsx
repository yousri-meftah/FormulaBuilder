import React, { useState, useEffect } from "react";
import { Star, Share2, Calculator, ArrowRight } from "lucide-react";
import { useFormulaStore } from "../stores/formulaStore";
import { useAuthStore } from "../stores/authStore";
import { Formula } from "../types/formula";
import axios from "axios";
import { API_URL } from "../config";

interface FormulaDetailsPageProps {
  formula: Formula;
}

const FormulaDetailsPage: React.FC<FormulaDetailsPageProps> = ({ formula: initialFormula }) => {
  const { getFormulaById, deleteFormula } = useFormulaStore();
  const { user } = useAuthStore();
  const [formula, setFormula] = useState<Formula>(initialFormula);
  const [stars] = useState(0);

  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("calculator");

  // Load updated formula from backend
  useEffect(() => {
    const loadFormula = async () => {
      try {
        const updatedFormula = await getFormulaById(formula.id);
        setFormula(updatedFormula);
      } catch (error) {
        console.error("Error loading formula:", error);
      }
    };

    loadFormula();
  }, [formula.id]);

  if (!formula) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <p className="text-gray-500">Formula not found.</p>
      </div>
    );
  }

  // Handle input changes for variables
  const handleInputChange = (variable: string, value: string) => {
    setInputValues({
      ...inputValues,
      [variable]: parseFloat(value) || 0,
    });
  };

  // 🔥 Fixes calculation using the backend API (`POST /formula/{id}/execute`)
  const calculateResult = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/formula/${formula.id}/execute`,
        inputValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResult(response.data.result);
    } catch (error) {
      console.error("Calculation error:", error);
      alert("Error calculating result. Please check your inputs.");
      setResult(null);
    }
  };

  // Delete Formula
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this formula?")) {
      return;
    }

    try {
      await deleteFormula(formula.id);
      // Redirect or show success message
    } catch (error) {
      console.error("Error deleting formula:", error);
      alert("Error deleting formula. Please try again.");
    }
  };
  // id: number;
  // name: string;
  // description: string;
  // category_id: number;
  // usage_count: number;
  // inputs: FormulaInput[];
  // created_at?: string;
  // updated_at?: string;
  const isOwner = user?.id 

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{formula.name}</h1>

          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="text-gray-700">{stars || 0}</span>
            </div>

            <button className="text-gray-500 hover:text-indigo-600">
              <Share2 className="h-5 w-5" />
            </button>
            {isOwner && (
              <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
                Delete Formula
              </button>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Formula</h2>
          <div className="text-center p-4 text-xl font-medium text-gray-900">{formula.expression}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "calculator" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("calculator")}
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculator
          </button>
        </div>

        <div className="p-6">
          {activeTab === "calculator" ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Values</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {formula.inputs.map((variable) => (
                  // name: string;
                  // symbol: string;
                  // coefficient: number;
                  // description?: string;
                  <div key={variable.id}>
                    <label htmlFor={`var-${variable}`} className="block text-sm font-medium text-gray-700 mb-1">
                      {variable.name}
                    </label>
                    <input
                      id={`var-${variable}`}
                      type="number"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={inputValues[variable.name] || ""}
                      onChange={(e) => handleInputChange(variable.name, e.target.value)}
                      placeholder={`Enter value for ${variable.description}`}
                    />
                  </div>
                ))}
              </div>

              <button onClick={calculateResult} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Calculate <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              {result !== null && (
                <div className="bg-gray-50 p-4 rounded-md w-full text-center">
                  <p className="text-sm text-gray-500">Result</p>
                  <p className="text-2xl font-bold text-indigo-600">{result.toFixed(4)}</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FormulaDetailsPage;
