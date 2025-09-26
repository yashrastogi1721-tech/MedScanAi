import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Results from './pages/Results';
import Reports from './pages/Reports';
import About from './pages/About';
import './App.css';

type Page = 'home' | 'scanner' | 'results' | 'reports' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'scanner':
        return <Scanner />;
      case 'results':
        return <Results />;
      case 'reports':
        return <Reports />;
      case 'about':
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 animated-bg">
      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-circle circle-4"></div>
      </div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="relative z-10">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;