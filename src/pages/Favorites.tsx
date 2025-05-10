
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import VerseCard, { VerseData } from "@/components/VerseCard";
import { getFavorites, saveFavorite } from "@/utils/localStorageUtils";
import { BookmarkX } from "lucide-react";

const Favorites = () => {
  const [favorites, setFavorites] = useState<VerseData[]>([]);

  useEffect(() => {
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
  }, []);

  const handleSaveVerse = (verse: VerseData) => {
    saveFavorite(verse);
    // Update the local state to reflect changes
    setFavorites(getFavorites());
  };

  return (
    <div className="min-h-screen bg-wisdom-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-wisdom-primary mb-4">
              Your Saved Verses
            </h1>
            <p className="text-wisdom-text">
              Bible passages you've saved for reflection and encouragement.
            </p>
          </div>
          
          {favorites.length > 0 ? (
            favorites.map((verse, index) => (
              <VerseCard 
                key={`${verse.reference}-${index}`} 
                verse={verse} 
                onSave={handleSaveVerse}
                isSaved={true}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <BookmarkX className="mx-auto h-16 w-16 text-wisdom-muted mb-4" />
              <h3 className="text-xl font-medium text-wisdom-text mb-2">No saved verses yet</h3>
              <p className="text-wisdom-muted">
                When you find verses that speak to you, save them here for easy access.
              </p>
            </div>
          )}
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

export default Favorites;
