// Instant FAQ engine v2 for the Centre Dentaire Le Pont chat assistant.
// Runs 100% in the browser: no API call, no external service, no waiting.
//
// "Training" = three matching layers, in order:
// 1) Precise regex intents (approved clinic facts only, AR/EN/FR +
//    Moroccan dialect, the clinic's own visitor language).
// 2) A keyword-scoring net over normalized text (diacritics stripped,
//    ة/ه and ي/ى unified) that catches rephrasings and small typos the
//    regexes miss — it can only pick an intent, never invent an answer.
// 3) Off-list -> a WhatsApp invitation. Prices are always deflected to
//    WhatsApp and medical questions to the clinic team, by construction.

import type { Lang } from '@/lib/translations'

export type FaqAnswer = { text: string; cards: string[]; answerLang: Lang }

const ARABIC_SCRIPT = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/
const WA = '+212 666 56 54 95'

type FaqItem = {
  id: string
  cards?: string[]
  match: RegExp
  keywords?: string[]
  answers: Record<Lang, string>
}

const FAQ: FaqItem[] = [
  {
    id: 'emergency',
    cards: ['phone', 'whatsapp'],
    match: /(ألم|وجع|يوجع|توجع|كيضر|طوارئ|ضرني|douleur|mal aux dents|mal de dent|urgence|dental pain|toothache|emergency|hurts|in pain)/i,
    keywords: ['وجع', 'الم شديد', 'ضرسي كيضرني', 'سناني كتوجعني', 'طوارئ', 'douleur', 'toothache', 'urgence'],
    answers: {
      fr: "Je suis navré pour votre douleur. Je ne peux pas poser de diagnostic ni recommander de médicament : pour une douleur ou une urgence, contactez le centre au plus vite sur WhatsApp au +212 666 56 54 95 ou par téléphone, l'équipe vous prendra en charge rapidement.",
      ar: 'آسف لسماع ذلك. لا أستطيع تقديم تشخيص أو وصف دواء: في حالة الألم أو الطوارئ، تواصلوا مع المركز في أقرب وقت عبر واتساب على +212 666 56 54 95 أو بالهاتف، وسيهتم بكم الفريق بسرعة.',
      en: 'I am sorry you are in pain. I cannot give a diagnosis or recommend medication: for pain or an emergency, please contact the centre as soon as possible on WhatsApp at +212 666 56 54 95 or by phone, and the team will take care of you quickly.',
    },
  },
  {
    id: 'bleeding',
    cards: ['phone', 'whatsapp'],
    match: /(نزيف|بينزف|دم من|ورم|انتفاخ|متورم|خراج|خُرّاج|saignement|gonflement|enflé|bleeding|swelling|swollen|abscess)/i,
    keywords: ['نزيف', 'ورم', 'انتفاخ', 'خراج', 'saignement', 'bleeding', 'swelling'],
    answers: {
      fr: "Un saignement, un gonflement ou un abcès doit être vu rapidement par un dentiste. Je ne peux pas poser de diagnostic : contactez le centre sans attendre sur WhatsApp au +212 666 56 54 95 ou par téléphone.",
      ar: 'النزيف أو الانتفاخ أو الخراج يحتاج أن يراه طبيب أسنان بسرعة. لا أستطيع تقديم تشخيص: تواصلوا مع المركز دون انتظار عبر واتساب على +212 666 56 54 95 أو بالهاتف.',
      en: 'Bleeding, swelling or an abscess needs to be seen quickly by a dentist. I cannot give a diagnosis: contact the centre without waiting on WhatsApp at +212 666 56 54 95 or by phone.',
    },
  },
  {
    id: 'broken',
    cards: ['phone', 'whatsapp'],
    match: /(سن مكسور|ضرس مكسور|اتكسر|مكسورة|كسر في|تهرس|تهرسات|dent cassée|cassé ma dent|broken tooth|chipped|cracked tooth|broke my tooth)/i,
    keywords: ['سن مكسور', 'ضرس مكسور', 'تهرس', 'broken tooth', 'dent cassee'],
    answers: {
      fr: "Une dent cassée doit être examinée rapidement pour la sauver si possible. Contactez le centre sur WhatsApp au +212 666 56 54 95 ou par téléphone, l'équipe vous dira quoi faire en attendant.",
      ar: 'السن المكسور يجب فحصه بسرعة لإنقاذه إن أمكن. تواصلوا مع المركز عبر واتساب على +212 666 56 54 95 أو بالهاتف، وسيخبركم الفريق بما تفعلونه في الانتظار.',
      en: 'A broken tooth should be examined quickly to save it if possible. Contact the centre on WhatsApp at +212 666 56 54 95 or by phone, and the team will tell you what to do meanwhile.',
    },
  },
  {
    id: 'price',
    cards: ['whatsapp'],
    match: /(ثمن|سعر|أسعار|بشحال|بكم|بكام|كم تكلفة|تكلفة|prix|tarif|coût|combien|price|cost|how much|fees)/i,
    keywords: ['بشحال', 'بكام', 'اسعار', 'تكلفه', 'prix', 'tarif', 'price', 'how much', 'combien'],
    answers: {
      fr: "Les tarifs dépendent de votre plan de traitement personnalisé, établi après un examen au centre. Pour un devis précis, contactez-nous sur WhatsApp au +212 666 56 54 95, nous vous répondrons rapidement.",
      ar: 'تختلف الأسعار حسب خطة العلاج الخاصة بكم، والتي تُحدَّد بعد الفحص في المركز. للحصول على ثمن دقيق، تواصلوا معنا عبر واتساب على +212 666 56 54 95 وسنرد عليكم بسرعة.',
      en: 'Prices depend on your personalised treatment plan, which is set after an examination at the centre. For an exact quote, contact us on WhatsApp at +212 666 56 54 95 and we will reply quickly.',
    },
  },
  {
    id: 'payment',
    cards: ['whatsapp'],
    match: /(تقسيط|أقساط|اقساط|طرق الدفع|وسائل الدفع|كاش|نقداً|بطاقة بنكية|فيزا|paiement|payment|installment|pay in|credit card|cash|visa)/i,
    keywords: ['تقسيط', 'اقساط', 'طرق الدفع', 'فيزا', 'paiement', 'payment', 'installment'],
    answers: {
      fr: "Pour les modalités de paiement, le centre vous confirmera les options disponibles directement sur WhatsApp au +212 666 56 54 95, selon votre plan de traitement.",
      ar: 'بخصوص طرق الدفع، سيؤكد لكم المركز الخيارات المتاحة مباشرة عبر واتساب على +212 666 56 54 95، حسب خطة علاجكم.',
      en: 'For payment options, the centre will confirm what is available directly on WhatsApp at +212 666 56 54 95, according to your treatment plan.',
    },
  },
  {
    id: 'insurance',
    cards: ['whatsapp'],
    match: /(تأمين|تامين|ضمان صحي|تعاضدية|assurance|mutuelle|insurance|coverage|covered|cnss|cnops)/i,
    keywords: ['تامين', 'تأمين', 'تعاضديه', 'assurance', 'insurance', 'mutuelle', 'cnss'],
    answers: {
      fr: "Je ne peux pas vous confirmer ici la prise en charge par une assurance : posez la question au centre sur WhatsApp au +212 666 56 54 95 avec le nom de votre assurance, l'équipe vous répondra précisément.",
      ar: 'لا أستطيع تأكيد تغطية التأمين هنا: اسألوا المركز عبر واتساب على +212 666 56 54 95 مع ذكر اسم التأمين، وسيرد عليكم الفريق بدقة.',
      en: 'I cannot confirm insurance coverage here: ask the centre on WhatsApp at +212 666 56 54 95 with the name of your insurer, and the team will answer precisely.',
    },
  },
  {
    id: 'warranty',
    cards: ['whatsapp'],
    match: /(ضمان|ضمانة|garantie|warranty|guarantee)/i,
    keywords: ['ضمان', 'garantie', 'warranty'],
    answers: {
      fr: "Les conditions de garantie dépendent du traitement réalisé : le centre vous les expliquera précisément sur WhatsApp au +212 666 56 54 95 avant de commencer.",
      ar: 'شروط الضمان تختلف حسب العلاج المنفذ: سيشرحها لكم المركز بدقة عبر واتساب على +212 666 56 54 95 قبل البدء.',
      en: 'Warranty conditions depend on the treatment performed: the centre will explain them precisely on WhatsApp at +212 666 56 54 95 before starting.',
    },
  },
  {
    id: 'hours',
    cards: ['booking'],
    match: /(ساعات العمل|مواعيد|أوقات|وقتاش تفتحو|وقتاش تسكرو|متى تفتح|متى تغلق|فاتحين|فاتحة|فاتحه|horaire|heures d'ouverture|ouvert|quand ouvrez|opening hours|when.*open|what time)/i,
    keywords: ['مواعيد المركز', 'ساعات العمل', 'اوقات', 'فاتحين امتي', 'horaire', 'opening hours', 'ouvert'],
    answers: {
      fr: 'Le centre est ouvert du lundi au samedi de 09:00 à 19:00. Pour réserver, écrivez-nous sur WhatsApp au +212 666 56 54 95.',
      ar: 'المركز مفتوح من الاثنين إلى السبت من 09:00 إلى 19:00. للحجز، راسلونا عبر واتساب على +212 666 56 54 95.',
      en: 'The centre is open Monday to Saturday from 09:00 to 19:00. To book, message us on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'reschedule',
    cards: ['whatsapp', 'phone'],
    match: /(تأجيل|تاجيل|إلغاء موعد|الغاء موعد|تغيير الموعد|تغير الموعد|الغي|إلغاء|annuler|reporter|déplacer mon|reschedule|cancel my|move my appointment)/i,
    keywords: ['تاجيل موعد', 'الغاء موعد', 'تغيير الموعد', 'reschedule', 'annuler'],
    answers: {
      fr: "Aucun souci : pour reporter ou annuler votre rendez-vous, prévenez le centre sur WhatsApp au +212 666 56 54 95 ou par téléphone, et l'équipe vous proposera un autre créneau.",
      ar: 'لا مشكلة: لتأجيل موعدكم أو إلغائه، أخبروا المركز عبر واتساب على +212 666 56 54 95 أو بالهاتف، وسيقترح عليكم الفريق موعداً آخر.',
      en: 'No problem: to reschedule or cancel your appointment, let the centre know on WhatsApp at +212 666 56 54 95 or by phone, and the team will offer you another slot.',
    },
  },
  {
    id: 'booking',
    cards: ['booking', 'whatsapp'],
    match: /(حجز|احجز|موعد|نبغي نجي|نحب نجي|rendez-vous|rendez vous|réserv|prendre rendez|book|appointment|booking|rdv)/i,
    keywords: ['احجز موعد', 'حجز موعد', 'rendez vous', 'appointment', 'booking'],
    answers: {
      fr: 'Vous pouvez réserver de trois façons : le formulaire de rendez-vous sur ce site, par téléphone, ou sur WhatsApp au +212 666 56 54 95. Le centre confirmera votre rendez-vous par téléphone ou WhatsApp.',
      ar: 'يمكنكم الحجز بثلاث طرق: عبر نموذج المواعيد في هذا الموقع، أو بالهاتف، أو عبر واتساب على +212 666 56 54 95. وسيؤكد لكم المركز الموعد بالهاتف أو واتساب.',
      en: 'You can book in three ways: the appointment form on this website, by phone, or on WhatsApp at +212 666 56 54 95. The centre will confirm your appointment by phone or WhatsApp.',
    },
  },
  {
    id: 'location',
    cards: ['maps'],
    match: /(أين|فين|العنوان|الموقع|تقع|يقع|كاين|كاينة|البلاصة|بلاصة|لوكيشن|كيفاش نوصل|نوصل|باركينج|adresse|localisation|emplacement|où se trouve|où êtes-vous|où|comment venir|parking|address|where|location|directions|how to get|position|gps)/i,
    keywords: ['العنوان', 'مكانكم فين', 'لوكيشن', 'adresse', 'where are you', 'location', 'directions'],
    answers: {
      fr: 'Le Centre Dentaire Le Pont se trouve à la Résidence Florencia : Bâtiment 02, Porte 01, Route Principale, Rue Florencia, Tanger 90000. Vous trouverez sur ce site une carte et un bouton « Itinéraire » pour vous guider facilement jusqu\'à nous.',
      ar: 'يوجد مركز Le Pont لطب الأسنان في إقامة فلورنسيا: العمارة 02، الباب 01، الطريق الرئيسية، زنقة فلورنسيا، طنجة 90000. ستجدون في هذا الموقع خريطة وزر الاتجاهات ليدلكم على الطريق بسهولة.',
      en: "Centre Dentaire Le Pont is at Résidence Florencia: Bâtiment 02, Porte 01, Route Principale, Rue Florencia, Tangier 90000. This site has a map and a directions button to guide you to us easily.",
    },
  },
  {
    id: 'team',
    cards: ['whatsapp'],
    match: /(من هو الدكتور|مين الدكتور|مين دكتور|خبرة الدكتور|نبذة|الطبيب|فريق|qui est le docteur|qui est le dr|expérience du|who is the doctor|who is dr|doctor's experience|about the doctor|the team)/i,
    keywords: ['مين الدكتور', 'خبره الدكتور', 'who is the doctor', 'the team'],
    answers: {
      fr: "Le Centre Dentaire Le Pont est un centre dentaire à Tanger qui réunit l'ensemble des soins : consultation, nettoyage, blanchiment, prothèses, implants et orthodontie, pour adultes et enfants. Pour toute question sur votre cas, écrivez-nous sur WhatsApp au +212 666 56 54 95, l'équipe vous répondra directement.",
      ar: 'مركز Le Pont لطب الأسنان هو مركز بطنجة يجمع كل العلاجات: الفحص، التنظيف، التبييض، التركيبات، الزراعة والتقويم، للبالغين والأطفال. لأي سؤال عن حالتكم، راسلونا عبر واتساب على +212 666 56 54 95 وسيرد عليكم الفريق مباشرة.',
      en: 'Centre Dentaire Le Pont is a dental centre in Tangier covering all care: check-ups, cleaning, whitening, prostheses, implants and orthodontics, for adults and children. For any question about your case, message us on WhatsApp at +212 666 56 54 95 and the team will reply directly.',
    },
  },
  {
    id: 'duration',
    cards: ['whatsapp'],
    match: /(كم جلسة|كام جلسة|كم مدة|كام مدة|مدة العلاج|تستغرق الزراعة|تستغرق العملية|combien de séances|combien de temps|how many visits|how long does|how many sessions)/i,
    keywords: ['كم جلسه', 'كام جلسه', 'how many visits', 'combien de seances'],
    answers: {
      fr: "Le nombre de séances dépend de votre cas, établi après examen au centre. Pour un plan précis adapté à votre situation, écrivez-nous sur WhatsApp au +212 666 56 54 95.",
      ar: 'عدد الجلسات يعتمد على حالتكم ويُحدَّد بعد الفحص في المركز. لخطة دقيقة تناسب وضعكم، راسلونا عبر واتساب على +212 666 56 54 95.',
      en: 'The number of sessions depends on your case, set after examination at the centre. For a precise plan for your situation, message us on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'implants',
    cards: ['whatsapp'],
    match: /(زراعة|زرعه|زرعة|زراعه|غرسة|اغرس|implant)/i,
    keywords: ['زراعه', 'زرعه', 'غرسه', 'implant'],
    answers: {
      fr: "L'implant dentaire remplace la racine d'une dent manquante par une solution fixe, stable et durable, sans toucher aux dents voisines. Pour savoir si c'est adapté à votre cas, un examen au centre est nécessaire : écrivez-nous sur WhatsApp au +212 666 56 54 95.",
      ar: 'زراعة الأسنان تعوّض جذر السن المفقودة بحل ثابت ومستقر ودائم، دون المساس بالأسنان المجاورة. لمعرفة ما إذا كانت مناسبة لحالتكم، يلزم فحص في المركز: راسلونا عبر واتساب على +212 666 56 54 95.',
      en: 'A dental implant replaces the root of a missing tooth with a fixed, stable and long-lasting solution, without touching the neighbouring teeth. To know if it suits your case, an examination at the centre is needed: message us on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'crowns',
    cards: ['whatsapp'],
    match: /(تيجان|تاج السن|تركيبات|تركيبة|فينير|عدسات الأسنان|عدسات الاسنان|قشرة|هوليوود|hollywood|couronne|facette|veneer|crown|bridge|pont dentaire)/i,
    keywords: ['تركيبات', 'فينير', 'تيجان', 'هوليوود', 'veneer', 'facette', 'crown'],
    answers: {
      fr: 'Le centre réalise couronnes, bridges et facettes sur mesure, pour restaurer ou embellir votre sourire. Pour savoir ce qui convient à votre cas, un examen est nécessaire : écrivez-nous sur WhatsApp au +212 666 56 54 95.',
      ar: 'يقدم المركز التيجان والجسور والفينير المصممة خصيصاً، لترميم ابتسامتكم أو تجميلها. لمعرفة الأنسب لحالتكم، يلزم فحص: راسلونا عبر واتساب على +212 666 56 54 95.',
      en: 'The centre makes custom crowns, bridges and veneers, to restore or beautify your smile. To know what suits your case, an examination is needed: message us on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'rootcanal',
    cards: ['whatsapp'],
    match: /(علاج جذور|علاج عصب|حشو عصب|عصب السن|traitement de racine|dévitalisation|root canal|endodont)/i,
    keywords: ['علاج جذور', 'حشو عصب', 'عصب', 'root canal'],
    answers: {
      fr: 'Le centre propose le traitement de racine pour sauver une dent atteinte en profondeur, avec des soins en douceur. Pour une évaluation de votre cas, écrivez-nous sur WhatsApp au +212 666 56 54 95.',
      ar: 'يوفر المركز علاج الجذور لإنقاذ السن المصاب في العمق، برعاية لطيفة. لتقييم حالتكم، راسلونا عبر واتساب على +212 666 56 54 95.',
      en: 'The centre offers root canal treatment to save a deeply affected tooth, with gentle care. For an assessment of your case, message us on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'whitening',
    cards: ['whatsapp'],
    match: /(تبييض|تبيض|بياض|اسناني صفرا|سناني صفرا|اصفرار|blanchiment|whitening|whiter teeth)/i,
    keywords: ['تبييض', 'تبيض', 'blanchiment', 'whitening'],
    answers: {
      fr: 'Nous proposons un blanchiment dentaire professionnel au centre, pour un sourire visiblement plus éclatant. Pour les détails et un rendez-vous, contactez-nous sur WhatsApp au +212 666 56 54 95.',
      ar: 'نوفر تبييضاً احترافياً للأسنان في المركز، لابتسامة أكثر إشراقاً بشكل ملحوظ. للتفاصيل وحجز موعد، تواصلوا معنا عبر واتساب على +212 666 56 54 95.',
      en: 'We offer professional teeth whitening at the centre, for a visibly brighter smile. For details and an appointment, contact us on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'ortho',
    cards: ['whatsapp'],
    match: /(تقويم|أقواس|اقواس|orthodont|appareil dentaire|braces|aligner|aligneur|invisalign)/i,
    keywords: ['تقويم', 'اقواس', 'orthodont', 'braces', 'invisalign'],
    answers: {
      fr: "Le centre propose l'orthodontie pour enfants et adultes : appareils classiques et aligneurs transparents pour aligner vos dents à tout âge. Pour une première évaluation, écrivez-nous sur WhatsApp au +212 666 56 54 95.",
      ar: 'يوفر المركز تقويم الأسنان للأطفال والبالغين: أجهزة تقليدية ومصففات شفافة لتقويم أسنانكم في أي عمر. لتقييم أول، راسلونا عبر واتساب على +212 666 56 54 95.',
      en: 'The centre offers orthodontics for children and adults: classic braces and clear aligners to straighten your teeth at any age. For a first assessment, message us on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'kids',
    cards: ['whatsapp'],
    match: /(أطفال|اطفال|طفلي|طفل |ابني|ابنتي|ولدي|enfants|pour enfant|kids|children|my child|my son|my daughter)/i,
    keywords: ['اطفال', 'طفلي', 'ابني', 'ولدي', 'kids', 'children'],
    answers: {
      fr: "Le centre accueille les enfants avec des soins doux et adaptés à leur âge, pour des visites sans peur. Pour un soin précis pour votre enfant, décrivez-nous le besoin sur WhatsApp au +212 666 56 54 95, l'équipe vous orientera.",
      ar: 'يستقبل المركز الأطفال برعاية لطيفة ومناسبة لأعمارهم، لزيارات بلا خوف. لعلاج محدد لطفلكم، صفوا لنا الحاجة عبر واتساب على +212 666 56 54 95، وسيرشدكم الفريق.',
      en: 'The centre welcomes children with gentle care adapted to their age, for fear-free visits. For a specific treatment for your child, describe the need on WhatsApp at +212 666 56 54 95 and the team will guide you.',
    },
  },
  {
    id: 'cleaning',
    cards: ['whatsapp'],
    match: /(تنظيف|تنضيف|إزالة الجير|ازالة الجير|تلميع|كشف|فحص شامل|détartrage|detartrage|nettoyage|check-up|checkup|cleaning|scaling|polishing)/i,
    keywords: ['تنظيف', 'تنضيف', 'ازاله الجير', 'كشف', 'detartrage', 'cleaning', 'checkup'],
    answers: {
      fr: 'Le centre propose les consultations, le détartrage et la prévention pour garder des dents saines. Pour un rendez-vous de contrôle ou de nettoyage, écrivez-nous sur WhatsApp au +212 666 56 54 95.',
      ar: 'يقدم المركز الفحوصات والتنظيف وإزالة الجير والوقاية للحفاظ على أسنان صحية. لحجز فحص أو تنظيف، راسلونا عبر واتساب على +212 666 56 54 95.',
      en: 'The centre offers check-ups, scaling and prevention to keep your teeth healthy. To book a check-up or cleaning, message us on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'filling',
    cards: ['whatsapp'],
    match: /(حشو|حشوه|حشوة|تسوس|مسوس|plombage|filling|cavity|carie|decay)/i,
    keywords: ['حشو', 'تسوس', 'filling', 'cavity'],
    answers: {
      fr: 'Les obturations font partie des soins du centre : le dentiste examinera votre dent et vous proposera le soin adapté. Pour un rendez-vous, écrivez-nous sur WhatsApp au +212 666 56 54 95.',
      ar: 'الحشوات جزء من علاجات المركز: سيفحص الطبيب سنكم ويقترح العلاج المناسب. لحجز موعد، راسلونا عبر واتساب على +212 666 56 54 95.',
      en: 'Fillings are part of the centre\'s care: the dentist will examine your tooth and propose the right treatment. To book, message us on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'extraction',
    cards: ['whatsapp'],
    match: /(خلع|اخلع|extraction|extraire|remove a tooth|pull a tooth|take out)/i,
    keywords: ['خلع', 'اخلع', 'extraction'],
    answers: {
      fr: "L'extraction n'est décidée qu'après un examen au centre, quand la dent ne peut pas être sauvée. Pour faire examiner votre dent, écrivez-nous sur WhatsApp au +212 666 56 54 95.",
      ar: 'الخلع لا يُقرَّر إلا بعد فحص في المركز، عندما لا يمكن إنقاذ السن. لفحص سنكم، راسلونا عبر واتساب على +212 666 56 54 95.',
      en: 'Extraction is only decided after an examination at the centre, when the tooth cannot be saved. To have your tooth examined, message us on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'dentures',
    cards: ['whatsapp'],
    match: /(طقم|أسنان متحركة|اسنان متحركه|تركيبة متحركة|prothèse|prothese|denture|removable)/i,
    keywords: ['طقم', 'اسنان متحركه', 'denture'],
    answers: {
      fr: 'Le centre réalise aussi des prothèses, y compris amovibles, adaptées à chaque cas après examen. Pour les détails, écrivez-nous sur WhatsApp au +212 666 56 54 95.',
      ar: 'يقدم المركز أيضاً التركيبات بما فيها المتحركة، مصممة لكل حالة بعد الفحص. للتفاصيل، راسلونا عبر واتساب على +212 666 56 54 95.',
      en: 'The centre also makes prostheses, including removable dentures, tailored to each case after examination. For details, message us on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'sensitivity',
    cards: ['whatsapp'],
    match: /(حساسية|حساسيه|حساسة|حساسه|الم مع البارد|الم مع الحلو|sensibilité|sensibilite|sensitivity|sensitive teeth|hurts when I drink cold)/i,
    keywords: ['حساسيه', 'الم مع البارد', 'sensitivity'],
    answers: {
      fr: "La sensibilité peut avoir plusieurs causes, et je ne peux pas poser de diagnostic ici. Un examen au centre permettra d'en trouver la cause : écrivez-nous sur WhatsApp au +212 666 56 54 95 pour un rendez-vous.",
      ar: 'حساسية الأسنان قد تكون لها أسباب متعددة، ولا أستطيع التشخيص هنا. الفحص في المركز سيحدد السبب: راسلونا عبر واتساب على +212 666 56 54 95 لحجز موعد.',
      en: 'Sensitivity can have several causes, and I cannot diagnose here. An examination at the centre will find the cause: message us on WhatsApp at +212 666 56 54 95 to book.',
    },
  },
  {
    id: 'xray',
    cards: ['whatsapp'],
    match: /(أشعة|اشعه|بانوراما|راديو|radiographie|panoramique|x-ray|xray)/i,
    keywords: ['اشعه', 'بانوراما', 'xray', 'x-ray'],
    answers: {
      fr: "Pour savoir si une radiographie est nécessaire dans votre cas, le centre vous le confirmera lors de l'examen ou directement sur WhatsApp au +212 666 56 54 95.",
      ar: 'لمعرفة ما إذا كانت الأشعة ضرورية في حالتكم، سيؤكد لكم المركز ذلك عند الفحص أو مباشرة عبر واتساب على +212 666 56 54 95.',
      en: 'To know whether an X-ray is needed in your case, the centre will confirm during the examination or directly on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'languages',
    match: /(بتتكلموا|تتكلمون|كتتكلمو|لغات|انجليزي|فرنساوي|langues|parlez-vous|parlez vous|do you speak|you speak|speak english|speak arabic)/i,
    keywords: ['بتتكلموا', 'كتتكلمو', 'لغات', 'do you speak', 'parlez vous'],
    answers: {
      fr: "L'équipe du centre vous accueille en arabe, en français et en anglais, et ce site est disponible dans les trois langues. Écrivez-nous dans la langue qui vous convient !",
      ar: 'فريق المركز يستقبلكم بالعربية والفرنسية والإنجليزية، وهذا الموقع متوفر باللغات الثلاث. راسلونا باللغة التي تناسبكم!',
      en: 'The centre team welcomes you in Arabic, French and English, and this website is available in all three languages. Write to us in whichever language suits you!',
    },
  },
  {
    id: 'services',
    match: /(خدمات|علاجات|تخصصات|شنو كتديرو|اش كتديرو|services|soins|traitements|spécialités|treatments|what do you (do|offer)|your services)/i,
    keywords: ['خدمات', 'علاجات', 'شنو كتديرو', 'services', 'treatments'],
    answers: {
      fr: 'Le centre propose : consultations, nettoyage et détartrage, blanchiment dentaire, prothèses (couronnes, bridges et facettes), implants dentaires, orthodontie pour enfants et adultes, et soins pour enfants. Que puis-je vous expliquer en détail ?',
      ar: 'يقدم المركز: الفحص والاستشارة، التنظيف وإزالة الجير، تبييض الأسنان، التركيبات (تيجان وجسور وفينير)، زراعة الأسنان، تقويم الأسنان للأطفال والبالغين، وعلاجات الأطفال. ما الذي تريدون أن أشرحه لكم بالتفصيل؟',
      en: 'The centre offers: check-ups and consultations, cleaning and scaling, teeth whitening, prostheses (crowns, bridges and veneers), dental implants, orthodontics for children and adults, and care for children. What would you like me to explain in detail?',
    },
  },
  {
    id: 'human',
    cards: ['phone', 'whatsapp'],
    match: /(أكلم شخص|اكلم شخص|موظف|شخص حقيقي|بشري|الطبيب نفسه|كلمني|بغيت نهضر مع|parler à quelqu|un humain|une personne|real person|human|talk to someone|speak to the)/i,
    keywords: ['اكلم شخص', 'موظف', 'بغيت نهضر مع', 'real person', 'humain'],
    answers: {
      fr: "Bien sûr ! Je suis l'assistant automatique du centre, mais l'équipe vous répond directement sur WhatsApp au +212 666 56 54 95 ou par téléphone — touchez une carte ci-dessous.",
      ar: 'بالطبع! أنا المساعد الآلي للمركز، لكن الفريق يرد عليكم مباشرة عبر واتساب على +212 666 56 54 95 أو بالهاتف — اضغطوا على إحدى البطاقتين أسفله.',
      en: 'Of course! I am the centre\'s automated assistant, but the team replies to you directly on WhatsApp at +212 666 56 54 95 or by phone — tap a card below.',
    },
  },
  {
    id: 'thanks',
    match: /(شكرا|شكراً|مشكور|متشكر|تسلم|بارك الله|merci|thank)/i,
    keywords: ['شكرا', 'متشكر', 'تسلم', 'merci', 'thank'],
    answers: {
      fr: "Avec grand plaisir ! N'hésitez pas si vous avez une autre question sur nos services, les horaires ou la réservation. Au plaisir de vous accueillir au centre.",
      ar: 'بكل سرور! لا تترددوا إن كان لديكم أي سؤال آخر عن خدماتنا أو أوقات العمل أو الحجز. نتطلع لاستقبالكم في المركز.',
      en: 'You are very welcome! Do not hesitate if you have another question about our services, hours or booking. We look forward to welcoming you to the centre.',
    },
  },
  {
    id: 'bye',
    match: /(مع السلامة|مع السلامه|إلى اللقاء|الى اللقاء|باي|تصبح على خير|au revoir|à bientôt|bye|goodbye|see you)/i,
    keywords: ['مع السلامه', 'الي اللقاء', 'au revoir', 'bye'],
    answers: {
      fr: "Au revoir et merci de votre visite ! Pour réserver ou poser une question, le centre reste joignable sur WhatsApp au +212 666 56 54 95.",
      ar: 'إلى اللقاء، وشكراً لزيارتكم! للحجز أو أي سؤال، يبقى المركز رهن إشارتكم عبر واتساب على +212 666 56 54 95.',
      en: 'Goodbye and thank you for visiting! To book or ask a question, the centre stays reachable on WhatsApp at +212 666 56 54 95.',
    },
  },
  {
    id: 'greeting',
    match: /(^\s*(سلام|السلام عليكم|سلامو عليكم|مرحبا|صباح الخير|مساء الخير|أهلا|اهلا|لاباس|صباح النور)[\s!.,،]*$)|(^\s*(bonjour|bonsoir|salut|hello|hi|hey)\b)/i,
    answers: {
      fr: 'Bonjour et bienvenue au Centre Dentaire Le Pont ! Je peux vous renseigner sur nos services, les implants, les horaires ou la prise de rendez-vous. Comment puis-je vous aider ?',
      ar: 'مرحباً بكم في مركز Le Pont لطب الأسنان! يمكنني إخباركم بخدماتنا، زراعة الأسنان، أوقات العمل أو كيفية حجز موعد. كيف يمكنني مساعدتكم؟',
      en: "Hello and welcome to Centre Dentaire Le Pont! I can tell you about our services, implants, opening hours or how to book an appointment. How can I help you?",
    },
  },
]

const OFFLIST: Record<Lang, string> = {
  fr: "Merci pour votre message ! Pour cette question précise, l'équipe du centre vous répondra directement et rapidement sur WhatsApp au +212 666 56 54 95 — touchez la carte ci-dessous. Je peux aussi vous renseigner ici sur nos services, les horaires, l'adresse ou la réservation.",
  ar: 'شكراً لرسالتكم! بخصوص هذا السؤال بالذات، سيرد عليكم فريق المركز مباشرة وبسرعة عبر واتساب على +212 666 56 54 95 — اضغطوا على البطاقة أسفله. ويمكنني أيضاً إخباركم هنا بخدماتنا أو أوقات العمل أو العنوان أو كيفية الحجز.',
  en: 'Thank you for your message! For this specific question, the centre team will reply to you directly and quickly on WhatsApp at +212 666 56 54 95 — tap the card below. I can also help you here with our services, hours, address or booking.',
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ً-ٰٟ]/g, '')
    .replace(/ـ/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ئ/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ة/g, 'ه')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function faqAnswer(text: string, siteLang: Lang): FaqAnswer {
  const lang: Lang = ARABIC_SCRIPT.test(text) ? 'ar' : siteLang
  // Layer 1: precise regex intents.
  for (const item of FAQ) {
    if (item.match.test(text)) {
      return { text: item.answers[lang] || item.answers.fr, cards: item.cards || [], answerLang: lang }
    }
  }
  // Layer 2: keyword scoring over normalized text — catches rephrasings
  // and small typos. A single strong keyword (score >= 2 total) wins.
  const norm = ' ' + normalize(text) + ' '
  let best: FaqItem | null = null
  let bestScore = 0
  for (const item of FAQ) {
    if (!item.keywords) continue
    let score = 0
    for (const kw of item.keywords) {
      if (norm.includes(' ' + normalize(kw) + ' ') || norm.includes(normalize(kw))) score += kw.length >= 8 ? 2 : 1
    }
    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }
  if (best && bestScore >= 2) {
    return { text: best.answers[lang] || best.answers.fr, cards: best.cards || [], answerLang: lang }
  }
  // Layer 3: off-list -> WhatsApp invitation.
  return { text: OFFLIST[lang], cards: ['whatsapp'], answerLang: lang }
}
