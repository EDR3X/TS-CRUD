import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Director from '../models/model.director';

const createDirector = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const director = new Director({
            _id: new mongoose.Types.ObjectId(),
            name
        });

        const directors = await director.save();

        return res.status(201).json({ directors });
    } catch (err) {
        res.status(500).json({ err });
    }
};

const readDirector = async (req: Request, res: Response) => {
    try {
        const directorId = req.params.directorId;
        const director = await Director.findById(directorId);

        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }

        return res.status(200).json({ director });
    } catch (err) {
        res.status(500).json({ err });
    }
};

const readAll = async (_req: Request, res: Response) => {
    try {
        const directors = await Director.find();
        return res.status(200).json({ directors });
    } catch (err) {
        res.status(500).json({ err });
    }
};

const updateDirector = async (req: Request, res: Response) => {
    try {
        const directorId = req.params.directorId;
        const director = await Director.findById(directorId);

        if (director) {
            try {
                director.set(req.body);
                const directorr = await director.save();

                res.status(201).json({ directorr });
            } catch (err) {
                res.status(500).json({ err });
            }
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (err) {
        res.status(500).json({ err });
    }
};

const deleteDirector = async (req: Request, res: Response) => {
    try {
        const directorId = req.params.directorId;

        const directorr = await Director.findByIdAndDelete(directorId);

        if (!directorr) {
            res.status(500).json({ message: 'not found' });
        }

        res.status(201).json({ message: 'deleted' });
    } catch (err) {
        res.status(500).json({ err });
    }
};

export default { createDirector, readDirector, readAll, updateDirector, deleteDirector };