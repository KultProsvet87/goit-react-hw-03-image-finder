import { Notify } from 'notiflix';
import { searchApi } from './API';

export async function getGallerydData(params) {
  try {
    const res = await searchApi.get('', { params });
    return res.data;
  } catch (err) {
    Notify.failure('Something went wrong');
    return;
  }
}

export const searchParams = {
  q: null,
  page: 1,
  per_page: 12,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};
