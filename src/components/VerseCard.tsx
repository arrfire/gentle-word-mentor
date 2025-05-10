
import { useState } from 'react';
import { Heart, Share2, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

export interface VerseData {
  text: string;
  reference: string;
  explanation: string;
}

interface VerseCardProps {
  verse: VerseData;
  onSave: (verse: VerseData) => void;
  isSaved?: boolean;
  isAIGenerated?: boolean;
}

const VerseCard = ({ verse, onSave, isSaved = false, isAIGenerated = false }: VerseCardProps) => {
  const [saved, setSaved] = useState(isSaved);

  const handleSave = () => {
    setSaved(!saved);
    onSave(verse);
    
    if (!saved) {
      toast.success("Verse saved to favorites");
    } else {
      toast.info("Verse removed from favorites");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Bible Wisdom: ${verse.reference}`,
        text: `"${verse.text}" - ${verse.reference}`,
        url: window.location.href,
      }).catch(() => {
        // Fallback if sharing fails
        toast.success("Verse copied to clipboard");
        navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`);
      });
    } else {
      // Fallback for browsers that don't support sharing
      toast.success("Verse copied to clipboard");
      navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`);
    }
  };

  return (
    <div className="bg-verse-bg rounded-xl shadow-md overflow-hidden my-6 transform transition-all animate-fade-in">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start">
          <div className="inline-block bg-wisdom-primary/10 px-3 py-1 rounded-full text-sm font-medium text-wisdom-primary mb-4">
            {verse.reference}
          </div>
          
          {isAIGenerated && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              AI Assisted
            </span>
          )}
        </div>
        
        <blockquote className="font-serif text-xl md:text-2xl leading-relaxed mb-6 text-wisdom-text italic">
          "{verse.text}"
        </blockquote>
        
        <div className="text-wisdom-text leading-relaxed mb-6">
          <h3 className="font-medium text-wisdom-primary mb-2">How this might help:</h3>
          <p>{verse.explanation}</p>
        </div>
        
        <div className="flex justify-end items-center space-x-4 pt-4 border-t border-wisdom-light/50">
          <button 
            onClick={() => handleShare()} 
            className="flex items-center text-wisdom-muted hover:text-wisdom-primary transition-colors"
          >
            <Share2 size={18} className="mr-1" />
            <span className="text-sm">Share</span>
          </button>
          
          <button 
            onClick={() => handleSave()} 
            className={`flex items-center ${saved ? 'text-red-500' : 'text-wisdom-muted hover:text-wisdom-primary'} transition-colors`}
            aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart size={18} className="mr-1" fill={saved ? 'currentColor' : 'none'} />
            <span className="text-sm">{saved ? 'Saved' : 'Save'}</span>
          </button>
          
          <button 
            onClick={() => toast.info("Related passages feature coming soon!")} 
            className="flex items-center text-wisdom-muted hover:text-wisdom-primary transition-colors"
          >
            <BookOpen size={18} className="mr-1" />
            <span className="text-sm">Related</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerseCard;
