import css from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button className={css.button_load_more} type="button" onClick={onClick}>
      Load more
    </button>
  );
};
