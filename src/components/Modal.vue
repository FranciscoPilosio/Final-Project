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
};

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<template>
  <div v-if="modalActive" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header"></div>
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
            @click="toggleModal"
          >
            Update
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

.modal-content {
  position: absolute;
}

.modal-dialog {
  margin-bottom: 0;
  margin-top: 0;
}
</style>
