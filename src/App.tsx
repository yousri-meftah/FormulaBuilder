import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CreateFormulaPage from './pages/CreateFormulaPage';
import FormulaDetailsPage from './pages/FormulaDetailsPage';
import Footer from './components/Footer';



function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedFormula, setSelectedFormula] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'search':
        return <SearchPage onSelectFormula={(formula) => {
          setSelectedFormula(formula);
          setCurrentPage('formula-details');
        }} />;
      case 'create':
        return <CreateFormulaPage onFormulaCreated={() => setCurrentPage('home')} />;
      case 'formula-details':
        return <FormulaDetailsPage formula={selectedFormula} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;