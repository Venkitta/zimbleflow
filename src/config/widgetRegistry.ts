import { LucideIcon, MousePointer2, Type, Camera } from "lucide-react";

export type WidgetType = "BUTTON" | "TEXT" | "CAMERA_TILE";

export interface WidgetSchema {
    type: WidgetType;
    label: string;
    icon: LucideIcon;
    defaultProps: Record<string, any>;
    fields: {
        name: string;
        label: string;
        type: "text" | "number" | "color" | "boolean" | "select";
        options?: string[];
    }[];
}

export const WIDGET_REGISTRY: Record<WidgetType, WidgetSchema> = {
    BUTTON: {
        type: "BUTTON",
        label: "Button",
        icon: MousePointer2,
        defaultProps: {
            text: "Click Me",
            width: 120,
            height: 40,
            backgroundColor: "#3b82f6",
            textColor: "#ffffff",
            borderRadius: 8,
        },
        fields: [
            { name: "text", label: "Label Text", type: "text" },
            { name: "width", label: "Width (px)", type: "number" },
            { name: "height", label: "Height (px)", type: "number" },
            { name: "backgroundColor", label: "Background", type: "color" },
            { name: "textColor", label: "Text Color", type: "color" },
            { name: "borderRadius", label: "Border Radius", type: "number" },
        ],
    },
    TEXT: {
        type: "TEXT",
        label: "Text",
        icon: Type,
        defaultProps: {
            text: "Hello World",
            fontSize: 16,
            color: "#000000",
        },
        fields: [
            { name: "text", label: "Content", type: "text" },
            { name: "fontSize", label: "Font Size", type: "number" },
            { name: "color", label: "Color", type: "color" },
        ],
    },
    CAMERA_TILE: {
        type: "CAMERA_TILE",
        label: "Camera Tile",
        icon: Camera,
        defaultProps: {
            width: 200,
            height: 150,
            borderRadius: 12,
            label: "Main Camera",
            showOverlay: true,
        },
        fields: [
            { name: "label", label: "Camera Label", type: "text" },
            { name: "width", label: "Width", type: "number" },
            { name: "height", label: "Height", type: "number" },
            { name: "borderRadius", label: "Border Radius", type: "number" },
            { name: "showOverlay", label: "Show Overlay", type: "boolean" },
        ],
    },
};