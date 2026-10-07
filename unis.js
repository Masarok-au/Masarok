/* Masarok university picker: data + logic shared by the English and Arabic pages. */
(function () {
  "use strict";

  var CITIES = {
    sydney: { cc: "au",
      tap: { en: "You can also tap on with a contactless bank card.", ar: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية." },
      en: "Sydney", ar: "سيدني",
      transport: { en: "Opal card", ar: "بطاقة أوبال (Opal)", url: "https://transportnsw.info" },
      bond: { en: "NSW Fair Trading", ar: "NSW Fair Trading", url: "https://www.fairtrading.nsw.gov.au" },
      food: {
        en: "Suburbs such as Lakemba and Auburn are well known for halal food.",
        ar: "أحياء مثل لاكمبا (Lakemba) وأوبرن (Auburn) معروفة بالمطاعم الحلال."
      }
    },
    melbourne: { cc: "au",
      tap: { en: "Since mid-2026, full-fare passengers can also tap on with a contactless bank card.", ar: "منذ منتصف 2026 يمكن لركاب التذكرة الكاملة الدفع بالبطاقة البنكية اللاتلامسية أيضًا." },
      en: "Melbourne", ar: "ملبورن",
      transport: { en: "myki card", ar: "بطاقة مايكي (myki)", url: "https://www.ptv.vic.gov.au" },
      bond: { en: "the Residential Tenancies Bond Authority (RTBA)", ar: "هيئة سندات الإيجار (RTBA)", url: "https://rentalbonds.vic.gov.au" },
      food: {
        en: "Sydney Road in Brunswick and Coburg is well known for halal and Middle Eastern food.",
        ar: "شارع Sydney Road في برنزويك وكوبرغ معروف بالمطاعم الحلال والعربية."
      }
    },
    brisbane: { cc: "au",
      tap: { en: "You can also tap on with a contactless bank card, and a new Translink card is replacing the go card during 2026.", ar: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية، وتحل بطاقة Translink الجديدة محل go card خلال 2026." },
      en: "Brisbane", ar: "بريزبن",
      transport: { en: "go card", ar: "بطاقة go card", url: "https://translink.com.au" },
      bond: { en: "the Residential Tenancies Authority (RTA)", ar: "هيئة الإيجارات السكنية (RTA)", url: "https://www.rta.qld.gov.au" }
    },
    adelaide: { cc: "au",
      tap: { en: "You can also tap on with a contactless bank card at the regular fare.", ar: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية بسعر التذكرة العادية." },
      en: "Adelaide", ar: "أديلايد",
      transport: { en: "metroCARD", ar: "بطاقة metroCARD", url: "https://www.adelaidemetro.com.au" },
      bond: { en: "Consumer and Business Services (CBS)", ar: "Consumer and Business Services (CBS)", url: "https://www.cbs.sa.gov.au" }
    },
    perth: { cc: "au",
      tap: { en: "You can also tap on with a contactless bank card at the standard fare.", ar: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية بالسعر العادي." },
      en: "Perth", ar: "بيرث",
      transport: { en: "SmartRider card", ar: "بطاقة SmartRider", url: "https://www.transperth.wa.gov.au" },
      bond: { en: "the Bond Administrator (Consumer Protection WA)", ar: "إدارة التأمينات (Consumer Protection WA)", url: "https://www.commerce.wa.gov.au/consumer-protection" }
    },
    canberra: { cc: "au",
      tap: { en: "You can also tap on with a contactless bank card, or use the QR code in the Transport Canberra app.", ar: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية، أو استخدام رمز QR في تطبيق Transport Canberra." },
      en: "Canberra", ar: "كانبرا",
      transport: { en: "MyWay+ card", ar: "بطاقة MyWay+", url: "https://www.transport.act.gov.au" },
      bond: { en: "the ACT Revenue Office", ar: "مكتب الإيرادات في ACT (ACT Revenue Office)", url: "https://www.revenue.act.gov.au/rental-bonds" }
    },
    // ---------- USA ----------
    boston: { cc: "us", en: "Boston", ar: "بوسطن",
      transport: { en: "CharlieCard", ar: "بطاقة CharlieCard", url: "https://www.mbta.com" },
      bond: { en: "Massachusetts deposit rules", ar: "أنظمة التأمين في ماساتشوستس", url: "https://www.mass.gov/info-details/security-deposits-and-last-months-rent" },
      tap: { en: "You can also tap a contactless bank card or phone on MBTA buses and trains.", ar: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية أو الجوال في حافلات وقطارات MBTA." } },
    newyork: { cc: "us", en: "New York", ar: "نيويورك",
      transport: { en: "OMNY", ar: "نظام OMNY", url: "https://omny.info" },
      bond: { en: "New York tenants' rights", ar: "حقوق المستأجرين في نيويورك", url: "https://ag.ny.gov/resources/individuals/tenants-homeowners/tenants" },
      tap: { en: "With OMNY you tap a contactless bank card or phone on the subway and buses.", ar: "مع OMNY تدفع بالبطاقة البنكية اللاتلامسية أو الجوال في المترو والحافلات." } },
    losangeles: { cc: "us", en: "Los Angeles", ar: "لوس أنجلوس",
      transport: { en: "TAP card", ar: "بطاقة TAP", url: "https://www.taptogo.net" },
      bond: { en: "California's deposit guide", ar: "دليل التأمين في كاليفورنيا", url: "https://selfhelp.courts.ca.gov/guide-security-deposits" },
      tap: { en: "Many students in LA rely on campus shuttles and buses, so check what your university offers.", ar: "يعتمد كثير من الطلاب في لوس أنجلوس على حافلات الجامعة والحافلات العامة، فاسأل جامعتك عما تقدمه." } },
    bayarea: { cc: "us", en: "the San Francisco Bay Area", ar: "منطقة خليج سان فرانسيسكو",
      transport: { en: "Clipper card", ar: "بطاقة Clipper", url: "https://www.clippercard.com" },
      bond: { en: "California's deposit guide", ar: "دليل التأمين في كاليفورنيا", url: "https://selfhelp.courts.ca.gov/guide-security-deposits" },
      tap: { en: "Ask your university about free or discounted transit passes for students.", ar: "اسأل جامعتك عن اشتراكات المواصلات المجانية أو المخفضة للطلاب." } },
    pittsburgh: { cc: "us", en: "Pittsburgh", ar: "بيتسبرغ",
      transport: { en: "ConnectCard", ar: "بطاقة ConnectCard", url: "https://www.rideprt.org" },
      bond: { en: "Pennsylvania's tenant guide", ar: "دليل المستأجر في بنسلفانيا", url: "https://www.attorneygeneral.gov/wp-content/uploads/2025/03/ConsumerTenant-Landlord-Guide.pdf" },
      tap: { en: "Ask your university whether your student ID covers bus travel.", ar: "اسأل جامعتك إن كانت بطاقتك الجامعية تغطي ركوب الحافلات." } },
    seattle: { cc: "us", en: "Seattle", ar: "سياتل",
      transport: { en: "ORCA card", ar: "بطاقة ORCA", url: "https://myorca.com" },
      bond: { en: "Washington's landlord–tenant guide", ar: "دليل الإيجار في ولاية واشنطن", url: "https://www.atg.wa.gov/landlord-tenant" },
      tap: { en: "Ask your university about the student transit pass.", ar: "اسأل جامعتك عن اشتراك المواصلات للطلاب." } },
    austin: { cc: "us", en: "Austin", ar: "أوستن",
      transport: { en: "CapMetro pass", ar: "اشتراك CapMetro", url: "https://www.capmetro.org" },
      bond: { en: "Texas renters' rights", ar: "حقوق المستأجرين في تكساس", url: "https://www.texasattorneygeneral.gov/consumer-protection/home-real-estate-and-travel/renters-rights" },
      tap: { en: "Ask your university whether your student ID covers bus travel.", ar: "اسأل جامعتك إن كانت بطاقتك الجامعية تغطي ركوب الحافلات." } },
    madison: { cc: "us", en: "Madison", ar: "ماديسون",
      transport: { en: "Madison Metro", ar: "حافلات Madison Metro", url: "https://www.cityofmadison.com/metro" },
      bond: { en: "Wisconsin's landlord–tenant guide", ar: "دليل الإيجار في ويسكونسن", url: "https://datcp.wi.gov/Pages/Publications/LandlordTenantGuide.aspx" },
      tap: { en: "UW–Madison students who pay the transportation fee can get a student bus pass for Madison Metro. Pick it up at UW Transportation Services with your Wiscard.", ar: "يمكن لطلاب جامعة ويسكونسن–ماديسون الذين يدفعون رسوم المواصلات الحصول على اشتراك الحافلات للطلاب. استلمه من مكتب المواصلات في الجامعة ببطاقتك الجامعية Wiscard." } },
    philadelphia: { cc: "us", en: "Philadelphia", ar: "فيلادلفيا",
      transport: { en: "SEPTA", ar: "شبكة SEPTA", url: "https://www.septa.org" },
      bond: { en: "Pennsylvania's tenant guide", ar: "دليل المستأجر في بنسلفانيا", url: "https://www.attorneygeneral.gov/wp-content/uploads/2025/03/ConsumerTenant-Landlord-Guide.pdf" },
      tap: { en: "On SEPTA you can tap a contactless bank card or phone on buses, trolleys and the subway. Penn also runs free campus shuttles.", ar: "في شبكة SEPTA تدفع بالبطاقة البنكية اللاتلامسية أو الجوال في الحافلات والترام والمترو. وتوفر جامعة بنسلفانيا حافلات مجانية حول الحرم." } },
    statecollege: { cc: "us", en: "State College", ar: "ستيت كوليدج",
      transport: { en: "CATA buses", ar: "حافلات CATA", url: "https://catabus.com" },
      bond: { en: "Pennsylvania's tenant guide", ar: "دليل المستأجر في بنسلفانيا", url: "https://www.attorneygeneral.gov/wp-content/uploads/2025/03/ConsumerTenant-Landlord-Guide.pdf" },
      tap: { en: "Most students walk to campus. A CATA bus ride costs US$2.50, so check with Penn State Transportation Services for any student options.", ar: "يمشي أغلب الطلاب إلى الحرم. وتكلف رحلة حافلة CATA ‏2.50 دولار، فاسأل مكتب المواصلات في جامعة بنسلفانيا ستيت عن خيارات الطلاب." } },
    // ---------- UK ----------
    london: { cc: "uk", en: "London", ar: "لندن",
      transport: { en: "Oyster card", ar: "بطاقة Oyster", url: "https://tfl.gov.uk" },
      bond: { en: "a government-approved deposit protection scheme", ar: "نظام حكومي معتمد لحماية التأمين", url: "https://www.gov.uk/tenancy-deposit-protection" },
      tap: { en: "You can also tap in with a contactless bank card or phone. A Student Oyster photocard gives 30% off travelcards and bus passes.", ar: "يمكنك أيضًا الدفع بالبطاقة البنكية اللاتلامسية أو الجوال، وبطاقة Student Oyster تمنحك خصم 30% على الاشتراكات." },
      food: { en: "Edgware Road and Whitechapel are well known for halal food. Ask your university's Islamic Society about prayer rooms.", ar: "شارع Edgware Road ومنطقة Whitechapel معروفان بالمطاعم الحلال. واسأل الجمعية الإسلامية في جامعتك عن أماكن الصلاة." } },
    manchester: { cc: "uk", en: "Manchester", ar: "مانشستر",
      transport: { en: "Bee Network", ar: "شبكة Bee Network", url: "https://tfgm.com" },
      bond: { en: "a government-approved deposit protection scheme", ar: "نظام حكومي معتمد لحماية التأمين", url: "https://www.gov.uk/tenancy-deposit-protection" },
      tap: { en: "You can tap a contactless bank card or phone on Bee Network buses and Metrolink trams.", ar: "يمكنك الدفع بالبطاقة البنكية اللاتلامسية أو الجوال في حافلات Bee Network وترام Metrolink." },
      food: { en: "Rusholme's Wilmslow Road, the 'Curry Mile', is well known for halal food, close to the university.", ar: "شارع Wilmslow Road في Rusholme («Curry Mile») معروف بالمطاعم الحلال وقريب من الجامعة." } },
    edinburgh: { cc: "uk", en: "Edinburgh", ar: "إدنبرة",
      transport: { en: "Lothian Buses", ar: "حافلات Lothian", url: "https://www.lothianbuses.com" },
      bond: { en: "Scotland's tenancy deposit schemes", ar: "أنظمة حماية التأمين في اسكتلندا", url: "https://www.mygov.scot/tenancy-deposits-tenants" },
      tap: { en: "You can tap a contactless bank card or phone on Lothian buses and trams.", ar: "يمكنك الدفع بالبطاقة البنكية اللاتلامسية أو الجوال في حافلات Lothian والترام." } },
    birmingham: { cc: "uk", en: "Birmingham", ar: "برمنغهام",
      transport: { en: "Swift card", ar: "بطاقة Swift", url: "https://www.tfwm.org.uk" },
      bond: { en: "a government-approved deposit protection scheme", ar: "نظام حكومي معتمد لحماية التأمين", url: "https://www.gov.uk/tenancy-deposit-protection" },
      tap: { en: "You can tap a contactless bank card or phone on most buses and trams.", ar: "يمكنك الدفع بالبطاقة البنكية اللاتلامسية أو الجوال في أغلب الحافلات والترام." } },
    leeds: { cc: "uk", en: "Leeds", ar: "ليدز",
      transport: { en: "MCard", ar: "بطاقة MCard", url: "https://www.wymetro.com" },
      bond: { en: "a government-approved deposit protection scheme", ar: "نظام حكومي معتمد لحماية التأمين", url: "https://www.gov.uk/tenancy-deposit-protection" },
      tap: { en: "You can tap a contactless bank card or phone on most buses.", ar: "يمكنك الدفع بالبطاقة البنكية اللاتلامسية أو الجوال في أغلب الحافلات." } },
    // ---------- Canada ----------
    toronto: { cc: "ca", en: "Toronto", ar: "تورنتو",
      transport: { en: "PRESTO card", ar: "بطاقة PRESTO", url: "https://www.prestocard.ca" },
      bond: { en: "Ontario's Landlord and Tenant Board", ar: "مجلس المالك والمستأجر في أونتاريو", url: "https://tribunalsontario.ca/ltb/" },
      tap: { en: "The TTC also takes contactless credit and debit cards and phones.", ar: "تقبل مواصلات TTC أيضًا البطاقات البنكية اللاتلامسية والجوال." } },
    vancouver: { cc: "ca", en: "Vancouver", ar: "فانكوفر",
      transport: { en: "Compass card", ar: "بطاقة Compass", url: "https://www.compasscard.ca" },
      bond: { en: "BC's Residential Tenancy Branch", ar: "مكتب الإيجارات السكنية في بريتش كولومبيا", url: "https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies" },
      tap: { en: "You can also tap a contactless credit card or phone. Ask about the student U-Pass.", ar: "يمكنك أيضًا الدفع بالبطاقة الائتمانية اللاتلامسية أو الجوال. واسأل عن اشتراك الطلاب U-Pass." } },
    montreal: { cc: "ca", en: "Montreal", ar: "مونتريال",
      transport: { en: "OPUS card", ar: "بطاقة OPUS", url: "https://www.stm.info" },
      bond: { en: "Quebec's Tribunal administratif du logement", ar: "محكمة الإسكان في كيبيك (TAL)", url: "https://www.tal.gouv.qc.ca" },
      tap: { en: "Ask about the reduced student fare on an OPUS card with your photo.", ar: "اسأل عن تعرفة الطلاب المخفضة ببطاقة OPUS تحمل صورتك." } },
    waterloo: { cc: "ca", en: "Waterloo", ar: "واترلو",
      transport: { en: "GRT EasyGO card", ar: "بطاقة GRT EasyGO", url: "https://www.grt.ca" },
      bond: { en: "Ontario's Landlord and Tenant Board", ar: "مجلس المالك والمستأجر في أونتاريو", url: "https://tribunalsontario.ca/ltb/" },
      tap: { en: "Ask your university whether a term transit pass is included in your fees.", ar: "اسأل جامعتك إن كان اشتراك المواصلات الفصلي مشمولًا في الرسوم." } },
    // ---------- Germany ----------
    munich: { cc: "de", en: "Munich", ar: "ميونخ",
      transport: { en: "semester ticket (MVV)", ar: "تذكرة الفصل (MVV)", url: "https://www.mvv-muenchen.de" },
      bond: { en: "a tenants' association (Mieterverein)", ar: "جمعية المستأجرين (Mieterverein)", url: "https://www.mieterbund.de" } },
    berlin: { cc: "de", en: "Berlin", ar: "برلين",
      transport: { en: "semester ticket (BVG)", ar: "تذكرة الفصل (BVG)", url: "https://www.bvg.de" },
      bond: { en: "a tenants' association (Mieterverein)", ar: "جمعية المستأجرين (Mieterverein)", url: "https://www.mieterbund.de" },
      food: { en: "Neukölln and Sonnenallee are well known for halal and Arab food.", ar: "حي Neukölln وشارع Sonnenallee معروفان بالمطاعم الحلال والعربية." } },
    aachen: { cc: "de", en: "Aachen", ar: "آخن",
      transport: { en: "semester ticket (AVV)", ar: "تذكرة الفصل (AVV)", url: "https://avv.de" },
      bond: { en: "a tenants' association (Mieterverein)", ar: "جمعية المستأجرين (Mieterverein)", url: "https://www.mieterbund.de" } },
    karlsruhe: { cc: "de", en: "Karlsruhe", ar: "كارلسروه",
      transport: { en: "semester ticket (KVV)", ar: "تذكرة الفصل (KVV)", url: "https://www.kvv.de" },
      bond: { en: "a tenants' association (Mieterverein)", ar: "جمعية المستأجرين (Mieterverein)", url: "https://www.mieterbund.de" } },
    // ---------- Singapore ----------
    singapore: { cc: "sg", en: "Singapore", ar: "سنغافورة",
      transport: { en: "EZ-Link or SimplyGo card", ar: "بطاقة EZ-Link أو SimplyGo", url: "https://www.simplygo.com.sg" },
      bond: { en: "the Council for Estate Agencies", ar: "مجلس الوكالات العقارية", url: "https://www.cea.gov.sg" } }
  };

  var UNIS = [
    { id: "unsw", city: "sydney", short: "UNSW",
      name: { en: "UNSW Sydney", ar: "جامعة نيو ساوث ويلز (UNSW)" },
      campus: { en: "Kensington", ar: "كنسينغتون (Kensington)" },
      web: "https://www.unsw.edu.au",
      college: { name: "UNSW College", url: "https://www.unswcollege.edu.au" },
      union: { name: "Arc @ UNSW", url: "https://www.arc.unsw.edu.au" },
      legal: { en: "Arc's free legal service gives students advice on renting and other problems.", ar: "الخدمة القانونية المجانية من Arc تقدم للطلاب استشارات في الإيجار ومشكلات أخرى." },
      suburbs: "Kensington, Kingsford, Randwick" },
    { id: "usyd", city: "sydney", short: "USyd",
      name: { en: "The University of Sydney", ar: "جامعة سيدني" },
      campus: { en: "Camperdown/Darlington", ar: "كامبرداون/دارلينغتون (Camperdown/Darlington)" },
      web: "https://www.sydney.edu.au",
      college: { name: "Taylors College Sydney (University of Sydney Foundation Program)", url: "https://www.taylorssydney.edu.au" },
      union: { name: "University of Sydney SRC", url: "https://srcusyd.net.au" },
      legal: { en: "The SRC Legal Service gives students free legal advice.", ar: "الخدمة القانونية في SRC تقدم للطلاب استشارات قانونية مجانية." },
      suburbs: "Camperdown, Glebe, Newtown, Redfern" },
    { id: "uts", city: "sydney", short: "UTS",
      name: { en: "University of Technology Sydney", ar: "جامعة التكنولوجيا في سيدني (UTS)" },
      campus: { en: "Ultimo (city campus)", ar: "ألتيمو (Ultimo) في وسط المدينة" },
      web: "https://www.uts.edu.au",
      college: { name: "UTS College", url: "https://www.utscollege.edu.au" },
      union: { name: "ActivateUTS", url: "https://www.activateuts.com.au" },
      legal: { en: "The UTS Student Legal Service gives students free legal advice.", ar: "خدمة UTS القانونية للطلاب تقدم استشارات قانونية مجانية." },
      suburbs: "Ultimo, Haymarket, Chippendale, Glebe" },
    { id: "unimelb", city: "melbourne", short: "UniMelb",
      name: { en: "The University of Melbourne", ar: "جامعة ملبورن" },
      campus: { en: "Parkville", ar: "باركفيل (Parkville)" },
      web: "https://www.unimelb.edu.au",
      college: { name: "Trinity College Foundation Studies", url: "https://www.trinity.unimelb.edu.au" },
      union: { name: "UMSU (University of Melbourne Student Union)", url: "https://umsu.unimelb.edu.au" },
      legal: { en: "The UMSU Legal Service gives students free legal advice.", ar: "الخدمة القانونية في UMSU تقدم للطلاب استشارات قانونية مجانية." },
      suburbs: "Carlton, Parkville, Brunswick",
      entry: { en: "Study completed in Saudi Arabia does not exempt you from an English test.", ar: "الدراسة في السعودية لا تعفيك من اختبار اللغة الإنجليزية." } },
    { id: "monash", city: "melbourne", short: "Monash",
      name: { en: "Monash University", ar: "جامعة موناش" },
      campus: { en: "Clayton", ar: "كلايتون (Clayton)" },
      web: "https://www.monash.edu",
      college: { name: "Monash College", url: "https://www.monashcollege.edu.au" },
      union: { name: "Monash Student Association (MSA)", url: "https://msa.monash.edu" },
      legal: { en: "Free legal advice is available through Monash Law Clinics. The MSA offers non-legal advocacy and support.", ar: "تتوفر الاستشارات القانونية المجانية عبر Monash Law Clinics، وتقدم MSA دعمًا ومناصرة غير قانونية." },
      suburbs: "Clayton, Oakleigh, Notting Hill, Glen Waverley",
      entry: { en: "Monash College Foundation Year accepts the Saudi General Secondary certificate with 70% (Standard) or 65% (Extended).", ar: "تقبل سنة الفاونديشن في Monash College شهادة الثانوية العامة السعودية بنسبة 70% (العادي) أو 65% (الممتد)." } },
    { id: "rmit", city: "melbourne", short: "RMIT",
      name: { en: "RMIT University", ar: "جامعة RMIT" },
      campus: { en: "Melbourne City campus", ar: "حرم المدينة في ملبورن" },
      web: "https://www.rmit.edu.au",
      college: { name: "RMIT University Pathways (RMIT UP)", url: "https://www.rmit.edu.au/up" },
      union: { name: "RMIT University Student Union (RUSU)", url: "https://rusu.rmit.edu.au" },
      legal: { en: "Ask RUSU about free legal and tenancy advice for students.", ar: "اسأل RUSU عن الاستشارات القانونية واستشارات الإيجار المجانية للطلاب." },
      suburbs: "Melbourne CBD, Carlton, North Melbourne",
      entry: { en: "RMIT does not accept the Saudi General Secondary certificate for direct bachelor's entry, so you need a pathway such as Foundation Studies.", ar: "لا تقبل RMIT شهادة الثانوية العامة السعودية للقبول المباشر في البكالوريوس، لذلك تحتاج إلى برنامج مسار مثل الفاونديشن." } },
    { id: "deakin", city: "melbourne", short: "Deakin",
      name: { en: "Deakin University", ar: "جامعة ديكن" },
      campus: { en: "Burwood", ar: "بيروود (Burwood)" },
      note: { en: "Deakin also has campuses in Geelong and Warrnambool. This guide uses the Melbourne Burwood campus, where Deakin College is based.", ar: "لجامعة ديكن أيضًا حرم في جيلونغ (Geelong) ووارنامبول (Warrnambool). يعتمد هذا الدليل حرم ملبورن بيروود، حيث تقع Deakin College." },
      web: "https://www.deakin.edu.au",
      college: { name: "Deakin College", url: "https://www.deakincollege.edu.au" },
      union: { name: "Deakin University Student Association (DUSA)", url: "https://www.dusa.org.au" },
      legal: { en: "The Deakin Student Legal Service (DUSA) gives students free legal advice, including on bonds, leases and repairs.", ar: "تقدم الخدمة القانونية للطلاب في DUSA استشارات قانونية مجانية، منها مبالغ التأمين وعقود الإيجار والإصلاحات." },
      suburbs: "Burwood, Box Hill, Ashwood, Glen Iris",
      entry: { en: "Deakin College's 2025 Middle East guide lists the Saudi General Secondary certificate for the Foundation Program, and an extra year of study after it for direct diploma entry. Both ask for IELTS 5.5. Check the current rules on Deakin College's website.", ar: "يذكر دليل Deakin College للشرق الأوسط لعام 2025 قبول شهادة الثانوية العامة السعودية في برنامج الفاونديشن، وسنة دراسة إضافية بعدها للقبول المباشر في الدبلوم، ويطلب الاثنان IELTS 5.5. تحقق من الشروط الحالية في موقع Deakin College." } },
    { id: "anu", city: "canberra", short: "ANU",
      name: { en: "The Australian National University", ar: "الجامعة الوطنية الأسترالية (ANU)" },
      campus: { en: "Acton", ar: "أكتون (Acton)" },
      note: { en: "ANU no longer has its own pathway college (ANU College closed in 2022). It accepts Foundation programs from other universities, such as UNSW, Sydney, Monash, Melbourne and UQ, and its English program is run with the University of Canberra College. The SACM office is also in Canberra.", ar: "لم تعد لدى ANU كلية مسار خاصة بها (أُغلقت ANU College في 2022). وهي تقبل برامج الفاونديشن من جامعات أخرى مثل UNSW وسيدني وموناش وملبورن وكوينزلاند، وبرنامج اللغة لديها يُقدَّم بالشراكة مع University of Canberra College. ومقر الملحقية الثقافية السعودية في كانبرا أيضًا." },
      web: "https://www.anu.edu.au",
      college: { name: { en: "a Foundation program ANU accepts", ar: "برنامج فاونديشن تقبله ANU" }, url: "https://study.anu.edu.au/apply/international-applications/indicative-entry-requirement/foundation-studies-programs" },
      union: { name: "ANU Students' Association (ANUSA)", url: "https://anusa.com.au" },
      legal: { en: "The ANUSA Legal Service gives ANU students free legal advice, including on tenancy and visas.", ar: "تقدم الخدمة القانونية في ANUSA لطلاب ANU استشارات قانونية مجانية، منها الإيجار والتأشيرات." },
      suburbs: "Acton (on campus), Braddon, Turner, O'Connor, Dickson",
      entry: { en: "ANU's undergraduate entry page does not list the Saudi General Secondary certificate, so most Saudi students enter after a recognised Foundation program. Check with ANU before you apply.", ar: "لا تذكر صفحة القبول في ANU شهادة الثانوية العامة السعودية، لذلك يدخل أغلب الطلاب السعوديين بعد برنامج فاونديشن معترف به. تحقق من ANU قبل التقديم." } },
    { id: "adelaide", city: "adelaide", short: "Adelaide Uni",
      name: { en: "Adelaide University", ar: "جامعة أديلايد" },
      campus: { en: "City campuses (North Terrace)", ar: "حرم وسط المدينة (North Terrace)" },
      note: { en: "Adelaide University opened in 2026, joining the University of Adelaide and the University of South Australia.", ar: "افتُتحت جامعة أديلايد (Adelaide University) في 2026 بدمج جامعة أديلايد وجامعة جنوب أستراليا." },
      web: "https://www.adelaide.edu.au",
      college: { name: "Kaplan International College Adelaide", url: "https://www.kaplancollegeadelaide.edu.au" },
      union: { name: "Adelaide University Student Association (AUSA)", url: "https://www.ausaadelaide.com.au" },
      legal: { en: "AUSA offers advocacy and welfare support through Student Care. Ask them where to get free legal advice.", ar: "تقدم AUSA المناصرة والدعم عبر Student Care. اسألهم عن جهات الاستشارة القانونية المجانية." },
      suburbs: "Adelaide CBD, North Adelaide, Kent Town" },
    { id: "uwa", city: "perth", short: "UWA",
      name: { en: "The University of Western Australia", ar: "جامعة غرب أستراليا (UWA)" },
      campus: { en: "Crawley", ar: "كرولي (Crawley)" },
      web: "https://www.uwa.edu.au",
      college: { name: "UWA College", url: "https://www.uwa.edu.au/study/how-to-apply/pathways-and-eligibility/entry-pathways/international-student-pathways" },
      union: { name: "UWA Student Guild", url: "https://www.uwastudentguild.com" },
      legal: { en: "The UWA Student Guild does not give legal advice itself, but it refers students to free legal centres.", ar: "لا تقدم UWA Student Guild استشارات قانونية بنفسها، لكنها توجه الطلاب إلى مراكز قانونية مجانية." },
      suburbs: "Crawley, Nedlands, Subiaco, Shenton Park" },
    { id: "curtin", city: "perth", short: "Curtin",
      name: { en: "Curtin University", ar: "جامعة كيرتن" },
      campus: { en: "Bentley", ar: "بنتلي (Bentley)" },
      web: "https://www.curtin.edu.au",
      college: { name: "Curtin College", url: "https://www.curtincollege.edu.au" },
      union: { name: "Curtin Student Guild", url: "https://guild.curtin.edu.au" },
      legal: { en: "The Curtin Student Guild offers students free legal and tenancy advice.", ar: "تقدم Curtin Student Guild للطلاب استشارات قانونية واستشارات إيجار مجانية." },
      suburbs: "Bentley, Victoria Park, Como, Karawara" },
    { id: "uq", city: "brisbane", short: "UQ",
      name: { en: "The University of Queensland", ar: "جامعة كوينزلاند" },
      campus: { en: "St Lucia", ar: "سانت لوسيا (St Lucia)" },
      web: "https://www.uq.edu.au",
      college: { name: "UQ College", url: "https://uqcollege.uq.edu.au" },
      union: { name: "UQ Union (UQU)", url: "https://www.uqu.com.au" },
      legal: { en: "Ask UQ Union about free legal advice for students.", ar: "اسأل UQ Union عن الاستشارات القانونية المجانية للطلاب." },
      suburbs: "St Lucia, Toowong, Taringa, Indooroopilly" },
    // ---------- USA ----------
    { id: "mit", city: "boston", short: "MIT",
      name: { en: "Massachusetts Institute of Technology", ar: "معهد ماساتشوستس للتقنية (MIT)" }, campus: { en: "Cambridge, MA", ar: "كامبريدج، ماساتشوستس" },
      web: "https://www.mit.edu", union: { name: "MIT International Students Office", url: "https://iso.mit.edu" },
      suburbs: "Cambridge, Somerville, Allston", note: { en: "MIT is on the Ministry's Al-Ruwwad top 30 list.", ar: "معهد MIT ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "harvard", city: "boston", short: "Harvard",
      name: { en: "Harvard University", ar: "جامعة هارفارد" }, campus: { en: "Cambridge, MA", ar: "كامبريدج، ماساتشوستس" },
      web: "https://www.harvard.edu", union: { name: "Harvard International Office", url: "https://hio.harvard.edu" },
      suburbs: "Cambridge, Somerville, Allston", note: { en: "Harvard is on the Ministry's Al-Ruwwad top 30 list.", ar: "جامعة هارفارد ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "bu", city: "boston", short: "BU",
      name: { en: "Boston University", ar: "جامعة بوسطن" }, campus: { en: "Charles River Campus", ar: "حرم Charles River" },
      web: "https://www.bu.edu", college: { name: "BU CELOP (English programs)", url: "https://www.bu.edu/celop/" },
      union: { name: "BU International Students & Scholars Office", url: "https://www.bu.edu/isso/" },
      suburbs: "Allston, Brighton, Brookline" },
    { id: "columbia", city: "newyork", short: "Columbia",
      name: { en: "Columbia University", ar: "جامعة كولومبيا" }, campus: { en: "Morningside Heights", ar: "مورنينغسايد هايتس" },
      web: "https://www.columbia.edu", union: { name: "Columbia International Students and Scholars Office", url: "https://isso.columbia.edu" },
      suburbs: "Morningside Heights, Harlem, Upper West Side", note: { en: "Columbia is on the Ministry's Al-Ruwwad top 30 list.", ar: "جامعة كولومبيا ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "ucla", city: "losangeles", short: "UCLA",
      name: { en: "University of California, Los Angeles", ar: "جامعة كاليفورنيا في لوس أنجلوس (UCLA)" }, campus: { en: "Westwood", ar: "ويستوود" },
      web: "https://www.ucla.edu", union: { name: "UCLA Dashew Center for International Students", url: "https://www.internationalcenter.ucla.edu" },
      suburbs: "Westwood, Palms, Sawtelle", note: { en: "UCLA is on the Ministry's Al-Ruwwad top 30 list.", ar: "جامعة UCLA ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "usc", city: "losangeles", short: "USC",
      name: { en: "University of Southern California", ar: "جامعة جنوب كاليفورنيا (USC)" }, campus: { en: "University Park", ar: "يونيفرسيتي بارك" },
      web: "https://www.usc.edu", union: { name: "USC Office of International Services", url: "https://ois.usc.edu" },
      suburbs: "University Park, West Adams, Koreatown" },
    { id: "stanford", city: "bayarea", short: "Stanford",
      name: { en: "Stanford University", ar: "جامعة ستانفورد" }, campus: { en: "Stanford, CA", ar: "ستانفورد، كاليفورنيا" },
      web: "https://www.stanford.edu", union: { name: "Bechtel International Center", url: "https://bechtel.stanford.edu" },
      suburbs: "Palo Alto, Menlo Park, Mountain View", note: { en: "Stanford is on the Ministry's Al-Ruwwad top 30 list.", ar: "جامعة ستانفورد ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "berkeley", city: "bayarea", short: "UC Berkeley",
      name: { en: "University of California, Berkeley", ar: "جامعة كاليفورنيا في بيركلي" }, campus: { en: "Berkeley", ar: "بيركلي" },
      web: "https://www.berkeley.edu", union: { name: "Berkeley International Office", url: "https://internationaloffice.berkeley.edu" },
      suburbs: "Berkeley, Albany, North Oakland", note: { en: "UC Berkeley is on the Ministry's Al-Ruwwad top 30 list.", ar: "جامعة بيركلي ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "cmu", city: "pittsburgh", short: "CMU",
      name: { en: "Carnegie Mellon University", ar: "جامعة كارنيغي ميلون" }, campus: { en: "Pittsburgh", ar: "بيتسبرغ" },
      web: "https://www.cmu.edu", union: { name: "CMU Office of International Education", url: "https://www.cmu.edu/oie/" },
      suburbs: "Oakland, Shadyside, Squirrel Hill", note: { en: "Carnegie Mellon is on the Ministry's Al-Ruwwad top 30 list.", ar: "جامعة كارنيغي ميلون ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "uw", city: "seattle", short: "UW",
      name: { en: "University of Washington", ar: "جامعة واشنطن" }, campus: { en: "Seattle", ar: "سياتل" },
      web: "https://www.washington.edu", union: { name: "UW International Student Services", url: "https://iss.washington.edu" },
      suburbs: "University District, Wallingford, Ravenna", note: { en: "The University of Washington is on the Ministry's Al-Ruwwad top 30 list.", ar: "جامعة واشنطن ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "utaustin", city: "austin", short: "UT Austin",
      name: { en: "The University of Texas at Austin", ar: "جامعة تكساس في أوستن" }, campus: { en: "Austin", ar: "أوستن" },
      web: "https://www.utexas.edu", union: { name: "Texas Global International Student and Scholar Services", url: "https://global.utexas.edu/isss" },
      suburbs: "West Campus, Hyde Park, North Loop" },
    { id: "uwmadison", city: "madison", short: "UW–Madison",
      name: { en: "University of Wisconsin–Madison", ar: "جامعة ويسكونسن–ماديسون" }, campus: { en: "Madison", ar: "ماديسون" },
      web: "https://www.wisc.edu", union: { name: "UW–Madison International Student Services", url: "https://iss.wisc.edu" },
      suburbs: "Downtown, Regent, Vilas, Eagle Heights", note: { en: "UW–Madison is on the Ministry's Imdad list. The list differs by field, so check yours.", ar: "جامعة ويسكونسن–ماديسون ضمن قائمة مسار إمداد. والقائمة تختلف حسب التخصص، فتحقق من تخصصك." } },
    { id: "upenn", city: "philadelphia", short: "Penn",
      name: { en: "University of Pennsylvania", ar: "جامعة بنسلفانيا" }, campus: { en: "University City, Philadelphia", ar: "يونيفرسيتي سيتي، فيلادلفيا" },
      web: "https://www.upenn.edu", union: { name: "Penn International Student & Scholar Services", url: "https://global.upenn.edu/isss" },
      suburbs: "University City, Spruce Hill, Cedar Park, Center City", note: { en: "Penn is on the Ministry's Imdad list. The list differs by field, so check yours.", ar: "جامعة بنسلفانيا ضمن قائمة مسار إمداد. والقائمة تختلف حسب التخصص، فتحقق من تخصصك." } },
    { id: "pennstate", city: "statecollege", short: "Penn State",
      name: { en: "The Pennsylvania State University (Penn State)", ar: "جامعة ولاية بنسلفانيا (Penn State)" }, campus: { en: "University Park", ar: "يونيفرسيتي بارك" },
      web: "https://www.psu.edu", union: { name: "Penn State Global, International Student Advising", url: "https://global.psu.edu/category/international-students" },
      suburbs: "Downtown State College, Highlands, College Heights", note: { en: "Penn State is on the Ministry's Imdad list. The list differs by field, so check yours.", ar: "جامعة ولاية بنسلفانيا ضمن قائمة مسار إمداد. والقائمة تختلف حسب التخصص، فتحقق من تخصصك." } },
    // ---------- UK ----------
    { id: "imperial", city: "london", short: "Imperial",
      name: { en: "Imperial College London", ar: "إمبريال كوليدج لندن" }, campus: { en: "South Kensington", ar: "ساوث كنسينغتون" },
      web: "https://www.imperial.ac.uk", union: { name: "Imperial College Union", url: "https://www.imperialcollegeunion.org" },
      suburbs: "South Kensington, Earl's Court, Hammersmith", note: { en: "Imperial is on the Ministry's Al-Ruwwad top 30 list.", ar: "إمبريال كوليدج ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "ucl", city: "london", short: "UCL",
      name: { en: "University College London", ar: "كلية لندن الجامعية (UCL)" }, campus: { en: "Bloomsbury", ar: "بلومزبري" },
      web: "https://www.ucl.ac.uk", college: { name: "UCL Undergraduate Preparatory Certificate (UPC)", url: "https://www.ucl.ac.uk/upc" },
      union: { name: "Students' Union UCL", url: "https://studentsunionucl.org" },
      suburbs: "Bloomsbury, King's Cross, Camden", note: { en: "UCL is on the Ministry's Al-Ruwwad top 30 list.", ar: "جامعة UCL ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "kcl", city: "london", short: "King's",
      name: { en: "King's College London", ar: "كينغز كوليدج لندن" }, campus: { en: "Strand", ar: "ستراند" },
      web: "https://www.kcl.ac.uk", college: { name: "King's International Foundation", url: "https://www.kcl.ac.uk/international-foundation/pathways" },
      union: { name: "King's College London Students' Union (KCLSU)", url: "https://www.kclsu.org" },
      suburbs: "Waterloo, Elephant and Castle, Southwark" },
    { id: "manchester", city: "manchester", short: "Manchester",
      name: { en: "The University of Manchester", ar: "جامعة مانشستر" }, campus: { en: "Oxford Road", ar: "أكسفورد رود" },
      web: "https://www.manchester.ac.uk", union: { name: "University of Manchester Students' Union", url: "https://manchesterstudentsunion.com" },
      suburbs: "Fallowfield, Victoria Park, Rusholme, Withington" },
    { id: "edinburgh", city: "edinburgh", short: "Edinburgh",
      name: { en: "The University of Edinburgh", ar: "جامعة إدنبرة" }, campus: { en: "Central Area", ar: "الحرم المركزي" },
      web: "https://www.ed.ac.uk", union: { name: "Edinburgh University Students' Association", url: "https://www.eusa.ed.ac.uk" },
      suburbs: "Marchmont, Newington, Bruntsfield" },
    { id: "birmingham", city: "birmingham", short: "Birmingham",
      name: { en: "University of Birmingham", ar: "جامعة برمنغهام" }, campus: { en: "Edgbaston", ar: "إدجباستون" },
      web: "https://www.birmingham.ac.uk", college: { name: "Birmingham International Academy", url: "https://www.birmingham.ac.uk/international/bia" },
      union: { name: "Guild of Students", url: "https://www.guildofstudents.com" },
      suburbs: "Selly Oak, Edgbaston, Harborne" },
    { id: "leeds", city: "leeds", short: "Leeds",
      name: { en: "University of Leeds", ar: "جامعة ليدز" }, campus: { en: "Leeds city campus", ar: "حرم وسط ليدز" },
      web: "https://www.leeds.ac.uk", college: { name: "Leeds International Foundation Year", url: "https://www.leeds.ac.uk/ify" },
      union: { name: "Leeds University Union", url: "https://www.luu.org.uk" },
      suburbs: "Headingley, Hyde Park, Woodhouse" },
    // ---------- Canada ----------
    { id: "uoft", city: "toronto", short: "U of T",
      name: { en: "University of Toronto", ar: "جامعة تورنتو" }, campus: { en: "St. George", ar: "سانت جورج" },
      web: "https://www.utoronto.ca", union: { name: "Centre for International Experience", url: "https://internationalexperience.utoronto.ca" },
      suburbs: "The Annex, Harbord Village, Kensington Market", note: { en: "The University of Toronto is on the Ministry's Al-Ruwwad top 30 list.", ar: "جامعة تورنتو ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "ubc", city: "vancouver", short: "UBC",
      name: { en: "The University of British Columbia", ar: "جامعة بريتش كولومبيا (UBC)" }, campus: { en: "Vancouver (Point Grey)", ar: "فانكوفر (Point Grey)" },
      web: "https://www.ubc.ca", college: { name: "UBC Vantage College", url: "https://vantagecollege.ubc.ca" },
      union: { name: "UBC International Student Guide", url: "https://students.ubc.ca/international-student-guide/" },
      suburbs: "Point Grey, Kitsilano, Dunbar" },
    { id: "mcgill", city: "montreal", short: "McGill",
      name: { en: "McGill University", ar: "جامعة ماكغيل" }, campus: { en: "Downtown Montreal", ar: "وسط مونتريال" },
      web: "https://www.mcgill.ca", union: { name: "McGill International Student Services", url: "https://www.mcgill.ca/internationalstudents/" },
      suburbs: "Milton-Parc, the Plateau, Côte-des-Neiges", note: { en: "McGill is in Quebec, so you need a Quebec Acceptance Certificate (CAQ) before the study permit.", ar: "تقع جامعة ماكغيل في كيبيك، فتحتاج شهادة القبول من كيبيك (CAQ) قبل تصريح الدراسة." } },
    { id: "waterloo", city: "waterloo", short: "Waterloo",
      name: { en: "University of Waterloo", ar: "جامعة واترلو" }, campus: { en: "Waterloo", ar: "واترلو" },
      web: "https://uwaterloo.ca", union: { name: "Waterloo international student resources", url: "https://uwaterloo.ca/international-students/" },
      suburbs: "Northdale, Uptown Waterloo, Lakeshore" },
    // ---------- Germany ----------
    { id: "tum", city: "munich", short: "TUM",
      name: { en: "Technical University of Munich", ar: "جامعة ميونخ التقنية (TUM)" }, campus: { en: "Munich and Garching", ar: "ميونخ وغارشينغ" },
      web: "https://www.tum.de/en/", union: { name: "TUM International Office", url: "https://www.tum.de/en/" },
      suburbs: "Maxvorstadt, Schwabing, Garching", note: { en: "TUM charges non-EU students tuition: €2,000 to €3,000 a semester for a bachelor's and €4,000 to €6,000 for a master's, depending on the program.", ar: "تفرض TUM رسومًا على الطلاب من خارج الاتحاد الأوروبي: من 2,000 إلى 3,000 يورو للفصل في البكالوريوس، ومن 4,000 إلى 6,000 في الماجستير حسب البرنامج." } },
    { id: "lmu", city: "munich", short: "LMU",
      name: { en: "LMU Munich", ar: "جامعة لودفيغ ماكسيميليان في ميونخ (LMU)" }, campus: { en: "Munich", ar: "ميونخ" },
      web: "https://www.lmu.de/en/", union: { name: "LMU International Office", url: "https://www.lmu.de/en/" },
      suburbs: "Maxvorstadt, Schwabing, Neuhausen" },
    { id: "tuberlin", city: "berlin", short: "TU Berlin",
      name: { en: "Technische Universität Berlin", ar: "جامعة برلين التقنية" }, campus: { en: "Charlottenburg", ar: "شارلوتنبورغ" },
      web: "https://www.tu.berlin/en/", union: { name: "TU Berlin International Office", url: "https://www.tu.berlin/en/" },
      suburbs: "Charlottenburg, Moabit, Wedding" },
    { id: "rwth", city: "aachen", short: "RWTH",
      name: { en: "RWTH Aachen University", ar: "جامعة آخن التقنية (RWTH)" }, campus: { en: "Aachen", ar: "آخن" },
      web: "https://www.rwth-aachen.de", union: { name: "RWTH International Office", url: "https://www.rwth-aachen.de" },
      suburbs: "Aachen city centre, Ponttor, Burtscheid" },
    { id: "kit", city: "karlsruhe", short: "KIT",
      name: { en: "Karlsruhe Institute of Technology", ar: "معهد كارلسروه للتقنية (KIT)" }, campus: { en: "Karlsruhe", ar: "كارلسروه" },
      web: "https://www.kit.edu", college: { name: "Studienkolleg at KIT", url: "https://www.stk.kit.edu" },
      union: { name: "KIT International Students Office", url: "https://www.kit.edu" },
      suburbs: "Oststadt, Innenstadt-Ost, Durlach", note: { en: "Universities in Baden-Württemberg, including KIT, charge non-EU students €1,500 a semester.", ar: "تفرض جامعات بادن-فورتمبيرغ، ومنها KIT، رسومًا قدرها 1,500 يورو للفصل على الطلاب من خارج الاتحاد الأوروبي." } },
    // ---------- Singapore ----------
    { id: "nus", city: "singapore", short: "NUS",
      name: { en: "National University of Singapore", ar: "جامعة سنغافورة الوطنية (NUS)" }, campus: { en: "Kent Ridge", ar: "كنت ريدج" },
      web: "https://www.nus.edu.sg", union: { name: "NUS Office of Student Affairs", url: "https://osa.nus.edu.sg" },
      suburbs: "Clementi, Dover, Buona Vista", note: { en: "NUS is on the Ministry's Al-Ruwwad top 30 list.", ar: "جامعة NUS ضمن قائمة الرواد لأفضل 30 جامعة." } },
    { id: "ntu", city: "singapore", short: "NTU",
      name: { en: "Nanyang Technological University", ar: "جامعة نانيانغ التقنية (NTU)" }, campus: { en: "Jurong West", ar: "جورونغ ويست" },
      web: "https://www.ntu.edu.sg", union: { name: "NTU student services", url: "https://www.ntu.edu.sg" },
      suburbs: "Jurong West, Boon Lay, Pioneer" },
    { id: "smu", city: "singapore", short: "SMU",
      name: { en: "Singapore Management University", ar: "جامعة سنغافورة للإدارة (SMU)" }, campus: { en: "City campus (Bras Basah)", ar: "حرم وسط المدينة (Bras Basah)" },
      web: "https://www.smu.edu.sg", union: { name: "SMU student life", url: "https://www.smu.edu.sg" },
      suburbs: "Bugis, Bras Basah, Little India" }
  ];

  var CITY_ORDER = ["sydney", "melbourne", "brisbane", "canberra", "adelaide", "perth"].concat(Object.keys(CITIES).filter(function (k) { return CITIES[k].cc !== "au"; }));
  var MC = window.MasarokCountry || { order: ["au"], data: {}, apply: function () {}, generic: function () { return null; }, name: function () { return ""; } };
  var COUNTRY_ORDER = MC.order;

  var GENERIC = {
    en: {
      short: "your university", name: "your university", city: "your city", campus: "your campus",
      college: "its pathway college", union: "your student association",
      legal: "Most student associations offer free advice on renting and legal problems. Ask yours.",
      suburbs: "suburbs close to campus or on a direct bus or train line",
      transport: "city's transport card", bond: "your state's bond authority",
      food: "Ask the Muslim Students Association at your university about halal food and prayer spots nearby.",
      tap: "Many cities also let you tap on with a contactless bank card.",
      chip: "All universities", change: "Choose university"
    },
    ar: {
      short: "جامعتك", name: "جامعتك", city: "مدينتك", campus: "حرمك الجامعي",
      college: "كلية المسار التابعة لها", union: "رابطة الطلاب في جامعتك",
      legal: "تقدم أغلب روابط الطلاب استشارات مجانية في الإيجار والمشكلات القانونية. اسأل رابطة جامعتك.",
      suburbs: "الأحياء القريبة من الجامعة أو الواقعة على خط حافلات أو قطار مباشر",
      transport: "بطاقة المواصلات في مدينتك", bond: "الجهة المسؤولة عن مبالغ التأمين في ولايتك",
      food: "اسأل جمعية الطلاب المسلمين في جامعتك عن المطاعم الحلال والمصليات القريبة.",
      tap: "تتيح مدن كثيرة أيضًا الدفع بالبطاقة البنكية اللاتلامسية.",
      chip: "كل الجامعات", change: "اختر جامعتك"
    }
  };

  var LEVELS = ["foundation", "bachelor", "master", "phd"];

  var T = {
    en: {
      steps: ["Country", "City", "University", "Degree"],
      stepOf: "Step {n} of 4",
      titles: ["Where do you want to study?", "Which city are you looking at?", "Which university?", "What will you study?"],
      subs: [
        "The guide will show the visa steps, living costs, housing and work rules for that country.",
        "Choose a city to see its universities first. You can still pick any university in the country.",
        "The guide will show examples for your campus and city: suburbs, transport, student support and more.",
        "The guide will show the study options and scholarship rules for your level."
      ],
      countryAll: "Not sure yet",
      cityAll: "Not sure yet",
      uniAll: "Not sure yet? Show all universities",
      levelAll: "Show everything",
      inCity: "In {city}",
      otherCities: "Other cities",
      back: "Back",
      note: "<b>Important:</b> the universities SACM sponsors can change each year. Being accepted by a university is not the same as being sponsored to study there. Check the current list on the Ministry's <a href=\"https://ru.moe.gov.sa/Search\" rel=\"noopener\">recommended universities search</a> or with your cultural mission before you commit.",
      close: "Close",
      campus: "Main campus",
      levels: {
        foundation: ["Foundation or diploma", "A pathway year before your bachelor's degree"],
        bachelor: ["Bachelor's degree", "Direct entry, or after a pathway program"],
        master: ["Master's or pre-master's", "Coursework or research master's"],
        phd: ["PhD", "A research degree with a supervisor"]
      },
      chipLevels: { foundation: "Foundation", bachelor: "Bachelor's", master: "Master's", phd: "PhD" },
      showing: "Showing information for <b>{level}</b>.",
      showAll: "Show everything"
    },
    ar: {
      steps: ["الدولة", "المدينة", "الجامعة", "المرحلة"],
      stepOf: "الخطوة {n} من 4",
      titles: ["أين تريد أن تدرس؟", "أي مدينة تفكر فيها؟", "أي جامعة؟", "ماذا ستدرس؟"],
      subs: [
        "سيعرض لك الدليل خطوات التأشيرة وتكاليف المعيشة والسكن وأنظمة العمل في تلك الدولة.",
        "اختر مدينة لتظهر جامعاتها أولًا. يمكنك مع ذلك اختيار أي جامعة في الدولة.",
        "سيعرض لك الدليل أمثلة خاصة بحرمك الجامعي ومدينتك: الأحياء، والمواصلات، ودعم الطلاب، وغيرها.",
        "سيعرض لك الدليل خيارات الدراسة وأنظمة الابتعاث الخاصة بمرحلتك."
      ],
      countryAll: "لم أقرر بعد",
      cityAll: "لم أقرر بعد",
      uniAll: "لم تقرر بعد؟ اعرض كل الجامعات",
      levelAll: "اعرض كل شيء",
      inCity: "في {city}",
      otherCities: "مدن أخرى",
      back: "رجوع",
      note: "<b>مهم:</b> الجامعات التي تبتعث عليها الوزارة قد تتغير كل عام. الحصول على قبول من جامعة لا يعني أنك مبتعث إليها. تحقق من القائمة الحالية عبر <a href=\"https://ru.moe.gov.sa/Search\" rel=\"noopener\">خدمة الاستعلام عن الجامعات الموصى بها</a> أو من الملحقية الثقافية قبل أن تلتزم.",
      close: "إغلاق",
      campus: "الحرم الرئيسي",
      levels: {
        foundation: ["الفاونديشن أو الدبلوم", "سنة مسار قبل البكالوريوس"],
        bachelor: ["البكالوريوس", "قبول مباشر أو بعد برنامج مسار"],
        master: ["الماجستير أو ما قبل الماجستير", "ماجستير بالمقررات أو بحثي"],
        phd: ["الدكتوراه", "درجة بحثية بإشراف مشرف"]
      },
      chipLevels: { foundation: "الفاونديشن", bachelor: "البكالوريوس", master: "الماجستير", phd: "الدكتوراه" },
      showing: "يعرض الدليل المعلومات الخاصة بـ <b>{level}</b>.",
      showAll: "اعرض كل شيء"
    }
  };

  var lang = (document.documentElement.lang || "en").slice(0, 2) === "ar" ? "ar" : "en";
  var K = { country: "masarok-country", city: "masarok-city", uni: "masarok-uni", level: "masarok-level" };

  function cname(u) { var n = u.college.name; return typeof n === "object" ? n[lang] : n; }
  function byId(id) { for (var i = 0; i < UNIS.length; i++) if (UNIS[i].id === id) return UNIS[i]; return null; }
  function get(k) { try { return localStorage.getItem(K[k]); } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem(K[k], v); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function fmt(s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }
  function ccOfCity(ck) { return CITIES[ck] ? CITIES[ck].cc : null; }
  function citiesOf(cc) { return CITY_ORDER.filter(function (ck) { return !cc || CITIES[ck].cc === cc; }); }

  function validCountry(v) { return v === "all" || COUNTRY_ORDER.indexOf(v) > -1; }
  function validCity(v) { return v === "all" || CITIES.hasOwnProperty(v); }
  function validUni(v) { return v === "all" || !!byId(v); }
  function validLevel(v) { return v === "all" || LEVELS.indexOf(v) > -1; }

  var state = { country: null, city: null, uni: null, level: null };

  function currentCountry() {
    var u = state.uni && state.uni !== "all" ? byId(state.uni) : null;
    if (u) return ccOfCity(u.city);
    if (state.city && state.city !== "all") return ccOfCity(state.city);
    return state.country && state.country !== "all" ? state.country : null;
  }

  function values() {
    var cc = currentCountry();
    var g = Object.assign({}, GENERIC[lang], cc && cc !== "au" ? (MC.generic(cc) || {}) : {});
    var u = state.uni && state.uni !== "all" ? byId(state.uni) : null;
    var ck = u ? u.city : (state.city && state.city !== "all" ? state.city : null);
    var c = ck ? CITIES[ck] : null;
    var v = { tap: g.tap, entry: "", short: g.short, name: g.name, city: g.city, campus: g.campus, college: g.college, union: g.union, legal: g.legal, suburbs: g.suburbs, transport: g.transport, bond: g.bond, food: g.food };
    if (!c && cc) {
      var countryName = MC.name(cc);
      if (countryName) v.city = countryName;
    }
    if (c) {
      v.city = c[lang]; v.transport = c.transport[lang]; v.bond = c.bond[lang];
      v.food = c.food ? c.food[lang] : g.food;
      v.tap = c.tap ? c.tap[lang] : g.tap;
      v["transport-url"] = c.transport.url; v["bond-url"] = c.bond.url;
    }
    if (u) {
      v.short = u.short; v.name = u.name[lang]; v.campus = u.campus[lang];
      v.college = u.college ? cname(u) : g.college; v.union = u.union.name; v.legal = u.legal ? u.legal[lang] : g.legal; v.suburbs = u.suburbs;
      v.entry = u.entry ? u.entry[lang] : "";
      v["college-url"] = u.college ? u.college.url : null; v["union-url"] = u.union.url; v.web = u.web;
    }
    v._hasUni = !!u; v._hasCity = !!c; v.cc = cc;
    return { v: v, u: u, c: c, cc: cc };
  }

  function apply() {
    var r = values(), v = r.v, u = r.u;
    var level = state.level && state.level !== "all" ? state.level : null;
    document.documentElement.setAttribute("data-uni", u ? u.id : "all");
    document.documentElement.setAttribute("data-level", level || "all");

    // country-specific sections first, so the filters below also reach them
    MC.apply({ cc: r.cc, v: v });

    document.querySelectorAll("[data-u]").forEach(function (el) {
      var k = el.getAttribute("data-u");
      if (v[k] != null) el.textContent = v[k];
    });
    document.querySelectorAll("[data-u-href]").forEach(function (el) {
      var k = el.getAttribute("data-u-href");
      if (!el.hasAttribute("data-href-orig")) el.setAttribute("data-href-orig", el.getAttribute("href") || "");
      // keep Australia's defaults; elsewhere, a value we don't have becomes plain text instead of a wrong link
      if (v[k]) el.setAttribute("href", v[k]);
      else if (r.cc && r.cc !== "au") el.removeAttribute("href");
      else el.setAttribute("href", el.getAttribute("data-href-orig"));
      if (el.hasAttribute("data-uni-only")) el.hidden = !u || !v[k];
    });
    document.querySelectorAll("[data-uni-only]:not([data-u-href])").forEach(function (el) { el.hidden = !u; });
    document.querySelectorAll("[data-all-only]").forEach(function (el) { el.hidden = !!u; });
    document.querySelectorAll("[data-city-only]").forEach(function (el) { el.hidden = !r.c; });

    // degree-level filter
    document.querySelectorAll("[data-level]").forEach(function (el) {
      if (el === document.documentElement) return;
      var ok = !level || el.getAttribute("data-level").split(" ").indexOf(level) > -1;
      el.hidden = !ok;
    });
    document.querySelectorAll("[data-level-banner]").forEach(function (el) {
      el.hidden = !level;
      if (level) el.querySelector("span").innerHTML = fmt(T[lang].showing, { level: esc(T[lang].levels[level][0]) });
    });

    document.querySelectorAll("[data-u-entry]").forEach(function (el) { el.hidden = !v.entry; });
    var note = document.querySelector("[data-u-note]");
    if (note) { note.hidden = !(u && u.note); if (u && u.note) note.textContent = u.note[lang]; }

    var chip = document.querySelector(".uni-chip b");
    if (chip) {
      var parts = [u ? u.short : (r.c ? r.c[lang] : (r.cc ? MC.name(r.cc) : GENERIC[lang].chip))];
      if (level) parts.push(T[lang].chipLevels[level]);
      chip.textContent = parts.join(" · ");
    }

    // shareable links
    var q = [];
    if (r.cc && !u && !(state.city && state.city !== "all")) q.push("country=" + r.cc);
    if (state.city && state.city !== "all" && !u) q.push("city=" + state.city);
    if (u) q.push("uni=" + u.id);
    if (level) q.push("level=" + level);
    var qs = q.length ? "?" + q.join("&") : "";
    var langLink = document.querySelector(".top nav a.lang");
    if (langLink) langLink.setAttribute("href", langLink.getAttribute("href").split("?")[0] + qs);
    try { history.replaceState(null, "", location.pathname + qs + location.hash); } catch (e) {}

    renderTable();
    try { document.dispatchEvent(new CustomEvent("masarok:change")); } catch (e) {}
  }

  function renderTable() {
    var tbody = document.querySelector("#uni-table tbody");
    if (!tbody) return;
    var cc = currentCountry();
    var ck = state.city && state.city !== "all" ? state.city : null;
    var list = UNIS.filter(function (u) { return !cc || ccOfCity(u.city) === cc; }).sort(function (a, b) {
      return (ck ? (a.city === ck ? 0 : 1) - (b.city === ck ? 0 : 1) : 0) || CITY_ORDER.indexOf(a.city) - CITY_ORDER.indexOf(b.city);
    });
    tbody.innerHTML = list.map(function (u) {
      var c = CITIES[u.city];
      var where = c[lang] + (cc ? "" : " · " + MC.name(c.cc));
      return "<tr><th scope=\"row\"><button type=\"button\" class=\"linkish\" data-pick=\"" + u.id + "\">" + esc(u.name[lang]) + "</button></th>" +
        "<td>" + esc(where) + "</td>" +
        "<td>" + (u.college ? "<a href=\"" + esc(u.college.url) + "\" rel=\"noopener\">" + esc(cname(u)) + "</a>" : "–") + "</td>" +
        "<td>" + esc(u.suburbs) + "</td></tr>";
    }).join("");
  }

  // ---------- four-step picker dialog ----------
  var dlg, body, lastFocus, step = 0;

  function uniCard(u) {
    var t = T[lang];
    return "<button type=\"button\" class=\"uni-card\" data-kind=\"uni\" data-id=\"" + u.id + "\" aria-pressed=\"" + (state.uni === u.id) + "\">" +
      "<span class=\"uc-short\">" + esc(u.short) + "</span>" +
      "<span class=\"uc-name\">" + esc(u.name[lang]) + "</span>" +
      "<span class=\"uc-campus\">" + esc(t.campus) + ": " + esc(u.campus[lang]) + "</span></button>";
  }

  function stepHtml(n) {
    var t = T[lang], h = "", cc = currentCountry();
    if (n === 0) {
      h += "<div class=\"pk-grid\">" + COUNTRY_ORDER.map(function (k) {
        var names = citiesOf(k).map(function (ck) { return CITIES[ck][lang]; }).join(" · ");
        return "<button type=\"button\" class=\"uni-card\" data-kind=\"country\" data-id=\"" + k + "\" aria-pressed=\"" + (cc === k) + "\">" +
          "<span class=\"uc-short\">" + esc(MC.name(k)) + "</span><span class=\"uc-campus\">" + esc(names) + "</span></button>";
      }).join("") + "</div>" +
      "<button type=\"button\" class=\"uni-card uni-all\" data-kind=\"country\" data-id=\"all\" aria-pressed=\"" + (state.country === "all") + "\">" + esc(t.countryAll) + "</button>";
    } else if (n === 1) {
      var groups = cc ? [cc] : COUNTRY_ORDER;
      h += groups.map(function (g) {
        return (cc ? "" : "<p class=\"pk-city\">" + esc(MC.name(g)) + "</p>") + "<div class=\"pk-grid\">" + citiesOf(g).map(function (ck) {
          var names = UNIS.filter(function (u) { return u.city === ck; }).map(function (u) { return u.short; }).join(" · ");
          return "<button type=\"button\" class=\"uni-card\" data-kind=\"city\" data-id=\"" + ck + "\" aria-pressed=\"" + (state.city === ck) + "\">" +
            "<span class=\"uc-short\">" + esc(CITIES[ck][lang]) + "</span><span class=\"uc-campus\" dir=\"ltr\">" + esc(names) + "</span></button>";
        }).join("") + "</div>";
      }).join("") +
      "<button type=\"button\" class=\"uni-card uni-all\" data-kind=\"city\" data-id=\"all\" aria-pressed=\"" + (state.city === "all") + "\">" + esc(t.cityAll) + "</button>";
    } else if (n === 2) {
      var ck = state.city && state.city !== "all" ? state.city : null;
      var pool = citiesOf(cc);
      var order = ck ? [ck].concat(pool.filter(function (c) { return c !== ck; })) : pool;
      h += order.map(function (c, i) {
        var label = ck && i === 0 ? fmt(t.inCity, { city: CITIES[c][lang] }) : CITIES[c][lang] + (cc ? "" : " · " + MC.name(CITIES[c].cc));
        var pre = ck && i === 1 ? "<p class=\"pk-divider\">" + esc(t.otherCities) + "</p>" : "";
        var unis = UNIS.filter(function (u) { return u.city === c; });
        if (!unis.length) return "";
        return pre + "<div class=\"pk-group" + (ck && i > 0 ? " pk-dim" : "") + "\"><p class=\"pk-city\">" + esc(label) + "</p><div class=\"pk-grid\">" +
          unis.map(uniCard).join("") + "</div></div>";
      }).join("") +
      "<button type=\"button\" class=\"uni-card uni-all\" data-kind=\"uni\" data-id=\"all\" aria-pressed=\"" + (state.uni === "all") + "\">" + esc(t.uniAll) + "</button>";
    } else {
      h += "<div class=\"pk-grid pk-levels\">" + LEVELS.map(function (l) {
        return "<button type=\"button\" class=\"uni-card\" data-kind=\"level\" data-id=\"" + l + "\" aria-pressed=\"" + (state.level === l) + "\">" +
          "<span class=\"uc-short\">" + esc(t.levels[l][0]) + "</span><span class=\"uc-name\">" + esc(t.levels[l][1]) + "</span></button>";
      }).join("") + "</div>" +
      "<button type=\"button\" class=\"uni-card uni-all\" data-kind=\"level\" data-id=\"all\" aria-pressed=\"" + (state.level === "all") + "\">" + esc(t.levelAll) + "</button>";
    }
    return h;
  }

  function render() {
    var t = T[lang];
    var tabs = t.steps.map(function (s, i) {
      return "<li class=\"" + (i === step ? "on" : i < step ? "done" : "") + "\"><button type=\"button\" data-step=\"" + i + "\"" + (i === step ? " aria-current=\"step\"" : "") + "><span>" + (i + 1) + "</span>" + esc(s) + "</button></li>";
    }).join("");
    body.innerHTML =
      "<button type=\"button\" class=\"pk-x\" data-close aria-label=\"" + esc(t.close) + "\">&times;</button>" +
      "<ol class=\"pk-steps\">" + tabs + "</ol>" +
      "<p class=\"eyebrow\">" + esc(fmt(t.stepOf, { n: step + 1 })) + "</p>" +
      "<h2 id=\"picker-h\">" + esc(t.titles[step]) + "</h2>" +
      "<p class=\"pk-sub\">" + esc(t.subs[step]) + "</p>" +
      stepHtml(step) +
      (step > 0 ? "<button type=\"button\" class=\"pk-back\" data-step=\"" + (step - 1) + "\">" + (lang === "ar" ? "&rarr; " : "&larr; ") + esc(t.back) + "</button>" : "") +
      (step === 2 ? "<p class=\"pk-note\">" + t.note + "</p>" : "");
    var panel = dlg.querySelector(".pk-panel");
    if (panel) panel.scrollTop = 0;
    var first = body.querySelector(".uni-card[aria-pressed=\"true\"]") || body.querySelector(".uni-card");
    setTimeout(function () { if (first) first.focus({ preventScroll: true }); }, 30);
  }

  function buildDialog() {
    dlg = document.createElement("div");
    dlg.className = "picker"; dlg.id = "picker";
    dlg.setAttribute("role", "dialog"); dlg.setAttribute("aria-modal", "true"); dlg.setAttribute("aria-labelledby", "picker-h");
    dlg.hidden = true;
    dlg.innerHTML = "<div class=\"pk-backdrop\" data-close></div><div class=\"pk-panel\"><div class=\"sadu\" aria-hidden=\"true\"></div><div class=\"pk-body\"></div></div>";
    document.body.appendChild(dlg);
    body = dlg.querySelector(".pk-body");

    dlg.addEventListener("click", function (e) {
      var card = e.target.closest(".uni-card");
      if (card) { pick(card.getAttribute("data-kind"), card.getAttribute("data-id")); return; }
      var s = e.target.closest("[data-step]");
      if (s) { step = +s.getAttribute("data-step"); render(); return; }
      if (e.target.closest("[data-close]")) closeDialog();
    });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); closeDialog(); }
      if (e.key === "Tab") {
        var f = dlg.querySelectorAll("button, a[href]");
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  function setCountry(id) {
    state.country = validCountry(id) ? id : "all";
    var cc = state.country !== "all" ? state.country : null;
    if (cc && state.city && state.city !== "all" && ccOfCity(state.city) !== cc) state.city = null;
    if (cc && state.uni && state.uni !== "all" && ccOfCity(byId(state.uni).city) !== cc) state.uni = null;
    put("country", state.country);
  }

  function pick(kind, id) {
    if (kind === "country") {
      setCountry(id); apply(); step = 1; render();
    } else if (kind === "city") {
      state.city = validCity(id) ? id : "all";
      if (state.city !== "all") { state.country = ccOfCity(state.city); put("country", state.country); }
      if (state.uni && state.uni !== "all" && state.city !== "all" && byId(state.uni).city !== state.city) state.uni = null;
      put("city", state.city); apply(); step = 2; render();
    } else if (kind === "uni") {
      state.uni = validUni(id) ? id : "all";
      if (state.uni !== "all") { state.city = byId(state.uni).city; state.country = ccOfCity(state.city); put("country", state.country); }
      put("uni", state.uni); put("city", state.city || "all"); apply(); step = 3; render();
    } else {
      state.level = validLevel(id) ? id : "all";
      put("level", state.level);
      ["country", "city", "uni"].forEach(function (k) { if (!state[k]) { state[k] = "all"; put(k, "all"); } });
      apply(); closeDialog(true);
    }
  }

  function openDialog(atStep) {
    if (!dlg) buildDialog();
    lastFocus = document.activeElement;
    step = typeof atStep === "number" ? atStep : 0;
    dlg.hidden = false;
    document.documentElement.classList.add("picker-open");
    render();
  }

  function closeDialog(done) {
    if (!dlg || dlg.hidden) return;
    dlg.hidden = true;
    document.documentElement.classList.remove("picker-open");
    ["country", "city", "uni", "level"].forEach(function (k) { if (!state[k]) { state[k] = "all"; put(k, "all"); } });
    apply();
    if (done) flyHome();
    else if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // ---------- flight transition: a small plane carries the visitor to the top ----------
  var PLANE_SVG =
    '<svg viewBox="0 0 160 60" width="132" height="50" aria-hidden="true">' +
      '<path d="M78 25 L93 9 L101 9 L93 25 Z" fill="#C9D2CB"/>' +
      '<path d="M14 26 L4 3 L20 3 L37 24 Z" fill="#0B6B3A"/>' +
      '<path d="M9 11 L19 11 L26 19 L13 19 Z" fill="#E2B66C"/>' +
      '<path d="M10 32 C10 26 22 24 40 24 L132 24 C146 24 156 28 158 32 C156 36 146 38 132 38 L40 38 C22 38 10 36 10 32 Z" fill="#F7F9F7"/>' +
      '<path d="M22 33 L141 33 L147 35.2 L22 35.2 Z" fill="#0B6B3A"/>' +
      '<path d="M22 36 L144 36 L146 36.8 L22 36.8 Z" fill="#E2B66C"/>' +
      '<path d="M144 27.5 C149 28 153 29.5 155 31 L145 31 Z" fill="#1E3A5F"/>' +
      '<g fill="#1E3A5F">' + (function () { var s = ""; for (var x = 48; x <= 134; x += 6) s += '<circle cx="' + x + '" cy="29" r="1.4"/>'; return s; })() + '</g>' +
      '<path d="M14 32 L2 41 L12 41 L27 34 Z" fill="#0A5A31"/>' +
      '<path d="M70 34 L98 56 L110 56 L95 34 Z" fill="#DCE3DD"/>' +
      '<ellipse cx="90" cy="45.5" rx="9.5" ry="4" fill="#EEF2EF" stroke="#B8C2BA" stroke-width=".8"/>' +
    '</svg>';

  function injectFlightCss() {
    if (document.getElementById("flight-css")) return;
    var st = document.createElement("style");
    st.id = "flight-css";
    st.textContent =
      ".flight{position:fixed; inset:0; z-index:120; pointer-events:none; overflow:hidden}" +
      ".flight-veil{position:absolute; inset:0; background:radial-gradient(120% 90% at 70% 10%, #173252, #0B1626 70%); opacity:0; transition:opacity .5s ease}" +
      ".flight-trail{position:absolute; inset:0; width:100%; height:100%}" +
      ".flight-plane{position:absolute; left:0; top:0; will-change:transform; filter:drop-shadow(0 8px 14px rgba(0,0,0,.35))}" +
      ".flight-plane.rtl svg{transform:scaleX(-1)}" +
      ".flight-label{position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); color:#E2B66C; font-family:var(--f-mono, monospace); letter-spacing:.14em; text-transform:uppercase; font-size:.85rem; opacity:0; transition:opacity .4s ease; white-space:nowrap}" +
      "html[lang=ar] .flight-label{letter-spacing:0; font-family:var(--f-body, sans-serif); font-size:1rem}";
    document.head.appendChild(st);
  }

  function replayHero() {
    document.querySelectorAll(".hero-copy > *").forEach(function (el) {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    });
  }

  function flyHome() {
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { window.scrollTo(0, 0); return; }
    injectFlightCss();

    var rtl = document.documentElement.dir === "rtl";
    var W = window.innerWidth, H = window.innerHeight;
    var fly = document.createElement("div");
    fly.className = "flight";
    var label = lang === "ar" ? "رحلتك تبدأ الآن" : "Your journey starts now";
    fly.innerHTML =
      '<div class="flight-veil"></div>' +
      '<svg class="flight-trail" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none"><path fill="none" stroke="#E2B66C" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 9" opacity=".8"/></svg>' +
      '<p class="flight-label">' + label + '</p>' +
      '<div class="flight-plane' + (rtl ? " rtl" : "") + '">' + PLANE_SVG + '</div>';
    document.body.appendChild(fly);

    var veil = fly.querySelector(".flight-veil"), trail = fly.querySelector(".flight-trail path"),
        plane = fly.querySelector(".flight-plane"), lbl = fly.querySelector(".flight-label");

    // quadratic curve across the screen (mirrored for Arabic)
    var p0 = { x: -0.12 * W, y: 0.78 * H }, p1 = { x: 0.5 * W, y: 0.02 * H }, p2 = { x: 1.12 * W, y: 0.34 * H };
    if (rtl) { p0.x = W - p0.x; p1.x = W - p1.x; p2.x = W - p2.x; }
    function pt(t) {
      var a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
      return { x: a * p0.x + b * p1.x + c * p2.x, y: a * p0.y + b * p1.y + c * p2.y };
    }
    function tan(t) {
      return { x: 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x), y: 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y) };
    }
    trail.setAttribute("d", "M" + p0.x + " " + p0.y + " Q" + p1.x + " " + p1.y + " " + p2.x + " " + p2.y);

    requestAnimationFrame(function () { veil.style.opacity = "0.92"; lbl.style.opacity = "1"; });

    var DUR = 3200, t0 = null, jumped = false, revealed = false;
    function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
    function frame(now) {
      if (t0 === null) t0 = now;
      var k = Math.min(1, (now - t0) / DUR), e = ease(k);
      var p = pt(e), d = tan(e);
      var ang = Math.atan2(d.y, d.x) * 180 / Math.PI;
      if (rtl) ang = ang - 180;
      plane.style.transform = "translate(" + (p.x - 66) + "px," + (p.y - 25) + "px) rotate(" + ang + "deg)";
      // show the dotted trail only behind the plane, fading out at the end
      trail.parentNode.style.clipPath = rtl
        ? "inset(0 0 0 " + Math.max(0, p.x) + "px)"
        : "inset(0 " + Math.max(0, W - p.x) + "px 0 0)";
      trail.style.opacity = String(0.85 * (1 - Math.max(0, (k - 0.75) / 0.25)));

      if (!jumped && k > 0.18) { jumped = true; window.scrollTo(0, 0); replayHero(); }
      if (!revealed && k > 0.6) { revealed = true; veil.style.opacity = "0"; lbl.style.opacity = "0"; }
      if (k < 1) requestAnimationFrame(frame);
      else { fly.style.transition = "opacity .3s ease"; fly.style.opacity = "0"; setTimeout(function () { fly.remove(); }, 320); }
    }
    requestAnimationFrame(frame);
  }

  // small API for journey.js
  window.Masarok = {
    values: function () { var r = values(); return { v: r.v, hasUni: !!r.u, level: state.level, cc: r.cc }; },
    openPicker: function (atStep) { openDialog(atStep); }
  };

  function init() {
    var p = {};
    try { var sp = new URL(location.href).searchParams; p = { country: sp.get("country"), city: sp.get("city"), uni: sp.get("uni"), level: sp.get("level") }; } catch (e) {}
    var fromUrl = !!(p.country || p.city || p.uni || p.level);
    function load(k, valid) { return p[k] && valid(p[k]) ? p[k] : (fromUrl ? null : (valid(get(k)) ? get(k) : null)); }
    state.uni = load("uni", validUni);
    state.city = load("city", validCity);
    state.country = load("country", validCountry);
    state.level = load("level", validLevel);
    if (state.uni && state.uni !== "all") state.city = byId(state.uni).city;
    if (state.city && state.city !== "all") state.country = ccOfCity(state.city);
    // visitors from before countries existed had only Australian choices
    if (!state.country && (state.city || state.uni)) state.country = state.city && state.city !== "all" ? ccOfCity(state.city) : "au";
    if (fromUrl) ["country", "city", "uni", "level"].forEach(function (k) { if (state[k]) put(k, state[k]); });
    var nothing = !state.country && !state.city && !state.uni && !state.level;
    if (!nothing) ["country", "city", "uni", "level"].forEach(function (k) { if (!state[k]) state[k] = "all"; });
    apply();

    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-open-picker]");
      if (b) { e.preventDefault(); openDialog(+(b.getAttribute("data-open-picker") || 0)); return; }
      var pk = e.target.closest("[data-pick]");
      if (pk) { e.preventDefault(); state.uni = pk.getAttribute("data-pick"); state.city = byId(state.uni).city; state.country = ccOfCity(state.city); put("uni", state.uni); put("city", state.city); put("country", state.country); apply(); document.getElementById("myuni").scrollIntoView({ behavior: "smooth" }); return; }
      var pc = e.target.closest("[data-pick-country]");
      if (pc) { e.preventDefault(); setCountry(pc.getAttribute("data-pick-country")); apply(); var o = document.getElementById("options"); if (o) o.scrollIntoView({ behavior: "smooth" }); return; }
      var la = e.target.closest("[data-level-all]");
      if (la) { e.preventDefault(); state.level = "all"; put("level", "all"); apply(); }
    });

    if (nothing) openDialog(0);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
