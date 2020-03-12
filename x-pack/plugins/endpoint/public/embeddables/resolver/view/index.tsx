/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import * as selectors from '../store/selectors';
import { EdgeLine } from './edge_line';
import { Panel } from './panel';
import { GraphControls } from './graph_controls';
import { ProcessEventDot } from './process_event_dot';
import { useCamera } from './use_camera';
import { SymbolDefinitions, NamedColors } from './defs';

const StyledPanel = styled(Panel)`
  position: absolute;
  left: 1em;
  top: 1em;
  max-height: calc(100% - 2em);
  overflow: auto;
  width: 25em;
  max-width: 50%;
`;

const StyledGraphControls = styled(GraphControls)`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const StyledResolverContainer = styled.div`
  display: flex;
  flex-grow: 1;
  contain: layout;
`;

const bgColor = NamedColors.resolverBackground;

export const Resolver = styled(
  React.memo(function Resolver({ className }: { className?: string }) {
    const { processNodePositions, edgeLineSegments } = useSelector(
      selectors.processNodePositionsAndEdgeLineSegments
    );

    const { processToAdjacencyMap } = useSelector(selectors.processAdjacencies);
    const activeId = useSelector(selectors.resolverActiveDescendantId);
    const activeDescendantAttribute = activeId
      ? {
          'aria-activedescendant': activeId,
        }
      : {};
    const { projectionMatrix, ref, onMouseDown } = useCamera();

    return (
      <div data-test-subj="resolverEmbeddable" className={className}>
        <StyledResolverContainer
          className="resolver-graph kbn-resetFocusState"
          onMouseDown={onMouseDown}
          ref={ref}
          role="tree"
          tabIndex={0}
          {...activeDescendantAttribute}
        >
          {edgeLineSegments.map(([startPosition, endPosition], index) => (
            <EdgeLine
              key={index}
              startPosition={startPosition}
              endPosition={endPosition}
              projectionMatrix={projectionMatrix}
            />
          ))}
          {Array.from(processNodePositions).map(([processEvent, position], index) => (
            <ProcessEventDot
              key={index}
              position={position}
              projectionMatrix={projectionMatrix}
              event={processEvent}
              adjacentNodeMap={processToAdjacencyMap.get(processEvent)}
            />
          ))}
        </StyledResolverContainer>
        <StyledPanel />
        <StyledGraphControls />
        <SymbolDefinitions />
      </div>
    );
  })
)`
  /**
   * Take up all availble space
   */
  &,
  .resolver-graph {
    display: flex;
    flex-grow: 1;
  }
  /**
   * The placeholder components use absolute positioning.
   */
  position: relative;
  /**
   * Prevent partially visible components from showing up outside the bounds of Resolver.
   */
  overflow: hidden;
  contain: strict;
  background-color: ${bgColor};
`;
