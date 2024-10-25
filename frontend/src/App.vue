<script setup>
import { ref } from "vue";
import CommentSection from "./components/CommentSection.vue";

const userId = ref("");
const users = ref(null);
const newEmail = ref("");

const getUser = async () => {
  if (!userId.value) {
    alert("Please enter a User ID.");
    return;
  }
  const response = await fetch(`http://localhost:3000/api/user/${encodeURIComponent(userId.value)}`);
  if (!response.ok) {
    alert("Failed to fetch user information. Please check the User ID.");
    return;
  }
  users.value = await response.json();
};

const changeEmail = async () => {
  if (!userId.value || !newEmail.value) {
    alert("Please enter both User ID and new email.");
    return;
  }

  const response = await fetch(`http://localhost:3000/api/user/${encodeURIComponent(userId.value)}/change-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: newEmail.value }),
  });

  if (!response.ok) {
    alert("Failed to change email. Please try again.");
  } else {
    alert("Email changed successfully!");
    newEmail.value = ""; // Clear the input field after successful submission
    getUser(); // Optionally fetch updated user info
  }
};
</script>

<template>
  <div id="app">
    <h1>User Dashboard</h1>
    <div>
      <input v-model="userId" placeholder="Enter User ID" />
      <button @click="getUser">Get User Info</button>
    </div>
    <div v-if="users">
      <template v-for="user in users" :key="user.id">
        <h2>{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
        <hr />
      </template>
    </div>
    <CommentSection />
    <form @submit.prevent="changeEmail">
      <h3>Change Email</h3>
      <input v-model="newEmail" placeholder="New Email" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
