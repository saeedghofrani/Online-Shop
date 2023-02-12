import { Inject, Injectable } from '@nestjs/common';
import { ElasticSearchConstant } from '../../common/constants/elastic-search.constant';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticSearchService {
  constructor(@Inject(ElasticSearchConstant) private elasticClient: Client) {}
}
