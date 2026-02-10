"use client";
import { useDraggable } from "@dnd-kit/core";
import { WIDGET_REGISTRY, WidgetSchema } from "../config/widgetRegistry";
import { SaveLayout } from "./SaveLayout";

function WidgetUI({ widget, isDragging, isOverlay }: { widget: WidgetSchema; isDragging?: boolean; isOverlay?: boolean }) {
    const Icon = widget.icon;
    return (
        <div
            className={`p-3 bg-white border border-slate-500 rounded-lg flex items-center gap-2 select-none
                ${isOverlay ? "shadow-xl cursor-grabbing scale-105" : "cursor-grab shadow-sm"}
                ${isDragging && !isOverlay ? "" : "hover:border-blue-600"}
                transition-transform duration-200
            `}
        >
            <Icon size={18} className="text-slate-500" />
            <span className="font-bold text-sm text-black">{widget.label}</span>
        </div>
    );
}

function DraggableItem({ widget }: { widget: WidgetSchema }) {
    const { listeners, setNodeRef, isDragging } = useDraggable({
        id: widget.type,
        data: { widget }
    });

    return (
        <div ref={setNodeRef} {...listeners}>
            <WidgetUI widget={widget} isDragging={isDragging} />
        </div>
    );
}

export function WidgetPalette() {


    return (

        <div className="w-80 h-full bg-slate-50 border-r border-black p-4 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-1 gap-2">
                <div className="p-2 border-b border-black mb-2">
                    <h1 className="font-bold text-xl text-slate-800">UI Builder</h1>
                </div>
                {Object.values(WIDGET_REGISTRY).map((widget) => (
                    <DraggableItem key={widget.type} widget={widget} />
                ))}
            </div>
            <SaveLayout />
        </div>

    )
}