import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: "yabeharu-portfolio",
  apiKey: import.meta.env.VITE_MICRO_CMS_API_KEY,
});

export const microCMSAllData = async () => {
  client
  .get({
    endpoint: "group",
  })
  .then((res) => res)
  .catch((err) => console.log(err));
};