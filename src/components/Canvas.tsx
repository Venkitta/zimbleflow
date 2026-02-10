"use client";

import { useEditorStore } from "../store/useEditorStore";
import { useDroppable } from '@dnd-kit/core';
import { CanvasWidgetRenderer } from "./CanvasWidgetRenderer";

export function Canvas() {
    const { widgets } = useEditorStore();
    const { setNodeRef } = useDroppable({
        id: 'canvas-drop-zone',
    });
    return (
        <div className="flex-1 flex flex-col bg-[#F3F4F6] p-4 overflow-auto items-center justify-center">

            <div ref={setNodeRef} className="w-[350px] h-[700px] shadow-lg rounded-lg border border-slate-200 bg-white">
                {widgets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-gray-500">Drop widgets here</p>
                    </div>
                ) : (
                    widgets.map((widget) => (
                        <CanvasWidgetRenderer key={widget.id} widget={widget} />
                    ))
                )}
            </div>
        </div>
    );
}