import {createApiClient} from "@/_api/client";
const baseUrl = process.env.BASE_URL;

const plainClient = createApiClient(baseUrl);
const authedClient = createApiClient(baseUrl, {
  axiosConfig: {
    headers: {
      Authorization: `Bearer `
    }
  }
})