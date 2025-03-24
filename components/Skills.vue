<script lang="ts" setup>
const academicStore = useCurriculumStore();
const { skills, trySubmit } = storeToRefs(academicStore);

const dialogVisible = ref(false);

const item = ref<any>({
  skill: "",
});

function addItem() {
  if (!item.value.skill) {
    return;
  }
  academicStore.addSkill(item.value);
  item.value = {
    skill: "",
  };
  dialogVisible.value = false;
}
</script>

<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="dialogVisible"
    persistent
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        :text="'Adicionar Habilidade'"
        block
        class="btn-green-text"
        @click="dialogVisible = true"
      ></v-btn>
      <span
        class="text-center text-caption text-red-darken-4"
        v-if="!skills.length && trySubmit"
        >Necessário adicionar ao menos uma qualidade/diferencial, eu sei que
        você tem!</span
      >
    </template>

    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi-medal" title="Habilidade(s)" max-width="600">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="item.skill"
                label="Habilidade"
                required
                hint="Ex: CNH, Boa comunicação, Desenvolvimento BackEnd com Node.js..."
                variant="underlined"
                color="green"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <template v-slot:actions>
          <v-btn
            class="ml-auto"
            color="gray"
            text="Fechar"
            @click="dialogVisible = false"
          ></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="ml-auto"
            color="green"
            text="Adicionar Item"
            @click="addItem()"
          ></v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
