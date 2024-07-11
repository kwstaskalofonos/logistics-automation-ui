import { Session } from "next-auth";
import { signOut } from "next-auth/react";

const BASE_URL = "http://localhost:8080/api/"; 


export async function getPage(
    session: Session,
    uri:string,
    pageNo:number,
    pageSize:number, 
    filters?:any) {
    const url =BASE_URL+uri;

    const body={
        "pageNo":pageNo,
        "pageSize":pageSize,
        "fields":filters
}

    const requestOptions:RequestInit = {
        method: "POST",
        headers: getHeaders(session),
        body: JSON.stringify(body),
        redirect: "follow",
        mode:"cors"
      };

      try {
        const res = await fetch(url,requestOptions);
        parseResponse(res);
        const result = await res.json();
        return result;
      } catch(e) {
        console.log("Fetch error: ",e);
        throw e;
      }
      
}

const getHeaders = (session: Session, contentType: string ="application/json" ) => {
    const token = session.accessToken;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", contentType);
    myHeaders.append("Authorization", "Bearer "+token);

    return myHeaders;
}

function parseResponse(res: Response) {
    if(res.ok) {
        return;
    }
    switch (res.status) {
        case 401 :
            signOut({ callbackUrl: 'http://localhost:3000/' });
        default:
            throw new Error("Unexpected status code: ${res.status}"); 
    }
}