import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  material: string;
  inStock: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  cost: number;
  materials: string;
  duration: string;
  testimonial?: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
  tags: string[];
}

interface AppContextType {
  products: Product[];
  projects: Project[];
  blogPosts: BlogPost[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Modern Oak Dining Table',
      description: 'Handcrafted from sustainable oak wood with a natural finish.',
      price: 1299,
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      category: 'Dining Room',
      material: 'Oak Wood',
      inStock: true,
    },
    {
      id: '2',
      name: 'Luxury Leather Sofa',
      description: 'Premium Italian leather with solid hardwood frame.',
      price: 2499,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      category: 'Living Room',
      material: 'Leather & Hardwood',
      inStock: true,
    },
    {
      id: '3',
      name: 'Ergonomic Office Chair',
      description: 'Modern design with lumbar support and adjustable height.',
      price: 599,
      image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
      category: 'Office',
      material: 'Mesh & Steel',
      inStock: false,
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Modern Living Room Makeover',
      description: 'Complete transformation of a traditional living space into a modern, minimalist haven.',
      beforeImage: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg',
      afterImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      cost: 15000,
      materials: 'Italian Leather, Oak Wood, Steel',
      duration: '6 weeks',
      testimonial: 'Amazing transformation! The team exceeded our expectations.',
    },
    {
      id: '2',
      title: 'Executive Office Redesign',
      description: 'Professional office space designed for productivity and style.',
      beforeImage: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
      afterImage: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg',
      cost: 8500,
      materials: 'Walnut Wood, Leather, Glass',
      duration: '4 weeks',
    },
  ]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Sustainable Furniture: A Guide to Eco-Friendly Choices',
      content: 'Learn about sustainable materials and practices in furniture manufacturing...',
      excerpt: 'Discover how to make environmentally conscious furniture choices.',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      date: '2024-01-15',
      tags: ['sustainability', 'eco-friendly', 'materials'],
    },
    {
      id: '2',
      title: 'The Art of Mixing Modern and Traditional Styles',
      content: 'Creating harmony between contemporary and classic furniture pieces...',
      excerpt: 'Tips for blending different design aesthetics in your home.',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
      date: '2024-01-10',
      tags: ['design', 'styling', 'modern', 'traditional'],
    },
  ]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updatedProject } : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: Date.now().toString() };
    setBlogPosts(prev => [...prev, newPost]);
  };

  const updateBlogPost = (id: string, updatedPost: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  return (
    <AppContext.Provider value={{
      products,
      projects,
      blogPosts,
      addProduct,
      updateProduct,
      deleteProduct,
      addProject,
      updateProject,
      deleteProject,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
    }}>
      {children}
    </AppContext.Provider>
  );
};