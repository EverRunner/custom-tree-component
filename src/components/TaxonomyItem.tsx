import { TaxonomyItemType } from '@/lib/types';

export default function TaxonomyItem({ item }: { item: TaxonomyItemType }) {
  return (
    <div>
      <strong className="text-gray-800">{item.name}</strong> ({item.taxon})
      {item.common_name && (
        <em className="text-gray-500"> - {item.common_name}</em>
      )}
    </div>
  );
}
