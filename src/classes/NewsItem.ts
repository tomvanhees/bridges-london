import {
  NewsItemInterface,
  NewsItemResponseInterface
} from "@/classes/NewsItem.interface";

export class NewsItem implements NewsItemInterface {
  readonly id: number;
  readonly description: string;
  readonly imageUrl: string;
  readonly title: string;
  readonly createdAt: number;
  readonly updatedAt: number;

  maxDesciptionLength = 100;

  constructor(news: NewsItemResponseInterface) {
    this.id = news.id;
    this.title = news.title;
    this.description = news.description;
    this.imageUrl = news.image_url;
    this.createdAt = news.created_at;
    this.updatedAt = news.updated_at;
  }

  get formattedCreatedAt(): string {
    const dateArray = this.formatDate(this.createdAt);
    return `${dateArray[0]} ${dateArray[1]}/${dateArray[2]}/${dateArray[3]} - ${dateArray[4]}:${dateArray[5]}`;
  }

  get formattedUpdatedAt(): string {
    const dateArray = this.formatDate(this.createdAt);
    return `${dateArray[1]}/${dateArray[2]}/${dateArray[3]} om ${dateArray[4]}:${dateArray[5]}`;
  }

  /**
   * Formats a date in usable parameters for later use
   * @param date
   * @private
   */
  private formatDate(
    date: number
  ): [string, number, number, number, number, number] {
    const weekdays = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
    const dateObject = new Date(date * 1000);

    const day = weekdays[dateObject.getDay()];
    const dayOfMonth = dateObject.getDate();
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    return [day, dayOfMonth, month, year, hours, minutes];
  }


  get hasBeenUpdated(): boolean {
    return this.createdAt !== this.updatedAt;
  }

  get truncatedDescription(): string {
    if (this.description.length > this.maxDesciptionLength) {
      return this.description.substr(0, this.maxDesciptionLength) + " ...";
    } else {
      return this.description;
    }
  }

  /**
   * Checks if the image is available, if not returns a default image.
   */
  async getimageUrl() {
    let url = process.env.VUE_APP_BASE_URL + this.imageUrl;

    const ImagePromise = new Promise(function(resolve, reject) {
      const image = new Image();
      image.addEventListener("load", resolve);
      image.addEventListener("error", reject);
      image.src = url;
    });

    await ImagePromise.catch(() => {
      url = require("../assets/images/logo.svg");
    });

    return url;
  }
}
