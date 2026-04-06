import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import HomePage from './HomePage';
import AnalysisPage from './AnalysisPage';
import ArchitecturePage from './ArchitecturePage';
import DeveloperPage from './DeveloperPage';
import { cn } from './lib/utils';
import { Binary, Github } from 'lucide-react';

type Page = 'home' | 'analysis' | 'architecture' | 'developer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Secret route detection
    if (window.location.pathname === '/DevPage') {
      setCurrentPage('developer');
    }
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'analysis': return <AnalysisPage />;
      case 'architecture': return <ArchitecturePage />;
      case 'developer': return <DeveloperPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-8 h-8  rounded flex items-center justify-center overflow-hidden">
              <img src="/favicorn.png" alt="project logo" className="w-full h-full object-cover scale-110" />
            </div>
            <span className="font-bold tracking-tight text-sm hidden sm:block">LETTUCE.AI</span>
          </div>

          <nav className="flex items-center gap-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={cn("nav-link h-16 flex items-center px-1", currentPage === 'home' && "nav-link-active")}
            >
              Demo
            </button>
            <button
              onClick={() => setCurrentPage('analysis')}
              className={cn("nav-link h-16 flex items-center px-1", currentPage === 'analysis' && "nav-link-active")}
            >
              Analysis
            </button>
            <button
              onClick={() => setCurrentPage('architecture')}
              className={cn("nav-link h-16 flex items-center px-1", currentPage === 'architecture' && "nav-link-active")}
            >
              Architecture
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/BeomsuNa?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 w-full py-8">
        <div ref={contentRef}>
          {renderPage()}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Binary size={16} className="text-gray-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Lettuce Disease Detection Visualization System
            </span>
            <button
              onClick={() => setCurrentPage('developer')}
              className="mt-2 text-left text-gray-50 hover:text-indigo-600 transition-colors w-fit"
            >
              입장
            </button>
          </div>
          <div className="flex flex-col text-[10px] text-gray-400 tracking-widest font-medium">
            <span>GIHTUB</span>
            <span>E-mail : skqjatn6788@gmail.com</span>
            <span>Phone : 010-5923-6988</span>

          </div>
        </div>
      </footer>
    </div>
  );
}
