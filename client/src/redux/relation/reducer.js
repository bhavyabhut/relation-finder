import baseReducer from "../../utilities/baseReducer";
import RelationAction from "./actions";

const initialState = {
  users: [],
  selectedUser: null,
  userCreated: false,
  relationCreated: false,
  updateFinished: false,
};

export default baseReducer(initialState, {
  [RelationAction.REQUEST_USER_FINISHED](state, action) {
    return { ...state, users: action.payload.users };
  },
  [RelationAction.CREATE_USER_FINISHED](state, action) {
    console.log(action, "mari moj");
    return {
      ...state,
      users: [...state.users, action.payload.user],
      userCreated: !!action.payload.user,
    };
  },
  [RelationAction.ADD_RELATION_FINISHED](state, action) {
    let newUsers = state.users.map((user) => {
      if (user._id === action.payload.firstUser._id) {
        return { ...user, ...action.payload.firstUser };
      } else return user;
    });

    return {
      ...state,
      users: newUsers,
      relationCreated: !!action.payload,
    };
  },
  [RelationAction.UPDATE_DIRECT_RELATION_FINISHED](state, action) {
    let newUsers = state.users.map((user) => {
      if (user._id === action.payload.user._id) {
        return { ...user, ...action.payload.user };
      } else return user;
    });

    return {
      ...state,
      users: newUsers,
      updateFinished: !!action.payload,
    };
  },
  [RelationAction.CREATE_USER_SUCCESS](state, action) {
    return {
      ...state,
      userCreated: !!action.payload,
    };
  },
  [RelationAction.UPDATE_SUCCESS](state, action) {
    return {
      ...state,
      updateFinished: !!action.payload,
    };
  },
  [RelationAction.CREATE_RELATION_SUCCESS](state, action) {
    return {
      ...state,
      relationCreated: !!action.payload,
    };
  },

  [RelationAction.SELECT_USER](state, action) {
    return { ...state, selectedUser: action.payload };
  },
  [RelationAction.UNSELECT_USER](state, action) {
    return { ...state, selectedUser: action.payload };
  },
});
