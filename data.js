/* =========================================================================
   Publications — single source of truth.

   To add a paper, copy a block and edit. Fields:
     authors  : string. Your name "A. Feder Cooper" is auto-bolded.
                "*" after a name is kept as-is (equal contribution).
     title    : string
     venue    : string (rendered in italics, followed by the year in parens).
                For law reviews, put the publication year in the venue itself,
                e.g. "Chicago-Kent Law Review 2025". Use "" for none.
     volume   : optional, NON-italic (not part of the venue name), e.g. "Vol. 100".
     year     : number (publication year; also used for filtering)
     written  : optional year the work was written. When set, it is shown as the
                parenthetical year instead of `year` (e.g. "NeurIPS 2025 (2024)").
     type     : one of  journal | conference | workshop | preprint | whitepaper | techreport | thesis | blog
     honors   : array of strings, e.g. ["Oral"], ["Best Paper Award"]
     selected : true to feature it on the homepage
     links    : array of { label, url }. Order is preserved.
   PDFs and assets are referenced from the site root (e.g. "/paper/x.pdf").
   ========================================================================= */

const PUBLICATIONS = [
  {
    authors: "Cristian Trout, Sanmi Koyejo, Sasha Romanosky, Giorgio Ripamonti, Lynn Thompson, Desiree Spain, Alex Taylor, Kevin Casey, Stephen Casper, Matthew Botvinick, Sean McGregor, Miles Brundage, A. Feder Cooper, Patricia Paskov, Adrien Ecoffet, Ben Bucknall, Kevin Wei, Markus Anderljung, Lukasz Szpruch, Bri Treece, Tom Zick, Gabriel Weil, Ugur Ozer, Kevin Kalinich, Jesus Gonzalez, Vitaly Baranov, Moran Koren, Guy Laban, Gil Arazi, Henri Winand, Derek Blum, Toby Clowes, Adam Kleinman, Anita Srinivasan, Tom Fehring, Rune Kvist, and Rajiv Dattani",
    title: "Underwriting the Agent Economy: The Blueprint for an AI Insurance Stack",
    venue: "", year: 2026, type: "whitepaper", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/trout2026insurance.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2607.11999" },
      { label: "bibtex", url: "/paper/trout2026insurance.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper, Marika Swanberg, Jamie Hayes, Lea Duesterwald, Christopher De Sa, Daniel E. Ho, Mark A. Lemley, and Percy Liang",
    title: "Extractable Memorization From First Principles",
    venue: "", 
    year: 2026, type: "preprint",
    honors: [], selected: true,
    links: [
      { label: "pdf", url: "/paper/cooper2026principles.pdf" },
      { label: "website", url: "https://monkey-emeritus.github.io/" },
      { label: "arxiv", url: "https://arxiv.org/abs/2607.12649" },
      { label: "bibtex", url: "/paper/cooper2026principles.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper, Mark A. Lemley, Allison Casasola, Ahmed Ahmed, Aaron Gokaslan, Amy B. Cyphert, Christopher De Sa, Daniel E. Ho, and Percy Liang",
    title: "Extracting memorized pieces of (copyrighted) books from open-weight language models",
    // venue: "ICML 2025 Workshop on Reliable and Responsible Foundation Models",
    venue: "COLM 2026", written: 2025,
    year: 2026, type: "conference", // honors: ["Oral"], 
    honors: [], selected: true,
    links: [
      { label: "pdf", url: "/paper/cooper2025books.pdf" },
      { label: "website", url: "https://books-memorization.github.io/" },
      { label: "arxiv", url: "https://arxiv.org/abs/2505.12546" },
      { label: "ssrn", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5262084" },
      { label: "bibtex", url: "/paper/cooper2025books.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper, Mark A. Lemley, Christopher De Sa, Lea Duesterwald, Allison Casasola, Jamie Hayes, Katherine Lee, Daniel E. Ho, and Percy Liang",
    title: "Estimating near-verbatim extraction risk in language models with decoding-constrained beam search",
    // venue: "ICML 2026 Workshop on The Impact of Memorization on Trustworthy Foundation Models",
    venue: "COLM 2026",
    year: 2026, type: "conference", honors: [], selected: true,
    links: [
      { label: "pdf", url: "/paper/cooper2026nv.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2603.24917" },
      { label: "bibtex", url: "/paper/cooper2026nv.txt" },
    ],
  },
  {
    authors: "Mark A. Lemley* and A. Feder Cooper*",
    title: "Probabilistic \"Copies\" in Generative AI Models",
    // venue: "ICML 2026 Workshop on The Impact of Memorization on Trustworthy Foundation Models",
    venue: "Berkeley Technology Law Journal",
    year: 2026, type: "journal", honors: [], selected: true,
    links: [
      { label: "pdf", url: "/paper/lemley2026copies.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2607.14532" },
      { label: "ssrn", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7067878" },
      { label: "bibtex", url: "/paper/lemley2026copies.txt" },
    ],
  },
  {
    authors: "Miles Brundage, Noemi Dreksler, Aidan Homewood, Sean McGregor, Patricia Paskov, Conrad Stosz, Girish Sastry, A. Feder Cooper, George Balston, Steven Adler, Stephen Casper, Markus Anderljung, Grace Werner, Soren Mindermann, Vasilios Mavroudis, Ben Bucknall, Charlotte Stix, Jonas Freund, Lorenzo Pacchiardi, Jose Hernandez-Orallo, Matteo Pistillo, Michael Chen, Chris Painter, Dean W. Ball, Cullen O'Keefe, Gabriel Weil, Ben Harack, Graeme Finley, Ryan Hassan, Scott Emmons, Charles Foster, Anka Reuel, Bri Treece, Yoshua Bengio, Daniel Reti, Rishi Bommasani, Cristian Trout, Ali Shahin Shamsabadi, Rajiv Dattani, Adrian Weller, Robert Trager, Jaime Sevilla, Lauren Wagner, Lisa Soder, Ketan Ramakrishnan, Henry Papadatos, Malcolm Murray, and Ryan Tovcimak",
    title: "Frontier AI Auditing: Toward Rigorous Third-Party Assessment of Safety and Security Practices at Leading AI Companies",
    venue: "", year: 2026, type: "whitepaper", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/brundage2026audits.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2601.11699" },
      { label: "bibtex", url: "/paper/brundage2026audits.txt" },
    ],
  },
  {
    authors: "Ahmed Ahmed*, A. Feder Cooper*, Sanmi Koyejo, and Percy Liang",
    title: "Extracting books from production language models",
    venue: "", year: 2026, type: "preprint", honors: [], selected: true,
    links: [
      { label: "pdf", url: "/paper/cooper2026productionbooks.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2601.02671" },
      { label: "ssrn", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6050534" },
      { label: "bibtex", url: "/paper/cooper2026productionbooks.txt" },
    ],
  },
  {
    authors: "Jamie Hayes*, Ilia Shumailov, Christopher A. Choquette-Choo, Matthew Jagielski, George Kaissis, Milad Nasr, Sahra Ghalebikesabi, Meenatchi Sundaram Mutu Selva Annamalai, Niloofar Mireshghallah, Igor Shilov, Matthieu Meeus, Yves-Alexandre de Montjoye, Katherine Lee, Franziska Boenisch, Adam Dziedzic, and A. Feder Cooper*",
    title: "Exploring the limits of strong membership inference attacks on large language models",
    venue: "NeurIPS 2025", year: 2025, type: "conference", honors: [], selected: true,
    links: [
      { label: "pdf", url: "/paper/hayes2025strongmia.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2505.18773" },
      { label: "bibtex", url: "/paper/hayes2025strongmia.txt" },
    ],
  },
  {
    authors: "Nikhil Kandpal*, Brian Lester*, Colin Raffel*, Sebastian Majstorovic, Stella Biderman, Baber Abbasi, Luca Soldaini, Enrico Shippole, A. Feder Cooper, Aviya Skowron, John Kirchenbauer, Shayne Longpre, Lintang Sutawika, Alon Albalak, Zhenlin Xu, Guilherme Penedo, Loubna Ben Allal, Elie Bakouch, John David Pressman, Honglu Fan, Dashiell Stander, Guangyu Song, Aaron Gokaslan, Tom Goldstein, Brian R. Bartoldson, Bhavya Kailkhura, and Tyler Murray",
    title: "The Common Pile v0.1: An 8TB Dataset of Public Domain and Openly Licensed Text",
    venue: "NeurIPS 2025", year: 2025, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/kandpal2025commonpile.pdf" },
      { label: "arxiv", url: "https://www.arxiv.org/abs/2506.05209" },
      { label: "bibtex", url: "/paper/kandpal2025commonpile.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper*, Christopher A. Choquette-Choo*, Miranda Bogen*, Kevin Klyman*, Matthew Jagielski*, Katja Filippova*, Ken Ziyu Liu*, Alexandra Chouldechova, Jamie Hayes, Yangsibo Huang, Eleni Triantafillou, Peter Kairouz, Nicole Mitchell, Niloofar Mireshghallah, Abigail Z. Jacobs, James Grimmelmann, Vitaly Shmatikov, Christopher De Sa, Ilia Shumailov, Andreas Terzis, Solon Barocas, Jennifer Wortman Vaughan, danah boyd, Yejin Choi, Sanmi Koyejo, Fernando Delgado, Percy Liang, Daniel E. Ho, Pamela Samuelson, Miles Brundage, David Bau, Seth Neel, Hanna Wallach, Amy B. Cyphert, Mark A. Lemley, Nicolas Papernot, and Katherine Lee*",
    title: "Machine Unlearning Doesn't Do What You Think: Lessons for Generative AI Policy and Research",
    venue: "NeurIPS 2025", written: 2024, year: 2025, type: "conference", honors: ["Oral"], selected: true,
    links: [
      { label: "pdf", url: "/paper/cooper2024unlearning.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2412.06966" },
      { label: "ssrn", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5060253" },
      { label: "bibtex", url: "/paper/cooper2024unlearning.txt" },
    ],
  },
  {
    authors: "Alexandra Chouldechova*, A. Feder Cooper*, Solon Barocas, Abhinav Palia, Dan Vann, and Hanna Wallach",
    title: "Comparison requires valid measurement: Rethinking attack success rate comparisons in AI red teaming",
    venue: "NeurIPS 2025", year: 2025, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/chouldechova2025asr.pdf" },
      { label: "bibtex", url: "/paper/chouldechova2025asr.txt" },
    ],
  },
  {
    authors: "Hanna Wallach, Meera Desai, A. Feder Cooper, Angelina Wang, Solon Barocas, Alexandra Chouldechova, Chad Atalla, Su Lin Blodgett, Emily Corvi, P. Alexander Dow, Jean Garcia-Gathright, Alexandra Olteanu, Nicholas J. Pangakis, Stefanie Reed, Emily Shang, Dan Vann, Jenn Wortman Vaughan, Matthew Vogel, Hannah Washington, and Abigail Z. Jacobs",
    title: "Position: Evaluating Generative AI Systems is a Social Science Measurement Challenge",
    venue: "ICML 2025", year: 2025, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/wallach2025measurement.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2502.00561" },
      { label: "bibtex", url: "/paper/wallach2025measurement.txt" },
    ],
  },
  {
    authors: "Jamie Hayes*, Marika Swanberg, Harsh Chaudhari, Itay Yona, Ilia Shumailov, Milad Nasr, Christopher A. Choquette-Choo, Katherine Lee, and A. Feder Cooper*",
    title: "Measuring memorization in language models via probabilistic extraction",
    venue: "NAACL 2025", year: 2025, type: "conference", honors: [], selected: true,
    links: [
      { label: "pdf", url: "/paper/hayes2024npextraction.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2410.19482" },
      { label: "proceedings", url: "https://aclanthology.org/2025.naacl-long.469/" },
      { label: "talk", url: "https://drive.google.com/file/d/1_6KHAWLG8stgLrT-_Y9hrjNexBiIon6Y/view" },
      { label: "bibtex", url: "/paper/hayes2024npextraction.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper* and James Grimmelmann*",
    title: "The Files are in the Computer: On Copyright, Memorization, and Generative AI",
    venue: "Chicago-Kent Law Review 2025", volume: "Vol. 100", written: 2024, year: 2025, type: "journal", honors: [], selected: true,
    links: [
      { label: "pdf", url: "/paper/cooper2024files-1.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2404.12590" },
      { label: "ssrn", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4803118" },
      { label: "journal", url: "https://scholarship.kentlaw.iit.edu/cklawreview/vol100/iss1/9/" },
      { label: "bibtex", url: "/paper/cooper2024files.txt" },
    ],
  },
  {
    authors: "Katherine Lee*, A. Feder Cooper*, and James Grimmelmann*",
    title: "Talkin' 'Bout AI Generation: Copyright and the Generative-AI Supply Chain",
    venue: "Journal of the Copyright Society 2025", volume: "Vol. 72", written: 2023, year: 2025, type: "journal", honors: [], selected: true,
    links: [
      { label: "pdf", url: "/paper/lee2023talkin.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2309.08133" },
      { label: "ssrn", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4523551" },
      { label: "journal", url: "https://copyrightsociety.org/journal-entries/talkin-bout-ai-generation-copyright-and-the-generative-ai-supply-chain/" },
      { label: "bibtex", url: "/paper/lee2023talkin.txt" },
    ],
  },
  {
    authors: "Milad Nasr*, Javier Rando*, Nicholas Carlini*, Jonathan Hayase, Matthew Jagielski, A. Feder Cooper, Daphne Ippolito, Christopher A. Choquette-Choo, Florian Tramèr, and Katherine Lee",
    title: "Scalable Extraction of Training Data from Aligned, Production Language Models",
    venue: "ICLR 2025", year: 2025, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/nasr2025extracting.pdf" },
      { label: "openreview", url: "https://openreview.net/forum?id=vjel3nWP2a" },
      { label: "bibtex", url: "/paper/nasr2025extracting.txt" },
    ],
  },
  {
    authors: "Hanna Wallach, Meera Desai, Nicholas J. Pangakis, A. Feder Cooper, Angelina Wang, Solon Barocas, Alexandra Chouldechova, Chad Atalla, Su Lin Blodgett, Emily Corvi, P. Alexander Dow, Jean Garcia-Gathright, Alexandra Olteanu, Stefanie Reed, Emily Shang, Dan Vann, Jenn Wortman Vaughan, Matthew Vogel, Hannah Washington, and Abigail Z. Jacobs",
    title: "Evaluating Generative AI Systems is a Social Science Measurement Challenge",
    venue: "Workshop on Evaluating Evaluations at NeurIPS 2024", year: 2024, type: "workshop", honors: ["Oral"], selected: false,
    links: [
      { label: "pdf", url: "/paper/wallach2024measurement.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2411.10939" },
      { label: "bibtex", url: "/paper/wallach2024measurement.txt" },
    ],
  },
  {
    authors: "Alexandra Chouldechova, Chad Atalla, Solon Barocas, A. Feder Cooper, Emily Corvi, P. Alex Dow, Jean Garcia-Gathright, Nicholas J. Pangakis, Stefanie Reed, Emily Sheng, Dan Vann, Matthew Vogel, Hannah Washington, and Hanna Wallach",
    title: "A Shared Standard for Valid Measurement of Generative AI Systems' Capabilities, Risks, and Impacts",
    venue: "Statistical Frontiers in LLMs and Foundation Models at NeurIPS 2024", year: 2024, type: "workshop", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/chouldechova2024measurement.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2412.01934" },
      { label: "bibtex", url: "/paper/chouldechova2024measurement.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper",
    title: "Between Randomness and Arbitrariness: Some Lessons for Reliable Machine Learning at Scale",
    venue: "Ph.D. Dissertation, Cornell University", year: 2024, type: "thesis", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2024diss.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2406.09548" },
      { label: "ssrn", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4922875" },
      { label: "proquest", url: "https://www.proquest.com/openview/afc7b3cf2516e758c92e6c099fa4ad6d/1?pq-origsite=gscholar&cbl=18750&diss=y" },
      { label: "bibtex", url: "/paper/cooper2024diss.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper",
    title: "Between Randomness and Arbitrariness: Some Lessons for Reliable Machine Learning at Scale (The Short Version)",
    venue: "", year: 2024, type: "blog", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2024shortdiss.pdf" },
      { label: "ssrn", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4860005" },
      { label: "bibtex", url: "/paper/cooper2024shortdiss.txt" },
    ],
  },
  {
    authors: "Nicholas Carlini, Daniel Paleka, Krishnamurthy Dj Dvijotham, Thomas Steinke, Jonathan Hayase, A. Feder Cooper, Katherine Lee, Matthew Jagielski, Milad Nasr, Arthur Conmy, Eric Wallace, David Rolnick, and Florian Tramèr",
    title: "Stealing Part of a Production Language Model",
    venue: "ICML 2024", year: 2024, type: "conference", honors: ["Best Paper Award"], selected: true,
    links: [
      { label: "pdf", url: "/paper/carlini2024extracting.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2403.06634" },
      { label: "proceedings", url: "https://openreview.net/forum?id=VE3yWXt3KB" },
      { label: "bibtex", url: "/paper/carlini2024extracting.txt" },
    ],
  },
  {
    authors: "Daniel McDuff, Tim Korjakow, Scott Cambo, Jesse Josua Benjamin, Jenny Lee, Yacine Jernite, Carlos Muñoz Ferrandis, Aaron Gokaslan, Alek Tarkowski, Joseph Lindley, A. Feder Cooper, and Danish Contractor",
    title: "On the Standardization of Behavioral Use Clauses and Their Adoption for Responsible Licensing of AI",
    venue: "ICML 2024", year: 2024, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/mcduff2024license.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2402.05979" },
      { label: "proceedings", url: "https://openreview.net/forum?id=ju7RF0TnBr" },
      { label: "bibtex", url: "/paper/mcduff2024license.txt" },
    ],
  },
  {
    authors: "Aaron Gokaslan, A. Feder Cooper, Jasmine Collins, Landan Seguin, Austin Jacobson, Mihir Patel, Jonathan Frankle, Cory Stephenson, and Volodymyr Kuleshov",
    title: "CommonCanvas: Open Diffusion Models Trained on Creative-Commons Images",
    venue: "CVPR 2024", year: 2024, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/gokaslan2024commoncanvas.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2310.16825" },
      { label: "proceedings", url: "https://openaccess.thecvf.com/content/CVPR2024/html/Gokaslan_CommonCanvas_Open_Diffusion_Models_Trained_on_Creative-Commons_Images_CVPR_2024_paper.html" },
      { label: "bibtex", url: "/paper/gokaslan2024commoncanvas.txt" },
    ],
  },
  {
    authors: "Katherine Lee*, A. Feder Cooper*, and James Grimmelmann*",
    title: "Talkin' 'Bout AI Generation: Copyright and the Generative-AI Supply Chain (The Short Version)",
    venue: "ACM CSLAW 2024", year: 2024, type: "conference", honors: ["Long Presentation"], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2024talkincslaw.pdf" },
      { label: "ssrn", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4762060" },
      { label: "proceedings", url: "https://dl.acm.org/doi/abs/10.1145/3614407.3643696" },
      { label: "bibtex", url: "/paper/cooper2024talkincslaw.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper, Katherine Lee, Madiha Zahrah Choksi, Solon Barocas, Christopher De Sa, James Grimmelmann, Jon Kleinberg, Siddhartha Sen, and Baobao Zhang",
    title: "Arbitrariness and Social Prediction: The Confounding Role of Variance in Fair Classification",
    venue: "AAAI 2024", written: 2022, year: 2024, type: "conference", honors: ["Best Student Paper Honorable Mention"], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2023variance.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2301.11562" },
      { label: "proceedings", url: "https://ojs.aaai.org/index.php/AAAI/article/view/30203" },
      { label: "bibtex", url: "/paper/cooper2023variance.txt" },
    ],
  },
  {
    authors: "Milad Nasr*, Nicholas Carlini*, Jonathan Hayase, Matthew Jagielski, A. Feder Cooper, Daphne Ippolito, Christopher A. Choquette-Choo, Eric Wallace, Florian Tramèr, and Katherine Lee",
    title: "Scalable Extraction of Training Data from (Production) Language Models",
    venue: "", year: 2023, type: "techreport", honors: [], selected: true,
    links: [
      { label: "pdf", url: "/paper/nasr2023extracting.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2311.17035" },
      { label: "bibtex", url: "/paper/nasr2023extracting.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper*, Wentao Guo*, Khiem Pham*, Tiancheng Yuan, Charlie F. Ruan, Yucheng Lu, and Christopher De Sa",
    title: "Coordinating Distributed Example Orders for Provably Accelerated Training",
    venue: "NeurIPS 2023", year: 2023, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2023cdgrab.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2302.00845" },
      { label: "proceedings", url: "https://openreview.net/forum?id=ISRyILhAyS" },
      { label: "bibtex", url: "/paper/cooper2023cdgrab.txt" },
    ],
  },
  {
    authors: "Kweku Kwegyir-Aggrey, A. Feder Cooper, Jessica Dai, John Dickerson, Keegan Hines, and Suresh Venkatasubramanian",
    title: "Repairing Regressors for Fair Classification at Any Decision Threshold",
    venue: "Algorithmic Fairness through the Lens of Time Workshop at NeurIPS 2023", year: 2023, type: "workshop", honors: ["Oral"], selected: false,
    links: [
      { label: "pdf", url: "/paper/aggrey2023repair.pdf" },
      { label: "bibtex", url: "/paper/aggrey2023repair.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper*, Katherine Lee*, James Grimmelmann*, Daphne Ippolito*, Christopher Callison-Burch, Christopher A. Choquette-Choo, Niloofar Mireshghallah, Miles Brundage, David Mimno, Madiha Zahrah Choksi, Jack M. Balkin, Nicholas Carlini, Christopher De Sa, Jonathan Frankle, Deep Ganguli, Bryant Gipson, Andres Guadamuz, Swee Leng Harris, Abigail Z. Jacobs, Elizabeth Joh, Gautam Kamath, Mark Lemley, Cass Matthews, Christine McLeavey, Corynne McSherry, Milad Nasr, Paul Ohm, Adam Roberts, Tom Rubin, Pamela Samuelson, Ludwig Schubert, Kristen Vaccaro, Luis Villa, Felix Wu, and Elana Zeide",
    title: "Report of the 1st Workshop on Generative AI and Law",
    venue: "", year: 2023, type: "techreport", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2023report.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2311.06477" },
      { label: "bibtex", url: "/paper/cooper2023report.txt" },
    ],
  },
  {
    authors: "Katherine Lee*, A. Feder Cooper*, James Grimmelmann, and Daphne Ippolito",
    title: "AI and Law: The Next Generation (An explainer series)",
    venue: "", year: 2023, type: "blog", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/lee2023explainers.pdf" },
      { label: "ssrn", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4580739" },
      { label: "bibtex", url: "/paper/lee2023explainers.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper, Katherine Lee, Madiha Choksi, Solon Barocas, Christopher De Sa, James Grimmelmann, Jon Kleinberg, Siddhartha Sen, and Baobao Zhang",
    title: "Distribution Justice: Variance, Uncertainty, and Rules in Machine Learning and Law",
    venue: "Data (Re)Makes the World Conference (ISP at Yale Law School); Privacy Law Scholars Conference", year: 2023, type: "workshop", honors: [], selected: false,
    links: [],
  },
  {
    authors: "A. Feder Cooper, Jonathan Frankle, and Christopher De Sa",
    title: "Non-Determinism and the Lawlessness of Machine Learning Code",
    venue: "CSLAW 2022", year: 2022, type: "conference", honors: ["Long Presentation"], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2022lawless.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2206.11834" },
      { label: "bibtex", url: "/paper/cooper2022lawless.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper and Karen Levy",
    title: "Fast or Accurate? Governing Conflicting Goals in Highly Autonomous Vehicles",
    venue: "Colorado Technology Law Journal 2022", volume: "Vol. 20", year: 2022, type: "journal", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2022fast.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2208.02056" },
      { label: "ssrn", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4180473" },
      { label: "bibtex", url: "/paper/cooper2022fast.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper*, Emanuel Moss*, Benjamin Laufer, and Helen Nissenbaum",
    title: "Accountability in an Algorithmic Society: Relationality, Responsibility, and Robustness in Machine Learning",
    venue: "FAccT 2022", year: 2022, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2022accountability.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2202.05338" },
      { label: "proceedings", url: "https://dl.acm.org/doi/abs/10.1145/3531146.3533150" },
      { label: "bibtex", url: "/paper/cooper2022accountability.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper and Gili Vidan",
    title: "Making the Unaccountable Internet: The Changing Meaning of Accounting in the Early ARPANET",
    venue: "FAccT 2022", year: 2022, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2022arpa.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2201.11884" },
      { label: "proceedings", url: "https://dl.acm.org/doi/10.1145/3531146.3533137" },
      { label: "bibtex", url: "/paper/cooper2022arpa.txt" },
    ],
  },
  {
    authors: "Benjamin Laufer, Sameer Jain*, A. Feder Cooper*, Jon Kleinberg, and Hoda Heidari",
    title: "Four Years of FAccT: A Reflexive, Mixed-Methods Analysis of Research Contributions, Shortcomings, and Future Prospects",
    venue: "FAccT 2022", year: 2022, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/laufer2022fouryears.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2206.06738" },
      { label: "proceedings", url: "https://dl.acm.org/doi/10.1145/3531146.3533107" },
      { label: "bibtex", url: "/paper/laufer2022fouryears.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper, Solon Barocas, Karen Levy, and Gili Vidan",
    title: "'We have met the enemy and it is us': Debating the ethics of computing in the pages of CACM",
    venue: "SIGCIS 2022", year: 2022, type: "workshop", honors: [], selected: false,
    links: [],
  },
  {
    authors: "A. Feder Cooper, Yucheng Lu, Jessica Zosa Forde, and Christopher De Sa",
    title: "Hyperparameter Optimization Is Deceiving Us, and How to Stop It",
    venue: "NeurIPS 2021", year: 2021, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2021deception.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2102.03034" },
      { label: "proceedings", url: "https://proceedings.neurips.cc/paper/2021/hash/17fafe5f6ce2f1904eb09d2e80a4cbf6-Abstract.html" },
      { label: "bibtex", url: "/paper/cooper2021deception.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper, Maria Antoniak, Christopher De Sa, Marilyn Migiel, and David Mimno",
    title: "'Tecnologica cosa': Modeling Storyteller Personalities in Boccaccio's Decameron",
    venue: "SIGHUM Workshop at EMNLP 2021", year: 2021, type: "workshop", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2021tecnologica.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2109.10506" },
      { label: "proceedings", url: "https://aclanthology.org/2021.latechclfl-1.17/" },
      { label: "bibtex", url: "/paper/cooper2021tecnologica.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper, Karen Levy, and Christopher De Sa",
    title: "Accuracy-Efficiency Trade-Offs and Accountability in Distributed ML Systems",
    venue: "EAAMO 2021", year: 2021, type: "conference", honors: ["Oral"], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2021eaamo.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2007.02203" },
      { label: "proceedings", url: "https://dl.acm.org/doi/10.1145/3465416.3483289" },
      { label: "bibtex", url: "/paper/cooper2021eaamo.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper and Ellen Abrams",
    title: "Emergent Unfairness in Algorithmic Fairness-Accuracy Trade-Off Research",
    venue: "AIES 2021", year: 2021, type: "conference", honors: ["Oral"], selected: false,
    links: [
      { label: "pdf", url: "/paper/cooper2021emergent.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2102.01203" },
      { label: "proceedings", url: "https://dl.acm.org/doi/10.1145/3461702.3462519" },
      { label: "bibtex", url: "/paper/cooper2021emergent.txt" },
    ],
  },
  {
    authors: "Jessica Zosa Forde*, A. Feder Cooper*, Kweku Kwegyir-Aggrey, Christopher De Sa, and Michael Littman",
    title: "Model Selection's Disparate Impact in Real-World Deep Learning Applications",
    venue: "Science of Deep Learning Workshop at ICLR 2021", year: 2021, type: "workshop", honors: ["Oral"], selected: false,
    links: [
      { label: "pdf", url: "/paper/forde2021model.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2104.00606" },
      { label: "bibtex", url: "/paper/forde2021model.txt" },
    ],
  },
  {
    authors: "Ruqi Zhang*, A. Feder Cooper*, and Christopher De Sa",
    title: "Asymptotically Optimal Exact Minibatch Metropolis-Hastings",
    venue: "NeurIPS 2020", year: 2020, type: "conference", honors: ["Spotlight"], selected: false,
    links: [
      { label: "pdf", url: "/paper/zhang2020tunamh.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2006.11677" },
      { label: "proceedings", url: "https://papers.nips.cc/paper_files/paper/2020/hash/e2a7555f7cabd6e31aef45cb8cda4999-Abstract.html" },
      { label: "bibtex", url: "/paper/zhang2020tunamh.txt" },
    ],
  },
  {
    authors: "Ruqi Zhang, A. Feder Cooper, and Christopher De Sa",
    title: "AMAGOLD: Amortized Metropolis Adjustment for Efficient Stochastic Gradient MCMC",
    venue: "AISTATS 2020", year: 2020, type: "conference", honors: [], selected: false,
    links: [
      { label: "pdf", url: "/paper/zhang2020amagold.pdf" },
      { label: "arxiv", url: "https://arxiv.org/abs/2003.00193" },
      { label: "proceedings", url: "https://proceedings.mlr.press/v108/zhang20e.html" },
      { label: "bibtex", url: "/paper/zhang2020amagold.txt" },
    ],
  },
  {
    authors: "A. Feder Cooper",
    title: "Imperfection is the Norm: A Computer Systems Perspective on IoT and Enforcement",
    venue: "(Im)Perfect Enforcement Conference (ISP at Yale Law School)", year: 2019, type: "workshop", honors: ["Plenary Session"], selected: false,
    links: [],
  },
];

/* =========================================================================
   Project pages — interactive companion sites I've built for some papers.
   Single source of truth for the "Project pages" section on the homepage.
   Fields:
     title : string. The project / site name.
     desc  : string. One-line description of what the site offers.
     paper : string. The associated paper / venue (shown as a caption).
     url   : string. External site URL.
     img   : optional. A single thumbnail image (theme-agnostic).
     imgLight / imgDark : optional. A theme-swapped thumbnail pair; the one
             matching the active theme is shown. Use instead of `img`.
     imgAlt : optional. Alt text for the thumbnail.
   ========================================================================= */

const PROJECTS = [
  {
    title: "Extracting memorized pieces of (copyrighted) books from open-weight language models",
    desc: "",
    paper: "COLM 2026",
    url: "https://books-memorization.github.io/",
    imgLight: "/img/projects/books-llama-light.png",
    imgDark: "/img/projects/books-llama-dark.png",
    imgAlt: "Book-memorization project mascot",
  },
  {
    title: "Extractable Memorization From First Principles",
    desc: "An intuitive explanation for the paper's use of \"matched comparisons\" to rigorously measure when generation can be claimed to be extraction.",
    paper: "Preprint · 2026",
    url: "https://monkey-emeritus.github.io/",
    img: "/img/projects/first-principles-glyph.png",
    imgAlt: "Extractable Memorization From First Principles glyph",
  },
];
