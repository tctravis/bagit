export const state = () => ({
    page: {
        title: 'Page title'
    }
});

export const mutations = {
    SET_PAGE_TITLE(state, pageTitle) {
        state.page.title = pageTitle
    },
}

export const actions = {
    setPageTitle({
        commit,
    }, pageTitle) {
        commit('SET_PAGE_TITLE', pageTitle)
    }
}