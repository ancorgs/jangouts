/**
 * Copyright (c) [2019] SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { addEventsHandlers } from './events-handler';
import { Subject } from 'rxjs';

import { actionCreators as actions } from '../../state/ducks';

test('handles error events', () => {
  const dispatchFn = jest.fn();
  const subject = new Subject();
  addEventsHandlers(subject, dispatchFn);
  subject.next({type: "error"});
  expect(dispatchFn).toHaveBeenCalledWith({type: "error"});
});

test('handles log events', () => {
  const dispatchFn = jest.fn();
  const subject = new Subject();
  const logEntry = { message: 'some message' };
  addEventsHandlers(subject, dispatchFn);
  subject.next({ type: 'log', data: logEntry });
  expect(dispatchFn).toHaveBeenCalledWith(actions.messages.receive(logEntry));
});

test('handles add feed events', () => {
  const dispatchFn = jest.fn();
  const subject = new Subject();
  const feed = {
    id: 1,
    display: 'Jane',
    isIgnored: false,
    isLocalScreen: true,
    isPublisher: true
  };
  addEventsHandlers(subject, dispatchFn);
  subject.next({ type: 'addFeed', data: feed });
  expect(dispatchFn).toHaveBeenCalledWith(
    actions.participants.addParticipant(feed)
  );
});

test('handles remove feed events', () => {
  const dispatchFn = jest.fn();
  const subject = new Subject();
  addEventsHandlers(subject, dispatchFn);
  subject.next({ type: 'removeFeed', data: { feedId: 1 } });
  expect(dispatchFn).toHaveBeenCalledWith(
    actions.participants.removeParticipant(1)
  );
});

test('handles "stream" events', () => {
  const dispatchFn = jest.fn();
  const subject = new Subject();
  addEventsHandlers(subject, dispatchFn);
  subject.next({ type: 'stream', data: { feedId: 1 } });
  expect(dispatchFn).toHaveBeenCalledWith(actions.participants.setStream(1));
});
