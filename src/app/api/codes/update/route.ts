import { connectDb } from '../../../../dbconfig/dbConfig.js'
import { NextRequest,NextResponse} from 'next/server'
import Post from '../../../../models/post.model.js'
import { getDataFromToken } from "../../../../helper/getDataFromToken.js";



connectDb()

export async function PUT(request:NextRequest){
    // update code blog with id from db

    try {
        const reqBody = await request.json();
        const { id, title, code, ownerId } = reqBody;
        const userId = await getDataFromToken(request);
        
        if(!id){
            return NextResponse.json({error:'Please provide id of the code'},{status:400})
        }

        if(!title || !code){
            return NextResponse.json({error:'Please fill all fields'},{status:400})
        }

        if(userId !== ownerId){
            return NextResponse.json({error:'Unauthorized request'},{status:401})
        }
        
        const updatedCode = await Post.findByIdAndUpdate(id,{title,code},{new:true})
        if(!updatedCode){
            return NextResponse.json({error:'No code found with this id'},{status:400})
        }
    
        return NextResponse.json({message:'Code updated successfully',
            success:true,
            updatedCode
        })
    } catch (error) {
        return NextResponse.json(error.message, {status: 500})
    }
}