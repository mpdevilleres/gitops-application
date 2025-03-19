import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TodoForm } from "@/components/todo-form";
import { api } from "@/lib/api";
import { TodoCreateInput } from "@/types/todo";
import { toast } from "sonner";

interface CreateTodoDialogProps {
  onTodoCreated: () => void;
}

export function CreateTodoDialog({ onTodoCreated }: CreateTodoDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: TodoCreateInput) => {
    try {
      await api.createTodo(data);
      setOpen(false);
      onTodoCreated();
      toast.success("Todo created successfully!");
    } catch (error) {
      toast.error("Failed to create todo");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Add New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
        </DialogHeader>
        <TodoForm 
          onSubmit={handleSubmit} 
          onCancel={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
