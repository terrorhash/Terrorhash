import { NextResponse } from "next/server";
import events from "@/app/data/events";  // absoluter Pfad zur Datei

// wichtig: Route nicht als statische Datei cachen
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(events);
}
