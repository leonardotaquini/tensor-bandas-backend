import { Router } from "express";
import { getTopGenres, getBands, getFeatures, getUser } from "../controllers/tensor.controller";

const router = Router();


router.post('/top-genres', getTopGenres );
router.get('/users', getUser);
router.get('/bands', getBands);
router.get('/features', getFeatures);

export default router;