
import { useState } from "react";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  User,
  Menu,
  X,
  CheckSquare,
  BarChart3,
  Bell,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Tableaux",
      path: "/dashboard",
    },
    {
      icon: <CheckSquare className="h-5 w-5" />,
      label: "Toutes les tâches",
      path: "/tasks",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Analytiques",
      path: "/analytics",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Calendrier",
      path: "/calendar",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Paramètres",
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center shadow-lg">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="text-xl font-bold text-gray-900">TaskFlow</span>
                <div className="text-xs text-gray-500">Gestion de projets</div>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex hover:bg-gray-100"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Jean Dupont</p>
              <p className="text-xs text-gray-500">jean@exemple.com</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-green-600 font-medium">En ligne</span>
              </div>
            </div>
          )}
          {!isCollapsed && (
            <Button variant="ghost" size="sm" className="p-1">
              <Bell className="h-4 w-4 text-gray-500" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-700 font-medium shadow-sm border border-blue-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className={`p-1 rounded-lg ${
                isActive(item.path) ? "bg-blue-100" : "group-hover:bg-gray-100"
              }`}>
                {item.icon}
              </div>
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
              {!isCollapsed && isActive(item.path) && (
                <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto"></div>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Stats Section */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Activité du jour</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Tâches terminées</span>
                <span className="font-medium text-green-600">8/12</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Temps passé</span>
                <span className="font-medium text-blue-600">6h 30m</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
        >
          <LogOut className="h-5 w-5 mr-3" />
          {!isCollapsed && "Déconnexion"}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-lg hover:shadow-xl"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isCollapsed ? "w-20" : "w-80"} 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          bg-white border-r border-gray-100 transition-all duration-300 ease-in-out
          fixed md:static inset-y-0 left-0 z-50 shadow-xl md:shadow-none
        `}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
