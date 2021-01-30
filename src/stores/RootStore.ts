import SessionStore from './SessionStore';
import FilmsStore from './FilmsStore';
import CommentsStore from './CommentsStore';

export default class RootStore {
  sessionStore: SessionStore;
  filmsStore: FilmsStore;
  commentsStore: CommentsStore;

  constructor() {
    this.sessionStore = new SessionStore();
    this.filmsStore = new FilmsStore();
    this.commentsStore = new CommentsStore();
  }
}
