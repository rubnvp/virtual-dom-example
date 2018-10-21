const h = require('virtual-dom/h');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const createElement = require('virtual-dom/create-element');

// 1: Create a function that declares what the DOM should look like
function render(flowers)  {
    const flowerIds = [...Array(flowers).keys()];
    return (
      <div>{[
        (<input type="text" placeholder="Add a flower"/>),
        (<ul>
          {flowerIds.map(id => (
            <li key={id}>
              {`🌸 Cattleya ${id + 1}`}
            </li>
          ))}
        </ul>)]}
      </div>
    )
    // JSX equivalent to:
    // return h("div", [
    //     h("input", {
    //       "attributes": {
    //         "type": "text",
    //         "placeholder": "Add a flower"
    //       }
    //     }),
    //     h("ul",
    //       flowerIds.map(id => h("li", {"attributes": {"key": id}}, `🌸 Cattleya ${id}`))
    //     )
    // ]);
}

// 2: Initialise the document
let flowers = 0;                    // App state it's just a flowers count.
let tree = render(flowers);         // Create a initial tree
let rootNode = createElement(tree); // Create an initial root DOM node ...
document.getElementById('app').appendChild(rootNode); // ... attach it to the document

// 3: Wire up the update logic
function setState(newFlowers) {
  flowers = newFlowers;
  update();
}

function update() {
  const newTree = render(flowers);
  const patches = diff(tree, newTree); // patch type in virtual-dom/vnode/vpatch.js
  rootNode = patch(rootNode, patches);
  tree = newTree;
}

const appInterval = setInterval(() => {
  setState(flowers + 1);

  // set a maximum events
  if (flowers >= 10) {
    window.clearInterval(appInterval);
  }
}, 1000);