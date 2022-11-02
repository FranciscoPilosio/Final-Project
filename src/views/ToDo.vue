<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";
import Modal from "../components/Modal.vue";

const title = ref("");

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const taskStore = useTaskStore();
const { tasks, modalActive, selectedTask } = storeToRefs(taskStore);

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

const toggleModal = (task) => {
  modalActive.value = !modalActive.value;
  taskStore.selectedTask = task;
};

const updateStatus = async (task) => {
  task.is_complete = !task.is_complete;
  await taskStore.updateStatus(task.is_complete, task.id);
};

const sortTask = computed(() =>
  tasks.value.sort((a, b) => Number(a.is_complete) - Number(b.is_complete))
);
</script>

<template>
  <body class="first blur">
    <h1 id="formTitle" class="pt-4">Your To do list</h1>
    <form @submit.prevent="addNewTask" class="container" id="formStyle">
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
              <p
                @click.prevent="updateStatus(task)"
                :class="{ done: task.is_complete }"
                id="taskLines"
              >
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
  </body>
</template>

<style>
h2 {
  color: black;
}
ul {
  list-style-type: none;
  text-align-last: left;
  font-family: "Monaco", monospace;
}

.icon {
  cursor: pointer;
}

.done {
  text-decoration: line-through;
}

#formStyle,
#formTitle {
  font-family: "Monaco", monospace;
}
#taskLines {
  cursor: pointer;
  font-size: larger;
}

@media (max-width: 390px) {
  #taskLines {
    font-size: inherit;
  }
}
</style>
