import { useState } from "react";
import { Search, Menu, X, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, isAuthenticated } = useAuth();

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Parcourir", href: "/browse" },
    { label: "Mon Profil", href: "/profile" },
    { label: "Nouveautés", href: "/nouveautes" },
    { label: "Tendances", href: "/tendances" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <a href="/" className="text-primary font-bold text-2xl tracking-tight">
              NYORA
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-40 md:w-64 bg-card/80 backdrop-blur-sm border-border/50"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {user?.email}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="play" size="sm" className="hidden sm:flex">
                  Connexion
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {isAuthenticated ? (
                <Button variant="ghost" size="sm" className="mt-4 self-start" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              ) : (
                <Link to="/auth">
                  <Button variant="play" size="sm" className="mt-4 self-start">
                    Connexion
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};