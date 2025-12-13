export function formatTimeSince(date) {
    if (!date) return 'недавно';

    const inputDate = date instanceof Date ? date : new Date(date);
    const seconds = Math.floor((new Date().getTime() - inputDate.getTime()) / 1000);

    let interval = seconds / 31536000; 

    if (interval > 1) {
        return Math.floor(interval) + " г. назад";
    }
    interval = seconds / 2592000; 
    if (interval > 1) {
        return Math.floor(interval) + " мес. назад";
    }
    interval = seconds / 86400; 
    if (interval > 1) {
        return Math.floor(interval) + " д. назад";
    }
    interval = seconds / 3600; 
    if (interval > 1) {
        return Math.floor(interval) + " ч. назад";
    }
    interval = seconds / 60; 
    if (interval > 1) {
        return Math.floor(interval) + " мин. назад";
    }
    
    return Math.floor(seconds) + " сек. назад";
}

export function slugify(text) {
    if (!text) return '';
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');
}