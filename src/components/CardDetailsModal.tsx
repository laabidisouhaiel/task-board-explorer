
import { useState } from "react";
import { X, Calendar, User, Tag, Paperclip, MessageCircle, CheckSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CardType } from "./Board";

interface CardDetailsModalProps {
  card: CardType;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (card: CardType) => void;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
}

const CardDetailsModal = ({ card, isOpen, onClose, onUpdate }: CardDetailsModalProps) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [dueDate, setDueDate] = useState("");
  const [labels, setLabels] = useState<string[]>(["Important", "Bug"]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "1", text: "Analyser les exigences", completed: true },
    { id: "2", text: "Créer les maquettes", completed: false },
    { id: "3", text: "Développer la fonctionnalité", completed: false }
  ]);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Marie Dupont",
      content: "Cette tâche semble bien avancer. N'hésitez pas si vous avez des questions.",
      timestamp: "Il y a 2 heures",
      avatar: "MD"
    }
  ]);
  const [newComment, setNewComment] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");

  const handleSave = () => {
    const updatedCard = {
      ...card,
      title,
      description
    };
    onUpdate(updatedCard);
    onClose();
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklist([...checklist, {
        id: Date.now().toString(),
        text: newChecklistItem,
        completed: false
      }]);
      setNewChecklistItem("");
    }
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, {
        id: Date.now().toString(),
        author: "Vous",
        content: newComment,
        timestamp: "À l'instant",
        avatar: "VO"
      }]);
      setNewComment("");
    }
  };

  const labelColors = [
    "bg-red-100 text-red-800",
    "bg-blue-100 text-blue-800", 
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-purple-100 text-purple-800"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded ${card.color.split(' ')[0]}`}></div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-semibold border-none p-0 focus:ring-0"
            />
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-6 p-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Description
              </h3>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ajouter une description plus détaillée..."
                className="min-h-[100px]"
              />
            </div>

            {/* Checklist */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Liste de tâches
              </h3>
              <div className="space-y-2">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(item.id)}
                      className="rounded"
                    />
                    <span className={item.completed ? "line-through text-gray-500" : ""}>
                      {item.text}
                    </span>
                  </div>
                ))}
                <div className="flex gap-2 mt-3">
                  <Input
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    placeholder="Ajouter un élément..."
                    onKeyPress={(e) => e.key === 'Enter' && addChecklistItem()}
                  />
                  <Button size="sm" onClick={addChecklistItem}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Commentaires
              </h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-gray-500 text-xs">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-semibold">
                    VO
                  </div>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Écrire un commentaire..."
                      className="min-h-[60px]"
                    />
                    <Button size="sm" onClick={addComment}>
                      Commenter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-64 space-y-4">
            {/* Labels */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Étiquettes
              </h4>
              <div className="flex flex-wrap gap-1">
                {labels.map((label, index) => (
                  <Badge key={label} className={labelColors[index % labelColors.length]}>
                    {label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date d'échéance
              </h4>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            {/* Assigned Users */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <User className="h-4 w-4" />
                Assigné à
              </h4>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  JD
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  MS
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Pièces jointes
              </h4>
              <Button variant="outline" size="sm" className="w-full">
                Ajouter un fichier
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsModal;
