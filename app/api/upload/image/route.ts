// D:\Project\sistem-sekolah\sistem-penilaian-siswa\backend\app\api\upload\image\route.ts

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/middleware";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "File gambar tidak ditemukan" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Format tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF." },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ message: "Ukuran file terlalu besar. Maksimal 5MB." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "soal-ujian",
              resource_type: "image",
              transformation: [
                { width: 1200, crop: "limit" },
                { quality: "auto:good" },
              ],
            },
            (error, result) => {
              if (error || !result) reject(error || new Error("Upload gagal"));
              else resolve({ secure_url: result.secure_url, public_id: result.public_id });
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json(
      { message: "Gambar berhasil diupload", url: uploadResult.secure_url },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload gambar error:", error);
    return NextResponse.json({ message: "Gagal mengupload gambar", error: String(error) }, { status: 500 });
  }
}