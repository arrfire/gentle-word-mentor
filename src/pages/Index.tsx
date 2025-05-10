
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import ChallengeInput from "@/components/ChallengeInput";
import VerseCard, { VerseData } from "@/components/VerseCard";
import { findRelevantVerse } from "@/utils/bibleVerseService";
import { saveFavorite, isFavorite } from "@/utils/localStorageUtils";

const WINDMILL_WEBHOOK_URL = "https://app.windmill.dev/api/w/bibleverse/jobs/run/f/u/arun/qURjn5F0fK2L";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [isUsingAI, setIsUsingAI] = useState(false);

  const handleChallengeSubmit = async (challenge: string) => {
    setIsLoading(true);
    setIsUsingAI(true);
    
    try {
      // Call the webhook
      await fetch(WINDMILL_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          challenge: challenge,
          timestamp: new Date().toISOString() 
        }),
        mode: "no-cors" // Add this to handle CORS
      });
      
      // Get verse recommendation
      const recommendedVerse = await findRelevantVerse(challenge);
      setVerse(recommendedVerse);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error finding verse:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveVerse = (verse: VerseData) => {
    saveFavorite(verse);
  };

  return (
    <div className="min-h-screen bg-wisdom-bg flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-wisdom-primary mb-4">
              What are you facing today?
            </h1>
            <p className="text-wisdom-text">
              Share your challenge, and receive a Bible verse to guide you.
            </p>
            <p className="text-sm text-wisdom-muted mt-1">
              Powered by Claude AI for personalized guidance
            </p>
          </div>
          
          <ChallengeInput onSubmit={handleChallengeSubmit} isLoading={isLoading} />
          
          {verse && !isLoading && (
            <VerseCard 
              verse={verse} 
              onSave={handleSaveVerse}
              isSaved={verse ? isFavorite(verse) : false}
              isAIGenerated={isUsingAI}
            />
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

export default Index;
