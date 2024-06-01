import {
    useReducer,
    createContext,
    Reducer,
} from 'react';
import { useRouter } from 'next/navigation';
import {IUser} from "";



export interface GlobalState {
    user?: IUser | null | undefined;
}

export enum ActionType {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
}

export interface GlobalStateAction {
    type: ActionType;
    payload?: GlobalState;
}

const initialState: GlobalState = {
    user: null,
};
export type ContextValues = {
    state: GlobalState;
    dispatch: React.Dispatch<GlobalStateAction>;
};
//context prov
// Create Context
const Context = createContext<ContextValues>({
    state: initialState,
    dispatch: (action) =>
        console.error(
            'Dispatched action outside of an AuthContext provider',
            action
        ),
});

// Root reducer

const rootReducer: Reducer<GlobalState, GlobalStateAction> = (
    state: GlobalState,
    action: GlobalStateAction
): GlobalState => {

    switch (action.type) {
        case ActionType.LOGIN:
            //TODO uncomment this when will be using the backend
            const user = action.payload?.user
            if(user){
                window.localStorage.setItem('user', user.id);
            }

            return { ...state, user} as GlobalState;
        case ActionType.LOGOUT:
            window.localStorage.removeItem('user');
            return { ...state, user: undefined } as GlobalState;

        default:
            return state as GlobalState;
    }
};

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    useRouter();
    return (
        <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    );
};

export { Context, Provider };