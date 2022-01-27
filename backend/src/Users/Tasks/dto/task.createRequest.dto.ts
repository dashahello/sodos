import { Length, IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class TaskCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  readonly description: string;

  readonly done: boolean;

  ownerId: number;

  authorId: number;

  modifierId: number | null;
}
