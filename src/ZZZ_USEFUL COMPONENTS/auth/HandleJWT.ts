import { claim } from "./auth.models";


const tokenKey = 'token';
export function saveToken(token:string){
    console.log(token)
    localStorage.setItem(tokenKey, token);
}

export function getClaims(): claim[]{

    const token = localStorage.getItem(tokenKey);
    if(!token || token === 'null'){

        return[];
    }
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    const response: claim[] = [];
    for(const property in dataToken){
        response.push({name:property,value:dataToken[property]});
    }


    return response;

}


export function logout(){
    localStorage.removeItem(tokenKey);
    // localStorage.removeItem(expirationKey);
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("username");

}

export function getToken(){
    return localStorage.getItem(tokenKey);
}