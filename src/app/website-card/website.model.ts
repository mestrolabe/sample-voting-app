export class Website {
    title!: string;
    link!: string;
    imgLink!: string;
    votes!: number;

    constructor( title: string, link: string, imgLink: string, votes?: number) {
        this.title = title;
        this.link = link;
        this.imgLink = imgLink;
        this.votes = votes || 0;
    }

    thumbsUp(): void {
        this.votes += 1;
    }
    thumbsDown(): void {
        this.votes -= 1;
    }
    domain(): string {
        try {
            const domainAndPath: string = this.link.split('//')[1];
            return domainAndPath.split('/')[0];
        } catch (err) {
            return null as any;
        }
    }
}