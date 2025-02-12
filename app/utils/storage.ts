import { getPresignedPostUrlFn } from "~/fn/storage";
import { env } from "./env";

export function getStorageUrl(key: string) {
  return `${import.meta.env.VITE_FILE_URL}/${key}`;
}

export async function uploadFile(key: string, file: File) {
  const presignedPost = await getPresignedPostUrlFn({
    data: {
      key,
      contentType: file.type,
    },
  });

  const formData = new FormData();
  Object.entries(presignedPost.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append("file", file);

  const uploadResponse = await fetch(presignedPost.url, {
    method: "POST",
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload video");
  }
}
