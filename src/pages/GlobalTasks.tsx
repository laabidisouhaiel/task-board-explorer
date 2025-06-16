
import { useState } from "react";
import { Search, Filter, Calendar, User, Tag, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "@/components/Sidebar";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "review" | "done";
  priority: "high" | "medium" | "low";
  project: string;
  assignee: string;
  dueDate: string;
  labels: string[];
  createdAt: string;
}

const GlobalTasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterProject, setFilterProject] = useState("all");

  // Mock data for all tasks across projects
  const allTasks: Task[] = [
    {
      id: "1",
      title: "Conception interface utilisateur",
      description: "Créer les maquettes pour le nouveau dashboard",
      status: "inprogress",
      priority: "high",
      project: "Développement Web",
      assignee: "Marie Dupont",
      dueDate: "2024-01-20",
      labels: ["Design", "UI/UX"],
      createdAt: "2024-01-10"
    },
    {
      id: "2",
      title: "Implémentation API REST",
      description: "Développer les endpoints pour la gestion des utilisateurs",
      status: "todo",
      priority: "high",
      project: "Développement Web",
      assignee: "Jean Martin",
      dueDate: "2024-01-25",
      labels: ["Backend", "API"],
      createdAt: "2024-01-12"
    },
    {
      id: "3",
      title: "Tests unitaires",
      description: "Écrire les tests pour les composants React",
      status: "review",
      priority: "medium",
      project: "Développement Web",
      assignee: "Pierre Leroy",
      dueDate: "2024-01-22",
      labels: ["Testing", "React"],
      createdAt: "2024-01-08"
    },
    {
      id: "4",
      title: "Campagne email marketing",
      description: "Préparer la newsletter mensuelle",
      status: "done",
      priority: "low",
      project: "Marketing",
      assignee: "Sophie Durand",
      dueDate: "2024-01-15",
      labels: ["Marketing", "Email"],
      createdAt: "2024-01-05"
    },
    {
      id: "5",
      title: "Analyse des performances",
      description: "Étudier les métriques du site web",
      status: "inprogress",
      priority: "medium",
      project: "Marketing",
      assignee: "Alice Bernard",
      dueDate: "2024-01-28",
      labels: ["Analytics", "SEO"],
      createdAt: "2024-01-14"
    }
  ];

  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    const matchesProject = filterProject === "all" || task.project === filterProject;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo": return "bg-gray-100 text-gray-800";
      case "inprogress": return "bg-blue-100 text-blue-800";
      case "review": return "bg-yellow-100 text-yellow-800";
      case "done": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "todo": return <Clock className="h-4 w-4" />;
      case "inprogress": return <Clock className="h-4 w-4 text-blue-600" />;
      case "review": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "done": return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const tasksByStatus = {
    todo: allTasks.filter(t => t.status === "todo").length,
    inprogress: allTasks.filter(t => t.status === "inprogress").length,
    review: allTasks.filter(t => t.status === "review").length,
    done: allTasks.filter(t => t.status === "done").length
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Toutes les tâches</h1>
              <p className="text-gray-600">Vue globale de toutes vos tâches</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher des tâches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="todo">À faire</SelectItem>
                <SelectItem value="inprogress">En cours</SelectItem>
                <SelectItem value="review">En révision</SelectItem>
                <SelectItem value="done">Terminé</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes priorités</SelectItem>
                <SelectItem value="high">Haute</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Basse</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterProject} onValueChange={setFilterProject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Projet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les projets</SelectItem>
                <SelectItem value="Développement Web">Développement Web</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Tabs defaultValue="list" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="list">Liste</TabsTrigger>
                <TabsTrigger value="kanban">Kanban</TabsTrigger>
                <TabsTrigger value="calendar">Calendrier</TabsTrigger>
              </TabsList>
              
              <div className="text-sm text-gray-600">
                {filteredTasks.length} tâche(s) trouvée(s)
              </div>
            </div>

            <TabsContent value="list" className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="text-2xl font-bold">{tasksByStatus.todo}</p>
                        <p className="text-xs text-gray-600">À faire</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{tasksByStatus.inprogress}</p>
                        <p className="text-xs text-gray-600">En cours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <div>
                        <p className="text-2xl font-bold text-yellow-600">{tasksByStatus.review}</p>
                        <p className="text-xs text-gray-600">En révision</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold text-green-600">{tasksByStatus.done}</p>
                        <p className="text-xs text-gray-600">Terminées</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(task.status)}
                            <h3 className="font-semibold text-gray-900">{task.title}</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {task.assignee}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {task.dueDate}
                            </div>
                            <span className="text-gray-400">•</span>
                            <span>{task.project}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 ml-4">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status === "todo" && "À faire"}
                            {task.status === "inprogress" && "En cours"}
                            {task.status === "review" && "En révision"}
                            {task.status === "done" && "Terminé"}
                          </Badge>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority === "high" && "Haute"}
                            {task.priority === "medium" && "Moyenne"}
                            {task.priority === "low" && "Basse"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 mt-3">
                        {task.labels.map((label, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="kanban">
              <div className="text-center py-12 text-gray-500">
                <p>Vue Kanban globale - À implémenter</p>
              </div>
            </TabsContent>

            <TabsContent value="calendar">
              <div className="text-center py-12 text-gray-500">
                <p>Vue Calendrier - À implémenter</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GlobalTasks;
