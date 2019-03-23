import { init, RematchRootState } from '@rematch/core'
import * as models from './models'
import createRematchPersist from '@rematch/persist'

const persistPlugin = createRematchPersist({
  whitelist: ['user'],
  throttle: 5000,
  version: 1,
})

export const store = init({
    models,
    plugins: [persistPlugin],
})

export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type iRootState = RematchRootState<typeof models>