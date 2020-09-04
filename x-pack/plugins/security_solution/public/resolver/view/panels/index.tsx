/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */

import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import { NodeEventsOfType } from './node_events_of_type';
import { NodeEvents } from './node_events';
import { NodeDetail } from './node_details';
import { NodeList } from './node_list';
import { EventDetail } from './event_detail';
import { PanelViewAndParameters } from '../../types';

/**
 *
 * This component implements the strategy laid out above by determining the "right" view and doing some other housekeeping e.g. effects to keep the UI-selected node in line with what's indicated by the URL parameters.
 *
 * @returns {JSX.Element} The "right" table content to show based on the query params as described above
 */
export const PanelRouter = memo(function () {
  const params: PanelViewAndParameters = useSelector(selectors.panelViewAndParameters);
  if (params.panelView === 'nodeDetail') {
    return <NodeDetail nodeID={params.panelParameters.nodeID} />;
  } else if (params.panelView === 'nodeEvents') {
    return <NodeEvents nodeID={params.panelParameters.nodeID} />;
  } else if (params.panelView === 'nodeEventsOfType') {
    return (
      <NodeEventsOfType
        nodeID={params.panelParameters.nodeID}
        eventType={params.panelParameters.eventType}
      />
    );
  } else if (params.panelView === 'eventDetail') {
    return (
      <EventDetail
        nodeID={params.panelParameters.nodeID}
        eventID={params.panelParameters.eventID}
      />
    );
  } else {
    /* The default 'Event List' / 'List of all processes' view */
    return <NodeList />;
  }
});
