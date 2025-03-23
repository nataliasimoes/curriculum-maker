<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: toTypedSchema(generalDataSchema),
});

const curriculumStore = useCurriculumStore();

const { userLanguages, backgrounds, qualifications, skills, experiences } =
  storeToRefs(curriculumStore);

const { value: name } = useField<string>("name");
const { value: age } = useField<number>("age");
const { value: email } = useField<string>("email");
const { value: phone } = useField<string>("phone");
const { value: address } = useField<string>("address");
const { value: summary } = useField<string>("summary");
const { value: image } = useField<File>("image");

watch(age, (newValue) => {
  age.value = newValue ? Number(newValue) : null;
});

age.value = 16;

const resumeData = ref({
  name: name.value,
  image: image.value,
  age: age.value,
  email: email.value,
  phone: phone.value,
  address: address.value,
  summary: summary.value,
  backgrounds: backgrounds.value,
  languages: userLanguages.value,
  qualifications: qualifications.value,
  skills: skills.value,
  experiences: experiences.value,
});

watchEffect(() => {
  resumeData.value = {
    name: name.value,
    image: image.value,
    age: age.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    summary: summary.value,
    backgrounds: backgrounds.value,
    languages: userLanguages.value,
    qualifications: qualifications.value,
    skills: skills.value,
    experiences: experiences.value,
  };
});

const resumeStore = useResumeStore();

const onSubmit = handleSubmit(async (values) => {
  resumeStore.generateResumePDF(resumeData.value);
});

const isComplete = computed(() => {
  return (
    backgrounds.value.length > 0 &&
    qualifications.value.length > 0 &&
    skills.value.length > 0 &&
    experiences.value.length > 0
  );
});

const handleFileUpload = async () => {
  const file = image.value;

  if (file && ["image/png", "image/jpeg"].includes(file.type)) {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    resumeData.value.image = uint8Array;
  } else {
    resumeData.value.image = null;
  }
};
</script>

<template>
  <div>
    <v-form @submit.prevent="onSubmit">
      <v-row>
        <v-col cols="12">
          <h4>Dados Gerais</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" md="7">
          <v-text-field
            label="Nome"
            variant="solo"
            density="comfortable"
            color="green"
            v-model="name"
            :error-messages="errors.name"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="5">
          <v-file-input
            accept="image/png, image/jpeg"
            label="Avatar (Opcional)"
            placeholder="Pick an avatar"
            variant="solo"
            density="comfortable"
            v-model="image"
            @change="handleFileUpload"
            prepend-icon=""
          >
            <template v-slot:prepend-inner>
              <v-icon color="green">mdi-camera</v-icon>
            </template>
          </v-file-input>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="Idade"
            variant="solo"
            density="comfortable"
            type="number"
            color="green"
            v-model="age"
            :error-messages="errors.age"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field
            label="Email"
            variant="solo"
            density="comfortable"
            type="email"
            color="green"
            v-model="email"
            :error-messages="errors.email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Telefone"
            variant="solo"
            density="comfortable"
            color="green"
            v-model="phone"
            :error-messages="errors.phone"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Endereço"
            variant="solo"
            density="comfortable"
            color="green"
            v-model="address"
            :error-messages="errors.address"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="Sobre você"
            variant="solo"
            density="comfortable"
            hint="Descreva brevemente quem você é, suas principais habilidades e experiências profissionais."
            persistent-hint
            color="green"
            counter="350"
            v-model="summary"
            :error-messages="errors.summary"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h4>Idiomas (Opcional)</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" v-if="userLanguages.length > 0">
          <v-list density="compact">
            <v-list-item
              v-for="(item, i) in userLanguages"
              :key="i"
              :value="item"
              color="green"
            >
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle v-text="item.level"></v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12">
          <LanguagesDialog></LanguagesDialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h4>Formação Acadêmica</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" v-if="backgrounds.length > 0">
          <v-list density="compact">
            <v-list-item
              v-for="(item, i) in backgrounds"
              :key="i"
              :value="item"
              color="green"
            >
              <v-list-item-title v-text="item.institution"></v-list-item-title>
              <v-list-item-subtitle
                >{{ item.description }} ({{ item.startYear }} -
                {{ item.endYear }})</v-list-item-subtitle
              >
              <template v-slot:append>
                <v-btn
                  color="error"
                  icon="mdi-minus"
                  variant="text"
                  @click="curriculumStore.removeAcademicBackground(i)"
                ></v-btn
              ></template>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12">
          <AcademicBackground></AcademicBackground>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h4>Capacitação Complementar</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" v-if="qualifications.length > 0">
          <v-list density="compact">
            <v-list-item
              v-for="(item, i) in qualifications"
              :key="i"
              :value="item"
              color="green"
            >
              <v-list-item-title v-text="item.institution"></v-list-item-title>
              <v-list-item-subtitle
                >{{ item.description }} ({{
                  item.workload
                }})</v-list-item-subtitle
              >
              <template v-slot:append>
                <v-btn
                  color="error"
                  icon="mdi-minus"
                  variant="text"
                  @click="curriculumStore.removeQualifications(i)"
                ></v-btn
              ></template>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12">
          <SupplementaryQualification></SupplementaryQualification>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h4>Experiências</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" v-if="experiences.length > 0">
          <v-list density="compact">
            <v-list-item
              v-for="(item, i) in experiences"
              :key="i"
              :value="item"
              color="green"
            >
              <v-list-item-title v-text="item.institution"></v-list-item-title>
              <v-list-item-subtitle
                >{{ item.function }} ({{ item.period }})</v-list-item-subtitle
              >
              <template v-slot:append>
                <v-btn
                  color="error"
                  icon="mdi-minus"
                  variant="text"
                  @click="curriculumStore.removeExperience(i)"
                ></v-btn
              ></template>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12">
          <Experiences></Experiences>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h4>Habilidades</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" v-if="skills.length > 0">
          <v-list density="compact">
            <v-list-item
              v-for="(item, i) in skills"
              :key="i"
              :value="item"
              color="green"
            >
              <v-list-item-title v-text="item.skill"></v-list-item-title>
              <template v-slot:append>
                <v-btn
                  color="error"
                  icon="mdi-minus"
                  variant="text"
                  @click="curriculumStore.removeSkill(i)"
                ></v-btn
              ></template>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12">
          <Skills></Skills>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="12">
          <v-btn color="green" block type="submit">Gerar currículo</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
