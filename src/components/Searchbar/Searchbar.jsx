import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export class Searchbar extends React.Component {
  state = {
    imageName: '',
  };

  handleSearchName = evt => {
    this.setState({ imageName: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmitForm = evt => {
    evt.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast.error('Type something in the search field !');
      return;
    }

    this.props.onHandleSearchFormSubmit(this.state.imageName);
    this.setState({ imageName: '' });
    // this.resetForm();
  };

  //   resetForm = () => {
  //     this.setState({
  //       imageName: '',
  //     });
  //   };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmitForm}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchName}
            value={this.state.imageName}
          />
          <button type="submit" className={css.button_search}>
            <span className="button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}
