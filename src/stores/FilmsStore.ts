import { makeAutoObservable } from 'mobx';
import { Film } from '../domain/Film';

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
    return Object.keys(this.films || {}).map(key => ({
      ...this.films[key],
      uid: key
    }));
  }
}

export default FilmsStore;
