import { Route } from '@playwright/test';
import { Page } from '@playwright/test';

export type FulfillResponse = Parameters<Route['fulfill']>[0];

export type RouteUrl = Parameters<Page['route']>[0];

export interface SetRouteInput {
	url: RouteUrl;
	response: FulfillResponse;
}
