import mongoose from "mongoose";

const Schema = mongoose.Schema

const livreSchema = new Schema({
    numero: { type: Number, required: [true, "numero is required"], unique: true},
    titre: { type: String, required: [true, "titre is required"], min: 3},
    autheur: { type: String, required: [true, "autheur is required"], min: 3},
    livreImage: { type: String, required: true},
    dateEdition: { type: String, required: true},
    disponible: { type: Boolean, default: true},
    nbFoisPret: { type: Number, default:0 }
});

const Livre = mongoose.model("Livre", livreSchema);

export default Livre;