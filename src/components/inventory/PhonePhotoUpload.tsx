import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { UseFormSetValue, UseFormClearErrors } from "react-hook-form";
import { ISmartPhone } from "@/types/globalTypes";
import { useUploadPhotoMutation } from "@/redux/features/uploads/uploadAPI";
import { Skeleton } from "../ui/skeleton";

interface PhonePhotoUploadProps {
  setValue: UseFormSetValue<ISmartPhone>;
  clearErrors: UseFormClearErrors<ISmartPhone>;
  images: string[] | undefined;
}

const PhonePhotoUpload = ({
  setValue,
  clearErrors,
  images,
}: PhonePhotoUploadProps) => {
  const [uploadPhoto, result] = useUploadPhotoMutation();
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    fileRejections,
  } = useDropzone({
    maxFiles: 3,
    maxSize: 1024 * 500, // 500 kb
    accept: {
      "image/jpg": [".jpg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles) => {
      setPhotoFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    const handleUpload = async (formData: FormData) => {
      // If form state already has 3 images then return
      if (images && images?.length >= 3) {
        clearErrors("images");
        return;
      }
      const response: any = await uploadPhoto(formData);

      // If successfully uploaded then set the img url to form state
      if (response.data) {
        if (images) {
          setValue("images", [...images, response.data]);
        } else {
          setValue("images", [response.data]);
        }
        setPhotoFiles([]);
      }
    };

    if (photoFiles.length <= 3) {
      // run a loop on photos file and upload 1 by 1 on cloudinary
      photoFiles.forEach((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "cloud_name",
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        );
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        handleUpload(formData);
      });
    }
  }, [photoFiles]);

  return (
    <section className="mb-4">
      <>
        <div
          {...getRootProps()}
          className={cn(
            "h-44 border-4 rounded-lg flex justify-center items-center transition-all duration-200",
            isFocused || isDragActive
              ? "border-dotted border-primary bg-primary/10"
              : "border-cusBlack/5 hover:border-dotted hover:border-primary hover:bg-primary/10",
            images && images.length >= 3 ? "hidden" : "" // if 3 images uploaded make the div hidden
          )}
        >
          <input
            max={4}
            maxLength={4}
            disabled={images && images.length >= 3}
            {...getInputProps()}
          />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>

        {fileRejections[0] && (
          <p className="text-red-500 text-xs mxl:text-sm">
            {fileRejections[0].errors[0].message === "Too many files"
              ? "You can upload only 3 files"
              : fileRejections[0].errors[0].message}
          </p>
        )}
      </>

      {/* Preview Thumbs after uploading successfully */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images &&
          images.map((url, index) => {
            return (
              <div
                key={index}
                className="border-2 rounded-md overflow-hidden w-full h-44"
              >
                <img
                  src={url}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })}

        {result.isLoading && (
          <div className="border-2 rounded-md overflow-hidden w-full h-44">
            <Skeleton className="w-full h-full bg-slate-200" />
          </div>
        )}
      </div>

      {/* Make clear button visible after uploading 3 images */}
      {images && images.length >= 3 && (
        <Button
          variant="outline"
          className="px-12 mt-4 ml-auto"
          onClick={() => {
            setPhotoFiles([]);
            setValue("images", []);
            result.reset();
          }}
        >
          Clear
        </Button>
      )}
    </section>
  );
};

export default PhonePhotoUpload;
