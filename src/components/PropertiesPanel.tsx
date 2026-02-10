"use client";

import { WIDGET_REGISTRY } from "../config/widgetRegistry";
import { useEditorStore } from "../store/useEditorStore";

export function PropertiesPanel() {
    const { selectedWidgetId, widgets, updateWidget, deleteWidget } = useEditorStore();

    const selectedWidget = widgets.find((w) => w.id === selectedWidgetId);

    if (!selectedWidget) {
        return (
            <div className="w-80 bg-gray-50 border-l p-6 text-black text-center">
                Select a widget to edit properties
            </div>
        );
    }

    const schema = WIDGET_REGISTRY[selectedWidget.type];

    const handleInputChange = (key: string, value: any) => {
        updateWidget(selectedWidget.id, { [key]: value });
    };

    return (
        <div className="w-80 bg-white border-l flex flex-col h-full">
            <div className="p-4 border-b">
                <h2 className="font-bold text-lg text-black">{schema.label} Properties</h2>
                <span className="text-xs text-black">ID: {selectedWidget.id}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {schema.fields.map((field) => (
                    <div key={field.name} className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-black">
                            {field.label}
                        </label>

                        {/* Dynamic Input Rendering */}
                        {field.type === "text" && (
                            <input
                                type="text"
                                value={selectedWidget.props[field.name]}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                className="border rounded px-2 py-1 text-sm text-black"
                            />
                        )}

                        {field.type === "number" && (
                            <input
                                type="number"
                                value={selectedWidget.props[field.name]}
                                onChange={(e) => handleInputChange(field.name, Number(e.target.value))}
                                className="border rounded px-2 py-1 text-sm text-black"
                            />
                        )}

                        {field.type === "color" && (
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={selectedWidget.props[field.name]}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                    className="h-8 w-8 cursor-pointer border rounded text-black"
                                />
                                <span className="text-xs text-black uppercase">{selectedWidget.props[field.name]}</span>
                            </div>
                        )}

                        {field.type === "boolean" && (
                            <input
                                type="checkbox"
                                checked={selectedWidget.props[field.name]}
                                onChange={(e) => handleInputChange(field.name, e.target.checked)}
                                className="w-4 h-4"
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t bg-gray-50">
                <button
                    onClick={() => deleteWidget(selectedWidget.id)}
                    className="cursor-pointer w-full bg-red-100 text-red-600 py-2 rounded text-sm hover:bg-red-200"
                >
                    Delete Widget
                </button>
            </div>
        </div>
    );
}