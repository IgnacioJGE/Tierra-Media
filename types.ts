export type Personaje = {
  id: string;
    name: string;
    raza: RAZAS;
    descripcion: string;
    habilidades: string;
  };
  
  export enum RAZAS{
    Humanos="Humanos",
    Elfos="Elfos",
    Hobbits="Hobbits",
    Enanos= "Enanos",
    Ents= "Ents"
  }