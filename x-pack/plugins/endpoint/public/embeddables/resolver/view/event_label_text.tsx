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
    adjustAtWidth,
  }: {
    eventName: string;
    ellipsisAtUTFCharNum: number;
    x: number;
    y: number;
    fill: string;
    labelId: string;
    adjustAtWidth?: number;
  }) => {
    const eventNameUTFChars = ((eventName || '').match(/./gu) || []);
    const eventNameUTFLength = eventNameUTFChars.length;
    const eventNameOverflow = eventNameUTFLength >= ellipsisAtUTFCharNum;
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
        textLength={adjustAtWidth}
        lengthAdjust={ adjustAtWidth ? 'spacingAndGlyphs' : undefined }
      >
        {eventNameUTFChars.slice(0, Math.max(0, ellipsisAtUTFCharNum - 3)).join('') + `…`}
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
