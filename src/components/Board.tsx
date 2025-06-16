import { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Column from "./Column";
import { BoardType } from "@/pages/Index";

export interface CardType {
  id: string;
  title: string;
  description: string;
  color: string;
  columnId: string;
}

export interface ColumnType {
  id: string;
  title: string;
  cards: CardType[];
}

interface BoardProps {
  board: BoardType;
  onBack: () => void;
  onDelete: () => void;
}

const Board = ({ board, onBack, onDelete }: BoardProps) => {
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: "1",
      title: "À faire",
      cards: [
        {
          id: "1",
          title: "Planifier la réunion",
          description: "Organiser la réunion hebdomadaire avec l'équipe",
          color: "bg-yellow-100 border-yellow-300",
          columnId: "1"
        }
      ]
    },
    {
      id: "2", 
      title: "En cours",
      cards: [
        {
          id: "2",
          title: "Développer la fonctionnalité",
          description: "Implémenter le système de drag & drop",
          color: "bg-blue-100 border-blue-300",
          columnId: "2"
        }
      ]
    },
    {
      id: "3",
      title: "Terminé",
      cards: [
        {
          id: "3",
          title: "Design de l'interface",
          description: "Créer les maquettes de l'application",
          color: "bg-green-100 border-green-300",
          columnId: "3"
        }
      ]
    }
  ]);

  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [showAddColumn, setShowAddColumn] = useState(false);

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      const newColumn: ColumnType = {
        id: Date.now().toString(),
        title: newColumnTitle,
        cards: []
      };
      setColumns([...columns, newColumn]);
      setNewColumnTitle("");
      setShowAddColumn(false);
    }
  };

  const handleDeleteColumn = (columnId: string) => {
    setColumns(columns.filter(col => col.id !== columnId));
  };

  const handleAddCard = (columnId: string, card: Omit<CardType, "id" | "columnId">) => {
    const newCard: CardType = {
      ...card,
      id: Date.now().toString(),
      columnId
    };

    setColumns(columns.map(col => 
      col.id === columnId 
        ? { ...col, cards: [...col.cards, newCard] }
        : col
    ));
  };

  const handleDeleteCard = (cardId: string) => {
    setColumns(columns.map(col => ({
      ...col,
      cards: col.cards.filter(card => card.id !== cardId)
    })));
  };

  const handleMoveCard = (cardId: string, targetColumnId: string) => {
    let cardToMove: CardType | null = null;
    
    // Trouver et retirer la carte de sa colonne actuelle
    const updatedColumns = columns.map(col => {
      const cardIndex = col.cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        cardToMove = { ...col.cards[cardIndex], columnId: targetColumnId };
        return {
          ...col,
          cards: col.cards.filter(card => card.id !== cardId)
        };
      }
      return col;
    });

    // Ajouter la carte à la nouvelle colonne
    if (cardToMove) {
      const finalColumns = updatedColumns.map(col => 
        col.id === targetColumnId 
          ? { ...col, cards: [...col.cards, cardToMove!] }
          : col
      );
      setColumns(finalColumns);
    }
  };

  const handleUpdateCard = (updatedCard: CardType) => {
    setColumns(columns.map(col => ({
      ...col,
      cards: col.cards.map(card => 
        card.id === updatedCard.id ? updatedCard : card
      )
    })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Retour
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{board.name}</h1>
                <p className="text-gray-600 text-sm">{board.description}</p>
              </div>
            </div>
            <Button
              variant="destructive" 
              size="sm"
              onClick={onDelete}
              className="flex items-center gap-2"
            >
              <Trash2 size={16} />
              Supprimer
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onAddCard={handleAddCard}
              onDeleteCard={handleDeleteCard}
              onDeleteColumn={handleDeleteColumn}
              onMoveCard={handleMoveCard}
              onUpdateCard={handleUpdateCard}
            />
          ))}
          
          <div className="min-w-[300px]">
            {showAddColumn ? (
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <Input
                  placeholder="Titre de la colonne..."
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
                  className="mb-3"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddColumn}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Ajouter
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setShowAddColumn(false);
                      setNewColumnTitle("");
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setShowAddColumn(true)}
                className="w-full justify-start h-auto p-4 border-2 border-dashed border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800"
              >
                <Plus size={20} className="mr-2" />
                Ajouter une colonne
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
