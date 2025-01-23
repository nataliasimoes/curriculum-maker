<script lang="ts" setup>
const languageStore = useCurriculumStore();

const { languages, userLanguages } = storeToRefs(languageStore);

const languagesAdded = ref<{ name: string; level: string }[]>([]);

const dialogVisible = ref(false);

const emit = defineEmits(["add"]);

function addLanguage(name: string, level: string) {
  const index = languagesAdded.value.findIndex((lang) => lang.name === name);
  if (index === -1) {
    languagesAdded.value.push({ name, level });
  }
}

function removeLanguage(name: string) {
  languagesAdded.value = languagesAdded.value.filter(
    (lang) => lang.name !== name
  );
}

function isLanguageAdded(name: string) {
  return languagesAdded.value.some((lang) => lang.name === name);
}

function getLanguageLevel(name: string) {
  const language = languagesAdded.value.find((lang) => lang.name === name);
  return language ? language.level : null;
}

function finished() {
  userLanguages.value = languagesAdded.value;
  dialogVisible.value = false;
}
</script>

<template>
  <v-dialog
    transition="dialog-bottom-transition"
    width="auto"
    v-model="dialogVisible"
    persistent
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        :text="
          userLanguages.length > 0 ? 'Editar idiomas' : 'Adicionar idiomas'
        "
        block
        @click="dialogVisible = true"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi-translate" title="Idiomas" min-width="350">
        <v-card-text>
          <v-list>
            <v-list-item
              rounded="xl"
              variant="plain"
              v-for="item in languages"
              :key="item.code"
              :class="{ 'bg-primary-lighten-5': isLanguageAdded(item.name) }"
            >
              <template v-slot:prepend>
                <v-avatar size="small" :image="item.flag"> </v-avatar>
              </template>
              <v-list-item-title>
                {{ item.name }}
                <span v-if="isLanguageAdded(item.name)">
                  ({{ getLanguageLevel(item.name) }})
                </span>
              </v-list-item-title>
              <template v-slot:append>
                <v-btn
                  v-if="isLanguageAdded(item.name)"
                  color="error"
                  icon="mdi-minus"
                  variant="text"
                  @click="removeLanguage(item.name)"
                ></v-btn>
                <v-menu v-else>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      color="primary"
                      icon="mdi-plus"
                      variant="text"
                    >
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(level, index) in [
                        'Iniciante',
                        'Intermediário',
                        'Avançado',
                      ]"
                      :key="index"
                      @click="addLanguage(item.name, level)"
                    >
                      <v-list-item-title>{{ level }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
        <template v-slot:actions>
          <v-btn
            class="ml-auto"
            color="green"
            text="Adicionar"
            @click="finished()"
          ></v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
