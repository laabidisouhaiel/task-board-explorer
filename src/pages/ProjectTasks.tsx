
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Search, Filter, Edit, Trash2, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "@/components/Sidebar";

interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "review" | "done";
  priority: "high" | "medium" | "low";
  assignee: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  labels: string[];
  createdAt: string;
  updatedAt: string;
}

const ProjectTasks = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterAssignee, setFilterAssignee] = useState("all");

  // Mock project data
  const project = {
    id: id,
    name: "Développement Web",
    description: "Refonte complète du site web de l'entreprise"
  };

  // Mock tasks data for the project
  const projectTasks: ProjectTask[] = [
    {
      id: "1",
      title: "Analyse des besoins",
      description: "Collecter et analyser les exigences fonctionnelles",
      status: "done",
      priority: "high",
      assignee: "Sophie Durand",
      dueDate: "2024-01-15",
      estimatedHours: 16,
      actualHours: 18,
      labels: ["Analysis", "Requirements"],
      createdAt: "2024-01-01",
      updatedAt: "2024-01-15"
    },
    {
      id: "2",
      title: "Design système",
      description: "Créer l'architecture technique du projet",
      status: "done",
      priority: "high",
      assignee: "Jean Martin",
      dueDate: "2024-01-18",
      estimatedHours: 24,
      actualHours: 22,
      labels: ["Architecture", "Design"],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18"
    },
    {
      id: "3",
      title: "Interface utilisateur",
      description: "Développer les composants de l'interface",
      status: "inprogress",
      priority: "high",
      assignee: "Marie Dupont",
      dueDate: "2024-01-25",
      estimatedHours: 40,
      actualHours: 25,
      labels: ["Frontend", "UI"],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20"
    },
    {
      id: "4",
      title: "API Backend",
      description: "Implémenter les services backend",
      status: "inprogress",
      priority: "high",
      assignee: "Jean Martin",
      dueDate: "2024-01-28",
      estimatedHours: 35,
      actualHours: 15,
      labels: ["Backend", "API"],
      createdAt: "2024-01-18",
      updatedAt: "2024-01-22"
    },
    {
      id: "5",
      title: "Tests d'intégration",
      description: "Tests de l'ensemble du système",
      status: "todo",
      priority: "medium",
      assignee: "Pierre Leroy",
      dueDate: "2024-02-05",
      estimatedHours: 20,
      actualHours: 0,
      labels: ["Testing", "Integration"],
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20"
    },
    {
      id: "6",
      title: "Documentation",
      description: "Rédiger la documentation technique",
      status: "todo",
      priority: "low",
      assignee: "Alice Bernard",
      dueDate: "2024-02-10",
      estimatedHours: 12,
      actualHours: 0,
      labels: ["Documentation"],
      createdAt: "2024-01-22",
      updatedAt: "2024-01-22"
    }
  ];

  const filteredTasks = projectTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesAssignee = filterAssignee === "all" || task.assignee === filterAssignee;
    
    return matchesSearch && matchesStatus && matchesAssignee;
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

  const getProgressPercentage = (actual: number, estimated: number) => {
    if (estimated === 0) return 0;
    return Math.min(100, Math.round((actual / estimated) * 100));
  };

  const uniqueAssignees = [...new Set(projectTasks.map(task => task.assignee))];

  const totalEstimated = projectTasks.reduce((sum, task) => sum + task.estimatedHours, 0);
  const totalActual = projectTasks.reduce((sum, task) => sum + task.actualHours, 0);
  const completedTasks = projectTasks.filter(task => task.status === "done").length;
  const totalTasks = projectTasks.length;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-600">Gestion des tâches</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/project/${id}/dashboard`}>
                <Button variant="outline">Tableau de bord</Button>
              </Link>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nouvelle tâche
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
              <div className="text-sm text-gray-600">Total tâches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
              <div className="text-sm text-gray-600">Terminées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalEstimated}h</div>
              <div className="text-sm text-gray-600">Estimé</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalActual}h</div>
              <div className="text-sm text-gray-600">Réalisé</div>
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
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="todo">À faire</SelectItem>
                <SelectItem value="inprogress">En cours</SelectItem>
                <SelectItem value="review">En révision</SelectItem>
                <SelectItem value="done">Terminé</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterAssignee} onValueChange={setFilterAssignee}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assigné à" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {uniqueAssignees.map((assignee) => (
                  <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Card>
            <CardHeader>
              <CardTitle>Tâches du projet ({filteredTasks.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tâche</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Assigné à</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead>Temps</TableHead>
                    <TableHead>Progression</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-gray-600">{task.description}</div>
                          <div className="flex gap-1 mt-1">
                            {task.labels.map((label, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status === "todo" && "À faire"}
                          {task.status === "inprogress" && "En cours"}
                          {task.status === "review" && "En révision"}
                          {task.status === "done" && "Terminé"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority === "high" && "Haute"}
                          {task.priority === "medium" && "Moyenne"}
                          {task.priority === "low" && "Basse"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {task.assignee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm">{task.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{task.actualHours}h / {task.estimatedHours}h</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-24">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${getProgressPercentage(task.actualHours, task.estimatedHours)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600">
                              {getProgressPercentage(task.actualHours, task.estimatedHours)}%
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectTasks;
