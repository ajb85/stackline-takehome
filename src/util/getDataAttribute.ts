export function findElementWithDataAttribute(
  element: HTMLElement | Event,
  attribute: String
): HTMLElement | null {
  if (!element) {
    return null;
  }

  let target = element instanceof Event ? element.target : element;

  if (target === null) {
    return null;
  }

  while (
    target &&
    !(target as HTMLElement).dataset?.hasOwnProperty(attribute as PropertyKey)
  ) {
    target = (target as HTMLElement).parentNode as HTMLElement;
  }

  return (target as HTMLElement)?.dataset ? (target as HTMLElement) : null;
}

export function findDataAttribute(
  element: EventTarget,
  attribute: string
): string | null {
  const ele = findElementWithDataAttribute(element as HTMLElement, attribute);
  return ele?.dataset[attribute] ?? null;
}
