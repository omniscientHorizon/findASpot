export type SpotStatus = 'available' | 'occupied' | 'partial' | 'unknown';

export type SpotType =
  | 'carrel'
  | 'computer'
  | 'study_room'
  | 'group_table'
  | 'large_table'
  | 'couch_table'
  | 'adjustable_computer'
  | 'carrel_enclosed';

export interface Floor {
  id: string;
  name: string;
  display_order: number;
}

export interface Spot {
  id: string;
  floor_id: string;
  name: string;
  type: SpotType;
  capacity: number;
  x_percent: number;
  y_percent: number;
  status: SpotStatus;
  updated_at: string;
  updated_by: string | null;
}
