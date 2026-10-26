/* مختبر تجربة العميل — محاكي «عِش الرحلة» وتقييم النضج (ثنائي اللغة). السيناريو مثال توضيحي عام. */
window.CXK_LAB = {
  sim: {
    title:"عِش الرحلة: الهدية المتأخرة", title_en:"Live the journey: the late gift",
    intro:"أنت العميل. طلبت هدية عيد ميلاد من متجر إلكتروني بتوصيل خلال يومين. كل قرار تتخذه يستهلك وقتاً ويغيّر شعورك. في النهاية سترى أين انكسرت الرحلة، وكيف كان يمكن تصميمها.",
    intro_en:"You are the customer. You ordered a birthday gift online with two-day delivery. Every decision costs time and changes how you feel. At the end you'll see where the journey broke and how it could have been designed.",
    start:"s1",
    nodes:{
      s1:{ t:"اليوم موعد التسليم، والمناسبة بعد غد. لم يصل شيء ولم يصلك أي إشعار.", t_en:"Today is the delivery date and the party is the day after tomorrow. Nothing has arrived and you've had no notification.",
        c:[ {l:"أفتح التطبيق لتتبع الطلب",l_en:"Open the app to track the order",to:"track",m:5,e:0},
            {l:"أتصل بخدمة العملاء مباشرة",l_en:"Call customer service straight away",to:"call",m:25,e:-1,bp:"انتظار طويل في الطابور الهاتفي",bp_en:"Long phone queue"} ]},
      track:{ t:"التتبع يقول «في الطريق» منذ يومين دون أي تحديث.", t_en:"Tracking has said \"on the way\" for two days with no update.",
        c:[ {l:"أفتح المحادثة في التطبيق",l_en:"Open in-app chat",to:"chat",m:10,e:-1},
            {l:"أنتظر حتى المساء",l_en:"Wait until the evening",to:"wait",m:360,e:-1,bp:"معلومة تتبع لا تعكس الواقع",bp_en:"Tracking that doesn't reflect reality"} ]},
      wait:{ t:"المساء جاء ولم يتغير شيء. المناسبة غداً.", t_en:"Evening comes and nothing has changed. The party is tomorrow.",
        c:[ {l:"أتواصل الآن عبر المحادثة",l_en:"Contact them now through chat",to:"chat",m:10,e:-1} ]},
      call:{ t:"بعد 25 دقيقة يرد موظف ويطلب رقم الطلب وبيانات التحقق.", t_en:"After 25 minutes an agent answers and asks for your order number and verification details.",
        c:[ {l:"أعطيه البيانات",l_en:"Give the details",to:"transfer",m:8,e:0} ]},
      chat:{ t:"روبوت المحادثة يعرض أسئلة عامة، ثم يحولك لموظف يطلب منك رقم الطلب من جديد.", t_en:"The chatbot offers generic questions, then hands you to an agent who asks for your order number again.",
        c:[ {l:"أعيد البيانات وأشرح المشكلة",l_en:"Repeat the details and explain again",to:"transfer",m:15,e:-1,bp:"تكرار البيانات بعد التحويل من الروبوت للموظف",bp_en:"Repeating details after the bot-to-agent handoff"},
            {l:"أطلب الإلغاء والاسترداد مباشرة",l_en:"Ask to cancel and get a refund",to:"refund",m:10,e:-1} ]},
      transfer:{ t:"الموظف يقول إن الشحنة لدى شركة الشحن ولا يملك تفاصيلها، ويعطيك رقم الشركة.", t_en:"The agent says the parcel is with the courier, he has no details, and gives you the courier's number.",
        c:[ {l:"أتصل بشركة الشحن",l_en:"Call the courier",to:"courier",m:40,e:-2,bp:"تسليم المشكلة إلى جهة خارجية دون متابعة",bp_en:"Problem handed to a third party with no follow-up"},
            {l:"أطلب الإلغاء والاسترداد",l_en:"Ask to cancel and get a refund",to:"refund",m:10,e:-1} ]},
      courier:{ t:"شركة الشحن: العنوان ينقصه رقم المبنى، والطرد أُعيد إلى المستودع.", t_en:"The courier: the address is missing the building number, and the parcel went back to the warehouse.",
        c:[ {l:"أصحح العنوان وأطلب إعادة التوصيل",l_en:"Fix the address and request redelivery",to:"endLate",m:2880,e:-1,bp:"عنوان لم يُتحقق منه عند الطلب",bp_en:"Address never validated at checkout"},
            {l:"أطلب الإلغاء",l_en:"Cancel the order",to:"refund",m:15,e:-1,bp:"عنوان لم يُتحقق منه عند الطلب",bp_en:"Address never validated at checkout"} ]},
      refund:{ t:"قُبل الإلغاء. يصلك بريد: «يُعاد المبلغ خلال 14 يوم عمل».", t_en:"Cancellation accepted. An email says: \"Refund within 14 business days.\"",
        c:[ {l:"أشتري الهدية من متجر آخر وأنتظر المبلغ",l_en:"Buy the gift elsewhere and wait for the money",to:"endRefund",m:20160,e:-2,bp:"استرداد بطيء رغم أن الخطأ من المتجر",bp_en:"Slow refund although the fault was the store's"} ]},
      endLate:{ end:true, t:"وصلت الهدية بعد المناسبة بيومين.", t_en:"The gift arrived two days after the party." },
      endRefund:{ end:true, t:"استرددت المبلغ بعد أسبوعين، ولن تعود إلى هذا المتجر.", t_en:"You got your money back after two weeks, and you won't shop there again." }
    },
    ideal:[
      ["التحقق من العنوان عند الطلب يمنع الإرجاع إلى المستودع.","Validating the address at checkout prevents the return to the warehouse."],
      ["إشعار استباقي بالتأخير قبل موعد التسليم، مع خيارات: موعد جديد، أو استلام من نقطة قريبة، أو استرداد فوري.","A proactive delay alert before the due date, with options: new slot, nearby pickup point, or instant refund."],
      ["سجل حالة موحد ينتقل من الروبوت إلى الموظف إلى شركة الشحن، فلا يكرر العميل شيئاً.","One case record that travels from bot to agent to courier, so the customer never repeats anything."],
      ["مالك واحد للمشكلة داخل المتجر حتى حلها، بدلاً من إحالة العميل لجهة خارجية.","One owner for the problem inside the store until it is solved, instead of sending the customer to a third party."],
      ["استرداد فوري عندما يكون الخطأ من المتجر.","Instant refund when the fault is the store's."]
    ]
  },

  maturity: {
    scale:["لا ينطبق","نادراً","جزئياً","غالباً","ينطبق تماماً"], scale_en:["Not at all","Rarely","Partly","Mostly","Fully"],
    levels:[["ناشئ","Emerging"],["متطور","Developing"],["محدد","Defined"],["مُدار","Managed"],["رائد","Leading"]],
    dims:[
      { k:"strategy", n:"الاستراتيجية والقيادة", n_en:"Strategy & leadership",
        q:[["لدينا استراتيجية معتمدة لتجربة العميل بأهداف قابلة للقياس.","We have an approved CX strategy with measurable goals."],
           ["تراجع القيادة العليا مؤشرات التجربة دورياً وتتخذ قرارات بناءً عليها.","Senior leaders review CX metrics regularly and act on them."]],
        rec:["اعتمد رؤية مختصرة لتجربة العميل بثلاثة أهداف قابلة للقياس، وأدرجها في اجتماعات القيادة الشهرية.","Approve a short CX vision with three measurable goals and put it on the monthly leadership agenda."] },
      { k:"voice", n:"فهم العميل وصوته", n_en:"Customer insight & voice",
        q:[["نجمع صوت العميل من قنوات متعددة في مكان واحد.","We bring voice of the customer from all channels into one place."],
           ["نقابل المستفيدين ونختبر معهم قبل إطلاق الخدمات أو تغييرها.","We interview and test with customers before launching or changing services."]],
        rec:["اجمع الشكاوى والتقييمات والاستبيانات في مستودع واحد مصنّف حسب الرحلة، وأجرِ خمس مقابلات شهرياً على الأقل.","Pool complaints, ratings and surveys in one repository tagged by journey, and run at least five interviews a month."] },
      { k:"design", n:"تصميم الرحلات", n_en:"Journey design",
        q:[["لدينا خرائط رحلة موثقة لأهم الخدمات تشمل ما خلف الواجهة.","We have documented journey maps for key services, including backstage."],
           ["نصمم الخدمات حول أحداث الحياة لا حول الهيكل التنظيمي.","We design services around life events rather than the org chart."]],
        rec:["ابدأ بأعلى ثلاث رحلات حجماً أو شكوى، وارسم وضعها الراهن ونقاط انكسارها قبل أي مشروع تقني.","Start with the three journeys with the highest volume or complaints and map their current state and breakpoints before any tech project."] },
      { k:"measure", n:"القياس والمؤشرات", n_en:"Measurement",
        q:[["نقيس الرضا والجهد والزمن والحل من أول تواصل لكل رحلة رئيسية.","We measure satisfaction, effort, time and first-contact resolution for each key journey."],
           ["نربط مؤشرات التجربة بنتائج تشغيلية أو مالية.","We link CX metrics to operational or financial outcomes."]],
        rec:["حدد لكل رحلة رئيسية أربعة مؤشرات بخط أساس ومستهدف، واربط واحداً منها على الأقل بالتكلفة أو الإيراد.","Give each key journey four KPIs with baselines and targets, and link at least one to cost or revenue."] },
      { k:"governance", n:"الحوكمة والتشغيل", n_en:"Governance & operations",
        q:[["لكل رحلة رئيسية مالك واحد مسؤول عبر الإدارات.","Each key journey has one owner accountable across departments."],
           ["نغلق حلقة الملاحظات ونبلغ المستفيد بما تغير بسبب ملاحظته.","We close the loop and tell customers what changed because of their feedback."]],
        rec:["عيّن مالكاً لكل رحلة بصلاحية التنسيق بين الإدارات، وأنشئ آلية للرد على المستفيد بما تغير.","Appoint an owner per journey with authority to coordinate across departments, and a way to tell customers what changed."] },
      { k:"culture", n:"الثقافة والموظفون", n_en:"Culture & people",
        q:[["يملك موظفو الخطوط الأمامية صلاحية حل المشكلات دون تصعيد.","Front-line staff are empowered to solve problems without escalation."],
           ["تدخل مؤشرات التجربة في تقييم أداء الفرق.","CX metrics are part of team performance reviews."]],
        rec:["امنح الخطوط الأمامية صلاحيات محددة بسقف واضح، وأضف مؤشر تجربة واحداً إلى تقييم كل فريق.","Give front-line staff defined authority with a clear limit, and add one CX metric to every team's review."] }
    ]
  }
};
