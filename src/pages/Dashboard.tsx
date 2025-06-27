
import { useState } from "react";
import { Plus, Search, Grid, List, Filter, Star, Clock, Users } from "lucide-react";
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
      color: "gradient-blue"
    },
    {
      id: "2", 
      name: "Développement Web",
      description: "Refonte du site web de l'entreprise",
      color: "gradient-green"
    },
    {
      id: "3",
      name: "Support Client",
      description: "Gestion des tickets et amélioration du service",
      color: "gradient-purple"
    },
    {
      id: "4",
      name: "Ressources Humaines",
      description: "Recrutement et formation des employés",
      color: "gradient-orange"
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
        <div className="bg-white border-b border-gray-100 px-8 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mes Tableaux</h1>
              <p className="text-gray-600 mt-1">Gérez tous vos projets en un coup d'œil</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Rechercher des tableaux..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 w-80 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                />
              </div>
              
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === "grid" 
                      ? "bg-white shadow-sm text-blue-600" 
                      : "hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-white shadow-sm text-blue-600" 
                      : "hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              
              {/* Filter Button */}
              <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-200 hover:border-gray-300">
                <Filter className="h-5 w-5 mr-2" />
                Filtres
              </Button>
              
              {/* Create Board Button */}
              <Button 
                onClick={() => setShowCreateBoard(true)}
                className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nouveau Tableau
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-8 py-6 bg-white border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Projets</p>
                  <p className="text-3xl font-bold text-blue-900">{boards.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Grid className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Projets Actifs</p>
                  <p className="text-3xl font-bold text-green-900">3</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Tâches Totales</p>
                  <p className="text-3xl font-bold text-orange-900">127</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Membres Équipe</p>
                  <p className="text-3xl font-bold text-purple-900">12</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-auto">
          {filteredBoards.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Grid className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {searchTerm ? "Aucun tableau trouvé" : "Aucun tableau"}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchTerm ? "Essayez un autre terme de recherche" : "Créez votre premier tableau pour commencer à organiser vos projets"}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setShowCreateBoard(true)}
                  className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Créer un tableau
                </Button>
              )}
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
              : "space-y-4"
            }>
              {filteredBoards.map((board) => (
                <Link 
                  key={board.id}
                  to={`/project/${board.id}/tasks`}
                  className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-gray-200 ${
                    viewMode === "list" ? "flex items-center p-6" : ""
                  }`}
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className={`h-24 ${board.color} rounded-t-2xl relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/20 group-hover:from-black/5 group-hover:to-black/10 transition-all duration-300"></div>
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <Star className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {board.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{board.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="flex -space-x-2">
                              <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                              <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                              <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">+3</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            12 tâches
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`w-16 h-16 ${board.color} rounded-2xl mr-6 flex-shrink-0`}></div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                          {board.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{board.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>12 tâches</span>
                          <span>•</span>
                          <span>3 membres</span>
                          <span>•</span>
                          <span>Mis à jour il y a 2h</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                          <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                          <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Star className="h-4 w-4" />
                        </Button>
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
