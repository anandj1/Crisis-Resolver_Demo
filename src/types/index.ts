export type Priority = 'urgent' | 'high' | 'medium' | 'low';
export type Status = 'pending' | 'in-progress' | 'resolved';
export type Category = 'road' | 'waste' | 'infrastructure' | 'other';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: Status;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  imageUrl: string;
  reporterId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}