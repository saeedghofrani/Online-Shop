import { DynamicModule, Module } from '@nestjs/common';
import { Client, ClientOptions } from '@elastic/elasticsearch';
import { ElasticSearchConstant } from '../../common/constants/elastic-search.constant';
import { ElasticSearchService } from './elastic-search.service';

@Module({})
export class ElasticSearchModule {
  static register(clientOptions: ClientOptions): DynamicModule {
    return {
      module: ElasticSearchModule,
      providers: [
        ElasticSearchService,
        {
          provide: ElasticSearchConstant,
          useFactory: () => {
            return new Client(clientOptions);
          },
        },
      ],
      global: true,
      exports: [
        ElasticSearchService,
        {
          provide: ElasticSearchConstant,
          useFactory: () => {
            return new Client(clientOptions);
          },
        },
      ],
    };
  }
}
