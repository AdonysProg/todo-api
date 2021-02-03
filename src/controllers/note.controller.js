import Note from '../models/Note';

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).send({ error, message: 'Cannot get all the notes' });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById({ _id: id });
    res.status(202).send({ note });
  } catch (error) {
    res.status(404).send({ error });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const createdNote = await Note.create({
      title,
      description,
    });
    res.status(201).send({ createdNote });
  } catch (error) {
    res.status(400).send({ error, message: 'Cannot create this note' });
  }
};

export const updateNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, finished } = req.body;
    if (!title || !description || !finished)
      return res.status(400).send({ message: 'Cannot have empty fields' });
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title,
        description,
        finished,
      },
      {
        new: true,
      }
    );
    res.status(204).send({ updatedNote });
  } catch (error) {
    res.status(404).send({ error, message: 'Cannot update this Note' });
  }
};

export const deleteNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(204).send({ message: 'Note deleted' });
  } catch (error) {
    res.status(404).send({ error, message: 'Cannot delete this Note' });
  }
};
