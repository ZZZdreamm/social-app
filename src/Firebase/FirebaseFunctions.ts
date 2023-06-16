import { createFormData } from "../ZZZ_USEFUL COMPONENTS/Utilities/HandleFormData";
import { serverURL } from "../ZZZ_USEFUL COMPONENTS/apiPaths";
import { userCredentials } from "../ZZZ_USEFUL COMPONENTS/auth/auth.models";

export const postDataToServer =(data:any, functionName:string) => {
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
        return data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}





export const postFormDataToServer =(data:any, functionName:string) => {
  const formData = createFormData(data)
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
      return data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}




export const putDataToServer =(data:any, functionName:string) => {
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
      return data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
