import { useState, useEffect } from "react";
import { TodoItem } from "./todo-item";
import { CreateTodoDialog } from "./create-todo-dialog";
import { api } from "@/lib/api";
import { Todo } from "@/types/todo";
import { toast } from "sonner";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await api.getTodos();
      setTodos(data);
    } catch (error) {
      toast.error("Failed to fetch todos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Todo List</h2>
        <CreateTodoDialog onTodoCreated={fetchTodos} />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin h-10 w-10 border-4 border-primary rounded-full border-t-transparent"></div>
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>No todos found. Create a new one to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onTodoUpdated={fetchTodos}
              onTodoDeleted={fetchTodos}
            />
          ))}
        </div>
      )}
    </div>
  );
}
