"use client"
import { DndContext } from "@dnd-kit/core";
import { Canvas } from "./Canvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { WidgetPalette } from "./WidgetPalette";
import { useState } from "react";
import { WIDGET_REGISTRY, WidgetSchema, WidgetType } from "../config/widgetRegistry";
import { useEditorStore } from "../store/useEditorStore";
import { DragOverlay, DragStartEvent, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

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

export default function BuilderLayout() {
    const [activeId, setActiveId] = useState<WidgetType | null>(null);
    const addWidget = useEditorStore((store) => store.addWidget);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 }
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as WidgetType);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null);
        const { over } = event;
        if (!over) return;
        if (over.id === 'canvas-drop-zone') {
            addWidget(event.active.id as WidgetType)
        }
    };
    return (
        <div className="flex w-screen h-screen">
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors}>
                <WidgetPalette />
                <Canvas />
                <PropertiesPanel />
                <DragOverlay dropAnimation={null}>
                    {activeId ? (
                        <WidgetUI widget={WIDGET_REGISTRY[activeId]} isOverlay />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}
