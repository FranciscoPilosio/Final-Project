<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";
import Modal from "../components/Modal.vue";

const title = ref("");
const complete = ref(false);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const taskStore = useTaskStore();
const { tasks, modalActive } = storeToRefs(taskStore);

const addNewTask = async () => {
  await taskStore.createTask(title.value, user._object.user.id);
  title.value = "";

  await taskStore.fetchTasks();
};

const loadTasks = async () => {
  if (user) {
    await taskStore.fetchTasks();
  }
};

loadTasks();

const removeEachTask = async (task) => {
  await taskStore.removeTask(task.id);
  loadTasks();
};

// const removeAllTasks = async () => {
//   await taskStore.removeAllTasks();
//   loadTasks();
// };

const toggleModal = (task) => {
  modalActive.value = !modalActive.value;
  taskStore.selectedTask = task;
};

const toggleDone = (task) => {
  task.complete = !task.complete;
};

const sortTask = computed(() =>
  tasks.value.sort((a, b) => Number(a.complete) - Number(b.complete))
);

console.log(sortTask.value);
</script>

<template>
  <body class="first blur">
    <h1 class="pt-4">Your To do list</h1>
    <form @submit.prevent="addNewTask" class="container">
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
      <Modal v-if="modalActive" />
      <ul>
        <li v-for="(task, index) in sortTask" :key="index">
          <div class="d-flex bd-highlight">
            <div class="p-2 flex-grow-1 bd-highlight">
              <p @click="toggleDone(task)" :class="{ done: task.complete }">
                {{ task.title }}
              </p>
            </div>
            <div class="p-2 bd-highlight">
              <font-awesome-icon
                class="icon"
                icon="trash"
                @click="removeEachTask(task)"
              />
            </div>
            <div class="p-2 bd-highlight pe-5">
              <font-awesome-icon
                class="icon"
                icon="pen"
                @click="toggleModal(task)"
              />
            </div>
          </div>
        </li>
      </ul>
    </form>
    <div>
      <h2 v-if="tasks == 0">No tasks pending! Well done</h2>
    </div>
    <!-- <input type="checkbox" v-model="complete" /> -->
    <!-- <button
    v-if="tasks >= 2"
    type="button"
    class="btn btn-primary"
    @click="removeAllTasks"
  >
    Remove all tasks
  </button> -->
  </body>
</template>

<style>
h2 {
  color: black;
}
ul {
  list-style-type: none;
  text-align-last: left;
}

.icon {
  cursor: pointer;
}

.done {
  text-decoration: line-through;
}
</style>
