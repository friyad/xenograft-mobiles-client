import { useState } from "react";

interface PhotoGalleryProps {
  images: string[];
}

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  const [preview, setPreview] = useState({
    id: 1,
    img: images[0],
  });

  const thumbs = [
    {
      id: 1,
      img: images[0] || "",
    },
    {
      id: 2,
      img: images[1] || "",
    },
    {
      id: 3,
      img: images[2] || "",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-5 max-h-[700px] lg:max-h-[500px]">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {thumbs.map((thumb) => {
          return (
            <div
              key={thumb.id}
              onClick={() => setPreview(thumb)}
              className={`overflow-hidden rounded-lg bg-gray-100 hover:border-primary cursor-pointer max-h-[140px] shadow-xl border-2 ${
                preview.id === thumb.id ? "border-primary border-4" : ""
              }`}
            >
              <img
                src={thumb.img}
                loading="lazy"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gray-100 lg:col-span-4 group border-4 shadow-xl">
        <img
          src={preview.img}
          loading="lazy"
          alt=""
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export default PhotoGallery;
