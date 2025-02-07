<script lang="ts" setup>
const academicStore = useCurriculumStore();

const dialogVisible = ref(false);

const item = ref<any>({
  skill: "",
});

function addItem() {
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
    width="auto"
    v-model="dialogVisible"
    persistent
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        :text="'Adicionar Habilidade'"
        block
        @click="dialogVisible = true"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi-medal" title="Habilidade(s)" min-width="600">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="item.skill"
                label="Habilidade"
                required
                hint="Ex: CNH, Boa comunicação, Desenvolvimento BackEnd com Node.js..."
                variant="underlined"
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
