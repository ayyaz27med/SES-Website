import PlaceholderImage from "../public/images/home-categories/placeholder-image.png";

const safeImage = (src) => {
  if (!src || src === "" || src === " ") {
    return PlaceholderImage;
  }
  return src;
};

export default safeImage;