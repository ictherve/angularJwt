import {User} from './user';

export interface CarDTO {

  id: number;
  brand?: string;
  model?: string;
  sold: boolean;
  creation: Date;
  user: User | number;
}
