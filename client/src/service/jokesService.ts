import axios from "axios";
import { JokeResponse } from "../entities/JokesResponse";

export const getJokes = (textSearch : string, pageNumber : number) =>{
    return axios.get<JokeResponse>('http://localhost:8000/api/dadjokes',{
        params : {
            term: textSearch,
            page: pageNumber,
        },
        headers :{
            Accept : 'application/json'
        }
    });
}