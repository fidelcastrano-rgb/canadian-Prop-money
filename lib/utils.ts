import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const IMAGE_MAPPING: Record<string, string> = {
  "/upload/product/buy-counterfeit-100-cad-banknotes.webp": "/images/buy-counterfeit-100-cad-banknotes.webp",
  "/upload/product/buy-counterfeit-50-cad-banknotes.webp": "/images/buy-counterfeit-50-cad-banknotes.webp",
  "/upload/product/buy-counterfeit-20-cad-banknotes.webp": "/images/buy-counterfeit-20-cad-banknotes.webp",
  "/upload/product/buy-counterfeit-10-cad-banknotes.webp": "/images/buy-counterfeit-10-cad-banknotes.webp",
  "/upload/product/buy-counterfeit-5-cad-banknotes.webp": "/images/buy-counterfeit-5-cad-banknotes.webp",
  
  // USD Stacks
  "/upload/product/buy-100-us-dollar-bills.webp": "/images/buy-100-us-dollar-bills.webp",
  "/upload/product/buy-50-us-dollar-bills.webp": "/images/buy-50-us-dollar-bills.webp",

  // AUD Stacks (scraped from australianpropsmoney.com/products)
  "/upload/product/buy-aud-10-dollar.webp": "/images/buy-aud-10-dollar.webp",
  "/upload/product/buy-aud-20-dollars.webp": "/images/buy-aud-20-dollars.webp",
  "/upload/product/buy-counterfeit-aud-50-dollar-banknotes.webp": "/images/buy-counterfeit-aud-50-dollar-banknotes.webp",
  "/upload/product/buy-aud-100-dollars.webp": "/images/buy-aud-100-dollars.webp",

  // EUR Stacks
  "/upload/product/buy-500-euro-bills.webp": "/images/buy-500-euro-bills.webp",
  "/upload/product/buy-eur200-euro-bills.webp": "/images/buy-eur200-euro-bills.webp",
  "/upload/product/buy-eur100-euro-bills.webp": "/images/buy-eur100-euro-bills.webp",
  "/upload/product/buy-eur50-euro-bills.webp": "/images/buy-eur50-euro-bills.webp",
  "/upload/product/buy-eur20-euro-bills.webp": "/images/buy-eur20-euro-bills.webp",
  "/upload/product/buy-eur10-euro-bills.webp": "/images/buy-eur10-euro-bills.webp",
  "/upload/product/buy-eur5-euro-bills.webp": "/images/buy-eur5-euro-bills.webp"
};

export function resolveImageUrl(src: string): string {
  if (!src) return "/hero1.png";
  if (IMAGE_MAPPING[src]) {
    return IMAGE_MAPPING[src];
  }
  return src;
}
