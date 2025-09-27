import Footer from "../../components/footer";

const AboutPage = () => {
  return (
    <div className="w-full  h-[calc(100vh-80px)]  overflow-y-auto">
    <div>
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-seondary mb-4">About Us</h1>
            <p className="text-xl text-accent/50 max-w-2xl mx-auto">
              Discover the story behind your trusted e-commerce destination
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                At SkyRec, we're committed to providing exceptional online shopping experiences. 
                We curate the finest products across electronics, fashion, and home essentials 
                to bring quality and convenience directly to your doorstep.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team works tirelessly to ensure every product meets our high standards 
                and every customer receives outstanding service.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-seondary/10 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-seondary/30 rounded-full p-3">
                    <div className="w-6 h-6 bg-seondary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Quality First</h3>
                    <p className="text-sm text-muted-foreground">Carefully curated products</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-accent/20 rounded-full p-3">
                    <div className="w-6 h-6 bg-accent rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Customer Focus</h3>
                    <p className="text-sm text-muted-foreground">Your satisfaction is our priority</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-seondary/20 rounded-full p-3">
                    <div className="w-6 h-6 bg-seondary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Innovation</h3>
                    <p className="text-sm text-muted-foreground">Constantly improving our service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-background to-secondary/5 rounded-2xl p-8">
            <h2 className="text-3xl font-semibold mb-4">Why Choose SkyRec?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
                <p className="text-muted-foreground">
                  Quick and reliable delivery to your doorstep
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
                <p className="text-muted-foreground">
                  Your data and payments are always protected
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">
                  We're here to help whenever you need us
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
    <Footer />
    </div>
  );
};

export default AboutPage;