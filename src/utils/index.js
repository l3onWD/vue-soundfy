/* -----------------------------------------
* UTILS FUNCTIONS
-------------------------------------------*/

export function formatTime(secs) {

    // Calculate time fractions
    const hours = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60);
    let seconds = Math.floor(secs % 60);

    // Adjust to 2 digits
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    // Create base time string
    let timeStr = `${minutes}:${seconds}`;

    // Add hours only if present
    if (hours) timeStr = hours + ':' + timeStr;


    return timeStr;
}


export function formatDate(str) {

    // Get date from string
    const date = new Date(str);

    // Calculate date fractions
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Adjust to 2 digits
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;


    return `${day}/${month}/${year}`;
}