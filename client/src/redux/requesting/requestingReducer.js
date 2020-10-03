import BaseReducer from '../../utilities/baseReducer'
import RequestingActions from './actions'
import { getKeyForAction } from '../../utilities/actionUtility'

const initialState = {}
export default BaseReducer(
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
