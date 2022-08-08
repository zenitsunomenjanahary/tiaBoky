import mongoose from "mongoose";
import { addDaysToDate } from "../middlewares/helpers.js";

const Schema = mongoose.Schema

const pretSchema = new Schema({
    numero: { type: String, required: [true, "numero is required"], unique: true},
    numeroLecteur: { type: String, required: [true, "numero lecteur is required"], min: 3},
    numeroLivre: { type: String , ref: "Livre", required: [true, "numero livre is required"], min: 3},
    datePret: { type: Date, default: Date.now()},
    dateRetour: { type: Date},
    rendu: { type: Boolean, default: false}
});

const Pret = mongoose.model("Pret", pretSchema);

export default Pret;