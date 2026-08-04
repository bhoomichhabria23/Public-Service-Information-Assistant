import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

function Contact() {

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      console.log(data);
      alert("Message sent successfully!");

    } catch(error){
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <section
        className="
          relative h-57.5
          bg-blue-900
          overflow-hidden
        "
      >
        <img
          src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620"
          className="
            absolute w-full h-full object-cover opacity-30
          "
        />

        <div
          className="
            relative z-10
            px-10 md:px-20
            pt-12
            text-white
          "
        >
          <h1
            className="
              text-4xl
              font-bold
            "
          >
            Contact Us
          </h1>

          <p
            className="
              mt-4
              text-lg
              max-w-xl
            "
          >
            We are here to help you with government services, public
            information and support.
          </p>
        </div>
      </section>

      <section
        className="
          max-w-6xl
          mx-auto
          px-6
          py-10
        "
      >
        <div
          className="
            grid md:grid-cols-2
            gap-8
          "
        >
          <div
            className="
              bg-white
              rounded-xl
              shadow-md
              p-8
            "
          >
            <InfoCard
              icon={faLocationDot}
              title="Office Address"
              text={
                <>
                  Public Service Information Center
                  <br />
                  Government Service Building
                  <br />
                  New Delhi, India - 110001
                </>
              }
            />

            <InfoCard
              icon={faPhone}
              title="Phone (Toll-Free)"
              text="+91 1800-123-4567"
            />

            <InfoCard
              icon={faEnvelope}
              title="Email"
              text="support@publicservice.gov.in"
            />

            <InfoCard
              icon={faClock}
              title="Working Hours"
              text={
                <>
                  Monday - Friday : 9:00 AM - 6:00 PM
                  <br />
                  Saturday : 10:00 AM - 2:00 PM
                  <br />
                  Sunday : Closed
                </>
              }
            />
          </div>

          <div
            className="
              bg-white
              rounded-xl
              shadow-md
              p-8
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-6
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  bg-blue-600
                  text-white
                  rounded-full
                  p-3
                "
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </span>

              Send Us a Message
            </h2>

            {/* <form className="space-y-4"> */}
            <form 
            className="space-y-4" 
            onSubmit={handleSubmit}
            >
              {/* <Input label="Full Name" placeholder="Enter your full name" /> */}
              <Input
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e)=>setFormData({...formData,name:e.target.value})}/>

              {/* <Input
                label="Email Address"
                placeholder="Enter your email address"
              /> */}

            <Input 
            label="Email Address"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            />


              {/* <Input
                label="Phone Number"
                placeholder="Enter your phone number"
              /> */}
             <Input 
             label="Phone Number"
             name="phone"
             placeholder="Enter your phone number"
             value={formData.phone}
             onChange={(e)=>setFormData({...formData,phone:e.target.value})}
/> 


              {/* <Input label="Subject" placeholder="Enter subject" /> */}
              <Input
              label="Subject"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={(e)=>setFormData({...formData,subject:e.target.value})}
/>

              <div>
                <label
                  className="
                    block
                    font-semibold
                    text-sm
                    mb-2
                  "
                >
                  Message *
                </label>

                {/* <textarea
                  rows="5"
                  placeholder="Type your message here..."
                  className="
                    w-full
                    border
                    rounded-md
                    p-3
                    focus:ring-2
                    focus:ring-blue-500
                    outline-none
                  "
                /> */}

              <textarea
              rows="5"
              value={formData.message}
              onChange={(e)=> setFormData({...formData,message:e.target.value})
            }
            className="
            w-full
            border
            rounded-md
            p-3
            focus:ring-2
            focus:ring-blue-500
            outline-none
            "
            /> 
              </div>

              <button
              type="submit"
              className="
                w-full
                bg-blue-700
                text-white
                py-3
                rounded-md
                font-semibold
                hover:bg-blue-800
                flex
                justify-center
                gap-2
                items-center
                "
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div
      className="
        flex
        gap-5
        border-b
        pb-5
        mb-5
      "
    >
      <div
        className="
          bg-blue-700
          text-white
          w-12
          h-12
          rounded-full
          flex
          items-center
          justify-center
        "
      >
        <FontAwesomeIcon icon={icon} />
      </div>

      <div>
        <h3
          className="
            font-bold
            text-lg
          "
        >
          {title}
        </h3>

        <p
          className="
            text-gray-600
            mt-1
            leading-6
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}

function Input({ label, placeholder, value, onChange}) {
  return (
    <div>
      <label
        className="
          block
          font-semibold
          text-sm
          mb-2
        "
      >
        {label} *
      </label>

      <input
        value={value}        //
        onChange={onChange}   //
        placeholder={placeholder}
        className="
          w-full
          border
          rounded-md
          p-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
}

export default Contact;