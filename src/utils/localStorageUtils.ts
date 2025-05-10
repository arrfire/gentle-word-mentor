
import { VerseData } from "@/components/VerseCard";

// Local storage keys
const FAVORITES_KEY = 'bible_wisdom_favorites';
const PRAYERS_KEY = 'bible_wisdom_prayers';

// Favorites
export const getFavorites = (): VerseData[] => {
  const favoritesString = localStorage.getItem(FAVORITES_KEY);
  if (!favoritesString) return [];
  try {
    return JSON.parse(favoritesString);
  } catch (e) {
    console.error('Error parsing favorites from localStorage', e);
    return [];
  }
};

export const saveFavorite = (verse: VerseData): void => {
  const favorites = getFavorites();
  const isAlreadySaved = favorites.some(fav => 
    fav.reference === verse.reference && fav.text === verse.text
  );
  
  let updatedFavorites;
  
  if (isAlreadySaved) {
    updatedFavorites = favorites.filter(fav => 
      !(fav.reference === verse.reference && fav.text === verse.text)
    );
  } else {
    updatedFavorites = [...favorites, verse];
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

export const isFavorite = (verse: VerseData): boolean => {
  const favorites = getFavorites();
  return favorites.some(fav => 
    fav.reference === verse.reference && fav.text === verse.text
  );
};

// Prayer journal
export interface PrayerEntry {
  id: string;
  date: string;
  text: string;
  relatedVerse?: {
    text: string;
    reference: string;
  };
}

export const getPrayers = (): PrayerEntry[] => {
  const prayersString = localStorage.getItem(PRAYERS_KEY);
  if (!prayersString) return [];
  try {
    return JSON.parse(prayersString);
  } catch (e) {
    console.error('Error parsing prayers from localStorage', e);
    return [];
  }
};

export const savePrayer = (prayer: PrayerEntry): void => {
  const prayers = getPrayers();
  const updatedPrayers = [...prayers, prayer];
  localStorage.setItem(PRAYERS_KEY, JSON.stringify(updatedPrayers));
};

export const deletePrayer = (prayerId: string): void => {
  const prayers = getPrayers();
  const updatedPrayers = prayers.filter(prayer => prayer.id !== prayerId);
  localStorage.setItem(PRAYERS_KEY, JSON.stringify(updatedPrayers));
};
