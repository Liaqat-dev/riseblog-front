import React, {useState, useRef} from "react";
import Modal from "react-modal";
import Cropper from "react-easy-crop";
import {MdZoomIn, MdZoomOut} from "react-icons/md";
import {AiOutlineClose} from "react-icons/ai";
import {uploadImage} from "@api/api_routes.ts";


Modal.setAppElement("#root");

interface Props {
    isOpen: boolean;
    setImgUrl: (url: string) => void;
    setIsUploading: (IsUploading: boolean) => void;
    setIsOpen: (isOpen: boolean) => void;

}

const ImageUploader = ({isOpen, setIsOpen, setIsUploading, setImgUrl}: Props) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const onZoomChange = (operator: "+" | "-") => {
        setZoom((prev) => (operator === "+" ? prev + 0.1 : prev - 0.1));
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageSrc(reader.result as string);
            };
        }
    };

    const getCroppedImg = async (imageSrc: string, cropArea: any): Promise<Blob | null> => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                if (!ctx) {
                    reject(new Error("Canvas context not available"));
                    return;
                }

                canvas.width = cropArea.width;
                canvas.height = cropArea.height;

                ctx.drawImage(
                    image,
                    cropArea.x,
                    cropArea.y,
                    cropArea.width,
                    cropArea.height,
                    0,
                    0,
                    cropArea.width,
                    cropArea.height
                );

                canvas.toBlob((blob) => resolve(blob), "image/jpeg");
            };
        });
    };

    const handleCropComplete = async (_: any, croppedAreaPixels: any) => {
        if (imageSrc) {
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            if (croppedBlob) {
                const croppedURL = URL.createObjectURL(croppedBlob);
                setCroppedImage(croppedURL);
            }
        }
    };

    const uploadToImgBB = async () => {
        if (!croppedImage) return;
        setIsUploading(true);
        setImgUrl('');
        setIsOpen(false);
        const response = await fetch(croppedImage);
        const blob = await response.blob();
        const file = new File([blob], "cropped.jpg", {type: "image/jpeg"});

        const formData = new FormData();
        formData.append("image", file);

        const url=await uploadImage(formData);
        if (url) {
            setImgUrl(url);
            setIsUploading(false)
            setIsOpen(false);

        } else {
            setIsUploading(false);
            alert("Upload failed");

        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className="w-[90%] md:w-[500px] bg-white rounded-lg shadow-xl p-4 relative mx-auto my-20 outline-none"
            overlayClassName="fixed inset-0  flex justify-center items-center"
        >
            <button onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
                <AiOutlineClose size={24}/>
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">Upload & Crop Thumbnail</h2>

            <input
                ref={inputRef}
                type="file"
                className="border rounded rounded-full p-2 w-fit mb-3"
                accept="image/*"
                onChange={onFileChange}
            />

            <div
                className="relative w-full h-64 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden p-2">

                {imageSrc ? (
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={16 / 9}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={handleCropComplete}
                    />
                ) : (
                    <img src="./upload.webp" alt="Thumbnail" className="w-full aspect-video"/>
                )}
            </div>

            {imageSrc && (<div className="flex justify-center gap-4 mt-3">
                <MdZoomOut size={30} className="cursor-pointer" onClick={() => onZoomChange("-")}/>
                <MdZoomIn size={30} className="cursor-pointer" onClick={() => onZoomChange("+")}/>
            </div>)}

            {croppedImage && (
                <button
                    onClick={uploadToImgBB}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-blue-600"
                >
                    Upload Image
                </button>
            )}
        </Modal>
    );
};

export default ImageUploader;