export class UserPreviewDto {
  readonly id?: number;

  readonly username?: string;

  readonly email?: string;

  readonly status?: string;

  readonly password?: string;

  // photo

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
    }
  }
}
