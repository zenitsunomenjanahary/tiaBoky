import mongoose from "mongoose";

const Schema = mongoose.Schema;

const lecteurSchema = new Schema({
    numero: { type: String, required: true },
    nom: { type: String, required: true, min:3 },
    prenom: { type: String, required: true, min:3 },
    adresse: { type: String, required: true, min:3 },
    dateNaissance: { type: String, required: true },
    dateInscription: { type: Date, default: Date.now() },
    tel: { type: String, required: true, min:3 },
    lecteurImage: { type: String, required: true },
    nbPretActuel: { type: Number, default: 0, max:3},
    livres: { type: [mongoose.Types.ObjectId], ref:"Livre"}
});

const Lecteur = mongoose.model("Lecteur", lecteurSchema );

export default Lecteur;