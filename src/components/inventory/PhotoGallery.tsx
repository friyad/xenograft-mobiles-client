import { useState } from "react";

const PhotoGallery = () => {
  const [preview, setPreview] = useState(
    "https://images.unsplash.com/flagged/photo-1571366992942-be878c7b10c0?auto=format&q=75&fit=crop&w=600"
  );

  const thumbs = [
    {
      id: 1,
      img: "https://images.unsplash.com/flagged/photo-1571366992791-2ad2078656cb?auto=format&q=75&fit=crop&w=250",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/flagged/photo-1571366992791-2ad2078656cb?auto=format&q=75&fit=crop&w=250",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/flagged/photo-1571366992791-2ad2078656cb?auto=format&q=75&fit=crop&w=250",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-5 max-h-[700px] lg:max-h-[500px]">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {thumbs.map((thumb) => {
          return (
            <div
              key={thumb.id}
              onClick={() => setPreview(thumb.img)}
              className="overflow-hidden rounded-lg bg-gray-100 hover:border-2 border-primary cursor-pointer max-h-[160px]"
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

      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4 group">
        <img
          src={preview}
          loading="lazy"
          alt=""
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export default PhotoGallery;
