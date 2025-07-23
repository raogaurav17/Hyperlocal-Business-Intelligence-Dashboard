
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface SalesLocation {
  city: string;
  lat: number;
  lng: number;
  sales: number;
}

export default function SalesData() {
  const [salesData, setSalesData] = useState<SalesLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/test-data/sales-demographic.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then((data) => {
        setSalesData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Card {i}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 flex items-center justify-center text-gray-400">Placeholder {i}</div>
          </CardContent>
        </Card>
      ))}
      <div className="col-span-1 md:col-span-2 xl:col-span-4 mt-6">
        {loading ? (
          <div className="flex justify-center items-center h-[600px] text-gray-400">Loading map data...</div>
        ) : error ? (
          <div className="flex justify-center items-center h-[600px] text-red-500">{error}</div>
        ) : (
          <MapContainer center={[20, 0]} zoom={2} style={{ height: "600px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {salesData.map((location, index) => (
              <Marker key={index} position={[location.lat, location.lng]}>
                <Popup>
                  <b>{location.city}</b><br />
                  Sales: ${location.sales.toLocaleString()}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
