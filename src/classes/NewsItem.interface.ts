export interface NewsItemInterface {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly createdAt: number;
  readonly updatedAt: number;
}

export interface NewsItemResponseInterface {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly image_url: string;
  readonly created_at: number;
  readonly updated_at: number;
}
