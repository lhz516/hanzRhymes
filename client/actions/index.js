/*
 * action creators
 */

export function setRhyme(text) {
    return { type: 'SET_RHYME', text }
}

export function setLoading(isLoading) {
    return { type: 'SET_LOADING', isLoading }
}

export function setCharacters(characters, recentRhymes) {
    return { type: 'SET_CHARACTERS', characters, recentRhymes }
}

export function setVisibilityFilter(filter) {
    return { type: 'SET_VISIBILITY_FILTER', filter }
}