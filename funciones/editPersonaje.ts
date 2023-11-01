import { Request, Response } from "npm:express@4.18.2";
import { ModeloPerson } from "../db/personajes.ts";

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const id =req.params._id;

    const { name , raza, descripcion,habilidades } = req.body;
    if (!name || !raza|| !descripcion|| !habilidades) {
      res.status(400).send("Name and age are required");
      return;
    }

    const updatedPerson = await ModeloPerson.findByIdAndUpdate(
      {id},
      { name, raza, descripcion, habilidades },
      { new: true }
    ).exec();

    if (!updatedPerson) {
      res.status(404).send("Person not found");
      return;
    }

    res.status(200).send({
      name: updatedPerson.name,
      raza: updatedPerson.raza,
      descripcion: updatedPerson.descripcion,
      habilidades: updatedPerson.habilidades,
      id: updatedPerson._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

