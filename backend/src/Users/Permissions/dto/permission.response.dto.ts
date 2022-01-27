export class PermissionResponseDto {
  readonly id?: number;
  readonly ownerId: number;
  readonly visitorId: number;

  constructor(data?) {
    if (data) {
      this.id = data.id;
      this.ownerId = data.ownerId;
      this.visitorId = data.visitorId;
    }
  }
}
