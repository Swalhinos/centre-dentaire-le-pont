// Clinic identity for Centre Dentaire Le Pont — Résidence Florencia, Tanger, Maroc.
// Phone / WhatsApp everywhere: +212 666-565495 (wa.me/212666565495).
// Address: Bâtiment 02, Porte 01, Route Principale, Rue Florencia, Tanger 90000.
// The centre has no public doctor name, no website and no published hours:
// hours shown on the site (Lun–Sam 09:00–19:00) are a PLACEHOLDER to be
// confirmed by the clinic, and testimonials are generic placeholders.

export type Lang = 'fr' | 'ar' | 'en'

export const CLINIC = {
  name: 'Centre Dentaire Le Pont',
  doctor: 'Tanger · Maroc',
  phoneDisplay: '+212 666 56 54 95',
  phone: '212666565495',
  whatsapp: 'https://wa.me/212666565495',
  address: 'Bâtiment 02, Porte 01, Route Principale, Rue Florencia, Tanger 90000',
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Centre+Dentaire+Le+Pont,+Rue+Florencia,+Tanger',
  mapsEmbed: 'https://www.google.com/maps?q=Centre+Dentaire+Le+Pont,+Rue+Florencia,+Tanger+90000&z=15&output=embed',
}

const fr = {
  nav: {
    about: 'À propos',
    services: 'Services',
    implants: 'Implants',
    whyUs: 'Pourquoi nous',
    faq: 'FAQ',
    contact: 'Contact',
    book: 'Prendre rendez-vous',
  },
  hero: {
    badge: 'Centre dentaire — Tanger, Maroc',
    title: 'Votre sourire commence au Centre Dentaire Le Pont',
    subtitle:
      'À la Résidence Florencia, au cœur de Tanger, notre centre vous accueille pour des soins dentaires complets et en douceur : consultation, nettoyage, blanchiment, prothèses, implants et orthodontie — pour adultes et enfants.',
    cta: 'Prendre rendez-vous',
    call: 'Appeler',
    whatsapp: 'WhatsApp',
    directions: 'Itinéraire',
    stats: [
      { value: '5,0', label: 'Note Google de nos patients' },
      { value: '3', label: 'Langues : arabe, français, anglais' },
      { value: '6j/7', label: 'Ouvert du lundi au samedi' },
    ],
  },
  about: {
    badge: 'À propos du centre',
    title: 'Centre Dentaire Le Pont',
    role: 'Centre dentaire — Résidence Florencia, Tanger',
    p1: 'Le Centre Dentaire Le Pont est un centre dentaire situé à la Résidence Florencia, sur la Route Principale à Tanger. Nous réunissons en un seul lieu l’ensemble des soins dentaires, des contrôles de routine aux traitements complets, avec des équipements modernes et des protocoles de stérilisation rigoureux.',
    p2: 'Que vous veniez pour un simple nettoyage, un blanchiment, une prothèse ou un implant, notre équipe veille à ce que chaque visite soit confortable, claire et adaptée à vos besoins — pour les adultes comme pour les enfants.',
    points: [
      'Équipements modernes et stérilisation rigoureuse',
      'Soins en douceur pour adultes et enfants',
      'Accueil en arabe, français et anglais',
      'Rendez-vous simple et rapide par WhatsApp',
    ],
  },
  services: {
    badge: 'Nos services',
    title: 'Des soins complets pour chaque sourire',
    subtitle: 'De la prévention aux traitements complets, tout est réuni au même endroit.',
    items: [
      {
        title: 'Implants dentaires',
        desc: 'Des remplacements fixes et naturels pour les dents manquantes, pour retrouver un sourire complet.',
      },
      {
        title: 'Orthodontie',
        desc: 'Appareils et aligneurs transparents pour aligner les dents des enfants et des adultes, à tout âge.',
      },
      {
        title: 'Blanchiment dentaire',
        desc: 'Un blanchiment professionnel, réalisé au centre, pour un sourire visiblement plus éclatant.',
      },
      {
        title: 'Prothèses dentaires',
        desc: 'Couronnes, bridges et prothèses sur mesure pour restaurer la forme, la fonction et l’esthétique.',
      },
      {
        title: 'Consultation, nettoyage & détartrage',
        desc: 'Examen complet, détartrage et conseils de prévention pour garder des dents saines toute la vie.',
      },
      {
        title: 'Soins pour enfants',
        desc: 'Des soins doux et adaptés aux plus jeunes, pour des premières visites sans peur.',
      },
    ],
  },
  implants: {
    badge: 'Implants dentaires',
    title: 'Retrouvez un sourire complet et naturel',
    subtitle: 'L’implant dentaire remplace la racine de la dent manquante par une solution fixe, stable et durable — sans toucher aux dents voisines.',
    benefits: [
      'Aspect et sensation naturels, comme vos propres dents',
      'Stabilité totale pour manger et parler en confiance',
      'Préserve l’os de la mâchoire et la structure du visage',
      'Solution durable, conçue pour durer de nombreuses années',
    ],
    cta: 'Discuter de mon implant sur WhatsApp',
  },
  why: {
    badge: 'Pourquoi nous choisir',
    title: 'La différence que l’on ressent',
    items: [
      {
        title: 'Technologie moderne',
        desc: 'Équipements modernes et protocoles de stérilisation avancés pour votre sécurité.',
      },
      {
        title: 'Approche en douceur',
        desc: 'Des soins attentifs et une anesthésie efficace pour une expérience sans stress.',
      },
      {
        title: 'Toute la famille',
        desc: 'Des soins adaptés aux adultes, aux enfants et aux seniors, dans une ambiance bienveillante.',
      },
      {
        title: 'Emplacement pratique',
        desc: 'À la Résidence Florencia, sur la Route Principale (rue Florencia), à Tanger.',
      },
    ],
  },
  testimonials: {
    badge: 'Témoignages',
    title: 'Ce que disent nos patients',
    items: [
      {
        name: 'Youssef B.',
        text: 'Accueil très professionnel et explications claires dès la première visite. Le nettoyage s’est fait en douceur et sans douleur. Je recommande ce centre à Tanger.',
      },
      {
        name: 'Omar E.',
        text: 'J’ai fait poser une couronne et le résultat est impeccable, on ne voit aucune différence avec mes dents naturelles. Suivi sérieux après le soin.',
      },
      {
        name: 'Karim T.',
        text: 'Mon fils avait peur du dentiste, mais l’équipe a su le mettre en confiance dès la première séance. Il y retourne désormais sans aucune crainte.',
      },
    ],
  },
  faq: {
    badge: 'FAQ',
    title: 'Questions fréquentes',
    items: [
      {
        q: 'Comment prendre rendez-vous ?',
        a: 'Vous pouvez réserver via le formulaire de cette page, nous appeler directement ou nous envoyer un message WhatsApp au +212 666 56 54 95. Nous répondons rapidement pendant les heures d’ouverture.',
      },
      {
        q: 'Proposez-vous des implants dentaires ?',
        a: 'Oui. Le centre remplace les dents manquantes par des implants fixes et naturels. Contactez-nous sur WhatsApp pour une première évaluation de votre cas.',
      },
      {
        q: 'Le blanchiment dentaire est-il sûr ?',
        a: 'Oui. Le blanchiment professionnel, réalisé au centre sous supervision dentaire, est sûr et offre des résultats supérieurs et plus durables que les kits à domicile.',
      },
      {
        q: 'Quelles langues parlez-vous ?',
        a: 'Notre équipe vous accueille en arabe, en français et en anglais, pour que vous puissiez communiquer confortablement.',
      },
      {
        q: 'Où se situe le centre ?',
        a: 'À la Résidence Florencia : Bâtiment 02, Porte 01, Route Principale, Rue Florencia, Tanger 90000. Utilisez le bouton « Itinéraire » ci-dessous pour nous trouver facilement sur Google Maps.',
      },
      {
        q: 'Gérez-vous les urgences dentaires ?',
        a: 'Oui, nous faisons de notre mieux pour recevoir les urgences le jour même. Appelez-nous ou envoyez-nous un message WhatsApp immédiatement si vous avez mal.',
      },
    ],
  },
  appointment: {
    badge: 'Réservez votre visite',
    title: 'Prendre rendez-vous',
    subtitle: 'Remplissez le formulaire et nous confirmerons votre rendez-vous par téléphone ou WhatsApp.',
    name: 'Nom complet',
    namePh: 'Votre nom complet',
    phone: 'Téléphone',
    phonePh: '+212 6 XX XX XX XX',
    service: 'Service',
    servicePh: 'Choisir un service',
    date: 'Date souhaitée',
    message: 'Message (optionnel)',
    messagePh: 'Parlez-nous de vos besoins…',
    submit: 'Envoyer via WhatsApp',
    note: 'Votre demande s’ouvre dans WhatsApp — nous confirmons pendant les heures d’ouverture.',
  },
  contact: {
    badge: 'Contact et accès',
    title: 'Visitez notre centre',
    addressLabel: 'Adresse',
    phoneLabel: 'Téléphone',
    hoursLabel: 'Horaires d’ouverture',
    hours: ['Lundi – Samedi : 09:00 – 19:00'],
    directions: 'Itinéraire',
  },
  footer: {
    tagline: 'Des soins dentaires complets au cœur de Tanger.',
    quickLinks: 'Liens rapides',
    contactTitle: 'Contact',
    rights: 'Tous droits réservés.',
  },
}

