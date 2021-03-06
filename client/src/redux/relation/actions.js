import { createAction } from "../../utilities/actionUtility";

const RelationAction = {
  REQUEST_USER: "relation/REQUEST_USER",
  REQUEST_USER_FINISHED: "relation/REQUEST_USER_FINISHED",
  CREATE_USER: "relation/CREATE_USER",
  CREATE_USER_FINISHED: "relation/CREATE_USER_FINISHED",
  TOGGLE_SELECTED_USER: "relation/TOGGLE_SELECTED_USER",
  SELECT_USER: "relation/SELECT_USER",
  UNSELECT_USER: "relation/UNSELECT_USER",
  CREATE_USER_SUCCESS: "relation/CREATE_USER_SUCCESS",
  ADD_RELATION: "relation/ADD_RELATION",
  ADD_RELATION_FINISHED: "relation/ADD_RELATION_FINISHED",
  CREATE_RELATION_SUCCESS: "relation/CREATE_RELATION_SUCCESS",
  UPDATE_DIRECT_RELATION: "relation/UPDATE_DIRECT_RELATION",
  UPDATE_DIRECT_RELATION_FINISHED: "relation/UPDATE_DIRECT_RELATION_FINISHED",
  UPDATE_SUCCESS: "relation/UPDATE_SUCCESS",
  SET_ERROR: "relation/SET_ERROR",
  REMOVE_ERROR: "relation/REMOVE_ERROR",
  addRelation(relation) {
    return createAction(this.ADD_RELATION, relation);
  },
  updateUser(user) {
    return createAction(this.UPDATE_DIRECT_RELATION, user);
  },
  selectSite(site) {
    return createAction(this.SELECT_USER, site);
  },
  createUser(user) {
    return createAction(this.CREATE_USER, user);
  },
  unselectSite() {
    return createAction(this.UNSELECT_USER, null);
  },
  requestUsers() {
    return createAction(this.REQUEST_USER);
  },
  requestUserFinished(users) {
    return createAction(this.REQUEST_USER_FINISHED, users);
  },
  toggleRow(row) {
    return createAction(this.TOGGLE_SELECTED_USER, row);
  },
};

export default RelationAction;
