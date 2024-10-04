export interface Glamping {
  _id?: string; // Поле для объектов из базы данных
  title: string;
  description: string;
  price: number;
  capacity: number;
  amenities?: string[]; // Массив удобств
  image?: string;
  
}