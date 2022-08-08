import express from "express"
import { addLivre, deleteLivre, editLivre, getLivre, getLivres } from "../controllers/livres.js";
import upload from "../middlewares/upload.js";

const router = express.Router()

router.get("/", getLivres )
router.get("/:id", getLivre)
router.post("/", upload.single("livreImage"), addLivre)
router.put("/:id", upload.single("livreImage"), editLivre )
router.delete("/:id", deleteLivre )

export default router;