const en = {
  nav: {
    about: 'About',
    services: 'Services',
    implants: 'Implants',
    whyUs: 'Why Us',
    faq: 'FAQ',
    contact: 'Contact',
    book: 'Book Appointment',
  },
  hero: {
    badge: 'Dental centre — Tangier, Morocco',
    title: 'Your Smile Starts at Centre Dentaire Le Pont',
    subtitle:
      'At Résidence Florencia, in the heart of Tangier, our centre welcomes you for complete, gentle dental care: check-ups, cleaning, whitening, prostheses, implants and orthodontics — for adults and children.',
    cta: 'Book Appointment',
    call: 'Call Now',
    whatsapp: 'WhatsApp',
    directions: 'Get Directions',
    stats: [
      { value: '5.0', label: 'Google rating from our patients' },
      { value: '3', label: 'Languages: Arabic, French, English' },
      { value: '6/7', label: 'Open Monday to Saturday' },
    ],
  },
  about: {
    badge: 'About the Centre',
    title: 'Centre Dentaire Le Pont',
    role: 'Dental centre — Résidence Florencia, Tangier',
    p1: 'Centre Dentaire Le Pont is a dental centre located at Résidence Florencia, on the Route Principale in Tangier. We bring all dental care together in one place, from routine check-ups to complete treatments, with modern equipment and rigorous sterilisation protocols.',
    p2: 'Whether you come for a simple cleaning, whitening, a prosthesis or an implant, our team makes sure every visit is comfortable, clear and tailored to your needs — for adults and children alike.',
    points: [
      'Modern equipment and rigorous sterilisation',
      'Gentle care for adults and children',
      'Welcome in Arabic, French and English',
      'Simple, fast booking via WhatsApp',
    ],
  },
  services: {
    badge: 'Our Services',
    title: 'Complete Care for Every Smile',
    subtitle: 'From prevention to complete treatments, everything is in one place.',
    items: [
      {
        title: 'Dental Implants',
        desc: 'Fixed, natural-looking replacements for missing teeth, to restore a complete smile.',
      },
      {
        title: 'Orthodontics',
        desc: 'Braces and clear aligners to straighten the teeth of children and adults, at any age.',
      },
      {
        title: 'Teeth Whitening',
        desc: 'Professional whitening performed at the centre, for a visibly brighter smile.',
      },
      {
        title: 'Dental Prostheses',
        desc: 'Custom crowns, bridges and prostheses to restore shape, function and aesthetics.',
      },
      {
        title: 'Check-up, Cleaning & Scaling',
        desc: 'Complete examination, scaling and prevention advice to keep your teeth healthy for life.',
      },
      {
        title: 'Care for Children',
        desc: 'Gentle care adapted to the youngest, for fear-free first visits.',
      },
    ],
  },
  implants: {
    badge: 'Dental Implants',
    title: 'A Complete, Natural-Looking Smile Again',
    subtitle: 'A dental implant replaces the root of a missing tooth with a fixed, stable and long-lasting solution — without touching neighbouring teeth.',
    benefits: [
      'Natural look and feel, just like your own teeth',
      'Full stability to eat and speak with confidence',
      'Preserves the jawbone and facial structure',
      'A durable solution built to last for many years',
    ],
    cta: 'Discuss My Implant on WhatsApp',
  },
  why: {
    badge: 'Why Choose Us',
    title: 'The Difference You Can Feel',
    items: [
      {
        title: 'Modern Technology',
        desc: 'Modern equipment and advanced sterilisation protocols for your safety.',
      },
      {
        title: 'Gentle Approach',
        desc: 'Attentive care and effective anaesthesia for a stress-free experience.',
      },
      {
        title: 'The Whole Family',
        desc: 'Care tailored to adults, children and seniors, in a warm atmosphere.',
      },
      {
        title: 'Practical Location',
        desc: 'At Résidence Florencia, on the Route Principale (Rue Florencia), Tangier.',
      },
    ],
  },
  testimonials: {
    badge: 'Patient Testimonials',
    title: 'What Our Patients Say',
    items: [
      {
        name: 'Youssef B.',
        text: 'Very professional welcome and clear explanations from the first visit. The cleaning was gentle and painless. I recommend this centre in Tangier.',
      },
      {
        name: 'Omar E.',
        text: 'I had a crown fitted and the result is flawless — you cannot tell it apart from my natural teeth. Serious follow-up after the treatment.',
      },
      {
        name: 'Karim T.',
        text: 'My son used to fear the dentist, but the team put him at ease from the very first session. Now he goes back without any fear.',
      },
    ],
  },
  faq: {
    badge: 'FAQ',
    title: 'Frequently Asked Questions',
    items: [
      {
        q: 'How do I book an appointment?',
        a: 'You can book via the form on this page, by calling us directly, or by sending a WhatsApp message to +212 666 56 54 95. We respond quickly during working hours.',
      },
      {
        q: 'Do you offer dental implants?',
        a: 'Yes. The centre replaces missing teeth with fixed, natural-looking implants. Contact us on WhatsApp for an initial assessment of your case.',
      },
      {
        q: 'Is teeth whitening safe?',
        a: 'Yes. Professional whitening, performed at the centre under dental supervision, is safe and delivers superior, longer-lasting results compared to home kits.',
      },
      {
        q: 'What languages do you speak?',
        a: 'Our team welcomes you in Arabic, French and English, so you can communicate comfortably.',
      },
      {
        q: 'Where is the centre located?',
        a: 'At Résidence Florencia: Bâtiment 02, Porte 01, Route Principale, Rue Florencia, Tangier 90000. Use the Get Directions button below to find us easily on Google Maps.',
      },
      {
        q: 'Do you handle dental emergencies?',
        a: 'Yes, we do our best to see emergency cases the same day. Call or WhatsApp us immediately if you are in pain.',
      },
    ],
  },
  appointment: {
    badge: 'Book Your Visit',
    title: 'Request an Appointment',
    subtitle: 'Fill in the form and we will confirm your appointment by phone or WhatsApp.',
    name: 'Full Name',
    namePh: 'Your full name',
    phone: 'Phone Number',
    phonePh: '+212 6 XX XX XX XX',
    service: 'Service',
    servicePh: 'Select a service',
    date: 'Preferred Date',
    message: 'Message (optional)',
    messagePh: 'Tell us about your needs…',
    submit: 'Send via WhatsApp',
    note: 'Your request opens in WhatsApp — we confirm within working hours.',
  },
  contact: {
    badge: 'Contact and Location',
    title: 'Visit Our Centre',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    hoursLabel: 'Opening Hours',
    hours: ['Monday – Saturday: 9:00 AM – 7:00 PM'],
    directions: 'Get Directions',
  },
  footer: {
    tagline: 'Complete dental care in the heart of Tangier.',
    quickLinks: 'Quick Links',
    contactTitle: 'Contact',
    rights: 'All rights reserved.',
  },
}

