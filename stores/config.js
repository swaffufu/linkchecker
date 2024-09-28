export const useConfigStore = defineStore("ConfigStore", {
  state: () => {
    return {
      strapiURL: "http://latihan.cloud-connect.asia:1337",
      identifier: "developer",
      password: "Pentadbir123",
      jwttoken: null,
    };
  },
  getters: {},
  actions: {},
});
