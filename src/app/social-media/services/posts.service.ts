import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Post } from '../models/post.model';
import { DUMMY_POSTS } from './DUMMY_DATA';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  getPosts(): Observable<Post[]> {
    return of(DUMMY_POSTS).pipe(
      delay(1000)
    );
  }
}
