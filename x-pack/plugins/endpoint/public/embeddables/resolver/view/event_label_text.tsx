/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';

export const EventLabelText = React.memo(
  ({
    eventName,
    ellipsisAtUTFCharNum,
    x,
    y,
    fill,
    labelId,
  }: {
    eventName: string;
    ellipsisAtUTFCharNum: number;
    x: number;
    y: number;
    fill: string;
    labelId: string;
  }) => {
    const eventNameUTFlength = ((eventName || '').match(/./gu) || []).length;
    const eventNameOverflow = eventNameUTFlength >= ellipsisAtUTFCharNum;
    return eventNameOverflow ? (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="3.75"
        fontWeight="bold"
        fill={fill}
        paintOrder="stroke"
        tabIndex={-1}
        style={{ letterSpacing: '-0.02px' }}
        id={labelId}
        aria-label={eventName}
      >
        {eventName.slice(0, Math.max(0, ellipsisAtUTFCharNum - 3)) + `…`}
      </text>
    ) : (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="3.75"
        fontWeight="bold"
        fill={fill}
        paintOrder="stroke"
        tabIndex={-1}
        style={{ letterSpacing: '-0.02px' }}
        id={labelId}
      >
        {eventName}
      </text>
    );
  }
);
