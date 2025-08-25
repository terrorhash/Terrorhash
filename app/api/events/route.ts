import { NextResponse } from "next/server";
// vorher: import events from "@/data/events";
import events from "../../data/events";  // <-- relativ zu app/api/events/
export async function GET() {
  return NextResponse.json(events);
}
