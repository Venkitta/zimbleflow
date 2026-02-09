import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { WIDGET_REGISTRY, WidgetType } from "../config/widgetRegistry";


export interface WidgetInstance {
    id: string;
    type: WidgetType;
    props: Record<string, any>;
}

interface EditorState {
    widgets: WidgetInstance[];
    selectedWidgetId: string | null;

    addWidget: (type: WidgetType) => void;
    selectWidget: (id: string | null) => void;
    updateWidget: (id: string, newProps: Record<string, any>) => void;
    deleteWidget: (id: string) => void;

    saveLayout: () => void;
    loadLayout: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
    widgets: [],
    selectedWidgetId: null,

    addWidget: (type) => {
        const newWidget: WidgetInstance = {
            id: uuidv4(),
            type,
            props: { ...WIDGET_REGISTRY[type].defaultProps },
        };
        set((state) => ({ widgets: [...state.widgets, newWidget] }));
    },

    selectWidget: (id) => set({ selectedWidgetId: id }),

    updateWidget: (id, newProps) =>
        set((state) => ({
            widgets: state.widgets.map((w) =>
                w.id === id ? { ...w, props: { ...w.props, ...newProps } } : w
            ),
        })),

    deleteWidget: (id) =>
        set((state) => ({
            widgets: state.widgets.filter((w) => w.id !== id),
            selectedWidgetId: state.selectedWidgetId === id ? null : state.selectedWidgetId,
        })),

    saveLayout: () => {
        const layout = JSON.stringify(get().widgets);
        localStorage.setItem("editor_layout", layout);
        alert("Layout saved!");
    },

    loadLayout: () => {
        const layout = localStorage.getItem("editor_layout");
        if (layout) {
            set({ widgets: JSON.parse(layout) });
        }
    },
}));