import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesBySearch } from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    imageNameTwoQuery: '',
    page: 1,
    loading: false,
    error: false,
    loadMore: false,
  };

  handleSearchFormSubmit = imageName => {
    this.setState({ imageNameTwoQuery: imageName, page: 1, images: [] });
    fetchImagesBySearch({
      searchQuery: this.state.imageNameTwoQuery,
      page: this.state.page,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.imageNameTwoQuery !== prevState.imageNameTwoQuery
    )
      try {
        this.setState({ loading: true });
        // щоб очищувати стейт перед новим запитом
        this.setState({ loading: true });
        const imagesData = await fetchImagesBySearch({
          searchQuery: this.state.imageNameTwoQuery,
          page: this.state.page,
        });
        if (imagesData.hits.length !== 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...imagesData.hits],
            // loadMore: this.state.page < Math.ceil(imagesData.totalHits / 12),
            loadMore: prevState.page < Math.ceil(imagesData.totalHits / 12),
          }));
        } else if (imagesData.hits.length === 0) {
          toast.error('No images found! Please try a different search.');
        }
      } catch (error) {
        this.setState({ error: true, images: [] });
        toast.error(
          'Oops! Something went wrong! Please try reloading this page!'
        );
      } finally {
        this.setState({ loading: false });
      }
  }

  render() {
    const { images, imageNameTwoQuery, loading, loadMore } = this.state;
    return (
      <div>
        <Searchbar onHandleSearchFormSubmit={this.handleSearchFormSubmit} />
        {!imageNameTwoQuery && <h2>You can try to find something!</h2>}
        {loading && <h2>Loading...</h2>}
        <ImageGallery items={images} />
        {images.length > 0 && loadMore && (
          <Button onClick={this.handleLoadMore} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
