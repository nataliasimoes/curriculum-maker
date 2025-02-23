<script lang="ts" setup>
const academicStore = useCurriculumStore();

const dialogVisible = ref(false);

const emit = defineEmits(["add"]);

const item = ref<any>({
  institution: "",
  description: "",
  workload: "",
});

function addItem() {
  academicStore.addQualifications(item.value);
  item.value = {
    institution: "",
    description: "",
    workload: "",
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
        :text="'Adicionar capacitação'"
        block
        class="btn-green-text"
        @click="dialogVisible = true"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        prepend-icon="mdi-school"
        title="Capacitação complementar"
        min-width="600"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="item.institution"
                label="Instituição ou plataforma"
                hint="Ex: Alura, SENAI, Udemy, Youtube..."
                required
                variant="underlined"
                color="green"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="item.description"
                label="Descrição"
                required
                variant="underlined"
                hint="Ex: Curso de marketing digital, Curso de design..."
                color="green"
              ></v-text-field>
            </v-col>
            <v-col
              ><v-text-field
                v-model="item.workload"
                label="Carga horária"
                required
                variant="underlined"
                hint="Ex: 60 horas"
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
