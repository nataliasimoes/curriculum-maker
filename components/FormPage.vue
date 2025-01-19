<script setup lang="ts">
const languageStore = useLanguageStore();

const { userLanguages } = storeToRefs(languageStore);

const emit = defineEmits("next");

function setNameAndNext() {
  if (!nome.value) {
    alert("Acho que você esqueceu de digitar seu nome");
    return;
  }
  birthdayStore.setUserName(nome.value);
  emit("next");
}
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
          <v-textarea label="Sobre você" variant="underlined"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h4>Idiomas</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
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
    </v-form>
  </div>
</template>
