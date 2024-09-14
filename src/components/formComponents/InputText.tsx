import React from "react";

const InputText= ({
    label,
    name,
    register,
    errors,
    placeholder="",
    disabled=false,
    type="text",
    value
}:any) => {

    return (
        <div className="flex flex-col">
            <label>{label}</label>
            <input placeholder={placeholder} type={type} disabled={disabled} name={name} value={value}
            className="p-2 rounded border border-solid w-full border-indigo-400 focus:outline-none focus:border-indigo-600 focus:ring-1" {...register(name)} />
            {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
        </div>
    );
};

export default InputText;