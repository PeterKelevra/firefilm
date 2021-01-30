import { makeAutoObservable } from 'mobx';

interface CommentsMap {
  [key: string]: Comment
}

class FilmsStore {

  comments: CommentsMap = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setComments(comments: CommentsMap) {
    this.comments = comments;
  }

  get commentsList(): Comment[] {
    console.log('comments', this.comments);
    return Object.keys(this.comments || {}).map(key => ({
      ...this.comments[key],
      uid: key
    }));
  }
}

export default FilmsStore;
