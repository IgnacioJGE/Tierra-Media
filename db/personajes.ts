import mongoose from "npm:mongoose@7.6.3";
import {Personaje} from "../types.ts";
import {RAZAS} from "../types.ts";


const Schema = mongoose.Schema;

const personajeSchema = new Schema(
  {
    name: { type: String, required: true ,unique: true},
    raza: { type: String, enum: RAZAS,required: true },
    descripcion: { type: String, required: true},
    habilidades: { type: String, required: true},

  },
  { timestamps: true }
);

export type tipoPersonaje = mongoose.Document& Omit<Personaje,"id">;// definir el ripo del modelo

export const ModeloPerson= mongoose.model<tipoPersonaje>("Personajes",personajeSchema)