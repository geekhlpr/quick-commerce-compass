
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Inventory', path: '/inventory', icon: <Package className="h-5 w-5" /> },
    { name: 'Customers', path: '/customers', icon: <Users className="h-5 w-5" /> },
    { name: 'Sales', path: '/sales', icon: <ShoppingCart className="h-5 w-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className={cn(
      'fixed top-0 left-0 z-30 h-full bg-sidebar transition-all duration-300 flex flex-col',
      collapsed ? 'w-16' : 'w-64',
      'md:relative',
      className
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 h-16">
        <Link to="/" className="flex items-center">
          <div className="bg-white text-sidebar rounded-md p-1 mr-2">
            <Package className="h-6 w-6" />
          </div>
          {!collapsed && <span className="text-white font-bold text-xl">InvManager</span>}
        </Link>
        <button
          onClick={() => setCollapsed(prev => !prev)}
          className="text-white hover:bg-sidebar-accent p-1 rounded-md"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center p-3 rounded-md transition-colors',
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/80 hover:bg-white/5 hover:text-white',
                  )}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {!collapsed && <span className="ml-3 font-medium">{item.name}</span>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white">
              <span>JD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-white/70">Admin</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
