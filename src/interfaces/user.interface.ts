//Datos primordiales
//    username
//    email
//    password
//Datos secundarios
//    nombre
//    ubicacion
//    fecha de nacimiento
//    bio


export interface SocialUser{
    username?: string,
    followers?: string[],
    follows?: string[]
}
export default interface User{
    username?: string; 
    email?: string;
    password?: string;
    name?: string;
    location?:string;
    birthday?:Date;
    bio?:string;
}

