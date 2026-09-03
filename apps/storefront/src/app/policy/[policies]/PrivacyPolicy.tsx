const tableOfContents = [
  "WHAT INFORMATION DO WE COLLECT?",
  "HOW DO WE PROCESS YOUR INFORMATION?",
  "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
  "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
  "HOW DO WE HANDLE YOUR SOCIAL LOGINS?",
  "HOW LONG DO WE KEEP YOUR INFORMATION?",
  "HOW DO WE KEEP YOUR INFORMATION SAFE?",
  "WHAT ARE YOUR PRIVACY RIGHTS?",
  "CONTROLS FOR DO-NOT-TRACK FEATURES",
  "SHOPPABLE STORY & VIDEO CONTENT",
  "DYNAMIC STOREFRONT DATA",
  "REVENUE & PAYOUT PROCESSING",
  "USER-GENERATED CONTENT LICENSE",
  "DO WE MAKE UPDATES TO THIS NOTICE?",
  "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
  "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?",
];

const collectedInfo = [
  "Names",
  "Phone numbers",
  "Email addresses",
  "Mailing addresses",
  "Usernames",
  "Passwords",
  "Contact preferences",
  "Billing addresses",
  "Debit/Credit card numbers",
  "Contact or authentication data",
  "Business name",
  "Store logo",
  "Business address",
  "Product categories",
  "Social media links",
  "Store description and bio",
  "Bank account details",
  "Product listings",
  "Inventory and stock levels",
  "Order details",
  "Connected payment services (Razorpay)",
  "Connected delivery services (Shiprocket)",
];

