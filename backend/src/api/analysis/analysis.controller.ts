import { Request, Response } from "express";
import * as qlooService from "../../services/qloo.service";
import * as llmService from "../../services/llm.service";

export async function getCompietitorIntel(req: Request, res: Response) {
    try {
        const { location } = req.body;

        // QLOO service call to get trend data
        const competitorData = await qlooService.fetchCompetitorData(location);

        // LLM service call to synthesize data
        const synthesizedData = await llmService.analyzeCompetitorWithLLM(competitorData);

        res.status(200).json({
            message: "Competitor intelligence data retrieved successfully",
            data: synthesizedData
        });
    } catch (error) {
        console.error("Error in getCompietitorIntel:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}