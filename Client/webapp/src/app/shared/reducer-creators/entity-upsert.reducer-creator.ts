export interface IState {
  editingEntityId: string;
}

export const initialState: IState = {
  editingEntityId: undefined,
};

export const createEntityUpsertReducer = (
  editActions: string[],
  addAction: string,
  dialogCloseAction: string,
  getEntityId: (any) => string
) =>
  (state = initialState, action: any): IState => {

    if (editActions.indexOf(action.type) !== -1) {
      return {
        ...state,
        editingEntityId: getEntityId(action),
      };
    }
    if (action.type === dialogCloseAction || action.type === addAction) {
      return {
        ...state,
        editingEntityId: undefined,
      };
    }

    return state;
  };

export const getEditingEntityId = (state: IState) => state.editingEntityId;
