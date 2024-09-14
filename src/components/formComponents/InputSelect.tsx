import React from "react";

const InputSelect= ({
    label,
    name,
    options=[],
    register,
    errors,
    placeholder="",
    disabled=false,


}:any) => {

    return (
        <div className="flex flex-col">
            <label>{label}</label>
            <select placeholder={placeholder} disabled={disabled} name={name}
            className="p-2 rounded border border-solid w-full border-indigo-400 focus:outline-none focus:border-indigo-600 focus:ring-1" {...register(name)} >
                {options.length>0&&options.map((option:any,index:number)=><option key={index} value={option}>{option}</option>)}
            </select>
            {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
        </div>
    );
};

export default InputSelect;