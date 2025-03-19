import { TodoList } from "@/components/todo-list";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Todo App</h1>
        <p className="text-muted-foreground">Manage your tasks with ease</p>
      </header>
      <main>
        <TodoList />
      </main>
      <Toaster />
    </div>
  )
}

export default App