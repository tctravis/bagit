export const state = () => ({
    page: {
        title: 'Page title',
        pageTheme: 'dark'
    }
});

export const mutations = {
    SET_PAGE_TITLE(state, pageTitle) {
        state.page.title = pageTitle
    },
    SET_PAGE_THEME(state, pageTheme) {
        state.page.pageTheme = pageTheme
    },
}

export const actions = {
    setPageTitle({
        commit,
    }, pageTitle) {
        commit('SET_PAGE_TITLE', pageTitle)
    },
    setPageTheme({
        commit,
    }, pageTheme) {
        commit('SET_PAGE_THEME', pageTheme)
    }
}