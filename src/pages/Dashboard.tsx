import { useState } from "react";
import { Plus, Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import CreateBoard from "@/components/CreateBoard";
import { BoardType } from "./Index";

const Dashboard = () => {
  const [boards, setBoards] = useState<BoardType[]>([
    {
      id: "1",
      name: "Projet Marketing",
      description: "Campagne de lancement du nouveau produit",
      color: "bg-blue-500"
    },
    {
      id: "2", 
      name: "Développement Web",
      description: "Refonte du site web de l'entreprise",
      color: "bg-green-500"
    },
    {
      id: "3",
      name: "Support Client",
      description: "Gestion des tickets et amélioration du service",
      color: "bg-purple-500"
    },
    {
      id: "4",
      name: "Ressources Humaines",
      description: "Recrutement et formation des employés",
      color: "bg-orange-500"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  const filteredBoards = boards.filter(board =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    board.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mes Tableaux</h1>
              <p className="text-gray-600">Gérez tous vos projets en un coup d'œil</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher des tableaux..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              
              {/* Create Board Button */}
              <Button 
                onClick={() => setShowCreateBoard(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Nouveau Tableau
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {filteredBoards.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Grid className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "Aucun tableau trouvé" : "Aucun tableau"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? "Essayez un autre terme de recherche" : "Créez votre premier tableau pour commencer"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setShowCreateBoard(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un tableau
                </Button>
              )}
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
            }>
              {filteredBoards.map((board) => (
                <Link 
                  key={board.id}
                  to={`/project/${board.id}/tasks`}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group ${
                    viewMode === "list" ? "flex items-center p-4" : ""
                  }`}
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className={`h-20 ${board.color} rounded-t-lg relative`}>
                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-200 rounded-t-lg"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {board.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{board.description}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`w-12 h-12 ${board.color} rounded-lg mr-4`}></div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {board.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{board.description}</p>
                      </div>
                    </>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCreateBoard && (
        <CreateBoard 
          onClose={() => setShowCreateBoard(false)}
          onCreate={handleCreateBoard}
        />
      )}
    </div>
  );
};

export default Dashboard;
