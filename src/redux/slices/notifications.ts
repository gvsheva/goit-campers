import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

type NotificationType = "success" | "info" | "warning" | "error";

interface Notification {
    id?: string;
    type: NotificationType;
    message: string;
}

const initialState: Notification[] = [];

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            const { id, type, message } = action.payload;
            state.push({ id: id || nanoid(), type, message });
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            return state.filter(
                (notification) => notification.id !== action.payload,
            );
        },
    },
});

export const { addNotification, removeNotification } =
    notificationsSlice.actions;
export const { reducer } = notificationsSlice;

export const raiseNotificationWithTimeout =
    (notification: Notification, timeout = 10000) =>
    (dispatch: AppDispatch) => {
        const n = { ...notification, id: notification.id || nanoid() };
        dispatch(addNotification(n));
        setTimeout(() => {
            dispatch(removeNotification(n.id));
        }, timeout);
    };
