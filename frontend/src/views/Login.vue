<template>
  <div class="flex items-center justify-center h-[calc(100vh-70px)]">
    <div
      class="max-w-[600px] w-full mx-auto dark:border-0 dark:bg-zinc-100/5 p-5 rounded-md shadow-md border border-zinc-200"
    >
      <h1 class="text-3xl text-center mb-7">Welcome back!</h1>
      <form>
        <div class="mb-7">
          <label
            for="login-email-input"
            class="cursor-pointer font-medium mb-2 inline-block"
          >
            Your email:
          </label>
          <BaseInput
            v-model="formData.email"
            placeholder="example@mail.com"
            type="email"
            id="login-email-input"
          />
        </div>
        <div class="mb-10">
          <label
            for="login-password-input"
            class="cursor-pointer font-medium mb-2 inline-block"
          >
            Your password:
          </label>
          <BaseInput
            v-model="formData.password"
            placeholder="qwejkqwjek"
            type="password"
            id="login-password-input"
          />
        </div>
        <div class="text-center">
          <button
            class="px-5 py-2.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from "@/components/base/BaseInput.vue";
import { reactive } from "vue";

const formData = reactive({
  email: "",
  password: "",
});
</script>
