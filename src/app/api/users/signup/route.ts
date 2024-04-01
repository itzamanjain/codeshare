import {connectDb} from '../../../../dbconfig/dbConfig.js'
import User from '../../../../models/user.model.js'
import { NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'

connectDb()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()

        const { username,password } = reqBody;


        const user = await User.findOne({username})
        if(user){
            return NextResponse.json({error:'Oops username already taken !!'},{status:400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        
        const newUser = new User({username,password:hashedPassword})

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send Verification email

        return NextResponse.json({message:'User created successfully',
        success:true,
        savedUser
    })


        

    } catch (error) {
        return NextResponse.json(error.message, {status: 500})
    }
}