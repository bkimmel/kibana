/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { Reducer, combineReducers } from 'redux';
import { htmlIdGenerator } from '@elastic/eui';
import { animateProcessIntoView } from './methods';
import { cameraReducer } from './camera/reducer';
import { dataReducer } from './data/reducer';
import { ResolverState, ResolverAction, ResolverUIState } from '../types';
import { uniquePidForProcess } from '../models/process_event';

const resolverNodeIdGenerator = htmlIdGenerator('resolverNode');

const uiReducer: Reducer<ResolverUIState, ResolverAction> = (
  uiState = { activeDescendantId: null, selectedDescendantId: null },
  action
) => {
  if (action.type === 'userFocusedOnResolverNode') {
    return {
      ...uiState,
      activeDescendantId: action.payload.nodeId,
    };
  } else if (action.type === 'userSelectedResolverNode') {
    return {
      ...uiState,
      selectedDescendantId: action.payload.nodeId,
    };
  } else if (action.type === 'userBroughtProcessIntoView') {
    const processNodeId = resolverNodeIdGenerator(uniquePidForProcess(action.payload.process));
    return {
      ...uiState,
      activeDescendantId: processNodeId,
    };
  } else {
    return uiState;
  }
};

const concernReducers = combineReducers({
  camera: cameraReducer,
  data: dataReducer,
  ui: uiReducer,
});

export const resolverReducer: Reducer<ResolverState, ResolverAction> = (state, action) => {
  const nextState = concernReducers(state, action);
  if (action.type === 'userBroughtProcessIntoView') {
    return animateProcessIntoView(nextState, action.payload.time, action.payload.process);
  } else {
    return nextState;
  }
};
