import { defineStore } from "pinia";
import { ref } from "vue";

const initState = { nickname: "", avatar: "" };

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref("");
    const refreshToken = ref("");
    const userInfo = ref({ nickname: "", avatar: "" });
    const isLogined = computed(() => Boolean(token.value));

    return {
      userInfo,
      token,
      refreshToken,
      isLogined,
    };
  },
  {
    persist: true,
  }
);
