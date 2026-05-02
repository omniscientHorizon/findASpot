import { SpotType } from './types';

export const FLOORS = [
  { id: 'basement', name: 'Basement', display_order: 0 },
  { id: 'first', name: '1st Floor', display_order: 1 },
  { id: 'second', name: '2nd Floor', display_order: 2 },
  { id: 'third', name: '3rd Floor', display_order: 3 },
];

export const FLOOR_IMAGES: Record<string, string> = {
  basement: '/floors/basement.png',
  first: '/floors/first.png',
  second: '/floors/second.png',
  third: '/floors/third.png',
};

export const STALE_THRESHOLD_MINUTES = 60;

export const RATE_LIMIT_SECONDS = 120;

export const TYPE_LABELS: Record<SpotType, string> = {
  carrel: 'Study Desk',
  computer: 'Computer',
  study_room: 'Study Room',
  group_table: 'Group Table',
  large_table: 'Large Table',
  couch_table: 'Couch Table',
  adjustable_computer: 'Adj. Computer',
  carrel_enclosed: 'Enclosed Study Desk',
};

export const TYPE_COLORS: Record<SpotType, string> = {
  carrel: '#6366f1',
  computer: '#8b5cf6',
  study_room: '#f59e0b',
  group_table: '#3b82f6',
  large_table: '#0ea5e9',
  couch_table: '#14b8a6',
  adjustable_computer: '#a855f7',
  carrel_enclosed: '#4f46e5',
};

export const TYPE_ICONS: Record<SpotType, string> = {
  carrel: '🪑',
  computer: '💻',
  study_room: '🚪',
  group_table: '👥',
  large_table: '🪑',
  couch_table: '🛋️',
  adjustable_computer: '🖥️',
  carrel_enclosed: '🔒',
};

export const TYPE_FEATURES: Record<SpotType, string[]> = {
  carrel: ['Charging ports', 'Desk lamp', 'Solo study'],
  computer: ['Computer provided', 'Charging ports'],
  study_room: ['Whiteboard', 'Private room', 'TV (some rooms)'],
  group_table: ['Charging ports', 'Group friendly'],
  large_table: ['Charging ports', 'Extra large'],
  couch_table: ['Couch seating', 'Charging ports'],
  adjustable_computer: ['Height adjustable', 'Computer provided', 'Charging ports'],
  carrel_enclosed: ['3-sided privacy dividers', 'Charging ports', 'Quiet study'],
};
