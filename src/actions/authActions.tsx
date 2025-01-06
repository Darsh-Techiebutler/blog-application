export const setUser = (user: any, token: any) => ({
    type: 'SET_USER',
    payload: { user, token },
});
