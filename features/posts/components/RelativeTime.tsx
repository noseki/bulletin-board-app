"use client";

import { formatRelativeTime } from "../lib/utils";

export default function RelativeTime({ date }: { date: Date }) {
    return <>{formatRelativeTime(date)}</>;
}
