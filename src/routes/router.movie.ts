import { Router } from 'express';
import controllerMovie from '../controllers/controller.movie';
const router = Router();

router.get('/read', controllerMovie.readAll);
router.get('/read/:movieId', controllerMovie.readMovie);
router.post('/create', controllerMovie.createMovie);
router.patch('/update/:movieId', controllerMovie.updateMovie);
router.delete('/delete/:movieId', controllerMovie.deleteMovie);

export default router;