import {
  createContext, ReactNode, useContext, useEffect, useMemo, useRef,
} from 'react';
import styled from '@emotion/styled';

const Root = styled.div`
  display: contents;
`;

interface KeynavManagerContextValue {
  focusOnFirstItem(): void;
  updateTree(): void;
}

const KeynavManagerContext = createContext<KeynavManagerContextValue>({
  focusOnFirstItem: () => null,
  updateTree: () => null,
});

type KeynavGroupIdMap = { [groupId: string]: HTMLUListElement };
type KeynavGroupChildrenArrayMap = { [groupId: string]: HTMLButtonElement[] };
type KeynavItemGroupMap = Map<HTMLButtonElement, string>;
const KEYNAV_ALLOWED_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];

function focusOn(element: HTMLButtonElement) {
  element.focus();
  element.scrollIntoView({ block: 'center', inline: 'nearest' });
}

function getKeyFromDOMId(id: string) {
  return id.replace(/^keynav\.(group|item)#/, '');
}

interface KeynavManagerProviderProps {
  children: ReactNode;
}

export function KeynavManagerProvider({ children }: KeynavManagerProviderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const groupsArrayRef = useRef<HTMLUListElement[]>([]);
  const groupIdMapRef = useRef<KeynavGroupIdMap>({});
  const groupChildrenArrayMapRef = useRef<KeynavGroupChildrenArrayMap>({});
  const itemGroupMapRef = useRef<KeynavItemGroupMap>(new Map());

  useEffect(() => {
    if (ref.current) {
      const container = ref.current;

      const handleKeyDown = (ev: KeyboardEvent) => {
        if (!KEYNAV_ALLOWED_KEYS.includes(ev.key)) {
          return;
        }

        const focused = document.activeElement as HTMLButtonElement;
        if (focused?.getAttribute('role') !== 'treeitem') {
          return;
        }

        const groups = groupsArrayRef.current;
        const groupIds = groupIdMapRef.current;
        const childrenArrays = groupChildrenArrayMapRef.current;
        const itemGroups = itemGroupMapRef.current;

        const groupId = itemGroups.get(focused) as string;
        const siblings = childrenArrays[groupId];
        const selectedIndex = siblings.indexOf(focused);
        const groupIndex = groups.indexOf(groupIds[groupId]);

        switch (ev.key) {
          case 'ArrowUp': {
            const element = siblings[Math.max(0, selectedIndex - 1)];
            focusOn(element);
            break;
          }
          case 'ArrowDown': {
            const element = siblings[Math.min(siblings.length - 1, selectedIndex + 1)];
            focusOn(element);
            break;
          }
          case 'ArrowLeft': {
            const parentGroupId = getKeyFromDOMId(groups[Math.max(0, groupIndex - 1)].id);
            const selected = groupIds[parentGroupId].querySelector<HTMLButtonElement>('[aria-selected=true]');
            const element = (selected ?? childrenArrays[parentGroupId][0]);
            focusOn(element);
            break;
          }
          case 'ArrowRight': {
            const childrenGroupId = getKeyFromDOMId(focused.getAttribute('data-aria-owns') || '');
            if (childrenGroupId) {
              if (focused.getAttribute('aria-selected') === 'true') {
                const selected = groupIds[childrenGroupId].querySelector<HTMLButtonElement>('[aria-selected=true]');
                const element = (selected ?? childrenArrays[childrenGroupId][0]);
                focusOn(element);
              } else {
                focused.click();
              }
            }
            break;
          }
          case 'Home': {
            siblings[0].focus();
            break;
          }
          case 'End': {
            siblings[siblings.length - 1].focus();
            break;
          }
          default:
        }
        ev.preventDefault();
      };
      container.addEventListener('keydown', handleKeyDown);
      return () => {
        container.removeEventListener('keydown', handleKeyDown);
      };
    }
    return () => {};
  }, []);

  const value = useMemo(() => ({
    focusOnFirstItem: () => {
      const container = ref.current;
      if (container) {
        container.querySelector<HTMLButtonElement>('[role=treeitem]')?.focus();
      }
    },
    updateTree: () => {
      const container = ref.current;
      if (container) {
        groupsArrayRef.current = [
          ...container.querySelectorAll<HTMLUListElement>('[role=group]').values(),
        ];
        groupIdMapRef.current = {};
        groupChildrenArrayMapRef.current = {};
        groupsArrayRef.current.forEach((element) => {
          const groupId = getKeyFromDOMId(element.id);
          groupIdMapRef.current[groupId] = element;
          const childrenArray = [
            ...element.querySelectorAll<HTMLButtonElement>('[role=treeitem]').values(),
          ];
          groupChildrenArrayMapRef.current[groupId] = childrenArray;
          childrenArray.forEach((child) => itemGroupMapRef.current.set(child, groupId));
        });
      }
    },
  }), []);

  return (
    <KeynavManagerContext.Provider value={value}>
      <Root ref={ref}>
        {children}
      </Root>
    </KeynavManagerContext.Provider>
  );
}

export const useKeynavManager = () => useContext(KeynavManagerContext);
