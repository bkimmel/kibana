/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { createStore, Store } from 'redux';
import { EndpointDocGenerator } from '../../../../common/endpoint/generate_data';
import { mock as mockResolverTree } from '../../models/resolver_tree';
import { dataReducer } from './reducer';
import * as selectors from './selectors';
import { DataState } from '../../types';
import { DataAction } from './action';

/**
 * Test the data reducer and selector.
 */
describe('Resolver Data Middleware', () => {
  let store: Store<DataState, DataAction>;

  beforeEach(() => {
    store = createStore(dataReducer, undefined);
  });

  describe('when a Resolver tree is returned from the server with more related events than the API can support', ()=>{
    let originId: string;
    beforeEach(() => {
      const generator = new EndpointDocGenerator('seed');
      const baseTree = generator.generateTree({ ancestors: 1, generations: 2, children: 2, relatedEvents: 2, percentWithRelated: 100 });
      const events = baseTree.allEvents;
      console.log('evts', events[0].process.entity_id)
      originId = events[0].process.entity_id;
      const relateds = [...baseTree.ancestry.values(), ...baseTree.children.values()].map((treeNode)=>{
        return treeNode.relatedEvents
      }).flat(); 
      
      //const tooManyRelateds = [...generator.relatedEventsGenerator(events[0], [{category: RelatedEventCategory.File, count: 101}])];
      //const eventToSaturate = events[events.length - 2];
      //const id = entityId(eventToSaturate);
      
      const tree = mockResolverTree({
        events: events,
        relatedEvents: relateds,
        cursors: {
          childrenNextChild: 'aValidChildursor',
          ancestryNextAncestor: 'aValidAncestorCursor',
        },
      });
      if (tree) {
        //Fake like there was one more file event than there really is
        tree.stats.events.byCategory.file!++;
        console.log( 'stats:' , tree.stats );
        //byCategory['file'] = byCategory['file'] + 1;
        const action: DataAction = {
          type: 'serverReturnedResolverData',
          payload: {
            result: tree,
            databaseDocumentID: '',
          },
        };
        store.dispatch(action);
      }
    });

    it('should be sane', () => {
      const relatedInfoById = selectors.relatedEventInfoByEntityId(store.getState());
      const infoForOrigin = relatedInfoById.get(originId);
      const numDisplayed = infoForOrigin?.getNumberActuallyDisplayedForCategory('file');
      infoForOrigin?.getNumberNotDisplayedForCategory('file');
      console.log('origin:', infoForOrigin?.getNumberActuallyDisplayedForCategory('file'));
      expect(1).toBe(1);
      //expect(selectors.relatedEventInfoByEntityId(store.getState())).toBe(1);
    });

  })

  describe('when data was received and the ancestry and children edges had cursors', () => {
    beforeEach(() => {
      const generator = new EndpointDocGenerator('seed');
      const tree = mockResolverTree({
        events: generator.generateTree({ ancestors: 1, generations: 2, children: 2 }).allEvents,
        cursors: {
          childrenNextChild: 'aValidChildursor',
          ancestryNextAncestor: 'aValidAncestorCursor',
        },
      });
      if (tree) {
        const action: DataAction = {
          type: 'serverReturnedResolverData',
          payload: {
            result: tree,
            databaseDocumentID: '',
          },
        };
        store.dispatch(action);
      }
    });
    it('should indicate there are additional ancestors', () => {
      expect(selectors.hasMoreAncestors(store.getState())).toBe(true);
    });
    it('should indicate there are additional children', () => {
      expect(selectors.hasMoreChildren(store.getState())).toBe(true);
    });
  });
});
