
export const user = {
  state: {
    access_token: null,
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    setToken(state: any, access_token: string) {
      return {...state,  access_token: access_token}
    }
  }
}