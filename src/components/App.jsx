import { Component } from 'react';
import { Notify } from 'notiflix';

import { SearchBar } from './SearchBar/SearchBar';
import { getGallerydData, searchParams } from './API/getGalleryData';
import { Loading } from './loading/Loading';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ButtonTypes } from './Button/ButtonTypes';

export class App extends Component {
  state = {
    galleryItems: [],
    isLoading: false,
    maxPages: 1,
    page: 1,
    query: '',
    isSubmite: false,
  };

  async componentDidUpdate(pProps, pState) {
    if (pState.page !== this.state.page || pState.query !== this.state.query) {
      searchParams.q = this.state.query;
      searchParams.page = this.state.page;

      this.toggleLoading();
      const res = await getGallerydData(searchParams);
      this.toggleLoading();

      if (!res) return;

      if (!res.hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      const maxPages = Math.ceil(res.totalHits / searchParams.per_page);

      this.setState(prev => ({
        maxPages,
        galleryItems: [...prev.galleryItems, ...res.hits],
      }));

      if (this.state.isSubmite) {
        Notify.success(`Hooray! We found ${res.totalHits} images.`);
      }
    }
  }

  toggleLoading = () => {
    this.setState(prev => {
      return { isLoading: !prev.isLoading };
    });
  };

  handleSubmite = query => {
    this.setState({
      galleryItems: [],
      maxPages: 1,
      page: 1,
      isSubmite: true,
      query,
    });
  };

  handleLoadMore = () => {
    this.setState(prev => {
      return { page: prev.page + 1, isSubmite: false };
    });
  };

  render() {
    return (
      <>
        <SearchBar
          handleSubmite={this.handleSubmite}
          isLoading={this.state.isLoading}
        />
        {this.state.galleryItems.length > 0 && (
          <ImageGallery galleryItems={this.state.galleryItems} />
        )}
        {this.state.isLoading && <Loading />}
        {this.state.maxPages > 1 && searchParams.page < this.state.maxPages && (
          <Button onClick={this.handleLoadMore} {...ButtonTypes.loadMore} />
        )}
      </>
    );
  }
}
