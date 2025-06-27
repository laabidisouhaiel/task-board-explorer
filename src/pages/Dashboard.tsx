
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [projects] = useState([
    {
      id: 1,
      name: "Projet Marketing",
      description: "Campagne publicitaire Q1 2024",
      progress: 75,
      tasks: { total: 24, completed: 18, inProgress: 4, pending: 2 },
      team: ["Alice", "Bob", "Charlie"],
      dueDate: "2024-02-15",
      priority: "high",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Développement Web",
      description: "Refonte du site e-commerce",
      progress: 45,
      tasks: { total: 32, completed: 14, inProgress: 8, pending: 10 },
      team: ["David", "Eve", "Frank", "Grace"],
      dueDate: "2024-03-20",
      priority: "high",
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      id: 3,
      name: "Design System",
      description: "Création des composants UI",
      progress: 90,
      tasks: { total: 16, completed: 14, inProgress: 2, pending: 0 },
      team: ["Hannah", "Ian"],
      dueDate: "2024-01-30",
      priority: "medium",
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      id: 4,
      name: "Support Client",
      description: "Amélioration du service client",
      progress: 20,
      tasks: { total: 12, completed: 2, inProgress: 3, pending: 7 },
      team: ["Jack", "Kelly", "Liam"],
      dueDate: "2024-04-10",
      priority: "low",
      color: "bg-gradient-to-r from-orange-500 to-orange-600"
    }
  ]);

  const stats = [
    {
      title: "Projets actifs",
      value: "12",
      change: "+2 ce mois",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Tâches terminées",
      value: "147",
      change: "+23 cette semaine",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Membres actifs",
      value: "28",
      change: "+4 nouveaux",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Échéances proches",
      value: "5",
      change: "dans 7 jours",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Alice Martin",
      action: "a terminé la tâche",
      target: "Design des mockups",
      project: "Projet Marketing",
      time: "il y a 2 heures",
      avatar: "AM"
    },
    {
      id: 2,
      user: "Bob Durand",
      action: "a créé un nouveau projet",
      target: "App Mobile V2",
      project: "",
      time: "il y a 4 heures",
      avatar: "BD"
    },
    {
      id: 3,
      user: "Charlie Moreau",
      action: "a assigné une tâche à",
      target: "David",
      project: "Développement Web",
      time: "il y a 6 heures",
      avatar: "CM"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleProjectClick = (projectId: number) => {
    navigate(`/project/${projectId}/tasks`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-600 mt-1">Bienvenue, voici un aperçu de vos projets</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau projet
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm font-medium ${stat.color} mt-1`}>{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projects */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Projets récents</CardTitle>
                      <CardDescription>Aperçu de vos projets en cours</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Voir tout
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      onClick={() => handleProjectClick(project.id)}
                      className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-gray-600 text-sm">{project.description}</p>
                        </div>
                        <Badge className={`${getPriorityColor(project.priority)} border-0`}>
                          {project.priority === "high" ? "Haute" : project.priority === "medium" ? "Moyenne" : "Basse"}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        {/* Progress */}
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Progression</span>
                            <span className="font-medium text-gray-900">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-gray-900">{project.tasks.total}</div>
                            <div className="text-xs text-gray-500">Total</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">{project.tasks.completed}</div>
                            <div className="text-xs text-gray-500">Terminées</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-600">{project.tasks.inProgress}</div>
                            <div className="text-xs text-gray-500">En cours</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-orange-600">{project.tasks.pending}</div>
                            <div className="text-xs text-gray-500">En attente</div>
                          </div>
                        </div>

                        {/* Team & Due Date */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {project.team.length} membre{project.team.length > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {new Date(project.dueDate).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle tâche
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Planifier réunion
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Inviter membre
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Activité récente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600 flex-shrink-0">
                        {activity.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                          {activity.project && <span className="text-gray-500"> dans {activity.project}</span>}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
