import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div class="wrapper">
  <svg viewPort="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 50 L50 0 L100 50 L50 100 Z" style="fill:none;stroke:green;stroke-width:3" />
  </svg>
</div>
`;

const originalPath = "M0 50 L50 0 L100 50 L50 100 Z";
const containerLength = 200; // this represents a users viewport size
const svgViewPortLength = 100; // this is taken from the SVG viewport
const scallingCoefficient = containerLength / svgViewPortLength;
const originalCoords = originalPath.match(/\d+/g);
const newCoords = originalCoords!.map((c) => Number(c) * scallingCoefficient);
const scaledPath = createLinePath(newCoords);
setTimeout(() => applyNewPath(scaledPath), 500);

function applyNewPath(path: string) {
  const pathElement = document.querySelector("path");
  pathElement!.setAttribute("d", path);
}

function createLinePath(coords: number[]) {
  return (
    newCoords?.slice(1).reduce<string>((prev, curr, index) => {
      prev += " ";
      if (index % 2 === 1) {
        prev += "L";
      }
      prev += curr;
      return prev;
    }, "M" + coords[0]) + " Z"
  );
}
// globalThis.onBegin = onBegin;

// const star = document.querySelector(".star-svg") as HTMLElement;

// function moveStarToAnchor() {
//   const anchorRect = document
//     .querySelector(".star_anchor")
//     ?.getBoundingClientRect();

//   star.style.translate = `${anchorRect?.x}px ${anchorRect?.y}px`;
// }

// function onBegin() {
//   setInterval(moveStarToAnchor, 100);
// }
