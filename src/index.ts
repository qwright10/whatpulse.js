import fetch from 'node-fetch';

/**
 * Represents a connectionless interface with a WhatPulse client.
 */
export default class Client {
	/**
	 * The base URL for all WhatPulse client requests.
	 * @type {URL}
	 * @private
	 * @readonly
	 */
	private readonly base: URL;

	/**
	 * Constructs a WhatPulse client interface with optional hostname and port.
	 * @param {string?} hostname - Optional hostname (default: 'localhost')
	 * @param {number?} port - Optional port (default: 3490)
	 * @param {string?} protocol - Optional protocol (default: 'http:')
	 */
	public constructor(hostname?: string, port?: number, protocol?: string) {
		const url = new URL('http://localhost:3490/v1/');
		if (hostname) url.hostname = hostname;
		if (port) url.port = port.toString();
		if (protocol) url.protocol = protocol;
		this.base = url;
	}

	/**
	 * Fetches account totals from this client's WhatPulse client.
	 * @returns {Promise<AccountTotals>}
	 * @public
	 * @async
	 */
	public fetchAccountTotals(): Promise<AccountTotals> {
		return this.fetch<RawAccountTotals>('account-totals').then((r) => {
			return {
				clicks: Number(r.clicks),
				download: Number(r.download),
				keys: Number(r.keys),
				ranks: {
					clicks: Number(r.ranks.rank_clicks),
					download: Number(r.ranks.rank_download),
					keys: Number(r.ranks.rank_keys),
					upload: Number(r.ranks.rank_upload),
					uptime: Number(r.ranks.rank_uptime),
				},
				upload: Number(r.upload),
				uptime: Number(r.uptime),
			};
		});
	}

	/**
	 * Fetches unpulsed stats from this client's WhatPulse client.
	 * @returns {Promise<UnpulsedStats>}
	 * @public
	 * @async
	 */
	public fetchUnpulsedStates(): Promise<UnpulsedStats> {
		return this.fetch<UnpulsedStats>('unpulsed');
	}

	/**
	 * Pulses the current un-pulsed stats. Always returns undefined due to WhatPulse client not sending pulse success.
	 * @returns {Promise<void>}
	 * @public
	 * @async
	 */
	public pulse(): Promise<void> {
		return this.fetch('pulse').then(() => undefined);
	}

	/**
	 * Makes a request to the given url + API base.
	 * @returns {T}
	 * @private
	 * @async
	 */
	private async fetch<T>(url: string): Promise<T> {
		const response = await fetch(new URL(url, this.base));
		switch (response.status) {
			case 200: {
				const json = await response.json();
				if (json.error) throw Error(`WhatPulse API Error: ${json.error as string}`);
				return json;
			}
			case 401:
				throw Error('Connecting IP address not allowed in the client settings');
			case 404:
				throw Error('Invalid URL. This may be caused by an unsupported client verison.');
			case 405:
				throw Error('Invalid HTTP method. You should never get this error.');
			default:
				throw Error(`An unknown HTTP response code was received: ${response.status}`);
		}
	}
}

/* eslint-disable @typescript-eslint/naming-convention */
interface RawAccountTotals {
	clicks: string;
	download: string;
	keys: string;
	ranks: {
		rank_clicks: string;
		rank_download: string;
		rank_keys: string;
		rank_upload: string;
		rank_uptime: string;
	};
	upload: string;
	uptime: string;
}
/* eslint-enable @typescript-eslint/naming-convention */

export interface AccountTotals {
	clicks: number;
	download: number;
	keys: number;
	ranks: {
		clicks: number;
		download: number;
		keys: number;
		upload: number;
		uptime: number;
	};
	upload: number;
	uptime: number;
}

export interface UnpulsedStats {
	clicks: number;
	download: number;
	keys: number;
	upload: number;
	uptime: number;
}
