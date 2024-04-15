import environment from 'environments/environment';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dbdatasource: DataSourceOptions = {
  type: 'postgres',
  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.user,
  password: environment.database.password,
  database: environment.database.name,
  synchronize: environment.database.synchronize,
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  migrationsTableName: 'pic_manager_migrations',
  logging: environment.database.loggers,
  logger: 'advanced-console',
};

const dataSource = new DataSource(dbdatasource);
export default dataSource;
