import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    const systemCode = process.env.ADMIN_PASSCODE || "CPM2026";
    if (code === systemCode) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, message: "Invalid passcode credential." }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
