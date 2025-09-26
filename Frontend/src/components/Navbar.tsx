import React from 'react';
import { Home, Camera, FileText, BarChart3, Info, Heart } from 'lucide-react';

type Page = 'home' | 'scanner' | 'results' | 'reports' | 'about';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'scanner', name: 'Scanner', icon: Camera },
    { id: 'results', name: 'Results', icon: FileText },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'about', name: 'About', icon: Info },
  ];

  return (
    <nav className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl relative z-50 animated-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center animate-pulse-custom shadow-lg">
                <Heart className="h-6 w-6 text-white animate-heartbeat" fill="currentColor" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
                MedScan AI
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 animate-fade-in">Advanced Medical Analysis</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={`group relative px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 animated-bg ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/20 hover:text-blue-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`h-5 w-5 transition-transform duration-300 group-hover:rotate-12 ${
                        currentPage === item.id ? 'animate-bounce-subtle' : ''
                      }`} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {currentPage === item.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full animate-expand"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;