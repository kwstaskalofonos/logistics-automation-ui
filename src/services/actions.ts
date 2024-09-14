import { Session } from "next-auth";
import { signOut } from "next-auth/react";


export async function post(
    session: Session | null,
    uri: string,
    body: any
) {
    if (!session) return;
    const url = process.env.NEXT_PUBLIC_API_URL + uri;
    const requestOptions: RequestInit = {
        method: "POST",
        headers: getHeaders(session),
        body: JSON.stringify(body),
        redirect: "follow",
        mode: "cors"
    };
    try {
        const res = await fetch(url, requestOptions);
        parseResponse(res);
        const result = await res.json();
        return result;
    } catch (e) {
        console.log("Fetch error: ", e);
        throw e;
    }

}

export async function getAll(
    session: Session | null,
    uri: string
) {
    if (!session) return;
    const url = process.env.NEXT_PUBLIC_API_URL + uri;
    const requestOptions: RequestInit = {
        method: "GET",
        headers: getHeaders(session),
        redirect: "follow",
        mode: "cors"
    };
    try {
        const res = await fetch(url, requestOptions);
        parseResponse(res);
        return await res.json();
    } catch (e) {
        console.log("Fetch error: ", e);
        throw e;
    }

}

export async function getPage(
    session: Session | null,
    uri: string,
    pageNo: number,
    pageSize: number,
    filters?: any) {
    if (!session) return;
    const url = process.env.NEXT_PUBLIC_API_URL + uri;
    const body = {
        "pageNo": pageNo,
        "pageSize": pageSize,
        "fields": filters
    }

    const requestOptions: RequestInit = {
        method: "POST",
        headers: getHeaders(session),
        body: JSON.stringify(body),
        redirect: "follow",
        mode: "cors"
    };

    try {
        const res = await fetch(url, requestOptions);
        parseResponse(res);
        const result = await res.json();
        console.log(result);
        return result;
    } catch (e) {
        console.log("Fetch error: ", e);
        throw e;
    }

}

const getHeaders = (session: Session, contentType: string = "application/json") => {
    const token = session.accessToken;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", contentType);
    myHeaders.append("Authorization", "Bearer " + token);

    return myHeaders;
}

function parseResponse(res: Response) {
    if (res.ok) {
        return;
    }
    switch (res.status) {
        case 401:
            signOut({ callbackUrl: 'http://localhost:3000/' });
        default:
            throw new Error("Unexpected status code: ${res.status}");
    }
}