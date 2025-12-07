/**
 * SFS Design Kit - Hamburger Menu Component
 * 
 * A reusable slide-in sidebar navigation menu with SFS styling.
 * Configure the menuItems array with your app's navigation links.
 * 
 * Usage:
 * import SFSHamburgerMenu from 'sfs-design-kit/components/SFSHamburgerMenu';
 * 
 * const myMenuItems = [
 *   { label: "Dashboard", href: "/dashboard" },
 *   { label: "Settings", href: "/settings" },
 * ];
 * 
 * <SFSHamburgerMenu menuItems={myMenuItems} appName="My App" />
 */

import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export interface MenuItem {
  label: string;
  href: string;
}

interface SFSHamburgerMenuProps {
  menuItems: MenuItem[];
  appName?: string;
  appSubtitle?: string;
  className?: string;
}

export default function SFSHamburgerMenu({
  menuItems,
  appName = "SFS PowerHouse",
  appSubtitle = "SmartFlow Systems",
  className = "",
}: SFSHamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 text-sfs-gold hover:text-sfs-gold-hover transition-colors ${className}`}
        aria-label="Toggle menu"
        data-testid="button-hamburger"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-56 z-50 flex flex-col bg-sfs-brown/95 backdrop-blur-xl border-r border-sfs-gold/30 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-sfs-gold/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-sfs-gold to-sfs-gold-hover rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-sfs-black" />
            </div>
            <div>
              <h3 className="text-sfs-gold font-bold text-sm">{appName}</h3>
              <p className="text-xs text-sfs-beige/60">{appSubtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-sfs-gold/70 hover:text-sfs-gold"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <div className="space-y-1 px-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sfs-beige/70 hover:bg-sfs-gold/10 hover:text-sfs-gold transition-colors text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 border-t border-sfs-gold/20">
          <div className="text-xs text-sfs-beige/40 text-center">
            <p className="font-semibold text-sfs-gold">SmartFlow Systems</p>
            <p>2025 boweazy</p>
          </div>
        </div>
      </div>
    </>
  );
}
