import { MusicalRanking } from "../domain/use-cases/musicalRanking"
import { Request, Response } from "express";

const ms = new MusicalRanking();


    export const getTopGenres = (req: Request, res: Response) => {
        try {
            const { userVotes } = req.body;
            const users = ms.user();
            const features = ms.features();
            const votes = ms.arrayToTensor( [ userVotes ] );
            const bandFeats = ms.arrayToTensor( ms.bandFeats() );
            const userFeats = ms.getUserFeats(votes, bandFeats);
            const topUserFeatures = ms.getTopUserFeatures(userFeats, ms.features());
            const topGenres = ms.getTopGenres(topUserFeatures);
            users.map((user, i) => {
                const rankedCategories = topGenres&&[i].map((v) => features[v] );
                return res.json({user, rankedCategories});
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
}

    export const getUser = (req: Request, res: Response) => {
        try {
            const user = ms.user();
            return res.json({user});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    export const getBands = (req: Request, res: Response) => {
        try {
            const bands = ms.bands();
            return res.json({bands});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    export const getFeatures = (req: Request, res: Response) => {
        try {
            const features = ms.features();
            return res.json({features});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }