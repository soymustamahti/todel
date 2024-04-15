import { User } from 'src/shared/lib/interfaces/user';

export interface Friend {
  id: string;
  sender: User;
  receiver: User;
  accepted: boolean;
  createdAt: string; // iso string
  updatedAt: string; // iso string
}
