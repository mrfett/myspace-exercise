import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
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

  postsSubject = new BehaviorSubject<Post[]>([
    {
      postTitle: "First Post!",
      postText: "This is my first post.",
      postDate: new Date("8-23-1978")
    },
    {
      postTitle: "Second Post!",
      postText: `I travel through time.
      I can travel in all sorts of crazy ways, but I will take you back to something that happened over 10 years ago on a Tuesday morning.
      You're going to need to shut your brain off.
      Are you ready?
      Alright, go to 1996.
      I go into my first job at the Veejay Hotel in Baltimore, Maryland.`,
      postDate: new Date("8-1-80")
    }
  ]);
  postList$ = this.postsSubject.asObservable();

  postListWithRotation$ = this.postList$.pipe(
    map((rotatedPosts: []) =>
      rotatedPosts.map((post: Post) => {
        console.log("Post", post);
        return {
          ...post,
          rotation: Math.random() * this.rotationScale - this.rotationScale / 2
        };
      })
    )
  );

  rotationScale = 14;

  addPost = (newPost: Post) => {
    const newPosts = [...this.postsSubject.getValue(), newPost];
    this.postsSubject.next(newPosts);
  };

  // constructor() { }

  ngOnInit(): void {}
}
