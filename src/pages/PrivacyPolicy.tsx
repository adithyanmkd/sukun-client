const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 text-gray-800">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
        <p className="mb-8 text-sm text-gray-500">
          Last Updated: November 2025
        </p>

        <p className="mb-6">
          At <strong>Grande Electricals</strong>, we value your privacy and are
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and safeguard your information when you
          visit our website (
          <span className="text-blue-600">grandelectricals.com</span>).
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              1. Information We Collect
            </h2>
            <p className="mb-2">
              We may collect the following types of information:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                Personal information like name, email, phone number, or address.
              </li>
              <li>
                Non-personal data such as browser type, device information, and
                pages visited.
              </li>
              <li>Order and payment details when you make a purchase.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">
              2. How We Use Your Information
            </h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>Process and manage your orders.</li>
              <li>Improve our website and customer service.</li>
              <li>
                Send order updates or promotional messages (if you agree).
              </li>
              <li>
                Ensure website security and prevent fraudulent activities.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">3. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience. You can choose
              to disable cookies in your browser settings, but some features of
              the site may not work properly without them.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">4. Data Protection</h2>
            <p>
              We take reasonable steps to protect your personal information from
              unauthorized access, alteration, or disclosure. However, no method
              of online transmission is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">
              5. Sharing Your Information
            </h2>
            <p>
              We do not sell or rent your personal information. We may share
              data only with trusted third parties that help operate our
              business, such as payment processors or delivery partners — and
              only when necessary.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">6. Third-Party Links</h2>
            <p>
              Our website may contain links to external sites. We are not
              responsible for the privacy policies or content of those websites.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">7. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal
              information. To make such requests, please contact us using the
              email address below.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">
              8. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page with the updated date shown above.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">9. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy,
              please contact us:
            </p>
            <p className="mt-1 font-medium">📧 info@grandelectricals.com</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
