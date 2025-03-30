import dbConnect from "@/db";
import linkSchema from "@/models/link.model";
import { NextResponse } from "next/server";

export const GET = async ({ params }: { params: { navigateLink: string } }) => {
  await dbConnect();
  const result = await linkSchema.findOne({
    key: decodeURIComponent(params.navigateLink),
  });
  if (!result) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }
  return NextResponse.redirect(result.link);
};
