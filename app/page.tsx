'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Search, MapPin, Clock, Star, Users, Smartphone, Calendar, Shield } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-sm font-medium">
              🎉 Now Available in Your Area
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6">
              Find & Book Local
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              Discover trusted professionals in your neighborhood. From home repairs to personal care, 
              book appointments instantly with verified service providers.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-lg border">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input 
                    placeholder="What service do you need?" 
                    className="pl-10 border-0 text-lg h-12 focus-visible:ring-0"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input 
                    placeholder="Your location" 
                    className="pl-10 border-0 text-lg h-12 focus-visible:ring-0"
                  />
                </div>
                <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Services */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <span className="text-slate-500 mr-2">Popular:</span>
              {["House Cleaning", "Plumbing", "Hair Salon", "Massage", "Pet Grooming"].map((service) => (
                <Badge key={service} variant="outline" className="cursor-pointer hover:bg-slate-100">
                  {service}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">50K+</div>
                <div className="text-slate-600">Service Providers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">1M+</div>
                <div className="text-slate-600">Bookings Made</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">4.9★</div>
                <div className="text-slate-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">200+</div>
                <div className="text-slate-600">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Pinsline?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We make finding and booking local services simple, safe, and convenient.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Verified Professionals</CardTitle>
                <CardDescription>
                  All service providers are background-checked and verified for your peace of mind.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Instant Booking</CardTitle>
                <CardDescription>
                  Book appointments 24/7 with real-time availability and instant confirmation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Trusted Reviews</CardTitle>
                <CardDescription>
                  Read genuine reviews from real customers to make informed decisions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Local Focus</CardTitle>
                <CardDescription>
                  Find services right in your neighborhood with accurate location matching.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Flexible Scheduling</CardTitle>
                <CardDescription>
                  Choose times that work for you with flexible scheduling options.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Mobile First</CardTitle>
                <CardDescription>
                  Manage all your bookings on the go with our mobile-optimized platform.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Popular Service Categories
            </h2>
            <p className="text-xl text-slate-600">
              Explore our most requested services
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Home Cleaning", icon: "🏠", count: "2.5K+ providers" },
              { name: "Beauty & Spa", icon: "💅", count: "1.8K+ providers" },
              { name: "Home Repairs", icon: "🔧", count: "3.2K+ providers" },
              { name: "Pet Care", icon: "🐕", count: "900+ providers" },
              { name: "Fitness", icon: "💪", count: "1.1K+ providers" },
              { name: "Tutoring", icon: "📚", count: "2.1K+ providers" },
              { name: "Photography", icon: "📸", count: "800+ providers" },
              { name: "Catering", icon: "🍽️", count: "600+ providers" }
            ].map((category) => (
              <Card key={category.name} className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-slate-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-slate-500">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Pinsline for their service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Find Services
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
              Become a Provider
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Pinsline</h3>
              <p className="text-slate-400 mb-4">
                Your trusted platform for finding and booking local services.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-600">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-600">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-600">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white">How it Works</Link></li>
                <li><Link href="#" className="hover:text-white">Browse Services</Link></li>
                <li><Link href="#" className="hover:text-white">Customer Support</Link></li>
                <li><Link href="#" className="hover:text-white">Safety</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white">Join as Provider</Link></li>
                <li><Link href="#" className="hover:text-white">Provider Resources</Link></li>
                <li><Link href="#" className="hover:text-white">Success Stories</Link></li>
                <li><Link href="#" className="hover:text-white">Provider Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Press</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-slate-700" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">
              © 2024 Pinsline. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-slate-400 hover:text-white">Privacy Policy</Link>
              <Link href="#" className="text-slate-400 hover:text-white">Terms of Service</Link>
              <Link href="#" className="text-slate-400 hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
