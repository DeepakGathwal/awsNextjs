import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region : "ap-southeast-2",
    credentials:{
        accessKeyId : process.env.ID,
        secretAccessKey :process.env.KEY
    }
})

export async function PUT(req){
    const name = await req.json()
    const command = new GetObjectCommand({
        Bucket :"jtcporject",
        Key : `${name}`
    })
    const url  = await getSignedUrl(s3Client, command) 
    return new NextResponse(url, { headers: { Location : url} });
}


export async function GET(req){
    const command = new ListObjectsCommand({
        Bucket :"jtcporject",
       
        Delimiter: '/'  
    })
    const url  = await s3Client.send(command)

    return NextResponse.json({data : url})
}
export async function POST(req){
    const formData = await req.formData();
    const file = formData.get("file");
    const project = formData.get("project");
   
    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename =  file.name.replaceAll(" ", "_");
    const command = new PutObjectCommand({
        Bucket :"jtcporject",
        Key : `${filename}`,
                Body:buffer
    })
 const value = await  s3Client.send(command)
  
    return NextResponse.json({data : "Done"})
}