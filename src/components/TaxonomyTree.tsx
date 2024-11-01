import { useEffect, useState } from 'react';

import { TaxonomyItemType } from '../lib/types';
import taxonomyData from '../utils/taxonomy.json';
import TaxonomyItem from './TaxonomyItem';
import Tree from './Tree/Index';

/**
 * TaxonomyTree component that displays hierarchical taxonomy data in a tree structure.
 * Features include:
 * - Async data loading with loading state
 * - Error handling
 * - Search/filter functionality (optional)
 * - Interactive item clicking
 * - Customizable search filter and click handler
 * - Customizable item renderer
 */
export default function TaxonomyTree() {
  const [data, setData] = useState<TaxonomyItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Effect hook to fetch and load taxonomy data
  //Includes artificial delay to demonstrate loading state
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setData(taxonomyData);
      } catch (error) {
        setError('Error fetching taxonomy data');
        console.error('Error fetching taxonomy data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  //Custom search filter for when a search term is entered
  const searchFilter = (item: TaxonomyItemType, term: string) => {
    const searchTerm = term.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchTerm) ||
      item.common_name.toLowerCase().includes(searchTerm) ||
      item.taxon.toLowerCase().includes(searchTerm)
    );
  };

  //Custom click handler for when a tree item is clicked
  const handleItemClick = (item: TaxonomyItemType) => {
    console.log('Item clicked:', item);
  };

  return (
    <div className="mx-auto w-[768px] rounded-lg border border-gray-300 p-4">
      <Tree<TaxonomyItemType>
        items={data}
        filter={true}
        error={error}
        loading={loading}
        ItemRenderer={TaxonomyItem}
        filterPlaceholder="Search Taxonomy..."
        getChildren={(item) => item.children}
        searchFilter={searchFilter}
        onItemClick={handleItemClick}
      />
    </div>
  );
}
