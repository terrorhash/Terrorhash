import { NextResponse } from "next/server";

// Dummy-Events (später kannst du hier echte Daten einfügen oder aus einer DB holen)
const events = [
  {
    id: 1,
    country: "Germany",
    region: "Berlin",
    type: "Attack",
    fatalities: 2,
    injuries: 5,
    date: "2025-08-20",
  },
  {
    id: 2,
    country: "France",
    region: "Paris",
    type: "Stabbing",
    fatalities: 0,
    injuries: 3,
    date: "2025-08-18",
  },
];

export async function GET() {
  return NextResponse.json(events);
}
