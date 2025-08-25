import { NextResponse } from "next/server";
import events from "@/data/events";   // <— holt die Liste aus app/data/events.ts

export async function GET() {
  return NextResponse.json(events);
}
