export class PermissionResponseDto {
  readonly id?: number;
  readonly ownerId: number;
  readonly visitorId: number;

  constructor(data?) {
    if (data) {
      this.ownerId = data.ownerId;
      this.visitorId = data.visitorId;
    }
  }
}
