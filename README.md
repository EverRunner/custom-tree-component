# Tree Component Demo

A React TypeScript implementation of a hierarchical tree component that renders taxonomy data with features like search, keyboard navigation, and customizable rendering.

## 🚀 Features

- **Tree Visualization**: Expandable/collapsible tree structure
- **Search/Filter**: Real-time search with highlighting
- **Keyboard Navigation**: Arrow keys and Enter for interaction
- **Accessibility**: ARIA attributes and keyboard support
- **Customizable**: Generic implementation for different data types
- **Performance**: Optimized for large datasets (500+ nodes)
- **TypeScript**: Full type safety and documentation

## 🛠️ Technologies

- React 18
- TypeScript
- Vite
- TailwindCSS
- Jest & Testing Library
- ESLint & Prettier

## 📦 Installation

1. Clone the repository:
   bash
   git clone https://github.com/EverRunner/custom-tree-component.git
   cd tree-component

2. Install dependencies:
   bash
   npm install

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🧪 Testing

The project includes comprehensive tests using Jest and React Testing Library. Key test cases cover:

- Tree rendering and expansion
- Search functionality
- Keyboard navigation
- Accessibility features

## 📁 Project Structure

```
src/
├── components/
│   ├── Tree/
│   │   ├── Index.tsx      # Main tree component
│   │   └── TreeItem.tsx   # Individual tree node component
│   ├── Input.tsx          # Reusable input component
│   ├── Loading.tsx        # Loading spinner component
│   └── TaxonomyItem.tsx   # Custom renderer for taxonomy data
├── lib/
│   └── types.ts           # TypeScript interfaces
├── utils/
│   └── taxonomy.json      # Mock data
└── App.tsx                # Root component
```

## 🔧 Configuration

### Environment Variables

No environment variables are required to run this project.

### TypeScript Configuration

The project uses TypeScript with strict mode enabled. Configuration can be found in:

- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`

### ESLint & Prettier

Code style is enforced using ESLint and Prettier. Configuration files:

- `.eslintrc.js`
- `.prettierrc.cjs`

## 🎯 Usage Example

```tsx
import Tree from './components/Tree';
import { TaxonomyItemType } from './lib/types';

function App() {
  return (
    <Tree<TaxonomyItemType>
      items={data}
      filter={true}
      ItemRenderer={TaxonomyItem}
      filterPlaceholder="Search..."
      getChildren={(item) => item.children}
      onItemClick={(item) => console.log('Clicked:', item)}
    />
  );
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run format` - Format code
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## 👥 Authors

- [@everRunner](https://github.com/EverRunner)
