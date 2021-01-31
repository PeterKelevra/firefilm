import { makeAutoObservable } from 'mobx';
import { Film } from '../domain/Film';
import { map, sortBy } from 'lodash';

interface FilmsMap {
  [key: string]: Film
}

class FilmsStore {

  film: Film = undefined;
  films: FilmsMap = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setFilm(film?: Film) {
    this.film = { ...film };
  }

  setFilms(films: FilmsMap) {
    this.films = films;
  }

  get filmsList(): Film[] {
    console.log('filmsList', this.films);
    return sortBy(map(this.films || {}, (value, uid) => ({
      ...value, uid
    })), 'year');
  }
}

export default FilmsStore;
