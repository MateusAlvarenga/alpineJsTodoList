const Todo = () => {

  let todo = {};

  todo.html = `<div x-data="toDoList()" class="max-w-2xl mx-auto px-12 py-8 rounded-lg shadow-lg bg-blue-100">
                    <div class="flex flex-col items-center justify-center mb-8">
                        <h1 class="text-3xl font-bold mb-8">
                            To Do List
                        </h1>
                        <div class="flex flex-row">
                        <input type="text" x-model="newTodo" placeholder="I need to..."
                            class="mx-auto px-4 py-2 rounded shadow text-lg min-w-full" @keydown.enter="addToDo">
                        <input type="button"  value="Add"
                            class="bg-blue-600 text-white px-4 py-2 rounded shadow text-lg" @click="addToDo">
 
                        </div>
                    </div>
                    <div class="bg-white w-full rounded shadow mb-8">
                        <template x-for="(todo, index) in todos" :key="index">
                            <div class="flex items-center py-4" :class="{ 'border-b border-gray-400': ! isLastToDo(index) }">
                                <div class="w-1/12 text-center">
                                    <input type="checkbox" @change="toggleToDoCompleted(index)" :checked="todo.completed">
                                </div>
                                <div class="w-10/12">
                                    <p x-text="todo.todo" :class="{ 'line-through': todo.completed }"></p>
                                </div>
                                <div class="w-1/12 text-center">
                                    <button class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                        @click="deleteToDo(index)">
                                        &cross;
                                    </button>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div>
                        <span x-text="numberOfToDosCompleted()"></span> / <span x-text="toDoCount()"></span> to dos completed
                    </div>
                  </div>`

  return todo;
}

function toDoList() {
  return {
    newTodo: "",
    todos: [],
    addToDo() {

      if (this.newTodo === "")
        return;

      this.todos.push({
        todo: this.newTodo,
        completed: false
      });

      this.newTodo = "";
    },
    toggleToDoCompleted(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },
    deleteToDo(index) {
      this.todos = this.todos.filter((todo, todoIndex) => {
        return index !== todoIndex
      })
    },
    numberOfToDosCompleted() {
      return this.todos.filter(todo => todo.completed).length;
    },
    toDoCount() {
      return this.todos.length
    },
    isLastToDo(index) {
      return this.todos.length - 1 === index
    }
  };
}