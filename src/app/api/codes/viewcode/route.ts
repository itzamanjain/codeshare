import { connectDb } from '../../../../dbconfig/dbConfig.js'
import { NextRequest,NextResponse} from 'next/server'
import Post from '../../../../models/post.model.js'

connectDb()

export async function GET(request:NextRequest){

    try {
        const allCodes = await Post.find()
        if(allCodes.length === 0){
            return NextResponse.json({message:'No code found',success:false},{status:404})
        }
        console.log(allCodes);
        
        
        return NextResponse.json({message:'All codes fetched successfully',
            success:true,
            allCodes
        })
    } catch (error) {
        return NextResponse.json(error.message, {status: 500})
    }
}