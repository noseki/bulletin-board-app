export function formatDateTime(date: Date): string {
    const pad = (n:number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ` +
        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function formatRelativeTime(date: Date): string {
    const diff = Date.now() - date.getTime(); // ms
    const minutes = Math.floor(diff / 60_000);
    if (minutes < 1) return "たった今";
    if (minutes < 60) return `${minutes}分前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24)    return `${hours}時間前`;
    const days = Math.floor(hours / 24);
    if (days < 30)     return `${days}日前`;
    const months = Math.floor(days / 30);
    if (months < 12)   return `${months}ヶ月前`;
    return `${Math.floor(months / 12)}年前`;    
}
