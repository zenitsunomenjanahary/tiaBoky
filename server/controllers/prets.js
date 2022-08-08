import Pret from "../models/Pret.js"
import Lecteur from "../models/Lecteur.js"
import Livre from "../models/Livre.js"
import { addDaysToDate } from "../middlewares/helpers.js";

export const getPrets = async (req,res,next) => {
    try {
        const prets = await Pret.find();
        return res.status(200).json(prets)
    } catch (error) {
        return res.status(400).json(`Error: ${error}`)
    }
}

export const getPret = async(req,res,next) => {
    const id = req.params.id
    try {
        const pret = await Pret.findById(id)
        return res.status(200).json(pret)
    } catch (error) {
        return res.status(400).json(`Error: ${error}`)
    }
}

export const addPret = async(req,res,next) =>{
    const { numero, numeroLecteur, numeroLivre, datePret} = req.body
    try {
        const lecteur = await Lecteur.findOne({numero: numeroLecteur})
        const livre = await Livre.findOne({numero: numeroLivre})

        if(lecteur.nbPretActuel === 3) {
            return res.status(400).json({message: "Le lecteur a atteint le maximum de pret autoriser"});
        }else{
            const dateRetour = addDaysToDate(datePret,15);

            lecteur.nbPretActuel = lecteur.nbPretActuel + 1
            lecteur.livres.push(livre)
            livre.disponible = false
            livre.nbFoisPret = livre.nbFoisPret + 1;
            await lecteur.save();
            await livre.save();
    
            const pret = new Pret({
                numero,numeroLecteur,numeroLivre,datePret,dateRetour
            })
    
            await pret.save()

            return res.status(201).json({message: "Nouveau pret enregistrer"});

        }

    } catch (error) {
        return res.status(400).json(`Error: ${error}`)
    }
}

export const deliverPret = async(req,res,next) => {
    const id = req.params.id;
    try {
        const pret = await Pret.findByIdAndUpdate(id, {
            rendu: true
        });
        const livre= await Livre.findOne({numero: pret.numeroLivre});

        livre.disponible = true;
        livre.nbFoisPret = livre.nbFoisPret +1;
        await livre.save()

        const lecteur = await Lecteur.findOne({numero: pret.numeroLecteur});
        lecteur.nbPretActuel = lecteur.nbPretActuel - 1;
        await lecteur.save();

        return res.status(200).json({message: "Livre rendu "})
    } catch (error) {
        return res.status(400).json(`Error: ${error}`)
    }
}