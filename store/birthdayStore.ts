export const useBirthdayStore = defineStore("birthday", () => {
  interface User {
    name: string;
    religion: string;
  }

  const user = ref<User>({
    name: "",
    religion: "",
  });

  function setUserName(name: string) {
    user.value.name = name;
  }

  const birthday = ref(new Date().getDate());
  const birthMonth = ref(
    new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date())
  );

  return {
    user,
    setUserName,
    birthday,
    birthMonth,
  };
});
