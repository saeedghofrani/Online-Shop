import { Logger } from '@nestjs/common';
import { join } from 'path';
import { ProfileEntity } from 'src/entities/AUTH/profile.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserEntity } from '../../../../entities/AUTH/user.entity';
import { RoleEntity } from '../../../../entities/AUTH/role.entity';
import { PermissionEntity } from 'src/entities/AUTH/permission.entity';
import { KycEntity } from '../../../../entities/AUTH/kyc.entity';

export const dbConfig = (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10) || 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: process.env.PG_SSL === 'true',
  entities: [
    UserEntity,
    ProfileEntity,
    RoleEntity,
    PermissionEntity,
    KycEntity,
  ],
  synchronize: process.env.PG_SYNCHRONIZE === 'true',
  dropSchema: false,
  migrationsRun: false,
  logging: false,
  migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
});

export default dbConfig;
