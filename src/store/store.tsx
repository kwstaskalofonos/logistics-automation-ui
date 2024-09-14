"use client"
import {create} from "zustand";
import {Customer, Item} from "../services/entities"

const globalState=create((set:any)=>({
    modalContentType: null,
    setModalContentType:(x:string|null)=>set(()=>({modalContentType: x})),
    reloadData: false,
    setReloadData:(x:boolean)=>set(()=>({reloadData: x})),
    itemToEdit:null,
    setItemToEdit:(x:Item)=>set(()=>({itemToEdit:x})),
    customerToEdit:null,
    setCustomerToEdit:(x:Customer)=>set(()=>({customerToEdit:x})) 
}))

export default globalState;