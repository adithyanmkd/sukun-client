const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 text-gray-800">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-4 text-3xl font-bold">Terms of Service</h1>
        <p className="mb-8 text-sm text-gray-500">
          Last Updated: November 2025
        </p>

        <p className="mb-6">
          Welcome to <strong>Grande Electricals</strong>. By accessing or using
          our website (
          <span className="text-blue-600">grandelectricals.com</span>), you
          agree to comply with and be bound by the following Terms and
          Conditions. Please read them carefully before using our site or
          services.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              1. Acceptance of Terms
            </h2>
            <p>
              By using this website, you agree to these Terms of Service and our
              Privacy Policy. If you do not agree, please do not use this
              website.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">
              2. Use of Our Website
            </h2>
            <p className="mb-2">
              You agree to use this website only for lawful purposes and in a
              way that does not harm or disrupt others’ use of the site.
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Copy or reproduce content without permission.</li>
              <li>Attempt to hack, disrupt, or misuse any part of the site.</li>
              <li>
                Use automated tools (like bots or scrapers) to access data.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">
              3. Product Information
            </h2>
            <p>
              We try to ensure all product descriptions, images, and prices are
              accurate. However, mistakes can happen. Grande Electricals
              reserves the right to correct any errors or update information
              without prior notice.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">
              4. Orders and Payments
            </h2>
            <p>
              All orders placed through our website are subject to acceptance
              and product availability. We reserve the right to cancel or refuse
              any order at our discretion. Payments must be made through the
              approved methods listed on the site.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">
              5. Limitation of Liability
            </h2>
            <p>
              Grande Electricals is not responsible for any indirect or
              consequential loss caused by using our site or products, or for
              temporary unavailability of the website due to maintenance or
              technical issues. Use of this site is at your own risk.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">
              6. Intellectual Property
            </h2>
            <p>
              All content, logos, images, and materials on this site are owned
              by
              <strong> Grande Electricals</strong>. You may not use, reproduce,
              or distribute our content without written permission.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">7. External Links</h2>
            <p>
              Our site may contain links to third-party websites. We are not
              responsible for their content or privacy practices.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">
              8. Updates to These Terms
            </h2>
            <p>
              We may update these Terms occasionally. The latest version will
              always be available on this page with the updated date shown
              above.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-1 font-medium">📧 info@grandelectricals.com</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
