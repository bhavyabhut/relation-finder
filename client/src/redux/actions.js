import { createAction } from '../utilities/actionUtility'

const AppActions = {
  RESET_STORE: 'app/RESET_STORE',

  resetStore: () => createAction(AppActions.RESET_STORE),
}
export default AppActions
