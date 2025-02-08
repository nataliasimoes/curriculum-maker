export const rules = {
  required: (value: any) => !!value || "Esse campo é obrigatório.",
  counter: (value: string) => value.length <= 20 || "Max 20 characters",
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Email inválido.";
  },
  password: (value: string) => {
    return value.length >= 6 || "Senha deve ter no mínimo 6 caracteres.";
  },
};
