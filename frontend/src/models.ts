const initialState = {
  access_token: null,
}

export const user = {
  state: initialState,
  reducers: {
    // handle state changes with pure functions
    setToken(state: any, access_token: string) {
      return {...state,  access_token: access_token}
    },
    logOut(state: any) {
      return {...initialState}
    }
  }
}
