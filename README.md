<div align="center">

# 🎨 ZimbleFlow Editor

</div>

Welcome to the ZimbleFlow documentation. This project is a schema-driven UI builder built with React, Next.js, and Zustand.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** installed on your machine.

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/yourusername/zimbleflow.git

# Navigate to project directory
cd zimbleflow

# Install dependencies
npm install
```

### Running the Project

Start the development server:

```bash
npm run dev
```

The application will be available at **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 🛠 How Widgets are Registered

Widgets are defined in a central configuration file called the WIDGET_REGISTRY. This registry acts as the "Single Source of Truth" for what the editor can render.

### The Registration Schema

Each widget must implement the WidgetSchema interface:

| Property | Description |
|----------|-------------|
| `type` | A unique string identifier (e.g., `BUTTON`, `TEXT`) |
| `label & icon` | Visual markers for the sidebar |
| `defaultProps` | An object with initial state when dropped on canvas |
| `fields` | An array defining the editable properties. |

**Example:**

```typescript
const WIDGET_REGISTRY: Record<WidgetType, WidgetSchema> = {
    BUTTON: {
        type: "BUTTON",
        label: "Button",
        icon: MousePointer2,
        defaultProps: { 
		text: "Click Me", 
		width: 120, 
		//... 
	},
        fields: [
            { name: "text", label: "Label Text", type: "text" },
            //...
        ],
    },
};
```
---

## ⚙️ How Dynamic Properties are Handled

The `PropertiesPanel` component **dynamically generates** an interface based on the `fields` array of the selected widget. Instead of hardcoding inputs for every widget type, the panel maps through the schema.

#### How It Works:

1. **Selection** → The panel retrieves the `selectedWidgetId` from the state.
2. **Lookup** → It finds the corresponding schema in the `WIDGET_REGISTRY`.
3. **Dynamic Rendering** → It switches between input types (text, number, color, boolean) based on the field definition.
4. **Updates** → When an input changes, it calls `updateWidget`, merging the new value into the widget's props object.

---

## 📄 How the Layout JSON Works

The entire canvas is represented as an array of `WidgetInstance` objects. This makes the data easy to save and move.

### JSON Structure

Each widget instance in the layout looks like this:

```json
{
  "id": "uuid-v4-string",
  "type": "CAMERA_TILE",
  "props": {
    "label": "Front Door",
    "width": 200,
    "showOverlay": true
  }
}
```

> 💾 When you click Save, the entire array is stringified and stored in `localStorage` under the key `editor_layout`.

---

## 🧠 How State is Managed

State is handled globally using **Zustand** via `useEditorStore`. This provides a lightweight, reactive way to manage the canvas without "prop-drilling."

| Method | Description |
|--------|-------------|
| `addWidget` | Clones `defaultProps` from registry and assigns a unique UUID |
| `updateWidget` | Updates a specific widget's properties without affecting the rest of its data.|
| `selectWidget` | Tracks which element is currently active for editing |
| `save/loadLayout` | Saves or restores canvas layout using browser's memory |

---

<div align="center">

[⬆ Back to Top](#-zimbleflow-editor)

</div>