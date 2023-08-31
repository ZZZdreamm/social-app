// import axios from "axios";
import { createFormData } from "../../_utils/1Functions/HandleFormData";
import { serverURL } from "../../globals/apiPaths";

export const postDataToServer = (data: any, functionName: string) => {
  const request = new Request(`${serverURL}/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    mode: "cors",
    body: JSON.stringify(data),
  });
  return fetch(request)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const deleteDataOnServer = (functionName: string, urlParams: any) => {
  const query = Object.entries(urlParams)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
  console.log(`${serverURL}/${functionName}/?${query}`);
  const request = new Request(`${serverURL}/${functionName}/?${query}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    mode: "cors",
  });
  return fetch(request)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const postFormDataToServer = (data: any, functionName: string) => {
  const formData = createFormData(data);
  const request = new Request(`${serverURL}/${functionName}`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    mode: "cors",
    body: formData,
  });
  return fetch(request)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const putDataToServer = (data: any, functionName: string) => {
  const request = new Request(`${serverURL}/${functionName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    mode: "cors",
    body: JSON.stringify(data),
  });
  return fetch(request)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// export default function axiosPost(data: any, functionName: string) {
//   return axios
//     .post(`${serverURL}/${functionName}`, data, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "PUT",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//     })
//     .then((responseData) => {
//       return responseData;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }
