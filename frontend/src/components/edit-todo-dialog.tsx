import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TodoForm } from "@/components/todo-form";
import { api } from "@/lib/api";
import { Todo, TodoUpdateInput } from "@/types/todo";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

interface EditTodoDialogProps {
  todo: Todo;
  onTodoUpdated: () => void;
}

export function EditTodoDialog({ todo, onTodoUpdated }: EditTodoDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: TodoUpdateInput) => {
    try {
      await api.updateTodo(todo.id, data);
      setOpen(false);
      onTodoUpdated();
      toast.success("Todo updated successfully!");
    } catch (error) {
      toast.error("Failed to update todo");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <TodoForm 
          initialData={todo}
          onSubmit={handleSubmit} 
          onCancel={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
