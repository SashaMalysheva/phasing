import React from 'react';
import { CardProps, cardTypes } from './types';

const CommunicationCard: React.FC<CardProps> = ({ card, onClose, onTypeChange }) => {
  let content;
  if (card.status === 'crc_todo') {
    content = <>
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">×</button>
      <div>CommunicationCard — CRC To-Do</div>
      <div className="mb-2">Тип: {card.type}</div>
      <select
        className="border rounded px-2 py-1"
        value={card.type}
        onChange={e => onTypeChange(e.target.value)}
      >
        {cardTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </>;
  } else if (card.status === 'crc_in_progress') {
    content = <>
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">×</button>
      <div>CommunicationCard — CRC In Progress</div>
      <div className="mb-2">Тип: {card.type}</div>
      <select
        className="border rounded px-2 py-1"
        value={card.type}
        onChange={e => onTypeChange(e.target.value)}
      >
        {cardTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </>;
  } else if (card.status === 'ai_for_review') {
    content = <>
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">×</button>
      <div>CommunicationCard — AI For Review</div>
      <div className="mb-2">Тип: {card.type}</div>
      <select
        className="border rounded px-2 py-1"
        value={card.type}
        onChange={e => onTypeChange(e.target.value)}
      >
        {cardTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </>;
  } else if (card.status === 'ai_in_progress') {
    content = <>
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">×</button>
      <div>CommunicationCard — AI In Progress</div>
      <div className="mb-2">Тип: {card.type}</div>
      <select
        className="border rounded px-2 py-1"
        value={card.type}
        onChange={e => onTypeChange(e.target.value)}
      >
        {cardTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </>;
  } else {
    content = <div>Incorrect status</div>;
  }
  return (
    <div className="p-4 border rounded bg-white relative">
      {content}
    </div>
  );
};

export default CommunicationCard; 