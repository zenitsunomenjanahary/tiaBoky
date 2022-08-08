import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

import lecteurs_routes from "./routes/lecteurs.js";
import livres_routes from "./routes/livres.js";
import prets_routes from "./routes/prets.js";

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

mongoose.connect(process.env.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`database connected`))
    .catch((err) => console.log(err) )

//Routes
app.use("/lecteurs",lecteurs_routes);
app.use("/livres", livres_routes);
app.use("/prets", prets_routes);

app.listen(process.env.port, ()=> console.log(`server running on port: ${process.env.port}`))



