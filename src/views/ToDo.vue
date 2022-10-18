<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const router = useRouter;
    const newTask = ref("");
    const tasks = ref([]);
    const userStore = useUserStore();

    const signOut = async function signOut() {
      const { error } = await supabase.auth.signOut();
      userStore.singOut();
      console.log("hola", userStore);
    };

    const addNewTask = () => {
      tasks.value.push({
        done: false,
        content: newTask.value,
      });
      newTask.value = "";
    };

    const deleteTask = (index) => {
      tasks.value.splice(index, 1);
    };

    const deleteAllTask = () => {
      tasks.value = [];
    };

    return {
      signOut,
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
    <label> New task </label>
    <input name="newTask" v-model="newTask" />
    <button>Add task</button>
  </form>
  <ul>
    <div>
      <li v-for="(task, index) in tasks" :key="index">
        <p>
          {{ task.content }}
        </p>
        <button @click="deleteTask(index)">Remove</button>
      </li>
    </div>
  </ul>
  <button @click="deleteAllTask">Remove all task</button>
  <div>
    <button @click="[supabase.auth.signOut()]">Sign Out</button>
  </div>
</template>

<style></style>
