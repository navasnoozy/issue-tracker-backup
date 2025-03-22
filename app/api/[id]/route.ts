import { NextRequest } from "next/server";

export async function PATCH (req: NextRequest){
    const {title, description , status} = await req.json();
}