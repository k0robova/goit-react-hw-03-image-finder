import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ items, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          item={item}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
};
