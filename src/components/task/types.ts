export interface Card {
  type: string;
  status: string;
  [key: string]: any;
}

export interface CardProps {
  card: Card;
  onClose: () => void;
  onTypeChange: (newType: string) => void;
}

export const cardTypes = [
  'DataManagement',
  'DocumentManagement',
  'Communication',
  'PatientManagement',
  'RegulatoryCompliance',
  'IMPManagement',
  'QueryResolution',
];

export const mockCards: Card[] = [
  { type: 'DataManagement', status: 'crc_todo', id: 1 },
  { type: 'DocumentManagement', status: 'crc_in_progress', id: 2 },
  { type: 'Communication', status: 'ai_for_review', id: 3 },
]; 