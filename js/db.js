window.DB = {
    skillNodes: [
        {
            id: 'expfunc',
            label: 'Exponential Functions',
            icon: '📈',
            x: 50,
            y: 12,
            status: 'partial',
            mastery: 0,
            prerequisites: [],
            keywords: ['exponential', 'growth', 'decay', 'base', 'exponent', 'domain', 'range'],
            summary: 'Core properties, domain, range, and behavior of exponential functions y = a^x.',
            lesson: {
                title: 'Exponential Functions',
                body: `
                    <h4>Core Concept</h4>
                    <p>An exponential function has the form:</p>
                    <div class="math-block">\\( f(x) = a^x \\quad (a > 0,\\; a \\neq 1) \\)</div>
                    <h4>Key Properties</h4>
                    <ul>
                        <li>Domain: all real numbers \\(\\mathbb{R}\\)</li>
                        <li>Range: \\( (0, +\\infty) \\)</li>
                        <li>Passes through \\((0,1)\\) since \\(a^0 = 1\\)</li>
                        <li>If \\(a > 1\\): strictly increasing (growth)</li>
                        <li>If \\(0 < a < 1\\): strictly decreasing (decay)</li>
                    </ul>
                `
            },
            challenges: [
                {
                    question: `Evaluate: \\( 2^5 = \\;? \\)`,
                    expectedAnswer: `32`,
                    concept: `Computing powers of 2. Foundation for understanding exponential growth.`
                },
                {
                    question: `Evaluate: \\( 3^0 = \\;? \\)`,
                    expectedAnswer: `1`,
                    concept: `Any base raised to power 0 equals 1. This is the y-intercept property.`
                },
                {
                    question: `Simplify: \\( 5^2 \\cdot 5^3 = 5^? \\)`,
                    expectedAnswer: `5`,
                    concept: `Product rule for exponents: \\(a^m \\cdot a^n = a^{m+n}\\).`
                },
                {
                    question: `Evaluate: \\( \\left(\\frac{1}{2}\\right)^3 = \\;? \\)`,
                    expectedAnswer: `0.125`,
                    concept: `Exponential decay. Fractional bases between 0 and 1 decrease as exponent increases.`
                },
                {
                    question: `Evaluate: \\( 10^{-2} = \\;? \\)`,
                    expectedAnswer: `0.01`,
                    concept: `Negative exponents represent the reciprocal of the power. Crucial for understanding small logarithms.`
                },
                {
                    question: `Simplify to a single number: \\( 9^{1/2} \\)`,
                    expectedAnswer: `3`,
                    concept: `Fractional exponents represent roots. Power of 1/2 is the square root.`
                }
            ]
        },
        {
            id: 'logdef',
            label: 'Logarithm Definition',
            icon: '📖',
            x: 30,
            y: 32,
            status: 'partial',
            mastery: 0,
            prerequisites: ['expfunc'],
            keywords: ['logarithm', 'definition', 'base', 'argument', 'exponential translation'],
            summary: 'Understanding log_a(b) = c <=> a^c = b and base constraints.',
            lesson: {
                title: 'The Definition of a Logarithm',
                body: `
                    <h4>What Is a Logarithm?</h4>
                    <p>A logarithm answers: <em>"To what power must the base be raised to produce this number?"</em></p>
                    <div class="math-block">\\( \\log_a b = c \\iff a^c = b \\)</div>
                    <h4>Conditions</h4>
                    <ul>
                        <li>Base \\(a > 0,\\; a \\neq 1\\)</li>
                        <li>Argument \\(b > 0\\)</li>
                    </ul>
                    <h4>Special Values</h4>
                    <ul>
                        <li>\\(\\log_a 1 = 0\\) &nbsp;(because \\(a^0 = 1\\))</li>
                        <li>\\(\\log_a a = 1\\) &nbsp;(because \\(a^1 = a\\))</li>
                    </ul>
                `
            },
            challenges: [
                {
                    question: `Rearrange this into logarithmic form: \\( 2^3 = 8 \\)`,
                    expectedAnswer: `\\log_2(8) = 3`,
                    concept: `Basic translation between exponential and logarithmic form.`
                },
                {
                    question: `Evaluate: \\( \\log_3(9) = \\;? \\)`,
                    expectedAnswer: `2`,
                    concept: `Understanding that the answer is the exponent needed to turn 3 into 9.`
                },
                {
                    question: `Evaluate: \\( \\log_5(1) = \\;? \\)`,
                    expectedAnswer: `0`,
                    concept: `Special property: log of 1 is always 0 because any base to the power of 0 is 1.`
                },
                {
                    question: `Evaluate: \\( \\log_2(0.5) = \\;? \\)`,
                    expectedAnswer: `-1`,
                    concept: `Logarithms of numbers between 0 and 1 are negative. Recall \\(0.5 = 2^{-1}\\).`
                },
                {
                    question: `Evaluate: \\( \\log_{10}(0.01) = \\;? \\)`,
                    expectedAnswer: `-2`,
                    concept: `Understanding logarithms of very small numbers (powers of 1/10).`
                }
            ]
        },
        {
            id: 'logprop',
            label: 'Logarithm Properties',
            icon: '⚙️',
            x: 70,
            y: 32,
            status: 'partial',
            mastery: 0,
            prerequisites: ['expfunc'],
            keywords: ['properties', 'product rule', 'quotient rule', 'power rule', 'chain rule'],
            summary: 'Rules for multiplying, dividing, raising powers, and cascading log operations.',
            lesson: {
                title: 'Properties of Logarithms',
                body: `
                    <h4>Three Fundamental Rules</h4>
                    <div class="math-block">\\( \\log_a (MN) = \\log_a M + \\log_a N \\)</div>
                    <div class="math-block">\\( \\log_a \\left(\\frac{M}{N}\\right) = \\log_a M - \\log_a N \\)</div>
                    <div class="math-block">\\( \\log_a (M^k) = k \\cdot \\log_a M \\)</div>
                    <h4>The Chain Rule for Logs</h4>
                    <div class="math-block">\\( \\log_a b \\cdot \\log_b c = \\log_a c \\)</div>
                    <p>This "bridge" allows you to cancel terms when multiplying logarithms of different bases.</p>
                `
            },
            challenges: [
                {
                    question: `Simplify: \\( \\log_6 4 + \\log_6 54 = \\;? \\)`,
                    expectedAnswer: `3`,
                    concept: `Product Rule: \\(\\log_6(4 \\cdot 54) = \\log_6(216)\\). Recognize that \\(6^3 = 216\\).`
                },
                {
                    question: `Evaluate using the Chain Rule: \\( \\log_3 5 \\cdot \\log_5 9 = \\;? \\)`,
                    expectedAnswer: `2`,
                    concept: `Chain Rule (Multiplication). The 5s cancel, leaving \\(\\log_3 9 = 2\\).`
                },
                {
                    question: `Simplify: \\( 3^{\\log_3 15} - \\log_2 \\sqrt[3]{8} = \\;? \\)`,
                    expectedAnswer: `14`,
                    concept: `Combined inverse and power rules. \\(3^{\\log_3 15} = 15\\) and \\(\\log_2 8^{1/3} = 1/3 \\cdot 3 = 1\\).`
                },
                {
                    question: `Given \\(\\log_{10} 2 \\approx 0.301\\) and \\(\\log_{10} 3 \\approx 0.477\\), find \\(\\log_{10} \\sqrt{1.2} \\) (approximate to 3 decimals).`,
                    expectedAnswer: `0.039`,
                    concept: `Advanced application. \\(1.2 = 12/10 = (2^2 \\cdot 3)/10\\). Use log rules to expand, then divide by 2 for the square root.`
                },
                {
                    question: `Expert Challenge: Let \\( A = \\log_2 3 \\cdot \\log_3 4 \\cdot \\log_4 5 \\cdots \\log_{127} 128 \\). Find A.`,
                    expectedAnswer: `7`,
                    concept: `Telescoping Chain Rule. Multi-step cancellation leaves only \\(\\log_2 128 = 7\\).`
                },
                {
                    question: `Simplify \\( P = \\log_{\\sqrt{a}} a^3 \\) for \\( a > 0, a \\neq 1 \\).`,
                    expectedAnswer: `6`,
                    concept: `Vietnamese Curriculum Standard. Base is \\( a^{1/2} \\). Use change of base or base-power rule: \\( \\log_{a^k} b = \\frac{1}{k} \\log_a b \\).`
                }
            ]
        },
        {
            id: 'changebase',
            label: 'Change of Base',
            icon: '🔄',
            x: 30,
            y: 55,
            status: 'locked',
            mastery: 0,
            prerequisites: ['logdef', 'logprop'],
            keywords: ['base conversion', 'natural log', 'common log', 'formula'],
            summary: 'Using log_a(b) = log_c(b)/log_c(a) to evaluate logs with arbitrary bases.',
            lesson: {
                title: 'Change of Base Formula',
                body: `
                    <h4>The Formula</h4>
                    <div class="math-block">\\( \\log_a b = \\frac{\\log_c b}{\\log_c a} \\)</div>
                    <p>This lets you convert between any two bases. Most commonly you'll use \\(c = 10\\) (common log) or \\(c = e\\) (natural log).</p>
                    <h4>Example</h4>
                    <div class="math-block">\\( \\log_2 5 = \\frac{\\ln 5}{\\ln 2} \\approx 2.322 \\)</div>
                `
            },
            challenges: [
                {
                    question: `Express in terms of \\( \\ln 2 \\) and \\( \\ln 3 \\): \\( \\log_6 12 = \\frac{? \\cdot \\ln 2 + \\ln 3}{\\ln 2 + \\ln 3} \\)`,
                    expectedAnswer: `2`,
                    concept: `Change of Base + Product Rule. \\(12 = 2^2 \\cdot 3\\) and \\(6 = 2 \\cdot 3\\). Numerator is \\(2 \\ln 2 + \\ln 3\\).`
                },
                {
                    question: `If \\( \\log_2 3 = a \\), express \\( \\log_{12} 18 \\) in terms of a.`,
                    expectedAnswer: `(1+2a)/(2+a)`,
                    concept: `Vietnamese Assessment Standard. Convert all to base 2. \\(\\log_2 18 = 1 + 2a\\), \\(\\log_2 12 = 2 + a\\).`
                },
                {
                    question: `If \\( \\log_{12} 6 = a \\) and \\( \\log_{12} 7 = b \\), find \\( \\log_2 7 \\) in terms of a and b.`,
                    expectedAnswer: `b/(1-a)`,
                    concept: `Advanced Base Change. \\(\\log_2 7 = \\frac{\\log_{12} 7}{\\log_{12} 2}\\). Note: \\( \\log_{12} 2 = \\log_{12}(12/6) = 1 - a \\).`
                }
            ]
        },
        {
            id: 'logeq',
            label: 'Log Equations',
            icon: '✏️',
            x: 70,
            y: 55,
            status: 'locked',
            mastery: 0,
            prerequisites: ['logprop'],
            keywords: ['equations', 'solving', 'substitution', 'conjugate', 'domain check'],
            summary: 'Algebraic methods for resolving logarithmic equations under strict domain conditions.',
            lesson: {
                title: 'Solving Logarithmic Equations',
                body: `
                    <h4>Strategy</h4>
                    <ul>
                        <li>Use log properties to combine or simplify</li>
                        <li>Convert to exponential form: \\(\\log_a x = c \\Rightarrow x = a^c\\)</li>
                        <li>Always check that solutions keep the argument positive</li>
                    </ul>
                    <h4>Example</h4>
                    <div class="math-block">\\( \\log_2(x-1) + \\log_2(x+1) = 3 \\)</div>
                    <p>Combine: \\(\\log_2[(x-1)(x+1)] = 3\\), so \\(x^2 - 1 = 8\\), giving \\(x = 3\\).</p>
                `
            },
            challenges: [
                {
                    question: `Solve for x: \\( \\log^2_2 x - 3 \\log_2 x + 2 = 0 \\)`,
                    expectedAnswer: `2, 4`,
                    concept: `Quadratic form in Logarithms. Let \\( t = \\log_2 x \\), then \\( t^2 - 3t + 2 = 0 \\).`
                },
                {
                    question: `Solve for x: \\( (2-\\sqrt{3})^x + (2+\\sqrt{3})^x = 4 \\)`,
                    expectedAnswer: `1, -1`,
                    concept: `Conjugate base equation. Note that \\( (2-\\sqrt{3})(2+\\sqrt{3}) = 1 \\), so they are reciprocals.`
                },
                {
                    question: `Solve for x: \\( \\log_2(2x-1)^2 = 2 \\log_2(x-2) \\)`,
                    expectedAnswer: `None`,
                    concept: `Domain restriction. The right side requires \\(x>2\\). Solving the equation gives \\(x=0.25\\), which is invalid.`
                }
            ]
        },
        {
            id: 'natlog',
            label: 'Natural Logarithm',
            icon: 'ℯ',
            x: 35,
            y: 78,
            status: 'locked',
            mastery: 0,
            prerequisites: ['changebase', 'logeq'],
            keywords: ['natural log', 'e base', 'calculus', 'inverse properties'],
            summary: 'Mathematical role and properties of the base-e natural logarithm y = ln(x).',
            lesson: {
                title: 'The Natural Logarithm (ln)',
                body: `
                    <h4>Definition</h4>
                    <div class="math-block">\\( \\ln x = \\log_e x \\quad (e \\approx 2.718) \\)</div>
                    <h4>Key Facts</h4>
                    <ul>
                        <li>\\(\\ln 1 = 0\\), \\(\\ln e = 1\\)</li>
                        <li>All log properties apply with base \\(e\\)</li>
                        <li>Used heavily in calculus — \\(\\frac{d}{dx}\\ln x = \\frac{1}{x}\\)</li>
                    </ul>
                `
            },
            challenges: [
                {
                    question: `Evaluate: \\( \\ln(e) = \\;? \\)`,
                    expectedAnswer: `1`,
                    concept: `Basic property: natural log of its own base e is always 1.`
                },
                {
                    question: `Evaluate: \\( \\ln(1) = \\;? \\)`,
                    expectedAnswer: `0`,
                    concept: `Like all logarithms, ln of 1 is 0.`
                },
                {
                    question: `Simplify: \\( e^{\\ln(5)} = \\;? \\)`,
                    expectedAnswer: `5`,
                    concept: `Inverse function property: \\(e\\) and \\(\\ln\\) cancel each other out.`
                },
                {
                    question: `Solve for x: \\( \\ln(x) = 2 \\) (Give answer in terms of e)`,
                    expectedAnswer: `e^2`,
                    concept: `Solving ln equations by converting to base e exponential form.`
                }
            ]
        },
        {
            id: 'logapps',
            label: 'Log Applications',
            icon: '🌍',
            x: 65,
            y: 78,
            status: 'locked',
            mastery: 0,
            prerequisites: ['changebase', 'logeq'],
            keywords: ['applications', 'decibels', 'pH scale', 'pressure', 'biology growth'],
            summary: 'Real-world deployment of log scales in chemistry, acoustics, growth, and physics.',
            lesson: {
                title: 'Logarithms in the Real World',
                body: `
                    <h4>Common Models</h4>
                    <ul>
                        <li><strong>Air Pressure</strong>: \\(a = 15500(5 - \\log p)\\)</li>
                        <li><strong>Acoustics</strong>: \\(L = 10 \\log(I/I_0)\\) (Decibels)</li>
                        <li><strong>Chemistry</strong>: \\(pH = -\\log[H^+]\\)</li>
                        <li><strong>Growth</strong>: Exponential doubling rates for bacteria and finance.</li>
                    </ul>
                `
            },
            challenges: [
                {
                    question: `[Everest] Find the air pressure \\(p\\) (in Pascal) at the summit of Everest (\\(a = 8850m\\)) using the formula: \\(a = 15500(5 - \\log p)\\). (Round to nearest integer)`,
                    expectedAnswer: `26853`,
                    concept: `Practical application of common logarithms to atmospheric pressure.`
                },
                {
                    question: `[Acoustics] A normal conversation has an intensity \\(I = 10^{-7} W/m^2\\). Calculate the decibel level \\(L\\) given \\(I_0 = 10^{-12} W/m^2\\) and \\(L = 10 \\log(I/I_0)\\).`,
                    expectedAnswer: `50`,
                    concept: `Decibel scale is logarithmic. Every 10dB increase is a 10x intensity increase.`
                },
                {
                    question: `[Chemistry] If a tiger prawn pond has a hydrogen ion concentration \\([H^+] = 8 \\cdot 10^{-8}\\), calculate the pH. (Recall \\(pH = -\\log[H^+]\\) and \\(\\log 2 \\approx 0.301\\). Round to 1 decimal).`,
                    expectedAnswer: `7.1`,
                    concept: `Acidity is measured on a negative log scale. A pH of 7 is neutral.`
                },
                {
                    question: `[Biology] A bacterium doubles every 20 minutes. If you start with 1 bacterium, how many minutes until you have 1,000,000? (Round to nearest minute)`,
                    expectedAnswer: `399`,
                    concept: `Logarithms solve for the 'time' factor in exponential growth. \\(2^{t/20} = 10^6\\).`
                }
            ]
        },
        {
            id: 'chap6exam',
            label: 'Final Exam',
            icon: '🎓',
            x: 90,
            y: 12,
            status: 'locked',
            mastery: 0,
            prerequisites: ['natlog', 'logapps'],
            keywords: ['exam', 'comprehensive', 'vietnamese grade 11', 'chapter 6 assessment'],
            summary: 'Comprehensive examination assessing exponents, logarithms, equations, and financial calculations.',
            lesson: {
                title: 'Vietnamese Grade 11: Chapter 6 Mastery',
                body: `
                    <h4>Final Examination</h4>
                    <p>This exam tests your complete understanding of Exponential and Logarithmic Functions, specifically aligning with the Vietnamese 11th Grade Mathematics curriculum.</p>
                    <ul>
                        <li>Properties of powers and logarithms</li>
                        <li>Solving inequalities and equations</li>
                        <li>Practical applications (Compound Interest, Population Growth)</li>
                    </ul>
                `
            },
            challenges: [
                {
                    question: `Simplify: \\( (x^{\\sqrt{3}-1})^{\\sqrt{3}+1} \\) where \\( x > 0 \\)`,
                    expectedAnswer: `x^2`,
                    concept: `Grade 11 Exponent Rules: Power of a power property using irrational numbers. Difference of squares: \\((\\sqrt{3})^2 - 1^2 = 2\\).`
                },
                {
                    question: `Find the domain of \\( y = \\log_3(x^2 - 4x + 3) \\). What is the smallest positive integer in the domain?`,
                    expectedAnswer: `4`,
                    concept: `Grade 11 Log Domain: The argument must be strictly positive. \\(x^2 - 4x + 3 > 0\\) meaning \\(x < 1\\) or \\(x > 3\\). Smallest positive integer is 4.`
                },
                {
                    question: `Solve for x: \\( 4^x - 3 \\cdot 2^x + 2 = 0 \\) (find the largest solution)`,
                    expectedAnswer: `1`,
                    concept: `Grade 11 Exponential Equations: Substitution method. Let \\(t = 2^x\\) giving \\(t^2 - 3t + 2 = 0\\).`
                },
                {
                    question: `A sum of 100 million VND is deposited at an annual compound rate of 6%. How many full years until the balance just exceeds 200 million VND?`,
                    expectedAnswer: `12`,
                    concept: `Grade 11 Practical Application: Compound Interest. Solve \\( 100(1.06)^t > 200 \\) taking log of both sides.`
                }
            ]
        }
    ],
    skillEdges: [
        { from: 'expfunc', to: 'logdef' },
        { from: 'expfunc', to: 'logprop' },
        { from: 'logdef', to: 'changebase' },
        { from: 'logprop', to: 'changebase' },
        { from: 'logprop', to: 'logeq' },
        { from: 'changebase', to: 'natlog' },
        { from: 'logeq', to: 'natlog' },
        { from: 'changebase', to: 'logapps' },
        { from: 'logeq', to: 'logapps' }
    ],

    // Converts curriculum database nodes and challenges to a standardized queryable RAG chunk format
    getChunks: function() {
        const chunks = [];
        this.skillNodes.forEach(node => {
            chunks.push({
                id: `${node.id}_lesson`,
                type: 'lesson',
                title: node.label,
                text: `${node.label} Lesson Content:\n${node.lesson.body}`,
                metadata: {
                    nodeId: node.id,
                    keywords: node.keywords,
                    summary: node.summary
                }
            });
            node.challenges.forEach((challenge, idx) => {
                chunks.push({
                    id: `${node.id}_challenge_${idx}`,
                    type: 'challenge',
                    title: `${node.label} Challenge ${idx + 1}`,
                    text: `Question: ${challenge.question}\nExpected Answer: ${challenge.expectedAnswer}\nConcept to Master: ${challenge.concept}`,
                    metadata: {
                        nodeId: node.id,
                        keywords: node.keywords,
                        challengeIndex: idx
                    }
                });
            });
        });
        return chunks;
    }
};
