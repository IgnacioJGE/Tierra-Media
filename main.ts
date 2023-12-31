
import express,{Request,Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { addCharacter } from "./funciones/addCharacter.ts";
import { getPersonaje } from "./funciones/getPersonaje.ts";
import { updatePerson } from "./funciones/editPersonaje.ts";
import { getPersonajes } from "./funciones/getPersonajes.ts";
import { deletePerson } from "./funciones/deletePersonaje.ts";
const env = await load();
const MONGO_URL=env.MONGO_URL||Deno.env.get("MONGO_URL")// si hay .emv lo leo si no lo lee de las variables de entorno de deno
const PORT=env.PORT||Deno.env.get("PORT")||3000
if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}
try{
await mongoose.connect(MONGO_URL);
console.info("Mongo Concectado")
const app= express();
app.use(express.json())
app.post("/api/tierramedia/personajes",addCharacter)
    .get("/getPerson/:name", getPersonaje)
    .put("/updatePersonaje/:id",updatePerson)
    .get("/getAllpersonajes",getPersonajes)
    .delete("/eliminarpersonaje/:id",deletePerson)

app.listen(PORT,()=> console.info ((`Te estoy escuchando desde ${PORT}`)));
}catch(e){
  console.error(e)
}


