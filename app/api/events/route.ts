import { NextResponse } from "next/server";
import events from "../../data/events"; // relativ zu app/api/events/

export async function GET() {
  return NextResponse.json(events);
}
