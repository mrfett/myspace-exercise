import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, merge, of, ReplaySubject } from "rxjs";
import { Post } from "../post";
import { map } from "rxjs/operators";

@Component({
  selector: ".posts-list-component",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.css"]
})
export class PostsListComponent implements OnInit {
  testPost: Post = {
    postTitle: "Test Post!",
    postText: "This is just a test.",
    postDate: new Date()
  };

  existingPosts$ = of(1, 2, 3, 4);

  existingPostsObserver = {
    next: (x: number) => console.log("Observer got a next value: " + x),
    error: (err: string) => console.error("Observer got an error: " + err),
    complete: () => console.log("Observer got a complete notification")
  };
  newPostsSubject = new BehaviorSubject([]);
  newPostsAction = this.newPostsSubject.asObservable();

  postListTest$ = merge(this.existingPosts$, this.newPostsAction).subscribe();

  postsSubject = new ReplaySubject();
  postList$ = this.postsSubject.asObservable();

  postListWithRotation$ = this.postList$.pipe(
    map((rotatedPost: {}) => {
      const newPostWithRotation = { ...rotatedPost, rotation: 5 };
      return newPostWithRotation;
    })
  );

  rotationScale = 14;

  addPost = (newPost: Post) => {
    // const newPosts = [...this.postsSubject.getValue(), newPost];
    this.postsSubject.next(newPost);
  };

  constructor() {
    this.existingPosts$.subscribe(this.existingPostsObserver);
  }

  ngOnInit(): void {
    this.postsSubject.next([
      {
        postTitle: "Second Post!",
        postText: "This is my second post.",
        postDate: new Date("8-23-1978")
      },
      {
        postTitle: "First Post!",
        postText: "This is my first post.",
        postDate: new Date("8-23-1978")
      }
    ]);
  }
}
