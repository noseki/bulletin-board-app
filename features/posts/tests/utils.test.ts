import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatRelativeTime } from '../lib/utils';

describe("formatRelativeTime", () => {
    beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date(2026, 4, 15, 12, 0, 0)); });
    afterEach(() => { vi.useRealTimers(); });

    const ago = (ms: number) => new Date(Date.now() - ms);

    test("30秒前 → たった今", () => expect(formatRelativeTime(ago(30_000))).toBe("たった今"));
    test("1分前 → 1分前",    () => expect(formatRelativeTime(ago(60_000))).toBe("1分前"));
    test("59分前 → 59分前",  () => expect(formatRelativeTime(ago(59 * 60_000))).toBe("59分前"));
    test("1時間前 → 1時間前", () => expect(formatRelativeTime(ago(60 * 60_000))).toBe("1時間前"));
    test("23時間前 → 23時間前", () => expect(formatRelativeTime(ago(23 * 3600_000))).toBe("23時間前"));
    test("1日前 → 1日前",    () => expect(formatRelativeTime(ago(24 * 3600_000))).toBe("1日前"));
    test("1ヶ月前 → 1ヶ月前", () => expect(formatRelativeTime(ago(30 * 86400_000))).toBe("1ヶ月前"));
    test("1年前 → 1年前",    () => expect(formatRelativeTime(ago(365 * 86400_000))).toBe("1年前"));
});
