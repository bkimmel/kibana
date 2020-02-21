/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';

import { useSourceContext } from '../../../containers/source';
import { useKibanaSpaceId } from '../../../utils/use_kibana_space_id';
import { LogEntryCategoriesModuleProvider } from './use_log_entry_categories_module';

export const LogEntryCategoriesPageProviders: React.FunctionComponent = ({ children }) => {
  const { sourceId, source } = useSourceContext();
  const spaceId = useKibanaSpaceId();

  return (
    <LogEntryCategoriesModuleProvider
      indexPattern={source ? source.configuration.logAlias : ''}
      sourceId={sourceId}
      spaceId={spaceId}
      timestampField={source ? source.configuration.fields.timestamp : ''}
    >
      {children}
    </LogEntryCategoriesModuleProvider>
  );
};
