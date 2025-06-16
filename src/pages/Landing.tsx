
import { ArrowRight, CheckCircle, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: <CheckCircle className="h-6 w-6 text-blue-600" />,
      title: "Visual Organization",
      description: "Organize your tasks with intuitive Kanban boards"
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team members"
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-600" />,
      title: "Boost Productivity",
      description: "Get more done with streamlined workflows"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TaskFlow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Se connecter</Button>
              </Link>
              <Link to="/register">
                <Button>S'inscrire</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Organisez votre travail
          <span className="text-blue-600 block">visuellement</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          TaskFlow vous aide à organiser vos projets et collaborer avec votre équipe 
          grâce à des tableaux Kanban intuitifs et puissants.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" className="flex items-center gap-2">
              Commencer gratuitement
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Voir la démo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Pourquoi choisir TaskFlow ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à transformer votre productivité ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d'équipes qui utilisent TaskFlow
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Créer un compte gratuit
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TaskFlow. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
