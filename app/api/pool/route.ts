import { NextResponse } from "next/server";
import pool from "@/data/writing-pool.json";

export async function GET() {
  try {
    return NextResponse.json(pool, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
