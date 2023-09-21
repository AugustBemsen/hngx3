import React, { useContext } from "react";
import { FaTags } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AppContext } from "../context/AppContext";

const ImageCard = ({ image, isDragging }) => {
  const { loading } = useContext(AppContext);
  return (
    <div
      className={`${
        isDragging === image.id ? "dragging" : ""
      } relative flex flex-col items-center justify-center p-2`}
    >
      <div className="hidden xs:grid xs:w-[230px] xs:h-[230px] cursor-grab">
        <LazyLoadImage
          src={
            image.url ? (
              image.url
            ) : (
              <div className="skeleton card">
                <div className="m-3 xs:w-[180px] w-[300px] xs:h-[150px] h-[180px]" />
              </div>
            )
          }
          alt={image.tag}
          className={`w-full h-full ${
            loading ? "bg-gray-400" : ""
          }  rounded-md shadow-md`}
          effect="blur"
        />
      </div>
      <div
        className="grid bg-no-repeat bg-cover bg-center rounded-md shadow-md xs:hidden w-[300px] h-[200px] cursor-grab"
        style={{
          backgroundImage: `url(${image?.url})`,
          backgroundColor: "#bbb",
        }}
      />

      <div className="absolute flex items-center p-1 font-medium text-gray-800 lowercase rounded-lg left-4 top-4 bg-white/30 backdrop-blur-md">
        <span className="text-[13px] mr-[2px] mt-[2px]">
          <FaTags />
        </span>
        <small>{image.tag}</small>
      </div>
    </div>
  );
};

export default ImageCard;
