<script lang="ts">
  import { onMount } from "svelte";

  let theme = $state("light");
  $inspect(theme);

  onMount(() => {
    theme =
      localStorage.theme ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", theme == "dark");

    // https://tailwindcss.com/docs/dark-mode#with-system-theme-support
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    // document.documentElement.classList.toggle(
    //   "dark",
    //   localStorage.theme === "dark" ||
    //     (!("theme" in localStorage) &&
    //       window.matchMedia("(prefers-color-scheme: dark)").matches)
    // );
    // // Whenever the user explicitly chooses light mode
    // localStorage.theme = "light";
    // // Whenever the user explicitly chooses dark mode
    // localStorage.theme = "dark";
    // // Whenever the user explicitly chooses to respect the OS preference
    // localStorage.removeItem("theme");
  });
</script>

<!-- Pin to bottom right corner -->
<!-- https://tailwindcss.com/docs/top-right-bottom-left -->

    <select
      bind:value={theme}
      onchange={() => {
        if (theme == "auto") {
          localStorage.removeItem("theme");
          theme = (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") 
        } else {
          localStorage.theme = theme;
        }
        document.documentElement.classList.toggle("dark", theme == "dark");
      }}
    >
      <option value="dark" class="text-text-light bg-background-light">Dark</option>
      <option value="light" class="text-text-light bg-background-light">Light</option>
      <option value="auto" class="text-text-light bg-background-light">Auto</option>
    </select>