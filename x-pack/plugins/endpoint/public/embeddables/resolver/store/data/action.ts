/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { ResolverEvent } from '../../../../../common/types';
import { RelatedEventDataEntry } from '../../types';

interface ServerReturnedResolverData {
  readonly type: 'serverReturnedResolverData';
  readonly payload: ResolverEvent[];
}

interface ServerFailedToReturnResolverData {
  readonly type: 'serverFailedToReturnResolverData';
}

/**
 * Will occur when a request for related event data is fulfilled.
 */
interface ServerReturnedRelatedEventData {
  readonly type: 'serverReturnedRelatedEventData';
  readonly payload: Map<ResolverEvent, RelatedEventDataEntry>;
}

export type DataAction =
  | ServerReturnedResolverData
  | ServerFailedToReturnResolverData
  | ServerReturnedRelatedEventData;
