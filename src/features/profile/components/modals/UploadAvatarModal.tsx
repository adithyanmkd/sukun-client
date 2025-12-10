import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useEffect, useState, type ChangeEvent } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  useGetCloudinarySignatureQuery,
  useUpdateAvatarMutation,
} from "../../api/profileApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { updateAvatar as updateAuthAvatar } from "@/features/auth/authSlice";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const UploadAvatarModal = ({ open, onOpenChange }: Props) => {
  const [updateAvatar] = useUpdateAvatarMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null | undefined>(
    user?.avatar,
  );

  // Fetch signature only when file exists
  const { data: signatureData } = useGetCloudinarySignatureQuery(undefined, {
    skip: !file,
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    if (!file || !signatureData) return;
    try {
      const { signature, timestamp, apiKey, cloudName } = signatureData;
      console.log(signatureData);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", apiKey);
      formData.append("folder", "users/avatars");

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await uploadRes.json();

      const result = await updateAvatar({
        avatar: data.secure_url,
        publicId: data.public_id,
      }).unwrap();

      dispatch(updateAuthAvatar(result.data.avatar));
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }

    onOpenChange(false); // close modal
  };

  const handleCancel = () => {
    onOpenChange(false);
    setPreview(user?.avatar);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile Photo</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6">
          <div className="group relative">
            {/* Avatar */}
            <img
              src={preview ?? "/avatar-placeholder.png"}
              className="ring-muted size-32 rounded-full object-cover ring-4"
            />

            {/* Pencil icon (top-right) */}
            <label
              htmlFor="avatar-upload"
              className="bg-background hover:bg-muted absolute -top-1 -right-1 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full shadow transition"
            >
              <Pencil className="text-muted-foreground size-4" />
            </label>

            {/* Hover overlay */}
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <span className="text-sm font-medium text-white">Change</span>
            </label>

            {/* Hidden file input */}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Helper text */}
          <p className="text-muted-foreground text-center text-sm">
            JPG, PNG or WEBP • Max 2MB
          </p>

          {/* Actions */}
          <div className="flex w-full gap-3">
            <Button variant="outline" className="w-1/2" onClick={handleCancel}>
              Cancel
            </Button>

            <Button className="w-1/2" onClick={handleUpload} disabled={!file}>
              {isUploading && (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {isUploading ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadAvatarModal;
