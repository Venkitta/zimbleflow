"use client";

import { useEditorStore, WidgetInstance } from "../store/useEditorStore";

export function CanvasWidgetRenderer({ widget }: { widget: WidgetInstance }) {
    const { selectWidget, selectedWidgetId } = useEditorStore();
    const isSelected = selectedWidgetId === widget.id;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent deselecting when clicking the widget
        selectWidget(widget.id);
    };

    const containerStyle = {
        position: "relative" as const,
        border: isSelected ? "2px solid #3b82f6" : "1px solid transparent",
        cursor: "pointer",
    };

    const { props } = widget;

    // --- RENDER LOGIC ---
    const renderContent = () => {
        switch (widget.type) {
            case "BUTTON":
                return (
                    <button
                        style={{
                            width: props.width,
                            height: props.height,
                            backgroundColor: props.backgroundColor,
                            color: props.textColor,
                            borderRadius: props.borderRadius,
                        }}
                        className="flex items-center justify-center font-medium transition-all"
                    >
                        {props.text}
                    </button>
                );

            case "TEXT":
                return (
                    <div
                        style={{
                            fontSize: props.fontSize,
                            color: props.color,
                        }}
                    >
                        {props.text}
                    </div>
                );

            case "CAMERA_TILE":
                return (
                    <div
                        style={{
                            width: props.width,
                            height: props.height,
                            borderRadius: props.borderRadius,
                        }}
                        className="bg-gray-900 relative overflow-hidden flex flex-col justify-between p-2"
                    >
                        {props.showOverlay && (
                            <div className="absolute top-2 right-2 flex gap-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-[10px] text-white uppercase font-bold">REC</span>
                            </div>
                        )}
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            {/* Camera View */}
                            <div className="w-10 h-10 rounded-full border-2 border-gray-600" />
                        </div>
                        <span className="text-white text-xs bg-black/50 px-2 py-1 rounded self-start">
                            {props.label}
                        </span>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div onClick={handleClick} className="inline-block m-2" style={containerStyle}>
            {renderContent()}
        </div>
    );
}