import MainReducer from '../../utilities/mainReducer'
import RequestingActions from './actions'
import { getKeyForAction } from '../../utilities/actionUtility'

const initialState = {}
export default MainReducer(
  initialState,
  {
    [RequestingActions.SET_REQUESTING](state, action) {
      return {
        ...state,
        [getKeyForAction(action.payload.type, action.meta?.scope)]: action.payload.value,
      }
    },
  },
  false,
)
