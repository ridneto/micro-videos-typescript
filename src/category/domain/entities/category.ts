import UniqueEntityId from '../../../@seedwork/value-objects/domain/unique-entity-id.vo'

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category {

  public readonly id: UniqueEntityId;

  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    this.id = id || new UniqueEntityId();
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  private set description(description: string) {
    this.props.description = description ?? null;
  }

  get is_active(): boolean | undefined {
    return this.props.is_active;
  }

  private set is_active(is_active: boolean) {
    this.props.is_active = is_active ?? true;
  }

  get created_at(): Date | undefined {
    return this.props.created_at;
  }
}
