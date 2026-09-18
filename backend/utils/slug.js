const slugfy = (value) => {
    return value
        .tolowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove all non-word characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
}

export default slugfy;