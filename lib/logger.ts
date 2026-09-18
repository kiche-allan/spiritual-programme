import { Logger } from "next-axiom";

export const log = new Logger();

export function logEvent(event: string, data: Record<string, unknown> = {}) {
  log.info(event, {
    ...data,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
}
