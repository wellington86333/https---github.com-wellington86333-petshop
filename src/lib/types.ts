
export interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  dataAiHint?: string;
}
