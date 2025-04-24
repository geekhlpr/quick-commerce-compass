
import React, { useState } from 'react';
import { Menu, X, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between md:hidden h-16 px-4 bg-sidebar text-white">
        <Link to="/" className="flex items-center">
          <div className="bg-white text-sidebar rounded-md p-1 mr-2">
            <Package className="h-6 w-6" />
          </div>
          <span className="text-white font-bold text-xl">InvManager</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-sidebar-accent"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden animate-fade-in"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar className="relative" />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
