
import { useState } from "react";
import { Plus, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Card from "./Card";
import { ColumnType, CardType } from "./Board";

interface ColumnProps {
  column: ColumnType;
  onAddCard: (columnId: string, card: Omit<CardType, "id" | "columnId">) => void;
  onDeleteCard: (cardId: string) => void;
  onDeleteColumn: (columnId: string) => void;
  onMoveCard: (cardId: string, targetColumnId: string) => void;
}

const cardColors = [
  "bg-yellow-100 border-yellow-300",
  "bg-blue-100 border-blue-300", 
  "bg-green-100 border-green-300",
  "bg-purple-100 border-purple-300",
  "bg-red-100 border-red-300",
  "bg-orange-100 border-orange-300"
];

const Column = ({ column, onAddCard, onDeleteCard, onDeleteColumn, onMoveCard }: ColumnProps) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(cardColors[0]);

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onAddCard(column.id, {
        title: newCardTitle,
        description: newCardDescription,
        color: selectedColor
      });
      setNewCardTitle("");
      setNewCardDescription("");
      setSelectedColor(cardColors[0]);
      setShowAddCard(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    onMoveCard(cardId, column.id);
  };

  return (
    <div 
      className="bg-gray-100 rounded-lg p-4 min-w-[300px] max-w-[300px]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{column.title}</h3>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
            {column.cards.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteColumn(column.id)}
            className="text-gray-500 hover:text-red-600 p-1 h-auto"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {column.cards.map((card) => (
          <Card 
            key={card.id} 
            card={card} 
            onDelete={onDeleteCard}
          />
        ))}
      </div>

      {showAddCard ? (
        <div className="bg-white rounded-lg p-3 shadow-sm border">
          <Input
            placeholder="Titre de la carte..."
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="mb-2"
          />
          <Textarea
            placeholder="Description (optionnelle)..."
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            className="mb-3 min-h-[60px]"
          />
          
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">Couleur :</p>
            <div className="flex gap-2 flex-wrap">
              {cardColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded border-2 ${color} ${
                    selectedColor === color ? 'ring-2 ring-blue-500' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleAddCard}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              Ajouter
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setShowAddCard(false);
                setNewCardTitle("");
                setNewCardDescription("");
                setSelectedColor(cardColors[0]);
              }}
            >
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="ghost"
          onClick={() => setShowAddCard(true)}
          className="w-full justify-start text-gray-600 hover:text-gray-800 border-2 border-dashed border-gray-300 hover:border-gray-400"
        >
          <Plus size={16} className="mr-2" />
          Ajouter une carte
        </Button>
      )}
    </div>
  );
};

export default Column;
