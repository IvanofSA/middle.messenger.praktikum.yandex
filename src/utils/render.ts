export default function render(query: string, block: any): Element | null {
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  return root;
}
