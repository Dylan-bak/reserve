import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    return NextResponse.json("here", { status: 200 });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { message: "Failed to read EXIF data" },
      { status: 500 }
    );
  }
}
