import { Doubt, Reply, SubjectType, AcademicLevel } from '../types';

interface SeedDoubtTemplate {
  title: string;
  description: string;
  subject: SubjectType;
  grade: AcademicLevel;
  tags: string[];
  authorName: string;
  authorAvatar: string;
  institution: string;
  createdAt: string;
  upvotes: number;
  views: number;
  isSolved: boolean;
  replies: Reply[];
}

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
];

const UK_INSTITUTIONS = [
  'University of Cambridge',
  'University of Oxford',
  'Imperial College London',
  'University College London (UCL)',
  'University of Edinburgh',
  'King’s College London',
  'University of Manchester',
  'University of Bristol',
  'University of Warwick',
  'Westminster Sixth Form',
  'Eton College Scholars',
  'Manchester Grammar School',
  'Brampton Manor Academy',
  'Cardiff Sixth Form College',
  'St Paul’s School London',
];

const CURATED_PRIMARY_DOUBTS: SeedDoubtTemplate[] = [
  {
    title: 'Pure Mathematics: Rigorous proof of the Divergence of the Harmonic Series using Cauchy Condensation vs Integral Test',
    description: 'I am currently revising real analysis for my first-year undergraduate mathematics Tripos. While Oresme’s grouping method (grouping into powers of 2) provides an intuitive geometric demonstration that ∑(1/n) diverges, I am struggling to formulate the formal epsilon-N verification via Cauchy condensation test. How do we rigorously demonstrate that 2^k * a_{2^k} does not tend to zero as k approaches infinity?',
    subject: 'Mathematics',
    grade: 'Undergraduate (BSc/BA)',
    tags: ['calculus', 'real-analysis', 'infinite-series', 'proofs'],
    authorName: 'Alistair MacLeod',
    authorAvatar: AVATARS[1],
    institution: 'University of Cambridge',
    createdAt: '18 minutes ago',
    upvotes: 42,
    views: 310,
    isSolved: true,
    replies: [
      {
        id: 'rep-m-1',
        authorName: 'Eleanor Vance',
        authorGrade: 'Undergraduate (BSc/BA)',
        authorAvatar: AVATARS[2],
        institution: 'Imperial College London',
        content: `Hi Alistair,\n\nThe Cauchy Condensation Test states that for a non-negative, monotonically decreasing sequence a_n:\n∑_{n=1}^∞ a_n converges if and only if ∑_{k=0}^∞ 2^k * a_{2^k} converges.\n\nLet a_n = 1/n. Because n + 1 > n, 1/(n + 1) < 1/n, so a_n is strictly monotonically decreasing and positive for all n ≥ 1.\n\nNow consider the condensed general term:\nb_k = 2^k * a_{2^k} = 2^k * (1 / 2^k) = 1.\n\nHence, the condensed series is simply:\n∑_{k=0}^∞ b_k = ∑_{k=0}^∞ 1 = 1 + 1 + 1 + ...\n\nBy the nth-term test for divergence, if lim_{k→∞} b_k ≠ 0 (here lim b_k = 1 ≠ 0), the series diverges unconditionally. Because the condensed series diverges to infinity, the original harmonic series ∑_{n=1}^∞ (1/n) must also diverge.\n\nQ.E.D. This satisfies the formal criteria required in Cambridge analysis papers!`,
        createdAt: '12 minutes ago',
        upvotes: 38,
        isSolution: true,
      },
      {
        id: 'rep-m-2',
        authorName: 'Julian Sterling',
        authorGrade: 'Postgraduate & Research',
        authorAvatar: AVATARS[3],
        institution: 'University of Oxford',
        content: 'You can also note that the partial sums s_{2^k} ≥ 1 + k/2. Taking k > 2(M - 1) demonstrates that for any chosen bound M > 0, there exists N = 2^k such that s_N > M, fulfilling the Archimedean property without ambiguity.',
        createdAt: '8 minutes ago',
        upvotes: 14,
        isSolution: false,
      },
    ],
  },
  {
    title: 'A-Level Chemistry: Why is the enthalpy of hydration for magnesium ion significantly more exothermic than calcium ion?',
    description: 'In OCR A-Level Chemistry Module 5 (Physical Chemistry & Transition Elements), both Mg²⁺ and Ca²⁺ carry identical 2+ ionic charges. However, standard tables state that ΔH_hyd of Mg²⁺ is -1926 kJ/mol whereas Ca²⁺ is only -1577 kJ/mol. Could someone explain the electrostatics and hydration shell enthalpy differences clearly?',
    subject: 'Chemistry',
    grade: 'A-Levels (Year 12-13)',
    tags: ['thermodynamics', 'hydration-enthalpy', 'lattice-energy', 'ocr'],
    authorName: 'Charlotte Wright',
    authorAvatar: AVATARS[0],
    institution: 'Brampton Manor Academy',
    createdAt: '42 minutes ago',
    upvotes: 29,
    views: 245,
    isSolved: true,
    replies: [
      {
        id: 'rep-c-1',
        authorName: 'Dr. Arthur Pendelton',
        authorGrade: 'Undergraduate (BSc/BA)',
        authorAvatar: AVATARS[4],
        institution: 'University of Bristol',
        content: `Spot on query, Charlotte! This is a favourite 4-mark question in both AQA and OCR papers.\n\n1. **Charge Density Ratio**: Both ions possess a +2 formal charge, but Mg²⁺ has an electron configuration of 1s² 2s² 2p⁶ (ionic radius ~72 pm), whereas Ca²⁺ has an extra filled shell (radius ~100 pm).\n\n2. **Electrostatic Attraction**: Coulomb’s Law dictates that electrostatic attraction is proportional to (q₁ * q₂) / r². Because the radius of Mg²⁺ is much smaller, it exhibits a substantially higher surface charge density.\n\n3. **Dipole Interaction**: The smaller magnesium cation polarises and attracts the lone pairs on the electronegative oxygen atoms in surrounding water molecules far more strongly. \n\nStronger ion-dipole bonds formed release more heat energy, translating to a considerably more exothermic (negative) enthalpy of hydration. Always explicitly cite "higher charge density" and "closer approach of water dipoles" in your exam script!`,
        createdAt: '30 minutes ago',
        upvotes: 35,
        isSolution: true,
      },
    ],
  },
  {
    title: 'Physics Mechanics: Resolving forces in banked circular tracks without friction vs with coefficient μ',
    description: 'When a sports car navigates a curved bend banked at angle θ with speed v, without friction the normal reaction N provides the centripetal force: N sinθ = (m v²)/r and N cosθ = mg, so tanθ = v²/(rg). But when static friction μ is present, how do we determine the maximum safe velocity before slipping outwards up the incline?',
    subject: 'Physics',
    grade: 'A-Levels (Year 12-13)',
    tags: ['circular-motion', 'mechanics', 'centripetal-force', 'friction'],
    authorName: 'Callum Campbell',
    authorAvatar: AVATARS[5],
    institution: 'Westminster Sixth Form',
    createdAt: '1 hour ago',
    upvotes: 33,
    views: 290,
    isSolved: true,
    replies: [
      {
        id: 'rep-p-1',
        authorName: 'Harrison Cole',
        authorGrade: 'Undergraduate (BSc/BA)',
        authorAvatar: AVATARS[7],
        institution: 'University of Manchester',
        content: `Brilliant mechanics question Callum! At the verge of slipping *upwards*, the friction force f = μN acts **downwards parallel to the inclined plane**.\n\nLet us resolve forces horizontally and vertically:\n\n1. **Vertical Equilibrium (no acceleration along y)**:\nN cosθ - f sinθ - mg = 0\nN cosθ - (μN) sinθ = mg\n=> N(cosθ - μ sinθ) = mg   --- (Equation 1)\n\n2. **Horizontal Direction (centripetal acceleration toward centre)**:\nN sinθ + f cosθ = m v_max² / r\nN(sinθ + μ cosθ) = m v_max² / r   --- (Equation 2)\n\n3. **Divide Eq 2 by Eq 1 to cancel N and m**:\nv_max² / (rg) = (sinθ + μ cosθ) / (cosθ - μ sinθ)\nDivide numerator and denominator by cosθ:\nv_max² / (rg) = (tanθ + μ) / (1 - μ tanθ)\n\nTherefore:\n**v_max = √[ r * g * (tanθ + μ) / (1 - μ tanθ) ]**\n\nNotice that if μ = 0, this collapses cleanly back to v = √(rg tanθ). Always draw the free-body diagram showing f parallel down the bank!`,
        createdAt: '48 minutes ago',
        upvotes: 41,
        isSolution: true,
      },
    ],
  },
  {
    title: 'Computer Science: Asymptotic bound comparison between Dijkstra with Binary Heap vs Fibonacci Heap in dense graphs',
    description: 'In my algorithms course we covered Dijkstra’s algorithm. With a binary heap, the time complexity is O((V + E) log V). With a Fibonacci heap, decreased-key takes amortised O(1), yielding O(E + V log V). Why is Fibonacci heap rarely utilised in practical production systems despite its theoretical superiority?',
    subject: 'Computer Science',
    grade: 'Undergraduate (BSc/BA)',
    tags: ['algorithms', 'graph-theory', 'data-structures', 'computational-complexity'],
    authorName: 'Benjamin Foster',
    authorAvatar: AVATARS[8],
    institution: 'University of Edinburgh',
    createdAt: '2 hours ago',
    upvotes: 56,
    views: 480,
    isSolved: true,
    replies: [
      {
        id: 'rep-cs-1',
        authorName: 'Poppy Clarke',
        authorGrade: 'Postgraduate & Research',
        authorAvatar: AVATARS[9],
        institution: 'UCL',
        content: `This is a classic disparity between asymptotic Big-O theory and hardware mechanical sympathy!\n\n1. **Constant Factor Overhead (C)**: The Big-O notation hides the constant factor. Fibonacci heaps require extensive pointer manipulation (doubly linked circular lists of child nodes, cascading cuts, marked nodes). Each step incurs multiple pointer dereferences.\n\n2. **CPU Cache Invalidation & Locality**: Modern CPUs rely heavily on L1/L2/L3 cache hierarchies. A standard 4-ary or binary heap is stored in a contiguous 1D array where sequential memory access prefetches cache lines effortlessly. Fibonacci heaps scatter node objects across the heap memory, causing frequent CPU cache misses.\n\n3. **Graph Density in Practice**: In most real-world graphs (road networks, internet topology), graphs are sparse where E ≈ O(V). In that case, (V + E) log V is practically identical to E + V log V, making the complex overhead of Fibonacci heaps entirely unjustified. 4-ary d-heaps routinely outperform both in real benchmarks!`,
        createdAt: '1 hour ago',
        upvotes: 52,
        isSolution: true,
      },
    ],
  },
  {
    title: 'Economics: Why does the Classical Long-Run Aggregate Supply (LRAS) curve stay vertical while Keynesian LRAS exhibits curvature?',
    description: 'In Edexcel Economics Theme 2 & 4, classical economists model LRAS as completely inelastic (vertical line at full employment Y_FE), arguing market forces naturally restore equilibrium via flexible wages. But why did Keynes argue that the economy could remain permanently settled below full employment in a liquidity trap?',
    subject: 'Economics',
    grade: 'A-Levels (Year 12-13)',
    tags: ['macroeconomics', 'monetary-policy', 'aggregate-supply', 'edexcel'],
    authorName: 'Freya Davies',
    authorAvatar: AVATARS[6],
    institution: 'Eton College Scholars',
    createdAt: '3 hours ago',
    upvotes: 27,
    views: 215,
    isSolved: true,
    replies: [
      {
        id: 'rep-e-1',
        authorName: 'Sebastian Ward',
        authorGrade: 'Undergraduate (BSc/BA)',
        authorAvatar: AVATARS[10],
        institution: 'London School of Economics (LSE)',
        content: `Great theoretical distinction, Freya!\n\nThe difference hinges on **Wage Rigidity (Sticky Wages)** and **Animal Spirits**:\n\n1. **Classical / Neo-Classical View**:\nAssumes perfect price and wage flexibility. If an economy slips into recession with unemployment, surplus labour forces nominal wages to fall downwards. Lower costs shift Short-Run AS outwards until real output returns to Y_FE. Hence, in the long run, output is determined solely by factors of production (capital, labour quality, technology), making LRAS vertical.\n\n2. **Keynesian View**:\nKeynes observed that wages are "sticky downwards" due to trade union agreements, minimum wage legislation, and moral contracts. Furthermore, in a deep recession, pessimistic business confidence ("animal spirits") means firms will not hire regardless of interest rates. When there is vast spare capacity, aggregate supply can expand without generating inflationary pressure (the flat horizontal portion of the Keynesian curve).\n\nOnly as bottlenecks emerge does the curve become inelastic. Hence government fiscal intervention (G) is required to shift AD rightwards!`,
        createdAt: '2 hours ago',
        upvotes: 31,
        isSolution: true,
      },
    ],
  },
  {
    title: 'Biology & Genetics: How does epigenetic DNA methylation differ from histone acetylation in controlling transcriptional activity?',
    description: 'We are studying eukaryotic gene expression in AQA Biology Chapter 8. Both processes alter chromatin architecture without modifying the underlying nucleotide sequence, but what are the exact chemical enzymes and mechanistic impacts on RNA polymerase accessibility?',
    subject: 'Biology',
    grade: 'A-Levels (Year 12-13)',
    tags: ['epigenetics', 'gene-regulation', 'molecular-biology', 'aqa'],
    authorName: 'George Watson',
    authorAvatar: AVATARS[11],
    institution: 'Cardiff Sixth Form College',
    createdAt: '3 hours ago',
    upvotes: 38,
    views: 310,
    isSolved: true,
    replies: [
      {
        id: 'rep-b-1',
        authorName: 'Hannah Bennett',
        authorGrade: 'Undergraduate (BSc/BA)',
        authorAvatar: AVATARS[12],
        institution: 'University of Oxford',
        content: `Hi George, here is the clear comparative breakdown for top marks:\n\n1. **DNA Methylation (Transcriptional Repression / Silencing)**:\n- **Target**: Addition of a methyl group (-CH₃) directly onto the carbon-5 of cytosine residues within CpG dinucleotide islands in gene promoter regions.\n- **Enzyme**: Catalysed by DNA methyltransferases (DNMTs).\n- **Mechanism**: The bulky hydrophobic methyl groups physically hinder the binding of basal transcription factors. Furthermore, methylated DNA recruits methyl-CpG-binding domain proteins (MBDs), which in turn recruit histone deacetylases (HDACs), cementing closed heterochromatin.\n\n2. **Histone Acetylation (Transcriptional Activation)**:\n- **Target**: Addition of acetyl groups (-COCH₃) to positively charged lysine residues on the N-terminal tails of histone proteins (H3 and H4).\n- **Enzyme**: Catalysed by Histone Acetyltransferases (HATs), reversed by Histone Deacetylases (HDACs).\n- **Mechanism**: Lysine tails carry positive charges that strongly bind negative phosphate backbones of DNA. Acetylation neutralises the positive charge, relaxing histone-DNA binding. The chromatin shifts from condensed heterochromatin to open euchromatin, granting RNA Polymerase II full access.\n\nMnemonic to remember: **Acetylation Activates (A-A), Methylation Mutes (M-M)**.`,
        createdAt: '2 hours ago',
        upvotes: 44,
        isSolution: true,
      },
    ],
  },
  {
    title: 'English Literature: The structural function of the Gravedigger scene (Act V, Scene 1) in Shakespeare’s Hamlet',
    description: 'In preparation for our Edexcel English Literature exam, I am analysing Hamlet. Why does Shakespeare position a seemingly comic prose debate between rustic clowns regarding Ophelia’s Christian burial immediately preceding the violent climax of the duel and carnage?',
    subject: 'English Literature',
    grade: 'A-Levels (Year 12-13)',
    tags: ['shakespeare', 'hamlet', 'tragedy', 'literary-criticism'],
    authorName: 'Olivia Clarke',
    authorAvatar: AVATARS[13],
    institution: 'St Paul’s School London',
    createdAt: '4 hours ago',
    upvotes: 24,
    views: 195,
    isSolved: true,
    replies: [
      {
        id: 'rep-lit-1',
        authorName: 'Edward Finch',
        authorGrade: 'Undergraduate (BSc/BA)',
        authorAvatar: AVATARS[14],
        institution: 'University of Cambridge',
        content: `An exquisite textual enquiry, Olivia. The Gravedigger scene serves three vital dramatic and thematic functions:\n\n1. **Democratic Leveller of Mortality (Memento Mori)**: Throughout the play, Hamlet is plagued by cerebral paralysis regarding death. In the graveyard, handling Yorick’s skull, he confronts physical decay without philosophical rhetoric. Death is shown to equalize kings ("Alexander died, Alexander was buried, Alexander returneth into dust") and beggars alike.\n\n2. **Linguistic Transition from Verse to Earthy Prose**: The clowns speak in colloquial, rhythmic prose full of malapropisms and legal parody (mocking the suicide inquest of Sir James Hales). This grounds the aristocratic tragedy in reality, creating profound dramatic irony before Hamlet discovers whose grave is being dug.\n\n3. **Comic Relief and Emotional Calibration**: Following Ophelia’s tragic lyrical drowning in Act IV, Shakespeare modulates the audience’s emotional tension. The comic reprieve prevents audience fatigue, heightening the emotional shock when Laertes and Hamlet leap into the open grave.`,
        createdAt: '3 hours ago',
        upvotes: 28,
        isSolution: true,
      },
    ],
  },
  {
    title: 'History & Philosophy: Did the Treaty of Versailles directly cause the collapse of the Weimar Republic, or was economic contagion pivotal?',
    description: 'I am writing my Cambridge Pre-U / A-Level coursework on 20th-century German history. Historians like A.J.P. Taylor emphasize structural flaws and the ‘stab-in-the-back’ myth from 1919, while Richard Evans underscores the hyper-reliance on short-term American Dawes loans collapsed by the 1929 Wall Street Crash. What is the modern consensus?',
    subject: 'History & Philosophy',
    grade: 'A-Levels (Year 12-13)',
    tags: ['weimar-republic', 'modern-history', 'historiography', 'interwar-europe'],
    authorName: 'Charles Montgomery',
    authorAvatar: AVATARS[3],
    institution: 'Manchester Grammar School',
    createdAt: '5 hours ago',
    upvotes: 31,
    views: 260,
    isSolved: false,
    replies: [
      {
        id: 'rep-h-1',
        authorName: 'Victoria Hastings',
        authorGrade: 'Postgraduate & Research',
        authorAvatar: AVATARS[2],
        institution: 'University of Oxford',
        content: `The modern historiographical synthesis (promoted by Richard Evans and Ian Kershaw) rejects monocausal determinism in favour of structural vulnerability exposed by catastrophic economic shock.\n\nVersailles generated the political illegitimacy (the 'Dolchstoßlegende' and Article 231 War Guilt clause) which alienated conservative elites, judiciary, and military from genuine republican allegiance. However, the 'Golden Twenties' under Stresemann proved the republic could stabilise under favourable economic conditions.\n\nThe fatal catalyst was the 1929 Great Depression: when American credits dried up, Heinrich Brüning's severe deflationary austerity policies shattered the social fabric, pushing desperate voters to extremes. Versailles provided the ideological ammunition, but the economic collapse pulled the trigger.`,
        createdAt: '4 hours ago',
        upvotes: 36,
        isSolution: true,
      },
    ],
  },
];

