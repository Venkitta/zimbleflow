import { useEditorStore } from "../store/useEditorStore";

export function SaveLayout() {
    const saveLayout = useEditorStore((store) => store.saveLayout);
    const loadLayout = useEditorStore((store) => store.loadLayout);
    return (
        <div className="p-4 border-t space-y-2">
            <button onClick={saveLayout} className="w-full bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700">Save Layout</button>
            <button onClick={loadLayout} className="w-full bg-gray-200 text-gray-800 py-2 rounded text-sm hover:bg-gray-300">Load Layout</button>
        </div>
    )
}