import { Request, Response } from "express";
import * as qlooService from "../../services/qloo.service";
import * as llmService from "../../services/llm.service";

export async function getCompetitorIntel(req: Request, res: Response) {
    try {
        const { location } = req.body;

        // QLOO service call to get trend data
        const qlooResponse = await qlooService.fetchCompetitorData(location);

        // Transform qlooResponse to match CompetitorData type
        const competitorData = {
            location: qlooResponse.location,
            competitors: qlooResponse.data.competitorData.map((comp: any) => ({
                name: comp.name,
                rating: comp.rating,
                priceRange: comp.priceRange,
                distance: comp.distance,
                businessType: comp.type,
                address: comp.address,
                popularTimes: comp.popularTimes
            })),
            marketTrends: {
                popularCategories: qlooResponse.data.insights.trends,
                averageRating: qlooResponse.data.insights.averageRating,
                competitionLevel: qlooResponse.data.insights.competitionLevel
            }
        };

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