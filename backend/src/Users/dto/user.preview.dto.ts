export class UserPreviewDto {
  readonly id?: number;
  readonly username?: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
    }
  }
}
