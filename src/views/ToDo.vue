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
  <h1>To do list</h1>
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

    <button>Add task</button>
  </form>
  <ul>
    <div>
      <li v-for="(task, index) in tasks" :key="index">
        <p>
          {{ task.content }}
        </p>
        <button
          @click="deleteTask(index)"
          type="button"
          class="btn btn-primary"
        >
          Remove
        </button>
      </li>
    </div>
  </ul>
  <div>
    <h2 v-if="!tasks.length">No tasks pending!</h2>
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
