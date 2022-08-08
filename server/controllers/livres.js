import Livre from "../models/Livre.js"

export const getLivres = async(req, res, next) => {
    try {
        const livres = await Livre.find();
        return res.status(200).json(livres)
    } catch (error) {
        return res.status(400).json(`Error: ${error}`)
    }
}

export const getLivre = async(req,res,next) => {
    const id = req.params.id
    try {
        const livre = await Livre.findById(id)
        return res.status(200).json(livre)
    } catch (error) {
        return res.status(400).json(`Error: ${error}`)
    }
}

export const addLivre = async(req,res,next) => {
    const { numero, titre, autheur, dateEdition } = req.body
    const livreImage = req.file.originalname
    let existingNumero;
    try {
        existingNumero = await Livre.findOne({numero})
    } catch (error) {
        return console.log(error)
    }
    if(existingNumero) {
        return res.status(403).json({message: "Numero deja utiliser par un autre livre"})
    }
    const livre = new Livre({
        numero, titre, autheur, livreImage, dateEdition
    });
    try {
        await livre.save();
        return res.status(200).json({message: "Nouveau livre enregistrer"})
    } catch (error) {
        return res.status(400).json(`Error: ${error}`)
    }
}

export const editLivre = async(req,res,next) => {
    const id = req.params.id
    const { titre, autheur, dateEdition} = req.body
    const livreImage = req.file.originalname
    try {
        const livre = await Livre.findByIdAndUpdate(id, {
            titre, autheur, dateEdition, livreImage
        })
        return res.status(202).json({message: "Livre mis a jour"})
    } catch (error) {
        return res.status(400).json(`Error: ${error}`)
    }
}

export const deleteLivre = async(req,res,next) => {
    const id = req.params.id
    try {
        await Livre.findByIdAndDelete(id)
        return res.status(200).json({message: "Livre supprimer"})
    } catch (error) {
        return res.status(400).json(`Error: ${error}`)
    }
}