import { Component, OnInit } from '@angular/core';
import { Website } from './website-card/website.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  websites!: Website[];

  constructor() { }


  ngOnInit(): void {
    this.websites = [
      new Website(
        'Google',
        'https://www.google.com',
        'https://bit.ly/37dh3b2',
        10),
      new Website(
        'Angular',
        'https://www.angular.io',
        'https://bit.ly/3A15IqV',
        10
      ),
      new Website(
        'Youtube',
        'https://www.youtube.com',
        'https://bit.ly/379DSfN',
        10
      )
    ];
  }

  /* ახალი ვებსაიტის დამატება */
  addWebsite(title: HTMLInputElement, link: HTMLInputElement, img: HTMLInputElement, form: HTMLFormElement): boolean {
    if ((title.value && link.value && img.value) != '') {
      this.websites.push(new Website(title.value, link.value, img.value, 0));
      form.reset();
      console.log(`
      დაემატა ვებსაიტი:
      სათაური - ${title.value}
      ლინკი - ${link.value}
      სურათის ლინკი - ${img.value}
      `);
    }
    else {
      alert("შეავსეთ ყველა ველი.");
    }
    return false;
  }

  /* ვებსაიტების სორტირება ქულების მიხედვით */
  sortedWebsites(): Website[] {
    return this.websites.sort((a: Website, b: Website) => b.votes - a.votes);
  }
}