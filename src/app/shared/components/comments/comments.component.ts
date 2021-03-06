import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from '../../../core/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  commentCtrl!: FormControl;
  @Input() comments!: Comment[];
  @Output() commentSubmitted = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
  }

  createComment(commentText: string): Comment {
    const newId = [...this.comments].sort((a, b) => a.id - b.id)[this.comments.length -1].id + 1;
    return {
      id: newId,
      comment: commentText,
      createdDate: new Date().toISOString(),
      userId: 1
    };
  }

  onLeaveComment(): void {
    if (this.commentCtrl.invalid) {
      return;
    }
    this.comments.unshift(this.createComment(this.commentCtrl.value));
    this.commentSubmitted.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  getFormError(): string {
    if (this.commentCtrl.hasError('required')) {
      return 'Vous devez écrire quelque chose !'
    } else if (this.commentCtrl.hasError('minlength')) {
      return 'Votre commentaire doit faire au moins 10 caractères.'
    } else {
      return 'Erreur inconnue !';
    }
  }
}
