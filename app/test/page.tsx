"use client";

import { useState } from "react";
import { CldUploadButton, CldImage } from "next-cloudinary";

const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

function TestPage() {
  const [imageUrl, setImageUrl] = useState<string>();

  function handleUploadSuccess(result: any) {
    setImageUrl(result.info.secure_url);
  }

  return (
    <div>
      <CldUploadButton uploadPreset={presetName} onUpload={handleUploadSuccess} />
      {imageUrl && <CldImage width="500" height="500" src={imageUrl} alt="Description of my image" />}
    </div>
  );
}
export default TestPage;
