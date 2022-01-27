export class TaskResponseDto {
  readonly id?: number;
  readonly title?: string;
  readonly description?: string;
  readonly done?: boolean;
  readonly ownerId?: number;
  readonly authorId?: number;
  readonly modifierId?: number | null;

  constructor(data?) {
    if (data) {
      this.title = data.title;
      this.description = data.description;
      this.done = data.done;
      this.ownerId = data.ownerId;
      this.authorId = data.authorId;
      this.modifierId = data.modifierId || null;
    }
  }
}
