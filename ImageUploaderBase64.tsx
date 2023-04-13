import React, { ChangeEvent, ReactNode, useState } from "react";

interface Props {
  onUpload: (images: string[]) => void;
  message?: ReactNode;
  className?: string;
  onclick?: (e: ChangeEvent<any>) => any;
}

const ImageUploaderBase64: React.FC<Props> = ({ onUpload , message = '', className = '', onclick = () => {}}) => {
  const [images, setImages] = useState<string[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newImages: string[] = [];
    Array.from(event.dataTransfer.files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        setImages([...images, ...newImages]);  
        onUpload([...images, ...newImages]); 
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (image: string) => {
    const index = images.indexOf(image);
    const newImages = [...images.slice(0, index), ...images.slice(index + 1)];
    setImages(newImages);
    onUpload(newImages);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImages: string[] = [];
    Array.from(event.target.files!).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        setImages([...images, ...newImages]);
        onUpload([...images, ...newImages]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div
      onClick={onclick}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      className={`p-2 border-2 border-dashed font-bold flex justify-start justify-items-start items-center text-gray-500 flex-col ${className}`}
    >
      <label>
        {message}
        <input
          type="file"
          multiple
          onChange={handleInputChange}
          style={{ display: "none" }}
          accept="image/*"
        />
      </label>
      <div className="grid grid-cols-4 flex-none gap-2 justify-center items-start">
        {images.map((image, index) => (
          <div key={index} className="mt-4 place-self-start w-[calc(100% - 200px)] h-[calc(100% - 200px)] overflow-hidden ">
            <img
              className="rounded-sm h-[110px] object-cover"
              src={image}
              alt="uploaded"
              width={200}
            />
            <span className="text-sm text-gray-300 cursor-pointer" onClick={() => handleDelete(image)}>Delete</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploaderBase64;

