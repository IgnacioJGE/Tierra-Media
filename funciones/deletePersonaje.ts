import { Request, Response } from "npm:express@4.18.2";
import { ModeloPerson } from "../db/personajes.ts";

export const deletePerson = async (req: Request, res: Response) => {
  try {
    const _id  = req.params.id;
    const person = await ModeloPerson.findOneAndDelete({ _id }).exec();
    if (!person) {
      res.status(404).send("Personaje not found");
      return;
    }
    res.status(200).send("Personaje deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

