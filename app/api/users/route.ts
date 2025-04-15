import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

//FETCH ALL USERS
export async function GET (req: NextRequest){
     const users = await prisma.user.findMany ({orderBy: {
        name: 'asc'
     }});

     return NextResponse.json(users)
};

//CREATE USER 
export async function POST (req:NextRequest){
   
}