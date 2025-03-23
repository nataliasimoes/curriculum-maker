<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(experiencesSchema),
});

const { value: institution } = useField<string>("item.institution");
const { value: itemFunction } = useField<string>("item.function");
const { value: period } = useField<string>("item.period");

const academicStore = useCurriculumStore();

const dialogVisible = ref(false);

const addItem = handleSubmit((values) => {
  const newItem = {
    institution: values.item.institution,
    function: values.item.function,
    period: values.item.period,
  };
  academicStore.addExperience(newItem);
  institution.value = "";
  itemFunction.value = "";
  period.value = "";
  dialogVisible.value = false;
});
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
      <v-form>
        <v-card
          prepend-icon="mdi-account-star"
          title="Experiência"
          min-width="600"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="institution"
                  label="Instituição"
                  required
                  variant="underlined"
                  hint="Ex: Prefeitura Municipal de Acari, Loja do Real, QFome..."
                  color="green"
                  :error-messages="errors['item.institution']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="itemFunction"
                  label="Cargo/Função"
                  required
                  variant="underlined"
                  hint="Ex: Estágiaria de TI, Pintor, Entregador, Professora..."
                  color="green"
                  :error-messages="errors['item.function']"
                ></v-text-field>
              </v-col>
              <v-col
                ><v-text-field
                  v-model="period"
                  label="Período na função"
                  required
                  variant="underlined"
                  hint="5 meses, 2 anos, 3 semanas..."
                  color="green"
                  :error-messages="errors['item.period']"
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
      </v-form>
    </template>
  </v-dialog>
</template>
