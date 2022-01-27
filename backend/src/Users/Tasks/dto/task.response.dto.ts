export class TaskResponseDto {
  readonly id?: number;
  readonly title?: string;
  readonly description?: string;
  readonly done?: boolean;
  readonly ownerId?: number;
  readonly authorId?: number;
  readonly modifierId?: number | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(data?) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.done = data.done;
      this.ownerId = data.ownerId;
      this.authorId = data.authorId;
      this.modifierId = data.modifierId || null;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
  }
}
