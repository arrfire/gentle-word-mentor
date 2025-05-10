
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-wisdom-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-serif font-bold text-wisdom-primary mb-6">404</h1>
          <h2 className="text-2xl font-medium text-wisdom-text mb-4">Page Not Found</h2>
          <p className="text-wisdom-muted mb-8 max-w-md mx-auto">
            "The Lord will guide you always; he will satisfy your needs in a sun-scorched land and will strengthen your frame." - Isaiah 58:11
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-wisdom-primary text-white rounded-lg hover:bg-wisdom-accent transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t border-wisdom-light">
        <div className="container mx-auto px-4 text-center text-wisdom-muted">
          <p>Bible Wisdom &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
