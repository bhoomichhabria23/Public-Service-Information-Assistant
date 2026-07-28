function About() {
  return (
    <div>
      <section
        className="
          py-24
          bg-linear-to-br
          from-slate-100
          via-blue-100
          to-gray-200
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-8
            grid
            lg:grid-cols-2
            gap-20
            items-center
          "
        >
          <div className="relative">
            <div
              className="
                absolute
                -top-6
                -left-6
                w-40
                h-40
                bg-blue-200
                rounded-full
                blur-3xl
              "
            ></div>

            <img
              src="https://plus.unsplash.com/premium_photo-1697730373168-254777738f53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z292ZXJubWVudCUyMHNjaGVtZXN8ZW58MHx8MHx8fDA%3D"
              className="
                relative
                rounded-[40px]
                shadow-2xl
                h-130
                w-full
                object-cover
              "
            />
          </div>

          <div>
            <p
              className="
                text-blue-700
                font-semibold
                uppercase
                tracking-widest
              "
            >
              About The Platform
            </p>

            <h1
              className="
                mt-5
                text-4xl
                font-bold
                text-gray-900
                leading-tight
              "
            >
              Empowering Citizens With Smarter Access To
              <span className="text-blue-700">
                {" "}
                Government Services
              </span>
            </h1>

            <p
              className="
                mt-8
                text-lg
                text-gray-600
                leading-8
              "
            >
              Accessing government schemes can often be confusing due to
              complex eligibility criteria, scattered information, and unclear
              documentation requirements. Our AI-powered platform simplifies
              this process by helping citizens discover relevant schemes,
              understand their benefits, and receive personalized guidance
              through an intelligent and user-friendly assistant.
            </p>

            <p
              className="
                mt-5
                text-lg
                text-gray-600
                leading-8
              "
            >
              Our AI-powered assistant bridges this gap by helping citizens
              understand available schemes and access information in a simple
              and personalized way.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div
          className="
            max-w-7xl
            mx-auto
            px-8
            grid
            lg:grid-cols-2
            gap-12
            text-center
          "
        >
          <div
            className="
              rounded-3xl
              bg-linear-to-br
              from-blue-200
              to-green-200
              p-12
            "
          >
            <h2
              className="
                text-3xl
                font-bold
                text-gray-900
              "
            >
              The Challenge
            </h2>

            <p
              className="
                mt-6
                text-gray-600
                leading-8
              "
            >
              Millions of citizens are unaware of government benefits because
              information is scattered across multiple platforms and difficult
              to understand.
            </p>
          </div>

          <div
            className="
              rounded-3xl
              bg-linear-to-br
              from-yellow-100
              to-pink-200
              p-12
            "
          >
            <h2
              className="
                text-3xl
                font-bold
              "
            >
              Our Solution
            </h2>

            <p
              className="
                mt-6
                text-gray-500
                leading-8
              "
            >
              We provide an intelligent AI assistant that helps citizens
              discover suitable schemes, understand requirements, and get
              reliable guidance through one platform.
            </p>
          </div>
        </div>
      </section>

      <section
        className="
          py-24
          bg-linear-to-r
          from-blue-400
          via-blue-400
          to-gray-400
        "
      >
        <div
          className="
            max-w-5xl
            mx-auto
            px-6
            text-center
          "
        >
          <h2
            className="
              text-4xl
              font-bold
              text-white
            "
          >
            Our Vision
          </h2>

          <p
            className="
              mt-6
              text-xl
              text-blue-100
              leading-9
            "
          >
            To create a future where every citizen can easily discover,
            understand, and benefit from government services with the help of
            intelligent technology.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;