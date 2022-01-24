export class UserProfileDto {
  readonly id?: number;

  readonly username?: string;

  readonly email?: string;

  readonly status?: string;

  readonly password?: string;

  readonly createdAt?: Date;

  // photo

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
      this.email = data.email;
      this.createdAt = data.createdAt;
      this.status = data.status;
    }
  }
}
