/* تفاصيل المؤشرات: الأنواع، وطريقة الحساب خطوة بخطوة، ومثال محلول، ومنهجية المؤشرات الدولية */
window.CXK_METRICX={
 "types": [
  {
   "id": "perception",
   "kind": "category",
   "n": "مقاييس الإدراك والانطباع (ما يقوله العميل)",
   "n_en": "Perception / attitudinal (what customers say)",
   "d": "تقيس ما يشعر به العميل ويراه، وتُجمع بالاستبيانات وتحليل النصوص (Text Analytics). وهي نافذة على الرضا والسهولة والثقة والنية، لكنها تعبّر عن رأي لا عن سلوك، وتتأثر بصياغة السؤال وتوقيته ومن اختار أن يجيب.",
   "d_en": "Measure what customers feel and think, collected through surveys and text analytics. They reveal satisfaction, ease, trust and intent, but they record opinion rather than behaviour and are sensitive to wording, timing and who chooses to respond.",
   "examples": [
    "nps",
    "csat",
    "csat-score-avg",
    "ces",
    "trust",
    "goal-completion",
    "sentiment",
    "sus",
    "enps"
   ]
  },
  {
   "id": "behavioural",
   "kind": "category",
   "n": "مقاييس السلوك (ما يفعله العميل)",
   "n_en": "Behavioural (what customers do)",
   "d": "تُستخرج من الأنظمة لا من الآراء: من أكمل الخدمة، ومن عاد يتواصل، ومن ترك الرحلة في منتصفها. وهي أصدق في الدلالة على الجهد والإخفاق لأنها لا تعتمد على ذاكرة العميل، غير أنها تخبرك بما حدث دون أن تفسّر لماذا.",
   "d_en": "Drawn from systems rather than opinions: who completed the service, who contacted again, who abandoned mid-journey. They are more reliable signals of effort and failure because they do not rely on memory, but they tell you what happened, not why.",
   "examples": [
    "repeat-contact",
    "contact-rate",
    "complaint-rate",
    "digital-uptake",
    "task-completion",
    "drop-off"
   ]
  },
  {
   "id": "operational",
   "kind": "category",
   "n": "مقاييس التشغيل (أداء الجهة)",
   "n_en": "Operational (how the organisation performs)",
   "d": "تقيس سرعة الجهة ودقتها وطاقتها في تقديم الخدمة: الزمن، والحل، والالتزام بالوعد. هي أدوات إدارة يومية لا غنى عنها، لكن تحسينها بمعزل عن تجربة العميل قد يحسّن الرقم ويسيء إلى الخدمة.",
   "d_en": "Measure the organisation's speed, accuracy and capacity in delivering the service: time, resolution and keeping promises. They are essential day-to-day management tools, but optimising them in isolation can improve the number while harming the experience.",
   "examples": [
    "fcr",
    "aht",
    "asa",
    "abandon",
    "e2e-time",
    "time-to-resolution",
    "sla",
    "reopen",
    "failure-demand",
    "accessibility-conformance",
    "response-rate"
   ]
  },
  {
   "id": "outcome",
   "kind": "category",
   "n": "مقاييس النتيجة والقيمة (الأثر المالي والمؤسسي)",
   "n_en": "Outcome / financial (value)",
   "d": "تربط التجربة بما يهم الإدارة العليا: بقاء العملاء، وإيرادهم، وتكلفة خدمتهم. هي اللغة التي تُقنع بالاستثمار في التجربة، لكنها متأخرة الظهور وتتأثر بعوامل كثيرة خارج التجربة كالسعر والمنافسة.",
   "d_en": "Link experience to what leadership cares about: keeping customers, their revenue and the cost of serving them. They make the business case for CX, but they show up late and are shaped by many factors beyond experience, such as price and competition.",
   "examples": [
    "churn",
    "retention",
    "clv",
    "share-of-wallet",
    "cost-to-serve"
   ]
  },
  {
   "id": "composite",
   "kind": "category",
   "n": "المؤشرات المركّبة والوطنية",
   "n_en": "Composite and national indices",
   "d": "تجمع عدة مكوّنات في درجة واحدة وفق نموذج إحصائي أو أوزان معلنة، وتُستعمل للمقارنة بين الجهات والقطاعات والدول عبر الزمن. قيمتها في المقارنة المعيارية (Benchmarking)، وحدّها أن الدرجة الواحدة لا تدلّك على موضع الخلل دون الرجوع إلى مكوّناتها.",
   "d_en": "Combine several components into one score using a statistical model or published weights, to compare organisations, sectors and countries over time. Their value is benchmarking; their limit is that a single score does not show where the problem lies without going back to its components.",
   "examples": [
    "cx-index"
   ]
  },
  {
   "id": "relational-transactional",
   "kind": "lens",
   "n": "القياس العلائقي مقابل القياس الإجرائي",
   "n_en": "Relational vs transactional measurement",
   "d": "القياس الإجرائي (Transactional) يُطلق عقب تفاعل بعينه ليقيس تلك اللحظة، كرضا العميل بعد مكالمة. والقياس العلائقي (Relational) يُجرى دورياً ليقيس حصيلة العلاقة كلها، كصافي نقاط الترويج والثقة. يحتاج البرنامج الناضج إلى كليهما: الأول ليصلح الرحلات، والثاني ليرى الصورة الكلية.",
   "d_en": "Transactional measurement is triggered after a specific interaction to capture that moment, such as CSAT after a call. Relational measurement runs periodically to capture the whole relationship, such as NPS or trust. A mature programme needs both: the first to fix journeys, the second to see the big picture.",
   "examples": [
    "csat",
    "ces",
    "goal-completion",
    "nps",
    "trust",
    "enps"
   ]
  },
  {
   "id": "leading-lagging",
   "kind": "lens",
   "n": "المؤشرات القائدة مقابل المؤشرات المتأخرة",
   "n_en": "Leading vs lagging indicators",
   "d": "المؤشر القائد (Leading) يتحرك قبل النتيجة فيمنحك فرصة للتدخل، كالجهد وتكرار التواصل ونسبة التسرب في الخطوة. والمؤشر المتأخر (Lagging) يسجّل ما وقع فعلاً، كالتسرب وقيمة العميل والثقة الوطنية. الإدارة بالمتأخرة وحدها كقيادة سيارة بالنظر في المرآة الخلفية.",
   "d_en": "A leading indicator moves before the outcome and gives you time to act, such as effort, repeat contact or step drop-off. A lagging indicator records what has already happened, such as churn, lifetime value or national trust. Managing on lagging indicators alone is like driving by the rear-view mirror.",
   "examples": [
    "ces",
    "repeat-contact",
    "drop-off",
    "failure-demand",
    "churn",
    "clv",
    "trust"
   ]
  }
 ],
 "metrics": [
  {
   "id": "nps",
   "type": "perception",
   "q": "«على مقياس من 0 إلى 10، ما مدى احتمال أن توصي بـ[الجهة] لصديق أو زميل؟»، ويتبعه سؤال مفتوح: «ما السبب الرئيسي لدرجتك؟»",
   "q_en": "\"On a scale of 0 to 10, how likely are you to recommend [organisation] to a friend or colleague?\", followed by an open question: \"What is the main reason for your score?\"",
   "steps": [
    "صنّف كل إجابة: المروّجون (Promoters) من 9 إلى 10، والمحايدون (Passives) 7 و8، والمنتقدون (Detractors) من 0 إلى 6.",
    "احسب نسبة المروّجين من إجمالي المجيبين.",
    "احسب نسبة المنتقدين من إجمالي المجيبين.",
    "اطرح نسبة المنتقدين من نسبة المروّجين، واكتب الناتج رقماً صحيحاً بلا علامة مئوية بين −100 و+100.",
    "حلّل إجابات السؤال المفتوح لكل فئة على حدة لتعرف أسباب الدرجة."
   ],
   "steps_en": [
    "Classify each answer: promoters 9–10, passives 7–8, detractors 0–6.",
    "Calculate promoters as a percentage of all respondents.",
    "Calculate detractors as a percentage of all respondents.",
    "Subtract the detractor percentage from the promoter percentage and report it as a whole number from −100 to +100, without a % sign.",
    "Analyse the open-text reasons for each group separately."
   ],
   "ex": "من 500 مستجيب: 260 مروّجاً (52%)، و140 محايداً (28%)، و100 منتقد (20%) ← NPS = 52 − 20 = ‎+32.",
   "ex_en": "Of 500 respondents: 260 promoters (52%), 140 passives (28%), 100 detractors (20%) → NPS = 52 − 20 = +32.",
   "read": "الدرجة الموجبة تعني أن المروّجين أكثر من المنتقدين، والمحايدون لا يدخلون الحساب لكنهم يخفضون الدرجة بإنقاص الطرفين. راقب الاتجاه وتوزيع الفئات الثلاث لا الرقم وحده، فدرجتان متساويتان قد تخفيان توزيعين مختلفين.",
   "read_en": "A positive score means more promoters than detractors; passives are not counted but dilute both groups. Watch the trend and the three-group split, not the number alone, since equal scores can hide different distributions.",
   "freq": "علائقي: ربع سنوي أو نصف سنوي على عينة من العملاء.",
   "freq_en": "Relational: quarterly or half-yearly on a sample of customers."
  },
  {
   "id": "csat",
   "type": "perception",
   "q": "«ما مدى رضاك عن [الخدمة/التفاعل] الذي حصلت عليه اليوم؟» على مقياس من 1 (غير راضٍ إطلاقاً) إلى 5 (راضٍ جداً).",
   "q_en": "\"How satisfied are you with the [service/interaction] you received today?\" on a scale from 1 (very dissatisfied) to 5 (very satisfied).",
   "steps": [
    "اجمع الإجابات الصالحة واستبعد الفارغة.",
    "عُدّ من اختاروا 4 أو 5، وهما الخانتان العلويتان (Top-2-Box).",
    "اقسم هذا العدد على إجمالي المجيبين.",
    "اضرب الناتج في 100 لتحصل على النسبة المئوية."
   ],
   "steps_en": [
    "Collect valid answers and drop blanks.",
    "Count respondents who chose 4 or 5, the top two boxes.",
    "Divide that count by all respondents.",
    "Multiply by 100 to get a percentage."
   ],
   "ex": "من 400 مجيب: 180 اختاروا 5، و132 اختاروا 4، و48 اختاروا 3، و24 اختاروا 2، و16 اختاروا 1 ← CSAT = (180 + 132) ÷ 400 × 100 = 312 ÷ 400 × 100 = 78%.",
   "ex_en": "Of 400 respondents: 180 chose 5, 132 chose 4, 48 chose 3, 24 chose 2, 16 chose 1 → CSAT = (180 + 132) ÷ 400 × 100 = 312 ÷ 400 × 100 = 78%.",
   "read": "تعني النسبة حصة من خرجوا راضين عن تلك اللحظة تحديداً. اقرأها مع نسبة غير الراضين (1 و2) لأن الثبات في الخانتين العلويتين قد يخفي ازدياد الاستياء.",
   "read_en": "It is the share who left satisfied with that specific moment. Read it alongside the dissatisfied share (1–2), because a stable top-2-box can hide growing dissatisfaction.",
   "freq": "إجرائي: فور انتهاء التفاعل أو إكمال الخدمة.",
   "freq_en": "Transactional: immediately after the interaction or service completion."
  },
  {
   "id": "ces",
   "type": "perception",
   "q": "«إلى أي مدى توافق على العبارة: سهّلت [الجهة] عليّ إنجاز ما أحتاج إليه» على مقياس من 1 (لا أوافق بشدة) إلى 7 (أوافق بشدة).",
   "q_en": "\"To what extent do you agree: [organisation] made it easy for me to handle my issue\" on a scale from 1 (strongly disagree) to 7 (strongly agree).",
   "steps": [
    "اضرب كل درجة من 1 إلى 7 في عدد من اختاروها.",
    "اجمع حواصل الضرب.",
    "اقسم المجموع على عدد المجيبين لتحصل على المتوسط.",
    "احسب بديلاً نسبة من اختاروا 5 إلى 7 (الموافقون) من إجمالي المجيبين، والتزم بإحدى الطريقتين عند المقارنة."
   ],
   "steps_en": [
    "Multiply each score 1–7 by the number choosing it.",
    "Sum the products.",
    "Divide by the number of respondents to get the mean.",
    "Alternatively calculate the share choosing 5–7 (agree); stick to one method when comparing."
   ],
   "ex": "من 200 مجيب: 50 اختاروا 7، و60 اختاروا 6، و40 اختاروا 5، و20 اختاروا 4، و15 اختاروا 3، و10 اختاروا 2، و5 اختاروا 1 ← المجموع = 350 + 360 + 200 + 80 + 45 + 20 + 5 = 1060، والمتوسط = 1060 ÷ 200 = 5.3 من 7؛ ونسبة الموافقين = (50 + 60 + 40) ÷ 200 = 75%.",
   "ex_en": "Of 200 respondents: 50 chose 7, 60 chose 6, 40 chose 5, 20 chose 4, 15 chose 3, 10 chose 2, 5 chose 1 → sum = 350 + 360 + 200 + 80 + 45 + 20 + 5 = 1,060; mean = 1,060 ÷ 200 = 5.3 out of 7; agree share = (50 + 60 + 40) ÷ 200 = 75%.",
   "read": "كلما ارتفعت الدرجة كانت التجربة أيسر على هذا المقياس. الأهم من المتوسط تتبّع الإجابات المنخفضة (1–3) وربطها بالخطوة أو القناة التي سببت الجهد.",
   "read_en": "Higher means easier on this agree scale. More useful than the mean is tracking the low answers (1–3) and linking them to the step or channel that caused the effort.",
   "freq": "إجرائي: بعد إكمال الرحلة أو حل المشكلة.",
   "freq_en": "Transactional: after completing the journey or resolving the issue."
  },
  {
   "id": "trust",
   "type": "perception",
   "q": "«إلى أي مدى توافق على العبارة: أثق بأن [الجهة] ستعاملني بعدل» على مقياس موافقة خماسي.",
   "q_en": "\"To what extent do you agree: I trust [organisation] to treat me fairly\" on a five-point agreement scale.",
   "steps": [
    "اسأل عينة ممثلة ممن تعاملوا مع الجهة خلال فترة محددة (كالأشهر الاثني عشر الماضية).",
    "عُدّ من أجابوا «أوافق» أو «أوافق بشدة».",
    "اقسم العدد على إجمالي المجيبين واضرب في 100.",
    "رجّح النتائج إن اختلف تركيب العينة عن تركيب المستفيدين."
   ],
   "steps_en": [
    "Survey a representative sample of people who used the organisation within a set period (e.g. the last 12 months).",
    "Count those answering \"agree\" or \"strongly agree\".",
    "Divide by all respondents and multiply by 100.",
    "Weight results if the sample mix differs from the customer population."
   ],
   "ex": "من 1200 مجيب: 300 «أوافق بشدة» و480 «أوافق» ← الثقة = (300 + 480) ÷ 1200 × 100 = 65%.",
   "ex_en": "Of 1,200 respondents: 300 \"strongly agree\" and 480 \"agree\" → trust = (300 + 480) ÷ 1,200 × 100 = 65%.",
   "read": "تدل على رصيد العلاقة المتراكم لا على تفاعل واحد، ولذلك تتحرك ببطء. لا تقارنها بمؤشرات جهات أخرى إلا إذا تطابقت الصياغة والمقياس وطريقة العدّ.",
   "read_en": "It reflects accumulated relationship capital, not one interaction, so it moves slowly. Compare with other organisations only when wording, scale and counting rule match.",
   "freq": "علائقي: سنوي أو نصف سنوي.",
   "freq_en": "Relational: annual or half-yearly."
  },
  {
   "id": "fcr",
   "type": "operational",
   "q": "سجلات الحالات في نظام إدارة علاقات العملاء (CRM) مربوطة بهوية العميل وسبب التواصل، أو سؤال العميل: «هل حُلّ طلبك بالكامل من هذا التواصل؟»",
   "q_en": "Case records in the CRM linked to customer ID and contact reason, or asking the customer: \"Was your request fully resolved in this contact?\"",
   "steps": [
    "حدّد نافذة التحقق، وهي 7 أيام هنا.",
    "لكل حالة، ابحث عن تواصل لاحق من العميل نفسه وللسبب نفسه عبر أي قناة خلال النافذة.",
    "عُدّ الحالات التي لم يعقبها تواصل لاحق.",
    "اقسمها على إجمالي الحالات واضرب في 100."
   ],
   "steps_en": [
    "Set the check window, here 7 days.",
    "For each case, look for a later contact from the same customer for the same reason in any channel within the window.",
    "Count cases with no follow-up contact.",
    "Divide by all cases and multiply by 100."
   ],
   "ex": "من 10,000 حالة في الشهر، عاد أصحاب 2,300 حالة للسبب نفسه خلال 7 أيام ← FCR = (10,000 − 2,300) ÷ 10,000 × 100 = 77%.",
   "ex_en": "Of 10,000 cases in a month, customers in 2,300 cases came back for the same reason within 7 days → FCR = (10,000 − 2,300) ÷ 10,000 × 100 = 77%.",
   "read": "ارتفاعها يعني أن العميل حصل على الحل دون أن يكرر المحاولة، وهي من أقوى محركات الرضا وخفض التكلفة. إن تباعدت النسبة المقيسة من البيانات عن التي يقرّها العميل فثمة إغلاق قبل الحل.",
   "read_en": "Higher means customers got a solution without trying again; it is a strong driver of satisfaction and lower cost. If system-measured and customer-reported FCR diverge, cases are being closed before they are solved.",
   "freq": "أسبوعياً وشهرياً، لكل قناة وسبب تواصل.",
   "freq_en": "Weekly and monthly, by channel and contact reason."
  },
  {
   "id": "repeat-contact",
   "type": "behavioural",
   "q": "سجلات التواصل من جميع القنوات (الهاتف، والمحادثة، والبريد، والفروع) مربوطة بهوية العميل وسبب التواصل.",
   "q_en": "Contact logs from all channels (phone, chat, email, branches) linked to customer ID and contact reason.",
   "steps": [
    "اجمع العملاء الذين تواصلوا خلال الفترة (عملاء فريدون لا عدد التواصلات).",
    "لكل عميل، تحقق هل تواصل مرة ثانية أو أكثر للسبب نفسه خلال 30 يوماً من أول تواصل.",
    "عُدّ هؤلاء العملاء.",
    "اقسم العدد على إجمالي العملاء المتواصلين واضرب في 100."
   ],
   "steps_en": [
    "Gather customers who made contact in the period (unique customers, not contacts).",
    "For each, check whether they contacted again for the same reason within 30 days of the first contact.",
    "Count those customers.",
    "Divide by all contacting customers and multiply by 100."
   ],
   "ex": "تواصل 8,000 عميل فريد خلال الشهر، منهم 1,040 تواصلوا مرتين أو أكثر للسبب نفسه خلال 30 يوماً ← التكرار = 1,040 ÷ 8,000 × 100 = 13%.",
   "ex_en": "8,000 unique customers made contact in the month; 1,040 contacted twice or more for the same reason within 30 days → repeat rate = 1,040 ÷ 8,000 × 100 = 13%.",
   "read": "كل نقطة مئوية هنا جهد إضافي على العميل وتكلفة على الجهة. رتّب أسباب التواصل بحسب نسبة تكرارها لتعرف أين تبدأ الإصلاح.",
   "read_en": "Every point here is extra effort for customers and cost for you. Rank contact reasons by repeat rate to see where to start fixing.",
   "freq": "شهرياً، مع تحليل لكل سبب تواصل.",
   "freq_en": "Monthly, analysed by contact reason."
  },
  {
   "id": "aht",
   "type": "operational",
   "q": "بيانات نظام توزيع المكالمات الآلي (ACD) أو منصة مركز الاتصال: زمن المحادثة، وزمن الانتظار على الخط، وزمن العمل بعد المكالمة.",
   "q_en": "Automatic Call Distributor (ACD) or contact-centre platform data: talk time, hold time and after-call work time.",
   "steps": [
    "اجمع زمن المحادثة لجميع المكالمات المعالجة في الفترة.",
    "أضف إليه إجمالي زمن الانتظار على الخط (Hold).",
    "أضف إجمالي زمن العمل بعد المكالمة (After-Call Work).",
    "اقسم المجموع على عدد المكالمات المعالجة."
   ],
   "steps_en": [
    "Sum talk time for all handled calls in the period.",
    "Add total hold time.",
    "Add total after-call work time.",
    "Divide by the number of handled calls."
   ],
   "ex": "في يوم واحد عولجت 600 مكالمة: زمن المحادثة 2,400 دقيقة، والانتظار على الخط 300 دقيقة، والعمل بعد المكالمة 900 دقيقة ← AHT = (2,400 + 300 + 900) ÷ 600 = 3,600 ÷ 600 = 6 دقائق (360 ثانية).",
   "ex_en": "In one day 600 calls were handled: talk 2,400 min, hold 300 min, after-call work 900 min → AHT = (2,400 + 300 + 900) ÷ 600 = 3,600 ÷ 600 = 6 minutes (360 seconds).",
   "read": "هو مدخل لحساب عدد الموظفين المطلوب، لا مقياس لجودة الخدمة. ارتفاعه في سبب تواصل بعينه يدل غالباً على إجراء معقّد أو نظام بطيء لا على موظف بطيء.",
   "read_en": "It is an input for staffing calculations, not a quality measure. A high value for one contact reason usually signals a complex procedure or slow system, not a slow agent.",
   "freq": "يومياً وبالفترة الزمنية (كل 30 دقيقة) لأغراض التخطيط.",
   "freq_en": "Daily and by interval (e.g. every 30 minutes) for planning."
  },
  {
   "id": "asa",
   "type": "operational",
   "q": "بيانات نظام توزيع المكالمات (ACD): زمن الانتظار في الطابور لكل مكالمة أُجيبت.",
   "q_en": "ACD data: queue wait time for each answered call.",
   "steps": [
    "حدد المكالمات التي أجاب عنها موظف خلال الفترة.",
    "اجمع زمن انتظار كل منها في الطابور قبل الرد.",
    "اقسم المجموع على عدد المكالمات المجابة.",
    "اعرض النتيجة لكل ساعة أو فترة، لا متوسطاً يومياً فقط."
   ],
   "steps_en": [
    "Select calls answered by an agent in the period.",
    "Sum each call's queue wait before answer.",
    "Divide by the number of answered calls.",
    "Show it by hour or interval, not just as a daily average."
   ],
   "ex": "أُجيبت 900 مكالمة بإجمالي انتظار 27,000 ثانية ← ASA = 27,000 ÷ 900 = 30 ثانية.",
   "ex_en": "900 calls answered with total wait of 27,000 seconds → ASA = 27,000 ÷ 900 = 30 seconds.",
   "read": "لا يشمل من تركوا المكالمة قبل الرد، فقد يبدو جيداً بينما يفقد المركز كثيراً من المتصلين؛ اقرأه دائماً مع نسبة ترك المكالمات.",
   "read_en": "It excludes callers who hung up before answer, so it can look good while many callers are lost; always read it with abandonment rate.",
   "freq": "لحظياً وبالساعة لإدارة الطوابير.",
   "freq_en": "Real time and hourly for queue management."
  },
  {
   "id": "abandon",
   "type": "operational",
   "q": "بيانات نظام توزيع المكالمات (ACD): المكالمات الواردة، والمتروكة قبل الرد، وزمن الانتظار قبل الترك.",
   "q_en": "ACD data: incoming calls, calls abandoned before answer, and wait time before abandoning.",
   "steps": [
    "حدد حدّ الترك القصير (مثلاً 5 ثوانٍ) واستبعد ما دونه من البسط والمقام معاً.",
    "عُدّ المكالمات المتروكة قبل الرد بعد الاستبعاد.",
    "اقسمها على المكالمات الواردة بعد الاستبعاد.",
    "اضرب في 100."
   ],
   "steps_en": [
    "Set a short-abandon threshold (e.g. 5 seconds) and exclude those calls from both numerator and denominator.",
    "Count calls abandoned before answer after exclusion.",
    "Divide by incoming calls after exclusion.",
    "Multiply by 100."
   ],
   "ex": "وردت 1,000 مكالمة، تُرك منها 120 قبل الرد، منها 20 خلال أقل من 5 ثوانٍ ← نسبة الترك = (120 − 20) ÷ (1,000 − 20) × 100 = 100 ÷ 980 × 100 ≈ 10.2%.",
   "ex_en": "1,000 calls arrived; 120 were abandoned before answer, 20 of them within 5 seconds → abandonment = (120 − 20) ÷ (1,000 − 20) × 100 = 100 ÷ 980 × 100 ≈ 10.2%.",
   "read": "ارتفاعها إشارة مبكرة إلى نقص الطاقة أو طول الانتظار، ويعود كثير من التاركين في محاولة لاحقة فيضخم حجم الطلب. اذكر حدّ الاستبعاد دائماً لأن تغييره يغيّر النسبة.",
   "read_en": "A rise is an early sign of short capacity or long waits, and many abandoners call back, inflating demand. Always state the exclusion threshold, since changing it changes the rate.",
   "freq": "لحظياً وبالساعة، وتقرير يومي.",
   "freq_en": "Real time and hourly, with a daily report."
  },
  {
   "id": "e2e-time",
   "type": "operational",
   "q": "الطوابع الزمنية في أنظمة الطلبات: تاريخ أول تواصل أو تقديم، وتواريخ طلب النواقص واستكمالها، وتاريخ حصول العميل على النتيجة.",
   "q_en": "Timestamps from case systems: date of first contact or application, dates missing items were requested and supplied, and date the customer received the outcome.",
   "steps": [
    "حدد نقطة البداية من منظور العميل (أول تواصل أو تقديم) لا من لحظة قبول الطلب داخلياً.",
    "حدد نقطة النهاية بحصول العميل على النتيجة فعلاً.",
    "احسب الفرق لكل حالة دون إيقاف العداد.",
    "لخّص بالوسيط (Median) والمئين التسعين (P90) لا بالمتوسط وحده، لأن الحالات الطويلة تشوّه المتوسط."
   ],
   "steps_en": [
    "Set the start from the customer's view (first contact or application), not internal acceptance.",
    "Set the end when the customer actually receives the outcome.",
    "Calculate the difference per case without pausing the clock.",
    "Summarise with the median and 90th percentile, not just the mean, because long cases distort the mean."
   ],
   "ex": "قُدّم طلب في 1 مارس، وطُلبت نواقص في 4 مارس، واستُكملت في 10 مارس، وصدر القرار في 18 مارس ← الزمن الكلي = 17 يوماً، بينما يظهر زمن المعالجة الداخلي بعد إيقاف العداد 6 أيام = 17 − 6 = 11 يوماً.",
   "ex_en": "Application on 1 March, missing items requested 4 March, supplied 10 March, decision 18 March → end-to-end = 17 days, while internal processing with the 6-day clock stop shows 17 − 6 = 11 days.",
   "read": "الفجوة بين الزمن الكلي والزمن الداخلي تكشف حجم الانتظار والنواقص التي يتحملها العميل. المئين التسعون يخبرك بما يعيشه العملاء الأسوأ حظاً، وهم مصدر معظم الشكاوى.",
   "read_en": "The gap between end-to-end and internal time shows the waiting and rework customers carry. The 90th percentile shows what the unluckiest customers experience, who generate most complaints.",
   "freq": "شهرياً لكل رحلة، مع متابعة أسبوعية للحالات المتأخرة.",
   "freq_en": "Monthly per journey, with weekly tracking of overdue cases."
  },
  {
   "id": "sla",
   "type": "operational",
   "q": "نظام الطلبات: تاريخ التقديم وتاريخ الإنجاز لكل طلب، والمدة المعلنة في ميثاق الخدمة أو اتفاقية مستوى الخدمة.",
   "q_en": "Case system: submission and completion date for each request, and the published time in the service charter or SLA.",
   "steps": [
    "حدد المدة المعلنة لكل خدمة وطريقة احتسابها (أيام عمل أو تقويمية).",
    "احسب مدة كل طلب منجز خلال الفترة.",
    "عُدّ الطلبات المنجزة ضمن المدة المعلنة.",
    "اقسمها على إجمالي الطلبات المنجزة واضرب في 100، وأفصح عن أي إيقاف للعداد."
   ],
   "steps_en": [
    "Define the published time per service and how it is counted (working or calendar days).",
    "Calculate the duration of each completed request in the period.",
    "Count requests completed within the published time.",
    "Divide by all completed requests, multiply by 100, and disclose any clock stops."
   ],
   "ex": "من 2,000 طلب منجز، والمدة المعلنة 5 أيام عمل، أُنجز 1,700 طلب ضمنها ← الالتزام = 1,700 ÷ 2,000 × 100 = 85%.",
   "ex_en": "Of 2,000 completed requests with a 5-working-day promise, 1,700 were within it → compliance = 1,700 ÷ 2,000 × 100 = 85%.",
   "read": "تقيس الوفاء بوعد الجهة، لكنها لا تخبرك كم تأخرت الطلبات الخارجة عن المدة؛ أضف متوسط التأخير أو المئين التسعين للمتأخرة. احتسب الطلبات المفتوحة المتجاوزة للمدة أيضاً كي لا تُخفى.",
   "read_en": "It measures keeping the promise, but not how late the missed requests were; add mean delay or P90 for late cases. Count open requests already past the deadline too, so they are not hidden.",
   "freq": "أسبوعياً وشهرياً لكل خدمة.",
   "freq_en": "Weekly and monthly per service."
  },
  {
   "id": "reopen",
   "type": "operational",
   "q": "نظام الحالات أو التذاكر: حالة كل تذكرة وتاريخ إغلاقها وأي إعادة فتح لاحقة.",
   "q_en": "Case or ticketing system: each ticket's status, close date and any later reopening.",
   "steps": [
    "حدد الحالات المغلقة خلال الفترة.",
    "حدد نافذة المتابعة (مثلاً 14 يوماً بعد الإغلاق).",
    "عُدّ الحالات التي أُعيد فتحها خلال النافذة.",
    "اقسمها على الحالات المغلقة واضرب في 100."
   ],
   "steps_en": [
    "Select cases closed in the period.",
    "Set a follow-up window (e.g. 14 days after closure).",
    "Count cases reopened within the window.",
    "Divide by closed cases and multiply by 100."
   ],
   "ex": "أُغلقت 1,500 حالة، وأُعيد فتح 90 منها خلال 14 يوماً ← نسبة إعادة الفتح = 90 ÷ 1,500 × 100 = 6%.",
   "ex_en": "1,500 cases were closed and 90 were reopened within 14 days → reopen rate = 90 ÷ 1,500 × 100 = 6%.",
   "read": "تكشف الإغلاق المتعجل قبل الحل الحقيقي، وتشتد دلالتها حين يكون إغلاق الحالات هدفاً للموظفين. ثبّت النافذة الزمنية حتى تصح المقارنة بين الفترات.",
   "read_en": "It reveals rushed closure before real resolution, especially when closing cases is a staff target. Keep the window fixed so periods are comparable.",
   "freq": "شهرياً لكل فريق ونوع حالة.",
   "freq_en": "Monthly by team and case type."
  },
  {
   "id": "complaint-rate",
   "type": "behavioural",
   "q": "سجل الشكاوى من جميع القنوات، وعدد المعاملات المنجزة في الفترة نفسها.",
   "q_en": "Complaints log from all channels, and the number of transactions in the same period.",
   "steps": [
    "اعتمد تعريفاً موحداً للشكوى يميّزها عن الاستفسار والطلب.",
    "عُدّ الشكاوى الواردة خلال الفترة من جميع القنوات.",
    "اقسمها على عدد المعاملات في الفترة نفسها.",
    "اضرب في 1000 لتحصل على المعدل لكل ألف معاملة."
   ],
   "steps_en": [
    "Use one definition of a complaint, distinct from enquiries and requests.",
    "Count complaints received in the period across all channels.",
    "Divide by transactions in the same period.",
    "Multiply by 1,000 to get the rate per thousand transactions."
   ],
   "ex": "وردت 180 شكوى في ربع شهد 240,000 معاملة ← المعدل = 180 ÷ 240,000 × 1000 = 0.75 شكوى لكل ألف معاملة.",
   "ex_en": "180 complaints in a quarter with 240,000 transactions → rate = 180 ÷ 240,000 × 1,000 = 0.75 complaints per 1,000 transactions.",
   "read": "النسبة إلى الحجم تجعل المقارنة بين الخدمات والفترات عادلة. اقرأها مع سهولة تقديم الشكوى ومع ما يرد في وسائل التواصل، لأن انخفاضها قد يعني أن العملاء يئسوا من الشكوى.",
   "read_en": "Normalising by volume makes services and periods comparable. Read it with how easy complaining is and with social media signals, since a fall may mean customers gave up.",
   "freq": "شهرياً وربع سنوي.",
   "freq_en": "Monthly and quarterly."
  },
  {
   "id": "digital-uptake",
   "type": "behavioural",
   "q": "أنظمة الخدمة: عدد المعاملات المكتملة بحسب القناة التي اكتملت فيها.",
   "q_en": "Service systems: completed transactions by the channel in which they were completed.",
   "steps": [
    "حدد المعاملات المكتملة خلال الفترة لخدمة معينة.",
    "عُدّ ما اكتمل منها رقمياً من أوله إلى آخره دون تدخل قناة بشرية.",
    "اقسمه على إجمالي المعاملات المكتملة.",
    "اضرب في 100."
   ],
   "steps_en": [
    "Select completed transactions in the period for a service.",
    "Count those completed fully digitally, end to end, without an assisted channel.",
    "Divide by all completed transactions.",
    "Multiply by 100."
   ],
   "ex": "اكتملت 50,000 معاملة، منها 41,000 رقمياً بالكامل ← الاعتماد الرقمي = 41,000 ÷ 50,000 × 100 = 82%.",
   "ex_en": "50,000 transactions completed, 41,000 fully digitally → digital uptake = 41,000 ÷ 50,000 × 100 = 82%.",
   "read": "تدل على انتقال العملاء إلى القناة الرقمية، لكن ارتفاعها مع ارتفاع التواصل الهاتفي عن الخدمة نفسها يعني أن الخدمة الرقمية تحتاج إلى مساعدة لإكمالها.",
   "read_en": "It shows customers shifting to digital, but if phone contact about the same service rises too, the digital service needs help to complete.",
   "freq": "شهرياً لكل خدمة.",
   "freq_en": "Monthly per service."
  },
  {
   "id": "task-completion",
   "type": "behavioural",
   "q": "تحليلات الويب أو التطبيق (بداية الخدمة وصفحة التأكيد)، أو ملاحظة المشاركين في اختبار قابلية الاستخدام.",
   "q_en": "Web or app analytics (service start and confirmation page), or observing participants in a usability test.",
   "steps": [
    "عرّف نقطة البداية (فتح النموذج مثلاً) ونقطة النجاح (صفحة التأكيد).",
    "عُدّ المستخدمين الفريدين الذين بدأوا المهمة.",
    "عُدّ من وصلوا منهم إلى نقطة النجاح.",
    "اقسم الثاني على الأول واضرب في 100، واستبعد غير المؤهلين إن أمكن تمييزهم."
   ],
   "steps_en": [
    "Define the start (e.g. opening the form) and success point (confirmation page).",
    "Count unique users who started.",
    "Count those who reached success.",
    "Divide the second by the first and multiply by 100, excluding ineligible users where identifiable."
   ],
   "ex": "بدأ 2,400 مستخدم الخدمة وأكملها 1,800 ← نسبة الإكمال = 1,800 ÷ 2,400 × 100 = 75%. وفي اختبار استخدام: أكمل 8 من 10 مشاركين المهمة = 80%.",
   "ex_en": "2,400 users started the service and 1,800 completed it → completion = 1,800 ÷ 2,400 × 100 = 75%. In a usability test: 8 of 10 participants completed the task = 80%.",
   "read": "هي المقياس الأوضح لنجاح الخدمة الرقمية. في الاختبارات الصغيرة تكون النسبة تقريبية، فاعتمد على ما شاهدته من عوائق أكثر من الرقم.",
   "read_en": "It is the clearest measure of digital success. In small tests the rate is approximate, so rely more on the obstacles you observed than on the number.",
   "freq": "مستمراً عبر التحليلات، وفي كل جولة اختبار استخدام.",
   "freq_en": "Continuously via analytics, and in each usability test round."
  },
  {
   "id": "drop-off",
   "type": "behavioural",
   "q": "تحليلات القمع (Funnel Analytics) في الويب أو التطبيق: عدد من وصل إلى كل خطوة ومن انتقل إلى التي تليها.",
   "q_en": "Funnel analytics on web or app: users reaching each step and moving to the next.",
   "steps": [
    "قسّم الرحلة الرقمية إلى خطوات مرقّمة.",
    "عُدّ المستخدمين الفريدين الذين وصلوا إلى الخطوة.",
    "اطرح منهم من انتقلوا إلى الخطوة التالية لتحصل على عدد المغادرين.",
    "اقسم المغادرين على الواصلين واضرب في 100، وكرر لكل خطوة."
   ],
   "steps_en": [
    "Break the digital journey into numbered steps.",
    "Count unique users reaching the step.",
    "Subtract those moving to the next step to get leavers.",
    "Divide leavers by arrivals, multiply by 100, and repeat for each step."
   ],
   "ex": "وصل 1,600 مستخدم إلى الخطوة الثالثة (رفع المستندات) وانتقل 1,240 إلى الرابعة ← المغادرون = 360، والتسرب = 360 ÷ 1,600 × 100 = 22.5%.",
   "ex_en": "1,600 users reached step 3 (upload documents) and 1,240 moved to step 4 → leavers = 360; drop-off = 360 ÷ 1,600 × 100 = 22.5%.",
   "read": "الخطوة ذات التسرب الأعلى هي أولوية الإصلاح. بعض المغادرين يعودون لاحقاً أو يكملون في قناة أخرى، فتتبع العودة قبل الحكم.",
   "read_en": "The step with the highest drop-off is the fix priority. Some leavers return later or finish elsewhere, so track returns before judging.",
   "freq": "أسبوعياً، وبعد كل إطلاق أو تعديل.",
   "freq_en": "Weekly, and after each release or change."
  },
  {
   "id": "sus",
   "type": "perception",
   "q": "استبيان مقياس قابلية الاستخدام القياسي ذو العبارات العشر، يُجاب كل منها على مقياس من 1 (لا أوافق بشدة) إلى 5 (أوافق بشدة)؛ العبارات الفردية إيجابية (مثل «وجدت النظام سهل الاستخدام») والزوجية سلبية (مثل «وجدت النظام معقداً بلا داعٍ»).",
   "q_en": "The standard ten-item System Usability Scale, each answered from 1 (strongly disagree) to 5 (strongly agree); odd items are positive (e.g. \"I thought the system was easy to use\") and even items negative (e.g. \"I found the system unnecessarily complex\").",
   "steps": [
    "للعبارات الفردية (1، 3، 5، 7، 9): اطرح 1 من الإجابة.",
    "للعبارات الزوجية (2، 4، 6، 8، 10): اطرح الإجابة من 5.",
    "اجمع الدرجات العشر المحوّلة (من 0 إلى 40).",
    "اضرب المجموع في 2.5 لتحصل على درجة من 0 إلى 100 لكل مشارك.",
    "خذ متوسط درجات المشاركين لتحصل على درجة النظام."
   ],
   "steps_en": [
    "Odd items (1, 3, 5, 7, 9): subtract 1 from the answer.",
    "Even items (2, 4, 6, 8, 10): subtract the answer from 5.",
    "Sum the ten converted scores (0–40).",
    "Multiply by 2.5 to get a 0–100 score per participant.",
    "Average participants' scores for the system score."
   ],
   "ex": "أجاب مشارك: 4، 2، 5، 1، 4، 2، 5، 2، 4، 1 ← الفردية: (4−1) + (5−1) + (4−1) + (5−1) + (4−1) = 3 + 4 + 3 + 4 + 3 = 17؛ الزوجية: (5−2) + (5−1) + (5−2) + (5−2) + (5−1) = 3 + 4 + 3 + 3 + 4 = 17؛ المجموع 34 × 2.5 = 85.",
   "ex_en": "A participant answered: 4, 2, 5, 1, 4, 2, 5, 2, 4, 1 → odd: (4−1) + (5−1) + (4−1) + (5−1) + (4−1) = 3 + 4 + 3 + 4 + 3 = 17; even: (5−2) + (5−1) + (5−2) + (5−2) + (5−1) = 3 + 4 + 3 + 3 + 4 = 17; total 34 × 2.5 = 85.",
   "read": "الدرجة ليست نسبة مئوية رغم أنها من 100، فلا تقل «85%». أنفع استخداماتها المقارنة بين إصدارين من النظام نفسه بالعبارات والمقياس ذاتهما.",
   "read_en": "The score is not a percentage despite the 0–100 range, so do not say \"85%\". It is most useful for comparing two versions of the same system with the same items and scale.",
   "freq": "في نهاية كل جلسة اختبار استخدام، وعند كل إصدار رئيسي.",
   "freq_en": "At the end of each usability session, and at each major release."
  },
  {
   "id": "churn",
   "type": "outcome",
   "q": "سجلات العملاء أو الاشتراكات: عدد العملاء في بداية الفترة، ومن أنهى العلاقة أو توقف عن الشراء خلالها.",
   "q_en": "Customer or subscription records: customers at the start of the period and those who ended the relationship or stopped buying during it.",
   "steps": [
    "عرّف المغادرة: إلغاء العقد، أو عدم التجديد، أو انقطاع الشراء مدة محددة.",
    "عُدّ العملاء في بداية الفترة.",
    "عُدّ من غادر منهم خلال الفترة، دون احتساب العملاء الجدد المكتسبين أثناءها.",
    "اقسم المغادرين على عملاء البداية واضرب في 100."
   ],
   "steps_en": [
    "Define leaving: cancellation, non-renewal or no purchase for a set time.",
    "Count customers at the start of the period.",
    "Count how many of them left during the period, excluding new customers acquired.",
    "Divide leavers by starting customers and multiply by 100."
   ],
   "ex": "بدأت السنة بـ20,000 عميل، وغادر منهم 1,200 ← التسرب = 1,200 ÷ 20,000 × 100 = 6% سنوياً.",
   "ex_en": "The year started with 20,000 customers; 1,200 of them left → churn = 1,200 ÷ 20,000 × 100 = 6% a year.",
   "read": "هو الوجه المقابل للاحتفاظ (الاحتفاظ = 100% − التسرب إذا حُسبا على المجموعة نفسها). حلّل أسباب المغادرة وربطها بالتجربة السابقة لها لتعرف ما يمكن منعه.",
   "read_en": "It is the mirror of retention (retention = 100% − churn on the same cohort). Analyse reasons for leaving and the experience before it to see what is preventable.",
   "freq": "شهرياً للاشتراكات، وسنوياً للعلاقات الطويلة.",
   "freq_en": "Monthly for subscriptions, annually for longer relationships."
  },
  {
   "id": "clv",
   "type": "outcome",
   "q": "بيانات المبيعات والمالية: متوسط قيمة الشراء، وعدد مرات الشراء في السنة، ومتوسط عمر العلاقة (ويُقدّر من معدل التسرب: 1 ÷ التسرب السنوي)، وهامش الربح.",
   "q_en": "Sales and finance data: average purchase value, purchases per year, average relationship length (estimable as 1 ÷ annual churn), and margin.",
   "steps": [
    "احسب متوسط قيمة الشراء الواحد.",
    "اضربه في متوسط عدد مرات الشراء في السنة لتحصل على الإيراد السنوي للعميل.",
    "اضرب الناتج في متوسط عدد سنوات العلاقة لتحصل على قيمة الإيراد مدى العلاقة.",
    "اضرب في هامش الربح لتحصل على قيمة الربح، وهي الصيغة الأدق للقرار.",
    "وثّق الافتراضات، ويمكن خصم التدفقات المستقبلية بسعر خصم لنسخة أكثر تحفظاً."
   ],
   "steps_en": [
    "Calculate average value per purchase.",
    "Multiply by average purchases per year to get annual revenue per customer.",
    "Multiply by average relationship years to get lifetime revenue.",
    "Multiply by margin to get lifetime profit, the better figure for decisions.",
    "Document assumptions; future cash flows can be discounted for a more conservative version."
   ],
   "ex": "متوسط الشراء 250 ريالاً × 4 مرات سنوياً = 1,000 ريال سنوياً × 5 سنوات = 5,000 ريال إيراداً؛ وبهامش 30%: 5,000 × 0.30 = 1,500 ريال ربحاً مدى العلاقة.",
   "ex_en": "Average purchase SAR 250 × 4 times a year = SAR 1,000 a year × 5 years = SAR 5,000 revenue; at a 30% margin: 5,000 × 0.30 = SAR 1,500 lifetime profit.",
   "read": "تبيّن كم يستحق الاحتفاظ بالعميل أن يُنفق عليه. قارنها بين شرائح العملاء وقبل التحسين وبعده بدلاً من التعامل معها رقماً مطلقاً.",
   "read_en": "It shows how much keeping a customer is worth spending. Compare it across segments and before/after improvements rather than treating it as an absolute figure.",
   "freq": "سنوياً، أو عند إعداد حالة عمل لمبادرة.",
   "freq_en": "Annually, or when building a business case."
  },
  {
   "id": "cost-to-serve",
   "type": "outcome",
   "q": "بيانات المالية والتشغيل: تكاليف الموظفين والأنظمة والمرافق الموزعة على القنوات، وعدد المعاملات في كل قناة.",
   "q_en": "Finance and operations data: staff, system and facility costs allocated to channels, and transactions per channel.",
   "steps": [
    "حدد عناصر التكلفة المباشرة وغير المباشرة لكل قناة (موظفون، أنظمة، مبانٍ، تعهيد).",
    "وزّع التكاليف المشتركة على القنوات بأساس معلن (كالوقت أو الحجم).",
    "اقسم تكلفة كل قناة على عدد معاملاتها.",
    "احسب المتوسط الكلي إن احتجت إليه، واعرضه مع تفصيل القنوات."
   ],
   "steps_en": [
    "Identify direct and indirect costs per channel (staff, systems, premises, outsourcing).",
    "Allocate shared costs to channels on a stated basis (time or volume).",
    "Divide each channel's cost by its transactions.",
    "Calculate the overall average if needed, and show it with the channel breakdown."
   ],
   "ex": "مركز الاتصال: 1,200,000 ريال ÷ 60,000 معاملة = 20 ريالاً للمعاملة؛ الرقمي: 300,000 ريال ÷ 150,000 معاملة = 2 ريال؛ المتوسط الكلي = 1,500,000 ÷ 210,000 ≈ 7.14 ريالات.",
   "ex_en": "Contact centre: SAR 1,200,000 ÷ 60,000 transactions = SAR 20 each; digital: SAR 300,000 ÷ 150,000 = SAR 2; overall = 1,500,000 ÷ 210,000 ≈ SAR 7.14.",
   "read": "الفرق بين القنوات يوضح عائد نقل المعاملات إلى الرقمي وعائد منع التواصل غير الضروري. لا تحكم بانخفاض التكلفة إن صاحبه ارتفاع التكرار أو الشكاوى.",
   "read_en": "The channel gap shows the return from moving transactions to digital and preventing avoidable contact. Lower cost is no win if repeats or complaints rise with it.",
   "freq": "ربع سنوي أو سنوي.",
   "freq_en": "Quarterly or annually."
  },
  {
   "id": "enps",
   "type": "perception",
   "q": "«على مقياس من 0 إلى 10، ما مدى احتمال أن توصي بـ[الجهة] مكاناً للعمل لصديق أو معارف؟»، في استبيان سري.",
   "q_en": "\"On a scale of 0 to 10, how likely are you to recommend [organisation] as a place to work to a friend?\", in an anonymous survey.",
   "steps": [
    "صنّف الإجابات: مروّجون 9–10، ومحايدون 7–8، ومنتقدون 0–6.",
    "احسب نسبة كل من المروّجين والمنتقدين من إجمالي المجيبين.",
    "اطرح نسبة المنتقدين من نسبة المروّجين.",
    "لا تعرض نتائج الفرق الصغيرة (مثلاً أقل من 5–10 مجيبين) حفاظاً على السرية."
   ],
   "steps_en": [
    "Classify answers: promoters 9–10, passives 7–8, detractors 0–6.",
    "Calculate promoter and detractor shares of all respondents.",
    "Subtract the detractor share from the promoter share.",
    "Do not report very small teams (e.g. under 5–10 respondents) to protect anonymity."
   ],
   "ex": "من 250 موظفاً مجيباً: 90 مروّجاً (36%)، و100 محايد (40%)، و60 منتقداً (24%) ← eNPS = 36 − 24 = ‎+12.",
   "ex_en": "Of 250 responding employees: 90 promoters (36%), 100 passives (40%), 60 detractors (24%) → eNPS = 36 − 24 = +12.",
   "read": "مؤشر سريع لمزاج الموظفين، وأهميته في الفرق الأمامية لأن تجربة الموظف تنعكس على تجربة العميل. اقرنه بسؤال مفتوح وبمؤشرات الدوران الوظيفي.",
   "read_en": "A quick read of staff sentiment, especially important in front-line teams because employee experience shows up in customer experience. Pair it with an open question and attrition data.",
   "freq": "ربع سنوي أو نصف سنوي.",
   "freq_en": "Quarterly or half-yearly."
  },
  {
   "id": "response-rate",
   "type": "operational",
   "q": "منصة الاستبيانات: عدد الدعوات المرسلة، والدعوات غير المسلّمة، والاستجابات المكتملة.",
   "q_en": "Survey platform: invitations sent, undeliverable invitations and completed responses.",
   "steps": [
    "عُدّ الدعوات المرسلة خلال الفترة.",
    "اطرح الدعوات التي لم تصل (بريد مرتد، رقم خاطئ) إن أردت الصيغة المعدّلة، وأفصح عن ذلك.",
    "عُدّ الاستجابات المكتملة.",
    "اقسم المكتملة على الدعوات (المرسلة أو الواصلة) واضرب في 100."
   ],
   "steps_en": [
    "Count invitations sent in the period.",
    "Subtract undeliverable invitations (bounces, wrong numbers) for the adjusted version, and say so.",
    "Count completed responses.",
    "Divide completes by invitations (sent or delivered) and multiply by 100."
   ],
   "ex": "أُرسلت 5,000 دعوة، وأكمل 600 مستجيب ← الاستجابة = 600 ÷ 5,000 × 100 = 12%؛ وبعد استبعاد 200 دعوة لم تصل: 600 ÷ 4,800 × 100 = 12.5%.",
   "ex_en": "5,000 invitations sent and 600 completed → response rate = 600 ÷ 5,000 × 100 = 12%; excluding 200 undelivered: 600 ÷ 4,800 × 100 = 12.5%.",
   "read": "النسبة وحدها لا تضمن التمثيل؛ قارن تركيب المجيبين (القناة، والعمر، والمنطقة، ونوع الخدمة) بتركيب العملاء، ورجّح النتائج عند الحاجة.",
   "read_en": "The rate alone does not guarantee representativeness; compare respondents' mix (channel, age, region, service) with the customer base, and weight results where needed.",
   "freq": "مع كل موجة استبيان، ومراجعة شهرية.",
   "freq_en": "With each survey wave, and a monthly review."
  },
  {
   "id": "cx-index",
   "type": "composite",
   "g": "perception",
   "n": "مؤشر تجربة العميل (فورستر)",
   "n_en": "Forrester CX Index",
   "a": "CX Index",
   "f": "مؤشر مركّب: مقاييس جودة التجربة (الفاعلية، والسهولة، والعاطفة) مرجّحة بأثرها في الولاء داخل كل قطاع وسوق",
   "f_en": "Composite: CX quality measures (effectiveness, ease, emotion) weighted by their impact on loyalty in each industry and market",
   "sc": "0–100",
   "sc_en": "0–100",
   "d": "مؤشر مملوك لشركة فورستر يقيس مدى نجاح الجهة في تقديم تجارب تبني ولاء العملاء وتحافظ عليه.",
   "d_en": "A proprietary Forrester index measuring how well an organisation delivers experiences that build and sustain loyalty.",
   "u": "المقارنة المعيارية بين العلامات والجهات الحكومية داخل القطاع، ومحاكاة منطقه في برنامجك الداخلي.",
   "u_en": "Benchmarking brands and government agencies within an industry, and borrowing its logic for internal programmes.",
   "x": "خوارزميته وأوزانه غير منشورة، فلا يمكن إعادة حساب الدرجة الرسمية داخلياً، ونتائجه التفصيلية متاحة لعملاء فورستر.",
   "x_en": "Its algorithm and weights are not published, so the official score cannot be reproduced in-house, and detailed results are for Forrester clients.",
   "q": "استبيان معياري تجريه فورستر على عينة ممثلة وطنياً من العملاء الحاليين الذين تعاملوا مباشرة مع العلامة خلال الأشهر الاثني عشر الماضية، ويسأل عن جودة التجربة والولاء ومحركات التجربة.",
   "q_en": "A benchmark survey Forrester runs on a nationally representative sample of current customers who interacted directly with the brand in the past 12 months, covering CX quality, loyalty and CX drivers.",
   "steps": [
    "يقيّم كل مستجيب علامة واحدة يُسند إليها عشوائياً داخل القطاع.",
    "تُقاس جودة التجربة بأبعادها الثلاثة: الفاعلية (Effectiveness) والسهولة (Ease) والعاطفة (Emotion).",
    "يُقدَّر أثر كل بُعد في الولاء إحصائياً لكل قطاع وسوق، ويُستعمل هذا الأثر وزناً.",
    "تُحسب درجة لكل مستجيب بالخوارزمية، ودرجة العلامة هي متوسط درجات عملائها في العينة."
   ],
   "steps_en": [
    "Each respondent rates one brand randomly assigned within the industry.",
    "CX quality is measured on three dimensions: effectiveness, ease and emotion.",
    "Each dimension's impact on loyalty is estimated statistically per industry and market and used as its weight.",
    "A score is computed per respondent by the algorithm; the brand score is the average of its customers' scores."
   ],
   "ex": "مثال توضيحي بأوزان افتراضية لا تمثل أوزان فورستر: الفاعلية 70، والسهولة 66، والعاطفة 60، بأوزان 0.3 و0.3 و0.4 ← الدرجة = 70×0.3 + 66×0.3 + 60×0.4 = 21 + 19.8 + 24 = 64.8 من 100.",
   "ex_en": "Illustration with hypothetical weights, not Forrester's: effectiveness 70, ease 66, emotion 60, weighted 0.3, 0.3, 0.4 → score = 70×0.3 + 66×0.3 + 60×0.4 = 21 + 19.8 + 24 = 64.8 out of 100.",
   "read": "الدرجة تعبّر عن جودة التجربة بالقدر الذي يحرّك الولاء، لا عن الرضا المجرد. أنفع ما فيها ترتيبك بين نظرائك واتجاهك عبر السنين، والبعد الذي تتأخر فيه.",
   "read_en": "The score reflects CX quality to the extent it drives loyalty, not satisfaction alone. Its most useful parts are your rank among peers, your trend over years and the lagging dimension.",
   "freq": "سنوي (تصدره فورستر).",
   "freq_en": "Annual (published by Forrester)."
  },
  {
   "id": "csat-score-avg",
   "type": "perception",
   "g": "perception",
   "n": "متوسط درجة الرضا",
   "n_en": "Mean satisfaction score",
   "a": "",
   "f": "مجموع (الدرجة × عدد من اختارها) ÷ إجمالي المجيبين؛ ويمكن تحويله إلى 0–100: (المتوسط − 1) ÷ 4 × 100",
   "f_en": "Sum of (score × count) ÷ all respondents; convertible to 0–100: (mean − 1) ÷ 4 × 100",
   "sc": "1–5 (أو 0–100 بعد التحويل)",
   "sc_en": "1–5 (or 0–100 after conversion)",
   "d": "يلخّص إجابات سؤال الرضا بالمتوسط الحسابي بدلاً من نسبة الخانتين العلويتين، فيستعمل المعلومات في كل درجات المقياس.",
   "d_en": "Summarises satisfaction answers as an arithmetic mean instead of the top-2-box share, using information from every point of the scale.",
   "u": "حين تريد التقاط التحسن داخل الخانات الوسطى والدنيا، أو للتحليل الإحصائي والارتباطات.",
   "u_en": "When you want to capture movement in the middle and lower boxes, or for statistical analysis and correlations.",
   "x": "لا تقارن متوسطاً بنسبة خانتين علويتين؛ فهما رقمان مختلفان من البيانات نفسها.",
   "x_en": "Never compare a mean with a top-2-box share; they are different numbers from the same data.",
   "q": "سؤال الرضا نفسه: «ما مدى رضاك عن [الخدمة]؟» على مقياس من 1 إلى 5.",
   "q_en": "The same satisfaction question: \"How satisfied are you with [service]?\" on a 1–5 scale.",
   "steps": [
    "اضرب كل درجة في عدد من اختاروها.",
    "اجمع حواصل الضرب.",
    "اقسم المجموع على عدد المجيبين لتحصل على المتوسط من 5.",
    "للتحويل إلى مقياس من 0 إلى 100: اطرح 1 من المتوسط، واقسم على 4، واضرب في 100."
   ],
   "steps_en": [
    "Multiply each score by the number choosing it.",
    "Sum the products.",
    "Divide by respondents to get the mean out of 5.",
    "To convert to 0–100: subtract 1 from the mean, divide by 4, multiply by 100."
   ],
   "ex": "البيانات نفسها في مثال الرضا (400 مجيب): 180×5 + 132×4 + 48×3 + 24×2 + 16×1 = 900 + 528 + 144 + 48 + 16 = 1,636 ← المتوسط = 1,636 ÷ 400 = 4.09 من 5، وبالتحويل: (4.09 − 1) ÷ 4 × 100 ≈ 77.3 من 100؛ بينما الخانتان العلويتان = 78%.",
   "ex_en": "Same data as the CSAT example (400 respondents): 180×5 + 132×4 + 48×3 + 24×2 + 16×1 = 900 + 528 + 144 + 48 + 16 = 1,636 → mean = 1,636 ÷ 400 = 4.09 out of 5; converted: (4.09 − 1) ÷ 4 × 100 ≈ 77.3 out of 100; while top-2-box = 78%.",
   "read": "المتوسط يتحرك إذا انتقل العملاء من 1 إلى 3 مثلاً، بينما لا تتحرك نسبة الخانتين العلويتين. استعمل أحدهما مؤشراً رسمياً ثابتاً والآخر للتشخيص.",
   "read_en": "The mean moves if customers shift from 1 to 3, while top-2-box does not. Use one as your fixed headline metric and the other for diagnosis.",
   "freq": "مع كل قياس رضا إجرائي.",
   "freq_en": "With every transactional satisfaction survey."
  },
  {
   "id": "goal-completion",
   "type": "perception",
   "g": "perception",
   "n": "تحقق غاية العميل",
   "n_en": "Customer goal completion",
   "a": "",
   "f": "من أجابوا «نعم، بالكامل» ÷ إجمالي المجيبين × 100",
   "f_en": "Respondents answering \"yes, fully\" ÷ all respondents × 100",
   "sc": "0–100%",
   "sc_en": "0–100%",
   "d": "يقيس هل حصل العميل على النتيجة التي جاء من أجلها، بصرف النظر عن لطف التعامل أو سرعته.",
   "d_en": "Measures whether customers got the outcome they came for, regardless of how pleasant or quick it was.",
   "u": "بعد إكمال الرحلة أو زيارة الموقع أو التواصل، وهو من أصدق مؤشرات نجاح الخدمة.",
   "u_en": "After a journey, website visit or contact; one of the truest measures of service success.",
   "x": "العميل غير المؤهل للخدمة قد يجيب «لا» وإن أُدّيت الخدمة على وجهها؛ أضف سؤالاً عن السبب.",
   "x_en": "An ineligible customer may answer \"no\" even when the service worked properly; add a reason question.",
   "q": "«هل أنجزت اليوم ما جئت من أجله؟» (نعم بالكامل / جزئياً / لا)، ويتبعه سؤال «ما الذي منعك؟» لمن أجاب بغير «نعم».",
   "q_en": "\"Did you achieve what you came to do today?\" (yes, fully / partly / no), followed by \"What stopped you?\" for anyone not answering yes.",
   "steps": [
    "اطرح السؤال عقب انتهاء الرحلة أو الزيارة مباشرة.",
    "عُدّ من أجابوا «نعم، بالكامل».",
    "اقسمهم على إجمالي المجيبين واضرب في 100.",
    "اعرض نسبة «جزئياً» و«لا» منفصلتين، وصنّف أسباب الإخفاق."
   ],
   "steps_en": [
    "Ask right after the journey or visit ends.",
    "Count \"yes, fully\" answers.",
    "Divide by all respondents and multiply by 100.",
    "Report \"partly\" and \"no\" separately and categorise failure reasons."
   ],
   "ex": "من 800 مجيب: 600 «نعم بالكامل»، و120 «جزئياً»، و80 «لا» ← تحقق الغاية = 600 ÷ 800 × 100 = 75%، والجزئي 15%، والإخفاق 10%.",
   "ex_en": "Of 800 respondents: 600 \"yes, fully\", 120 \"partly\", 80 \"no\" → goal completion = 600 ÷ 800 × 100 = 75%; partly 15%; failed 10%.",
   "read": "يكشف الفجوة بين خدمة «مُرضية» وخدمة «ناجحة»؛ فقد يرضى العميل عن الموظف ولا يخرج بنتيجة. أسباب الإخفاق هي قائمة التحسين الأولى.",
   "read_en": "It exposes the gap between a \"pleasant\" and a \"successful\" service: customers may like the agent yet leave without an outcome. Failure reasons are the first improvement list.",
   "freq": "إجرائي: بعد كل رحلة أو زيارة، وتقرير شهري.",
   "freq_en": "Transactional: after each journey or visit, reported monthly."
  },
  {
   "id": "time-to-resolution",
   "type": "operational",
   "g": "operations",
   "n": "زمن الحل",
   "n_en": "Time to resolution",
   "a": "TTR",
   "f": "تاريخ الحل − تاريخ فتح الحالة، ويُلخّص بالوسيط والمئين التسعين",
   "f_en": "Resolution date − case open date, summarised by median and 90th percentile",
   "sc": "ساعات أو أيام",
   "sc_en": "hours or days",
   "d": "الزمن من تسجيل مشكلة العميل أو طلبه حتى حلّه فعلاً.",
   "d_en": "Time from logging a customer's problem or request until it is actually solved.",
   "u": "إدارة الشكاوى والبلاغات والدعم الفني.",
   "u_en": "Managing complaints, incidents and technical support.",
   "x": "إن حُسب حتى «الإغلاق» لا «الحل» فقد يُخفي الإغلاق المتعجل؛ اقرأه مع إعادة الفتح.",
   "x_en": "If measured to \"closure\" rather than \"resolution\" it can hide rushed closures; read it with reopen rate.",
   "q": "نظام الحالات أو التذاكر: تاريخ ووقت فتح الحالة وتاريخ ووقت حلّها.",
   "q_en": "Case or ticketing system: date and time each case was opened and resolved.",
   "steps": [
    "حدد الحالات المحلولة خلال الفترة.",
    "احسب لكل حالة الفرق بين وقت الحل ووقت الفتح.",
    "رتّب الأزمنة واستخرج الوسيط والمئين التسعين، إلى جانب المتوسط.",
    "اعرض النتائج لكل نوع حالة ودرجة أولوية."
   ],
   "steps_en": [
    "Select cases resolved in the period.",
    "For each, subtract open time from resolution time.",
    "Sort durations and take the median and 90th percentile, alongside the mean.",
    "Report by case type and priority."
   ],
   "ex": "خمس حالات حُلّت في 2 و4 و6 و10 و48 ساعة ← المتوسط = (2 + 4 + 6 + 10 + 48) ÷ 5 = 70 ÷ 5 = 14 ساعة، والوسيط = 6 ساعات؛ فحالة واحدة طويلة ضاعفت المتوسط.",
   "ex_en": "Five cases resolved in 2, 4, 6, 10 and 48 hours → mean = (2 + 4 + 6 + 10 + 48) ÷ 5 = 70 ÷ 5 = 14 hours; median = 6 hours; one long case more than doubled the mean.",
   "read": "الوسيط يصف التجربة المعتادة، والمئين التسعون يصف أسوأ التجارب. اتساع الفجوة بينهما يدل على حالات عالقة تحتاج إلى مسار تصعيد.",
   "read_en": "The median describes the typical case and the 90th percentile the worst. A widening gap signals stuck cases that need an escalation path.",
   "freq": "أسبوعياً وشهرياً.",
   "freq_en": "Weekly and monthly."
  },
  {
   "id": "contact-rate",
   "type": "behavioural",
   "g": "operations",
   "n": "معدل التواصل",
   "n_en": "Contact rate",
   "a": "",
   "f": "عدد التواصلات المساعَدة ÷ عدد العملاء النشطين (أو ÷ عدد المعاملات × 1000)",
   "f_en": "Assisted contacts ÷ active customers (or ÷ transactions × 1,000)",
   "sc": "تواصل لكل عميل أو لكل ألف معاملة",
   "sc_en": "contacts per customer or per 1,000 transactions",
   "d": "كم مرة يحتاج العملاء إلى التواصل مع الجهة منسوباً إلى حجم قاعدة العملاء أو المعاملات.",
   "d_en": "How often customers need to contact you, relative to the customer base or transaction volume.",
   "u": "قياس أثر تبسيط الخدمات والخدمة الذاتية في خفض الطلب على القنوات المساعَدة.",
   "u_en": "Measuring how simplification and self-service reduce demand on assisted channels.",
   "x": "انخفاضه جيد فقط إذا لم يكن سببه صعوبة الوصول إلى القنوات.",
   "x_en": "A fall is good only if it is not caused by channels becoming hard to reach.",
   "q": "سجلات التواصل في جميع القنوات المساعَدة، وعدد العملاء النشطين أو المعاملات في الفترة.",
   "q_en": "Contact logs across assisted channels, and the number of active customers or transactions in the period.",
   "steps": [
    "عُدّ جميع التواصلات المساعَدة (هاتف، ومحادثة، وبريد، وفروع) في الفترة.",
    "حدد المقام: العملاء النشطون، أو المعاملات.",
    "اقسم التواصلات على المقام.",
    "اضرب في 1000 إن كان المقام معاملات، وحلّل النتيجة لكل سبب تواصل."
   ],
   "steps_en": [
    "Count all assisted contacts (phone, chat, email, branches) in the period.",
    "Choose the denominator: active customers or transactions.",
    "Divide contacts by the denominator.",
    "Multiply by 1,000 if using transactions, and break down by contact reason."
   ],
   "ex": "45,000 تواصل في شهر لدى 150,000 عميل نشط ← 45,000 ÷ 150,000 = 0.30 تواصل لكل عميل؛ وإن كانت المعاملات 300,000: 45,000 ÷ 300,000 × 1000 = 150 تواصلاً لكل ألف معاملة.",
   "ex_en": "45,000 contacts in a month with 150,000 active customers → 45,000 ÷ 150,000 = 0.30 contacts per customer; with 300,000 transactions: 45,000 ÷ 300,000 × 1,000 = 150 per 1,000 transactions.",
   "read": "يعكس مقدار ما تستدعيه الخدمة من مساعدة؛ وارتفاعه لسبب بعينه يدل على خطوة غامضة أو معلومة ناقصة. اقرأه مع الطلب الناتج عن الإخفاق.",
   "read_en": "It reflects how much help the service demands; a rise for one reason points to an unclear step or missing information. Read it with failure demand.",
   "freq": "شهرياً لكل سبب تواصل.",
   "freq_en": "Monthly by contact reason."
  },
  {
   "id": "failure-demand",
   "type": "operational",
   "g": "operations",
   "n": "الطلب الناتج عن الإخفاق",
   "n_en": "Failure demand",
   "a": "",
   "f": "التواصلات الناتجة عن إخفاق سابق أو غموض ÷ إجمالي التواصلات المصنّفة × 100",
   "f_en": "Contacts caused by an earlier failure or unclear information ÷ all classified contacts × 100",
   "sc": "0–100%",
   "sc_en": "0–100%",
   "d": "نسبة التواصل الذي ما كان ليحدث لو أُديت الخدمة صحيحة من أول مرة، كالسؤال عن حالة طلب متأخر أو استيضاح رسالة غامضة.",
   "d_en": "Share of contact that would not happen if the service worked right first time, such as chasing a late request or clarifying a confusing letter.",
   "u": "تحديد التواصل الذي يمكن منعه وبناء حالة عمل للتبسيط.",
   "u_en": "Identifying preventable contact and building a case for simplification.",
   "x": "يحتاج تصنيفاً يدوياً متسقاً لعينة من التواصلات؛ درّب المصنّفين على تعريف واحد.",
   "x_en": "Needs consistent manual classification of a contact sample; train classifiers on one definition.",
   "q": "عينة من التواصلات (تسجيلات مكالمات أو محادثات) يصنّفها فريق مدرّب إلى طلب قيمة (Value Demand) أو طلب ناتج عن إخفاق (Failure Demand).",
   "q_en": "A sample of contacts (call recordings or chats) classified by a trained team as value demand or failure demand.",
   "steps": [
    "اسحب عينة عشوائية ممثلة من التواصلات (مثلاً 500 تواصل).",
    "صنّف كل تواصل: طلب قيمة (أول طلب للخدمة) أو طلب إخفاق (متابعة، أو تكرار، أو تصحيح خطأ، أو استيضاح).",
    "عُدّ تواصلات الإخفاق.",
    "اقسمها على إجمالي العينة واضرب في 100، ثم رتّب أسبابها."
   ],
   "steps_en": [
    "Draw a random representative sample of contacts (e.g. 500).",
    "Classify each as value demand (first request for the service) or failure demand (chasing, repeat, fixing an error, clarifying).",
    "Count failure-demand contacts.",
    "Divide by the sample total, multiply by 100, then rank the causes."
   ],
   "ex": "من عينة 500 تواصل: 190 تواصلاً للسؤال عن طلبات متأخرة أو تكرار أو استيضاح رسائل ← الطلب الناتج عن الإخفاق = 190 ÷ 500 × 100 = 38%.",
   "ex_en": "In a sample of 500 contacts: 190 were chasing late requests, repeats or clarifying letters → failure demand = 190 ÷ 500 × 100 = 38%.",
   "read": "كل تواصل ناتج عن إخفاق تكلفة بلا قيمة وجهد على العميل. إصلاح أكبر ثلاثة أسباب يخفض حجم التواصل أكثر مما يخفضه تسريع المعالجة.",
   "read_en": "Every failure-demand contact is cost without value and effort for the customer. Fixing the top three causes cuts volume more than faster handling does.",
   "freq": "ربع سنوي بعينة، وبعد التغييرات الكبيرة.",
   "freq_en": "Quarterly by sample, and after major changes."
  },
  {
   "id": "sentiment",
   "type": "perception",
   "g": "perception",
   "n": "صافي المشاعر",
   "n_en": "Net sentiment",
   "a": "",
   "f": "(التعليقات الإيجابية − التعليقات السلبية) ÷ إجمالي التعليقات × 100",
   "f_en": "(positive comments − negative comments) ÷ all comments × 100",
   "sc": "من −100 إلى +100",
   "sc_en": "−100 to +100",
   "d": "يلخّص نبرة ما يكتبه العملاء أو يقولونه، مستخلصاً بتحليل النصوص (Text Analytics) أو الكلام آلياً.",
   "d_en": "Summarises the tone of what customers write or say, extracted automatically through text or speech analytics.",
   "u": "تحليل التعليقات المفتوحة، والشكاوى، ووسائل التواصل، ونصوص المكالمات على نطاق واسع.",
   "u_en": "Analysing open comments, complaints, social media and call transcripts at scale.",
   "x": "دقة التصنيف الآلي في العربية ولهجاتها متفاوتة؛ راجع عينة يدوياً قبل الاعتماد على الرقم.",
   "x_en": "Automatic classification accuracy varies for Arabic and its dialects; check a sample by hand before relying on the number.",
   "q": "نصوص التعليقات المفتوحة في الاستبيانات، والشكاوى، ومنشورات وسائل التواصل، ونصوص المكالمات المحوّلة آلياً، بعد تصنيفها إيجابية أو محايدة أو سلبية.",
   "q_en": "Open survey comments, complaints, social posts and transcribed calls, classified as positive, neutral or negative.",
   "steps": [
    "اجمع النصوص من المصدر المحدد خلال الفترة.",
    "صنّف كل نص إيجابياً أو محايداً أو سلبياً آلياً، وتحقق يدوياً من عينة.",
    "اطرح عدد السلبية من عدد الإيجابية.",
    "اقسم الفرق على إجمالي النصوص واضرب في 100، وأفصح إن استبعدت المحايدة من المقام."
   ],
   "steps_en": [
    "Collect texts from the chosen source for the period.",
    "Classify each as positive, neutral or negative automatically, checking a sample by hand.",
    "Subtract negatives from positives.",
    "Divide by all texts and multiply by 100; state it if neutrals are excluded from the denominator."
   ],
   "ex": "من 2,000 تعليق: 900 إيجابي، و600 محايد، و500 سلبي ← صافي المشاعر = (900 − 500) ÷ 2,000 × 100 = ‎+20؛ وباستبعاد المحايد: 400 ÷ 1,400 × 100 ≈ ‎+28.6.",
   "ex_en": "Of 2,000 comments: 900 positive, 600 neutral, 500 negative → net sentiment = (900 − 500) ÷ 2,000 × 100 = +20; excluding neutrals: 400 ÷ 1,400 × 100 ≈ +28.6.",
   "read": "قيمته الحقيقية في الموضوعات المرتبطة بالمشاعر السلبية لا في الرقم الكلي. لا تقارن قيمتين حُسبتا بتعريفين مختلفين للمقام أو بأداتين مختلفتين.",
   "read_en": "Its real value is in the topics behind negative sentiment, not the headline number. Never compare values computed with different denominators or tools.",
   "freq": "مستمراً، مع تقرير أسبوعي أو شهري.",
   "freq_en": "Continuous, with a weekly or monthly report."
  },
  {
   "id": "retention",
   "type": "outcome",
   "g": "value",
   "n": "معدل الاحتفاظ",
   "n_en": "Customer retention rate",
   "a": "CRR",
   "f": "(العملاء في نهاية الفترة − العملاء الجدد خلالها) ÷ العملاء في بداية الفترة × 100",
   "f_en": "(customers at end − new customers during the period) ÷ customers at start × 100",
   "sc": "0–100%",
   "sc_en": "0–100%",
   "d": "نسبة العملاء القائمين في بداية الفترة الذين بقوا حتى نهايتها.",
   "d_en": "Share of customers at the start of a period who are still customers at the end.",
   "u": "القطاعات التنافسية وخدمات الاشتراك والعقود.",
   "u_en": "Competitive sectors, subscriptions and contracts.",
   "x": "لا تخلطه بنمو قاعدة العملاء؛ فقد تنمو القاعدة بالاكتساب بينما يتسرب العملاء القدامى.",
   "x_en": "Do not confuse it with customer base growth; the base can grow through acquisition while existing customers leak away.",
   "q": "سجلات العملاء أو الاشتراكات: العدد في بداية الفترة ونهايتها، والعملاء الجدد المكتسبون خلالها.",
   "q_en": "Customer or subscription records: counts at the start and end of the period, and new customers acquired during it.",
   "steps": [
    "عُدّ العملاء في بداية الفترة.",
    "عُدّ العملاء في نهايتها.",
    "اطرح من عدد النهاية العملاء الجدد المكتسبين خلال الفترة.",
    "اقسم الناتج على عدد البداية واضرب في 100."
   ],
   "steps_en": [
    "Count customers at the start of the period.",
    "Count customers at the end.",
    "Subtract new customers acquired during the period from the end count.",
    "Divide by the start count and multiply by 100."
   ],
   "ex": "بداية السنة 20,000 عميل، ونهايتها 21,500، واكتُسب خلالها 2,700 عميل جديد ← الاحتفاظ = (21,500 − 2,700) ÷ 20,000 × 100 = 18,800 ÷ 20,000 × 100 = 94%، وهو مكمّل لتسرب 6%.",
   "ex_en": "Start of year 20,000 customers, end 21,500, with 2,700 new acquired → retention = (21,500 − 2,700) ÷ 20,000 × 100 = 18,800 ÷ 20,000 × 100 = 94%, the complement of 6% churn.",
   "read": "كل نقطة احتفاظ تضيف إلى قيمة العميل مدى العلاقة لأنها تطيل عمرها. حلّله بحسب الشريحة وبحسب تجربة العميل السابقة (مثل من قدّم شكوى ومن لم يقدّم).",
   "read_en": "Each retention point adds to lifetime value by lengthening the relationship. Analyse by segment and by prior experience (e.g. complainants vs non-complainants).",
   "freq": "شهرياً أو ربع سنوي أو سنوياً بحسب دورة الشراء.",
   "freq_en": "Monthly, quarterly or annually depending on the purchase cycle."
  },
  {
   "id": "share-of-wallet",
   "type": "outcome",
   "g": "value",
   "n": "الحصة من إنفاق العميل",
   "n_en": "Share of wallet",
   "a": "SOW",
   "f": "إنفاق العميل لدى الجهة ÷ إجمالي إنفاقه على الفئة نفسها × 100",
   "f_en": "Customer spend with you ÷ customer's total spend in the category × 100",
   "sc": "0–100%",
   "sc_en": "0–100%",
   "d": "نسبة ما يخصّك من إجمالي إنفاق العميل على فئة المنتج أو الخدمة.",
   "d_en": "Your share of a customer's total spending on the product or service category.",
   "u": "قياس عمق العلاقة لدى عملاء يتعاملون مع أكثر من مزوّد.",
   "u_en": "Measuring relationship depth when customers use several providers.",
   "x": "إجمالي إنفاق العميل يُقدّر غالباً بالاستبيان، فيخضع لدقة تذكّره.",
   "x_en": "Total category spend is usually self-reported, so it depends on customers' recall.",
   "q": "إنفاق العميل لديك من بيانات المبيعات، وإجمالي إنفاقه على الفئة من استبيان: «كم أنفقت تقريباً على [الفئة] خلال الأشهر الاثني عشر الماضية لدى جميع المزوّدين؟»",
   "q_en": "Spend with you from sales data, and total category spend from a survey: \"Roughly how much did you spend on [category] in the past 12 months across all providers?\"",
   "steps": [
    "استخرج إنفاق العميل لدى الجهة خلال الفترة.",
    "اجمع تقديره لإجمالي إنفاقه على الفئة نفسها خلال الفترة ذاتها.",
    "اقسم الأول على الثاني واضرب في 100.",
    "خذ متوسط النسب على مستوى الشريحة أو العينة."
   ],
   "steps_en": [
    "Extract the customer's spend with you in the period.",
    "Collect their estimate of total category spend over the same period.",
    "Divide the first by the second and multiply by 100.",
    "Average the shares across the segment or sample."
   ],
   "ex": "أنفق عميل 12,000 ريال على الفئة في السنة، منها 4,800 لدينا ← الحصة = 4,800 ÷ 12,000 × 100 = 40%.",
   "ex_en": "A customer spent SAR 12,000 on the category in a year, SAR 4,800 with us → share of wallet = 4,800 ÷ 12,000 × 100 = 40%.",
   "read": "تكشف فرصة النمو داخل العملاء الحاليين، وانخفاضها مع ثبات الاحتفاظ إشارة مبكرة إلى انتقال تدريجي نحو المنافسين.",
   "read_en": "It shows growth room within existing customers; a fall while retention holds is an early sign of gradual drift to competitors.",
   "freq": "سنوياً أو نصف سنوي.",
   "freq_en": "Annually or half-yearly."
  },
  {
   "id": "accessibility-conformance",
   "type": "operational",
   "g": "digital",
   "n": "نسبة المطابقة لمعايير الوصول الرقمي",
   "n_en": "Accessibility conformance rate (WCAG)",
   "a": "WCAG",
   "f": "معايير النجاح المستوفاة ÷ معايير النجاح المنطبقة × 100 (أو الصفحات المطابقة ÷ الصفحات المفحوصة × 100)",
   "f_en": "Success criteria met ÷ applicable success criteria × 100 (or conforming pages ÷ pages audited × 100)",
   "sc": "0–100%",
   "sc_en": "0–100%",
   "d": "مدى استيفاء الخدمة الرقمية لمعايير النجاح في إرشادات إتاحة محتوى الويب (WCAG) عند المستوى المستهدف، وهو غالباً AA.",
   "d_en": "How far a digital service meets the success criteria of the Web Content Accessibility Guidelines (WCAG) at the target level, usually AA.",
   "u": "متابعة إتاحة الخدمات للأشخاص ذوي الإعاقة وكبار السن، والامتثال للأنظمة.",
   "u_en": "Tracking accessibility for people with disabilities and older users, and regulatory compliance.",
   "x": "المطابقة الرسمية في WCAG مطلقة لكل صفحة (إما مطابقة أو غير مطابقة)؛ النسبة أداة إدارة للتقدم لا شهادة مطابقة، والفحص الآلي وحده لا يكشف كل الإخفاقات.",
   "x_en": "Formal WCAG conformance is all-or-nothing per page; the rate is a progress tool, not a conformance claim, and automated checks alone miss many failures.",
   "q": "تدقيق إتاحة يدوي مدعوم بأدوات فحص آلية على عينة من الصفحات والرحلات الرئيسية، وفق معايير WCAG 2.2 عند المستويين A وAA.",
   "q_en": "A manual accessibility audit supported by automated tools on a sample of key pages and journeys, against WCAG 2.2 Levels A and AA.",
   "steps": [
    "حدد المستوى المستهدف (A وAA) والصفحات والرحلات الممثلة للخدمة.",
    "افحص كل معيار نجاح على كل صفحة يدوياً وآلياً، وسجّل: مستوفى، أو غير مستوفى، أو غير منطبق.",
    "احسب نسبة المعايير المستوفاة من المعايير المنطبقة، مستبعداً غير المنطبقة.",
    "احسب كذلك نسبة الصفحات المطابقة بالكامل، وأعد الفحص بعد كل إصلاح."
   ],
   "steps_en": [
    "Set the target level (A and AA) and the pages and journeys that represent the service.",
    "Check each success criterion on each page manually and with tools, recording met, not met or not applicable.",
    "Calculate criteria met as a share of applicable criteria, excluding not-applicable ones.",
    "Also calculate the share of fully conforming pages, and re-test after each fix."
   ],
   "ex": "من 55 معياراً في المستويين A وAA (WCAG 2.2)، كان 5 غير منطبقة، واستُوفي 44 من 50 ← المطابقة = 44 ÷ 50 × 100 = 88%؛ ومن 40 صفحة مفحوصة طابقت 26 بالكامل ← 26 ÷ 40 × 100 = 65%.",
   "ex_en": "Of 55 Level A and AA criteria (WCAG 2.2), 5 were not applicable and 44 of 50 were met → conformance = 44 ÷ 50 × 100 = 88%; of 40 audited pages, 26 fully conformed → 26 ÷ 40 × 100 = 65%.",
   "read": "نسبة المعايير تقيس التقدم، ونسبة الصفحات المطابقة بالكامل أقرب إلى ما يعيشه المستخدم. معيار واحد غير مستوفى في خطوة إلزامية قد يمنع مستخدماً من إكمال الخدمة كلياً.",
   "read_en": "Criteria share measures progress; fully conforming pages are closer to the user's reality. One failed criterion on a mandatory step can block a user from completing the service.",
   "freq": "قبل كل إطلاق رئيسي، وتدقيق شامل سنوي.",
   "freq_en": "Before each major release, with a full annual audit."
  }
 ],
 "indices": [
  {
   "id": "egdi",
   "type": "gov-digital",
   "how": "متوسط حسابي لثلاثة مؤشرات فرعية متساوية الوزن: مؤشر الخدمات الإلكترونية (OSI) المبني على تقييم البوابات الوطنية عبر خمسة مؤشرات فرعية (الإطار المؤسسي، وتقديم الخدمات، وتقديم المحتوى، والتقنية، والمشاركة الإلكترونية)، ومؤشر البنية التحتية للاتصالات (TII)، ومؤشر رأس المال البشري (HCI). يُوحَّد كل مكوّن بالدرجة المعيارية (Z-score) حتى لا يطغى المكوّن الأكثر تشتتاً، ثم يُطبَّع إلى مدى من 0 إلى 1. وهو مؤشر نسبي يرتّب الدول بعضها إلى بعض، لا قياس مطلق، وتُصنَّف الدول في أربع فئات: مرتفعة جداً (0.75–1)، ومرتفعة، ومتوسطة، ومنخفضة.",
   "how_en": "The arithmetic average of three equally weighted sub-indices: the Online Service Index (OSI), based on assessing national portals across five sub-indices (institutional framework, services provision, content provision, technology, e-participation); the Telecommunication Infrastructure Index (TII); and the Human Capital Index (HCI). Each component is standardised by Z-score so the most dispersed does not dominate, then normalised to 0–1. It ranks countries relative to each other rather than measuring absolutely; countries fall into four groups: very high (0.75–1), high, middle and low.",
   "scale": "0–1",
   "scale_en": "0–1",
   "freq": "كل سنتين",
   "freq_en": "Every two years",
   "src": "https://publicadministration.un.org/egovkb/en-us/about/overview/-e-government-development-index",
   "verified": "full"
  },
  {
   "id": "dx-maturity",
   "type": "maturity",
   "how": "تقيس هيئة الحكومة الرقمية نضج التجربة الرقمية للمنصات الحكومية ذات الأولوية عبر أربعة مناظير تتفرع إلى 20 محوراً: رضا المستفيدين عن تجربتهم الرقمية (باستطلاع «قيّم تجربتك الرقمية»)، وتقييم تجربة المستخدم، وآليات التعامل مع الشكاوى، والتقنيات والأدوات الممكّنة. وشملت دورة 2026 تسعاً وخمسين منصة وأكثر من 805 آلاف مقيّم، مع مؤشر فرعي للشمولية يخص ذوي الإعاقة وكبار السن. لم تُنشر أوزان المناظير والمحاور في المصادر المتاحة.",
   "how_en": "The Digital Government Authority assesses the digital experience maturity of priority government platforms across four perspectives branching into 20 axes: beneficiary satisfaction (via the \"Rate your digital experience\" survey), user experience evaluation, complaint handling, and enabling technologies and tools. The 2026 cycle covered 59 platforms and over 805,000 raters, with an inclusivity sub-index for people with disabilities and older adults. Weights for the perspectives and axes are not published in available sources.",
   "scale": "نسبة مئوية 0–100% مع مستويات نضج (مثل «متقدم»)",
   "scale_en": "0–100% with maturity levels (e.g. \"advanced\")",
   "freq": "سنوي",
   "freq_en": "Annual",
   "src": "https://www.alwatan.com.sa/article/1151909",
   "verified": "partial: weights and scoring formula not published"
  },
  {
   "id": "bcg-dgcs",
   "type": "satisfaction",
   "how": "استبيان إلكتروني تجريه BCG على عينة عشوائية من مستخدمي الإنترنت المنتظمين في 44 دولة، موزونة بحسب المنطقة والجنس، وتصفها BCG بأنها ممثلة لعموم السكان بهامش خطأ ±5%. يُعرض الرضا بوصفه «صافي المستجيبين الراضين عن الخدمات الحكومية الإلكترونية (%)»، ولم يتضح في التقرير المتاح مقياس السؤال ولا طريقة حساب الصافي.",
   "how_en": "An online survey by BCG of a random sample of regular internet users in 44 countries, balanced by location and gender, which BCG describes as representative of the general population with a ±5% margin of error. Satisfaction is reported as \"net respondents satisfied with online government services (%)\"; the available report does not state the answer scale or how the net figure is computed.",
   "scale": "نسبة مئوية صافية",
   "scale_en": "Net percentage",
   "freq": "كل سنتين (منذ 2012)",
   "freq_en": "Every two years (since 2012)",
   "src": "https://web-assets.bcg.com/2e/e2/3e91bc244d09b73af020f44ace71/2026-digital-government-citizen-survey-report-july2026.pdf",
   "verified": "partial: net-satisfaction formula and scale not stated"
  },
  {
   "id": "escwa-gems",
   "type": "maturity",
   "how": "يقيّم نضج 100 خدمة حكومية أساسية تُختار بمنهج دورة الحياة لاحتياجات الأفراد والمؤسسات، وتُقدَّم عبر البوابات الإلكترونية والتطبيقات المتنقلة في الدول العربية. ويغطي ثلاثة مجالات: توافر الخدمة وتطورها، واستخدامها ورضا المستخدمين عنها، وجهود الحكومة في التواصل مع الجمهور؛ وقيّمت دورة 2025 نحو 1,333 عنصراً (956 خدمة و377 جهة) في 17 دولة. لا تذكر المصادر المتاحة أوزان المجالات ولا معادلة التقدير.",
   "how_en": "Assesses the maturity of 100 core government services, chosen by a life-cycle approach to individual and business needs, delivered through portals and mobile apps in Arab countries. It covers three areas: service availability and sophistication, usage and user satisfaction, and government public-outreach efforts; the 2025 edition assessed about 1,333 items (956 services and 377 institutions) in 17 countries. Available sources do not give area weights or the scoring formula.",
   "scale": "نسبة مئوية 0–100% مع أربعة مستويات نضج",
   "scale_en": "0–100% with four maturity levels",
   "freq": "سنوي",
   "freq_en": "Annual",
   "src": "https://www.unescwa.org/news/escwa-launches-2025-government-electronic-and-mobile-services-maturity-index-gems-2025",
   "verified": "partial: weights and scoring formula not in public pages"
  },
  {
   "id": "ukcsi",
   "type": "satisfaction",
   "how": "يقيّم المستجيبون من لوحة إلكترونية ممثلة لسكان المملكة المتحدة البالغين (بحسب المنطقة والعمر والجنس) جهة تعاملوا معها في الأشهر الثلاثة الماضية، جهة واحدة لكل قطاع وحتى خمسة قطاعات، على أكثر من 25 مقياساً مستمدة من أولويات العملاء وتنتظم في خمسة أبعاد: التجربة، ومعالجة الشكاوى، وثقافة خدمة العميل، والارتباط العاطفي، والأخلاقيات. درجة الجهة هي متوسط تقييمات عملائها لكل مقياس مضروباً في عشرة ومرجّحاً بدرجة أولوية المقياس، ودرجة القطاع متوسط استجاباته، والمؤشر الكلي متوسط درجات القطاعات. واعتمد إصدار يوليو 2026 على نحو 59,500 استجابة.",
   "how_en": "Respondents from an online panel representative of UK adults (by region, age and gender) rate an organisation they dealt with in the past three months, one per sector for up to five sectors, on more than 25 metrics derived from customer priorities and grouped into five dimensions: Experience, Complaint Handling, Customer Ethos, Emotional Connection and Ethics. An organisation's score is the mean of its customers' ratings for each metric multiplied by ten and weighted by the metric's priority; a sector score is the mean of its responses, and the overall index is the mean of sector scores. The July 2026 edition used about 59,500 responses.",
   "scale": "0–100",
   "scale_en": "0–100",
   "freq": "مرتان سنوياً (يناير ويوليو)",
   "freq_en": "Twice a year (January and July)",
   "src": "https://instituteofcustomerservice.com/ukcsi",
   "verified": "full (count of metrics stated as \"over 25\")"
  },
  {
   "id": "acsi",
   "type": "satisfaction",
   "how": "يقوم على نموذج اقتصادي قياسي للسبب والأثر: توقعات العميل والجودة المدركة والقيمة المدركة تقود إلى الرضا، والرضا يقود إلى الشكاوى والولاء (نية إعادة الشراء وتقبّل السعر). يُقاس الرضا بثلاثة أسئلة على مقياس 1–10 (الرضا العام، ومدى تحقق التوقعات، والمقارنة بالمثالي)، وتُقدَّر الأوزان بطريقة المربعات الصغرى الجزئية (PLS) بحيث يبلغ الارتباط بين الرضا ومؤشرات الولاء أقصاه، ثم يُحوَّل المتوسط المرجّح إلى مدى 0–100. وفي نموذج الحكومة الفيدرالية تحل الثقة محل الولاء وتُحذف القيمة المدركة لأن معظم الخدمات بلا مقابل مباشر.",
   "how_en": "Built on a cause-and-effect econometric model: customer expectations, perceived quality and perceived value drive satisfaction, which drives complaints and loyalty (repurchase intent and price tolerance). Satisfaction is measured by three 1–10 questions (overall satisfaction, expectancy disconfirmation, comparison with ideal); weights are estimated with partial least squares (PLS) to maximise the link between satisfaction and loyalty, and the weighted mean is rescaled to 0–100. In the federal government model, trust replaces loyalty and perceived value is dropped because most services carry no direct charge.",
   "scale": "0–100",
   "scale_en": "0–100",
   "freq": "مستمر، مع نتائج قطاعية تُنشر على مدار السنة",
   "freq_en": "Continuous, with sector results released through the year",
   "src": "https://omb.report/icr/200807-1505-001/doc/8677301",
   "verified": "full (from the published ACSI methodology paper)"
  },
  {
   "id": "kiwis-count",
   "type": "satisfaction",
   "how": "تدعو هيئة الخدمة العامة كل ربع سنة عينة ممثلة وطنياً من نحو 2,000 شخص عبر جهة بحثية، ويُسأل المستجيبون عن آخر خدمة حكومية استخدموها. يُعرض الرضا نسبةً لمن أجابوا «راضٍ» أو «راضٍ جداً»، وتُقاس الثقة بمدى موافقتهم على أنهم يستطيعون الوثوق بتلك الخدمة لتفعل الصواب، وتُجمع نتائج الفئات السكانية سنوياً لتقليل التذبذب. لم تُذكر في الصفحات المتاحة طريقة الجمع ولا عدد نقاط المقياس.",
   "how_en": "Each quarter the Public Service Commission invites a nationally representative sample of about 2,000 people through a research provider, asking about the government service they used most recently. Satisfaction is reported as the share \"satisfied\" or \"very satisfied\"; trust is measured by agreement that they can trust that service to do what is right, and demographic results are aggregated annually to reduce volatility. The available pages do not state the collection mode or number of scale points.",
   "scale": "نسبة مئوية",
   "scale_en": "Percentage",
   "freq": "ربع سنوي",
   "freq_en": "Quarterly",
   "src": "https://publicservice.govt.nz/research-and-data/kiwis-count-survey-methodology-and-archive",
   "verified": "mostly: mode and scale points not stated"
  },
  {
   "id": "au-trust",
   "type": "trust",
   "how": "تجمع البيانات شهرياً من نحو 1,000 شخص بحصص ممثلة وطنياً بحسب العمر والجنس والموقع، ويتحدث كل منهم عن الخدمات التي استخدمها خلال السنة الماضية. الثقة الكلية هي نسبة من أجابوا «أوافق» أو «أوافق بشدة» على عبارة «أستطيع الوثوق بالخدمات العامة الأسترالية»، وثقة الخدمة المحددة تُحسب بالطريقة نفسها على عبارة «الخدمة جديرة بالثقة» مع تعديل نسبي بحسب عدد الخدمات المسؤول عنها كل شخص. وكانت «أوافق إلى حد ما» تُحتسب سابقاً ثم استُبعدت، فعُدّلت نتائج السنوات السابقة للمقارنة.",
   "how_en": "Data is collected monthly from about 1,000 people using national quotas for age, gender and location, each reporting on services used in the past year. Overall trust is the share answering \"agree\" or \"strongly agree\" to \"I can trust Australian public services\"; service-level trust uses \"The service is trustworthy\" the same way, adjusted pro rata for how many services each person rated. \"Somewhat agree\" used to be counted and was later excluded, so earlier years were restated for comparability.",
   "scale": "نسبة مئوية",
   "scale_en": "Percentage",
   "freq": "جمع شهري وتقرير سنوي",
   "freq_en": "Monthly collection, annual report",
   "src": "https://apsreform.gov.au/resources/reports/trust-australian-public-services-2024-annual-report",
   "verified": "full (mode not stated)"
  },
  {
   "id": "dk-borger",
   "type": "satisfaction",
   "how": "استبيان رقمي منبثق (Pop-up) يظهر للمستخدمين الفعليين أثناء استخدامهم بوابة borger.dk، وتنفذه شركة استشارية مستقلة لصالح وكالة الرقمنة. سؤال الرضا العام «ما مدى رضاك إجمالاً عن borger.dk؟»، والنسبة المعلنة هي من أجابوا «راضٍ» أو «راضٍ جداً». في قياس ديسمبر 2025 جُمعت 5,555 استجابة خلال ثلاثة أيام، مع استبعاد الإجابات المتسرعة والنمطية، ولم يذكر التقرير عدد نقاط المقياس.",
   "how_en": "A digital pop-up survey shown to real users while using borger.dk, run by an independent consultancy for the Agency for Digital Government. The overall question is \"How satisfied are you overall with borger.dk?\", and the published figure is the share answering \"satisfied\" or \"very satisfied\". The December 2025 wave gathered 5,555 responses over three days, removing speeders and flatliners; the report does not state the number of scale points.",
   "scale": "نسبة مئوية",
   "scale_en": "Percentage",
   "freq": "سنوي",
   "freq_en": "Annual",
   "src": "https://digst.dk/media/srwawmam/borgerdk_tilfredshedsmaaling-2025_webtilgaengelig.pdf",
   "verified": "full (scale points not stated)"
  },
  {
   "id": "om-satisfaction",
   "type": "satisfaction",
   "how": "ينفذ المركز الوطني للإحصاء والمعلومات استطلاعاً دورياً لرضا المستفيدين ممن تعاملوا مع الجهات الحكومية (مواطنين ومقيمين ومؤسسات خاصة وجهات حكومية) بعينة مختارة وفق معايير إحصائية لتمثيل الفئات. ويقيس سهولة الوصول إلى الخدمة، ووضوح المعلومات والإجراءات، وسرعة الإنجاز، والكفاءة العامة، وفاعلية قنوات التواصل، ومستوى التحول الرقمي. أما نسبة 78% الواردة في تقرير برنامج «تحوّل» لعام 2025 فلم تُنشر طريقة حسابها أو مقياسها، ولا تأكيد على أنها مستمدة من هذا الاستطلاع.",
   "how_en": "The National Centre for Statistics and Information runs a periodic satisfaction survey of beneficiaries who dealt with government entities (citizens, residents, private firms and government bodies), with a sample chosen on statistical criteria to represent these groups. It covers ease of access, clarity of information and procedures, speed, overall efficiency, communication channels and the level of digital transformation. The 78% figure in the Tahawul 2025 report has no published method or scale, and it is not confirmed to come from this survey.",
   "scale": "نسبة مئوية",
   "scale_en": "Percentage",
   "freq": "دوري (نصف سنوي وفق الجولات المعلنة)",
   "freq_en": "Periodic (half-yearly rounds announced)",
   "src": "https://www.omanobserver.om/article/1195902/oman/public-opinion-survey-on-satisfaction-with-govt-services-begins",
   "verified": "not verified: calculation of the 78% figure unpublished"
  },
  {
   "id": "de-egov",
   "type": "gov-digital",
   "how": "دراسة تصدرها مبادرة D21 وجامعة ميونخ التقنية، وتنفذها شركة Kantar باستبيان إلكتروني على مستخدمي الإنترنت من سن 16 فأكثر في ألمانيا (8,058 مستجيباً، نحو 500 لكل ولاية) والنمسا (1,000) وسويسرا (1,000)، وجُمعت بيانات 2025 في أبريل ومايو. يُعرض الرضا بقيمة «الخانات الثلاث العليا» (Top-3)، أي من أجابوا «راضٍ للغاية» أو «راضٍ جداً» أو «راضٍ إلى حد ما»، ويُسأل عن العرض الرقمي للبلدية من يعرفه فقط.",
   "how_en": "Published by Initiative D21 and the Technical University of Munich and fielded by Kantar as an online survey of internet users aged 16+ in Germany (8,058 respondents, about 500 per state), Austria (1,000) and Switzerland (1,000); 2025 fieldwork ran in April–May. Satisfaction is reported as a top-3-box value (extremely, very or somewhat satisfied), and the municipal online-offer question goes only to those who know it.",
   "scale": "نسبة مئوية",
   "scale_en": "Percentage",
   "freq": "سنوي",
   "freq_en": "Annual",
   "src": "https://initiatived21.de/uploads/03_Studien-Publikationen/eGovernment-MONITOR/2025/eGovMon2025_final.pdf",
   "verified": "full"
  },
  {
   "id": "forrester-fed",
   "type": "cx-quality",
   "how": "يطبق منهجية مؤشر تجربة العميل (CX Index) لدى فورستر على الجهات الفيدرالية الأمريكية: يُسأل عملاء تعاملوا مباشرة مع الجهة خلال الأشهر الاثني عشر الماضية عن جودة التجربة بأبعادها الثلاثة (الفاعلية والسهولة والعاطفة) وعن الولاء. تُرجَّح مقاييس الجودة بحسب أثرها في الولاء لكل قطاع، وتُحسب درجة لكل مستجيب بخوارزمية فورستر، ودرجة الجهة متوسط درجات عملائها. وتعتمد فورستر عينات ممثلة وطنياً تحصل عليها بنفسها لا قوائم عملاء من الجهات، والأوزان التفصيلية غير منشورة.",
   "how_en": "Applies Forrester's CX Index methodology to US federal agencies: customers who interacted directly with the agency in the past 12 months answer questions on CX quality across three dimensions (effectiveness, ease, emotion) and on loyalty. Quality measures are weighted by their impact on loyalty per industry, each respondent is scored by Forrester's algorithm, and an agency's score is the average of its customers' scores. Forrester sources its own nationally representative samples rather than agency customer lists; detailed weights are not published.",
   "scale": "0–100",
   "scale_en": "0–100",
   "freq": "سنوي",
   "freq_en": "Annual",
   "src": "https://www.forrester.com/policies/cx-index/",
   "verified": "partial: proprietary weights and items not published"
  },
  {
   "id": "forrester-tx",
   "type": "cx-quality",
   "how": "يجمع درجة التجربة الكلية (TX Score) بين مؤشر تجربة العلامة (BX Index) ومؤشر تجربة العميل (CX Index): نصفها من درجة BX لدى غير العملاء، والنصف الآخر من مزيج درجتي BX وCX لدى العملاء. ويقيس BX عناصر البروز والملاءمة والثقة وأثرها في الشراء المستقبلي وتفضيل الشراء وتقبّل السعر الأعلى والتوصية، مرجّحة بحسب القطاع وحالة المستجيب. ويُغطي التقييم أكثر من 400 علامة في 11 قطاعاً و13 دولة، والرقم المعروض هنا (41%) هو نسبة العلامات التي حسّنت درجتها لا درجة بذاتها.",
   "how_en": "The Total Experience (TX) Score combines the Brand Experience (BX) Index and the CX Index: half comes from the non-customer BX score and half from a combination of customer BX and CX scores. BX measures salience, fit and trust and their effect on future purchase, purchase preference, price premium and advocacy, weighted by industry and respondent status. Coverage is over 400 brands in 11 industries and 13 countries; the figure shown here (41%) is the share of brands that improved, not a score.",
   "scale": "نسبة العلامات (المؤشر نفسه درجة مملوكة)",
   "scale_en": "Share of brands (the score itself is proprietary)",
   "freq": "سنوي (منذ 2025)",
   "freq_en": "Annual (since 2025)",
   "src": "https://www.forrester.com/policies/total-experience",
   "verified": "partial: score range and weights not published"
  },
  {
   "id": "verint",
   "type": "cx-quality",
   "how": "تقرير سنوي تصدره Verint («حالة تجربة العملاء»، الإصدار الخامس) يعتمد على استطلاع 5,000 مستهلك أمريكي، والرقم المعروض هو نسبة من قالوا إن الشركات تقصّر حين يحتاجون إلى المساعدة. لم تذكر الصفحة المتاحة صياغة السؤال ولا خيارات الإجابة ولا الجهة المنفذة أو موعد الجمع، فلا يمكن التحقق من طريقة الحساب.",
   "how_en": "An annual Verint report (State of Customer Experience, fifth edition) based on a survey of 5,000 US consumers; the figure shown is the share saying businesses fall short when they need help. The available page gives no question wording, answer options, fieldwork agency or dates, so the calculation cannot be verified.",
   "scale": "نسبة مئوية",
   "scale_en": "Percentage",
   "freq": "سنوي",
   "freq_en": "Annual",
   "src": "https://www.verint.com/resources/the-state-of-customer-experience-2026/",
   "verified": "not verified: question wording and method unpublished"
  }
 ]
};
