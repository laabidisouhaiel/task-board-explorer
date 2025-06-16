
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Board from "@/components/Board";
import CreateBoard from "@/components/CreateBoard";

export interface BoardType {
  id: string;
  name: string;
  description: string;
  color: string;
}

const Index = () => {
  const [boards, setBoards] = useState<BoardType[]>([
    {
      id: "1",
      name: "Projet Personnel",
      description: "Organisation de mes tâches personnelles",
      color: "bg-blue-500"
    },
    {
      id: "2", 
      name: "Développement Web",
      description: "Suivi des projets de développement",
      color: "bg-green-500"
    }
  ]);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  const handleCreateBoard = (newBoard: Omit<BoardType, "id">) => {
    const board: BoardType = {
      ...newBoard,
      id: Date.now().toString()
    };
    setBoards([...boards, board]);
    setShowCreateBoard(false);
  };

  const handleDeleteBoard = (boardId: string) => {
    setBoards(boards.filter(b => b.id !== boardId));
    if (selectedBoard === boardId) {
      setSelectedBoard(null);
    }
  };

  if (selectedBoard) {
    const board = boards.find(b => b.id === selectedBoard);
    if (board) {
      return (
        <Board 
          board={board} 
          onBack={() => setSelectedBoard(null)}
          onDelete={() => handleDeleteBoard(selectedBoard)}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Mes Tableaux</h1>
            <p className="text-gray-600">Organisez vos projets et tâches efficacement</p>
          </div>
          <Button 
            onClick={() => setShowCreateBoard(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={20} />
            Nouveau Tableau
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <div
              key={board.id}
              onClick={() => setSelectedBoard(board.id)}
              className="cursor-pointer group"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className={`h-24 ${board.color} relative`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-200"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{board.name}</h3>
                  <p className="text-gray-600 text-sm">{board.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showCreateBoard && (
          <CreateBoard 
            onClose={() => setShowCreateBoard(false)}
            onCreate={handleCreateBoard}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
