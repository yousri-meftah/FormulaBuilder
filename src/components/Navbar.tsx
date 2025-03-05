import React, { useState } from 'react';
import { Search, Plus, Calculator, Home, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import AuthModal from './AuthModal';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Formula Builder</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === 'home' 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Home className="mr-1.5 h-5 w-5" />
              Home
            </button>
            <button 
              onClick={() => onNavigate('search')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === 'search' 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Search className="mr-1.5 h-5 w-5" />
              Browse
            </button>
            <button 
              onClick={() => onNavigate('create')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === 'create' 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Plus className="mr-1.5 h-5 w-5" />
              Create
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
              <button onClick={() => onNavigate('profile')}>
                <div className="flex items-center text-gray-700">
                    <User className="h-5 w-5 mr-2" />
                    <span>{user?.username}</span>
                  </div>
              </button>
                
                <button
                  onClick={logout}
                  className="flex items-center text-gray-600 hover:text-indigo-600"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Sign In
              </button>
            )}
          </div>
          
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-indigo-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button 
            onClick={() => onNavigate('home')}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              currentPage === 'home' 
                ? 'text-indigo-600 bg-indigo-50' 
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('search')}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              currentPage === 'search' 
                ? 'text-indigo-600 bg-indigo-50' 
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Browse
          </button>
          <button 
            onClick={() => onNavigate('create')}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              currentPage === 'create' 
                ? 'text-indigo-600 bg-indigo-50' 
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;