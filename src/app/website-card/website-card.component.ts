import { Component, Input, OnInit } from '@angular/core';
import { Website } from './website.model';

@Component({
  selector: 'website-card',
  templateUrl: './website-card.component.html',
  styleUrls: ['./website-card.component.css']
})
export class WebsiteCardComponent implements OnInit {

  @Input() website!: Website;

  constructor() { }

  ngOnInit(): void { }

  
  /*------- ფუნქციები -------*/

  thumbsUp(): void {
    this.website.thumbsUp();
  }
  thumbsDown(): void {
   this.website.thumbsDown();
  }
}
