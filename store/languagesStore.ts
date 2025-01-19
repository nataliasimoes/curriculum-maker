import languagesData from "../data-language/languages.json";
export const useLanguageStore = defineStore("language", () => {
  interface Language {
    code: string;
    flag: string;
    name: string;
  }

  const languages = ref<Language[]>([]);

  const userLanguages = ref<any[]>([]);

  function setLanguages() {
    languages.value = languagesData.languagesData;
  }

  return {
    languages,
    userLanguages,
    setLanguages,
  };
});
