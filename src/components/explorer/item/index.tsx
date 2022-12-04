import { AriaRole, useMemo, useRef } from 'react';
import clsx from 'clsx';
import styled from '@emotion/styled';
import Body2 from 'components/typography/Body2';
import ChevronRightIcon from 'components/icons/ChevronRight';
import { ExplorerItemType } from 'types/explorer';
import { textEllipsis } from 'styles/compositions';

const Component = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 0;
  cursor: pointer;
  display: flex;
  height: 24px;
  padding: 4px 6px 4px 8px;
  text-align: left;
  transition: background-color 0.1s ease-in-out;
  width: 100%;

  &:hover, &:focus {
    background-color: rgba(var(--color-neutral-5-dec) / 0.3);
  }

  &:focus-visible {
    outline-width: 1px;
  }

  &.unfocused {
    background-color: rgba(var(--color-neutral-5-dec) / 0.6);
  }

  &.selected {
    background-color: var(--color-purple-2);
    color: var(--color-white);
  }
`;

const Icon = styled.img`
  height: 16px;
  min-width: 16px;
  width: 16px;
`;

const Name = styled(Body2)`
  ${textEllipsis}
  flex-grow: 1;
  margin: 0 4px;
`;

const Chevron = styled(ChevronRightIcon)`
  min-width: 9px;
`;

const FileIcon = <Icon src="/assets/images/icon-file.svg" alt="file: " />;
const FolderIcon = <Icon src="/assets/images/icon-folder.svg" alt="folder: " />;

type ExplorerItemProps = {
  onClick?: () => void;
  name: string;
  selected?: boolean;
  type: ExplorerItemType;
  unfocused?: boolean;
} & { id: string; role: AriaRole; tabIndex?: number };

function ExplorerItem({
  onClick = () => null,
  name,
  selected = false,
  type,
  unfocused = false,
  ...props
}: ExplorerItemProps) {
  const ref = useRef<HTMLLIElement>(null);

  const icon = useMemo(() => {
    switch (type) {
      case 'file': {
        return FileIcon;
      }

      case 'folder': {
        return FolderIcon;
      }

      default: {
        return null;
      }
    }
  }, [type]);

  const handleClick = () => {
    onClick();
    if (type === 'file') {
      window.setTimeout(() => { ref.current?.scrollIntoView(); });
    }
  };

  return (
    <li ref={ref} role="none">
      <Component
        {...props}
        className={clsx(selected && 'selected', unfocused && 'unfocused')}
        onClick={handleClick}
      >
        {icon}
        <Name>{name}</Name>
        {type === 'folder' && (
          <Chevron color={`var(--color-${selected ? 'white' : 'neutral-7'})`} height={8} width={9} />
        )}
      </Component>
    </li>
  );
}

export default ExplorerItem;
