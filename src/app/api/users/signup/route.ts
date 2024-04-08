import { connectDb } from '../../../../dbconfig/dbConfig.js';
import User from '../../../../models/user.model.js';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, username, password } = reqBody;

        // Combine user and email lookup into a single query
        const [existingUser, existingEmail] = await Promise.all([
            User.findOne({ username }),
            User.findOne({ email })
        ]);

        if (existingUser || existingEmail) {
            return NextResponse.json({ error: 'Oops, username or email already used!' }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword,email });

        const savedUser = await newUser.save();

        // Log successful user creation
        console.log('User created:', savedUser);

        // Send verification email (not implemented)

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            savedUser
        });
    } catch (error) {
        // Consolidate error handling
        return NextResponse.json(error.message, { status: 500 });
    }
}
