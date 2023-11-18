import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ onImageClick, item }) => {
  const { webformatURL, tags } = item;

  return (
    <li className={css.image_gallery_item} onClick={() => onImageClick(item)}>
      <img
        className={css.image_gallery_item_image}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};
