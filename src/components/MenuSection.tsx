import React, { useState } from 'react';
import { Search, Plus, Sparkles, Filter } from 'lucide-react';
import { MenuItem, Category } from '../types';
import { MENU_ITEMS } from '../data/cafeData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickAdd
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAroma, setSelectedAroma] = useState<string | null>(null);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'espresso', label: 'Espresso Bar' },
    { id: 'cold-brew', label: 'Cold Brews' },
    { id: 'tea-matcha', label: 'Tea & Matcha' },
    { id: 'bakery', label: 'Artisan Bakery' },
    { id: 'brunch', label: 'Kitchen & Brunch' },
    { id: 'coffee-beans', label: 'Roasted Beans' }
  ];

  const aromaProfiles = [
    { id: 'chocolate', label: 'Dark Chocolate & Cacao' },
    { id: 'citrus', label: 'Citrus & Floral' },
    { id: 'berry', label: 'Berry & Fruit' },
    { id: 'caramel', label: 'Caramel & Toffee' },
    { id: 'nutty', label: 'Nutty & Spiced' }
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tastingNotes && item.tastingNotes.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    let matchesAroma = true;
    if (selectedAroma) {
      if (!item.tastingNotes) {
        matchesAroma = false;
      } else {
        const aromaLower = selectedAroma.toLowerCase();
        matchesAroma = item.tastingNotes.some(note => 
          note.toLowerCase().includes(aromaLower) ||
          (aromaLower === 'chocolate' && (note.toLowerCase().includes('chocolate') || note.toLowerCase().includes('cacao') || note.toLowerCase().includes('fudge'))) ||
          (aromaLower === 'citrus' && (note.toLowerCase().includes('citrus') || note.toLowerCase().includes('lemon') || note.toLowerCase().includes('jasmine') || note.toLowerCase().includes('orange'))) ||
          (aromaLower === 'berry' && (note.toLowerCase().includes('berry') || note.toLowerCase().includes('cherry') || note.toLowerCase().includes('currant'))) ||
          (aromaLower === 'caramel' && (note.toLowerCase().includes('caramel') || note.toLowerCase().includes('toffee') || note.toLowerCase().includes('brown sugar') || note.toLowerCase().includes('honey'))) ||
          (aromaLower === 'nutty' && (note.toLowerCase().includes('nut') || note.toLowerCase().includes('almond') || note.toLowerCase().includes('walnut') || note.toLowerCase().includes('cardamom')))
        );
      }
    }

    return matchesCategory && matchesSearch && matchesAroma;
  });

  return (
    <section id="menu" className="py-14 sm:py-20 bg-[#FBF9F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E3D8]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block mb-1">
              01 / Offerings
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
              Seasonal Menu
            </h2>
          </div>

          {/* Minimal Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, bakery, origin..."
              className="w-full py-2 pl-9 pr-3 rounded-md bg-[#FFFFFF] border border-[#E8E3D8] text-[#1C1917] text-xs placeholder:text-[#A8A29E] focus:outline-none focus:border-[#8C5E3C] transition-colors font-mono"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-4 border-b border-[#E8E3D8]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1C1917] text-[#FBF9F5] font-medium shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2ECE1]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Aroma Profiler Chips (Inspired by React Bits & Aceternity) */}
        <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-mono text-[#78716C] border-b border-[#E8E3D8]/60">
          <div className="flex items-center gap-1 shrink-0 text-[#A8A29E] text-[11px] pr-1">
            <Filter className="w-3 h-3 text-[#8C5E3C]" />
            <span>Taste Profile:</span>
          </div>

          <button
            onClick={() => setSelectedAroma(null)}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
              selectedAroma === null
                ? 'bg-[#8C5E3C]/15 text-[#8C5E3C] font-medium'
                : 'bg-[#FFFFFF] border border-[#E8E3D8] hover:border-[#D6CFBF] text-[#78716C]'
            }`}
          >
            All Notes
          </button>

          {aromaProfiles.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedAroma(selectedAroma === p.id ? null : p.id)}
              className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedAroma === p.id
                  ? 'bg-[#1C1917] text-[#FBF9F5] font-medium'
                  : 'bg-[#FFFFFF] border border-[#E8E3D8] hover:border-[#D6CFBF] text-[#78716C]'
              }`}
            >
              <span>{p.label}</span>
              {selectedAroma === p.id && <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group rounded-lg bg-[#FFFFFF] border border-[#E8E3D8] hover:border-[#D6CFBF] transition-all cursor-pointer flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md active:scale-[0.99] shine-hover"
            >
              {/* Image */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F0EBE1] relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  loading="lazy"
                />
                {item.origin && (
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[#FBF9F5] bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    {item.origin.split(',')[0]}
                  </span>
                )}
                {item.elevation && (
                  <span className="absolute top-2 right-2 text-[9px] font-mono text-[#1C1917] bg-[#FBF9F5]/90 px-1.5 py-0.5 rounded border border-[#E8E3D8]">
                    {item.elevation}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-serif text-[#1C1917] group-hover:text-[#8C5E3C] transition-colors font-semibold">
                      {item.name}
                    </h3>
                    <span className="font-mono text-xs text-[#1C1917] font-semibold">
                      ₹{item.price}
                    </span>
                  </div>

                  <p className="text-xs text-[#78716C] line-clamp-2 mt-1 font-light leading-relaxed">
                    {item.tagline || item.description}
                  </p>
                </div>

                {/* Bottom actions */}
                <div className="pt-2 border-t border-[#F2ECE1] flex items-center justify-between">
                  {item.tastingNotes ? (
                    <span className="text-[10px] font-mono text-[#A8A29E] truncate max-w-[130px]">
                      {item.tastingNotes.join(' · ')}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-[#A8A29E]">Freshly prepared</span>
                  )}

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item);
                      }}
                      className="px-2.5 py-1 rounded bg-[#F4F0E8] hover:bg-[#EAE5DC] text-[#1C1917] text-[11px] font-mono transition-colors cursor-pointer"
                    >
                      Options
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAdd(item);
                      }}
                      className="p-1 rounded bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] transition-colors shadow-xs cursor-pointer active:scale-90"
                      title="Quick add to order"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-[#A8A29E] font-mono text-xs">
            No items match the selected filter. Try choosing "All Items" or reset taste profile.
          </div>
        )}
      </div>
    </section>
  );
};
