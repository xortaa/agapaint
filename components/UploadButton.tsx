import { CldUploadButton } from "next-cloudinary";

const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

function UploadButton({ onUpload }: { onUpload: (result: any) => void }) {
  return <CldUploadButton uploadPreset={presetName} onUpload={onUpload} className="form-control" />;
}
export default UploadButton;

// example of how to obtain the image url from the upload button

// const [imageUrl, setImageUrl] = useState<string>();

// function handleUploadSuccess(result: any) {
//   setImageUrl(result.info.secure_url);
// }

// <UploadButton onUpload={handleUploadSuccess} />
