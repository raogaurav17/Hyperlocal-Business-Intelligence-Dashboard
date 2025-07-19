import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
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
    </div>
  );
}
