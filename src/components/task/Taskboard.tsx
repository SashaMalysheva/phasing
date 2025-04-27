import React, { useState } from 'react';
import DataManagementCard from './DataManagementCard';
import DocumentManagementCard from './DocumentManagementCard';
import CommunicationCard from './CommunicationCard';
import PatientManagementCard from './PatientManagementCard';
import RegulatoryComplianceCard from './RegulatoryComplianceCard';
import IMPManagementCard from './IMPManagementCard';
import QueryResolutionCard from './QueryResolutionCard';
import { mockCards, Card } from './types';

const columns = [
  { key: 'crc_todo', title: 'CRC To-Do' },
  { key: 'crc_in_progress', title: 'CRC In Progress' },
  { key: 'ai_for_review', title: 'AI For Review' },
  { key: 'ai_in_progress', title: 'AI In Progress' },
];

const cardComponentMap = {
  DataManagement: DataManagementCard,
  DocumentManagement: DocumentManagementCard,
  Communication: CommunicationCard,
  PatientManagement: PatientManagementCard,
  RegulatoryCompliance: RegulatoryComplianceCard,
  IMPManagement: IMPManagementCard,
  QueryResolution: QueryResolutionCard,
};

const Taskboard: React.FC = () => {
  const [openCard, setOpenCard] = useState<Card | null>(null);
  const [cards, setCards] = useState<Card[]>(mockCards);

  const handleTypeChange = (id: number, newType: string) => {
    setCards(cards => cards.map(card => card.id === id ? { ...card, type: newType } : card));
    setOpenCard(card => card ? { ...card, type: newType } : card);
  };

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-4">
        <input className="border rounded px-2 py-1" placeholder="Filter: studies" />
        <input className="border rounded px-2 py-1" placeholder="Filter: task types" />
        <input className="border rounded px-2 py-1" placeholder="Filter: executed by AI" />
        <input className="border rounded px-2 py-1" placeholder="Filter: urgent only" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((col, idx) => (
          <div key={col.key} className="bg-white border rounded shadow-sm flex flex-col min-h-[400px]">
            <div className="text-xl font-semibold text-center border-b py-2 bg-gray-50">{col.title}</div>
            <div className="flex-1 p-2 space-y-4">
              {cards.filter(card => card.status === col.key).map(card => {
                const CardComponent = cardComponentMap[card.type as keyof typeof cardComponentMap];
                return (
                  <div key={card.id} onClick={() => setOpenCard(card)} className="cursor-pointer p-2 border rounded bg-gray-50 hover:bg-gray-100">
                    {card.type}
                  </div>
                );
              })}
            </div>
            {idx < 2 && (
              <div className="flex justify-center py-2">
                <button className="w-10 h-10 rounded-full bg-red-100 text-2xl text-gray-600 flex items-center justify-center border border-red-200">+</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Диалоговое окно для открытой карточки */}
      {openCard && (() => {
        const CardComponent = cardComponentMap[openCard.type as keyof typeof cardComponentMap];
        return (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-6 min-w-[320px] max-w-[90vw] relative">
              <CardComponent card={openCard} onClose={() => setOpenCard(null)} onTypeChange={newType => handleTypeChange(openCard.id, newType)} />
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Taskboard; 