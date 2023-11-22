import { ID , storage } from "@/appwrite";

export const uploadFile = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        process.env.NEXT_PUBLIC_STORAGE_BUCKET_ID!,
        ID.unique(),
        file
    )

    return fileUploaded
}