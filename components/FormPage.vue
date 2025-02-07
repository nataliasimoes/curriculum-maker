<script setup lang="ts">
const curriculumStore = useCurriculumStore();

const { userLanguages, backgrounds, qualifications, skills } =
  storeToRefs(curriculumStore);

// const emit = defineEmits("next");

// function setNameAndNext() {
//   if (!nome.value) {
//     alert("Acho que você esqueceu de digitar seu nome");
//     return;
//   }
//   birthdayStore.setUserName(nome.value);
//   emit("next");
// }
</script>

<template>
  <div>
    <v-form>
      <v-row>
        <v-col cols="12">
          <h4>Dados Gerais</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Nome" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="Idade"
            variant="underlined"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field
            label="Email"
            variant="underlined"
            type="email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Telefone" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Endereço" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="Sobre você"
            variant="underlined"
            hint="Descreva brevemente quem você é, suas principais habilidades e experiências profissionais."
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h4>Idiomas</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" v-if="userLanguages.length > 0">
          <v-list density="compact">
            <v-list-item
              v-for="(item, i) in userLanguages"
              :key="i"
              :value="item"
              color="primary"
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
              color="primary"
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
              color="primary"
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
              color="primary"
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
    </v-form>
  </div>
</template>
