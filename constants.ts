/**
 * Navigation links for the main menu
 */
export const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Process', path: '/process' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ] as const;
  
  /**
   * Interface defining the structure of a blog post
   */
  export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    /**
     * Image URL.
     * Currently using online placeholder from picsum.photos.
     * 🔁 TODO (later): Replace with local path when client provides images.
     * Example: '/images/blog/sop.jpg'
     */
    img: string;
    author: string;
    date: string;
    content: string;
  }
  
  /**
   * All blog posts used across the site.
   * 
   * ✅ Trailing spaces in image URLs have been removed.
   * 📌 Tip: When client provides images, update `img` fields to:
   *      '/images/blog/your-image-name.jpg'
   */
  export const blogPosts: BlogPost[] = [
    {
      slug: 'tolc-exam-guide-2025',
      title: 'TOLC Exam Guide 2025: Everything You Need to Know',
      excerpt:
        'Planning to study in Italy? Learn everything about the TOLC (Test Online CISIA) – types, syllabus, exam format, preparation tips, FAQs, and strategies for success.',
      img: '/images/blog/TOLC-1.jpeg', // ✅ Clean URL – no trailing space
      author: 'Armanur Rahman Efaz',
      date: 'August 31, 2025',
      content: `
        <p class="mb-4">If you’re planning to study at an Italian university, you’ve probably heard of <strong>TOLC (Test Online CISIA)</strong> — one of the most important entrance exams for both international and Italian students.</p>
        <p class="mb-4">This guide covers everything you need to know: what TOLC is, its types, exam format, syllabus, preparation strategy, problem-solving tips, and FAQs. By the end, you’ll have a complete roadmap for success.</p>
    
        <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200"> What is TOLC?</h3>
        <p class="mb-4">TOLC (<strong>Test OnLine CISIA</strong>) is a computer-based entrance test organized by CISIA (Consorzio Interuniversitario Sistemi Integrati per l’Accesso) in Italy.</p>
        <ul class="list-disc list-inside mb-4">
          <li>Required for admission to <strong>Bachelor’s and Master’s programs</strong> in various Italian universities</li>
          <li>Can be taken <strong>online from home (TOLC@CASA)</strong> or at designated test centers</li>
          <li>Available in <strong>Italian and English</strong></li>
        </ul>
    
        <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200"> Types of TOLC Exams</h3>
        <ul class="list-disc list-inside mb-4">
          <li><strong>TOLC-I</strong> → Engineering, Science, Technology</li>
          <li><strong>TOLC-E</strong> → Economics, Business, Law</li>
          <li><strong>TOLC-B</strong> → Biology, Biotechnology</li>
          <li><strong>TOLC-F</strong> → Pharmacy</li>
          <li><strong>TOLC-MED</strong> → Medicine & Surgery</li>
          <li><strong>TOLC-SU</strong> → Humanities & Social Sciences</li>
        </ul>
    
        <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200"> Exam Structure & Format</h3>
        <ul class="list-disc list-inside mb-4">
          <li>Multiple Choice Questions (MCQs)</li>
          <li>Sections vary by type (Math, Logic, Science, Reading, English, etc.)</li>
          <li>Duration: <strong>1.5 – 2 hours</strong></li>
          <li>Negative marking in some versions</li>
        </ul>
        <p class="mb-2"><strong>Example (TOLC-I):</strong></p>
        <ul class="list-disc list-inside mb-4">
          <li>Mathematics → 20 Questions</li>
          <li>Logic → 10 Questions</li>
          <li>Science → 10 Questions</li>
          <li>Reading & English → 30 Questions</li>
        </ul>
    
        <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200"> Eligibility</h3>
        <ul class="list-disc list-inside mb-4">
          <li><strong>Bachelor’s programs:</strong> Completed high school or equivalent</li>
          <li><strong>Master’s programs:</strong> Bachelor’s degree required</li>
          <li>Open to <strong>Italian & international students</strong></li>
        </ul>
    
        <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200"> How to Apply for TOLC</h3>
        <ol class="list-decimal list-inside mb-4">
          <li>Visit the <strong>CISIA official website</strong></li>
          <li>Register with your <strong>email & ID details</strong></li>
          <li>Select the type of TOLC based on your program</li>
          <li>Choose a <strong>test date</strong> & pay the fee (approx. €30)</li>
          <li>Download the <strong>confirmation slip</strong></li>
        </ol>
    
        <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200"> Preparation Strategy</h3>
        <p class="mb-2"><strong> Step 1: Learn the Syllabus</strong></p>
        <ul class="list-disc list-inside mb-4">
          <li>Mathematics: Algebra, Geometry, Functions</li>
          <li>Logic & Problem Solving</li>
          <li>Science (Physics, Chemistry, Biology – depending on exam type)</li>
          <li>English Grammar & Comprehension</li>
        </ul>
        <p class="mb-2"><strong> Step 2: Practice Regularly</strong></p>
        <ul class="list-disc list-inside mb-4">
          <li>Solve past TOLC papers</li>
          <li>Use mock tests on the CISIA platform</li>
          <li>Focus on speed & accuracy</li>
        </ul>
        <p class="mb-2"><strong> Step 3: Strengthen Problem-Solving Skills</strong></p>
        <ul class="list-disc list-inside mb-4">
          <li>Identify weak areas early</li>
          <li>Revise formulas daily</li>
          <li>Learn shortcuts for quick calculations</li>
        </ul>
    
        <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200"> Common Mistakes & How to Avoid Them</h3>
        <ul class="list-disc list-inside mb-4">
          <li> Poor time management →  Practice with a timer</li>
          <li> Ignoring the English section →  Read articles & practice comprehension daily</li>
          <li> Skipping logic/reasoning →  Solve at least 10 logic questions every day</li>
        </ul>
    
        <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200"> Benefits of TOLC</h3>
        <ul class="list-disc list-inside mb-4">
          <li>Gateway to <strong>top Italian universities</strong></li>
          <li><strong>Flexible:</strong> can be taken multiple times a year</li>
          <li>Option to take from <strong>home (TOLC@CASA)</strong></li>
          <li><strong>Recognized nationwide</strong> in Italy</li>
        </ul>
    
        <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200"> FAQs</h3>
        <p class="mb-2"><strong>Q1. Is the TOLC exam compulsory for all Italian universities?</strong><br/> Yes, most universities require it for admission.</p>
        <p class="mb-2"><strong>Q2. Can international students take TOLC in English?</strong><br/> Yes, selected versions (TOLC-E, TOLC-I) are available in English.</p>
        <p class="mb-2"><strong>Q3. How many times can I take TOLC?</strong><br/> Multiple times in a year, but only once per session.</p>
        <p class="mb-4"><strong>Q4. What is the exam fee?</strong><br/> Around €30 (subject to change).</p>
    
        <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200"> Final Tips for Success</h3>
        <ul class="list-disc list-inside mb-4">
          <li>Start preparing at least <strong>3 months in advance</strong></li>
          <li>Focus on <strong>time management & accuracy</strong></li>
          <li>Use <strong>official CISIA resources + online practice</strong></li>
          <li>Stay <strong>calm & confident</strong> on exam day</li>
        </ul>
    
        <p class="mt-6"><em> With the right strategy and preparation, TOLC can be your gateway to studying in Italy’s top universities.</em></p>
      `,
    },
    
    {
      "slug": "navigating-student-visas-a-complete-guide-for-2024",
      "title": "Cracking the Duolingo English Test: A 2025 Guide",
      "excerpt": "The Duolingo English Test is fast becoming the go-to choice for students proving their English proficiency. Learn how to prepare, what to expect, and expert tips to ace the test on your first try.",
      "img": "/images/blog/duo-1.jpeg",
      "author": "Ifaz Md Zahin",
      "date": "August 31, 2025",
      "content": "<p class=\"mb-4\">\n    The Duolingo English Test (DET) has revolutionized how students prove their English proficiency for university admissions, scholarships, and even job applications. \n    With its affordable price, quick results, and the ability to take it from home, more than 4,500 institutions worldwide now accept the DET. \n    But how do you prepare effectively and score high? This comprehensive guide walks you through everything you need to know for 2024.\n</p>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    1. What Is the Duolingo English Test?\n</h3>\n<p class=\"mb-4\">\n    The DET is a fully online, adaptive English proficiency test that evaluates your reading, writing, listening, and speaking skills in about 1 hour. \n    Unlike traditional exams like IELTS or TOEFL, you can take it anytime from your home with just a computer, webcam, and stable internet connection.\n</p>\n\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li><strong>Duration:</strong> ~1 hour</li>\n    <li><strong>Cost:</strong> $59 (significantly cheaper than IELTS/TOEFL)</li>\n    <li><strong>Results:</strong> Available within 48 hours</li>\n    <li><strong>Accepted by:</strong> 4,500+ universities globally</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    2. Test Structure Breakdown\n</h3>\n<p class=\"mb-4\">\n    The test is divided into two main sections:\n</p>\n\n<ol class=\"list-decimal list-inside mb-4 pl-4 space-y-2\">\n    <li>\n        <strong>Adaptive Test (45 minutes):</strong> Computer-adjusted questions based on your performance.\n        <ul class=\"list-disc list-inside ml-4 mt-1 space-y-1\">\n            <li><strong>Reading:</strong> Fill-in-the-blanks, choose correct words</li>\n            <li><strong>Listening:</strong> Transcribe spoken sentences from audio clips</li>\n            <li><strong>Writing:</strong> Short answers and a 5-minute essay</li>\n            <li><strong>Speaking:</strong> Respond to prompts and describe images aloud</li>\n        </ul>\n    </li>\n    <li>\n        <strong>Video Interview & Writing Sample (10 minutes each):</strong> \n        Open-ended responses that universities may review to assess real communication skills.\n    </li>\n</ol>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    3. Why Choose Duolingo Over IELTS or TOEFL?\n</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> Take it from home — no test center required</li>\n    <li> Results in just 2 days</li>\n    <li> Lower cost and simpler interface</li>\n    <li> Accepted by top universities like Yale, Columbia, and Harvard</li>\n    <li> Retake up to 2 times in 30 days if needed</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    4. How to Prepare Effectively\n</h3>\n<p class=\"mb-4\">\n    Success on the DET comes from smart, structured preparation. Here’s how to approach it by level:\n</p>\n\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li>\n        <strong>Beginner:</strong> Focus on grammar, vocabulary, and sentence structure. \n        Use apps like Duolingo, BBC Learning English, or Grammarly.\n    </li>\n    <li>\n        <strong>Intermediate:</strong> Practice listening with TED Talks or podcasts. \n        Write daily essays (150–200 words) and record yourself speaking.\n    </li>\n    <li>\n        <strong>Advanced:</strong> Simulate test conditions with timed writing and speaking tasks. \n        Take official mock tests and analyze your errors.\n    </li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    5. Top Tips to Boost Your Score\n</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> <strong>Practice with the Official Sample Test:</strong> \n        <a href=\"https://englishtest.duolingo.com/sample\" class=\"text-blue-500 hover:underline\">\n            englishtest.duolingo.com/sample\n        </a>\n    </li>\n    <li> <strong>Speak naturally:</strong> Avoid memorized answers; focus on clear, fluent responses.</li>\n    <li> <strong>Structure your essay:</strong> Use Introduction → Body → Conclusion format.</li>\n    <li> <strong>Test environment:</strong> Sit in a quiet, well-lit room with no background noise.</li>\n    <li> <strong>Have your ID ready:</strong> You’ll need a valid passport for verification.</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    6. Common Mistakes to Avoid\n</h3>\n<p class=\"mb-4\">\n    Even prepared students can slip up. Watch out for:\n</p>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> Poor internet connection or low-quality microphone</li>\n    <li> Speaking too quietly or too fast</li>\n    <li> Submitting an essay with no clear structure or grammar errors</li>\n    <li> Ignoring the video interview — treat it seriously!</li>\n</ul>\n\n<p class=\"mb-4\">\n    At IGFS, we offer DET coaching and mock test simulations to help you build confidence and improve your score. \n    With the right preparation, the Duolingo English Test can be your fastest ticket to studying abroad.\n</p>\n\n<p class=\"font-semibold text-brand-primary dark:text-gray-200\">\n    Pro tip: You can retake the test multiple times — use your first attempt as a learning experience!\n</p>"
    },
    {
      "slug": "mastering-the-ielts-exam-complete-guide-from-beginner-to-advanced",
      "title": "Ace the IELTS Exam: Your Pathway to a High Score",
      "excerpt": "The IELTS exam is a gateway to studying abroad, immigration, and global career opportunities. This complete guide covers everything from test format to advanced strategies, helping you achieve your target band score.",
      "img": "/images/blog/ielts-1.jpeg",
      "author": "Asif Amin",
      "date": "August 31, 2025",
      "content": "<p class=\"mb-4\">\n    The International English Language Testing System (IELTS) is one of the most recognized English proficiency exams worldwide. \n    Whether you're applying for study abroad, immigration, or job opportunities, a strong IELTS score can open doors to your future.\n    This guide will take you from basic understanding to advanced preparation strategies, helping you achieve your dream band score.\n</p>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    What is IELTS?\n</h3>\n<p class=\"mb-4\">\n    IELTS (International English Language Testing System) is an English language proficiency exam that assesses four key skills:\n    <strong>Listening, Reading, Writing, and Speaking</strong>.\n    It is accepted by over <strong>11,000 organizations</strong> worldwide, including universities, employers, and immigration authorities.\n</p>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    Types of IELTS Exams\n</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li><strong>IELTS Academic:</strong> For students applying to universities and higher education.</li>\n    <li><strong>IELTS General Training:</strong> For immigration and work experience applications.</li>\n    <li><strong>IELTS UKVI:</strong> Government-approved version for UK visa and immigration purposes.</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    IELTS Exam Format\n</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li><strong>Listening:</strong> 30 minutes | 4 sections, 40 questions</li>\n    <li><strong>Reading:</strong> 60 minutes | 3 passages, 40 questions</li>\n    <li><strong>Writing:</strong> 60 minutes | Task 1 (Report/Letter) + Task 2 (Essay)</li>\n    <li><strong>Speaking:</strong> 11–14 minutes | Face-to-face interview in 3 parts</li>\n    <li><strong>Total Duration:</strong> 2 hours 45 minutes</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    Scoring System\n</h3>\n<p class=\"mb-4\">\n    IELTS uses a <strong>band scale from 0 to 9</strong>, with half-band increments (e.g., 6.5, 7.0).\n    Most universities require a score between <strong>6.0 and 7.5</strong>,\n    while immigration programs often require at least <strong>6.0 per band</strong>, depending on the country.\n</p>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    Step-by-Step Preparation Guide\n</h3>\n\n<h4 class=\"text-lg font-semibold mt-3\">Beginner Level</h4>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> Understand the exam structure and timing</li>\n    <li> Build basic grammar and vocabulary skills</li>\n    <li> Listen to English podcasts, news, and shows daily</li>\n    <li> Read simple articles (BBC, The Guardian, blogs)</li>\n</ul>\n\n<h4 class=\"text-lg font-semibold mt-3\">Intermediate Level</h4>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> Practice past IELTS questions and sample papers</li>\n    <li> Write short essays and get feedback from teachers or tools</li>\n    <li> Speak in English for 5–10 minutes every day</li>\n    <li> Focus on time management during practice sessions</li>\n</ul>\n\n<h4 class=\"text-lg font-semibold mt-3\">Advanced Level</h4>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> Take full mock tests under real exam conditions</li>\n    <li> Master complex sentence structures and linking words</li>\n    <li> Improve pronunciation and confidence for the Speaking test</li>\n    <li> Analyze mistakes and target weak areas</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    Tips for Each Section\n</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li><strong>Listening:</strong> Focus on keywords; practice note-taking and predicting answers.</li>\n    <li><strong>Reading:</strong> Skim for main ideas, scan for details; don’t read every word.</li>\n    <li><strong>Writing:</strong> Follow a clear structure: Introduction → Body → Conclusion.</li>\n    <li><strong>Speaking:</strong> Be natural, expand your answers, avoid memorized scripts.</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    Common Problems &amp; Solutions\n</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> <strong>Problem:</strong> Running out of time in Reading<br>\n         <strong>Solution:</strong> Practice skimming and scanning techniques daily.</li>\n    <li> <strong>Problem:</strong> Weak vocabulary<br>\n         <strong>Solution:</strong> Learn 5–10 new words daily and use them in sentences.</li>\n    <li> <strong>Problem:</strong> Nervous during Speaking test<br>\n         <strong>Solution:</strong> Record yourself, practice with friends, stay calm.</li>\n    <li> <strong>Problem:</strong> Poor essay coherence<br>\n         <strong>Solution:</strong> Use linking words (e.g., however, therefore, in addition).</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    Final Tips for Success\n</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> Set a daily study plan (1–2 hours minimum)</li>\n    <li> Use official IELTS preparation books (Cambridge IELTS series)</li>\n    <li> Take online practice tests regularly</li>\n    <li> Stay consistent — improvement takes time and repetition</li>\n</ul>\n\n<p class=\"font-semibold text-brand-primary dark:text-gray-200 mt-6\">\n     Remember: Preparation + Practice + Patience = IELTS Success\n</p>"
    },

    {
      "slug": "mastering-the-sat-exam-complete-guide-from-beginner-to-advanced",
      "title": "Conquer the SAT: The Complete Blueprint for Success",
      "excerpt": "The SAT is a key step toward getting into top universities and securing scholarships. This complete guide covers the test format, preparation strategies, and expert tips to help you achieve your target score.",
      "img": "/images/blog/sat-1.jpeg",
      "author": "Ifaz Md Zahin",
      "date": "August 31, 2025",
      "content": "<p class=\"mb-4\">\n    The SAT (Scholastic Assessment Test) is one of the most widely recognized standardized tests for college admissions in the United States and abroad. \n    Achieving a strong SAT score can significantly boost your chances of getting into top universities and securing scholarships.\n    This guide will take you from beginner strategies to advanced preparation techniques, helping you reach your target score.\n</p>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    What is the SAT?\n</h3>\n<p class=\"mb-4\">\n    The SAT measures a student's readiness for college by testing key skills in:\n    <strong>Reading, Writing & Language, and Math</strong>.\n    An optional Essay section was discontinued for most test-takers in 2021.\n    The test is accepted by virtually all U.S. colleges and many universities worldwide.\n</p>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    SAT Exam Format\n</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li><strong>Reading:</strong> 65 minutes | 5 passages, 52 questions</li>\n    <li><strong>Writing & Language:</strong> 35 minutes | 4 passages, 44 questions</li>\n    <li><strong>Math:</strong> 80 minutes total (No Calculator + Calculator sections) | 58 questions</li>\n    <li><strong>Total Duration:</strong> 3 hours (without Essay)</li>\n    <li><strong>Score Range:</strong> 400–1600 (combined Math + Evidence-Based Reading & Writing)</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    Step-by-Step Preparation Guide\n</h3>\n\n<h4 class=\"text-lg font-semibold mt-3\">Beginner Level</h4>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> Understand the SAT format and timing</li>\n    <li> Build basic vocabulary and grammar skills</li>\n    <li> Solve simple math problems daily</li>\n    <li> Read articles from sources like <em>The New York Times</em>, <em>Scientific American</em>, or educational blogs</li>\n</ul>\n\n<h4 class=\"text-lg font-semibold mt-3\">Intermediate Level</h4>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> Practice past SAT questions and official practice tests</li>\n    <li> Improve sentence structure through short writing exercises</li>\n    <li> Learn test-taking strategies (elimination, time management)</li>\n    <li> Focus on weak areas in math and reading comprehension</li>\n</ul>\n\n<h4 class=\"text-lg font-semibold mt-3\">Advanced Level</h4>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> Take full-length, timed mock tests under real exam conditions</li>\n    <li> Master advanced math concepts and problem-solving shortcuts</li>\n    <li> Refine critical reading skills (inference, tone, context)</li>\n    <li> Analyze errors and continuously refine your approach</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    Tips for Each Section\n</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li><strong>Reading:</strong> Identify the main idea, eliminate extreme answer choices, and use context clues.</li>\n    <li><strong>Writing & Language:</strong> Focus on grammar rules, punctuation, and clarity of expression.</li>\n    <li><strong>Math:</strong> Practice algebra, geometry, and data analysis; memorize key formulas.</li>\n    <li><strong>Essay (if applicable):</strong> Use a clear structure (Intro → Body → Conclusion) and support your analysis with evidence.</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    Common Problems &amp; Solutions\n</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> <strong>Problem:</strong> Running out of time in Math<br>\n         <strong>Solution:</strong> Practice timed problem sets and learn mental math shortcuts.</li>\n    <li> <strong>Problem:</strong> Weak vocabulary for Reading section<br>\n         <strong>Solution:</strong> Learn 5–10 new SAT words daily and use them in context.</li>\n    <li> <strong>Problem:</strong> Exam stress or anxiety<br>\n         <strong>Solution:</strong> Simulate real test conditions; practice breathing techniques and stay confident.</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">\n    Final Tips for Success\n</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n    <li> Set a consistent study schedule (1–2 hours daily)</li>\n    <li> Use official College Board SAT prep materials and Khan Academy (free!)</li>\n    <li> Take regular practice tests to track progress</li>\n    <li> Stay patient and focused — real improvement takes time and repetition</li>\n</ul>\n\n<p class=\"font-semibold text-brand-primary dark:text-gray-200 mt-6\">\n     Remember: Preparation + Practice + Patience = SAT Success\n</p>"
    },
    {
      "slug": "toefl-exam-2025-the-ultimate-guide-from-basics-to-advanced",
      "title": "TOEFL Exam 2025: The Ultimate Guide from Basics to Advanced",
      "excerpt": "The TOEFL is one of the most widely recognized English proficiency tests, accepted by 12,000+ universities worldwide. This complete guide covers exam format, preparation strategies, and expert tips to help you score high.",
      "img": "/images/blog/tofel1.jpeg",
      "author": "Armanur Rahman Efaz",
      "date": "Septembar 13 2025",
      "content": "<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">1. Introduction: What is TOEFL?</h3>\n<p class=\"mb-4\">The TOEFL (Test of English as a Foreign Language) is one of the most widely recognized English proficiency tests for non-native speakers. Conducted by ETS, it is accepted by over 12,000 universities in 160+ countries, including the USA, Canada, UK, Australia, New Zealand, and parts of Europe and Asia. Whether for studying abroad, scholarships, or work visas, TOEFL is often the first step to proving English ability.</p>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">2. Why is TOEFL Important?</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n  <li><strong>University Admission:</strong> Required by most international universities.</li>\n  <li><strong>Scholarships:</strong> Many scholarship programs demand TOEFL as proof.</li>\n  <li><strong>Work & Immigration:</strong> Used in licensing and visa processing.</li>\n  <li><strong>Career Boost:</strong> Multinational employers prefer certified English proficiency.</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">3. Types of TOEFL</h3>\n<p><strong>TOEFL iBT (Internet-based Test):</strong> Online at centers or home, covers Reading, Listening, Speaking, Writing (~3 hours), widely accepted.<br>\n<strong>TOEFL PBT (Paper-based Test):</strong> Offered only where internet isn’t available, less common and being phased out.</p>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">4. TOEFL iBT Exam Format & Sections</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n  <li><strong>Reading (54–72 min):</strong> 3–4 passages, 10 questions each. Tests comprehension, vocabulary, analysis.</li>\n  <li><strong>Listening (41–57 min):</strong> Lectures + conversations, 28–39 questions. Tests understanding & note-taking.</li>\n  <li><strong>Speaking (17 min):</strong> 4 tasks (2 independent, 2 integrated). Evaluated on fluency, clarity, grammar.</li>\n  <li><strong>Writing (50 min):</strong> 2 tasks: Integrated (reading+listening) + Independent essay.</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">5. TOEFL Scoring System</h3>\n<p>Each section scored 0–30, total 0–120. Valid for 2 years.</p>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n  <li>60–80 → Basic English (community colleges)</li>\n  <li>80–95 → Moderate (many universities)</li>\n  <li>100+ → Competitive universities</li>\n  <li>105–115 → Ivy League, MIT, Stanford</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">6. TOEFL Registration Process</h3>\n<ol class=\"list-decimal list-inside mb-4 pl-4 space-y-2\">\n  <li>Visit ETS site (ets.org/toefl)</li>\n  <li>Create ETS account</li>\n  <li>Select date/location (or Home Edition)</li>\n  <li>Pay fee ($235–$250)</li>\n  <li>Get confirmation email</li>\n</ol>\n<p class=\"italic\">👉 Register 2–3 months early to secure your slot.</p>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">7. Preparation Guide (Beginner → Advanced)</h3>\n<h4 class=\"text-lg font-semibold mt-3\">Beginner Level</h4>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n  <li>Learn grammar basics</li>\n  <li>Improve vocabulary (10–15 words/day)</li>\n  <li>Read newspapers, blogs, storybooks</li>\n  <li>Practice listening (TED Talks, podcasts)</li>\n</ul>\n<h4 class=\"text-lg font-semibold mt-3\">Intermediate Level</h4>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n  <li>Practice TOEFL mock tests</li>\n  <li>Use ETS Official Guide</li>\n  <li>Work on note-taking</li>\n  <li>Daily 1–2 min speaking practice</li>\n</ul>\n<h4 class=\"text-lg font-semibold mt-3\">Advanced Level</h4>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n  <li>Take full-length timed tests</li>\n  <li>Practice fluent speaking (record & review)</li>\n  <li>Write structured 300–350 word essays</li>\n  <li>Analyze mistakes & refine strategies</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">8. Tips & Strategies</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n  <li><strong>Reading:</strong> Skim for main ideas, scan for keywords</li>\n  <li><strong>Listening:</strong> Note keywords, not sentences</li>\n  <li><strong>Speaking:</strong> Structure: Intro → Point → Example → Conclusion</li>\n  <li><strong>Writing:</strong> Use linking words (however, therefore, moreover)</li>\n  <li><strong>Time Management:</strong> Save last 1–2 minutes for review</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">9. Best Resources</h3>\n<p><strong>Books:</strong> ETS Official Guide, Barron’s TOEFL, Kaplan TOEFL iBT<br>\n<strong>Websites:</strong> ETS Official, Magoosh, Cambridge Practice<br>\n<strong>Apps:</strong> TOEFL Go!, Magoosh TOEFL, Quizlet Vocab</p>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">10. FAQs</h3>\n<ul class=\"list-disc list-inside mb-4 pl-4 space-y-2\">\n  <li><strong>Q:</strong> Validity? <strong>A:</strong> 2 years.</li>\n  <li><strong>Q:</strong> Attempts? <strong>A:</strong> Unlimited, but wait 3 days.</li>\n  <li><strong>Q:</strong> Harder than IELTS? <strong>A:</strong> TOEFL is academic & computer-based, IELTS is flexible.</li>\n  <li><strong>Q:</strong> Can I take it at home? <strong>A:</strong> Yes, iBT Home Edition is available.</li>\n</ul>\n\n<h3 class=\"text-xl font-bold my-4 text-brand-primary dark:text-gray-200\">11. Final Thoughts</h3>\n<p class=\"mb-4\">The TOEFL Exam is a gateway for studying, working, or settling abroad. With smart prep, scoring 100+ is realistic. TOEFL proves not just English skills, but readiness for academic & professional success worldwide.</p>"
    },
    

    // {
    //   slug: 'managing-your-finances-as-an-international-student',
    //   title: 'Managing Your Finances as an International Student',
    //   excerpt:
    //     'Budgeting, banking, and finding part-time work are crucial skills for any international student. Get practical financial tips to help you manage your money wisely while studying abroad.',
    //   img: 'https://picsum.photos/id/250/400/300', // ✅ Clean URL
    //   author: 'Dr. Evelyn Reed',
    //   date: 'October 11, 2023',
    //   content: `
    //     <p class="mb-4">Studying abroad is a significant financial investment. Mastering money management early on will reduce stress and allow you to focus on your studies and enjoy your experience. Here are some practical tips for financial success.</p>
    //     <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200">1. Create a Detailed Budget</h3>
    //     <p class="mb-4">Before you even leave, create a detailed budget. Research the cost of living in your host city, including accommodation, food, transportation, health insurance, and utilities. Track your spending against your budget using an app or a simple spreadsheet. Knowing where your money goes is the first step to controlling it.</p>
    //     <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200">2. Open a Local Bank Account</h3>
    //     <p class="mb-4">Using your home bank account for daily transactions can result in high international fees. Open a local student bank account as soon as you arrive. They often have low or no fees and are convenient for managing your day-to-day expenses.</p>
    //     <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200">3. Understand Part-Time Work Regulations</h3>
    //     <p class="mb-4">Most student visas allow for part-time work, but there are strict rules about the number of hours and type of work you can do. Familiarize yourself with these regulations to avoid jeopardizing your visa status. On-campus jobs are often the easiest to secure and are a great way to earn extra money.</p>
    //     <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200">4. Take Advantage of Student Discounts</h3>
    //     <p class="mb-4">Your student ID is a golden ticket to savings. Use it for discounts on public transport, museums, cinemas, restaurants, and retail stores. Always ask if a student discount is available—you'll be surprised how much you can save.</p>
    //   `,
    // },
    // {
    //   slug: 'beyond-the-classroom-the-importance-of-extracurriculars',
    //   title: 'Beyond the Classroom: The Importance of Extracurriculars',
    //   excerpt:
    //     "Universities look for well-rounded individuals. Learn how to leverage your extracurricular activities, volunteer work, and internships to create a standout application profile.",
    //   img: 'https://picsum.photos/id/433/400/300', // ✅ Clean URL
    //   author: 'David Chen',
    //   date: 'October 07, 2023',
    //   content: `
    //     <p class="mb-4">While strong grades and test scores are essential, top universities want to see more than just academic prowess. They want to admit interesting, passionate, and engaged individuals who will contribute to the campus community. This is where your extracurricular activities come in.</p>
    //     <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200">1. Quality Over Quantity</h3>
    //     <p class="mb-4">It's better to have a deep, long-term commitment to a few activities than a superficial involvement in many. Admissions committees look for dedication, leadership, and growth. Show how you've made a meaningful impact in the clubs, sports, or organizations you've been a part of.</p>
    //     <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200">2. Connect Activities to Your Academic Interests</h3>
    //     <p class="mb-4">If you can, highlight activities that relate to your intended field of study. Applying for an engineering program? Talk about your robotics club. Interested in business? Describe your experience starting a small online store. This demonstrates genuine passion and a proactive approach to your education.</p>
    //     <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200">3. Showcase Your Soft Skills</h3>
    //     <p class="mb-4">Extracurriculars are the perfect place to demonstrate soft skills like leadership, teamwork, problem-solving, and time management. When describing your activities in your application, focus on the skills you developed and the lessons you learned, not just the tasks you performed.</p>
    //     <h3 class="text-xl font-bold my-4 text-brand-primary dark:text-gray-200">4. Internships and Work Experience Matter</h3>
    //     <p class="mb-4">Practical experience through internships or part-time jobs is highly valued. It shows maturity, responsibility, and a real-world application of your skills. Even if the job isn't directly related to your major, it demonstrates a strong work ethic.</p>
    //   `,
    // },
  ];
  
  /**
   * Utility: Get a blog post by its slug
   * Usage: getBlogPostBySlug('5-tips-for-a-winning-statement-of-purpose')
   */
  export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find((post) => post.slug === slug);
  };
  
  /**
   * Utility: Get featured blog posts (e.g., for homepage or sidebar)
   * Returns the first 3 posts
   */
  export const getFeaturedPosts = (): BlogPost[] => {
    return blogPosts.slice(0, 3);
  };