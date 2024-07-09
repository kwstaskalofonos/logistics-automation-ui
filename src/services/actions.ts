
const BASE_URL = "http://localhost:8080/api/"; 


export async function getPage(
    uri:string,
    pageNo:number,
    pageSize:number, 
    token:string, 
    filters?:any) {
    const url =BASE_URL+uri;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

    const body={
        "pageNo":pageNo,
        "pageSize":pageSize,
        "fields":filters
}

    const requestOptions:RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: "follow",
        mode:"cors"
      };

      const res = await fetch(url,requestOptions);
      const result = await res.json();
      return result;
}