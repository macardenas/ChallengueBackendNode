import { Router } from "express";
const router = Router();
import { getFiles } from "../controllers/file.controller.js";

/**
 * [GET /files]
 */

router.get('/files/data',getFiles)



export { router };