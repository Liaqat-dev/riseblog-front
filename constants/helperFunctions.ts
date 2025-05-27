export function timeAgo(mongoTimestamp:string){

    const date = new Date(mongoTimestamp);
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

    let timeAgo = "";

    if (secondsAgo < 60) {
        timeAgo = `${secondsAgo}s ago`;
    } else if (secondsAgo < 3600) {
        const minutes = Math.floor(secondsAgo / 60);
        timeAgo = `${minutes}m ago`;
    } else if (secondsAgo < 86400) {
        const hours = Math.floor(secondsAgo / 3600);
        timeAgo = `${hours}h ago`;
    } else {
        const days = Math.floor(secondsAgo / 86400);
        timeAgo = `${days}d ago`;
    }

    return timeAgo;
}