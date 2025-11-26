'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import { Heart, ShoppingCart } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Classic Leather Handbag',
    price: '$299.99',
    image: '/Classic Leather Handbag.jpg',
    category: 'Handbags'
  },
  {
    id: 2,
    name: 'Premium Wallet',
    price: '$89.99',
    image: '/Premium Wallet.jpg',
    category: 'Wallets'
  },
  {
    id: 3,
    name: 'Laptop Messenger',
    price: '$349.99',
    image: '/Laptop Messenger.jpg',
    category: 'Travel'
  },
  {
    id: 4,
    name: 'Crossbody Bag',
    price: '$199.99',
    image: '/Crossbody Bag.jpg',
    category: 'Handbags'
  },
  {
    id: 5,
    name: 'Passport Holder',
    price: '$49.99',
    image: '/Passport Holder.jpg',
    category: 'Accessories'
  },
  {
    id: 6,
    name: 'Leather Travel Bag',
    price: '$449.99',
    image: '/Leather Travel Bag.jpg',
    category: 'Travel'
  },
  {
    id: 7,
    name: 'Card Holder Slim',
    price: '$34.99',
    image: '/Card Holder Slim.jpg',
    category: 'Accessories'
  },
  {
    id: 8,
    name: 'Tote Bag',
    price: '$229.99',
    image: '/Tote Bag.jpg',
    category: 'Handbags'
  }
]

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([])
  const { addToCart } = useCart()

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-center text-3xl md:text-4xl font-serif font-light tracking-wide mb-12">
          Featured Collection
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="relative overflow-hidden bg-muted aspect-square mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                {favorites.includes(product.id) ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(product.id)
                    }}
                    aria-pressed="true"
                    aria-label="Remove from favorites"
                    title="Remove from favorites"
                    className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-accent hover:text-accent-foreground transition"
                  >
                    <Heart
                      aria-hidden="true"
                      className={`w-5 h-5 fill-current text-accent`}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(product.id)
                    }}
                    aria-pressed="false"
                    aria-label="Add to favorites"
                    title="Add to favorites"
                    className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-accent hover:text-accent-foreground transition"
                  >
                    <Heart
                      aria-hidden="true"
                      className={`w-5 h-5`}
                    />
                  </button>
                )}
              </div>
              <h3 className="text-sm font-light tracking-wide group-hover:text-accent transition">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">{product.category}</p>
              <p className="font-serif text-lg mb-4">{product.price}</p>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  addToCart({ id: product.id, name: product.name, price: parseFloat(product.price.replace(/[^0-9.-]+/g, '')) || 0, image: product.image })
                }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
