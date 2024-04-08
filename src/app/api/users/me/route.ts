import { connectDb } from "../../../../dbconfig/dbConfig.js";
import User from "../../../../models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helper/getDataFromToken.js";

connectDb();

export async function POST(request: NextRequest) {
  //extract data from token
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");

  return NextResponse.json({ message: "user found", data: user });
}
