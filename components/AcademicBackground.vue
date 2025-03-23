<script lang="ts" setup>
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const schema = toTypedSchema(
  z.object({
    item: z.object({
      institution: z.string(),
      description: z.string(),
      startYear: z.string().min(4).max(4),
      endYear: z.string().min(4).max(4).optional(),
    }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: institution } = useField<string>("item.institution");
const { value: description } = useField<string>("item.description");
const { value: startYear } = useField<string>("item.startYear");
const { value: endYear } = useField<string | undefined>("item.endYear");

const academicStore = useCurriculumStore();

const dialogVisible = ref(false);

const emit = defineEmits(["add"]);

const addItem = handleSubmit((values) => {
  const newItem = {
    institution: values.item.institution,
    description: values.item.description,
    startYear: values.item.startYear,
    endYear: values.item.endYear,
  };
  academicStore.addAcademicBackground(newItem);
  institution.value = "";
  description.value = "";
  startYear.value = "";
  endYear.value = "";
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
        :text="'Adicionar formação'"
        block
        @click="dialogVisible = true"
        class="btn-green-text"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-form>
        <v-card
          prepend-icon="mdi-school"
          title="Formação Acadêmica"
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
                  hint="Ex: IFRN, Escola Estadual João XXIII..."
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
                  hint="Ex: Ensino superior, Ensino médio..."
                  color="green"
                  :error-messages="errors['item.description']"
                ></v-text-field>
              </v-col>
              <v-col
                ><v-text-field
                  v-model="startYear"
                  label="Ano de início"
                  required
                  variant="underlined"
                  color="green"
                  :error-messages="errors['item.startYear']"
                ></v-text-field>
              </v-col>
              <v-col
                ><v-text-field
                  v-model="endYear"
                  label="Ano de conclusão"
                  variant="underlined"
                  color="green"
                  :error-messages="errors['item.endYear']"
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
      </v-form>
    </template>
  </v-dialog>
</template>
