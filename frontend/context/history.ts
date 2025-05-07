import { create } from "zustand"

type State = {
    refetchCounter: number,
    triggerRefetch: () => void,
}

export const useHistoryStore = create<State>((set) => ({
    refetchCounter: 0,
    triggerRefetch: () => {
        console.log("triggering refetch")
        set((state) => ({ refetchCounter: state.refetchCounter + 1 }))
    },
}))