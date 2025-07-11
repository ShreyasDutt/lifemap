import { v2 as cloudinary } from "cloudinary"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("photo")

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "LifeMapMemories" },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)

        }
      )
      uploadStream.end(buffer)
    })
        console.log(result.public_id,"public id");
        console.log(result.secure_url,"secure url")
    return NextResponse.json({ success: true, url: result.secure_url, publicId: result.public_id })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
