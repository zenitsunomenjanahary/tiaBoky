import express from "express"
import { addPret, deliverPret, getPret, getPrets } from "../controllers/prets.js"

const router = express.Router()

router.get("/", getPrets )
router.get("/:id", getPret)
router.post("/", addPret)
router.put("/:id",deliverPret )
router.delete("/:id",  )

export default router;