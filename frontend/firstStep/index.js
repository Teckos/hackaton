//import { createRoot } from 'react-dom/client';
const container = document.getElementById("root");
//const root = createRoot(container);
ReactDOM.render(
    <div>
        <h1>Hello, everyone!</h1>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
        </ul>
    </div>,
    container
);