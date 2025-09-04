import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../src/firebase'; // Adjust path if needed

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  destination: string;
  startDate: string;
  counsellingMode: string;
  studyLevel: string;
  contactConsent: boolean;
  updatesConsent: boolean;
  status: string;
}

const Contact: React.FC = () => {
  const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+880', // Default: Bnagladesh
    phoneNumber: '',
    destination: '',
    startDate: '',
    counsellingMode: '',
    studyLevel: '',
    contactConsent: false,
    updatesConsent: false,
    status: 'pending',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Omit<ContactFormData, 'funding'>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing/selecting
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ContactFormData];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Omit<ContactFormData, 'funding'>> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.destination) newErrors.destination = 'Please select a destination';
    if (!formData.startDate) newErrors.startDate = 'Please select a start date';
    if (!formData.counsellingMode) newErrors.counsellingMode = 'Please select counselling mode';
    if (!formData.studyLevel) newErrors.studyLevel = 'Please select study level';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        countryCode: formData.countryCode, // Explicitly include
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        fullPhoneNumber: `${formData.countryCode} ${formData.phoneNumber}`.trim(),
        timestamp: serverTimestamp(),
      });

      setSubmitStatus('success');

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+1',
        phoneNumber: '',
        destination: '',
        startDate: '',
        counsellingMode: '',
        studyLevel: '',
        contactConsent: false,
        updatesConsent: false,
        status: 'pending',
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding document: ', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen overflow-x-hidden transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 text-center py-20">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100"
    >
      Get in Touch
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
    >
      We're here to help you on your journey to international education. Reach out with your questions.
    </motion.p>
  </div>
