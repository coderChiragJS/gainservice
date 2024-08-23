// utils/localStorage.ts
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('workOrders');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('workOrders', serializedState);
    } catch (err) {
        console.log("Could not save state", err);
    }
};
