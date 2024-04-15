import { Repository } from 'typeorm';
import { UserEntity } from 'src/features/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  public findFlatByEmail(
    email: string,
    ...includeHiddenColumns: string[]
  ): Promise<UserEntity> {
    const query = this.createQueryBuilder('u').where({ email });
    includeHiddenColumns?.forEach((columnKey) =>
      query.addSelect('u.' + columnKey),
    );
    return query.getOne();
  }
}
