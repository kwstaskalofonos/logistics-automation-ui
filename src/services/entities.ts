export interface Page {
    content:any[],
    last:boolean,
    totalPages:number,
    totalElements:number,
    numberOfElements:number,
    first:boolean,
    sise:number,
    empty:boolean,
    number:number
}


export interface Item {
    id:number,
    title:string,
    uom:string
}