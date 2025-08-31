import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// === Type Definitions ===
type DestinationKey = 'USA' | 'South Korea' | 'Italy'; // Add new countries here

interface DestinationConfig {
  key: DestinationKey;
  name: string;
  videoUrl: string;
  component: React.FC;
}

// === Content Components (Each country) ===

const UsaContent: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="max-w-4xl mx-auto text-left text-gray-800 dark:text-gray-200"
    aria-labelledby="usa-heading"
  >
    <h2 id="usa-heading" className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
      Here are the reasons why the United States is the top choice for Bangladeshi students
    </h2>
    <div className="w-20 h-1.5 bg-orange-500 mt-3"></div>
    <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
      With abundant footfall, good quality education, renowned universities and amazing job prospects, the US tops the charts! Know why{' '}
      <strong>studying in the US</strong> is a life-changing experience.
    </p>

    <h3 className="mt-10 text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Why study in the USA?</h3>
    <p className="mt-4 text-gray-600 dark:text-gray-400">Know why the USA is the place to be for higher education:</p>
    <ol className="mt-6 space-y-5 text-gray-700 dark:text-gray-300">
      <li>
        <strong>1. Globally Ranked Universities:</strong> The US is home to some renowned universities. According to the QS World University Rankings 2024,{' '}
        <strong>16 of the top 50 universities in the world are in the US.</strong>
      </li>
      <li>
        <strong>2. Variety of popular courses:</strong> US universities have a plethora of courses you can choose from.
      </li>
      <li>
        <strong>3. Job prospects:</strong> The US is not just popular for its Silicon Valley but is also home to a{' '}
        <strong>maximum number of Fortune 500 companies.</strong>
      </li>
      <li>
        <strong>4. Research opportunities:</strong> US universities have world-class research opportunities and renowned faculties.
      </li>
      <li>
        <strong>5. Scholarships and financial aid:</strong> The US offers the maximum number of scholarships and assistantships.
      </li>
    </ol>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Programs and their duration in the US</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Here are the programs that the US universities offer:</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Qualification</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Duration</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">PSWR*</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Average Fee (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Associate degree</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">2 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">Up to 3 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">$10,000–$20,000</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Bachelor's degree</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">4 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">Up to 3 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">$15,000–$60,000</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Master's degree/MBA</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">1–2 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">Up to 3 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">$15,000–$70,000</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Doctorate or PhD</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">4–7 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">Up to 3 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">University-specific</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
        *Note: If you are a STEM graduate, you may be eligible for a 24-month OPT
      </p>
    </div>

    {/* Additional sections */}
    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">IELTS score/Standardised test for US universities</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        <span className="text-blue-600 dark:text-blue-400">IELTS</span> score is accepted widely in <strong>US institutions</strong>. You might also require taking standardised tests such as:
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
        <li>Act/SAT</li>
        <li>GMAT/GRE</li>
      </ul>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Types of part-time and full-time work in the US for international students</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        The US offers a variety of part-time and full-time work opportunities to international students. Here are the few options you can opt for:
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
        <li>Curricular Practical Training/Internships</li>
        <li>Assistantships</li>
        <li>Teaching assistantship</li>
        <li>Research assistantship</li>
        <li>Resident assistantship</li>
        <li>Optional practical training</li>
      </ul>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Academic Intake to study in the US</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        US universities usually have 3 intakes. In some universities, intakes may also be referred to as a semester. The three intakes available in the US are:
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Intakes</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Deadline</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Fall - Aug/Sep</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">November–March</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Summer - May/June</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">August–February</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Spring - Jan/Feb</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">July–November</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Deadline for US universities</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        You need to start preparing for your US application 8–9 months in advance before the commencement of your program.
      </p>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Cost of studying in the US</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        The average cost of studying in the US ranges from $10,000–$75,000 per year while the cost of living ranges from $8,000–$20,000 per year.
      </p>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Popular programs to study in the US</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        It is best to do your research before you apply to any of the universities and shortlist the ones you find the most suitable as per your dreams and aspirations. Here are the popular courses in the US:
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
        <li>Engineering</li>
        <li>Computer Science</li>
        <li>Physical Health</li>
        <li>Psychology</li>
        <li>Business Management</li>
        <li>Life Science</li>
        <li>Finance</li>
        <li>Economics</li>
      </ul>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Top universities for studying in the US</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        According to the QS World Universities Rankings 2024, 27 US universities are ranked in the top 100 worldwide. Here are the top US universities for higher education:
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">S.No.</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Institution</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">QS Ranking 2024 (Globally)</th>
            </tr>
          </thead>
          <tbody>
            {[
              'Massachusetts Institute of Technology (MIT)',
              'Stanford University',
              'Harvard University',
              'California Institute of Technology (CalTech)',
              'University of Chicago',
              'Princeton University',
              'University of Pennsylvania',
              'Cornell University',
              'Yale University',
              'Columbia University',
            ].map((name, index) => (
              <tr key={name} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}>
                <td className="p-4 border border-gray-300 dark:border-gray-600">{index + 1}</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">{name}</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">{[1, 5, 4, 15, 11, 17, 12, 13, 16, 23][index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Student visa checklist for the US</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Be prepared for the following documents before you apply for a Student Visa to <strong>study in the US:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
        <li>Passport</li>
        <li>I-20 and offer letter</li>
        <li>Visa appointment letter</li>
        <li>DS-160 confirmation</li>
        <li>SEVIS-Fee receipt and Visa fee receipt</li>
        <li>Finances and scholarship</li>
        <li>6-month bank statement</li>
        <li>Academic transcripts</li>
        <li>Work experience certificates</li>
        <li>Standardised Test scores</li>
        <li>Internships and other relevant certificates</li>
      </ul>
      <Link to="/contact" className="mt-8 inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-300">
        Help me study in USA
      </Link>
    </div>
  </motion.div>
);

const SouthKoreaContent: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="max-w-4xl mx-auto text-left text-gray-800 dark:text-gray-200"
    aria-labelledby="korea-heading"
  >
    <h2 id="korea-heading" className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
      Here are the reasons why South Korea is a top choice for international students
    </h2>
    <div className="w-20 h-1.5 bg-orange-500 mt-3"></div>
    <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
      As a global leader in technology and innovation, South Korea offers a dynamic, high-quality education in one of the safest and most vibrant countries in the world. Discover why{' '}
      <strong>studying in South Korea</strong> is an investment in your future.
    </p>

    <h3 className="mt-10 text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Why study in South Korea?</h3>
    <p className="mt-4 text-gray-600 dark:text-gray-400">Explore the advantages of pursuing higher education in South Korea:</p>
    <ol className="mt-6 space-y-5 text-gray-700 dark:text-gray-300">
      <li>
        <strong>1. World-Class Education in Technology:</strong> Home to giants like Samsung and Hyundai, South Korea offers unparalleled education and research in STEM fields.
      </li>
      <li>
        <strong>2. Globally Ranked Universities:</strong> Many Korean universities, such as Seoul National University and KAIST, are ranked among the top 100 in the world.
      </li>
      <li>
        <strong>3. Cultural Experience:</strong> Immerse yourself in a unique culture that blends ancient traditions with modern life, from K-pop and K-dramas to historic palaces and cuisine.
      </li>
      <li>
        <strong>4. Generous Scholarships:</strong> The Korean government and individual universities offer numerous scholarships, including the prestigious Global Korea Scholarship (GKS), which covers tuition, airfare, and living expenses.
      </li>
      <li>
        <strong>5. Career Opportunities:</strong> The country's strong economy and focus on innovation provide excellent career prospects, particularly for graduates in tech and business fields.
      </li>
    </ol>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Programs and their duration in South Korea</h3>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Qualification</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Duration</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Average Fee (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Bachelor's degree (Haksa)</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">4 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">$5,000 – $15,000</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Master's degree (Suksa)</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">2 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">$6,000 – $20,000</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Doctorate or PhD (Baksa)</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">3+ years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">University-specific</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Language tests for Korean universities</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        While many universities offer programs in English (requiring IELTS/TOEFL), proficiency in Korean is a major asset.
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
        <li>
          <strong>TOPIK (Test of Proficiency in Korean):</strong> A high TOPIK score is often required for admission into Korean-taught programs and can be a prerequisite for scholarships.
        </li>
        <li>
          <strong>IELTS/TOEFL:</strong> Required for English-taught degree programs.
        </li>
      </ul>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Academic Intake to study in South Korea</h3>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Intakes</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Application Period</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Spring - March</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">September–November</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Fall - September</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">May–June</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Top universities for studying in South Korea</h3>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">S.No.</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Institution</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">QS Ranking 2024 (Globally)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Seoul National University (SNU)', rank: 41 },
              { name: 'KAIST - Korea Advanced Institute of Science & Technology', rank: 56 },
              { name: 'Yonsei University', rank: 76 },
              { name: 'Korea University', rank: 79 },
              { name: 'Pohang University of Science and Technology (POSTECH)', rank: 100 },
              { name: 'Sungkyunkwan University (SKKU)', rank: 145 },
            ].map((uni, index) => (
              <tr key={uni.name} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}>
                <td className="p-4 border border-gray-300 dark:border-gray-600">{index + 1}</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">{uni.name}</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">{uni.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Student visa (D-2) checklist for South Korea</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Key documents required for your student visa application:
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
        <li>Valid Passport</li>
        <li>Completed Visa Application Form</li>
        <li>Certificate of Admission from the university</li>
        <li>Proof of finances (bank statements showing sufficient funds)</li>
        <li>Academic Transcripts and Certificates</li>
        <li>Study Plan or Personal Statement</li>
        <li>Proof of Accommodation</li>
      </ul>
    </div>

    {/* === NEW: Partnership with Dong-Eui University === */}
    <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
      <h3 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400 flex items-center">
        <span>🎓</span>
        <span className="ml-2">Official Partnership with Dong-Eui University</span>
      </h3>
      <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        We are proud to announce our official academic partnership with <strong>Dong-Eui University</strong>, one of South Korea's leading institutions located in Busan. This collaboration opens exclusive pathways for international students to gain admission, access scholarships, and receive dedicated support throughout their academic journey.
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
        <li><strong>Direct Admission Support:</strong> Streamlined application process through our partnership.</li>
        <li><strong>Scholarship Opportunities:</strong> Special tuition waivers and living expense support for eligible students.</li>
        <li><strong>Dedicated Mentorship:</strong> Pre-departure guidance, airport pickup, and orientation program.</li>
        <li><strong>Korean Language Training:</strong> Access to intensive language courses to help you adapt quickly.</li>
      </ul>

      <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src="/images/Partnership/Dong-ui.jpeg"
          alt="Dong-Eui University, Busan, South Korea"
          className="w-full md:w-1/3 h-auto rounded-lg shadow-md object-cover"
        />
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Dong-Eui University is known for its strong programs in Engineering, IT, Business, and Korean Language & Culture.
          </p>
        </div>
      </div>
    </div>
    {/* === END Partnership Section === */}

    {/* Optional: Keep original CTA or remove it */}
    {/* If you want to remove the original CTA, delete the one below */}
    <Link to="/contact" className="mt-8 inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-300">
      Help me study in South Korea
    </Link>
  </motion.div>
);

const ItalyContent: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="max-w-4xl mx-auto text-left text-gray-800 dark:text-gray-200"
    aria-labelledby="italy-heading"
  >
    <h2 id="italy-heading" className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
      Here are the reasons why Italy is a premier destination for students worldwide
    </h2>
    <div className="w-20 h-1.5 bg-orange-500 mt-3"></div>
    <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
      Home to some of the world's oldest and most prestigious universities, Italy offers a unique blend of high-quality education, rich cultural heritage, and affordable living. See why{' '}
      <strong>studying in Italy</strong> is an unforgettable experience.
    </p>

    <h3 className="mt-10 text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Why study in Italy?</h3>
    <p className="mt-4 text-gray-600 dark:text-gray-400">Discover the unique benefits of an Italian education:</p>
    <ol className="mt-6 space-y-5 text-gray-700 dark:text-gray-300">
      <li>
        <strong>1. Affordable High-Quality Education:</strong> Public universities in Italy have significantly lower tuition fees compared to other Western European countries, without compromising on academic quality.
      </li>
      <li>
        <strong>2. Excellence in Arts, Design, and Architecture:</strong> Italy is a world leader in creative fields, offering unparalleled programs for aspiring artists, designers, and architects.
      </li>
      <li>
        <strong>3. Rich Cultural Immersion:</strong> Study in the birthplace of the Renaissance, surrounded by historical landmarks, world-famous art, and incredible cuisine.
      </li>
      <li>
        <strong>4. Historic Universities:</strong> Attend institutions like the University of Bologna, founded in 1088, and be part of a long and prestigious academic tradition.
      </li>
      <li>
        <strong>5. Gateway to Europe:</strong> Italy's central location makes it an ideal base for exploring the rest of Europe during your studies.
      </li>
    </ol>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Programs and their duration in Italy</h3>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Qualification</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Duration</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Average Fee (EUR)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Bachelor's Degree (Laurea)</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">3 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">€900 – €4,000 / year (Public)</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Master's Degree (Laurea Magistrale)</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">2 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">€900 – €4,000 / year (Public)</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="p-4 border border-gray-300 dark:border-gray-600">PhD (Dottorato di Ricerca)</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">3 years</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">Often tuition-free with stipends</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Language tests for Italian universities</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Italy offers many programs in English, but learning Italian is highly recommended for daily life.
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
        <li>
          <strong>IELTS/TOEFL:</strong> Required for English-taught programs, usually with a B2 level (IELTS 6.0+) minimum.
        </li>
        <li>
          <strong>CILS/CELI:</strong> For Italian-taught programs, you will need to prove your proficiency with a certified language test.
        </li>
      </ul>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Academic Intake to study in Italy</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Most universities in Italy follow a semester system with one primary intake.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Intake</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Starts In</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <td className="p-4 border border-gray-300 dark:border-gray-600">Fall Intake</td>
              <td className="p-4 border border-gray-300 dark:border-gray-600">September/October</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Top universities for studying in Italy</h3>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">S.No.</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">Institution</th>
              <th className="p-4 border border-gray-300 dark:border-gray-600 font-semibold">QS Ranking 2024 (Globally)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Politecnico di Milano', rank: 123 },
              { name: 'Sapienza University of Rome', rank: 134 },
              { name: 'University of Bologna', rank: 154 },
              { name: 'University of Padua', rank: 219 },
              { name: 'Politecnico di Torino', rank: 252 },
            ].map((uni, index) => (
              <tr key={uni.name} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}>
                <td className="p-4 border border-gray-300 dark:border-gray-600">{index + 1}</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">{uni.name}</td>
                <td className="p-4 border border-gray-300 dark:border-gray-600">{uni.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Student visa checklist for Italy</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Essential documents for your Italian National (Type D) Student Visa:
      </p>
      <ul className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
        <li>Valid Passport</li>
        <li>Visa Application Form</li>
        <li>Letter of Acceptance from the Italian university</li>
        <li>Proof of sufficient financial means (€6,000+/year)</li>
        <li>Proof of accommodation in Italy</li>
        <li>Health Insurance coverage</li>
        <li>Copy of your flight itinerary</li>
      </ul>
      <Link to="/contact" className="mt-8 inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-300">
        Help me study in Italy
      </Link>
    </div>
  </motion.div>
);

// === ALL DESTINATIONS CONFIG (Add new country here!) ===
const destinations: DestinationConfig[] = [
  {
    key: 'USA',
    name: 'USA',
    videoUrl: '/videos/usa-hero.mp4',
    component: UsaContent,
  },
  {
    key: 'South Korea',
    name: 'South Korea',
    videoUrl: '/videos/south-korea-hero.mp4',
    component: SouthKoreaContent,
  },
  {
    key: 'Italy',
    name: 'Italy',
    videoUrl: '/videos/italy-hero.mp4',
    component: ItalyContent,
  },
  // ✅ Add new country like this:
  // {
  //   key: 'Japan',
  //   name: 'Japan',
  //   videoUrl: '/videos/japan-hero.mp4',
  //   component: JapanContent,
  // },
];

// === Main Component ===
const Destinations: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<DestinationKey>('USA');

  useEffect(() => {
    if (location.state?.destination) {
      const dest = location.state.destination as DestinationKey;
      if (destinations.some(d => d.key === dest)) {
        setActiveTab(dest);
      }
    }
  }, [location.state]);

  const activeDestination = destinations.find(d => d.key === activeTab)!;

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Video */}
      <header className="relative flex items-center justify-center w-full aspect-video overflow-hidden">
        <video
          src={activeDestination.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          aria-hidden="true"
        />
      </header>

      {/* Tab Navigation */}
      <div className="bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:p-6 lg:px-8">
          <nav className="flex justify-center border-b border-gray-300 dark:border-gray-700" aria-label="Study Destinations">
            {destinations.map((dest) => (
              <button
                key={dest.key}
                onClick={() => setActiveTab(dest.key)}
                className={`py-4 px-6 text-lg font-semibold transition-colors duration-300 relative ${
                  activeTab === dest.key
                    ? 'text-brand-primary dark:text-brand-secondary'
                    : 'text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-white'
                }`}
                aria-selected={activeTab === dest.key}
                role="tab"
              >
                {dest.name}
                {activeTab === dest.key && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary dark:bg-brand-secondary"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Dynamic Content */}
      <main className="py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <activeDestination.component />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Destinations;