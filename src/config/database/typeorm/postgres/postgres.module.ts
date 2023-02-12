import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConstant } from '../../../../common/constants/postgres.constant';

@Module({})
export class PostgresModule {
  static openConnection(options: DataSourceOptions): DynamicModule {
    const dataSourceCustomProvide: Provider = {
      provide: PostgresConstant,
      useFactory: async () => {
        const dataSource = new DataSource(options);
        return await dataSource.initialize();
      },
    };
    return {
      module: PostgresModule,
      providers: [dataSourceCustomProvide],
      global: true,
      exports: [dataSourceCustomProvide],
    };
  }
}
