
import { useState } from "react";
import { Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardType } from "./Board";
import CardDetailsModal from "./CardDetailsModal";

interface CardProps {
  card: CardType;
  onDelete: (cardId: string) => void;
  onUpdate: (card: CardType) => void;
}

const Card = ({ card, onDelete, onUpdate }: CardProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", card.id);
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div 
        draggable
        onDragStart={handleDragStart}
        onClick={handleCardClick}
        className={`${card.color} rounded-lg p-3 border cursor-pointer hover:shadow-md transition-shadow group`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-800 mb-1 break-words">{card.title}</h4>
            {card.description && (
              <p className="text-sm text-gray-600 break-words">{card.description}</p>
            )}
          </div>
          
          <div className="flex items-start gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical size={14} className="text-gray-400 mt-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card.id);
              }}
              className="text-gray-400 hover:text-red-600 p-1 h-auto"
            >
              <Trash2 size={12} />
            </Button>
          </div>
        </div>
      </div>

      <CardDetailsModal
        card={card}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default Card;
