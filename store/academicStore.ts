export const useAcademicStore = defineStore("academic", () => {
  interface AcademicBackground {
    institution: string;
    description: string;
    startYear: string;
    endYear?: string;
  }

  const backgrounds = ref<AcademicBackground[]>([]);

  function addAcademicBackground(background: AcademicBackground) {
    backgrounds.value.push(background);
  }

  function removeAcademicBackground(index: number) {
    backgrounds.value.splice(index, 1);
  }

  return {
    backgrounds,
    addAcademicBackground,
    removeAcademicBackground,
  };
});
