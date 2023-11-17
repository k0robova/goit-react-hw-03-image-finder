{
  /* <ul class="gallery">
  <!-- Набір <li> із зображеннями -->
</ul> */
}

export const ImageGallery = ({ items }) => {
  return (
    <ul className="gallery">
      {items.map(item => (
        <li className="gallery-item" key={item.id}>
          <img src={item.webformatURL} alt={item.tags} />
        </li>
      ))}
    </ul>
  );
};
