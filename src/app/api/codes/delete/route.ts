import { connectDb } from '../../../../dbconfig/dbConfig.js'
import { NextRequest,NextResponse} from 'next/server'
import Post from '../../../../models/post.model.js'
import User from '../../../../models/user.model.js'
import { getDataFromToken } from "../../../../helper/getDataFromToken";


connectDb()

export  async function DELETE(request:NextRequest){
    // delete code blog with id from db
    try {
        const reqBody = await request.json();
        const { id,ownerId } = reqBody;
        
        const userId = await getDataFromToken(request);

    
        if(!id){
            return NextResponse.json({error:'Please provide id of the code'},{status:400})
        }

        if(userId !== ownerId){
            return NextResponse.json({error:'Unauthorized request'},{status:401})
        }
    
        const deletedCode = await Post.findByIdAndDelete(id)
        if(!deletedCode){
            return NextResponse.json({error:'No code found with this id'},{status:400})
        }
    
        return NextResponse.json({message:'Code deleted successfully',
            success:true,
            deletedCode
        })
    } catch (error) {
        return NextResponse.json(error.message, {status: 500})
    }

}