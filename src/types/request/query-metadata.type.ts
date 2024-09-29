export interface QueryMetadata {
  where?: any;
  take?: number;
  skip?: number;
  orderBy?: any[];
}

export enum QueryWithOrder {
  ASC = 'asc',
  DESC = 'desc',
}
