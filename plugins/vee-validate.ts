import { defineNuxtPlugin } from "#app";
import { configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import pt_BR from "@vee-validate/i18n/dist/locale/pt_BR.json";

export default defineNuxtPlugin(() => {
  configure({
    generateMessage: localize({
      pt_BR,
    }),
  });

  setLocale("pt_BR");
});
