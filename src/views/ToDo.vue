<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";

const title = ref("");
const complete = ref(false);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);

const addNewTask = async () => {
  await taskStore.createTask(title.value, complete.value, user._object.user.id);
  title.value = "";
  complete.value = false;
  await taskStore.fetchTasks();
};

const loadTasks = async () => {
  if (user) {
    await taskStore.fetchTasks();
  }
};

loadTasks();

console.log(tasks);

console.log(tasks.target);

const removeEachTask = async (task) => {
  await taskStore.removeTask(task.id);
  loadTasks();
};

const removeAllTasks = async () => {
  await taskStore.removeAllTasks();
  loadTasks();
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
        name="title"
        v-model="title"
      />
      <label for="floatingTextarea">Add New Task</label>
    </div>
    <div class="d-grid gap-2">
      <button class="btn btn-primary mt-3 mb-3">Add task</button>
    </div>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <div class="d-flex bd-highlight">
          <!-- <input type="checkbox" v-model="complete" /> -->
          <p class="p-2 flex-grow-1 bd-highlight">
            {{ task.title }}
          </p>

          <div class="p-2 bd-highlight">
            <font-awesome-icon icon="trash" @click="removeEachTask(task)" />
          </div>
          <div class="p-2 bd-highlight pe-5">
            <font-awesome-icon icon="pen" />
          </div>
        </div>
      </li>
    </ul>
  </form>
  <div>
    <h2 v-if="tasks == 0">No tasks pending! Well done</h2>
  </div>
  <!-- <button
    v-if="tasks >= 2"
    type="button"
    class="btn btn-primary"
    @click="removeAllTasks"
  >
    Remove all tasks
  </button> -->
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
