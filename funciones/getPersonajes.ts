import { Request, Response } from "npm:express@4.18.2";
import {ModeloPerson} from "../db/personajes.ts";


export const getPersonaje = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const personaje = await ModeloPerson.findOne({ name }).exec();
    if (!personaje) {
      res.status(404).send("Personaje not found");
      return;
    }
    res.status(200).send({
      id: personaje._id.toString(),
      name: personaje.name,
      raza: personaje.raza,
      descripcion: personaje.descripcion,
      habilidades: personaje.habilidades,
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};


