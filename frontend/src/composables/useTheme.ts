import { watchEffect } from 'vue';
import { useStorage } from '@vueuse/core';

type ThemeProps = "light" | "dark";

const useTheme = () => {
  const theme = useStorage<ThemeProps>("theme", "light");

  watchEffect(() => {
    if (
      theme.value === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
  return theme;
}
export default useTheme;