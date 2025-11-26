'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import { Heart, ShoppingCart, Minus, Plus } from 'lucide-react'

const products = [
  { id: 1, name: 'Classic Leather Handbag', price: 299.99, category: 'Handbags', description: 'Timeless elegance meets superior craftsmanship in this signature leather handbag.', specs: ['Genuine Leather', 'Interior Pockets', 'Adjustable Strap', 'Dust Bag Included'], images: '/Classic Leather Handbag.jpg' },
  { id: 2, name: 'Premium Wallet', price: 89.99, category: 'Wallets', description: 'Sophisticated and compact, perfect for the modern professional.', specs: ['RFID Protection', '8 Card Slots', 'Coin Pocket', 'Premium Leather'], images: '/Premium Wallet.jpg' },
  { id: 3, name: 'Leather Travel Bag', price: 449.99, category: 'Travel', description: 'Your perfect companion for weekend getaways and business trips.', specs: ['Expandable Capacity', 'Luggage Handle Sleeve', 'Multiple Compartments', 'Premium Leather'], images: '/Leather Travel Bag.jpg' },
  { id: 4, name: 'Crossbody Bag', price: 199.99, category: 'Handbags', description: 'Hands-free style with timeless appeal.', specs: ['Adjustable Strap', 'Slip Pocket', 'Genuine Leather', 'Lightweight'], images: '/Crossbody Bag.jpg' },
  { id: 5, name: 'Passport Holder', price: 49.99, category: 'Accessories', description: 'Protect your travel documents in style.', specs: ['Passport Fit', 'Card Slots', 'Premium Leather', 'Travel Ready'], images: '/Passport Holder.jpg' },
  { id: 6, name: 'Laptop Messenger', price: 349.99, category: 'Travel', description: 'Professional style for the modern workplace.', specs: ['Laptop Compatible', 'Organization Pockets', 'Premium Leather', 'Adjustable Strap'], images: '/Laptop Messenger.jpg' },
  { id: 7, name: 'Card Holder Slim', price: 34.99, category: 'Accessories', description: 'Minimalist design, maximum functionality.', specs: ['Ultra Slim', '6 Card Slots', 'Premium Leather', 'Compact Design'], images: '/Card Holder Slim.jpg' },
  { id: 8, name: 'Tote Bag', price: 229.99, category: 'Handbags', description: 'Versatile elegance for everyday use.', specs: ['Spacious Interior', 'Dual Handles', 'Premium Leather', 'Open Top Design'], images: '/Tote Bag.jpg' },
]

export default function ProductDetail() {
  const params = useParams()
  const product = products.find(p => p.id === parseInt(params.id as string))
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <p>Product not found</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex gap-2 text-sm mb-8 opacity-60">
            <Link href="/" className="hover:opacity-100">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:opacity-100">Shop</Link>
            <span>/</span>
            <span>{product.category}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="relative overflow-hidden bg-muted aspect-square mb-4">
                <Image
                  src={product.images}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="relative overflow-hidden bg-muted aspect-square cursor-pointer hover:opacity-75">
                    <Image
                      src={product.images}
                      alt={`${product.name} view ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-6">
                <p className="text-xs opacity-60 mb-2">{product.category}</p>
                <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wide mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-serif">${product.price.toFixed(2)}</p>
              </div>

              <p className="text-sm leading-relaxed mb-8 opacity-80">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-sm font-light tracking-wide mb-4 uppercase opacity-75">Specifications</h3>
                <ul className="space-y-2 text-sm opacity-80">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1 h-1 bg-accent rounded-full mr-2"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center border border-border">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    title="Decrease quantity"
                    className="px-4 py-3 hover:bg-muted transition"
                  >
                    <Minus aria-hidden="true" className="w-4 h-4" />
                  </button>
                  <input
                    id="product-quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    aria-label="Quantity"
                    title="Quantity"
                    className="flex-1 text-center outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    title="Increase quantity"
                    className="px-4 py-3 hover:bg-muted transition"
                  >
                    <Plus aria-hidden="true" className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.images ?? '/placeholder.jpg' }, quantity)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  onClick={() => setIsFavorite(!isFavorite)}
                  variant="outline"
                  className="w-full"
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current text-accent' : ''}`} />
                  {isFavorite ? 'Saved' : 'Save to Favorites'}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 space-y-3 text-xs opacity-75 border-t border-border pt-8">
                <p>✓ Genuine leather, handcrafted quality</p>
                <p>✓ Free shipping on orders over $100</p>
                <p>✓ 30-day money-back guarantee</p>
                <p>✓ Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
