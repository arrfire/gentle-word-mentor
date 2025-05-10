
import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChallengeInputProps {
  onSubmit: (challenge: string) => void;
  isLoading: boolean;
}

const ChallengeInput = ({ onSubmit, isLoading }: ChallengeInputProps) => {
  const [challenge, setChallenge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (challenge.trim()) {
      onSubmit(challenge);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="relative">
          <textarea
            className="w-full px-4 py-3 rounded-lg border border-wisdom-light bg-wisdom-card shadow-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary focus:border-transparent text-wisdom-text placeholder:text-wisdom-muted min-h-[120px] resize-none"
            placeholder="Share what you're going through today..."
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            disabled={isLoading}
          />
          
          <button
            type="submit"
            className={`absolute bottom-3 right-3 p-2 ${
              challenge.trim() && !isLoading 
                ? 'bg-wisdom-primary text-white' 
                : 'bg-wisdom-light text-wisdom-muted'
            } rounded-full transition-colors`}
            disabled={!challenge.trim() || isLoading}
          >
            <Send size={18} />
          </button>
        </div>
        
        {isLoading && (
          <div className="text-center mt-4 text-wisdom-muted text-sm animate-pulse">
            Finding wisdom for your situation...
          </div>
        )}
      </form>
    </div>
  );
};

export default ChallengeInput;
