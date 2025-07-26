import axios from "axios";
import { keys } from "../config/keys";
import { log } from "console";
import { response } from "express";

export async function getTrendData(topic:string, competition:string) {
    console.log(`Fetching trend data for topic: ${topic} in competition: ${competition}`);
    return {
        trend: 'Artisanal Coffee',
        competition: 3,
    }
}

export async function fetchCompetitorData(location: string) {
    console.log(`Fetching competitor data for location: ${location}`);
    
    // Always return mock data for now to ensure stability
    console.log('Using mock competitor data for development');
    return {
        location,
        status: "success",
        data: {
            competitorData: [
                {
                    name: "Metro Coffee House",
                    type: "Coffee Shop",
                    rating: 4.3,
                    priceRange: "$$",
                    distance: "0.3 miles",
                    address: `Near ${location}`,
                    popularTimes: ["8-10 AM", "12-2 PM", "7-9 PM"]
                },
                {
                    name: "Downtown Bistro",
                    type: "Restaurant",
                    rating: 4.1,
                    priceRange: "$$$",
                    distance: "0.5 miles",
                    address: `Central ${location}`,
                    popularTimes: ["12-2 PM", "6-9 PM"]
                },
                {
                    name: "Quick Bites Express",
                    type: "Fast Casual",
                    rating: 3.9,
                    priceRange: "$",
                    distance: "0.1 miles",
                    address: `Main Street, ${location}`,
                    popularTimes: ["11 AM-2 PM", "5-8 PM"]
                }
            ],
            insights: {
                totalBusinesses: 25,
                averageRating: 4.1,
                competitionLevel: "High",
                marketGaps: ["Late night dining", "Healthy fast options"],
                trends: ["Sustainable packaging", "Plant-based options", "Digital ordering"]
            },
            demographics: {
                primaryAgeGroup: "25-40",
                averageIncome: "$55,000-$75,000",
                lifestyle: ["Health-conscious", "Tech-savvy", "Busy professionals"]
            }
        }
    };
}