</header>


      {/* Form Section */}
      <section className="py-20 bg-cyan-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-lg shadow-lg"
          >
            <div className="text-left mb-8">
              <h2 className="text-3xl font-extrabold text-brand-primary dark:text-gray-100">
                IGFS Can Help You
              </h2>
              <div className="w-16 h-1 bg-orange-500 mt-2"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Enter your details and one of our expert counsellors will reach out.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md">
                Thank you! We will contact you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                {['firstName', 'lastName'].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {field === 'firstName' ? 'First Name*' : 'Last Name*'}
                    </label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      value={formData[field as keyof ContactFormData]}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors[field as keyof ContactFormData] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[field as keyof ContactFormData] && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors[field as keyof ContactFormData]}
                      </p>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeInUp}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </motion.div>

              {/* Mobile Number - International */}
              <motion.div variants={fadeInUp} className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mobile Number*
                </label>
                <div className="mt-1 flex w-full rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
                  {/* Country Code Dropdown */}
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-28 sm:w-32 px-3 py-3 bg-gray-50 text-gray-700 text-sm
                              focus:outline-none dark:bg-gray-600 dark:text-gray-200
                              border-r border-gray-300 dark:border-gray-500 rounded-l-md"
                    aria-label="Country code"
                  >
                    {[
                      { "code": "+93", "country": "Afghanistan" },
                      { "code": "+358", "country": "Aland Islands" },
                      { "code": "+355", "country": "Albania" },
                      { "code": "+213", "country": "Algeria" },
                      { "code": "+1684", "country": "AmericanSamoa" },
                      { "code": "+376", "country": "Andorra" },
                      { "code": "+244", "country": "Angola" },
                      { "code": "+1264", "country": "Anguilla" },
                      { "code": "+672", "country": "Antarctica" },
                      { "code": "+1268", "country": "Antigua and Barbuda" },
                      { "code": "+54", "country": "Argentina" },
                      { "code": "+374", "country": "Armenia" },
                      { "code": "+297", "country": "Aruba" },
                      { "code": "+61", "country": "Australia" },
                      { "code": "+43", "country": "Austria" },
                      { "code": "+994", "country": "Azerbaijan" },
                      { "code": "+1242", "country": "Bahamas" },
                      { "code": "+973", "country": "Bahrain" },
                      { "code": "+880", "country": "Bangladesh" },
                      { "code": "+1246", "country": "Barbados" },
                      { "code": "+375", "country": "Belarus" },
                      { "code": "+32", "country": "Belgium" },
                      { "code": "+501", "country": "Belize" },
                      { "code": "+229", "country": "Benin" },
                      { "code": "+1441", "country": "Bermuda" },
                      { "code": "+975", "country": "Bhutan" },
                      { "code": "+591", "country": "Bolivia, Plurinational State of" },
                      { "code": "+387", "country": "Bosnia and Herzegovina" },
                      { "code": "+267", "country": "Botswana" },
                      { "code": "+55", "country": "Brazil" },
                      { "code": "+246", "country": "British Indian Ocean Territory" },
                      { "code": "+673", "country": "Brunei Darussalam" },
                      { "code": "+359", "country": "Bulgaria" },
                      { "code": "+226", "country": "Burkina Faso" },
                      { "code": "+257", "country": "Burundi" },
                      { "code": "+855", "country": "Cambodia" },
                      { "code": "+237", "country": "Cameroon" },
                      { "code": "+1", "country": "Canada" },
                      { "code": "+238", "country": "Cape Verde" },
                      { "code": "+345", "country": "Cayman Islands" },
                      { "code": "+236", "country": "Central African Republic" },
                      { "code": "+235", "country": "Chad" },
                      { "code": "+56", "country": "Chile" },
                      { "code": "+86", "country": "China" },
                      { "code": "+61", "country": "Christmas Island" },
                      { "code": "+61", "country": "Cocos (Keeling) Islands" },
                      { "code": "+57", "country": "Colombia" },
                      { "code": "+269", "country": "Comoros" },
                      { "code": "+242", "country": "Congo" },
                      { "code": "+243", "country": "Congo, The Democratic Republic of the Congo" },
                      { "code": "+682", "country": "Cook Islands" },
                      { "code": "+506", "country": "Costa Rica" },
                      { "code": "+225", "country": "Cote d'Ivoire" },
                      { "code": "+385", "country": "Croatia" },
                      { "code": "+53", "country": "Cuba" },
                      { "code": "+357", "country": "Cyprus" },
                      { "code": "+420", "country": "Czech Republic" },
                      { "code": "+45", "country": "Denmark" },
                      { "code": "+253", "country": "Djibouti" },
                      { "code": "+1767", "country": "Dominica" },
                      { "code": "+1849", "country": "Dominican Republic" },
                      { "code": "+593", "country": "Ecuador" },
                      { "code": "+20", "country": "Egypt" },
                      { "code": "+503", "country": "El Salvador" },
                      { "code": "+240", "country": "Equatorial Guinea" },
                      { "code": "+291", "country": "Eritrea" },
                      { "code": "+372", "country": "Estonia" },
                      { "code": "+251", "country": "Ethiopia" },
                      { "code": "+500", "country": "Falkland Islands (Malvinas)" },
                      { "code": "+298", "country": "Faroe Islands" },
                      { "code": "+679", "country": "Fiji" },
                      { "code": "+358", "country": "Finland" },
                      { "code": "+33", "country": "France" },
                      { "code": "+594", "country": "French Guiana" },
                      { "code": "+689", "country": "French Polynesia" },
                      { "code": "+241", "country": "Gabon" },
                      { "code": "+220", "country": "Gambia" },
                      { "code": "+995", "country": "Georgia" },
                      { "code": "+49", "country": "Germany" },
                      { "code": "+233", "country": "Ghana" },
                      { "code": "+350", "country": "Gibraltar" },
                      { "code": "+30", "country": "Greece" },
                      { "code": "+299", "country": "Greenland" },
                      { "code": "+1473", "country": "Grenada" },
                      { "code": "+590", "country": "Guadeloupe" },
                      { "code": "+1671", "country": "Guam" },
                      { "code": "+502", "country": "Guatemala" },
                      { "code": "+44", "country": "Guernsey" },
                      { "code": "+224", "country": "Guinea" },
                      { "code": "+245", "country": "Guinea-Bissau" },
                      { "code": "+595", "country": "Guyana" },
                      { "code": "+509", "country": "Haiti" },
                      { "code": "+379", "country": "Holy See (Vatican City State)" },
                      { "code": "+504", "country": "Honduras" },
                      { "code": "+852", "country": "Hong Kong" },
                      { "code": "+36", "country": "Hungary" },
                      { "code": "+354", "country": "Iceland" },
                      { "code": "+91", "country": "India" },
                      { "code": "+62", "country": "Indonesia" },
                      { "code": "+98", "country": "Iran, Islamic Republic of Persian Gulf" },
                      { "code": "+964", "country": "Iraq" },
                      { "code": "+353", "country": "Ireland" },
                      { "code": "+44", "country": "Isle of Man" },
                      { "code": "+972", "country": "Israel" },
                      { "code": "+39", "country": "Italy" },
                      { "code": "+1876", "country": "Jamaica" },
                      { "code": "+81", "country": "Japan" },
                      { "code": "+44", "country": "Jersey" },
                      { "code": "+962", "country": "Jordan" },
                      { "code": "+77", "country": "Kazakhstan" },
                      { "code": "+254", "country": "Kenya" },
                      { "code": "+686", "country": "Kiribati" },
                      { "code": "+850", "country": "Korea, Democratic People's Republic of Korea" },
                      { "code": "+82", "country": "Korea, Republic of South Korea" },
                      { "code": "+965", "country": "Kuwait" },
                      { "code": "+996", "country": "Kyrgyzstan" },
                      { "code": "+856", "country": "Laos" },
                      { "code": "+371", "country": "Latvia" },
                      { "code": "+961", "country": "Lebanon" },
                      { "code": "+266", "country": "Lesotho" },
                      { "code": "+231", "country": "Liberia" },
                      { "code": "+218", "country": "Libyan Arab Jamahiriya" },
                      { "code": "+423", "country": "Liechtenstein" },
                      { "code": "+370", "country": "Lithuania" },
                      { "code": "+352", "country": "Luxembourg" },
                      { "code": "+853", "country": "Macao" },
                      { "code": "+389", "country": "Macedonia" },
                      { "code": "+261", "country": "Madagascar" },
                      { "code": "+265", "country": "Malawi" },
                      { "code": "+60", "country": "Malaysia" },
                      { "code": "+960", "country": "Maldives" },
                      { "code": "+223", "country": "Mali" },
                      { "code": "+356", "country": "Malta" },
                      { "code": "+692", "country": "Marshall Islands" },
                      { "code": "+596", "country": "Martinique" },
                      { "code": "+222", "country": "Mauritania" },
                      { "code": "+230", "country": "Mauritius" },
                      { "code": "+262", "country": "Mayotte" },
                      { "code": "+52", "country": "Mexico" },
                      { "code": "+691", "country": "Micronesia, Federated States of Micronesia" },
                      { "code": "+373", "country": "Moldova" },
                      { "code": "+377", "country": "Monaco" },
                      { "code": "+976", "country": "Mongolia" },
                      { "code": "+382", "country": "Montenegro" },
                      { "code": "+1664", "country": "Montserrat" },
                      { "code": "+212", "country": "Morocco" },
                      { "code": "+258", "country": "Mozambique" },
                      { "code": "+95", "country": "Myanmar" },
                      { "code": "+264", "country": "Namibia" },
                      { "code": "+674", "country": "Nauru" },
                      { "code": "+977", "country": "Nepal" },
                      { "code": "+31", "country": "Netherlands" },
                      { "code": "+599", "country": "Netherlands Antilles" },
                      { "code": "+687", "country": "New Caledonia" },
                      { "code": "+64", "country": "New Zealand" },
                      { "code": "+505", "country": "Nicaragua" },
                      { "code": "+227", "country": "Niger" },
                      { "code": "+234", "country": "Nigeria" },
                      { "code": "+683", "country": "Niue" },
                      { "code": "+672", "country": "Norfolk Island" },
                      { "code": "+1670", "country": "Northern Mariana Islands" },
                      { "code": "+47", "country": "Norway" },
                      { "code": "+968", "country": "Oman" },
                      { "code": "+92", "country": "Pakistan" },
                      { "code": "+680", "country": "Palau" },
                      { "code": "+970", "country": "Palestinian Territory, Occupied" },
                      { "code": "+507", "country": "Panama" },
                      { "code": "+675", "country": "Papua New Guinea" },
                      { "code": "+595", "country": "Paraguay" },
                      { "code": "+51", "country": "Peru" },
                      { "code": "+63", "country": "Philippines" },
                      { "code": "+872", "country": "Pitcairn" },
                      { "code": "+48", "country": "Poland" },
                      { "code": "+351", "country": "Portugal" },
                      { "code": "+1939", "country": "Puerto Rico" },
                      { "code": "+974", "country": "Qatar" },
                      { "code": "+40", "country": "Romania" },
                      { "code": "+7", "country": "Russia" },
                      { "code": "+250", "country": "Rwanda" },
                      { "code": "+262", "country": "Reunion" },
                      { "code": "+590", "country": "Saint Barthelemy" },
                      { "code": "+290", "country": "Saint Helena, Ascension and Tristan Da Cunha" },
                      { "code": "+1869", "country": "Saint Kitts and Nevis" },
                      { "code": "+1758", "country": "Saint Lucia" },
                      { "code": "+590", "country": "Saint Martin" },
                      { "code": "+508", "country": "Saint Pierre and Miquelon" },
                      { "code": "+1784", "country": "Saint Vincent and the Grenadines" },
                      { "code": "+685", "country": "Samoa" },
                      { "code": "+378", "country": "San Marino" },
                      { "code": "+239", "country": "Sao Tome and Principe" },
                      { "code": "+966", "country": "Saudi Arabia" },
                      { "code": "+221", "country": "Senegal" },
                      { "code": "+381", "country": "Serbia" },
                      { "code": "+248", "country": "Seychelles" },
                      { "code": "+232", "country": "Sierra Leone" },
                      { "code": "+65", "country": "Singapore" },
                      { "code": "+421", "country": "Slovakia" },
                      { "code": "+386", "country": "Slovenia" },
                      { "code": "+677", "country": "Solomon Islands" },
                      { "code": "+252", "country": "Somalia" },
                      { "code": "+27", "country": "South Africa" },
                      { "code": "+211", "country": "South Sudan" },
                      { "code": "+500", "country": "South Georgia and the South Sandwich Islands" },
                      { "code": "+34", "country": "Spain" },
                      { "code": "+94", "country": "Sri Lanka" },
                      { "code": "+249", "country": "Sudan" },
                      { "code": "+597", "country": "Suriname" },
                      { "code": "+47", "country": "Svalbard and Jan Mayen" },
                      { "code": "+268", "country": "Swaziland" },
                      { "code": "+46", "country": "Sweden" },
                      { "code": "+41", "country": "Switzerland" },
                      { "code": "+963", "country": "Syrian Arab Republic" },
                      { "code": "+886", "country": "Taiwan" },
                      { "code": "+992", "country": "Tajikistan" },
                      { "code": "+255", "country": "Tanzania, United Republic of Tanzania" },
                      { "code": "+66", "country": "Thailand" },
                      { "code": "+670", "country": "Timor-Leste" },
                      { "code": "+228", "country": "Togo" },
                      { "code": "+690", "country": "Tokelau" },
                      { "code": "+676", "country": "Tonga" },
                      { "code": "+1868", "country": "Trinidad and Tobago" },
                      { "code": "+216", "country": "Tunisia" },
                      { "code": "+90", "country": "Turkey" },
                      { "code": "+993", "country": "Turkmenistan" },
                      { "code": "+1649", "country": "Turks and Caicos Islands" },
                      { "code": "+688", "country": "Tuvalu" },
                      { "code": "+256", "country": "Uganda" },
                      { "code": "+380", "country": "Ukraine" },
                      { "code": "+971", "country": "United Arab Emirates" },
                      { "code": "+44", "country": "United Kingdom" },
                      { "code": "+1", "country": "United States" },
                      { "code": "+598", "country": "Uruguay" },
                      { "code": "+998", "country": "Uzbekistan" },
                      { "code": "+678", "country": "Vanuatu" },
                      { "code": "+58", "country": "Venezuela, Bolivian Republic of Venezuela" },
                      { "code": "+84", "country": "Vietnam" },
                      { "code": "+1284", "country": "Virgin Islands, British" },
                      { "code": "+1340", "country": "Virgin Islands, U.S." },
                      { "code": "+681", "country": "Wallis and Futuna" },
                      { "code": "+967", "country": "Yemen" },
                      { "code": "+260", "country": "Zambia" },
                      { "code": "+263", "country": "Zimbabwe" }, 
                    ].map(({ code, country }) => (
                      <option key={code} value={code}>
                        {code} ({country})
                      </option>
                    ))}
                  </select>

                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    // placeholder="" 
                    className={`flex-1 block w-full px-4 py-3 focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-white ${
                      errors.phoneNumber ? 'border-red-500' : 'border-transparent'
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </motion.div>

              {/* Destination & Start Date */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: 'Preferred Study Destination*', name: 'destination', options: ['USA', 'South Korea', 'Italy'] },
                  { label: 'When would you like to start?*', name: 'startDate', options: ['Fall 2024', 'Spring 2025', 'Fall 2025'] }
                ].map(({ label, name, options }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {label}
                    </label>
                    <select
                      id={name}
                      name={name}
                      value={formData[name as keyof ContactFormData]}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors[name as keyof ContactFormData] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select</option>
                      {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors[name as keyof ContactFormData] && (
                      <p className="mt-1 text-sm text-red-500">{errors[name as keyof ContactFormData]}</p>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Counselling Mode */}
              <motion.div variants={fadeInUp}>
                <label htmlFor="counsellingMode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preferred Mode of Counselling*
                </label>
                <select
                  id="counsellingMode"
                  name="counsellingMode"
                  value={formData.counsellingMode}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.counsellingMode ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Virtual">Virtual</option>
                </select>
                {errors.counsellingMode && (
                  <p className="mt-1 text-sm text-red-500">{errors.counsellingMode}</p>
                )}
              </motion.div>

              {/* Study Level */}
              <motion.div variants={fadeInUp}>
                <label htmlFor="studyLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preferred Study Level*
                </label>
                <select
                  id="studyLevel"
                  name="studyLevel"
                  value={formData.studyLevel}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.studyLevel ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select</option>
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.studyLevel && (
                  <p className="mt-1 text-sm text-red-500">{errors.studyLevel}</p>
                )}
              </motion.div>

              {/* Consent */}
              <motion.div variants={fadeInUp} className="space-y-4 pt-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="contact-consent"
                    name="contactConsent"
                    checked={formData.contactConsent}
                    onChange={handleChange}
                    className="h-4 w-4 mt-1 text-brand-primary rounded focus:ring-brand-primary border-gray-300"
                  />
                  <label htmlFor="contact-consent" className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                    Please contact me by phone, email, or SMS.
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="updates-consent"
                    name="updatesConsent"
                    checked={formData.updatesConsent}
                    onChange={handleChange}
                    className="h-4 w-4 mt-1 text-brand-primary rounded focus:ring-brand-primary border-gray-300"
                  />
                  <label htmlFor="updates-consent" className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                    I would like to receive updates and offers from IGFS.
                  </label>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={fadeInUp} className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-semibold py-3 px-8 rounded-full shadow-md text-lg text-white transition duration-300 ${
                    isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Enquire Now'}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;