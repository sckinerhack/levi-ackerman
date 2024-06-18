import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPaginationPages(currentPage: number, totalPages: number): number[] {
  const delta = 2; // Number of pages to show around the current page
  const range = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number;

  range.push(1);
  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i >= 2 && i < totalPages) {
      range.push(i);
    }
  }
  range.push(totalPages);

  range.forEach((page) => {
    if (l) {
      if (page - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (page - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(page);
    l = page;
  });

  return rangeWithDots as number[];
}

export function extractMovieDetails(movieString : string) {
  // Regular expression to match Arabic characters
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;
  
  // Remove Arabic characters
  const cleanedString = movieString.replace(arabicRegex, '').trim();
  
  // Regular expression to match the year (4 consecutive digits)
  const yearRegex = /\b\d{4}\b/;
  
  // Find the year in the string
  const yearMatch = cleanedString.match(yearRegex);
  const year = yearMatch ?  yearMatch[0] : null;
  
  // Remove the year from the string to get the title
  const title = cleanedString.replace(yearRegex, '').trim();
  
  return {
      title: title,
      year: year
  };
}