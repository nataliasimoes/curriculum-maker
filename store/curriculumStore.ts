import languagesData from "../data-language/languages.json";
export const useCurriculumStore = defineStore("curriculum", () => {
  const backgrounds = ref<AcademicBackground[]>([]);

  function addAcademicBackground(background: AcademicBackground) {
    backgrounds.value.push(background);
  }

  function removeAcademicBackground(index: number) {
    backgrounds.value.splice(index, 1);
  }

  /* language */

  const languages = ref<Language[]>([]);

  const userLanguages = ref<UserLanguage[]>([]);

  function setLanguages() {
    languages.value = languagesData.languagesData;
  }

  /* qualification */

  const qualifications = ref<Qualification[]>([]);

  function addQualifications(qualification: Qualification) {
    qualifications.value.push(qualification);
  }

  function removeQualifications(index: number) {
    qualifications.value.splice(index, 1);
  }

  /* skills */

  const skills = ref<Skill[]>([]);

  function addSkill(skill: Skill) {
    skills.value.push(skill);
  }

  function removeSkill(index: number) {
    skills.value.splice(index, 1);
  }

  /* experiences */

  const experiences = ref<Experience[]>([]);

  function addExperience(experience: Experience) {
    experiences.value.push(experience);
  }

  function removeExperience(index: number) {
    experiences.value.splice(index, 1);
  }

  const trySubmit = ref(false);

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
    skills,
    addSkill,
    removeSkill,
    experiences,
    addExperience,
    removeExperience,
    trySubmit,
  };
});
