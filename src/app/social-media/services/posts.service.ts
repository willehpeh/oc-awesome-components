import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [
    {
      id: 1,
      userId: 499,
      title: "You know when grown-ups tell you 'everything's going to be fine' and you think they're probably lying to make you feel better?",
      createdDate: "2020-08-17T12:56:35Z",
      imageUrl: undefined,
      content: "I'm the Doctor. Well, they call me the Doctor. I don't know why. I call me the Doctor too. I still don't know why. Saving the world with meals on wheels. Did I mention we have comfy chairs? I'm the Doctor, I'm worse than everyone's aunt. *catches himself* And that is not how I'm introducing myself.",
      comments: [
        {
          id: 1,
          userId: 744,
          comment: "You've swallowed a planet!",
          createdDate: "2021-06-14T02:34:36Z"
        },
        {
          id: 2,
          userId: 218,
          comment: "All I've got to do is pass as an ordinary human being",
          createdDate: "2021-09-06T14:33:19Z"
        },
        {
          id: 3,
          userId: 945,
          comment: "What could possibly go wrong?",
          createdDate: "2021-11-20T08:15:29Z"
        },
        {
          id: 4,
          userId: 919,
          comment: "Saving the world with meals on wheels.",
          createdDate: "2021-11-01T01:50:59Z"
        },
      ]
    },
    {
      id: 2,
      userId: 338,
      title: "I hate yogurt. It's just stuff with bits in.",
      createdDate: "2021-01-24T19:04:18Z",
      imageUrl: "https://picsum.photos/600/401",
      content: "Sorry, checking all the water in this area; there's an escaped fish. You've swallowed a planet! It's a fez. I wear a fez now. Fezes are cool. The way I see it, every life is a pile of good things and bad things.…hey.…the good things don't always soften the bad things; but vice-versa the bad things don't necessarily spoil the good things and make them unimportant.",
      comments: [
        {
          id: 5,
          userId: 971,
          comment: "I am the Doctor, and you are the Daleks!",
          createdDate: "2021-10-26T13:12:30Z"
        },
        {
          id: 6,
          userId: 681,
          comment: "No… It's a thing; it's like a plan, but with more greatness.",
          createdDate: "2021-10-18T18:46:16Z"
        },
        {
          id: 7,
          userId: 66,
          comment: "No, I'll fix it.",
          createdDate: "2021-04-16T21:39:32Z"
        },
      ]
    },
    {
      id: 3,
      userId: 947,
      title: "Bow ties are cool!",
      createdDate: "2020-03-14T14:55:03Z",
      imageUrl: "https://picsum.photos/600/400",
      content: "Come on Amy, I'm a normal bloke, tell me what normal blokes do! It's art! A statement on modern society, 'Oh Ain't Modern Society Awful?'! The way I see it, every life is a pile of good things and bad things.…hey.…the good things don't always soften the bad things; but vice-versa the bad things don't necessarily spoil the good things and make them unimportant.",
      comments: [
        {
          id: 8,
          userId: 342,
          comment: "I'm nobody's taxi service",
          createdDate: "2020-11-30T16:40:44Z"
        },
        { id: 9, userId: 966, comment: "I'm not gonna be there to catch you every time you feel like jumping out of a spaceship", createdDate: "2021-05-22T18:06:29Z" },
      ]
    },
    {
      id: 4,
      userId: 873,
      title: "Stop talking, brain thinking",
      createdDate: "2020-07-22T00:51:35Z",
      imageUrl: "https://picsum.photos/601/400",
      content: "You know how I sometimes have really brilliant ideas? Stop talking, brain thinking. Hush. All I've got to do is pass as an ordinary human being. Simple. What could possibly go wrong? All I've got to do is pass as an ordinary human being. Simple. What could possibly go wrong?\n\nSaving the world with meals on wheels. You hate me; you want to kill me! Well, go on! Kill me! KILL ME! You know how I sometimes have really brilliant ideas? Saving the world with meals on wheels. The way I see it, every life is a pile of good things and bad things.…hey.…the good things don't always soften the bad things; but vice-versa the bad things don't necessarily spoil the good things and make them unimportant.",
      comments: [
        {
          id: 10,
          userId: 483,
          comment: "Saving the world with meals on wheels.",
          createdDate: "2020-06-23T12:12:12Z"
        },
        { id: 11, userId: 975, comment: "Did I mention we have comfy chairs?", createdDate: "2021-10-08T22:10:06Z" },
        {
          id: 12,
          userId: 981,
          comment: "Annihilate? No. No violence.",
          createdDate: "2021-02-17T11:14:44Z"
        },
      ]
    },
    {
      id: 5,
      userId: 15,
      title: "You hit me with a cricket bat",
      createdDate: "2020-07-28T14:30:56Z",
      imageUrl: undefined,
      content: "The way I see it, every life is a pile of good things and bad things.…hey.…the good things don't always soften the bad things; but vice-versa the bad things don't necessarily spoil the good things and make them unimportant.\n\nAw, you're all Mr. Grumpy Face today. You hit me with a cricket bat. I'm nobody's taxi service; I'm not gonna be there to catch you every time you feel like jumping out of a spaceship. You hate me; you want to kill me! Well, go on! Kill me! KILL ME!\n\nIt's art! A statement on modern society, 'Oh Ain't Modern Society Awful?'! No… It's a thing; it's like a plan, but with more greatness. Stop talking, brain thinking. Hush. Saving the world with meals on wheels.",
      comments: []
    },
  ];

  getPosts(): Observable<Post[]> {
    return of(this.posts).pipe(
      delay(1000)
    );
  }
}