const ar = {
  nav: {
    about: 'من نحن',
    services: 'خدماتنا',
    implants: 'زراعة الأسنان',
    whyUs: 'لماذا نحن',
    faq: 'الأسئلة الشائعة',
    contact: 'اتصل بنا',
    book: 'حجز موعد',
  },
  hero: {
    badge: 'مركز طب الأسنان — طنجة، المغرب',
    title: 'ابتسامتك تبدأ من مركز Le Pont لطب الأسنان',
    subtitle: 'في إقامة فلورنسيا، في قلب طنجة، يستقبلكم مركزنا لرعاية متكاملة ولطيفة للأسنان: فحص، تنظيف، تبييض، تركيبات، زراعة وتقويم — للبالغين والأطفال.',
    cta: 'حجز موعد',
    call: 'اتصل الآن',
    whatsapp: 'واتساب',
    directions: 'الاتجاهات',
    stats: [
      { value: '5.0', label: 'تقييمنا على غوغل من مرضانا' },
      { value: '3', label: 'لغات: العربية والفرنسية والإنجليزية' },
      { value: '6/7', label: 'مفتوح من الاثنين إلى السبت' },
    ],
  },
  about: {
    badge: 'عن المركز',
    title: 'مركز Le Pont لطب الأسنان',
    role: 'مركز طب الأسنان — إقامة فلورنسيا، طنجة',
    p1: 'مركز Le Pont لطب الأسنان هو مركز يقع في إقامة فلورنسيا، على الطريق الرئيسية بمدينة طنجة. نجمع في مكان واحد كل علاجات الأسنان، من الفحوصات الدورية إلى العلاجات الكاملة، بمعدّات حديثة وبروتوكولات تعقيم صارمة.',
    p2: 'سواء جئتم من أجل تنظيف بسيط أو تبييض أو تركيبة أو زرعة، يحرص فريقنا على أن تكون كل زيارة مريحة وواضحة ومصمّمة وفق احتياجاتكم — للبالغين والأطفال على حدّ سواء.',
    points: [
      'معدّات حديثة وتعقيم صارم',
      'رعاية لطيفة للبالغين والأطفال',
      'استقبال بالعربية والفرنسية والإنجليزية',
      'حجز بسيط وسريع عبر واتساب',
    ],
  },
  services: {
    badge: 'خدماتنا',
    title: 'رعاية متكاملة لكل ابتسامة',
    subtitle: 'من الوقاية إلى العلاجات الكاملة، كل شيء متوفر في مكان واحد.',
    items: [
      {
        title: 'زراعة الأسنان',
        desc: 'بدائل ثابتة وطبيعية المظهر للأسنان المفقودة، لاستعادة ابتسامة كاملة.',
      },
      {
        title: 'تقويم الأسنان',
        desc: 'أجهزة تقويم ومصفّفات شفافة لمحاذاة أسنان الأطفال والبالغين في أي عمر.',
      },
      {
        title: 'تبييض الأسنان',
        desc: 'تبييض احترافي يُجرى في المركز، لابتسامة أكثر إشراقًا بشكل واضح.',
      },
      {
        title: 'تركيبات الأسنان',
        desc: 'تيجان وجسور وتركيبات مصمّمة خصيصًا لاستعادة الشكل والوظيفة والجمال.',
      },
      {
        title: 'الفحص والتنظيف وإزالة الجير',
        desc: 'فحص كامل وتنظيف ونصائح وقائية للحفاظ على أسنان سليمة مدى الحياة.',
      },
      {
        title: 'علاجات الأطفال',
        desc: 'رعاية لطيفة ومكيّفة مع الصغار، لزيارات أولى بلا خوف.',
      },
    ],
  },
  implants: {
    badge: 'زراعة الأسنان',
    title: 'ابتسامة كاملة وطبيعية من جديد',
    subtitle: 'تُعوّض زرعة الأسنان جذر السنّ المفقود بحلّ ثابت ومستقرّ وطويل الأمد — دون المساس بالأسنان المجاورة.',
    benefits: [
      'مظهر وإحساس طبيعيان، مثل أسنانك تمامًا',
      'ثبات كامل للأكل والتحدث بثقة',
      'تحافظ على عظم الفك وبنية الوجه',
      'حلّ متين مصمّم ليدوم سنوات عديدة',
    ],
    cta: 'ناقش زرعتك عبر واتساب',
  },
  why: {
    badge: 'لماذا تختارنا',
    title: 'الفرق الذي تشعر به',
    items: [
      {
        title: 'تقنيات حديثة',
        desc: 'معدّات حديثة وبروتوكولات تعقيم متقدّمة من أجل سلامتكم.',
      },
      {
        title: 'نهج لطيف',
        desc: 'رعاية يقظة وتخدير فعّال لتجربة خالية من التوتر.',
      },
      {
        title: 'كل العائلة',
        desc: 'رعاية مصمّمة للبالغين والأطفال وكبار السن في أجواء دافئة.',
      },
      {
        title: 'موقع عملي',
        desc: 'في إقامة فلورنسيا، على الطريق الرئيسية (زنقة فلورنسيا)، طنجة.',
      },
    ],
  },
  testimonials: {
    badge: 'شهادات المرضى',
    title: 'ماذا يقول مرضانا',
    items: [
      {
        name: 'يوسف ب.',
        text: 'استقبال احترافي جدًا وشرح واضح منذ الزيارة الأولى. تم التنظيف بلطف ودون ألم. أنصح بهذا المركز في طنجة.',
      },
      {
        name: 'عمر إ.',
        text: 'ركّبت تاجًا وكانت النتيجة ممتازة، لا يمكن تمييزه عن أسناني الطبيعية. ومتابعة جدّية بعد العلاج.',
      },
      {
        name: 'كريم ت.',
        text: 'كان ابني يخاف من طبيب الأسنان، لكن الفريق جعله يثق منذ الجلسة الأولى. صار يذهب الآن دون أي خوف.',
      },
    ],
  },
  faq: {
    badge: 'الأسئلة الشائعة',
    title: 'الأسئلة الأكثر شيوعًا',
    items: [
      {
        q: 'كيف أحجز موعدًا؟',
        a: 'يمكنكم الحجز عبر نموذج هذه الصفحة، أو بالاتصال بنا مباشرة، أو بإرسال رسالة واتساب إلى +212 666 56 54 95. نردّ بسرعة خلال ساعات العمل.',
      },
      {
        q: 'هل تقدّمون زراعة الأسنان؟',
        a: 'نعم. يعوّض المركز الأسنان المفقودة بزرعات ثابتة وطبيعية المظهر. تواصلوا معنا عبر واتساب لتقييم أولي لحالتكم.',
      },
      {
        q: 'هل تبييض الأسنان آمن؟',
        a: 'نعم. التبييض الاحترافي الذي يُجرى في المركز تحت إشراف طبيب الأسنان آمن ويعطي نتائج أفضل وتدوم أطول مقارنة بالمنتجات المنزلية.',
      },
      {
        q: 'ما اللغات التي تتحدثونها؟',
        a: 'يستقبلكم فريقنا بالعربية والفرنسية والإنجليزية، لتتواصلوا براحة.',
      },
      {
        q: 'أين يقع المركز؟',
        a: 'في إقامة فلورنسيا: العمارة 02، الباب 01، الطريق الرئيسية، زنقة فلورنسيا، طنجة 90000. استخدموا زر الاتجاهات أسفله لتجدونا بسهولة على خرائط غوغل.',
      },
      {
        q: 'هل تعالجون طوارئ الأسنان؟',
        a: 'نعم، نبذل قصارى جهدنا لاستقبال حالات الطوارئ في اليوم نفسه. اتصلوا بنا أو راسلونا عبر واتساب فورًا إذا كنتم تشعرون بالألم.',
      },
    ],
  },
  appointment: {
    badge: 'احجز زيارتك',
    title: 'طلب موعد',
    subtitle: 'املأ النموذج وسنؤكد موعدك عبر الهاتف أو واتساب.',
    name: 'الاسم الكامل',
    namePh: 'اسمك الكامل',
    phone: 'رقم الهاتف',
    phonePh: '+212 6 XX XX XX XX',
    service: 'الخدمة',
    servicePh: 'اختر خدمة',
    date: 'التاريخ المفضّل',
    message: 'رسالة (اختياري)',
    messagePh: 'أخبرنا عن احتياجاتك…',
    submit: 'إرسال عبر واتساب',
    note: 'يُفتح طلبك في واتساب — نؤكد خلال ساعات العمل.',
  },
  contact: {
    badge: 'اتصل بنا والموقع',
    title: 'زوروا مركزنا',
    addressLabel: 'العنوان',
    phoneLabel: 'الهاتف',
    hoursLabel: 'ساعات العمل',
    hours: ['الاثنين – السبت: 09:00 – 19:00'],
    directions: 'الاتجاهات',
  },
  footer: {
    tagline: 'رعاية أسنان متكاملة في قلب طنجة.',
    quickLinks: 'روابط سريعة',
    contactTitle: 'اتصل بنا',
    rights: 'جميع الحقوق محفوظة.',
  },
}

export const translations = { fr, ar, en }

export type Translation = typeof translations.fr
