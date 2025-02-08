interface AcademicBackground {
  institution: string;
  description: string;
  startYear: string;
  endYear?: string;
}

interface Language {
  code: string;
  flag: string;
  name: string;
}

interface UserLanguage {
  name: string;
  level: string;
}

interface Qualification {
  institution: string;
  description: string;
  startYear: string;
  endYear?: string;
}

interface Skill {
  skill: string;
}

interface Experience {
  institution: string;
  function: string;
  period: string;
}
