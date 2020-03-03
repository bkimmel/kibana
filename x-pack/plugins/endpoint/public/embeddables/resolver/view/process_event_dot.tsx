/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import styled from 'styled-components';
import { i18n } from '@kbn/i18n';
import { applyMatrix3 } from '../lib/vector2';
import { Vector2, ProcessEvent, Matrix3 } from '../types';
import { SymbolIds, NamedColors, PaintServerIds } from './defs';
import { LegacyEndpointEvent } from '../../../../common/types';

const nodeAssets = {
  runningProcessCube: {
    cubeSymbol: `#${SymbolIds.runningProcessCube}`,
    labelFill: `url(#${PaintServerIds.runningProcess})`,
    descriptionFill: NamedColors.activeNoWarning,
    labelText: i18n.translate('xpack.endpoint.resolver.runningProcess', {
      defaultMessage: 'Running Process',
    }),
  },
  runningTriggerCube: {
    cubeSymbol: `#${SymbolIds.runningTriggerCube}`,
    labelFill: `url(#${PaintServerIds.runningTrigger})`,
    descriptionFill: NamedColors.activeWarning,
    labelText: i18n.translate('xpack.endpoint.resolver.runningProcess', {
      defaultMessage: 'Running Process',
    }),
  },
  terminatedProcessCube: {
    cubeSymbol: `#${SymbolIds.terminatedProcessCube}`,
    labelFill: NamedColors.fullLabelBackground,
    descriptionFill: NamedColors.inertDescription,
    labelText: i18n.translate('xpack.endpoint.resolver.terminatedProcess', {
      defaultMessage: 'Terminated Process',
    }),
  },
  terminatedTriggerCube: {
    cubeSymbol: `#${SymbolIds.terminatedTriggerCube}`,
    labelFill: NamedColors.fullLabelBackground,
    descriptionFill: NamedColors.inertDescription,
    labelText: i18n.translate('xpack.endpoint.resolver.terminatedProcess', {
      defaultMessage: 'Terminated Process',
    }),
  },
};

/**
 * A placeholder view for a process node.
 */
export const ProcessEventDot = styled(
  React.memo(
    ({
      className,
      position,
      event,
      projectionMatrix,
    }: {
      /**
       * A `className` string provided by `styled`
       */
      className?: string;
      /**
       * The positon of the process node, in 'world' coordinates.
       */
      position: Vector2;
      /**
       * An event which contains details about the process node.
       */
      event: LegacyEndpointEvent;
      /**
       * projectionMatrix which can be used to convert `position` to screen coordinates.
       */
      projectionMatrix: Matrix3;
    }) => {
      /**
       * Convert the position, which is in 'world' coordinates, to screen coordinates.
       */
      const [left, top] = applyMatrix3(position, projectionMatrix);

      const [magFactorX] = projectionMatrix;

      const nodeViewportStyle = {
        left: `${left}px`,
        top: `${top}px`,
        width: `${360 * magFactorX}px`,
        height: `${120 * magFactorX}px`,
        transform: `translateX(-${0.172413 * 360 * magFactorX + 10}px) translateY(-${0.73684 *
          120 *
          magFactorX}px)`,
      };

      const markerBaseSize = 15;
      const markerSize = (magFactor: number) => {
        return markerBaseSize;
      };

      const markerPositionOffset = (magFactor: number) => {
        return -markerBaseSize / 2;
      };

      const labelYOffset = (magFactor: number) => {
        return markerPositionOffset(magFactorX) + 0.25 * markerSize(magFactorX) - 0.5;
      };

      const labelYHeight = (magFactor: number) => {
        return markerSize(magFactorX) / 1.7647;
      };

      const nodeType = ((nodeData: any) => {
        if (nodeData.event_subtype_full === 'already_running') {
          return typeof nodeData.attack_references === 'undefined'
            ? 'runningProcessCube'
            : 'runningTriggerCube';
        } else {
          return typeof nodeData.attack_references === 'undefined'
            ? 'terminatedProcessCube'
            : 'terminatedTriggerCube';
        }
      })(event?.data_buffer);

      const { cubeSymbol, labelFill, descriptionFill, labelText } = nodeAssets[nodeType];

      return (
        <svg
          className={className}
          style={nodeViewportStyle}
          viewBox="-15 -15 90 30"
          preserveAspectRatio="xMidYMid meet"
          role="treeitem"
          aria-level={event.data_buffer.depth}
        >
          <use
            role="presentation"
            xlinkHref={cubeSymbol}
            x={markerPositionOffset(magFactorX)}
            y={markerPositionOffset(magFactorX)}
            width={markerSize(magFactorX)}
            height={markerSize(magFactorX)}
            opacity="1"
          />
          <use
            role="presentation"
            xlinkHref={`#${SymbolIds.processNode}`}
            x={markerPositionOffset(magFactorX) + markerSize(magFactorX) - 0.5}
            y={labelYOffset(magFactorX)}
            width={(markerSize(magFactorX) / 1.7647) * 5}
            height={markerSize(magFactorX) / 1.7647}
            opacity="1"
            fill={labelFill}
          />
          <text
            x={markerPositionOffset(magFactorX) + 0.7 * markerSize(magFactorX) + 50 / 2}
            y={labelYOffset(magFactorX) + labelYHeight(magFactorX) / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="3.75"
            fontWeight="bold"
            fill={NamedColors.empty}
            paintOrder="stroke"
            tabIndex={-1}
            style={{ letterSpacing: '-0.02px' }}
          >
            {event?.data_buffer?.process_name}
          </text>
          <text
            x={markerPositionOffset(magFactorX) + markerSize(magFactorX)}
            y={labelYOffset(magFactorX) - 1}
            textAnchor="start"
            dominantBaseline="middle"
            fontSize="2.67"
            fill={descriptionFill}
            paintOrder="stroke"
            fontWeight="bold"
            style={{ textTransform: 'uppercase', letterSpacing: '-0.01px' }}
          >
            {labelText}
          </text>
        </svg>

      );
    }
  )
)`
  position: absolute;
  display: block;

  text-align: left;
  font-size: 10px;
  user-select: none;
  box-sizing: border-box;
  border-radius: 10%;
  padding: 4px;
  white-space: nowrap;
  contain: strict;
  will-change: left, top, width, height;
`;
