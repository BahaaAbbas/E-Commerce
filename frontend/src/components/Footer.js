import React from 'react'
import { FaFacebook , FaXTwitter , FaSquareInstagram   } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className='bg-slate-300'>
      <div className='container  mx-auto p-4 flex justify-center gap-4 '>
        
        
          <div className='flex flex-col gap-7'>
            <p className='text-center font-bold uppercase' title='BahaaIsL'>Follow us</p>
            <div className='mt-1 flex flex-row gap-3 cursor-pointer justify-center'>
              <FaFacebook className='text-3xl hover:text-pink-500 hover:scale-125 transition-all' />
              <FaXTwitter className=' text-3xl hover:text-pink-500 hover:scale-125 transition-all' />
              <FaSquareInstagram className=' text-3xl hover:text-pink-500 hover:scale-125 transition-all'/>

            </div>

            <hr className="border-t-2 border-blue-400 my-4" /> 
            
            <p className='text-center font-bold uppercase' title='BahaaIsL'>address</p>
            <div className='mt-1 flex flex-col gap-1 cursor-pointer'>
              <p className='text-center font-base text-gray-700' title='BahaaIsL'>1234 Street Name</p>
              <p className='text-center font-base text-gray-700' title='BahaaIsL'>City, AA 99999</p>

            </div>
            <hr className="border-t-2 border-blue-400 my-4" /> 
            
            <p className='text-center font-bold uppercase' title='BahaaIsL'>contacts</p>
            <div className='mt-1 flex flex-col gap-1 cursor-pointer'>
              <p className='text-center font-base text-gray-700' title='BahaaIsL'>Email: support@store.com</p>
              <p className='text-center font-base text-gray-700' title='BahaaIsL'>Phone: +1 (0) 000 0000 001</p>

            </div>



          </div>
          
        

        {/* form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <ContactForm />
        </div>
        
      </div>
       
      
    </footer>
  )
}

export default Footer


function ContactForm() {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">GET IN TOUCH</h2>
      
      <form className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            className="w-full h-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}


