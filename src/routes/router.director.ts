import { Router } from 'express';
import controllerDirector from '../controllers/controller.director';
const router = Router();

router.get('/read', controllerDirector.readAll);
router.get('/read/:directorId', controllerDirector.readDirector);
router.post('/create', controllerDirector.createDirector);
router.patch('/update/:directorId', controllerDirector.updateDirector);
router.delete('/delete/:directorId', controllerDirector.deleteDirector);

export default router;