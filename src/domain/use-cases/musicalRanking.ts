import { tf as tensorflow, Tensor } from "../../config/plugins/tensorflow";

export interface TopUserFeatures {
    values: Tensor;
    indices: Tensor;
}

export type TopGenre = number | number[] | number[][] | number[][][] | number[][][][] | number[][][][][] | number[][][][][][]


export interface MusicalRankingUseCase {
    autoClean(): void;
    arrayToTensor(array: number[][]): Tensor;
    getUserFeats(userVotes: Tensor, bandFeats: Tensor): Tensor;
    getTopUserFeatures(userFeats: Tensor, features: string[]): TopUserFeatures;
    getTopGenres(userFeats: TopUserFeatures): TopGenre;
    user():string[];
    bands():string[];
    features():string[];
    bandFeats():number[][];
    
}

export class MusicalRanking implements MusicalRankingUseCase{

    constructor(
        public tf = tensorflow,  
    ){}

    autoClean(): void {
        this.tf.tidy(()=>{ });
    }
    arrayToTensor(array: number[][] ): Tensor {
        return this.tf.tensor(array);
    }
    getUserFeats(userVotes: Tensor, bandFeats: Tensor): Tensor {
        return this.tf.matMul(userVotes, bandFeats);
    }
    getTopUserFeatures(userFeats: Tensor, features:string[] ): TopUserFeatures {
        return this.tf.topk(userFeats, features.length)
    }
    getTopGenres(userFeats: TopUserFeatures): TopGenre {
        return userFeats.indices.arraySync();
    }

    user = ()=> ['Leonardo'];
    bands = ()=> ['Nirvana', 'Nine Inch Nails', 'Backstreet', 'N Sync', 'Night Club', 'Apashe', 'STP'];
    features = ()=> ['Grunge', 'Rock', 'Industrial', 'Boy Band', 'Dance', 'Techno'];
    bandFeats = ()=> [
        [1, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 0, 1],
        [1, 1, 0, 0, 0, 0],
    ];
}