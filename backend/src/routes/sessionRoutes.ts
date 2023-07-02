import express from "express";
import { createSessionHandler, getSessionHandler, deleteSessionHandler } from "../Controller/sessionController";
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

router.get("/", requireUser, getSessionHandler);
router.post('/', createSessionHandler);
router.delete("/", requireUser, deleteSessionHandler);

module.exports = router;