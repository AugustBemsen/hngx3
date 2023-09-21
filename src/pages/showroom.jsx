import { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { AppContext } from "../context/AppContext";

import ImageCard from "../components/card";
import Navbar from "../components/navbar";

const Gallery = () => {
  const { data, loading, user, query, setQuery } = useContext(AppContext);

  useEffect(() => {
    if (!user) {
      window.location.replace("/");
    }
  }, [user]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [images, setImages] = useState(data);

  // Check if touch events are supported
  const isTouchDevice = isMobile;

  const originalImages = data;

  // drag and drop functions for desktop
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  document.addEventListener("dragover", handleDragOver, { passive: false });

  const handleDrop = (e, targetItem) => {
    if (!draggedItem || draggedItem.id === targetItem.id) {
      return;
    }

    //item index
    const updatedItems = [...images];
    const draggedIndex = updatedItems.findIndex(
      (item) => item.id === draggedItem.id
    );
    const targetIndex = updatedItems.findIndex(
      (item) => item.id === targetItem.id
    );

    const temp = updatedItems[draggedIndex];
    updatedItems[draggedIndex] = updatedItems[targetIndex];
    updatedItems[targetIndex] = temp;

    setImages(updatedItems);
    setDraggedItem(null);
  };

  // drag and drop functions for mobile
  const handleTouchStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleTouchMove = (e) => {
    if (!draggedItem) return;

    const touchY = e.touches[0].clientY;
    const newIndex = calculateNewIndexBasedOnTouchPosition(touchY);

    //get the index being moved
    if (newIndex !== -1) {
      const newItems = [...images];
      const oldIndex = images.indexOf(draggedItem);
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, draggedItem);
      setImages(newItems);
    }
  };

  const handleTouchEnd = (e) => {
    if (draggedItem && e.touches && e.touches.length > 0) {
      // Calculate the new index based on touch position
      const newIndex = calculateNewIndexBasedOnTouchPosition(
        e.touches[0].clientY
      );

      // Update the images state accordingly
      const newItems = [...images];
      const oldIndex = images.indexOf(draggedItem);
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, draggedItem);
      setImages(newItems);
    }
    setDraggedItem(null);
  };

  const calculateNewIndexBasedOnTouchPosition = (touchY) => {
    // Calculate the index based on the Y-coordinate of the touch position
    const itemHeight = 50; // Height of each item
    const newIndex = Math.floor(touchY / itemHeight);
    return newIndex;
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value.toLowerCase();

    // Filter the images based on the query
    const filteredImages = originalImages.filter((image) =>
      image.tag.toLowerCase().includes(newQuery)
    );

    // Update the query and images
    setQuery(newQuery);
    setImages(filteredImages);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-3 pt-3 pb-1 ">
        <div className=" sm:w-[60%] xs:w-[80%] w-full">
          <input
            type="search"
            value={query}
            onChange={handleInputChange}
            className="p-2 h-[60px] outline-none w-full  bg-slate-50 rounded-lg my-6 shadow-sm border"
            placeholder="Search by tags: e.g nature, landscape..."
          />
        </div>
      </div>

      <div className="flex items-center justify-center w-full bg-slate-50">
        <div className="p-4 card xs:bg-white border my-10 py-10 sm:w-[90%] xs:w-[95%] w-full">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : images.length ? (
            isTouchDevice ? (
              <div
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ userSelect: "none" }}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    onTouchStart={(e) => handleTouchStart(e, image)}
                    style={{
                      cursor: "grab",
                      padding: "10px",
                      backgroundColor: draggedItem === image ? "dragging" : "",
                    }}
                  >
                    <ImageCard image={image} index={index} loading={loading} />
                  </div>
                ))}
              </div>
            ) : (
              images.map((image, index) => (
                <div
                  key={index}
                  className={`item ${
                    draggedItem && draggedItem.id === image.id ? "dragging" : ""
                  }`}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, image)}
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, image)}
                >
                  <ImageCard image={image} index={index} />
                </div>
              ))
            )
          ) : (
            <div>No results found for your query</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;
