import { ChevronDown, ChevronRight } from 'lucide-react';
import { KeyboardEvent, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * TreeItem Component
 *
 * Renders a single item in the tree structure with support for:
 * - Expansion/collapse of child nodes
 * - Keyboard navigation
 * - Search highlighting
 * - Focus management
 *
 * @template T - The type of data being rendered
 */
interface TreeItemProps<T> {
  /** The data item to render */
  item: T;
  /** The indentation level of this item */
  level?: number;
  /** Size of each indentation level in pixels */
  indentSize: number;
  /** Component to render the item content */
  ItemRenderer: React.ComponentType<{ item: T }>;
  /** Set of currently expanded items */
  expandedItems?: Set<T>;
  /** Current search term for filtering */
  searchTerm?: string;
  /** ID of the currently focused item */
  focusId?: string;
  /** Callback when item is clicked */
  onItemClick?: (item: T) => void;
  /** Function to get children of an item */
  getChildren?: (item: T) => T[] | undefined;
  /** Callback when item is toggled (expanded/collapsed) */
  onToggle?: (item: T) => void;
  /** Function to determine if an item matches the search term */
  itemMatchesSearch?: (item: T, term: string) => boolean;
  /** Callback when focus changes */
  onFocusChange?: (id: string) => void;
}

const TreeItem = <T,>({
  item,
  level = 0,
  indentSize,
  ItemRenderer,
  expandedItems = new Set(),
  searchTerm = '',
  focusId,
  onItemClick,
  getChildren,
  onToggle,
  itemMatchesSearch = () => false,
  onFocusChange,
}: TreeItemProps<T>) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const itemId = useRef(`tree-item-${uuidv4()}`);
  const children = getChildren?.(item);
  const hasChildren = children && children.length > 0;
  const isItemExpanded = expandedItems.has(item);

  // Recursive function to check if any descendants match the search term
  const hasMatchingDescendant = useCallback(
    (items: T[] | undefined): boolean => {
      if (!items) return false;

      return items.some((child) => {
        const childMatches = itemMatchesSearch(child, searchTerm);
        const childrenMatch = hasMatchingDescendant(getChildren?.(child));
        return childMatches || childrenMatch;
      });
    },
    [searchTerm, itemMatchesSearch, getChildren]
  );

  // Handle keyboard navigation for accessibility
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight': // Expand node
          if (hasChildren && !isItemExpanded) {
            e.preventDefault();
            onToggle?.(item);
          }
          break;
        case 'ArrowLeft': // Collapse node
          if (hasChildren && isItemExpanded) {
            e.preventDefault();
            onToggle?.(item);
          }
          break;
        case 'Enter': // Select node
        case ' ':
          e.preventDefault();
          onItemClick?.(item);
          break;
      }
    },
    [item, hasChildren, isItemExpanded, onToggle, onItemClick]
  );

  // Handle search matching logic
  const matchesSearch = !searchTerm || itemMatchesSearch(item, searchTerm);
  const childrenMatchSearch = hasMatchingDescendant(children);

  // Hide items that don't match search
  if (searchTerm && !matchesSearch && !childrenMatchSearch) {
    return null;
  }

  return (
    <div style={{ marginLeft: `${level * indentSize}px` }}>
      <div
        ref={itemRef}
        className="flex items-center gap-2"
        tabIndex={0}
        role="treeitem"
        aria-expanded={hasChildren ? isItemExpanded : undefined}
        id={itemId.current}
        onKeyDown={handleKeyDown}
        onClick={() => onFocusChange?.(itemId.current)}
      >
        {hasChildren && (
          <button
            onClick={() => onToggle?.(item)}
            className="rounded-full bg-transparent p-2 hover:bg-gray-100"
          >
            {isItemExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        )}
        <div onClick={() => onItemClick?.(item)}>
          <ItemRenderer item={item} />
        </div>
      </div>

      {isItemExpanded && hasChildren && (
        <div>
          {children!.map((child) => (
            <TreeItem<T>
              key={uuidv4()}
              item={child}
              level={level + 1}
              indentSize={indentSize}
              getChildren={getChildren}
              ItemRenderer={ItemRenderer}
              onItemClick={onItemClick}
              onToggle={onToggle}
              expandedItems={expandedItems}
              searchTerm={searchTerm}
              itemMatchesSearch={itemMatchesSearch}
              focusId={focusId}
              onFocusChange={onFocusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeItem;
