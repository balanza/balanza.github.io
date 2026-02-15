const VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img",
  "input", "link", "meta", "source", "track", "wbr",
]);

const ATTR_ALIASES = { className: "class", htmlFor: "for" };

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

class Html {
  constructor(v) {
    this.value = v;
  }
  toString() {
    return this.value;
  }
}

function renderChildren(children) {
  if (children == null || children === false || children === true) return "";
  if (Array.isArray(children))
    return children.flat(Infinity).map(renderChildren).join("");
  if (children instanceof Html) return children.value;
  return esc(String(children));
}

export function h(tag, props, ...children) {
  if (typeof tag === "function") {
    return tag({
      ...props,
      children: children.length <= 1 ? children[0] : children,
    });
  }

  let html = `<${tag}`;
  let dangerousHtml = null;

  if (props) {
    for (const [key, val] of Object.entries(props)) {
      if (key === "dangerouslySetInnerHTML") {
        dangerousHtml = val.__html;
        continue;
      }
      if (key === "children") continue;
      if (val == null || val === false) continue;
      const attr = ATTR_ALIASES[key] || key;
      html += val === true ? ` ${attr}` : ` ${attr}="${esc(val)}"`;
    }
  }

  html += ">";
  if (VOID.has(tag)) return new Html(html);

  html += dangerousHtml != null ? dangerousHtml : renderChildren(children);
  html += `</${tag}>`;
  return new Html(html);
}

export function Fragment({ children }) {
  return new Html(renderChildren(Array.isArray(children) ? children : [children]));
}
