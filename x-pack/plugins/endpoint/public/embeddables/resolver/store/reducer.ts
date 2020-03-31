/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { Reducer, combineReducers } from 'redux';
import { animateProcessIntoView } from './methods';
import { cameraReducer } from './camera/reducer';
import { dataReducer } from './data/reducer';
import { ResolverState, ResolverAction, ResolverUIState } from '../types';

const uiReducer: Reducer<ResolverUIState, ResolverAction> = (
  uiState = { activeDescendentId: null, selectedDescendantId: null },
  action
) => {
  if (action.type === 'userFocusedOnResolverNode') {
    return {
      ...uiState,
      activeDescendentId: action.payload.nodeId,
    };
  } else if (action.type === 'userSelectedResolverNode') {
    return {
      ...uiState,
      selectedDescendantId: action.payload.nodeId,
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