// Generate an expansive, realistic academic database of 85+ distinct, highly-curated doubts
const GENERATED_TOPICS: {
  subject: SubjectType;
  grade: AcademicLevel;
  title: string;
  desc: string;
  tags: string[];
  replyCount: number;
}[] = [
  // Mathematics
  {
    subject: 'Mathematics',
    grade: 'A-Levels (Year 12-13)',
    title: 'Integration by Parts: Handling looping integrals like ∫ e^(2x) cos(3x) dx without algebraic circularity',
    desc: 'When attempting integration by parts twice on ∫ e^(2x) cos(3x) dx, you obtain an expression containing the original integral again. Can someone demonstrate how to isolate I on one side algebraically without losing the constant of integration?',
    tags: ['calculus', 'integration', 'pure-maths', 'edexcel'],
    replyCount: 2,
  },
  {
    subject: 'Mathematics',
    grade: 'Undergraduate (BSc/BA)',
    title: 'Linear Algebra: Why must eigenspaces corresponding to distinct eigenvalues of a Hermitian matrix be strictly orthogonal?',
    desc: 'In quantum mechanics and spectral theory, Hermitian operators (self-adjoint matrices) possess purely real eigenvalues. How do we rigorously prove the inner product ⟨v1, v2⟩ = 0 for λ1 ≠ λ2?',
    tags: ['linear-algebra', 'matrices', 'eigenvalues', 'quantum-maths'],
    replyCount: 1,
  },
  {
    subject: 'Mathematics',
    grade: 'GCSE (Year 10-11)',
    title: 'Circle Theorems: Distinguishing between the Angle at the Centre theorem and Alternate Segment theorem',
    desc: 'I constantly mix up when to apply the alternate segment theorem versus angle in a cyclic quadrilateral in GCSE Higher Tier exams. Can someone provide an intuitive geometrical checklist?',
    tags: ['geometry', 'circle-theorems', 'gcse', 'edexcel-maths'],
    replyCount: 2,
  },
  {
    subject: 'Mathematics',
    grade: 'A-Levels (Year 12-13)',
    title: 'Further Maths: Derivation of the De Moivre’s Theorem for rational and negative integer powers',
    desc: 'We proved [cosθ + i sinθ]^n = cos(nθ) + i sin(nθ) for positive integers via induction. How is the expansion extended to negative integers n = -m and fractional powers n = p/q?',
    tags: ['complex-numbers', 'further-maths', 'de-moivre', 'trigonometry'],
    replyCount: 1,
  },
  {
    subject: 'Mathematics',
    grade: 'Undergraduate (BSc/BA)',
    title: 'Multivariable Calculus: When does the Clairaut’s Theorem on equality of mixed partial derivatives fail?',
    desc: 'We know that if partial derivatives are continuous in a neighbourhood, then f_xy = f_yx. What is the canonical counterexample where discontinuity at the origin breaks this commutativity?',
    tags: ['multivariable-calculus', 'analysis', 'partial-derivatives'],
    replyCount: 2,
  },
  {
    subject: 'Mathematics',
    grade: 'International Baccalaureate (IB)',
    title: 'IB Maths HL: Understanding Type I vs Type II errors in Poisson Hypothesis Testing',
    desc: 'In IB Analysis and Approaches HL, when setting critical regions for a Poisson distribution with parameter λ, how does increasing the significance level α impact the probability β of committing a Type II error?',
    tags: ['statistics', 'hypothesis-testing', 'poisson', 'ib-diploma'],
    replyCount: 1,
  },
  // Physics
  {
    subject: 'Physics',
    grade: 'A-Levels (Year 12-13)',
    title: 'Wave Optics: Why do thin films like soap bubbles exhibit colour fringes, and how does phase inversion upon reflection apply?',
    desc: 'In thin film interference, light reflects from both the top and bottom boundaries. When does light undergo a 180° (π radians) phase change, and why is this critical for the constructive interference path difference equation 2nt = (m + 1/2)λ?',
    tags: ['wave-optics', 'interference', 'phase-shift', 'physics-alevel'],
    replyCount: 2,
  },
  {
    subject: 'Physics',
    grade: 'Undergraduate (BSc/BA)',
    title: 'Special Relativity: Resolving the Twin Paradox without accelerating reference frame contradictions',
    desc: 'Both twins observe the other moving at velocity v, so time dilation is symmetric: dt = γ dt0. If velocity is relative, why does the travelling twin unambiguously return younger? How does the spacetime Minkowski interval explain the asymmetry?',
    tags: ['relativity', 'spacetime', 'minkowski', 'lorentz-transform'],
    replyCount: 2,
  },
  {
    subject: 'Physics',
    grade: 'GCSE (Year 10-11)',
    title: 'Electricity GCSE: Why does resistance increase in a filament lamp as potential difference rises?',
    desc: 'Ohm’s Law says V = IR, which suggests a straight line graph. Why is the I-V characteristic curve of a filament lamp non-linear with decreasing gradient at higher voltages?',
    tags: ['electricity', 'ohms-law', 'resistance', 'gcse-physics'],
    replyCount: 1,
  },
  {
    subject: 'Physics',
    grade: 'Undergraduate (BSc/BA)',
    title: 'Quantum Mechanics: Physical significance of the commutation relation [x, p] = iħ and its connection to Heisenberg uncertainty',
    desc: 'Why does the non-commutativity of position and momentum operators mathematically forbid simultaneous eigenbasis states in Hilbert space?',
    tags: ['quantum-mechanics', 'heisenberg', 'operators', 'hilbert-space'],
    replyCount: 2,
  },
  {
    subject: 'Physics',
    grade: 'A-Levels (Year 12-13)',
    title: 'Thermodynamics: Distinguishing between Adiabatic and Isothermal gas expansions in p-V indicator diagrams',
    desc: 'Why is the gradient of an adiabatic curve (pV^γ = constant) steeper than an isothermal curve (pV = constant) through the same coordinate point on a pressure-volume indicator diagram?',
    tags: ['thermodynamics', 'ideal-gas', 'adiabatic', 'heat-engines'],
    replyCount: 1,
  },
  // Chemistry
  {
    subject: 'Chemistry',
    grade: 'A-Levels (Year 12-13)',
    title: 'Organic Chemistry: Why do tertiary halogenoalkanes hydrolyse exclusively via SN1 while primary favour SN2?',
    desc: 'In haloalkane nucleophilic substitution, what steric hindrance and carbocation hyperconjugation effects govern whether the mechanism proceeds through a carbocation intermediate or a pentacoordinate transition state?',
    tags: ['organic-chemistry', 'mechanisms', 'sn1-sn2', 'carbocations'],
    replyCount: 2,
  },
  {
    subject: 'Chemistry',
    grade: 'Undergraduate (BSc/BA)',
    title: 'Coordination Chemistry: Crystal Field Splitting (Δoct) and why spectrochemical series places CN⁻ higher than Cl⁻',
    desc: 'Chloride is a negatively charged anion while carbon monoxide and cyanide are neutral or small. Why does crystal field theory fail to explain why neutral π-acceptor ligands cause significantly larger d-orbital splitting than halides?',
    tags: ['inorganic-chemistry', 'crystal-field-theory', 'transition-metals', 'ligands'],
    replyCount: 2,
  },
  {
    subject: 'Chemistry',
    grade: 'GCSE (Year 10-11)',
    title: 'Chemical Calculations: Step-by-step method to identify the Limiting Reactant in precipitation reactions',
    desc: 'When 10g of calcium carbonate reacts with 200cm³ of 0.5 mol/dm³ hydrochloric acid, which reactant is in excess and how do we calculate the mass of carbon dioxide evolved?',
    tags: ['moles', 'stoichiometry', 'limiting-reactant', 'gcse-chemistry'],
    replyCount: 1,
  },
  {
    subject: 'Chemistry',
    grade: 'A-Levels (Year 12-13)',
    title: 'Physical Chemistry: Calculating pH of a buffer solution composed of ethanoic acid and sodium ethanoate',
    desc: 'How do we derive the Henderson-Hasselbalch equation from Ka = [H+][A-]/[HA], and what assumptions are made regarding the dissociation of weak acid and ionization of salt?',
    tags: ['acid-base', 'buffer-solutions', 'equilibrium', 'aqa-chemistry'],
    replyCount: 2,
  },
  // Biology
  {
    subject: 'Biology',
    grade: 'A-Levels (Year 12-13)',
    title: 'Biochemistry: The Chemiosmotic Theory of ATP Synthesis in the inner mitochondrial cristae',
    desc: 'How does the electron transport chain create a proton motive force across the inner mitochondrial membrane, and how does the rotor stalk of ATP synthase catalyse phosphorylation of ADP?',
    tags: ['cellular-respiration', 'atp-synthase', 'biochemistry', 'ocr-biology'],
    replyCount: 2,
  },
  {
    subject: 'Biology',
    grade: 'Undergraduate (BSc/BA)',
    title: 'Neurobiology: The Hodgkin-Huxley model and the molecular basis of the refractory period in unmyelinated axons',
    desc: 'Why do voltage-gated Na+ channels possess both activation (m) and inactivation (h) gates, and why cannot an action potential propagate backwards along the axon?',
    tags: ['neuroscience', 'action-potential', 'ion-channels', 'physiology'],
    replyCount: 2,
  },
  {
    subject: 'Biology',
    grade: 'GCSE (Year 10-11)',
    title: 'Genetics GCSE: Drawing Punnett squares for co-dominant inheritance in ABO Blood Groups',
    desc: 'A mother has blood group A (genotype I^A I^O) and a father has blood group B (I^B I^O). What are the exact probabilities of having a child with blood group O versus AB?',
    tags: ['genetics', 'punnett-square', 'blood-groups', 'inheritance'],
    replyCount: 1,
  },
  {
    subject: 'Biology',
    grade: 'A-Levels (Year 12-13)',
    title: 'Immunology: How do cytotoxic T-lymphocytes (CD8+) differentiate infected host cells from healthy cells?',
    desc: 'In AQA Biology topic on immunity, what is the exact role of MHC Class I molecules in presenting viral peptides, and how do perforins and granzymes trigger programmed apoptosis?',
    tags: ['immunology', 't-cells', 'mhc-molecules', 'apoptosis'],
    replyCount: 1,
  },
  // Computer Science
  {
    subject: 'Computer Science',
    grade: 'A-Levels (Year 12-13)',
    title: 'Data Structures: Balancing logic in AVL Trees vs Red-Black Trees during insertion operations',
    desc: 'In OCR Computer Science Paper 1, what are the four rotation cases (LL, RR, LR, RL) in an AVL tree, and how does maintaining a balance factor of -1, 0, or +1 guarantee O(log n) worst-case lookup?',
    tags: ['data-structures', 'trees', 'avl-rotations', 'ocr-cs'],
    replyCount: 2,
  },
  {
    subject: 'Computer Science',
    grade: 'Undergraduate (BSc/BA)',
    title: 'Concurrency & Systems: Preventing the Dining Philosophers Deadlock using Dijkstra’s Resource Hierarchy',
    desc: 'What are the four Coffman conditions necessary for a deadlock to occur in an operating system, and how does ordering locks numerically prevent circular wait condition?',
    tags: ['concurrency', 'operating-systems', 'deadlocks', 'multithreading'],
    replyCount: 2,
  },
  {
    subject: 'Computer Science',
    grade: 'GCSE (Year 10-11)',
    title: 'Binary & Computer Architecture: Converting negative numbers using Two’s Complement and checking for overflow',
    desc: 'How do you represent -45 in an 8-bit two’s complement format, and what occurs when you add two positive binary numbers whose sum exceeds 127?',
    tags: ['binary', 'twos-complement', 'architecture', 'gcse-cs'],
    replyCount: 1,
  },
  {
    subject: 'Computer Science',
    grade: 'Undergraduate (BSc/BA)',
    title: 'Database Architecture: Normalising an unnormalised relational schema into Boyce-Codd Normal Form (BCNF)',
    desc: 'What is the exact distinction between Third Normal Form (3NF) and BCNF when multiple overlapping candidate keys exist, and why can BCNF decomposition occasionally lead to loss of dependency preservation?',
    tags: ['databases', 'sql', 'normalisation', 'bcnf'],
    replyCount: 1,
  },
  // Economics
  {
    subject: 'Economics',
    grade: 'A-Levels (Year 12-13)',
    title: 'Microeconomics: Why does third-degree price discrimination require differing Price Elasticity of Demand across segmented markets?',
    desc: 'A monopoly provider charges train passengers higher peak fares than off-peak tickets. How does the condition MR1 = MR2 = MC lead mathematically to higher profit-maximising prices in inelastic market segments?',
    tags: ['microeconomics', 'monopoly', 'price-discrimination', 'elasticity'],
    replyCount: 2,
  },
  {
    subject: 'Economics',
    grade: 'Undergraduate (BSc/BA)',
    title: 'Monetary Economics: The transmission mechanism of Quantitative Easing (QE) through bond yield suppression and portfolio rebalancing',
    desc: 'When the Bank of England purchases long-dated gilts on the secondary market, what are the four distinct channels through which liquidity transmits into commercial investment and consumption?',
    tags: ['monetary-policy', 'macroeconomics', 'central-banks', 'quantitative-easing'],
    replyCount: 2,
  },
  {
    subject: 'Economics',
    grade: 'GCSE (Year 10-11)',
    title: 'GCSE Business & Economics: Calculating Break-even Output using Contribution per Unit formula',
    desc: 'A company has fixed overhead costs of £40,000 per year. Selling price per unit is £25 and variable costs are £15. How do we calculate the break-even output and margin of safety if expected sales are 5,000 units?',
    tags: ['business', 'break-even', 'fixed-costs', 'gcse-economics'],
    replyCount: 1,
  },
  // English Literature
  {
    subject: 'English Literature',
    grade: 'A-Levels (Year 12-13)',
    title: 'Poetry Analysis: The significance of the volta and Petrarchan octave-sestet shift in John Donne’s Holy Sonnets',
    desc: 'In Donne’s "Batter my heart, three-person’d God", how does the violent paradox of spiritual renewal through siege warfare subvert the conventional Elizabethan sonnet tradition?',
    tags: ['metaphysical-poetry', 'john-donne', 'sonnets', 'literary-devices'],
    replyCount: 2,
  },
  {
    subject: 'English Literature',
    grade: 'Undergraduate (BSc/BA)',
    title: 'Post-Colonial Literature: Homi Bhabha’s concept of "Mimicry" in V.S. Naipaul and Chinua Achebe',
    desc: 'How does colonial mimicry ("almost the same, but not white") function as an ambivalent rupture of colonial authority in post-colonial prose fiction?',
    tags: ['post-colonial', 'critical-theory', 'bhabha', 'literary-criticism'],
    replyCount: 1,
  },
  // History & Philosophy
  {
    subject: 'History & Philosophy',
    grade: 'A-Levels (Year 12-13)',
    title: 'Epistemology: Edmund Gettier’s famous 1963 counterexamples to Justified True Belief (JTB) knowledge definition',
    desc: 'Plato in the Theaetetus defined knowledge as Justified True Belief. How does the Smith and Jones coin/job case prove that an agent can hold a justified true belief through sheer epistemic luck without actually knowing it?',
    tags: ['philosophy', 'epistemology', 'gettier-problem', 'jtb'],
    replyCount: 2,
  },
  {
    subject: 'History & Philosophy',
    grade: 'Undergraduate (BSc/BA)',
    title: 'Moral Philosophy: The categorical imperative and Kant’s formula of the universal law vs Act Utilitarianism',
    desc: 'Why did Immanuel Kant argue that lying to a murderer inquiring about the whereabouts of a friend is strictly impermissible under the universal law formulation, and how do modern deontologists resolve this critique?',
    tags: ['ethics', 'kant', 'deontology', 'utilitarianism'],
    replyCount: 2,
  },
];

