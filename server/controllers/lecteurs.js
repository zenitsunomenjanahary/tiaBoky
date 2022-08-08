import Lecteur from "../models/Lecteur.js";
import Livre from "../models/Livre.js";

export const getLecteurs = async(req, res, next) => {
    try {
        const lecteurs = await Lecteur.find();
        return res.status(200).json(lecteurs);
    } catch (error) {
        return res.status(400).json(`Error: ${error}`)
    }
}

export const getLecteur = async(req,res,next) => {
    const id = req.params.id
    try {
        const lecteur = await Lecteur.findById(id).populate("livres")
        return res.status(200).json(lecteur)
    } catch (error) {
        return res.status(400).json(`Error: ${error}`)
    }
}

export const addLecteur = async(req, res, next) => {
    const { numero, nom, prenom, adresse, tel, dateNaissance } = req.body
    const lecteurImage = req.file.originalname
    let existingNumero;
    try {
        existingNumero = await Lecteur.findOne({numero})
    } catch (error) {
        return console.log(error)
    }
    if(existingNumero) return res.status(400).json({message: "Numero deja utilisé"})
    try {
        const lecteur = new Lecteur({
            numero, nom, prenom, adresse, tel, lecteurImage,dateNaissance
        });
        await lecteur.save();
        return res.status(201).json({message: "Nouveau lecteur enregistrer"})
    } catch (error) {
        return res.status(500).json({message: "Une erreur s'est produit lors de l'enregistrement d'un nouveau membre"})
    }
}

export const editLecteur = async(req,res,next) => {
    const id = req.params.id
    const { nom, prenom, adresse, tel, dateNaissance} = req.body

    try {
        const lecteur = await Lecteur.findByIdAndUpdate(id,{ nom, prenom, adresse, tel,dateNaissance})
        return res.status(202).json({message: "Lecteur mis a jour"})
    } catch (error) {
        return res.status(500).json({message: "Une erreur s'est produit lors de modification du lecteur"})
    }
}

export const deleteLecteur = async(req,res,next) => {
    const id = req.params.id;
    try {
        await Lecteur.findByIdAndRemove(id)
        return res.status(200).json({message: "Lecteur supprimer"})
    } catch (error) {
        return res.status(400).json({message: "Erreur lors de suppression d'un lecteur"})
    }
}