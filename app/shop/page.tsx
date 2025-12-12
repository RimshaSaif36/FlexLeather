'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import { Heart, ShoppingCart } from 'lucide-react'

const allProducts = [
  { id: 1, name: 'Classic Leather Handbag', price: 299.99, category: 'handbags', color: 'brown', image: '/Classic Leather Handbag.jpg' },
  { id: 2, name: 'Premium Wallet', price: 89.99, category: 'wallets', color: 'Soft Luxe Shades', image: '/Premium Wallet.jpg' },
  { id: 3, name: 'Leather Travel Bag', price: 449.99, category: 'travel', color: 'black', image: '/Leather Travel Bag.jpg' },
  { id: 4, name: 'Crossbody Bag', price: 199.99, category: 'handbags', color: 'black', image: '/Crossbody Bag.jpg' },
  { id: 5, name: 'Passport Holder', price: 49.99, category: 'accessories', color: 'brown', image: '/Passport Holder.jpg' },
  { id: 6, name: 'Laptop Messenger', price: 349.99, category: 'travel', color: 'Soft Luxe Shades', image: '/Laptop Messenger.jpg' },
  { id: 7, name: 'Card Holder Slim', price: 34.99, category: 'accessories', color: 'black', image: '/Card Holder Slim.jpg' },
  { id: 8, name: 'Tote Bag', price: 229.99, category: 'handbags', color: 'brown', image: '/Tote Bag.jpg' },
  { id: 9, name: 'Leather Belt', price: 79.99, category: 'accessories', color: 'brown', image: '/leather belt.jpg' },
  { id: 10, name: 'Weekend Bag', price: 399.99, category: 'travel', color: 'Soft Luxe Shades', image: '/Weekend bag.jpg' },
  { id: 11, name: 'Shoulder Bag', price: 249.99, category: 'handbags', color: 'Soft Luxe Shades', image: '/Shoulder bag.jpg' },
  { id: 12, name: 'Coin Purse', price: 39.99, category: 'accessories', color: 'brown', image: '/Coin purse.jpg' },
]

export default function ShopPage() {
  // Client-safe URL params
  const [categoryParam, setCategoryParam] = useState('all')
  const [queryParam, setQueryParam] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setCategoryParam(params.get('category') || 'all')
    setQueryParam(params.get('q') || '')
  }, [])

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [selectedColor, setSelectedColor] = useState<string>('all')
  const [favorites, setFavorites] = useState<number[]>([])

  const { addToCart } = useCart()

  // Filter products based on category, price, color, and search
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const q = queryParam.toLowerCase()
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      const colorMatch = selectedColor === 'all' || product.color === selectedColor
      const searchMatch = !q || product.name.toLowerCase().includes(q) || product.category.toLowerCase().includes(q)
      return categoryMatch && priceMatch && colorMatch && searchMatch
    })
  }, [selectedCategory, priceRange, selectedColor, queryParam])

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen pt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wide mb-12">
            Our Collection
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="md:col-span-1 space-y-8">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-light tracking-wide mb-4 uppercase opacity-75">Category</h3>
                <div className="space-y-2">
                  {['all', 'handbags', 'wallets', 'travel', 'accessories'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block text-sm font-light ${
                        selectedCategory === cat ? 'text-accent font-semibold' : 'opacity-60 hover:opacity-100'
                      } transition`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 id="filter-price" className="text-sm font-light tracking-wide mb-4 uppercase opacity-75">Price</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    id="price-range"
                    aria-labelledby="filter-price"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <p className="text-xs opacity-60">${priceRange[0]} - ${priceRange[1]}</p>
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h3 className="text-sm font-light tracking-wide mb-4 uppercase opacity-75">Color</h3>
                <div className="space-y-2">
                  {['all', 'black', 'brown', 'Soft Luxe Shades'].map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`block text-sm font-light ${
                        selectedColor === color ? 'text-accent font-semibold' : 'opacity-60 hover:opacity-100'
                      } transition`}
                    >
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="md:col-span-3">
              <p className="text-sm opacity-60 mb-6">Showing {filteredProducts.length} products</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <Link key={product.id} href={`/products/${product.id}`} className="group">
                    <div className="relative overflow-hidden bg-muted aspect-square mb-4">
                      <Image
                        src={product.image ?? '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                      {favorites.includes(product.id) ? (
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); toggleFavorite(product.id) }}
                          aria-pressed="true"
                          aria-label="Remove from favorites"
                          title="Remove from favorites"
                          className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-accent hover:text-accent-foreground transition"
                        >
                          <Heart aria-hidden="true" className="w-5 h-5 fill-current text-accent" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); toggleFavorite(product.id) }}
                          aria-pressed="false"
                          aria-label="Add to favorites"
                          title="Add to favorites"
                          className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-accent hover:text-accent-foreground transition"
                        >
                          <Heart aria-hidden="true" className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <h3 className="text-sm font-light tracking-wide group-hover:text-accent transition">{product.name}</h3>
                    <p className="text-sm font-serif mt-2">${product.price.toFixed(2)}</p>
                    <Button
                      onClick={(e) => { e.preventDefault(); addToCart({ id: product.id, name: product.name, price: product.price, image: product.image ?? '/placeholder.jpg' }) }}
                      className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
