import languagesData from "../data-language/languages.json";
export const useCurriculumStore = defineStore("curriculum", () => {
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

  /* language */

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

  /* qualification */

  interface Qualification {
    institution: string;
    description: string;
    startYear: string;
    endYear?: string;
  }

  const qualifications = ref<Qualification[]>([]);

  function addQualifications(qualification: Qualification) {
    qualifications.value.push(qualification);
  }

  function removeQualifications(index: number) {
    qualifications.value.splice(index, 1);
  }

  return {
    backgrounds,
    addAcademicBackground,
    removeAcademicBackground,
    languages,
    userLanguages,
    setLanguages,
    qualifications,
    addQualifications,
    removeQualifications,
  };
});
