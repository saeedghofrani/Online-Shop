import * as mongoose from 'mongoose';
import { MongooseConstant } from '../../../common/constants/mongoose.constant';

export const databaseProviders = [
  {
    provide: MongooseConstant,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/nest'),
  },
];
