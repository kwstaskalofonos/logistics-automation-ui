"use client"
import {create} from "zustand";

const globalState=create((set:any)=>({
    modalContentType: null,
    setModalContentType:(x:string|null)=>set(()=>({modalContentType: x})),
    reloadData: false,
    setReloadData:(x:boolean)=>set(()=>({reloadData: x}))
}))

export default globalState;