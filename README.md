# Consecution

Chained and interruptible events in Javascript

## Purpose

Javascript timeouts get complicated very quickly, especially if your application is running
several at the same time and if some of them can be cancelled. The problem that Consecution
attempts to solve is to allow an application to synchronize actions at particular event point
and also to allow timeouts to be interrupted.

Imagine you have the situation where you want your page to open and you want to validate
that the user is valid. To do this you have to hit an interface on a remote server and get
a response back. What you want the user to see is your "Logging On..." page with a nice logo
on for 5 seconds. Should the server respond in that first 5 seconds you want to show the user
your "logged in" page, but only after 5 seconds has elapsed. We don't want to display a message
and have it disappear so quickly the user cannot read it. If the server hasn't validated in
5 seconds then we want to update the page with some different text asking the user to be
patient. You want this visible for at least 2 seconds but should the server not come back
in 5 seconds you want to give up on validating the user and show a login page instead.

Just to recap the timings of this:
- user opens the page, sees "Logging On..." and request is sent to server for validation
- if server validates in under 5 seconds - at 5 seconds user is shown the logged in view
- else; after 5 seconds change the message on the screen
- if server validates in more than 5 seconds but under 7 seconds - at 7 seconds user is
  shown the logged in view
- if server validates in more than 7 seconds but less that 10 - user is immediately shown
  logged in view
- if the server fails to validate in 10 seconds - give up and show log in page

The most obvious way to implement this is to use chaining timeouts which managed the
different event points. Some of these timeouts need to be able to be cancelled though. This
makes the whole process of managing the timeouts hard. Consecution fixes this by providing
a clean interface to these event points and allowing you to define what happens at each.

## Terminology

- Era - the time between starting Consecution and the final epoch
- Epoch - a point in time along an era
- Period - the period of time between epoch
- Action - tasks that the application wants to execute

## Era

An era has defined start point. Epochs are added to an era and the final epoch marks
the end of the era. Once started an era will only end if an action occurs during an
interruptible period, or if the final epoch is reached.

## Epoch

An epoch is a point in time where actions get run. Two epochs cannot share the same
point in time. An epoch can be marked as being interruptible which means if an action
occurs in the period before the epoch that action is executed and the era ended. Any
actions queued at the epoch are discarded.

By default the start of an era is also an epoch.

Epochs can be added in all standard time formats, i.e. millis, seconds, minutes, etc.
There are specified as "1000ms", "1.5s", "5m" and so on. If a time specifier is omitted
(e.g. "100") then millis is assumed.

## Period

A period is the space between two epochs. Periods can be marked as interruptible. Actions
added to a period not marked as interruptible will be executed at the next epoch.

## Action

An action is a unit of work that occurs during a period. An action that occurs during
an interruptible period causes the action to be executed and the era ended. Any actions
queued at the next epoch are discarded.

## Version History
- 1.0.0 Add support for collecting epochs
- 1.0.1 Add support for interruptible periods
- 1.0.2 Add completion hook to end of era
