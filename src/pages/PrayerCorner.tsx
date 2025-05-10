
import { useState, useEffect } from "react";
import { useToast } from "sonner";
import Navbar from "@/components/Navbar";
import { PrayerEntry, getPrayers, savePrayer, deletePrayer } from "@/utils/localStorageUtils";
import { MessageCircle, X, Calendar, Save } from "lucide-react";

const PrayerCorner = () => {
  const [prayers, setPrayers] = useState<PrayerEntry[]>([]);
  const [newPrayer, setNewPrayer] = useState("");
  const toast = useToast;

  useEffect(() => {
    const savedPrayers = getPrayers();
    setPrayers(savedPrayers);
  }, []);

  const handleSavePrayer = () => {
    if (newPrayer.trim()) {
      const prayer: PrayerEntry = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        text: newPrayer,
      };
      
      savePrayer(prayer);
      setPrayers(getPrayers());
      setNewPrayer("");
      toast("Prayer saved to your journal");
    }
  };

  const handleDeletePrayer = (id: string) => {
    deletePrayer(id);
    setPrayers(getPrayers());
    toast("Prayer entry removed");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-wisdom-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-wisdom-primary mb-4">
              Prayer Corner
            </h1>
            <p className="text-wisdom-text">
              A space for reflection, gratitude, and seeking guidance.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-serif font-medium text-wisdom-primary mb-4 flex items-center">
              <MessageCircle size={20} className="mr-2" />
              Write a Prayer or Reflection
            </h2>
            
            <textarea
              className="w-full px-4 py-3 rounded-lg border border-wisdom-light bg-wisdom-card shadow-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary focus:border-transparent text-wisdom-text min-h-[150px] resize-none mb-4"
              placeholder="Write your thoughts, prayers, or reflections here..."
              value={newPrayer}
              onChange={(e) => setNewPrayer(e.target.value)}
            />
            
            <div className="flex justify-end">
              <button
                onClick={handleSavePrayer}
                disabled={!newPrayer.trim()}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  newPrayer.trim() 
                    ? 'bg-wisdom-primary text-white' 
                    : 'bg-wisdom-light text-wisdom-muted'
                } transition-colors`}
              >
                <Save size={18} className="mr-2" />
                Save to Journal
              </button>
            </div>
          </div>
          
          <h2 className="text-xl font-serif font-medium text-wisdom-primary mb-4">
            Your Prayer Journal
          </h2>
          
          {prayers.length > 0 ? (
            <div className="space-y-4">
              {prayers.slice().reverse().map((prayer) => (
                <div key={prayer.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-wisdom-secondary">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center text-sm text-wisdom-muted">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(prayer.date)}
                    </div>
                    
                    <button
                      onClick={() => handleDeletePrayer(prayer.id)}
                      className="text-wisdom-muted hover:text-red-500 p-1"
                      aria-label="Delete prayer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <p className="text-wisdom-text whitespace-pre-wrap">{prayer.text}</p>
                  
                  {prayer.relatedVerse && (
                    <div className="mt-3 p-3 bg-wisdom-light/50 rounded-md">
                      <p className="text-sm text-wisdom-primary font-medium">
                        {prayer.relatedVerse.reference}
                      </p>
                      <p className="text-sm italic text-wisdom-text">
                        "{prayer.relatedVerse.text}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <MessageCircle className="mx-auto h-16 w-16 text-wisdom-muted mb-4" />
              <h3 className="text-xl font-medium text-wisdom-text mb-2">Your journal is empty</h3>
              <p className="text-wisdom-muted">
                Write your first prayer or reflection above.
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

export default PrayerCorner;
