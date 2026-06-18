import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const IMAGE_MAPPING: Record<string, string> = {
  "/upload/product/buy-counterfeit-100-cad-banknotes.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-100-cad-banknotes.251webp",
  "/upload/product/buy-counterfeit-50-cad-banknotes.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-50-cad-banknotes.250webp",
  "/upload/product/buy-counterfeit-20-cad-banknotes.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-20-cad-banknotes.249webp",
  "/upload/product/buy-counterfeit-10-cad-banknotes.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-10-cad-banknotes.248webp",
  "/upload/product/buy-counterfeit-5-cad-banknotes.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-5-cad-banknotes.247webp",
  "/upload/product/buy-aud-100-dollars.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-aud-100-dollars.219webp",
  "/upload/product/buy-counterfeit-aud-50-dollar-banknotes.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-counterfeit-aud-50-dollar-banknotes.252webp",
  "/upload/product/buy-aud-20-dollars.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-aud-20-dollars.221webp",
  "/upload/product/buy-aud-10-dollar.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-aud-10-dollar.222webp",
  "/upload/product/buy-500-euro-bills.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-500-euro-bills.226webp",
  "/upload/product/buy-eur200-euro-bills.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-eur200-euro-bills.227webp",
  "/upload/product/buy-eur100-euro-bills.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-eur100-euro-bills.228webp",
  "/upload/product/buy-eur50-euro-bills.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-eur50-euro-bills.229webp",
  "/upload/product/buy-eur20-euro-bills.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-eur20-euro-bills.230webp",
  "/upload/product/buy-eur10-euro-bills.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-eur10-euro-bills.231webp",
  "/upload/product/buy-eur5-euro-bills.webp": "https://propcounterfeitnotes.com/public/upload/product/buy-eur5-euro-bills.232webp"
};

export function resolveImageUrl(src: string): string {
  if (!src) return "/hero1.png";
  if (IMAGE_MAPPING[src]) {
    return IMAGE_MAPPING[src];
  }
  return src;
}
