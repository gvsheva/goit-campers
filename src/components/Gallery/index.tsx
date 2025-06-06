import React, { useState } from "react";
import css from "./Gallery.module.css";
import type { GalleryImage } from "../../types/camper";
import Image from "../Image";
import { FaAngleLeft, FaAngleRight, FaTimes } from "react-icons/fa";

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [index, setIndex] = useState<number | null>(null);

  const close = () => setIndex(null);
  const showPrev = () =>
    index !== null &&
    setIndex((prev) => (prev! - 1 + images.length) % images.length);
  const showNext = () =>
    index !== null && setIndex((prev) => (prev! + 1) % images.length);

  return (
    <>
      <div className={css.grid}>
        {images.map((img, i) => (
          <button
            key={img.thumb}
            className={css.thumbButton}
            onClick={() => setIndex(i)}
          >
            <Image src={img.thumb} alt="" className={css.thumb} />
          </button>
        ))}
      </div>

      {index !== null && (
        <div className={css.modal} onClick={close}>
          <div className={css.modalBackdrop} />
          <div
            className={css.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].original}
              alt=""
              className={css.fullImage}
            />
            <button className={css.closeButton} onClick={close}>
              <FaTimes />
            </button>
            <button className={css.navLeft} onClick={showPrev}>
              <FaAngleLeft />
            </button>
            <button className={css.navRight} onClick={showNext}>
              <FaAngleRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
