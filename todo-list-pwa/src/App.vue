<template>
  <div id="app">
    <div class="container">
      <!--input + confirmer-->
      <h2>{{ nomBoutique }}</h2>

      <input type="text" v-model="newTodo" placeholder="Ajouter une tâche" />
      <button v-on:click="addTodo">Confirmer</button>
      <!--tache restante-->
      <span class="todo-count" :v-show="todos.length > 0"
        ><strong>{{ remaining }}</strong
        >{{ taskToDo }}</span
      >
      <!--liste-->
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          <span
            @click="todoCompleted(index)"
            :class="{ fait: todo.completed }"
            >{{ todo.name }}</span
          ><span @click="deleteFromList(index)" class="cross">X</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      todos: [],
      newTodo: "",
      nomBoutique: "Todo List pwa",
      taskToDo: "tâche(s) à faire !",
    };
  },

   methods: {
          //ajouter une todo
          addTodo() {
            if (this.newTodo != "") {
              this
                .todos
                .push({name: this.newTodo, completed: false});
            }
            this.newTodo = "";
            this.saveTodos();
          },
          //todo complétée
          todoCompleted(index) {
            this
              .todos[index]
              .completed = !this
              .todos[index]
              .completed;
            this.saveTodos();
          },
          //supprimer une todo
          deleteFromList(index) {
            this
              .todos
              .splice(index, 1);
            this.saveTodos();
          },
          //sauvegarder une todo
          saveTodos() {
            let parsed = JSON.stringify(this.todos);
            localStorage.setItem("todos", parsed);
          }
        },
        computed: {
          //tache restante
          remaining() {
            return this
              .todos
              .filter((todo) => !todo.completed)
              .length;
          }
        },
        //stockage de todo
        mounted() {
          if (localStorage.getItem("todos")) {
            try {
              this.todos = JSON.parse(localStorage.getItem("todos"));
            } catch (e) {
              localStorage.removeItem("todos");
            }
          }
        }


};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
}
body {
  background: var(--background-color);
}
.container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
:root {
  --background-color: #3c9b96;
  --text-color: #2d3c4b;
  --element-color: #ffffff;
  --buttonAndTask-color: #f5c36e;
  --padding: 1.5rem 2.5rem;
  --size: 2rem;
  --euphoria: "Euphoria Script", cursive;
  --sourcecodepro: "Source Code Pro", monospace;
}

h2 {
  font-family: var(--euphoria);
  font-size: var(--size);
  color: var(--text-color);
  text-align: center;
}

input {
  background: var(--element-color);
  color: var(--text-color);
  font-family: var(--sourcecodepro);
  padding: var(--padding);
  border-radius: 10px;
  border: none;
  outline: none;
  text-align: center;
}
button {
  padding: var(--padding);
  background: var(--buttonAndTask-color);
  color: var(--element-color);
  font-family: var(--sourcecodepro);
  border: none;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
}
strong {
  color: var(--buttonAndTask-color);
  padding: 0 5px;
}
span {
  font-family: var(--sourcecodepro);
  text-align: center;
  color: var(--text-color);
}
ul {
  color: var(--text-color);
  background: var(--buttonAndTask-color);
  border-radius: 10px;
  margin: 0;
  padding: 1rem 0.5rem;
}
li {
  background: var(--element-color);
  border-radius: 10px;
  list-style-type: none;
  padding: 1rem;
  margin: 1rem 0;
}
.cross {
  float: right;
}
.fait {
  text-decoration: line-through;
  color: var(--buttonAndTask-color);
}
</style>
