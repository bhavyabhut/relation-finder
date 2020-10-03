class RelationSelector {
  static SelectUsers = (state) => state?.users?.users;

  static SelectSelectedUser = (state) => state?.users?.selectedUser;

  static SelectIdToName = (state, id) =>
    state?.users?.users.filter((user) => user._id === id)[0];

  static SelectUserCreated = (state) => state?.users?.userCreated;

  static SelectRelationCreated = (state) => state?.users?.relationCreated;

  static SelectRelationUpdateFinished = (state) => state?.users?.updateFinished;
}
export default RelationSelector;
