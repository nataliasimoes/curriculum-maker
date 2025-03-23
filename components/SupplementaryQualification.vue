<script lang="ts" setup>
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const schema = toTypedSchema(
  z.object({
    item: z.object({
      institution: z.string(),
      description: z.string(),
      workload: z.string(),
    }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: institution } = useField<string>("item.institution");
const { value: description } = useField<string>("item.description");
const { value: workload } = useField<string>("item.workload");

const academicStore = useCurriculumStore();
const dialogVisible = ref(false);

const emit = defineEmits(["add"]);

const addItem = handleSubmit((values) => {
  const newItem = {
    institution: values.item.institution,
    description: values.item.description,
    workload: values.item.workload,
  };
  academicStore.addQualifications(newItem);

  institution.value = values.item.institution;
  description.value = values.item.description;
  workload.value = values.item.workload;

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
                v-model="institution"
                label="Instituição ou plataforma"
                hint="Ex: Alura, SENAI, Udemy, Youtube..."
                required
                variant="underlined"
                color="green"
                :error-messages="errors['item.institution']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="description"
                label="Descrição"
                required
                variant="underlined"
                hint="Ex: Curso de marketing digital, Curso de design..."
                color="green"
                :error-messages="errors['item.description']"
              ></v-text-field>
            </v-col>
            <v-col
              ><v-text-field
                v-model="workload"
                label="Carga horária"
                required
                variant="underlined"
                hint="Ex: 60 horas"
                color="green"
                :error-messages="errors['item.workload']"
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
