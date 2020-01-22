/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { memo } from 'react';

/*
*Next steps: Arbitrage of colors from EUI pallette
*/
const enum ColorTypes  {
  Warning="yellow",
  Danger="red",
  OK="hsla(83, 56%, 61%, 1)",
  Attention="orange",
  Enabled="blue",
  Disabled="grey",
}


//PaintServers: Where color pallettes and other similar concerns are exposed to the component
const PaintServers = memo(()=>
    <>
        <linearGradient id="OK_userSpaceNWtoSE_DarkenBy30"
                      x1="-50" y1="-50"
                      x2="50" y2="50"
                      spreadMethod="pad" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stop-color={ColorTypes.OK} stop-opacity="1"/>
            <stop offset="100%" stop-color={ColorTypes.OK} stop-opacity="1"/>
        </linearGradient>
    </>
)

//SymbolsAndShapes: defs that define shapes, masks and other spatial elements
const SymbolsAndShapes = memo(() => <>
    <mask id="node_icon_notches_1">
      <rect x="-20" y="-30" width="50" height="30" fill="#fff"></rect>
      <circle cx="6.5" cy="-7" r="1.15" fill="#000" paint-order="stroke"></circle>
    </mask>
    <mask id="node_icon_notches_2">
      <rect x="-20" y="-30" width="50" height="30" fill="#fff"></rect>
      <circle cx="6.5" cy="-7" r="1.15" fill="#000" paint-order="stroke"></circle>
      <circle cx="9.5" cy="-7" r="1.15" fill="#000" paint-order="stroke"></circle>
    </mask>
    <mask id="node_icon_notches_3">
      <rect x="-20" y="-30" width="50" height="30" fill="#fff"></rect>
      <circle cx="6.5" cy="-7" r="1.15" fill="#000" paint-order="stroke"></circle>
      <circle cx="9.5" cy="-7" r="1.15" fill="#000" paint-order="stroke"></circle>
      <circle cx="12.5" cy="-7" r="1.15" fill="#000" paint-order="stroke"></circle>
    </mask>
    <symbol id="node_icon" viewBox="-14 -4 29 8" preserveAspectRatio="xMidYMid meet">
        <polygon points="-1,-10  5,-13 21,-13 27,-10 21,-7  5,-7" stroke-width=".33" transform="translate(-12.5,10)"
            stroke="url(#OK_userSpaceNWtoSE_DarkenBy30)" fill="url(#OK_userSpaceNWtoSE_DarkenBy30)" fill-opacity=".1"/>
        <polygon points="-1,-10  5,-13 21,-13 27,-10 21,-7  5,-7" stroke-width=".33" transform="translate(-12.5,10)"
            stroke="transparent" fill="#000" fill-opacity=".3"/>
    </symbol>
    <symbol id="node_icon_1_notch" viewBox="-14 -4 29 8" preserveAspectRatio="xMidYMid meet">
        <polygon mask="url(#node_icon_notches_1)" points="-1,-10  5,-13 21,-13 27,-10 21,-7  5,-7" stroke-width=".33" transform="translate(-12.5,10)"
            stroke="url(#OK_userSpaceNWtoSE_DarkenBy30)" fill="url(#OK_userSpaceNWtoSE_DarkenBy30)" fill-opacity=".1"/>
        <polygon mask="url(#node_icon_notches_1)" points="-1,-10  5,-13 21,-13 27,-10 21,-7  5,-7" stroke-width=".33" transform="translate(-12.5,10)"
            stroke="transparent" fill="#000" fill-opacity=".3"/>
    </symbol>
    <symbol id="node_icon_2_notch" viewBox="-14 -4 29 8" preserveAspectRatio="xMidYMid meet">
        <polygon mask="url(#node_icon_notches_2)" points="-1,-10  5,-13 21,-13 27,-10 21,-7  5,-7" stroke-width=".33" transform="translate(-12.5,10)"
            stroke="url(#OK_userSpaceNWtoSE_DarkenBy30)" fill="url(#OK_userSpaceNWtoSE_DarkenBy30)" fill-opacity=".1"/>
        <polygon mask="url(#node_icon_notches_2)" points="-1,-10  5,-13 21,-13 27,-10 21,-7  5,-7" stroke-width=".33" transform="translate(-12.5,10)"
            stroke="transparent" fill="#000" fill-opacity=".3"/>
    </symbol>
    <symbol id="node_icon_3_notch" viewBox="-14 -4 29 8" preserveAspectRatio="xMidYMid meet">
        <polygon mask="url(#node_icon_notches_3)" points="-1,-10  5,-13 21,-13 27,-10 21,-7  5,-7" stroke-width=".33" transform="translate(-12.5,10)"
            stroke="url(#OK_userSpaceNWtoSE_DarkenBy30)" fill="url(#OK_userSpaceNWtoSE_DarkenBy30)" fill-opacity=".1"/>
        <polygon mask="url(#node_icon_notches_3)" points="-1,-10  5,-13 21,-13 27,-10 21,-7  5,-7" stroke-width=".33" transform="translate(-12.5,10)"
            stroke="transparent" fill="#000" fill-opacity=".3"/>
    </symbol>
</>)

export const Defs = memo(() => <svg className="resolver_defs">
  <defs>
      <PaintServers/>
      <SymbolsAndShapes />
  </defs>
</svg>);