const Footer = () => {
  return (
    <section className="py-15">
      <div className="flex flex-wrap">
        <div className="w-full md:w-4/12">
          <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-inherit mb-2  !text-primary">
            NZ Furniture
          </h4>
          <p className="block antialiased font-sans text-inherit text-md mb-2 mt-0 font-normal !text-gray-600">
            We are a leading furniture e-commerce website providing a wide range
            of quality furniture for all your needs. Our mission is to deliver
            exceptional products and services to our valued customers.
          </p>
          <div className="mt-6">
            <a
              href="https://www.twitter.com/creativetim?ref=material-tailwind"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-twitter font-xl align-center mr-2 inline-block items-center justify-center rounded-full border-[1.5px] border-blue-gray-50 p-3 text-center text-primary outline-none focus:outline-none"></i>
            </a>
            <a
              href="https://www.facebook.com/creativetim?ref=material-tailwind"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-facebook-square font-xl align-center mr-2 inline-block items-center justify-center rounded-full border-[1.5px] border-blue-gray-50 p-3 text-center text-primary outline-none focus:outline-none"></i>
            </a>
            <a
              href="https://www.dribbble.com/creativetim?ref=material-tailwind"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-dribbble font-xl align-center mr-2 inline-block items-center justify-center rounded-full border-[1.5px] border-blue-gray-50 p-3 text-center text-primary outline-none focus:outline-none"></i>
            </a>
            <a
              href="https://www.github.com/creativetimofficial?ref=material-tailwind"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github font-xl align-center mr-2 inline-block items-center justify-center rounded-full border-[1.5px] border-blue-gray-50 p-3 text-center text-primary outline-none focus:outline-none"></i>
            </a>
            <a
              href="https://discord.com/invite/FhCJCaHdQa?ref=material-tailwind"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-discord font-xl align-center mr-2 inline-block items-center justify-center rounded-full border-[1.5px] border-blue-gray-50 p-3 text-center text-primary outline-none focus:outline-none"></i>
            </a>
          </div>
        </div>
        <div className="ml-auto w-full px-4 md:w-7/12">
          <div className="items-top mb-6 flex flex-wrap">
            <div className="w-6/12 pt-6 md:ml-auto md:px-4 md:pt-0 xl:w-3/12">
              <span className="text-md mb-4 block font-medium text-primary">
                Company
              </span>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="https://www.creative-tim.com/presentation?ref=material-tailwind"
                    target="_blank"
                    rel="noreferrer"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.creative-tim.com/blog?ref=material-tailwind"
                    target="_blank"
                    rel="noreferrer"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/creativetimofficial?ref=material-tailwind"
                    target="_blank"
                    rel="noreferrer"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.creative-tim.com/templates/free?ref=material-tailwind"
                    target="_blank"
                    rel="noreferrer"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                  >
                    Free Products
                  </a>
                </li>
              </ul>
            </div>
            <div className="ml-auto w-6/12 pt-6 md:px-4 md:pt-0 xl:w-3/12">
              <span className="text-md mb-4 block font-medium text-primary">
                Help and Support
              </span>
              <ul className="list-unstyled">
                <li>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                    href="https://www.creative-tim.com/knowledge-center?ref=material-tailwind"
                  >
                    Knowledge Center
                  </a>
                </li>
                <li>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                    href="https://www.creative-tim.com/contact-us?ref=material-tailwind"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                    href="https://www.creative-tim.com/support-terms?ref=material-tailwind"
                  >
                    Premium Support
                  </a>
                </li>
                <li>
                  <a
                    rel="noreferrer"
                    target="_self"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                    href="/blocks#pricing"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div className="ml-auto w-6/12 pt-6 md:px-4 md:pt-0 xl:w-3/12">
              <span className="text-md mb-4 block font-medium text-primary">
                Resources
              </span>
              <ul className="list-unstyled">
                <li>
                  <a
                    rel="noreferrer"
                    target="_self"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                    href={route("become.vendor")}
                  >
                    Become vendor
                  </a>
                </li>
                <li>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                    href="https://www.creative-tim.com/services/updivision?ref=material-tailwind"
                  >
                    Custom Development
                  </a>
                </li>
                <li>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                    href="https://discord.com/invite/FhCJCaHdQa?ref=material-tailwind"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                    href="https://tailwindcomponents.com/?ref=material-tailwind"
                  >
                    Tailwind Components
                  </a>
                </li>
              </ul>
            </div>
            <div className="ml-auto w-6/12 pt-6 md:px-4 md:pt-0 xl:w-3/12">
              <span className="text-md mb-4 block font-medium text-primary">
                Technologies
              </span>
              <ul className="list-unstyled">
                <li>
                  <a
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                    href="/docs/react/installation"
                  >
                    React
                  </a>
                </li>
                <li>
                  <a
                    className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                    href="/docs/html/installation"
                  >
                    HTML
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
