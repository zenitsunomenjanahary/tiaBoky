import express from "express"
import { addLecteur, deleteLecteur, editLecteur, getLecteur, getLecteurs } from "../controllers/lecteurs.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getLecteurs);
router.get("/:id", getLecteur);
router.post("/", upload.single("lecteurImage"),addLecteur);
router.put("/:id", editLecteur);
router.delete("/:id", deleteLecteur);

export default router;