import dbConnect from "@/db";
import Link from "@/models/link.model";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();

    const decodeUrl = decodeURIComponent(slug);

    const result = await Link.findOne({ key: decodeUrl });
    if (!result)
      return NextResponse.json({ message: "Link not found" }, { status: 404 });

    return NextResponse.redirect(result.link);
  } catch (error) {
    console.log("Error while fetching url", error);
    return NextResponse.json(
      { message: "failed to fetch link" },
      { status: 500 }
    );
  }
}
