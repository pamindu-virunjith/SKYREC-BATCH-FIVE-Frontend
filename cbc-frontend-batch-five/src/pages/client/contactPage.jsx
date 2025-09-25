import { BsPhone } from "react-icons/bs";
import Footer from "../../components/footer";
import { FaClock } from "react-icons/fa";
import { BiMailSend, BiMapPin } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("")
  const [subject,setSubject] = useState("");
  const [message,setMessage] = useState("");
  const [isSending,setIsSending] = useState(false)


  function submitEmail(e){
    e.preventDefault()

    setIsSending(true)
    
    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/send-email",{
      name: name,
      email: email,
      subject: subject,
      message: message
    })
    .then((res)=>{
      toast.success("Email is send successfuly")
      console.log(res.data)
    })
    .catch((e)=>{
      console.log(e)
      toast.error("Failed to send Email")
    })
    .finally(()=>{
      setIsSending(false)
      // console.log("isSending",isSending)
    })
  }


  return (
    <>
        <div>
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-seondary mb-4">Contact Us</h1>
            <p className="text-xl text-accent/50 max-w-2xl mx-auto">
              We'd love to hear from you. Get in touch with our team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="border border-seondary/20 rounded-2xl p-5">
              <div>
                <h1 className="text-2xl font-bold mb-3">Send us a message</h1>
              </div>
              <div>
                <form  className="space-y-6" onSubmit={submitEmail}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="border border-seondary/20 focus:outline-accent w-full rounded-lg p-2"
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e)=>{setName(e.target.value)
                          // console.log(name)
                        }}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email <span className="text-red-500"> *</span>
                      </label>
                      <input
                        className="border border-seondary/20 focus:outline-accent w-full rounded-lg p-2"
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject <span className="text-red-500"> *</span>
                    </label>
                    <input
                        className="border border-seondary/20 focus:outline-accent w-full rounded-lg p-2"
                      id="subject"
                      name="subject"
                      type="text"
                      value={subject}
                      onChange={(e)=>{setSubject(e.target.value)}}
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message <span className="text-red-500"> *</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={message}
                      onChange={(e)=>setMessage(e.target.value)}
                      placeholder="Tell us how we can help you..."
                      className="min-h-[120px] border border-seondary/20 focus:outline-accent w-full rounded-lg p-2"
                    />
                  </div>
                  
                 <div className="w-full text-center">
                   <button type="submit" className={`text-center w-[50%] text-primary bg-accent p-2 font-bold rounded-lg focus:outline-none  ${isSending? "cursor-not-allowed bg-accent/50": "cursor-pointer"}`} disabled={isSending}>
                    {isSending ? "Sending...":"Send Message"}
                  </button>
                 </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div  className="border border-seondary/20 rounded-2xl p-4">
                <div>
                  <h1 className="text-2xl font-bold mb-3">Get in touch</h1>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-seondary/10 rounded-lg p-3">
                      <BiMailSend className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-seondary">support@skyrec.com</p>
                      <p className="text-seondary">sales@skyrec.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-seondary/10 rounded-lg p-3">
                      <BsPhone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-seondary">+1 (555) 123-4567</p>
                      <p className="text-seondary">+1 (555) 987-6543</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-seondary/10 rounded-lg p-3">
                      <BiMapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-seondary">
                        123 Commerce Street<br />
                        Business District<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-seondary/10 rounded-lg p-3">
                      <FaClock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Business Hours</h3>
                      <p className="text-seondary">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div  className="border border-seondary/20 rounded-2xl p-4">
                <div className="p-6">
                  <h3 className="mb-4 text-2xl font-bold">Quick Support</h3>
                  <p className="text-seondary mb-4">
                    Need immediate assistance? Our customer support team is available 24/7 
                    to help with your orders, returns, and any questions you might have.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
      <Footer/>
    </>
  );
};

export default ContactPage;