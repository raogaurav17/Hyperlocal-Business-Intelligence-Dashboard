import { useEffect, useState } from "react";

type SalesData = {
  city: string;
  lat: number;
  lng: number;
  time_period: string;
  age_group: string;
  demand_intensity: "Low" | "Medium" | "High";
  sales: number;
};
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DATA_URL = "/test-data/sales-demographic.json";

const Dashboard = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [intensity, setIntensity] = useState<number|string>(0);
  const [ageGroup, setAgeGroup] = useState<string|null>(null);
  const [timePeriod, setTimePeriod] = useState<string|null>(null);
  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then(setSalesData);
  }, []);

  // Map demand intensity to a numeric value
  const intensityMap = { Low: 0, Medium: 50, High: 100 };
  const intensityOptions = [
    { label: "All", value: 0 },
    { label: "Low", value: 0 },
    { label: "Medium", value: 50 },
    { label: "High", value: 100 },
  ];
  let filteredData: SalesData[] = [];
  const intensityValue = typeof intensity === "string" ? Number(intensity) : intensity;
  if (ageGroup === null) {
    // Aggregate by city, lat, lng, time_period, demand_intensity
    const map = new Map<string, SalesData>();
    salesData.forEach((item) => {
      if (
        intensityMap[item.demand_intensity] >= intensityValue &&
        (!timePeriod || item.time_period === timePeriod)
      ) {
        const key = `${item.city}|${item.lat}|${item.lng}|${item.time_period}|${item.demand_intensity}`;
        if (!map.has(key)) {
          map.set(key, { ...item });
        } else {
          const prev = map.get(key)!;
          prev.sales += item.sales;
        }
      }
    });
    filteredData = Array.from(map.values());
  } else {
    filteredData = salesData.filter(
      (item) =>
        intensityMap[item.demand_intensity] >= intensityValue &&
        item.age_group === ageGroup &&
        (!timePeriod || item.time_period === timePeriod)
    );
  }

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Controls & Heatmap */}
        <div>
          <div className="rounded-xl p-6 mb-6 border" style={{background: "var(--color-card)", borderColor: "var(--color-border)"}}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{color: "var(--color-primary)"}}>
              Geographic Analysis Controls
            </h2>
            <div className="flex flex-wrap gap-6 items-center mb-4">
              <div>
                <span className="block text-sm mb-1" style={{color: "var(--color-muted-foreground)"}}>Demographics</span>
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-bold ${ageGroup === "26-35" ? "bg-purple-700 text-white" : "bg-gray-800 text-gray-200"}`}
                    onClick={() => setAgeGroup("26-35")}
                  >26-35 Years</button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-bold ${ageGroup === "36-50" ? "bg-purple-700 text-white" : "bg-gray-800 text-gray-200"}`}
                    onClick={() => setAgeGroup("36-50")}
                  >36-50 Years</button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-bold ${ageGroup === "50+" ? "bg-purple-700 text-white" : "bg-gray-800 text-gray-200"}`}
                    onClick={() => setAgeGroup("50+")}
                  >50+ Years</button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-bold ${ageGroup === null ? "bg-purple-700 text-white" : "bg-gray-800 text-gray-200"}`}
                    onClick={() => setAgeGroup(null)}
                  >All</button>
                </div>
              </div>
              <div>
                <span className="block text-sm mb-1" style={{color: "var(--color-muted-foreground)"}}>Time Period</span>
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-bold ${timePeriod === "2025-Q1" ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-gray-200"}`}
                    onClick={() => setTimePeriod("2025-Q1")}
                  >2025-Q1</button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-bold ${timePeriod === "2025-Q2" ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-gray-200"}`}
                    onClick={() => setTimePeriod("2025-Q2")}
                  >2025-Q2</button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-bold ${timePeriod === null ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-gray-200"}`}
                    onClick={() => setTimePeriod(null)}
                  >All</button>
                </div>
              </div>
              
            </div>
          </div>
          <div className="rounded-xl p-6 border" style={{background: "var(--color-card)", borderColor: "var(--color-border)"}}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: "var(--color-primary)"}}>
              Interactive Map
            </h3>
            <div className="w-40 mb-4">
              <span className="block text-sm mb-1" style={{color: "var(--color-muted-foreground)"}}>Demand Intensity</span>
              <select
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full px-2 py-1 rounded bg-accent"
              >
                <option value={0}>All</option>
                <option value={0}>Low</option>
                <option value={50}>Medium</option>
                <option value={100}>High</option>
              </select>
            </div>
            <div className="h-64 w-full rounded-lg overflow-hidden">
              <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {filteredData.map((item, idx) => (
                  <Marker key={idx} position={[item.lat, item.lng]}>
                    <Popup>
                      <strong>{item.city}</strong><br />
                      Period: {item.time_period}<br />
                      Age: {item.age_group}<br />
                      Demand: {item.demand_intensity}<br />
                      Sales: {item.sales}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
        {/* Right: Key Insights */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl p-6 border" style={{background: "var(--color-card)", borderColor: "var(--color-border)"}}>
            <h4 className="text-lg font-bold mb-2 flex items-center gap-2" style={{color: "var(--color-primary)"}}>
              Highest Demand
            </h4>
            <p style={{color: "var(--color-muted-foreground)"}}>Downtown area shows 85% increase in demand during lunch hours (11AM-2PM)</p>
          </div>
          <div className="rounded-xl p-6 border" style={{background: "var(--color-card)", borderColor: "var(--color-border)"}}>
            <h4 className="text-lg font-bold mb-2 flex items-center gap-2" style={{color: "var(--color-primary)"}}>
              Demographics
            </h4>
            <p style={{color: "var(--color-muted-foreground)"}}>25-35 age group represents 60% of total demand in tech districts</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard