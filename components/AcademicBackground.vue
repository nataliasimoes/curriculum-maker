<script lang="ts" setup>
const academicStore = useCurriculumStore();

const dialogVisible = ref(false);

const emit = defineEmits(["add"]);

const item = ref<any>({
  institution: "",
  description: "",
  startYear: "",
  endYear: "",
});

function addItem() {
  academicStore.addAcademicBackground(item.value);
  item.value = {
    institution: "",
    description: "",
    startYear: "",
    endYear: "",
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
        :text="'Adicionar formação'"
        block
        @click="dialogVisible = true"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        prepend-icon="mdi-school"
        title="Formação Acadêmica"
        min-width="600"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="item.institution"
                label="Instituição"
                required
                variant="underlined"
                hint="Ex: IFRN, Escola Estadual João XXIII..."
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="item.description"
                label="Descrição"
                required
                variant="underlined"
                hint="Ex: Ensino superior, Ensino médio..."
              ></v-text-field>
            </v-col>
            <v-col
              ><v-text-field
                v-model="item.startYear"
                label="Ano de início"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col
              ><v-text-field
                v-model="item.endYear"
                label="Ano de conclusão"
                variant="underlined"
              ></v-text-field
            ></v-col>
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
