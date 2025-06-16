
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, CheckCircle, Clock, AlertCircle, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";

const ProjectDashboard = () => {
  const { id } = useParams();
  
  // Mock data for project statistics
  const projectStats = {
    name: "Développement Web",
    totalTasks: 24,
    completedTasks: 8,
    inProgressTasks: 12,
    todoTasks: 4,
    overdueTasks: 2,
    teamMembers: 5,
    completion: 33
  };

  const recentActivity = [
    { id: 1, action: "Marie a complété", task: "Design de l'interface", time: "Il y a 2h" },
    { id: 2, action: "Jean a créé", task: "Nouvelle fonctionnalité", time: "Il y a 4h" },
    { id: 3, action: "Sophie a commenté", task: "Bug correction", time: "Il y a 6h" },
    { id: 4, action: "Pierre a déplacé", task: "Test unitaires", time: "Hier" }
  ];

  const upcomingDeadlines = [
    { id: 1, task: "Livraison MVP", date: "2024-01-20", priority: "high" },
    { id: 2, task: "Tests d'intégration", date: "2024-01-25", priority: "medium" },
    { id: 3, task: "Documentation", date: "2024-01-30", priority: "low" }
  ];

  const teamMembers = [
    { id: 1, name: "Marie Dupont", role: "Designer", avatar: "MD", tasksCount: 5 },
    { id: 2, name: "Jean Martin", role: "Développeur", avatar: "JM", tasksCount: 8 },
    { id: 3, name: "Sophie Durand", role: "Chef de projet", avatar: "SD", tasksCount: 3 },
    { id: 4, name: "Pierre Leroy", role: "Testeur", avatar: "PL", tasksCount: 6 },
    { id: 5, name: "Alice Bernard", role: "Développeur", avatar: "AB", tasksCount: 2 }
  ];

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
                  Retour aux tableaux
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{projectStats.name}</h1>
                <p className="text-gray-600">Tableau de bord du projet</p>
              </div>
            </div>
            <Link to={`/board/${id}`}>
              <Button>Voir le tableau</Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="team">Équipe</TabsTrigger>
              <TabsTrigger value="analytics">Analytiques</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total des tâches</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projectStats.totalTasks}</div>
                    <p className="text-xs text-muted-foreground">+2 depuis la semaine dernière</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Terminées</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{projectStats.completedTasks}</div>
                    <p className="text-xs text-muted-foreground">+3 cette semaine</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">En cours</CardTitle>
                    <Clock className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{projectStats.inProgressTasks}</div>
                    <p className="text-xs text-muted-foreground">Progression normale</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">En retard</CardTitle>
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{projectStats.overdueTasks}</div>
                    <p className="text-xs text-muted-foreground">Attention requise</p>
                  </CardContent>
                </Card>
              </div>

              {/* Progress and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progression du projet</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Complété</span>
                        <span>{projectStats.completion}%</span>
                      </div>
                      <Progress value={projectStats.completion} className="h-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-green-600">{projectStats.completedTasks}</div>
                        <div className="text-xs text-gray-500">Terminées</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-blue-600">{projectStats.inProgressTasks}</div>
                        <div className="text-xs text-gray-500">En cours</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-600">{projectStats.todoTasks}</div>
                        <div className="text-xs text-gray-500">À faire</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activité récente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.action}</span>{" "}
                              <span className="text-gray-600">"{activity.task}"</span>
                            </p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Échéances à venir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline) => (
                      <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            deadline.priority === 'high' ? 'bg-red-500' :
                            deadline.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <span className="font-medium">{deadline.task}</span>
                        </div>
                        <span className="text-sm text-gray-600">{deadline.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Membres de l'équipe ({teamMembers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {member.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                          <p className="text-xs text-gray-500">{member.tasksCount} tâches</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Répartition des tâches</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">À faire</span>
                        <span className="font-medium">{projectStats.todoTasks}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">En cours</span>
                        <span className="font-medium">{projectStats.inProgressTasks}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Terminées</span>
                        <span className="font-medium">{projectStats.completedTasks}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance de l'équipe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">85%</div>
                        <p className="text-sm text-gray-600">Taux de réussite</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">2.5</div>
                        <p className="text-sm text-gray-600">Jours moyen/tâche</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
