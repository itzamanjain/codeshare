import { connectDb } from "../../../../dbconfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import Post from "../../../../models/post.model.js";
import { getDataFromToken } from "../../../../helper/getDataFromToken";

connectDb();

export async function POST(request: NextRequest) {
  // create code blog with title and desc and save to db

  try {
    const reqBody = await request.json();
    const { title, code } = reqBody;
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json(
        { error: "please login first to upload code" },
        { status: 403 }
      );
    }

    if (!title || !code) {
      return NextResponse.json(
        { error: "Please fill all fields" },
        { status: 400 }
      );
    }

    const SavingCode = new Post({ title, code, ownerId: userId });

    const uploadedCode = await SavingCode.save(); 
    console.log(uploadedCode);

    return NextResponse.json({
      message: "Code created successfully",
      success: true,
      uploadedCode,
    });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
