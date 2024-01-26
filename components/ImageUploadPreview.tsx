import { CldImage } from "next-cloudinary";

function ImageUploadPreview({
  imageUrl,
  alt,
  width,
  height,
}: {
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
}) {
  return <CldImage src={imageUrl} alt={alt} width={width} height={height} />;
}
export default ImageUploadPreview;
