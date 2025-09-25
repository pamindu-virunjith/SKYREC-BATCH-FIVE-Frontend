import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/footer';
import { BiStar } from 'react-icons/bi';
import { BsStar } from 'react-icons/bs';

function HomePage() {
    const navigate = useNavigate();

    const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      comment: "Amazing quality products and lightning-fast delivery! I've been shopping here for over a year and never been disappointed.",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "San Francisco, CA",
      rating: 5,
      comment: "The customer service is exceptional. They helped me find exactly what I needed and the prices are unbeatable.",
    },
    {
      id: 3,
      name: "Emily Davis",
      location: "Chicago, IL",
      rating: 5,
      comment: "Love the variety of products available. From electronics to home goods, they have everything I need in one place.",
    }
  ];

  return (
    <>
    <div className='bg-[linear-gradient(135deg,#393E46_0%,#866ff7_100%)] w-full md:min-h-[600px]'>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Your
            <span className="block text-accent">Perfect Product</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Shop the latest trends with confidence. Quality products, 
            unbeatable prices, and exceptional service delivered to your door.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex sm:flex-row gap-1 items-center text-2xl font-bold text-accent group bg-seondary/40 p-4 rounded-2xl cursor-pointer " onClick={()=>navigate("/products")}>
              Shop Now
              <FaArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="text-center sm:text-left bg-primary/10 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-white">Free Shipping</div>
              <div className="text-white/80">On orders over $50</div>
            </div>
            <div className="text-center sm:text-left bg-primary/10 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-white">24/7 Support</div>
              <div className="text-white/80">Always here to help</div>
            </div>
            <div className="text-center sm:text-left bg-primary/10 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-white">Easy Returns</div>
              <div className="text-white/80">30-day return policy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what thousands of satisfied customers have to say about their shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-seondary/5 hover:shadow-lg transition-all duration-300 border border-seondary/10 rounded-lg">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <BsStar key={i} className="w-5 h-5 text-seondary/70 mr-0.5 " />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-[hsl(224_71%_16%)]  p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-2">Join 50,000+ Happy Customers</h3>
            <p className="text-white/90 mb-4">Experience the SkyRec difference today</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center">
                <BiStar className="w-4 h-4 mr-1" />
                <span>4.9/5 Average Rating</span>
              </div>
              <div>30-Day Money Back Guarantee</div>
              <div>Free Shipping on Orders $50+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default HomePage