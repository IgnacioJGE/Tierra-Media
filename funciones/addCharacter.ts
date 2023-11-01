import { Request, Response } from "npm:express@4.18.2";
import {tipoPersonaje,  ModeloPerson } from "../db/personajes.ts";
import { RAZAS } from "../types.ts";

export const addCharacter = async (req: Request, res: Response) => {
  try {
    const { name, raza, descripcion,habilidades } = req.body;
    if (!name || !raza || !descripcion||!habilidades) {
      res.status(500).send("Nombre, raza y descripcion son obligatorias");
      return;
    }
    if(!Object.values(RAZAS).includes(raza)){
      res.status(500).send("Invalid Race")
    }
    if(typeof name!== "string"||typeof raza!== "string"||typeof habilidades!== "string"||typeof descripcion!== "string"){
      res.status(500).send("Invalid datatype")

    }
    const alreadyExists = await ModeloPerson.findOne({name }).exec();
    if (alreadyExists) {
      res.status(500).send("Personaje already exists");
      return;
    }

    const newPersonaje = new ModeloPerson({ name, raza, descripcion,habilidades });
    await newPersonaje.save();

    res.status(200).send({
      name: newPersonaje.name,
      raza: newPersonaje.raza,
      descripcion: newPersonaje.descripcion,
      habilidades: newPersonaje.habilidades,
      id: newPersonaje._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

