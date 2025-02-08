<script lang="ts" setup>
const academicStore = useCurriculumStore();

const dialogVisible = ref(false);

const item = ref<any>({
  institution: "",
  function: "",
  period: "",
});

function addItem() {
  academicStore.addExperience(item.value);
  item.value = {
    institution: "",
    function: "",
    period: "",
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
        :text="'Adicionar Experiência'"
        block
        class="btn-green-text"
        @click="dialogVisible = true"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        prepend-icon="mdi-account-star"
        title="Experiência"
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
                hint="Ex: Prefeitura Municipal de Acari, Loja do Real, QFome..."
                color="green"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="item.function"
                label="Cargo/Função"
                required
                variant="underlined"
                hint="Ex: Estágiaria de TI, Pintor, Entregador, Professora..."
                color="green"
              ></v-text-field>
            </v-col>
            <v-col
              ><v-text-field
                v-model="item.period"
                label="Período na função"
                required
                variant="underlined"
                hint="5 meses, 2 anos, 3 semanas..."
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
