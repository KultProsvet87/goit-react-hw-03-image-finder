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
  };

  toggleLoading = () => {
    this.setState(prev => {
      return { isLoading: !prev.isLoading };
    });
  };

  handleSubmite = async query => {
    await this.setState({ galleryItems: [], maxPages: 1 });
    searchParams.q = query;
    searchParams.page = 1;
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
    const maxPages = Math.ceil(res?.totalHits / searchParams.per_page);
    this.setState({ maxPages, galleryItems: [...res?.hits] });

    Notify.success(`Hooray! We found ${res.totalHits} images.`);
  };

  handleLoadMore = async () => {
    searchParams.page += 1;
    this.toggleLoading();
    const res = await getGallerydData(searchParams);
    this.toggleLoading();
    this.setState(prev => {
      return { galleryItems: [...prev.galleryItems, ...res.hits] };
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
