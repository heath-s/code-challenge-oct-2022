import { ComponentMeta } from '@storybook/react';
import { Provider as ReduxProvider } from 'react-redux';
import { useEffect } from 'react';
import { actions } from 'store/ducks/pages/app.duck';
import AlertDialog from 'components/dialogs/alert';
import Component from 'pages/app';
import DropZone from 'components/drop-zone';
import { ExplorerListData } from 'types/explorer';
import LoadingDialog from 'components/dialogs/loading';
import { store, useAppDispatch } from 'store';

export default {
  title: 'Pages/App',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ReduxProvider store={store}>
        <Story />
      </ReduxProvider>
    ),
  ],
} as ComponentMeta<typeof Component>;

export const Empty = () => (
  <Component />
);

export const ImportError = () => (
  <>
    <Component />
    <AlertDialog
      buttonLabel="OK"
      content="The file is not a JSON file."
      title="Import error"
    />
  </>
);

export const Loading = () => (
  <>
    <Component />
    <LoadingDialog message="Importing in progress..." />
  </>
);

export const DraggedOver = () => (
  <>
    <Component />
    <DropZone shown />
  </>
);

/* eslint-disable object-curly-newline */
const SINGLE_LANE_LISTS = [
  {
    items: [
      { key: 'calls', name: 'calls', type: 'folder' },
      { key: 'core', name: 'core', type: 'folder' },
      { key: 'desk', name: 'desk', type: 'file' },
      { key: 'closedStatusesDummylongText', name: 'closedStatusesDummylongText', type: 'file' },
    ],
    key: '',
  },
] as ExplorerListData[];
export const SingleLane = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    dispatch(actions.__storybook_setData({
      isEmpty: false,
      lists: SINGLE_LANE_LISTS,
      preview: {
        content: 'Depending the channel type your users are chatting in, they are given different labels as well as access to different actions and information. Users can register other users as friends, interact with them in a private chat, or block specific users from sending direct messages. Depending the channel type your users are chatting in, they are given different labels as well as access to different actions and information. Users can register other users as friends, interact with them in a private chat, or block specific users from sending direct messages.',
        key: 'desk.monitoring.closedStatusesDummyText',
      },
      selectedKey: 'closedStatusesDummylongText',
    }));
    return () => {
      dispatch(actions.reset());
    };
  }, [dispatch]);

  return (
    <Component />
  );
};

/* eslint-disable object-curly-newline */
const MULTIPLE_LANE_LISTS = [
  {
    items: [
      { key: 'calls.', name: 'calls', type: 'folder' },
      { key: 'core.', name: 'core', type: 'folder' },
      { key: 'desk.', name: 'desk', type: 'folder' },
      { key: 'ui.', name: 'ui', type: 'folder' },
      { key: 'common', name: 'common', type: 'file' },
      { key: 'chat', name: 'chat', type: 'file' },
    ],
    key: '',
  },
  {
    items: [
      { key: 'desk.agents.', name: 'agents', type: 'folder' },
      { key: 'desk.agentSelect.', name: 'agentSelect', type: 'folder' },
      { key: 'desk.apps.', name: 'apps', type: 'folder' },
      { key: 'desk.assignmentLogs.', name: 'assignmentLogs', type: 'folder' },
      { key: 'desk.assignTicketToMyself.', name: 'assignTicketToMyself', type: 'folder' },
      { key: 'desk.conversation.', name: 'conversation', type: 'folder' },
      { key: 'desk.conversationTickets.', name: 'conversationTickets', type: 'folder' },
      { key: 'desk.customers.', name: 'customers', type: 'folder' },
      { key: 'desk.customFields.', name: 'customFields', type: 'folder' },
      { key: 'desk.dataExport.', name: 'dataExport', type: 'folder' },
      { key: 'desk.desktopNotification.', name: 'desktopNotification', type: 'folder' },
      { key: 'desk.dialogs.', name: 'dialogs', type: 'folder' },
      { key: 'desk.lnb.', name: 'lnb', type: 'folder' },
      { key: 'desk.monitoring.', name: 'monitoring', type: 'folder' },
      { key: 'desk.proactiveChat.', name: 'proactiveChat', type: 'folder' },
      { key: 'desk.reports.', name: 'reports', type: 'folder' },
      { key: 'desk.settings.', name: 'settings', type: 'folder' },
      { key: 'desk.statistics.', name: 'statistics', type: 'folder' },
      { key: 'desk.tags.', name: 'tags', type: 'folder' },
      { key: 'desk.team.', name: 'team', type: 'folder' },
      { key: 'desk.ticket.', name: 'ticket', type: 'folder' },
      { key: 'desk.tickets.', name: 'tickets', type: 'folder' },
      { key: 'desk.views.', name: 'views', type: 'folder' },
      { key: 'desk.agentProfile', name: 'agentProfile', type: 'file' },
      { key: 'desk.typingIndicator', name: 'typingIndicator', type: 'file' },
    ],
    key: 'desk.',
  },
  {
    items: [
      { key: 'desk.monitoring.active.', name: 'active', type: 'folder' },
      { key: 'desk.monitoring.agentStatus.', name: 'agentStatus', type: 'folder' },
      { key: 'desk.monitoring.closedStatuses.', name: 'closedStatuses', type: 'folder' },
      { key: 'desk.monitoring.csat.', name: 'csat', type: 'folder' },
      { key: 'desk.monitoring.idle.', name: 'idle', type: 'folder' },
      { key: 'desk.monitoring.messagingTime.', name: 'messagingTime', type: 'folder' },
      { key: 'desk.monitoring.metric.', name: 'metric', type: 'folder' },
      { key: 'desk.monitoring.pending.', name: 'pending', type: 'folder' },
      { key: 'desk.monitoring.sectionTitle.', name: 'sectionTitle', type: 'folder' },
      { key: 'desk.monitoring.ticketFunnel.', name: 'ticketFunnel', type: 'folder' },
      { key: 'desk.monitoring.ticketReport.', name: 'ticketReport', type: 'folder' },
      { key: 'desk.monitoring.ticketsePerAgent.', name: 'ticketsePerAgent', type: 'folder' },
      { key: 'desk.monitoring.ticketsPerOnlineAgent.', name: 'ticketsPerOnlineAgent', type: 'folder' },
      { key: 'desk.monitoring.time.', name: 'time', type: 'folder' },
      { key: 'desk.monitoring.csat', name: 'csat', type: 'file' },
      { key: 'desk.monitoring.closedStatusesDummylongText', name: 'closedStatusesDummylongText', type: 'file' },
      { key: 'desk.monitoring.title', name: 'title', type: 'file' },
      { key: 'desk.monitoring.wip_header', name: 'wip.header', type: 'file' },
    ],
    key: 'desk.monitoring.',
  },
] as ExplorerListData[];
export const MultipleLane = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    dispatch(actions.__storybook_setData({
      isEmpty: false,
      lists: MULTIPLE_LANE_LISTS,
      preview: {
        content: 'Depending the channel type your users are chatting in, they are given different labels as well as access to different actions and information. Users can register other users as friends, interact with them in a private chat, or block specific users from sending direct messages. Depending the channel type your users are chatting in, they are given different labels as well as access to different actions and information. Users can register other users as friends, interact with them in a private chat, or block specific users from sending direct messages.',
        key: 'desk.monitoring.closedStatusesDummyLongText',
      },
      selectedKey: 'desk.monitoring.closedStatusesDummylongText',
    }));
    return () => {
      dispatch(actions.reset());
    };
  }, [dispatch]);

  return (
    <Component />
  );
};
