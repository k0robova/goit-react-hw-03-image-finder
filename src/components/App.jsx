import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesBySearch } from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    imageNameTwoQuery: '',
    page: 1,
    loading: false,
    error: false,
    loadMore: false,
    isShowModal: false,
    largeImageURL: '',
  };

  handleSearchFormSubmit = imageName => {
    if (this.state.imageNameTwoQuery === imageName) {
      // alert
      return;
    }
    this.setState({
      imageNameTwoQuery: imageName,
      page: 1,
      images: [],
      loadMore: false,
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
    // деструктуризація state
    if (
      this.state.page !== prevState.page ||
      this.state.imageNameTwoQuery !== prevState.imageNameTwoQuery
    ) {
      this.setState({ loading: true });
      try {
        const imagesData = await fetchImagesBySearch(
          this.state.imageNameTwoQuery,
          this.state.page
        );
        if (imagesData.hits.length !== 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...imagesData.hits],
            loadMore: this.state.page < Math.ceil(imagesData.totalHits / 12),
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
  }

  handleImageClick = image => {
    this.setState({
      isShowModal: true,
      largeImageURL: image.largeImageURL,
    });
  };

  handleModalClose = () => {
    this.setState({
      isShowModal: false,
      largeImageURL: '',
    });
  };

  render() {
    const {
      images,
      imageNameTwoQuery,
      loading,
      loadMore,
      isShowModal,
      largeImageURL,
    } = this.state;
    return (
      <div>
        <Searchbar onHandleSearchFormSubmit={this.handleSearchFormSubmit} />

        {!imageNameTwoQuery && <h2>You can try to find something!</h2>}

        {/* {loading && <h2>Loading...</h2>} */}

        {loading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}

        <ImageGallery
          items={images}
          loading={loading}
          onImageClick={this.handleImageClick}
        />

        {images.length > 0 && loadMore && (
          <Button onClick={this.handleLoadMore} />
        )}

        {isShowModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleModalClose}
          />
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
