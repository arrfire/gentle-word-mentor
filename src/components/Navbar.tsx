
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, Heart, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-wisdom-card border-b border-wisdom-light py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-semibold text-wisdom-primary flex items-center">
          <BookOpen className="mr-2 text-wisdom-accent" size={24} />
          <span>Bible Wisdom</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-wisdom-text hover:text-wisdom-accent transition-colors">
            Home
          </Link>
          <Link to="/favorites" className="text-wisdom-text hover:text-wisdom-accent transition-colors flex items-center">
            <Heart size={18} className="mr-1" />
            <span>Favorites</span>
          </Link>
          <Link to="/prayer" className="text-wisdom-text hover:text-wisdom-accent transition-colors flex items-center">
            <MessageCircle size={18} className="mr-1" />
            <span>Prayer Corner</span>
          </Link>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-wisdom-card shadow-lg border-b border-wisdom-light p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-wisdom-text hover:text-wisdom-accent transition-colors py-2 px-4"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/favorites" 
                className="text-wisdom-text hover:text-wisdom-accent transition-colors py-2 px-4 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Heart size={18} className="mr-1" />
                <span>Favorites</span>
              </Link>
              <Link 
                to="/prayer" 
                className="text-wisdom-text hover:text-wisdom-accent transition-colors py-2 px-4 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={18} className="mr-1" />
                <span>Prayer Corner</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
