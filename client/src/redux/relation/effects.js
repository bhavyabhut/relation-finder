import api from "../../utilities/api";
import { get, post, patch } from "../../utilities/http";

class RelationEffects {
  static getSites() {
    return get(api.USERS);
  }

  static createUser(user) {
    return post(api.USERS, user);
  }

  static updateSite({ user, userId }) {
    return patch(api.USER.replace(":userId", userId), user);
  }

  static createRelation(relation) {
    return post(api.RELATION, relation);
  }
}

export default RelationEffects;
