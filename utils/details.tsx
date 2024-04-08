// Custome data type for creating each form in the homepage. Some attributes are optional and not required to be filled 
export interface FormInformation{
    title:string,
    placeholder_text:string,
    clickable:boolean
    url?:string
    value:any,
    setValue:any
}