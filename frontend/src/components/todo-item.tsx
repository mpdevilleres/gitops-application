import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { Todo } from "@/types/todo";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { EditTodoDialog } from "./edit-todo-dialog";
import { Badge } from "@/components/ui/badge";

interface TodoItemProps {
  todo: Todo;
  onTodoUpdated: () => void;
  onTodoDeleted: () => void;
}

export function TodoItem({ todo, onTodoUpdated, onTodoDeleted }: TodoItemProps) {
  const handleToggleComplete = async () => {
    try {
      await api.updateTodo(todo.id, {
        completed: !todo.completed,
      });
      onTodoUpdated();
      toast.success(todo.completed ? "Todo marked as incomplete" : "Todo marked as complete");
    } catch (error) {
      toast.error("Failed to update todo status");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteTodo(todo.id);
      onTodoDeleted();
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete todo");
      console.error(error);
    }
  };

  const formattedDate = new Date(todo.updated_at).toLocaleString();

  return (
    <Card className={todo.completed ? "opacity-70" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={todo.completed}
            onCheckedChange={handleToggleComplete}
            id={`todo-${todo.id}`}
          />
          <CardTitle className={`text-lg ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
            {todo.title}
          </CardTitle>
        </div>
        <Badge variant={todo.completed ? "outline" : "default"}>
          {todo.completed ? "Completed" : "Active"}
        </Badge>
      </CardHeader>
      {todo.description && (
        <>
          <Separator />
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              {todo.description}
            </p>
          </CardContent>
        </>
      )}
      <CardFooter className="flex justify-between pt-2">
        <p className="text-xs text-muted-foreground">
          Updated: {formattedDate}
        </p>
        <div className="flex space-x-1">
          <EditTodoDialog todo={todo} onTodoUpdated={onTodoUpdated} />
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
