<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const title = ref("");

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const taskStore = useTaskStore();
const { tasks, modalActive, selectedTask } = storeToRefs(taskStore);
const router = useRouter();

const updateTask = async () => {
  await taskStore.updateTask();
  console.log("hola");
  // loadTasks();
};

// const cancelModal = () => {
//   router.push({ path: "/ToDo" });
//   console.log("chau");
// };

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<template>
  <div v-if="modalActive" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button> -->
        </div>
        <div class="modal-body">
          <input type="text" v-model="selectedTask.title" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="toggleModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="updateTask()"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: contents;
}
</style>
