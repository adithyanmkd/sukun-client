interface UploadToCloudinaryOptions {
  files: File | File[];
  folder: string;
}

interface CloudinaryUploadResult {
  url: string;
  publicId: string;
}

export const uploadToCloudinary = async (
  options: UploadToCloudinaryOptions,
): Promise<CloudinaryUploadResult[]> => {
  const { files, folder } = options;

  const uploadSingle = async (file: File): Promise<CloudinaryUploadResult> => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    if (folder) {
      formData.append("folder", folder);
    }

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!res.ok) {
      throw new Error("Upload image failed");
    }

    const data = await res.json();

    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  };

  const filesArray = Array.isArray(files) ? files : [files];

  return Promise.all(filesArray.map((file) => uploadSingle(file)));
};
