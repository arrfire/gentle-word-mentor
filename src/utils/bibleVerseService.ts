
import { VerseData } from "@/components/VerseCard";

// Mock Bible verse data
const verses = [
  {
    challenge: "forgiveness",
    verse: {
      text: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.",
      reference: "Ephesians 4:32",
      explanation: "This verse reminds us that forgiveness is not just an action but a reflection of God's own forgiveness toward us. When we struggle to forgive others, remembering how we've been forgiven can help soften our hearts."
    }
  },
  {
    challenge: "worry",
    verse: {
      text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.",
      reference: "Philippians 4:6-7",
      explanation: "When worry feels overwhelming, this verse offers a practical path forward: bringing our concerns to God with gratitude. The peace promised isn't based on our circumstances changing, but on God's presence with us through them."
    }
  },
  {
    challenge: "alone",
    verse: {
      text: "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.",
      reference: "Deuteronomy 31:8",
      explanation: "Even in moments when we feel most alone, this verse assures us that God's presence is constant. The promise that He goes before us means that no situation we face is unknown to Him."
    }
  },
  {
    challenge: "finances",
    verse: {
      text: "And my God will supply every need of yours according to his riches in glory in Christ Jesus.",
      reference: "Philippians 4:19",
      explanation: "Financial stress can be overwhelming, but this verse reminds us that God is aware of our practical needs. While it doesn't promise wealth, it assures us that God is faithful to provide what we truly need."
    }
  },
  {
    challenge: "strength",
    verse: {
      text: "I can do all things through him who strengthens me.",
      reference: "Philippians 4:13",
      explanation: "When challenges seem insurmountable, this verse reminds us that our strength doesn't come from within ourselves but from God. With His help, we can face situations that would otherwise overwhelm us."
    }
  },
  {
    challenge: "guidance",
    verse: {
      text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
      reference: "Proverbs 3:5-6",
      explanation: "When we're unsure which way to go, this verse encourages us to trust God's perspective above our limited view. By seeking Him in our decisions, we open ourselves to His guidance."
    }
  },
  {
    challenge: "fear",
    verse: {
      text: "For God gave us a spirit not of fear but of power and love and self-control.",
      reference: "2 Timothy 1:7",
      explanation: "Fear can feel like it defines us, but this verse reminds us that it's not our true identity as believers. Instead, God has equipped us with power, love, and a sound mind to face our fears."
    }
  },
  {
    challenge: "purpose",
    verse: {
      text: "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them.",
      reference: "Ephesians 2:10",
      explanation: "When questioning your purpose, this verse reminds you that you were intentionally created by God with specific good works in mind. Your life has meaning that was established even before you were born."
    }
  }
];

// Function to find relevant verse based on user challenge
export const findRelevantVerse = async (challenge: string): Promise<VerseData> => {
  // In a real app, this would be an API call to an AI service
  // For now, we'll simulate a delay and do basic keyword matching
  return new Promise((resolve) => {
    setTimeout(() => {
      // Convert challenge to lowercase for case-insensitive matching
      const lowercaseChallenge = challenge.toLowerCase();
      
      // Look for matching keywords
      for (const entry of verses) {
        if (lowercaseChallenge.includes(entry.challenge)) {
          resolve(entry.verse);
          return;
        }
      }
      
      // Default verse if no match found
      resolve({
        text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
        reference: "Jeremiah 29:11",
        explanation: "Whatever you're facing, remember that God has good plans for your life. Even when circumstances are difficult, this verse reminds us that He is working toward a hopeful future for us."
      });
    }, 1500); // Simulate API delay
  });
};
