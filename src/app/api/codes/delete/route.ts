import { connectDb } from '../../../../dbconfig/dbConfig.js';
import { NextRequest, NextResponse } from 'next/server';
import Post from '../../../../models/post.model.js';
import { getDataFromToken } from "../../../../helper/getDataFromToken";

connectDb();

export async function DELETE(request: NextRequest) {
    // Delete code blog with id from db
    try {
        const reqBody = await request.json();
        const { id } = reqBody;
        const userId = await getDataFromToken(request);

        if (!id) {
            return NextResponse.json({ error: 'Please provide the ID of the code' }, { status: 400 });
        }

        const code = await Post.findById(id).select('ownerId');
        if (!code) {
            return NextResponse.json({ error: 'No code found with this ID' }, { status: 400 });
        }

        const ownerId = code.ownerId;

        if (userId !== String(ownerId)) {
            return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
        }

        const deletedCode = await Post.findByIdAndDelete(id);
        if (!deletedCode) {
            return NextResponse.json({ error: 'No code found with this ID' }, { status: 400 });
        }

        return NextResponse.json({
            message: 'Code deleted successfully',
            success: true,
            deletedCode
        });
    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}
