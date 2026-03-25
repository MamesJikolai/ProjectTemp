export const getEmbedUrl = (url: string | undefined) => {
    if (!url) return ''

    // Handle standard YouTube URLs
    if (url.includes('youtube.com/watch?v=')) {
        // Extracts the ID after 'v=' and ignores any extra parameters
        const videoId = url.split('v=')[1]?.split('&')[0]
        return `https://www.youtube.com/embed/${videoId}`
    }

    // Handle shortened youtu.be URLs
    if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0]
        return `https://www.youtube.com/embed/${videoId}`
    }

    // Handle Google Drive URLs
    if (url.includes('drive.google.com')) {
        // Matches the ID between '/d/' and the next '/'
        const driveId = url.match(/\/d\/([^/]+)/)?.[1]
        return driveId ? `https://drive.google.com{driveId}/preview` : url
    }

    // Handle standard Vimeo URLs
    if (url.includes('vimeo.com') && !url.includes('player.vimeo.com')) {
        // Converts vimeo.com/123456 to player.vimeo.com/video/123456
        const urlParts = url.split('/')
        const videoId = urlParts[urlParts.length - 1]
        return `https://player.vimeo.com/video/${videoId}`
    }

    // Return the original URL if it doesn't match the above
    return url
}
