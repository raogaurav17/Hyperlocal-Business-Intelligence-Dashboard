import axios from "axios";
import { keys } from "../config/keys";

interface InputData {
  trend: string;
  competition: number;
}

interface CompetitorData {
  location: string;
  competitors: Array<{
    name: string;
    rating: number;
    priceRange: string;
    distance: string;
    businessType: string;
  }>;
  marketTrends: {
    popularCategories: string[];
    averageRating: number;
    competitionLevel: string;
  };
}

export async function getLLMResponse(data: InputData) {
  console.log("Calling REAL Qloo LLM API...");

  const prompt = `Analyze the following market data for a new business idea:
    - Trend Topic: "${data.trend}"
    - Competition Level: ${data.competition} (out of 10)

    Based on this, provide a concise analysis and suggest one UI command.
    Your response must be a JSON object with two keys: "message" (a string for your analysis) and "uiCommands" (an array with one object).
    The uiCommand object should have a "command" key set to "RENDER_CHART" and a "payload" key containing the original data.
  `;

  try {
    const response = await axios.post(
      "https://hackathon.api.qloo.com/v1/llm/analyze",
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${keys.qlooApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in getLLMResponse:", error);
    throw new Error("Failed to get LLM response");
  }
}

export async function analyzeCompetitorWithLLM(competitorData: CompetitorData) {
  console.log("Analyzing competitor data with LLM...");

  const prompt = `Analyze the following competitor data for business intelligence:
    Location: ${competitorData.location}
    
    Competitors:
    ${competitorData.competitors.map(comp => 
      `- ${comp.name}: ${comp.rating}★, ${comp.priceRange}, ${comp.distance} away, ${comp.businessType}`
    ).join('\n')}
    
    Market Trends:
    - Popular Categories: ${competitorData.marketTrends.popularCategories.join(', ')}
    - Average Rating: ${competitorData.marketTrends.averageRating}
    - Competition Level: ${competitorData.marketTrends.competitionLevel}

    Based on this competitor analysis, provide:
    1. Market opportunity assessment
    2. Key insights about the competitive landscape
    3. Strategic recommendations
    4. Potential market gaps or opportunities

    Your response must be a JSON object with the following structure:
    {
      "analysis": "detailed market analysis",
      "opportunities": ["opportunity 1", "opportunity 2"],
      "recommendations": ["recommendation 1", "recommendation 2"],
      "competitionScore": number between 1-10,
      "marketGaps": ["gap 1", "gap 2"]
    }
  `;

  try {
   
    const mockResponse = {
      analysis: `Based on the competitor data for ${competitorData.location}, the market shows ${competitorData.marketTrends.competitionLevel.toLowerCase()} competition with an average rating of ${competitorData.marketTrends.averageRating}. The presence of ${competitorData.competitors.length} nearby competitors indicates an active market with established demand.`,
      opportunities: [
        "Differentiation through unique offerings not present in current market",
        "Focus on underserved price segments",
        "Leverage location advantages for better accessibility"
      ],
      recommendations: [
        "Consider positioning between existing price points",
        "Focus on customer experience to achieve above-average ratings",
        "Analyze peak hours and service gaps of existing competitors"
      ],
      competitionScore: competitorData.competitors.length * 2.5,
      marketGaps: [
        "24-hour service availability",
        "Premium artisanal options",
        "Health-conscious menu items"
      ]
    };

    return mockResponse;

    
  } catch (error) {
    console.error("Error in analyzeCompetitorWithLLM:", error);
    throw new Error("Failed to analyze competitor data with LLM");
  }
}
