import axios from "axios";
import { keys } from "../config/keys";
import { log } from "console";

export async function getTrendData(topic:string, competition:string) {
    console.log(`Fetching trend data for topic: ${topic} in competition: ${competition}`);
    return {
        trend: 'Artisanal Coffee',
        competition: 3,
    }
}