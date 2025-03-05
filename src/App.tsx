import  { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CreateFormulaPage from './pages/CreateFormulaPage';
import FormulaDetailsPage from './pages/FormulaDetailsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './stores/authStore';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedFormula, setSelectedFormula] = useState(null);
  const { getMe,user } = useAuthStore();

  useEffect(() => {
    getMe();
  }, []);

  const renderPage = () => {
    console.log("yuser = ",user)
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
      case 'profile':
        return user ? <ProfilePage /> : <HomePage onNavigate={setCurrentPage} />;
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
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Formula Builder - Create custom calculations with ease
        </div>
      </footer>
    </div>
  );
}

export default App;