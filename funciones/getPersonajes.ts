import { Request, Response } from "npm:express@4.18.2";
import { ModeloPerson } from "../db/personajes.ts";

const getPersonaje = async (req: Request, res: Response) => {
  try {
    const persons = await ModeloPerson.find().exec();

    if (!persons) {
      res.status(404).send("No se encontraron personajes");
      return;
    }

    const formattedPersons = persons.map((person) => ({
      name: person.name,
      raza: person.raza,
      descripcion: person.descripcion,
      habilidades: person.habilidades,
      id: person._id.toString(),
    }));

    res.status(200).send(formattedPersons);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default getPersonaje;