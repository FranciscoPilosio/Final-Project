<script>
import { ref } from "vue";

export default {
  setup() {
    const newTask = ref("");
    const tasks = ref([]);

    const addNewTask = () => {
      if (newTask.value.length >= 1) {
        tasks.value.push({
          done: false,
          content: newTask.value,
        });
        newTask.value = "";
      }
    };

    const deleteTask = (index) => {
      tasks.value.splice(index, 1);
    };

    const deleteAllTask = () => {
      tasks.value = [];
    };

    return {
      addNewTask,
      deleteTask,
      deleteAllTask,
      newTask,
      tasks,
    };
  },
};
</script>

<template>
  <h1 class="pt-4">To do list</h1>
  <form @submit.prevent="addNewTask">
    <div class="form-floating">
      <input
        rows="1"
        class="form-control"
        placeholder="Leave a comment here"
        id="floatingTextarea"
        name="newTask"
        v-model="newTask"
      />
      <label for="floatingTextarea">Add New Task</label>
    </div>

    <button class="btn btn-primary mt-3 mb-3">Add task</button>
  </form>
  <ul>
    <li v-for="(task, index) in tasks" :key="index">
      <div class="d-flex bd-highlight">
        <p class="p-2 flex-grow-1 bd-highlight">
          {{ task.content }}
        </p>
        <div class="p-2 bd-highlight">
          <font-awesome-icon icon="trash" @click="deleteTask(index)" />
        </div>
        <div class="p-2 bd-highlight pe-5">
          <font-awesome-icon icon="pen" />
        </div>
      </div>
    </li>
  </ul>
  <div>
    <h2 v-if="!tasks.length">No tasks pending! Well done</h2>
  </div>
  <button
    v-if="tasks.length >= 2"
    @click="deleteAllTask"
    type="button"
    class="btn btn-primary"
  >
    Remove all tasks
  </button>
</template>

<style>
h2 {
  color: black;
}
ul {
  list-style-type: none;
  text-align-last: left;
}
</style>
