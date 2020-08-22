import { useState, useLayoutEffect, useCallback } from 'react';

function isScrollInBoundingBox(elementScroll: HTMLElement, element: HTMLElement): boolean {
  const { scrollTop } = elementScroll;
  const position: number = element.getBoundingClientRect().bottom ?? Infinity;

  return scrollTop <= position - 16;
}

export function useSectionNavigation(sections: string[], element: HTMLElement): any {
  const [isScrolling, setIsScrolling] = useState<number | undefined>();
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  const [sectionActive, setSectionActive] = useState<string | undefined>(sections[0]);

  const selectSection = useCallback((section: string) => {
    document.getElementById(section)?.scrollIntoView();
    setSectionActive(section);
    setMenuClicked(true);
  }, []);

  useLayoutEffect(() => {
    const onScroll = (): void => {
      const listSection = sections.map((section) => ({
        name: section,
        element: document.getElementById(section) as HTMLElement
      }));

      window.clearTimeout(isScrolling);

      setIsScrolling(
        (setTimeout(() => {
          setMenuClicked(false);
          setIsScrolling(undefined);
        }, 100) as unknown) as number
      );

      if (!menuClicked) {
        setSectionActive(listSection.find((section) => isScrollInBoundingBox(element, section.element))?.name);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [element, isScrolling, menuClicked, sections]);

  return {
    sectionActive,
    selectSection
  };
}