// Additional rich permutations to bring the total to 85+ academic doubts across UK school and university levels
function generateExpansiveDoubts(): Doubt[] {
  const list: Doubt[] = [];

  // Add primary detailed doubts
  CURATED_PRIMARY_DOUBTS.forEach((seed, idx) => {
    list.push({
      id: `doubt-curated-${idx + 1}`,
      title: seed.title,
      description: seed.description,
      subject: seed.subject,
      grade: seed.grade,
      tags: seed.tags,
      authorName: seed.authorName,
      authorGrade: seed.grade,
      authorAvatar: seed.authorAvatar,
      institution: seed.institution,
      createdAt: seed.createdAt,
      upvotes: seed.upvotes,
      views: seed.views,
      hasUpvoted: false,
      isSolved: seed.isSolved,
      isBookmarked: idx === 0 || idx === 3,
      replies: seed.replies,
    });
  });

  // Expand with generated academic queries to reach 85+ authentic posts
  let idCounter = CURATED_PRIMARY_DOUBTS.length + 1;

  // Let's create realistic variations across 8 subjects and multiple levels
  const UK_FIRST_NAMES = [
    'Alexander', 'Beatrice', 'Cameron', 'Darcy', 'Ethan', 'Florence', 'Gabriel',
    'Imogen', 'Jasper', 'Kiera', 'Leo', 'Madeleine', 'Nathaniel', 'Ophelia',
    'Patrick', 'Rosalind', 'Samuel', 'Tara', 'William', 'Zara', 'Barnaby',
    'Cordelia', 'Dominic', 'Evelyn', 'Felix', 'Grace', 'Henry', 'Isla',
    'James', 'Katherine', 'Lucas', 'Mia', 'Noah', 'Penelope', 'Rupert',
  ];

  const UK_SURNAMES = [
    'Sterling', 'Holloway', 'Sinclair', 'Fairfax', 'Beaumont', 'Kensington',
    'Thorne', 'Pemberton', 'Ashcroft', 'Hawthorne', 'Cromwell', 'Livingstone',
    'Somerset', 'Blackwood', 'Chamberlain', 'Vane', 'Redgrave', 'Harrington',
  ];

  const TIME_AGO = [
    '25 mins ago', '45 mins ago', '1 hour ago', '2 hours ago', '3 hours ago',
    '5 hours ago', '8 hours ago', '12 hours ago', '1 day ago', '2 days ago',
    '3 days ago', '4 days ago', '5 days ago', '6 days ago', '1 week ago',
  ];

  GENERATED_TOPICS.forEach((topic, tIdx) => {
    // Generate 3 authentic contextual iterations of each topic to cover breadth
    for (let variant = 0; variant < 3; variant++) {
      const authorIndex = (tIdx * 3 + variant) % UK_FIRST_NAMES.length;
      const surnameIndex = (tIdx * 2 + variant) % UK_SURNAMES.length;
      const avatarIndex = (tIdx + variant) % AVATARS.length;
      const instIndex = (tIdx + variant) % UK_INSTITUTIONS.length;
      const authorName = `${UK_FIRST_NAMES[authorIndex]} ${UK_SURNAMES[surnameIndex]}`;
      const timeStr = TIME_AGO[(tIdx + variant) % TIME_AGO.length];

      let vTitle = topic.title;
      let vDesc = topic.desc;

      if (variant === 1) {
        vTitle = `[Methodology Enquiry] ${topic.title} - Step-by-step verification`;
        vDesc = `Following our university seminar / college workshop, I have been reviewing: ${topic.desc} Could someone provide a worked derivation or analytical breakdown with standard British exam conventions?`;
      } else if (variant === 2) {
        vTitle = `Exam Strategy & Common Pitfalls: ${topic.title}`;
        vDesc = `During timed past-paper practice, marks are consistently lost on phrasing for this question: ${topic.desc} What key phrases do Cambridge and Edexcel examiners look for to award full marks?`;
      }

      const generatedReplies: Reply[] = [];
      const numReplies = topic.replyCount + (variant % 2);

      for (let r = 0; r < numReplies; r++) {
        const rAuthorIndex = (authorIndex + r + 3) % UK_FIRST_NAMES.length;
        const rSurnameIndex = (surnameIndex + r + 2) % UK_SURNAMES.length;
        const rAvatarIndex = (avatarIndex + r + 1) % AVATARS.length;
        const rInstIndex = (instIndex + r + 4) % UK_INSTITUTIONS.length;

        const isSol = r === 0 && (variant !== 2 || tIdx % 2 === 0);

        generatedReplies.push({
          id: `rep-gen-${idCounter}-${r + 1}`,
          authorName: `${UK_FIRST_NAMES[rAuthorIndex]} ${UK_SURNAMES[rSurnameIndex]}`,
          authorGrade: topic.grade,
          authorAvatar: AVATARS[rAvatarIndex],
          institution: UK_INSTITUTIONS[rInstIndex],
          content: `Hi ${UK_FIRST_NAMES[authorIndex]},\n\nRegarding your enquiry on **"${vTitle.replace(/^\[.*?\]\s*/, '')}"**:\n\n1. **Fundamental Principle**: Always begin by stating the overarching theorem or governing equation clearly. Examiners require the theoretical premise before numerical substitution.\n\n2. **Detailed Step-by-Step Resolution**:\n- In standard UK mark schemes (AQA, Edexcel, OCR, Cambridge), state all intermediate working explicitly.\n- Verify boundary conditions and check dimensional homogeneity.\n- Double-check that all standard symbols conform to the British SI units or standard mathematical notation.\n\n3. **Examiner's Tip**: Be meticulous with your sign conventions and qualifying definitions. Many candidates neglect to mention the non-zero constraints or asymptotic boundaries, which forfeits the final communication mark.\n\nHope this provides complete clarity for your academic revision!`,
          createdAt: TIME_AGO[Math.min(TIME_AGO.length - 1, (tIdx + variant + r))],
          upvotes: 12 + (variant * 7) + (r * 4),
          isSolution: isSol,
        });
      }

      list.push({
        id: `doubt-gen-${idCounter}`,
        title: vTitle,
        description: vDesc,
        subject: topic.subject,
        grade: topic.grade,
        tags: [...topic.tags, 'peer-discussion'],
        authorName,
        authorGrade: topic.grade,
        authorAvatar: AVATARS[avatarIndex],
        institution: UK_INSTITUTIONS[instIndex],
        createdAt: timeStr,
        upvotes: 15 + ((tIdx * 7 + variant * 5) % 45),
        views: 120 + ((tIdx * 25 + variant * 40) % 650),
        hasUpvoted: false,
        isSolved: generatedReplies.some((r) => r.isSolution),
        isBookmarked: false,
        replies: generatedReplies,
      });

      idCounter++;
    }
  });

  return list;
}

export const INITIAL_DOUBTS: Doubt[] = generateExpansiveDoubts();
