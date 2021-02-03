import { Router } from 'express';
import * as noteCtrl from '../controllers/note.controller';

const router = Router();

router.get('/', noteCtrl.getNotes);
router.get('/:id', noteCtrl.getNoteById);
router.post('/', noteCtrl.createNote);
router.put('/:id', noteCtrl.updateNoteById);
router.delete('/:id', noteCtrl.deleteNoteById);

export default router;