const PrivacyPolicy = () => {
  return (
    <div className="text-gray-800 container mx-auto w-full p-6 sm:max-w-[75%]">
      <div className="mx-auto my-6 w-full rounded-2xl">
        <h1 className="text-gray-900 mb-4 text-4xl font-bold">Privacy Policies</h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          This Privacy Notice for <strong>Krayadotshop Private Limited</strong> (doing business as <strong>Craya</strong>) (
          <em>‘we’, ‘us’, or ‘our’</em>) describes how and why we might access, collect, store, use, and/or share (<em>‘process’</em>) your personal
          information when you use our services (<em>‘Services’</em>), including:
        </p>

        <ul className="text-gray-700 list-inside list-disc leading-relaxed">
          <li>
            <strong>Using our website:</strong> You access our website at
            <a href="https://craya.store" className="text-purple-500 underline">
              {" "}
              https://craya.store
            </a>
            , or any other website operated by us.
          </li>
          <li>
            <strong>Using Craya’s Storefront Builder:</strong> A tool designed to help sellers create their own online storefronts quickly and easily,
            similar to setting up a social media profile.
          </li>
          <li>
            <strong>Key Features of the Storefront Builder:</strong>
            <ul className="ml-6 list-inside list-disc">
              <li>
                <strong>Scrollable Shoppable Videos:</strong> Sellers can upload short videos, allowing customers to explore and purchase products in
                an engaging way.
              </li>
              <li>
                <strong>Customizable Layouts:</strong> An easy-to-use interface enables sellers to personalize their storefronts to reflect their
                brand.
              </li>
            </ul>
          </li>
          <li>
            <strong>Our Goal:</strong> To make online selling as simple and fun as social media while providing powerful tools to help businesses
            grow.
          </li>
          <li>
            <strong>Other Engagements:</strong> You may also interact with us through sales, marketing, or events related to our Services.
          </li>
        </ul>

        <p className="text-gray-700 mt-4 leading-relaxed">
          <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are
          responsible for decisions regarding how your personal information is processed. If you do not agree with our policies and practices, please
          do not use our Services.
        </p>

        <p className="text-gray-700 mt-2 leading-relaxed">
          If you still have questions or concerns, please contact us at
          <a href="mailto:Crayacares@gmail.com" className="text-purple-500 underline">
            Crayacares@gmail.com
          </a>
          .
        </p>
      </div>
      <section className="mb-10">
        <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">SUMMARY OF KEY POINTS</h1>
        <p className="text-gray-700 mb-4 mt-4 leading-relaxed">
          What personal information do we process? When you visit, use, or navigate our Services, we may process personal information depending on how
          you interact with us and the Services, the choices you make, and the products and features you use. Learn more about personal information
          you disclose to us.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Do we process any sensitive personal information? Some of the information may be considered ‘special’ or ‘sensitive’ in certain
          jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal
          information.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Do we collect any information from third parties? We may collect ir tion from public ing partners, social media platforms, and other outside
          sources. Learn more about information collected from other sources.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          How do we process your information? We process your information to provide, improve, and administer our Services, communicate with you, for
          security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process
          your information only when we have a valid legal reason to do so. Learn more about how we process your information.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          In what situations and with which types of parties do we share personal information? We may share information in specific situations and
          with specific categories of third parties. Learn more about when and with whom we share your personal information.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          How do we keep your information safe? We have adequate organisational and technical processes and procedures in place to protect your
          personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100%
          secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our
          security and improperly collect, access, steal, or modify your information. Learn more about how we keep your information safe.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          What are your rights? Depending on where you are located geographically, the applicable privacy law may mean you have certain rights
          regarding your personal information. Learn more about your privacy rights.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          How do you exercise your rights? The easiest way to exercise your rights is by visiting or by contacting us. We will consider and act upon
          any request in accordance with applicable data protection laws.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Want to learn more about what we do with any information we collect? Review the Privacy Notice in full.
        </p>
      </section>
      <div className="my-4 w-full">
        <h2 className="text-2xl font-semibold">TABLE OF CONTENTS</h2>
        <ul className="list-inside list-disc">
          {tableOfContents.map((content, index) => (
            <li key={index}>
              {index + 1}. {content}
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto my-6 w-full">
        {/* Section 1 */}
        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">1. WHAT INFORMATION DO WE COLLECT?</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Personal information you disclose to us In Short: We collect personal information that you provide to us.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining
            information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the
            Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
          </p>
          <ul className="list-inside list-disc">
            {collectedInfo.map((info, index) => (
              <li key={index}>
                {index + 1}. {info}
              </li>
            ))}
          </ul>
          <p className="text-gray-700 mt-4 leading-relaxed">Sensitive Information. We do not process sensitive information.</p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Payment Data. We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument
            number, and the security code associated with your payment instrument. All payment data is handled and stored by Razorpay . You may find
            their privacy notice link(s) here:{" "}
            <a className="text-brand-color1" href="https://razorpay.com/privacy/">
              https://razorpay.com/privacy/
            </a>
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Social Media Login Data. We may provide you with the option to register with us using your existing social media account details, like
            your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about
            you from the social media provider, as described in the section called &apos;HOW DO WE HANDLE YOUR SOCIAL LOGINS?&apos; below.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such
            personal information.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">Information automatically collected</p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>Social Media Login Data:</strong> We may provide you with the option to register with us using your existing social media account
            details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile
            information about you from the social media provider, as described in the section called &apos;HOW DO WE HANDLE YOUR SOCIAL LOGINS?&apos;
            below.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific
            identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device
            characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when
            you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our
            Services, and for our internal analytics and reporting purposes.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            like many businesses we also collect information through Cookies and similar technologies
          </p>
          <li className="text-gray-700 mt-4 leading-relaxed">
            <strong>Log and Usage Data</strong> Log and usage data is service-related, diagnostic, usage, and performance information our servers
            automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this
            log data may include your IP address, device information, browser type, and settings and information about your activity in the Services
            (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which
            features you use), device event information (such as system activity, error reports (sometimes called ‘crash dumps’), and hardware
            settings).
          </li>
          <li className="text-gray-700 mt-4 leading-relaxed">
            <strong>Device Data:</strong> We collect device data such as information about your computer, phone, tablet, or other device you use to
            access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server),
            device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier,
            operating system, and system configuration information.
          </li>
          <li className="text-gray-700 mt-4 leading-relaxed">
            <strong>Location Data:</strong> We collect location data such as information about your device&apos;s location, which can be either
            precise or imprecise. How much we collect on the type and settings of the device you use to access the Services. For example, we may use
            GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of
            allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device.
            However, if you choose to opt out, you may not be able to use certain aspects of the Services.
          </li>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use
            requirements.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">Information collected from other sources</p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>In Short:</strong> We may collect limited data from public databases, marketing partners, social media platforms, and other
            outside sources.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            In order to enhance our ability to provide relevant marketing, offers, and services to you and update our records, we may obtain
            information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, social
            media platforms, and from other third parties. This information includes mailing addresses, job titles, email addresses, phone numbers,
            intent data (or user behaviour data), Internet Protocol (IP) addresses, social media profiles, social media URLs, and custom profiles, for
            purposes of targeted advertising and event promotion.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            If you interact with us on a social media platform using your social media account (e.g. Facebook or X), we receive personal information
            about you from such platforms such as your name, email address, and gender. You may have the right to withdraw your consent to processing
            your personal information. Learn more about withdrawing your consent. Any personal information that we collect from your social media
            account depends on your social media account&apos;s privacy settings. Please note that their own use of your information is not governed
            by this Privacy Notice.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">2. HOW DO WE PROCESS YOUR INFORMATION?</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, ensure
            security and fraud prevention, and comply with legal obligations. We may also process your information for other purposes with your
            consent.
          </p>

          <h2 className="text-gray-900 mt-6 text-2xl font-semibold">
            We process your personal information for various reasons, depending on how you interact with our Services, including:
          </h2>

          <ul className="text-gray-700 mt-4 list-inside list-disc leading-relaxed">
            <li>
              <strong>To facilitate account creation and authentication:</strong> We process your information to enable you to create and log in to
              your account and to maintain its functionality.
            </li>
            <li>
              <strong>To deliver and facilitate the delivery of services:</strong> We process your information to provide you with the requested
              services.
            </li>
            <li>
              <strong>To respond to user inquiries and offer support:</strong> We process your information to respond to your inquiries and resolve
              any issues related to our Services.
            </li>
            <li>
              <strong>To request feedback:</strong> We process your information when necessary to request feedback and to contact you regarding your
              experience with our Services.
            </li>
            <li>
              <strong>To post testimonials:</strong> We may post testimonials on our Services that include personal information with your consent.
            </li>
            <li>
              <strong>To evaluate and improve our Services, products, marketing, and user experience:</strong> We process your information to analyze
              usage trends, measure the effectiveness of marketing campaigns, and enhance our offerings.
            </li>
            <li>
              <strong>To identify usage trends:</strong> We process data about how you use our Services to gain insights into user behavior and
              improve our platform.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">
            3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following categories
            of third parties.
          </p>

          <h2 className="text-gray-900 mt-6 text-2xl font-semibold">Vendors, Consultants, and Other Third-Party Service Providers</h2>

          <p className="text-gray-700 mt-4 leading-relaxed">
            We may share your data with third-party vendors, service providers, contractors, or agents (&quot;third parties&quot;) who perform
            services for us or on our behalf and require access to such information to do that work. We have contracts in place with these third
            parties to safeguard your information. This means that they cannot use your personal information for any purpose unless we have instructed
            them to do so. They are also prohibited from sharing your personal information with any organization apart from us. Additionally, they are
            required to protect the data they hold on our behalf and retain it only for the period we specify.
          </p>

          <h2 className="text-gray-900 mt-6 text-2xl font-semibold">
            The categories of third parties we may share personal information with include:
          </h2>

          <ul className="text-gray-700 mt-4 list-inside list-disc leading-relaxed">
            <li>
              <strong>Cloud Computing Services</strong>
            </li>
            <li>
              <strong>Data Analytics Services</strong>
            </li>
            <li>
              <strong>Payment Processors</strong>
            </li>
            <li>
              <strong>Website Hosting Service Providers</strong>
            </li>
          </ul>

          <h2 className="text-gray-900 mt-6 text-2xl font-semibold">Other Situations Where We May Share Your Information</h2>

          <ul className="text-gray-700 mt-4 list-inside list-disc leading-relaxed">
            <li>
              <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">
            4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our
            Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs,
            save your preferences, and assist with basic site functions.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising,
            including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart
            reminders (depending on your communication preferences). The third parties and service providers use their technology to provide
            advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            Specific information about how we use such technologies and how you can refuse certain cookies is set out in our
            <a href="/cookie-notice" className="text-purple-600 underline">
              {" "}
              Cookie Notice
            </a>
            .
          </p>

          <h2 className="text-gray-900 mt-6 text-2xl font-semibold">Google Analytics</h2>

          <p className="text-gray-700 mt-4 leading-relaxed">
            We may share your information with Google Analytics to track and analyse the use of the Services. The Google Analytics Advertising
            Features that we may use include Google Analytics Demographics and Interests Reporting. To opt out of being tracked by Google Analytics
            across the Services, visit
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
              Google Analytics Opt-Out
            </a>
            .
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            You can opt out of Google Analytics Advertising Features through
            <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
              Ads Settings
            </a>{" "}
            and{" "}
            <a href="https://support.google.com/ads/answer/1660762" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
              Ad Settings for mobile apps
            </a>
            . Other opt-out options include
            <a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
              Network Advertising Opt-Out
            </a>
            . For more details, visit the{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
              Google Privacy & Terms
            </a>{" "}
            page.
          </p>
        </section>

        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>In Short:</strong> If you choose to register or log in to our Services using a social media account, we may have access to certain
            information about you.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X
            logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile
            information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends
            list, and profile picture, as well as other information you choose to make public on such a social media platform.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            We will use the information we receive only for the purposes described in this Privacy Notice or that are otherwise made clear to you on
            the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your
            third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your
            personal information, and how you can set your privacy preferences on their sites and apps.
          </p>
        </section>

        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice
            unless otherwise required by law.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a
            longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice
            will require us to keep your personal information for longer than the period of time in which users have an account with us.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such
            information. If this is not possible (for example, because your personal information has been stored in backup archives), we will securely
            store your personal information and isolate it from any further processing until deletion is possible.
          </p>
        </section>

        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>In Short:</strong> We aim to protect your personal information through a system of organisational and technical security measures.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any
            personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over
            the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            As a result, we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to bypass
            our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal
            information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within
            a secure environment.
          </p>
        </section>

        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">8. WHAT ARE YOUR PRIVACY RIGHTS?</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>In Short:</strong> You may review, change, or terminate your account at any time, depending on your country, province, or state of
            residence.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express
            and/or implied depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent by
            contacting us using the details provided in the section &quot;<strong>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</strong>&quot; below.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            However, this will not affect the lawfulness of processing before its withdrawal, nor will it impact the processing of your personal
            information conducted under other lawful grounds, where applicable.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>Opting out of marketing and promotional communications:</strong> You can unsubscribe from our marketing and promotional emails at
            any time by clicking the unsubscribe link in the emails we send or by contacting us using the details provided in the &quot;
            <strong>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</strong>&quot; section below. You will then be removed from our marketing lists.
            However, we may still communicate with you for service-related messages, such as account administration and service requests.
          </p>

          <h2 className="text-gray-900 mt-6 text-xl font-semibold">Account Information</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            If you would like to review or change your account information or terminate your account, you can:
          </p>

          <ul className="text-gray-700 mt-4 list-disc pl-6">
            <li>Log in to your account settings and update your user account.</li>
          </ul>

          <p className="text-gray-700 mt-4 leading-relaxed">
            Upon request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we
            may retain some information to prevent fraud, troubleshoot problems, assist investigations, enforce legal terms, and comply with
            applicable legal requirements.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            <strong>Cookies and similar technologies:</strong> Most web browsers accept cookies by default. If you prefer, you can set your browser to
            remove or reject cookies, but this may affect certain features or services of our platform.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            If you have questions or comments about your privacy rights, you may email us at
            <a href="mailto:Crayacares@gmail.com" className="font-medium text-purple-500">
              Crayacares@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">9. CONTROLS FOR DO-NOT-TRACK FEATURES</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Most web browsers and some mobile operating systems and applications include a Do-Not-Track (&quot;DNT&quot;) feature or setting you can
            activate to signal your privacy preference not to have data about your online browsing activities monitored and collected.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not
            currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a
            standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of
            this Privacy Notice.
          </p>
        </section>

        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">10. SHOPPABLE STORY & VIDEO CONTENT</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Any images, videos, and shoppable content uploaded to storefronts will be publicly accessible and may be indexed by search engines.
          </p>
        </section>

        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">11. DYNAMIC STOREFRONT DATA</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Since storefronts can change dynamically (like a social media profile), your product listings, videos, and stories may be cached or stored
            for a limited period after deletion.
          </p>
        </section>

        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">12. REVENUE & PAYOUT PROCESSING</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Craya does not store sensitive payment information but relies on third-party payment processors.
          </p>
        </section>
        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">13. USER-GENERATED CONTENT LICENSE</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Sellers retain ownership of their content but grant Craya a license to display, promote, and distribute their storefront content across
            its platform.
          </p>
        </section>

        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">14. DO WE MAKE UPDATES TO THIS NOTICE?</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            <span className="font-semibold">In Short:</span> Yes, we will update this notice as necessary to stay compliant with relevant laws.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            We may update this Privacy Notice from time to time. The updated version will be indicated by an updated
            <span className="font-semibold"> &apos;Revised&apos; </span> date at the top of this Privacy Notice. If we make material changes to this
            Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We
            encourage you to review this Privacy Notice frequently to stay informed about how we are protecting your information.
          </p>
        </section>

        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">15. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            If you have questions or comments about this notice, you may email us at
            <a href="mailto:Crayacares@gmail.com" className="font-medium text-purple-600 hover:underline">
              Crayacares@gmail.com
            </a>
            or contact us by post at:
          </p>
          <div className="text-gray-700 mt-4">
            <p className="font-semibold">Krayadotshop Private Limited</p>
            <p>B3 - 48, Shri Krishna Enclave, behind Cyber Police Station, Sector 18 Rohini</p>
            <p>New Delhi, Delhi 110042</p>
            <p>India</p>
          </div>
        </section>
        <section className="mb-10">
          <h1 className="text-gray-900 border-b-2 border-purple-500 pb-2 text-3xl font-bold">
            16. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
          </h1>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you,
            details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw
            your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">To request to review, update, or delete your personal information, please visit:</p>
          <ul className="text-gray-700 mt-4 list-disc pl-6">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Disclaimer</li>
            <li>Cookie Policy</li>
            <li>Support</li>
            <li>Limit the use of my sensitive personal information</li>
            <li>Do not sell or share my personal information</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
