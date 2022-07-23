import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Movie from '../models/model.movie';

const createMovie = async (req: Request, res: Response) => {
    try {
        const { title, director, } = req.body;

        const movie = new Movie({
            _id: new mongoose.Types.ObjectId(),
            title, director,
        });

        const movier = await movie.save();

        return res.status(201).json({ movier });
    } catch (err) {
        res.status(500).json({ err });
    }
};

const readMovie = async (req: Request, res: Response) => {
    try {
        const movieId = req.params.movieId;
        const movie = await Movie.findById(movieId).populate('director');

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json({ movie });
    } catch (err) {
        res.status(500).json({ err });
    }
};

const readAll = async (_req: Request, res: Response) => {
    try {
        const movies = await Movie.find().populate('director');
        return res.status(200).json({ movies });
    } catch (err) {
        res.status(500).json({ err });
    }
};

const updateMovie = async (req: Request, res: Response) => {
    try {
        const movieId = req.params.movieId;
        const movie = await Movie.findById(movieId);

        if (movie) {
            try {
                movie.set(req.body);
                const movier = await movie.save();

                res.status(201).json({ movier });
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

const deleteMovie = async (req: Request, res: Response) => {
    try {
        const movieId = req.params.movieId;

        const movier = await Movie.findByIdAndDelete(movieId);

        if (!movier) {
            res.status(500).json({ message: 'not found' });
        }

        res.status(201).json({ message: 'deleted' });
    } catch (err) {
        res.status(500).json({ err });
    }
};

export default { createMovie, readMovie, readAll, updateMovie, deleteMovie };