import { useState, useEffect, useRef } from "react"

// ── Types ──────────────────────────────────────────────────────────────────────
type Screen = "welcome" | "language" | "login" | "app"
type Lang = "en" | "hi" | "bn" | "te" | "ta" | "mr" | "gu" | "kn"
type Theme = "light" | "dark" | "saffron"
type Module =
  | "dashboard" | "catalogue" | "billing" | "pos" | "khata" | "ocr"
  | "supplier" | "analytics" | "copilot" | "voice" | "settings" | "contact"

// ── Translations ───────────────────────────────────────────────────────────────
const TR = {
  en: {
    appName: "StoreSyncOS",
    tagline: "Your Complete Shop Management Solution",
    enterShop: "Enter Your Shop",
    chooseLanguage: "Choose Your Language",
    langSubtitle: "Select the language you're most comfortable with",
    continue: "Continue",
    shopName: "Shop Name",
    shopType: "Shop Type",
    ownerName: "Owner / Shopkeeper Name",
    phone: "Phone Number",
    password: "Password",
    signIn: "Sign In",
    welcome: "Welcome back",
    dashboard: "Dashboard",
    catalogue: "Catalogue",
    billing: "Billing & POS",
    khata: "Khata",
    ocr: "Bill Scanner",
    supplier: "Suppliers",
    analytics: "Analytics",
    copilot: "AI Copilot",
    voice: "Voice Assistant",
    settings: "Settings",
    contact: "Contact Us",
    healthScore: "Shop Health Score",
    totalSales: "Today's Sales",
    profit: "Net Profit",
    customers: "Customers",
    stockAlert: "Low Stock Items",
    expiryAlert: "Expiry Alert",
    offlineMode: "Offline Mode",
    syncing: "Syncing...",
    synced: "Synced",
    addProduct: "Add Product",
    searchProduct: "Search products...",
    newBill: "New Bill",
    totalCredit: "Total Credit Given",
    smartRestock: "Smart Restock",
    aiSuggestions: "AI Suggestions",
    motivationPrefix: "Quote of the Day",
    goodMorning: "Good Morning!",
    goodAfternoon: "Good Afternoon!",
    goodEvening: "Good Evening!",
    selectTheme: "Theme",
    lightTheme: "Light",
    darkTheme: "Dark",
    saffronTheme: "Saffron",
    sendMessage: "Send Message",
    yourName: "Your Name",
    email: "Email Address",
    message: "Your Message",
    send: "Send",
    inventory: "Inventory",
    categories: "Categories",
    barcode: "Barcode",
    purchaseHistory: "Purchase History",
    salesReport: "Sales Report",
    profitReport: "Profit Report",
    customerReport: "Customer Report",
    recommendations: "Recommendations",
    alerts: "Alerts",
    newBillPOS: "New Bill / POS",
    creditLedger: "Credit Ledger",
    scanBill: "Scan Bill",
    supplierList: "Supplier List",
    orderNow: "Order Now",
  },
  hi: {
    appName: "StoreSyncOS",
    tagline: "आपका संपूर्ण दुकान प्रबंधन समाधान",
    enterShop: "अपनी दुकान में प्रवेश करें",
    chooseLanguage: "अपनी भाषा चुनें",
    langSubtitle: "वह भाषा चुनें जिसमें आप सबसे सहज हों",
    continue: "आगे बढ़ें",
    shopName: "दुकान का नाम",
    shopType: "दुकान का प्रकार",
    ownerName: "मालिक / दुकानदार का नाम",
    phone: "फ़ोन नंबर",
    password: "पासवर्ड",
    signIn: "साइन इन करें",
    welcome: "वापसी पर स्वागत है",
    dashboard: "डैशबोर्ड",
    catalogue: "कैटलॉग",
    billing: "बिलिंग & POS",
    khata: "खाता",
    ocr: "बिल स्कैनर",
    supplier: "सप्लायर",
    analytics: "विश्लेषण",
    copilot: "AI सहायक",
    voice: "वॉयस असिस्टेंट",
    settings: "सेटिंग्स",
    contact: "संपर्क करें",
    healthScore: "दुकान स्वास्थ्य स्कोर",
    totalSales: "आज की बिक्री",
    profit: "शुद्ध लाभ",
    customers: "ग्राहक",
    stockAlert: "कम स्टॉक",
    expiryAlert: "एक्सपायरी अलर्ट",
    offlineMode: "ऑफलाइन मोड",
    syncing: "सिंक हो रहा है...",
    synced: "सिंक हो गया",
    addProduct: "उत्पाद जोड़ें",
    searchProduct: "उत्पाद खोजें...",
    newBill: "नया बिल",
    totalCredit: "कुल उधार दिया",
    smartRestock: "स्मार्ट रिस्टॉक",
    aiSuggestions: "AI सुझाव",
    motivationPrefix: "आज का विचार",
    goodMorning: "सुप्रभात!",
    goodAfternoon: "शुभ दोपहर!",
    goodEvening: "शुभ संध्या!",
    selectTheme: "थीम",
    lightTheme: "लाइट",
    darkTheme: "डार्क",
    saffronTheme: "केसरिया",
    sendMessage: "संदेश भेजें",
    yourName: "आपका नाम",
    email: "ईमेल पता",
    message: "आपका संदेश",
    send: "भेजें",
    inventory: "इन्वेंटरी",
    categories: "श्रेणियां",
    barcode: "बारकोड",
    purchaseHistory: "खरीद इतिहास",
    salesReport: "बिक्री रिपोर्ट",
    profitReport: "लाभ रिपोर्ट",
    customerReport: "ग्राहक रिपोर्ट",
    recommendations: "सुझाव",
    alerts: "अलर्ट",
    newBillPOS: "नया बिल / POS",
    creditLedger: "उधार खाता",
    scanBill: "बिल स्कैन करें",
    supplierList: "सप्लायर सूची",
    orderNow: "अभी ऑर्डर करें",
  },
  bn: {
    appName: "StoreSyncOS",
    tagline: "আপনার সম্পূর্ণ দোকান ব্যবস্থাপনা সমাধান",
    enterShop: "আপনার দোকানে প্রবেশ করুন",
    chooseLanguage: "আপনার ভাষা বেছে নিন",
    langSubtitle: "যে ভাষায় আপনি সবচেয়ে স্বাচ্ছন্দ্য বোধ করেন তা বেছে নিন",
    continue: "চালিয়ে যান",
    shopName: "দোকানের নাম",
    shopType: "দোকানের ধরন",
    ownerName: "মালিক / দোকানদারের নাম",
    phone: "ফোন নম্বর",
    password: "পাসওয়ার্ড",
    signIn: "সাইন ইন করুন",
    welcome: "ফিরে আসতে পেরে ভালো লাগছে",
    dashboard: "ড্যাশবোর্ড",
    catalogue: "ক্যাটালগ",
    billing: "বিলিং & POS",
    khata: "খাতা",
    ocr: "বিল স্ক্যানার",
    supplier: "সরবরাহকারী",
    analytics: "বিশ্লেষণ",
    copilot: "AI সহকারী",
    voice: "ভয়েস সহকারী",
    settings: "সেটিংস",
    contact: "যোগাযোগ করুন",
    healthScore: "দোকান স্বাস্থ্য স্কোর",
    totalSales: "আজকের বিক্রয়",
    profit: "নেট লাভ",
    customers: "গ্রাহক",
    stockAlert: "কম স্টক",
    expiryAlert: "মেয়াদ শেষের সতর্কতা",
    offlineMode: "অফলাইন মোড",
    syncing: "সিঙ্ক হচ্ছে...",
    synced: "সিঙ্ক হয়েছে",
    addProduct: "পণ্য যোগ করুন",
    searchProduct: "পণ্য খুঁজুন...",
    newBill: "নতুন বিল",
    totalCredit: "মোট ধার দেওয়া",
    smartRestock: "স্মার্ট রিস্টক",
    aiSuggestions: "AI পরামর্শ",
    motivationPrefix: "আজকের উদ্ধৃতি",
    goodMorning: "শুভ সকাল!",
    goodAfternoon: "শুভ দুপুর!",
    goodEvening: "শুভ সন্ধ্যা!",
    selectTheme: "থিম",
    lightTheme: "আলো",
    darkTheme: "অন্ধকার",
    saffronTheme: "জাফরান",
    sendMessage: "বার্তা পাঠান",
    yourName: "আপনার নাম",
    email: "ইমেইল ঠিকানা",
    message: "আপনার বার্তা",
    send: "পাঠান",
    inventory: "ইনভেন্টরি",
    categories: "বিভাগ",
    barcode: "বারকোড",
    purchaseHistory: "ক্রয় ইতিহাস",
    salesReport: "বিক্রয় প্রতিবেদন",
    profitReport: "লাভের প্রতিবেদন",
    customerReport: "গ্রাহক প্রতিবেদন",
    recommendations: "সুপারিশ",
    alerts: "সতর্কতা",
    newBillPOS: "নতুন বিল / POS",
    creditLedger: "ধার খাতা",
    scanBill: "বিল স্ক্যান করুন",
    supplierList: "সরবরাহকারী তালিকা",
    orderNow: "এখনই অর্ডার করুন",
  },
  te: {
    appName: "StoreSyncOS",
    tagline: "మీ పూర్తి దుకాణ నిర్వహణ పరిష్కారం",
    enterShop: "మీ దుకాణంలోకి ప్రవేశించండి",
    chooseLanguage: "మీ భాషను ఎంచుకోండి",
    langSubtitle: "మీకు అత్యంత సౌకర్యంగా అనిపించే భాషను ఎంచుకోండి",
    continue: "కొనసాగించు",
    shopName: "దుకాణం పేరు",
    shopType: "దుకాణం రకం",
    ownerName: "యజమాని / దుకానదారు పేరు",
    phone: "ఫోన్ నంబర్",
    password: "పాస్‌వర్డ్",
    signIn: "సైన్ ఇన్",
    welcome: "తిరిగి స్వాగతం",
    dashboard: "డాష్‌బోర్డ్",
    catalogue: "కేటలాగ్",
    billing: "బిల్లింగ్ & POS",
    khata: "ఖాతా",
    ocr: "బిల్ స్కానర్",
    supplier: "సరఫరాదారు",
    analytics: "విశ్లేషణ",
    copilot: "AI సహాయకుడు",
    voice: "వాయిస్ అసిస్టెంట్",
    settings: "సెట్టింగులు",
    contact: "సంప్రదించండి",
    healthScore: "దుకాణ ఆరోగ్య స్కోర్",
    totalSales: "నేటి అమ్మకాలు",
    profit: "నికర లాభం",
    customers: "వినియోగదారులు",
    stockAlert: "తక్కువ స్టాక్",
    expiryAlert: "గడువు హెచ్చరిక",
    offlineMode: "ఆఫ్‌లైన్ మోడ్",
    syncing: "సమకాలీకరిస్తోంది...",
    synced: "సమకాలీకరించబడింది",
    addProduct: "ఉత్పత్తి జోడించండి",
    searchProduct: "ఉత్పత్తులను వెతకండి...",
    newBill: "కొత్త బిల్లు",
    totalCredit: "మొత్తం క్రెడిట్ ఇవ్వబడింది",
    smartRestock: "స్మార్ట్ రీస్టాక్",
    aiSuggestions: "AI సూచనలు",
    motivationPrefix: "నేటి సూక్తి",
    goodMorning: "శుభోదయం!",
    goodAfternoon: "శుభ మధ్యాహ్నం!",
    goodEvening: "శుభ సాయంత్రం!",
    selectTheme: "థీమ్",
    lightTheme: "వెలుతురు",
    darkTheme: "చీకటి",
    saffronTheme: "కుంకుమ",
    sendMessage: "సందేశం పంపండి",
    yourName: "మీ పేరు",
    email: "ఇమెయిల్ చిరునామా",
    message: "మీ సందేశం",
    send: "పంపండి",
    inventory: "ఇన్వెంటరీ",
    categories: "వర్గాలు",
    barcode: "బార్‌కోడ్",
    purchaseHistory: "కొనుగోలు చరిత్ర",
    salesReport: "అమ్మకాల నివేదిక",
    profitReport: "లాభ నివేదిక",
    customerReport: "వినియోగదారు నివేదిక",
    recommendations: "సిఫార్సులు",
    alerts: "హెచ్చరికలు",
    newBillPOS: "కొత్త బిల్లు / POS",
    creditLedger: "క్రెడిట్ లెడ్జర్",
    scanBill: "బిల్లు స్కాన్ చేయండి",
    supplierList: "సరఫరాదారు జాబితా",
    orderNow: "ఇప్పుడు ఆర్డర్ చేయండి",
  },
  ta: {
    appName: "StoreSyncOS",
    tagline: "உங்கள் முழுமையான கடை மேலாண்மை தீர்வு",
    enterShop: "உங்கள் கடைக்குள் நுழையுங்கள்",
    chooseLanguage: "உங்கள் மொழியை தேர்ந்தெடுங்கள்",
    langSubtitle: "நீங்கள் மிகவும் வசதியாக உணரும் மொழியை தேர்ந்தெடுங்கள்",
    continue: "தொடரவும்",
    shopName: "கடையின் பெயர்",
    shopType: "கடை வகை",
    ownerName: "உரிமையாளர் / கடைக்காரர் பெயர்",
    phone: "தொலைபேசி எண்",
    password: "கடவுச்சொல்",
    signIn: "உள்நுழைக",
    welcome: "மீண்டும் வரவேற்கிறோம்",
    dashboard: "டாஷ்போர்டு",
    catalogue: "தொகுப்பு",
    billing: "பில்லிங் & POS",
    khata: "கணக்கு",
    ocr: "பில் ஸ்கேனர்",
    supplier: "சப்ளையர்",
    analytics: "பகுப்பாய்வு",
    copilot: "AI உதவியாளர்",
    voice: "குரல் உதவியாளர்",
    settings: "அமைப்புகள்",
    contact: "தொடர்பு கொள்ளுங்கள்",
    healthScore: "கடை ஆரோக்கிய மதிப்பெண்",
    totalSales: "இன்றைய விற்பனை",
    profit: "நிகர லாபம்",
    customers: "வாடிக்கையாளர்கள்",
    stockAlert: "குறைந்த இருப்பு",
    expiryAlert: "காலாவதி எச்சரிக்கை",
    offlineMode: "ஆஃப்லைன் பயன்முறை",
    syncing: "ஒத்திசைக்கிறது...",
    synced: "ஒத்திசைக்கப்பட்டது",
    addProduct: "தயாரிப்பு சேர்க்கவும்",
    searchProduct: "தயாரிப்புகளை தேடுங்கள்...",
    newBill: "புதிய பில்",
    totalCredit: "மொத்த கடன் கொடுக்கப்பட்டது",
    smartRestock: "ஸ்மார்ட் ரீஸ்டாக்",
    aiSuggestions: "AI பரிந்துரைகள்",
    motivationPrefix: "இன்றைய மேற்கோள்",
    goodMorning: "காலை வணக்கம்!",
    goodAfternoon: "மதிய வணக்கம்!",
    goodEvening: "மாலை வணக்கம்!",
    selectTheme: "தீம்",
    lightTheme: "வெளிச்சம்",
    darkTheme: "இருள்",
    saffronTheme: "குங்குமம்",
    sendMessage: "செய்தி அனுப்பவும்",
    yourName: "உங்கள் பெயர்",
    email: "மின்னஞ்சல் முகவரி",
    message: "உங்கள் செய்தி",
    send: "அனுப்பு",
    inventory: "சரக்கு",
    categories: "வகைகள்",
    barcode: "பார்கோடு",
    purchaseHistory: "கொள்முதல் வரலாறு",
    salesReport: "விற்பனை அறிக்கை",
    profitReport: "லாப அறிக்கை",
    customerReport: "வாடிக்கையாளர் அறிக்கை",
    recommendations: "பரிந்துரைகள்",
    alerts: "எச்சரிக்கைகள்",
    newBillPOS: "புதிய பில் / POS",
    creditLedger: "கடன் கணக்கு",
    scanBill: "பில் ஸ்கேன் செய்யுங்கள்",
    supplierList: "சப்ளையர் பட்டியல்",
    orderNow: "இப்போதே ஆர்டர் செய்யுங்கள்",
  },
  mr: {
    appName: "StoreSyncOS",
    tagline: "तुमचे संपूर्ण दुकान व्यवस्थापन समाधान",
    enterShop: "तुमच्या दुकानात प्रवेश करा",
    chooseLanguage: "तुमची भाषा निवडा",
    langSubtitle: "तुम्हाला सर्वात सोयीस्कर वाटणारी भाषा निवडा",
    continue: "पुढे चला",
    shopName: "दुकानाचे नाव",
    shopType: "दुकानाचा प्रकार",
    ownerName: "मालक / दुकानदाराचे नाव",
    phone: "फोन नंबर",
    password: "पासवर्ड",
    signIn: "साइन इन करा",
    welcome: "परत स्वागत आहे",
    dashboard: "डॅशबोर्ड",
    catalogue: "कॅटलॉग",
    billing: "बिलिंग & POS",
    khata: "खाते",
    ocr: "बिल स्कॅनर",
    supplier: "पुरवठादार",
    analytics: "विश्लेषण",
    copilot: "AI सहाय्यक",
    voice: "व्हॉइस असिस्टंट",
    settings: "सेटिंग्ज",
    contact: "संपर्क करा",
    healthScore: "दुकान आरोग्य स्कोर",
    totalSales: "आजची विक्री",
    profit: "निव्वळ नफा",
    customers: "ग्राहक",
    stockAlert: "कमी स्टॉक",
    expiryAlert: "मुदत संपण्याचा इशारा",
    offlineMode: "ऑफलाइन मोड",
    syncing: "सिंक होत आहे...",
    synced: "सिंक झाले",
    addProduct: "उत्पादन जोडा",
    searchProduct: "उत्पादने शोधा...",
    newBill: "नवीन बिल",
    totalCredit: "एकूण उधारी दिली",
    smartRestock: "स्मार्ट रिस्टॉक",
    aiSuggestions: "AI सूचना",
    motivationPrefix: "आजचे सुविचार",
    goodMorning: "शुभ प्रभात!",
    goodAfternoon: "शुभ दुपार!",
    goodEvening: "शुभ संध्याकाळ!",
    selectTheme: "थीम",
    lightTheme: "उजळ",
    darkTheme: "गडद",
    saffronTheme: "केशरी",
    sendMessage: "संदेश पाठवा",
    yourName: "तुमचे नाव",
    email: "ईमेल पत्ता",
    message: "तुमचा संदेश",
    send: "पाठवा",
    inventory: "इन्व्हेंटरी",
    categories: "श्रेणी",
    barcode: "बारकोड",
    purchaseHistory: "खरेदी इतिहास",
    salesReport: "विक्री अहवाल",
    profitReport: "नफा अहवाल",
    customerReport: "ग्राहक अहवाल",
    recommendations: "शिफारसी",
    alerts: "इशारे",
    newBillPOS: "नवीन बिल / POS",
    creditLedger: "उधारी खाते",
    scanBill: "बिल स्कॅन करा",
    supplierList: "पुरवठादार यादी",
    orderNow: "आत्ता ऑर्डर करा",
  },
  gu: {
    appName: "StoreSyncOS",
    tagline: "તમારું સંપૂર્ણ દુકાન સંચાલન સમાધાન",
    enterShop: "તમારી દુકાનમાં પ્રવેશ કરો",
    chooseLanguage: "તમારી ભાષા પસંદ કરો",
    langSubtitle: "જે ભાષામાં તમને સૌથી વધુ સરળ લાગે તે પસંદ કરો",
    continue: "આગળ વધો",
    shopName: "દુકાનનું નામ",
    shopType: "દુકાનનો પ્રકાર",
    ownerName: "માલિક / દુકાનદારનું નામ",
    phone: "ફોન નંબર",
    password: "પાસવર્ડ",
    signIn: "સાઇન ઇન કરો",
    welcome: "પાછા આવ્યા, સ્વાગત છે",
    dashboard: "ડૅશબોર્ડ",
    catalogue: "કૅટેલૉગ",
    billing: "બિલિંગ & POS",
    khata: "ખાતું",
    ocr: "બિલ સ્કૅનર",
    supplier: "સપ્લાયર",
    analytics: "વિશ્લેષણ",
    copilot: "AI સહાયક",
    voice: "વૉઇસ આસિસ્ટન્ટ",
    settings: "સેટિંગ્સ",
    contact: "સંપર્ક કરો",
    healthScore: "દુકાન આરોગ્ય સ્કોર",
    totalSales: "આજની વેચાણ",
    profit: "ચોખ્ખો નફો",
    customers: "ગ્રાહકો",
    stockAlert: "ઓછો સ્ટૉક",
    expiryAlert: "એક્સ્પાઇરી ચેતવણી",
    offlineMode: "ઑફલાઇન મોડ",
    syncing: "સિંક થઈ રહ્યું છે...",
    synced: "સિંક થઈ ગયું",
    addProduct: "ઉત્પાદન ઉમેરો",
    searchProduct: "ઉત્પાદનો શોધો...",
    newBill: "નવું બિલ",
    totalCredit: "કુલ ઉધાર આપ્યું",
    smartRestock: "સ્માર્ટ રિસ્ટૉક",
    aiSuggestions: "AI સૂચનો",
    motivationPrefix: "આજનો સુવિચાર",
    goodMorning: "સુપ્રભાત!",
    goodAfternoon: "શુભ બપોર!",
    goodEvening: "શુભ સાંજ!",
    selectTheme: "થીમ",
    lightTheme: "ઉજ્જવળ",
    darkTheme: "ઘેરું",
    saffronTheme: "કેસરી",
    sendMessage: "સંદેશ મોકલો",
    yourName: "તમારું નામ",
    email: "ઈમેઇલ સરનામું",
    message: "તમારો સંદેશ",
    send: "મોકલો",
    inventory: "ઇન્વેન્ટરી",
    categories: "શ્રેણીઓ",
    barcode: "બારકોડ",
    purchaseHistory: "ખરીદ ઇતિહાસ",
    salesReport: "વેચાણ અહેવાલ",
    profitReport: "નફો અહેવાલ",
    customerReport: "ગ્રાહક અહેવાલ",
    recommendations: "ભલામણો",
    alerts: "ચેતવણીઓ",
    newBillPOS: "નવું બિલ / POS",
    creditLedger: "ઉધાર ખાતું",
    scanBill: "બિલ સ્કૅન કરો",
    supplierList: "સપ્લાયર યાદી",
    orderNow: "અત્યારે ઓર્ડર કરો",
  },
  kn: {
    appName: "StoreSyncOS",
    tagline: "ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಅಂಗಡಿ ನಿರ್ವಹಣೆ ಪರಿಹಾರ",
    enterShop: "ನಿಮ್ಮ ಅಂಗಡಿಗೆ ಪ್ರವೇಶಿಸಿ",
    chooseLanguage: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    langSubtitle: "ನಿಮಗೆ ಅತ್ಯಂತ ಆರಾಮದಾಯಕ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    continue: "ಮುಂದುವರಿಸಿ",
    shopName: "ಅಂಗಡಿಯ ಹೆಸರು",
    shopType: "ಅಂಗಡಿ ವಿಧ",
    ownerName: "ಮಾಲೀಕ / ಅಂಗಡಿಯವರ ಹೆಸರು",
    phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    signIn: "ಸೈನ್ ಇನ್",
    welcome: "ಮರಳಿ ಸ್ವಾಗತ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    catalogue: "ಕ್ಯಾಟಲಾಗ್",
    billing: "ಬಿಲ್ಲಿಂಗ್ & POS",
    khata: "ಖಾತೆ",
    ocr: "ಬಿಲ್ ಸ್ಕ್ಯಾನರ್",
    supplier: "ಪೂರೈಕೆದಾರ",
    analytics: "ವಿಶ್ಲೇಷಣೆ",
    copilot: "AI ಸಹಾಯಕ",
    voice: "ವಾಯ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    healthScore: "ಅಂಗಡಿ ಆರೋಗ್ಯ ಸ್ಕೋರ್",
    totalSales: "ಇಂದಿನ ಮಾರಾಟ",
    profit: "ನಿವ್ವಳ ಲಾಭ",
    customers: "ಗ್ರಾಹಕರು",
    stockAlert: "ಕಡಿಮೆ ಸ್ಟಾಕ್",
    expiryAlert: "ಮುಕ್ತಾಯ ಎಚ್ಚರಿಕೆ",
    offlineMode: "ಆಫ್‌ಲೈನ್ ಮೋಡ್",
    syncing: "ಸಿಂಕ್ ಆಗುತ್ತಿದೆ...",
    synced: "ಸಿಂಕ್ ಆಗಿದೆ",
    addProduct: "ಉತ್ಪನ್ನ ಸೇರಿಸಿ",
    searchProduct: "ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ...",
    newBill: "ಹೊಸ ಬಿಲ್",
    totalCredit: "ಒಟ್ಟು ಸಾಲ ನೀಡಲಾಗಿದೆ",
    smartRestock: "ಸ್ಮಾರ್ಟ್ ರೀಸ್ಟಾಕ್",
    aiSuggestions: "AI ಸಲಹೆಗಳು",
    motivationPrefix: "ಇಂದಿನ ಸುಭಾಷಿತ",
    goodMorning: "ಶುಭೋದಯ!",
    goodAfternoon: "ಶುಭ ಮಧ್ಯಾಹ್ನ!",
    goodEvening: "ಶುಭ ಸಂಜೆ!",
    selectTheme: "ಥೀಮ್",
    lightTheme: "ಬೆಳಕು",
    darkTheme: "ಕತ್ತಲು",
    saffronTheme: "ಕೇಸರಿ",
    sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    yourName: "ನಿಮ್ಮ ಹೆಸರು",
    email: "ಇಮೇಲ್ ವಿಳಾಸ",
    message: "ನಿಮ್ಮ ಸಂದೇಶ",
    send: "ಕಳುಹಿಸಿ",
    inventory: "ಇನ್ವೆಂಟರಿ",
    categories: "ವರ್ಗಗಳು",
    barcode: "ಬಾರ್‌ಕೋಡ್",
    purchaseHistory: "ಖರೀದಿ ಇತಿಹಾಸ",
    salesReport: "ಮಾರಾಟ ವರದಿ",
    profitReport: "ಲಾಭ ವರದಿ",
    customerReport: "ಗ್ರಾಹಕ ವರದಿ",
    recommendations: "ಶಿಫಾರಸುಗಳು",
    alerts: "ಎಚ್ಚರಿಕೆಗಳು",
    newBillPOS: "ಹೊಸ ಬಿಲ್ / POS",
    creditLedger: "ಸಾಲ ಖಾತೆ",
    scanBill: "ಬಿಲ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    supplierList: "ಪೂರೈಕೆದಾರರ ಪಟ್ಟಿ",
    orderNow: "ಈಗಲೇ ಆರ್ಡರ್ ಮಾಡಿ",
  },
}

const QUOTES = [
  { quote: "Your shop is your temple. Every customer is your guest.", author: "Ancient Merchant Wisdom" },
  { quote: "Small business isn't small – it is the backbone of every community.", author: "Unknown" },
  { quote: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
  { quote: "A satisfied customer is the best business strategy of all.", author: "Michael LeBoeuf" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "जब मेहनत और हुनर मिलते हैं, तो दुकान फलती-फूलती है।", author: "लोक ज्ञान" },
  { quote: "ব্যবসায় সাফল্য আসে বিশ্বাস থেকে।", author: "লোকজ্ঞান" },
]

type Product = { id: number; name: string; category: string; price: number; stock: number; minStock: number; expiry: string; barcode: string }

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Tata Salt 1kg", category: "Grocery", price: 28, stock: 45, minStock: 10, expiry: "2026-12-01", barcode: "8901234567890" },
  { id: 2, name: "Amul Butter 500g", category: "Dairy", price: 270, stock: 8, minStock: 12, expiry: "2026-09-15", barcode: "8901234567891" },
  { id: 3, name: "Parle-G Biscuits", category: "Snacks", price: 10, stock: 120, minStock: 20, expiry: "2026-11-30", barcode: "8901234567892" },
  { id: 4, name: "Colgate Toothpaste", category: "FMCG", price: 95, stock: 3, minStock: 15, expiry: "2027-06-01", barcode: "8901234567893" },
  { id: 5, name: "Maggi Noodles 70g", category: "Instant Food", price: 14, stock: 200, minStock: 30, expiry: "2026-10-20", barcode: "8901234567894" },
  { id: 6, name: "Lifebuoy Soap", category: "Personal Care", price: 45, stock: 60, minStock: 10, expiry: "2028-01-01", barcode: "8901234567895" },
  { id: 7, name: "Aashirvaad Atta 5kg", category: "Grocery", price: 260, stock: 15, minStock: 5, expiry: "2026-08-30", barcode: "8901234567896" },
]

const MOCK_CUSTOMERS = [
  { id: 1, name: "Ramesh Sharma", phone: "9876543210", credit: 1240, lastVisit: "Today" },
  { id: 2, name: "Priya Patel", phone: "9876543211", credit: 0, lastVisit: "Yesterday" },
  { id: 3, name: "Mohd. Akhtar", phone: "9876543212", credit: 580, lastVisit: "2 days ago" },
  { id: 4, name: "Sunita Devi", phone: "9876543213", credit: 2100, lastVisit: "Today" },
  { id: 5, name: "Arjun Singh", phone: "9876543214", credit: 360, lastVisit: "3 days ago" },
]

const MOCK_BILLS = [
  { id: "INV-2847", customer: "Ramesh Sharma", items: 4, total: 342, time: "10:24 AM", paid: true },
  { id: "INV-2848", customer: "Walk-in", items: 2, total: 56, time: "11:05 AM", paid: true },
  { id: "INV-2849", customer: "Sunita Devi", items: 7, total: 890, time: "12:30 PM", paid: false },
  { id: "INV-2850", customer: "Walk-in", items: 1, total: 28, time: "01:15 PM", paid: true },
  { id: "INV-2851", customer: "Mohd. Akhtar", items: 3, total: 215, time: "02:00 PM", paid: false },
]

const MOCK_SUPPLIERS = [
  { id: 1, name: "Metro Cash & Carry", category: "Grocery", rating: 4.8, lastOrder: "3 days ago", contact: "18001234567" },
  { id: 2, name: "Hindustan Unilever Ltd", category: "FMCG", rating: 4.6, lastOrder: "1 week ago", contact: "18001234568" },
  { id: 3, name: "ITC Distributor", category: "Tobacco/Food", rating: 4.3, lastOrder: "2 days ago", contact: "18001234569" },
  { id: 4, name: "Local Dairy Farm", category: "Dairy", rating: 4.9, lastOrder: "Today", contact: "9988776655" },
]

const AI_SUGGESTIONS = [
  { type: "restock", icon: "📦", title: "Restock Colgate Toothpaste", desc: "Only 3 units left. Avg. daily sale: 4 units. Order 24 units.", priority: "high" },
  { type: "restock", icon: "🥛", title: "Order Amul Butter", desc: "Stock below minimum. Place order with HUL distributor today.", priority: "high" },
  { type: "expiry", icon: "⚠️", title: "Aashirvaad Atta expiring soon", desc: "5kg atta expires in 10 days. Run a 5% discount to clear stock.", priority: "medium" },
  { type: "insight", icon: "💡", title: "Best selling time: 6–8 PM", desc: "40% of sales happen in evening. Ensure staff present at peak hours.", priority: "low" },
  { type: "insight", icon: "📈", title: "Biscuits up 22% this week", desc: "Parle-G & Britannia trending. Stock up before weekend.", priority: "medium" },
  { type: "credit", icon: "💳", title: "Collect from Sunita Devi", desc: "₹2,100 credit outstanding for 15 days. Send a reminder.", priority: "high" },
]

// ── Helpers ────────────────────────────────────────────────────────────────────
function getGreeting(lang: Lang): string {
  const h = new Date().getHours()
  if (h < 12) return TR[lang].goodMorning
  if (h < 17) return TR[lang].goodAfternoon
  return TR[lang].goodEvening
}

function getTodayQuote() {
  const idx = new Date().getDate() % QUOTES.length
  return QUOTES[idx]
}

// ── StatCard ──────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color }: { icon: string; label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="card-hover rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>{label}</p>
          <p className="text-2xl font-bold mt-1 font-display" style={{ color: color || "var(--foreground)" }}>{value}</p>
          {sub && <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>{sub}</p>}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  )
}

// ── HealthScoreRing ────────────────────────────────────────────────────────────
function HealthScoreRing({ score, lang }: { score: number; lang: Lang }) {
  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 75 ? "#10B981" : score >= 50 ? "#F59E0B" : "#EF4444"

  return (
    <div className="card-hover rounded-2xl p-6 border flex flex-col items-center justify-center" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <p className="font-display font-bold text-lg mb-4" style={{ color: "var(--foreground)" }}>{TR[lang].healthScore}</p>
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
          <circle cx="64" cy="64" r={r} fill="none" stroke="var(--border)" strokeWidth="12" />
          <circle
            cx="64" cy="64" r={r} fill="none" stroke={color} strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.4s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-black" style={{ color }}>{score}</span>
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>/ 100</span>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold" style={{ color }}>
        {score >= 75 ? "🟢 Excellent" : score >= 50 ? "🟡 Good" : "🔴 Needs Attention"}
      </p>
    </div>
  )
}

// ── Nav groups (all go in topbar) ─────────────────────────────────────────────
const NAV_GROUPS: {
  label: keyof typeof TR["en"]
  icon: string
  module: Module
  children?: { label: keyof typeof TR["en"]; icon: string; module: Module }[]
}[] = [
  { label: "catalogue", icon: "📦", module: "catalogue" },
  {
    label: "billing", icon: "🧾", module: "billing",
    children: [
      { label: "newBillPOS", icon: "🧾", module: "billing" },
      { label: "khata",      icon: "💳", module: "khata"   },
      { label: "scanBill",   icon: "📸", module: "ocr"     },
    ],
  },
  { label: "supplier",  icon: "🛒", module: "supplier"  },
  { label: "analytics", icon: "📊", module: "analytics" },
  {
    label: "copilot", icon: "🤖", module: "copilot",
    children: [
      { label: "copilot", icon: "🤖", module: "copilot" },
      { label: "voice",   icon: "🎙️", module: "voice"   },
    ],
  },
]

// ── StoreSyncOS Logo mark ──────────────────────────────────────────────────────
function StoreSyncLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ssGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Tile */}
      <rect width="40" height="40" rx="9" fill="url(#ssGrad)" />

      {/* Arc 1 — upper-right (300°) → lower-left (120°), clockwise through right + bottom */}
      <path d="M 26 9.6 A 12 12 0 0 1 13.5 30.1" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M -3.5 -2.4 L 2.2 0 L -3.5 2.4 Z" transform="translate(14 30.4) rotate(210)" fill="white" />

      {/* Arc 2 — lower-left (120°) → upper-right (300°), clockwise through left + top */}
      <path d="M 14 30.4 A 12 12 0 0 1 26.5 9.9" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M -3.5 -2.4 L 2.2 0 L -3.5 2.4 Z" transform="translate(26 9.6) rotate(30)" fill="white" />

      {/* Centre ledger lines */}
      <line x1="15" y1="18.5" x2="25" y2="18.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
      <line x1="15" y1="21.5" x2="25" y2="21.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
    </svg>
  )
}

// ── TopBar ─────────────────────────────────────────────────────────────────────
interface TopBarProps {
  lang: Lang; setLang: (l: Lang) => void
  theme: Theme
  activeModule: Module; setModule: (m: Module) => void
  shopName: string; online: boolean; syncing: boolean
  onOpenTheme: () => void
}

function TopBar({ lang, setLang, theme, activeModule, setModule, shopName, online, syncing, onOpenTheme }: TopBarProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function openDrop(i: number) {
    if (timerRef.current) clearTimeout(timerRef.current)
    setOpenIdx(i)
  }
  function closeDrop() {
    timerRef.current = setTimeout(() => setOpenIdx(null), 140)
  }

  const langs: { value: Lang; label: string; flag: string }[] = [
    { value: "en", label: "English", flag: "🇬🇧" },
    { value: "hi", label: "हिंदी", flag: "🇮🇳" },
    { value: "bn", label: "বাংলা", flag: "🇧🇩" },
    { value: "te", label: "తెలుగు", flag: "🇮🇳" },
    { value: "ta", label: "தமிழ்", flag: "🇮🇳" },
    { value: "mr", label: "मराठी", flag: "🇮🇳" },
    { value: "gu", label: "ગુજરાતી", flag: "🇮🇳" },
    { value: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳" },
  ]
  const [langOpen, setLangOpen] = useState(false)
  const currentLangObj = langs.find(l => l.value === lang) ?? langs[0]
  const themeIcon = theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "🧡"

  return (
    <header className="sticky top-0 z-50" style={{ background: "var(--secondary)" }}>
      <div className="flex items-center h-16 px-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>

        {/* Logo — clicking goes to dashboard */}
        <button
          onClick={() => setModule("dashboard")}
          className="flex items-center gap-2.5 font-display font-black text-xl select-none shrink-0"
          style={{ color: "var(--primary)" }}
          title="Go to Dashboard"
        >
          <span className="text-2xl">🏪</span>
          <span className="hidden sm:inline" style={{ color: "#fff" }}>{shopName || TR[lang].appName}</span>
        </button>

        {/* ── Spacer — pushes everything right ── */}
        <div className="flex-1" />

        {/* ── Full nav (all modules) ── */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_GROUPS.map((grp, i) => {
            const isActive = grp.module === activeModule ||
              grp.children?.some(c => c.module === activeModule)
            return (
              <div key={i} className="relative"
                onMouseEnter={() => openDrop(i)}
                onMouseLeave={closeDrop}
              >
                <button
                  onClick={() => { setModule(grp.module); setOpenIdx(null) }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer"
                  style={{
                    color: isActive ? "var(--primary)" : "rgba(255,255,255,0.82)",
                    background: isActive ? "rgba(245,158,11,0.18)" : "rgba(255,255,255,0)",
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.09)" }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0)" }}
                >
                  <span className="text-sm">{grp.icon}</span>
                  {TR[lang][grp.label]}
                  {grp.children && (
                    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" style={{ opacity: 0.5 }}>
                      <path d="M1 1l3.5 4L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>

                {openIdx === i && grp.children && (
                  <div
                    className="dropdown-enter absolute top-full left-0 mt-2 min-w-44 rounded-2xl shadow-2xl border py-2 z-50"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                    onMouseEnter={() => openDrop(i)}
                    onMouseLeave={closeDrop}
                  >
                    {grp.children.map((sub, j) => (
                      <button key={j}
                        onClick={() => { setModule(sub.module); setOpenIdx(null) }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-left transition-all cursor-pointer"
                        style={{
                          color: sub.module === activeModule ? "var(--primary)" : "var(--foreground)",
                          background: sub.module === activeModule ? "var(--muted)" : "transparent",
                        }}
                        onMouseEnter={e => { if (sub.module !== activeModule) (e.currentTarget as HTMLButtonElement).style.background = "var(--muted)" }}
                        onMouseLeave={e => { if (sub.module !== activeModule) (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}
                      >
                        <span className="w-5 text-center">{sub.icon}</span>
                        {TR[lang][sub.label]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-2.5 ml-3 shrink-0">
          {/* Sync pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: online ? "rgba(16,185,129,0.14)" : "rgba(239,68,68,0.14)",
              color: online ? "#10B981" : "#EF4444",
            }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: online ? "#10B981" : "#EF4444" }} />
            {online ? (syncing ? TR[lang].syncing : TR[lang].synced) : TR[lang].offlineMode}
          </div>

          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(o => !o)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.14)", color: "#fff" }}>
              <span>{currentLangObj.flag}</span>
              <span className="hidden sm:inline">{currentLangObj.label}</span>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ opacity: 0.6 }}>
                <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {langOpen && (
              <div className="dropdown-enter absolute right-0 top-full mt-2 w-44 rounded-2xl shadow-2xl border py-1.5 z-50 overflow-hidden"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                {langs.map(l => (
                  <button key={l.value} onClick={() => { setLang(l.value); setLangOpen(false) }}
                    className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-semibold text-left transition-all"
                    style={{
                      color: lang === l.value ? "var(--primary)" : "var(--foreground)",
                      background: lang === l.value ? "var(--muted)" : "transparent",
                    }}
                    onMouseEnter={e => { if (lang !== l.value) (e.currentTarget as HTMLButtonElement).style.background = "var(--muted)" }}
                    onMouseLeave={e => { if (lang !== l.value) (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}>
                    <span className="text-sm">{l.flag}</span>
                    <span>{l.label}</span>
                    {lang === l.value && <span className="ml-auto text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme button */}
          <button onClick={onOpenTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }}
            title="Change theme"
          >
            {themeIcon} <span className="hidden sm:inline text-xs">Theme</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all"
            style={{ color: "#fff" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Context bar */}
      <div className="hidden md:flex items-center px-6 py-1.5 gap-3 text-xs border-t" style={{ background: "rgba(0,0,0,0.18)", color: "rgba(255,255,255,0.45)", borderColor: "rgba(255,255,255,0.06)" }}>
        <span style={{ color: "rgba(255,255,255,0.65)" }}>
          {new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : lang === "bn" ? "bn-IN" : "en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
        <span className="ml-auto flex items-center gap-1.5 xl:hidden"
          style={{ color: online ? "#10B981" : "#EF4444" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "currentColor" }} />
          {online ? (syncing ? TR[lang].syncing : TR[lang].synced) : TR[lang].offlineMode}
        </span>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t" style={{ background: "var(--secondary)", borderColor: "rgba(255,255,255,0.08)" }}>
          {NAV_GROUPS.flatMap(g => g.children ?? [g]).map((item, i) => (
            <button key={i}
              onClick={() => { setModule(item.module); setMobileOpen(false) }}
              className="flex items-center gap-3 w-full px-5 py-3.5 text-sm font-medium text-left border-b"
              style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.06)" }}>
              <span>{item.icon}</span> {TR[lang][item.label]}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

// ── ThemePage ──────────────────────────────────────────────────────────────────
function ThemePage({ theme, setTheme, onClose, lang }: { theme: Theme; setTheme: (t: Theme) => void; onClose: () => void; lang: Lang }) {
  const [selected, setSelected] = useState<Theme>(theme)
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 60) }, [])

  const options: { value: Theme; label: string; desc: string; bg: string; accent: string; preview: string[] }[] = [
    {
      value: "light",
      label: TR[lang].lightTheme,
      desc: "Bright & clean. Best for daytime use in well-lit shops.",
      bg: "#FFFBF3", accent: "#F59E0B",
      preview: ["#FFFBF3", "#FFFFFF", "#F59E0B"],
    },
    {
      value: "dark",
      label: TR[lang].darkTheme,
      desc: "Easy on the eyes. Perfect for evening & late-night billing.",
      bg: "#0F172A", accent: "#FBBF24",
      preview: ["#0F172A", "#1E293B", "#FBBF24"],
    },
    {
      value: "saffron",
      label: TR[lang].saffronTheme,
      desc: "Bold & warm. Inspired by Indian festivals and tradition.",
      bg: "#FFF7ED", accent: "#EA580C",
      preview: ["#FFF7ED", "#FFFFFF", "#EA580C"],
    },
  ]

  function apply() {
    setTheme(selected)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}>
      <div
        className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(20px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "var(--border)" }}>
          <div>
            <h2 className="font-display font-black text-xl" style={{ color: "var(--foreground)" }}>🎨 {TR[lang].selectTheme}</h2>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Choose how StoreSyncOS looks for you</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition-all hover:opacity-70"
            style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>✕</button>
        </div>

        {/* Options */}
        <div className="p-5 space-y-3">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all"
              style={{
                borderColor: selected === opt.value ? "var(--primary)" : "var(--border)",
                background: selected === opt.value ? "rgba(245,158,11,0.06)" : "var(--muted)",
                boxShadow: selected === opt.value ? "0 0 0 4px rgba(245,158,11,0.12)" : "none",
              }}
            >
              {/* Colour swatch */}
              <div className="flex rounded-xl overflow-hidden shrink-0 shadow-md" style={{ width: 56, height: 42 }}>
                {opt.preview.map((c, i) => (
                  <div key={i} className="flex-1" style={{ background: c }} />
                ))}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-base" style={{ color: "var(--foreground)" }}>{opt.label}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{opt.desc}</p>
              </div>

              {/* Check */}
              <div className="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all"
                style={{
                  borderColor: selected === opt.value ? "var(--primary)" : "var(--border)",
                  background: selected === opt.value ? "var(--primary)" : "transparent",
                }}>
                {selected === opt.value && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer actions */}
        <div className="flex gap-3 px-5 pb-5">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-2xl font-bold text-sm border transition-all hover:opacity-80"
            style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--muted)" }}>
            Cancel
          </button>
          <button onClick={apply}
            className="flex-1 py-3 rounded-2xl font-display font-bold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--primary)", color: "#fff" }}>
            Apply Theme ✓
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer({ lang, setModule }: { lang: Lang; setModule: (m: Module) => void }) {
  const year = new Date().getFullYear()

  const columns: { heading: string; links: { label: string; module?: Module }[] }[] = [
    {
      heading: "Modules",
      links: [
        { label: TR[lang].catalogue, module: "catalogue" },
        { label: TR[lang].billing,   module: "billing"   },
        { label: TR[lang].khata,     module: "khata"     },
        { label: TR[lang].ocr,       module: "ocr"       },
        { label: TR[lang].supplier,  module: "supplier"  },
      ],
    },
    {
      heading: "Tools",
      links: [
        { label: TR[lang].analytics, module: "analytics" },
        { label: TR[lang].copilot,   module: "copilot"   },
        { label: TR[lang].voice,     module: "voice"     },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: TR[lang].contact,   module: "contact"   },
        { label: "Help Center" },
        { label: "Privacy Policy" },
        { label: "Terms of Use" },
        { label: "About Us" },
      ],
    },
    {
      heading: "Contact",
      links: [
        { label: "📞 1800-STORESYNC" },
        { label: "📧 help@storesyncos.in" },
        { label: "💬 WhatsApp Support" },
        { label: "🕐 Mon–Sat, 8AM–9PM" },
      ],
    },
  ]

  return (
    <footer className="border-t mt-8" style={{ background: "var(--secondary)", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {columns.map(col => (
            <div key={col.heading}>
              <p className="font-display font-bold text-sm mb-4 tracking-wide" style={{ color: "var(--primary)" }}>
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.module ? (
                      <button
                        onClick={() => setModule(link.module!)}
                        className="text-sm text-left transition-all hover:opacity-100"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t mb-6" style={{ borderColor: "rgba(255,255,255,0.07)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏪</span>
            <div>
              <p className="font-display font-black text-base" style={{ color: "var(--primary)" }}>StoreSyncOS</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Offline-first · AI-powered · Made for Bharat</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>🌐 EN · हिंदी · বাংলা</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>© {year} StoreSyncOS. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── WelcomeScreen ──────────────────────────────────────────────────────────────
const NEURAL_NODES = [
  { x: 8, y: 22 }, { x: 22, y: 8 }, { x: 40, y: 18 }, { x: 58, y: 6 },
  { x: 76, y: 22 }, { x: 92, y: 14 }, { x: 15, y: 48 }, { x: 35, y: 55 },
  { x: 55, y: 42 }, { x: 72, y: 58 }, { x: 88, y: 44 }, { x: 5, y: 72 },
  { x: 28, y: 78 }, { x: 48, y: 85 }, { x: 68, y: 75 }, { x: 85, y: 88 },
  { x: 50, y: 30 }, { x: 20, y: 35 }, { x: 80, y: 68 }, { x: 62, y: 95 },
]
const NEURAL_EDGES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[0,6],[1,6],[2,7],[2,16],[3,16],[4,8],[5,10],
  [6,7],[7,8],[7,17],[8,9],[9,10],[6,11],[11,12],[12,13],[13,14],[14,15],[10,18],
  [16,8],[17,0],[12,7],[14,9],[18,15],[13,19],[3,17],[9,18],
]
const FLOATING_PARTICLES = [
  { x:12, y:30, s:2, d:0, dur:5 }, { x:88, y:18, s:1.5, d:0.8, dur:4.2 },
  { x:35, y:68, s:2.5, d:1.5, dur:6 }, { x:72, y:52, s:1.8, d:0.4, dur:4.8 },
  { x:55, y:85, s:2, d:2.1, dur:5.5 }, { x:18, y:78, s:1.5, d:1.1, dur:3.8 },
  { x:90, y:72, s:2.2, d:0.6, dur:6.2 }, { x:45, y:12, s:1.6, d:1.8, dur:4.5 },
  { x:65, y:38, s:2.8, d:0.3, dur:5.8 }, { x:28, y:92, s:1.4, d:2.5, dur:4.1 },
  { x:78, y:6, s:2, d:1.7, dur:5.3 }, { x:6, y:55, s:1.8, d:0.9, dur:4.7 },
]
const AI_EVENTS = [
  "Analysing inventory patterns…",
  "Predicting restock for Parle-G…",
  "Voice model: Hindi active",
  "OCR engine: ready",
  "Khata sync: 3 pending entries",
  "Analytics: 12,847 txns processed",
  "Low stock alert: Maggi Noodles",
  "AI Copilot: idle",
  "Barcode scanner: standby",
  "Tax engine: GST 18% loaded",
]

function WelcomeScreen({ onEnter, lang }: { onEnter: () => void; lang: Lang }) {
  const [step, setStep] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [wordIdx, setWordIdx] = useState(0)
  const [erasing, setErasing] = useState(false)
  const quote = getTodayQuote()
  const h = new Date().getHours()
  const timeIcon = h < 12 ? "☀️" : h < 17 ? "⛅" : "🌙"
  const WORDS = ["Smarter.", "Faster.", "Offline."]

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 80),
      setTimeout(() => setStep(2), 340),
      setTimeout(() => setStep(3), 600),
      setTimeout(() => setStep(4), 860),
      setTimeout(() => setStep(5), 1100),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const word = WORDS[wordIdx]
    if (!erasing) {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 72)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setErasing(true), 2200)
      return () => clearTimeout(t)
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
        return () => clearTimeout(t)
      }
      setWordIdx(i => (i + 1) % WORDS.length)
      setErasing(false)
    }
  }, [displayed, erasing, wordIdx])

  const show = (n: number): React.CSSProperties => ({
    opacity: step >= n ? 1 : 0,
    transform: step >= n ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.55s ease, transform 0.55s ease",
  })

  const features = [
    { icon: "🧾", label: "Smart Billing" },
    { icon: "📦", label: "Inventory" },
    { icon: "💳", label: "Khata / Credit" },
    { icon: "📊", label: "Analytics" },
    { icon: "🤖", label: "AI Copilot" },
    { icon: "🎙️", label: "Voice Control" },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ background: "#080F18" }}>

      {/* dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      {/* amber radial — bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full pointer-events-none" style={{
        background: "radial-gradient(ellipse, rgba(245,158,11,0.18) 0%, transparent 65%)",
      }} />
      {/* indigo glow — top left */}
      <div className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 65%)",
      }} />
      {/* emerald — mid right */}
      <div className="absolute top-1/3 -right-20 w-[360px] h-[360px] rounded-full pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(16,185,129,0.13) 0%, transparent 65%)",
      }} />
      {/* saffron streak */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        background: "linear-gradient(135deg, transparent 40%, rgba(245,158,11,1) 100%)",
      }} />
      {/* scan beam */}
      <div className="ai-scan-beam" />

      {/* ── Top bar ── */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-7">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🏪</span>
          <span className="font-display font-black text-xl" style={{ color: "#F59E0B" }}>StoreSyncOS</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}>
          {timeIcon}&nbsp;{new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
        </div>
      </div>

      {/* ── Hero — centered ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 py-10 max-w-3xl mx-auto w-full">

        {/* Greeting badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-7"
          style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.28)", color: "#FCD34D", ...show(1) }}>
          {timeIcon}&nbsp;{getGreeting(lang)}
        </div>

        {/* Headline */}
        <h1 className="font-display font-black leading-[1.08] mb-5"
          style={{ fontSize: "clamp(2.8rem, 6.5vw, 5rem)", color: "#FFFFFF", ...show(2) }}>
          Your shop.<br />
          <span style={{
            background: "linear-gradient(90deg, #F59E0B 0%, #FCD34D 50%, #10B981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {displayed}
          </span>
          <span className="cursor-blink" style={{ color: "#F59E0B", WebkitTextFillColor: "#F59E0B", fontWeight: 200 }}>|</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg leading-relaxed mb-9 max-w-lg" style={{ color: "rgba(255,255,255,0.5)", ...show(3) }}>
          {TR[lang].tagline}
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10" style={show(4)}>
          {features.map(f => (
            <span key={f.label}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.65)",
              }}>
              {f.icon} {f.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mb-10" style={show(5)}>
          <button
            onClick={onEnter}
            className="group font-display font-bold text-base px-10 py-4 rounded-2xl transition-all hover:scale-[1.04] active:scale-[0.97] flex items-center gap-2.5"
            style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              color: "#1A0A00",
              boxShadow: "0 0 48px rgba(245,158,11,0.4), 0 2px 12px rgba(0,0,0,0.4)",
            }}>
            {TR[lang].enterShop}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Quote card */}
        <div className="w-full max-w-md rounded-3xl p-5 mb-6" style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          ...show(5),
        }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-0.5 h-6 rounded-full" style={{ background: "#F59E0B" }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#F59E0B" }}>
              {TR[lang].motivationPrefix}
            </span>
          </div>
          <blockquote className="text-sm font-medium italic leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>
            "{quote.quote}"
          </blockquote>
          <cite className="text-xs not-italic font-semibold" style={{ color: "rgba(255,255,255,0.32)" }}>
            — {quote.author}
          </cite>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs" style={show(5)}>
          {[
            { value: "10k+", label: "Shops" },
            { value: "8", label: "Languages" },
            { value: "100%", label: "Offline" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl py-3 px-2 text-center" style={{
              background: "rgba(255,255,255,0.045)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}>
              <p className="font-display font-black text-lg leading-none" style={{ color: "#F59E0B" }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.36)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="relative z-10 border-t px-6 md:px-12 py-4 flex items-center justify-between gap-4 flex-wrap"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.25)" }}>
        <div className="flex items-center gap-4 flex-wrap">
          {["📦 Catalogue", "🧾 POS Billing", "💳 Khata", "📸 OCR Scanner", "🛒 Suppliers", "📊 Analytics", "🤖 AI Copilot"].map(f => (
            <span key={f} className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>{f}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {["Welcome", "Language", "Login"].map((label, i) => (
            <div key={label} className="flex items-center gap-1.5">
              {i > 0 && <div className="w-5 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />}
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: i === 0 ? "#F59E0B" : "rgba(255,255,255,0.1)",
                    color: i === 0 ? "#1A0A00" : "rgba(255,255,255,0.3)",
                  }}>{i + 1}</div>
                <span className="text-xs hidden md:inline" style={{ color: i === 0 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)" }}>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


// ── OnboardingShell ────────────────────────────────────────────────────────────
function OnboardingShell({
  step, totalSteps, onBack, children,
}: {
  step: number; totalSteps: number; onBack?: () => void; children: React.ReactNode
}) {
  const stepLabels = ["Welcome", "Language", "Shop Setup"]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      {/* Top nav strip */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        {/* Back button */}
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80 group"
            style={{ background: "var(--muted)", color: "var(--foreground)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
        ) : (
          <div className="flex items-center gap-2 font-display font-black text-lg" style={{ color: "var(--primary)" }}>
            🏪 StoreSyncOS
          </div>
        )}

        {/* Step counter */}
        <span className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
          Step {step} of {totalSteps}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full" style={{ background: "var(--border)" }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${(step / totalSteps) * 100}%`, background: "var(--primary)" }}
        />
      </div>

      {/* Step breadcrumbs */}
      <div className="flex items-center justify-center gap-6 py-4">
        {stepLabels.map((label, i) => {
          const n = i + 1
          const done = n < step
          const active = n === step
          return (
            <div key={label} className="flex items-center gap-2">
              {i > 0 && (
                <div className="w-8 h-px" style={{ background: done ? "var(--primary)" : "var(--border)" }} />
              )}
              <div className="flex items-center gap-1.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: done ? "var(--primary)" : active ? "var(--primary)" : "var(--muted)",
                    color: done || active ? "#fff" : "var(--muted-foreground)",
                    transform: active ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {done ? "✓" : n}
                </div>
                <span
                  className="text-xs font-semibold hidden sm:inline"
                  style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)" }}
                >
                  {label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Page content */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        {children}
      </div>
    </div>
  )
}

// ── LanguageScreen ─────────────────────────────────────────────────────────────
function LanguageScreen({ onSelect, onBack, currentLang }: { onSelect: (l: Lang) => void; onBack: () => void; currentLang: Lang }) {
  const [selected, setSelected] = useState<Lang>(currentLang)

  const options: { value: Lang; flag: string; native: string; english: string; sampleText: string }[] = [
    { value: "en", flag: "🇬🇧", native: "English",    english: "English",   sampleText: "Welcome! Manage your shop smarter with StoreSyncOS." },
    { value: "hi", flag: "🇮🇳", native: "हिंदी",      english: "Hindi",     sampleText: "स्वागत है! StoreSyncOS से अपनी दुकान को बेहतर तरीके से चलाएं।" },
    { value: "bn", flag: "🇧🇩", native: "বাংলা",      english: "Bengali",   sampleText: "স্বাগতম! StoreSyncOS দিয়ে আপনার দোকান আরও স্মার্টভাবে পরিচালনা করুন।" },
    { value: "te", flag: "🇮🇳", native: "తెలుగు",     english: "Telugu",    sampleText: "స్వాగతం! StoreSyncOS తో మీ దుకాణాన్ని తెలివిగా నిర్వహించండి।" },
    { value: "ta", flag: "🇮🇳", native: "தமிழ்",      english: "Tamil",     sampleText: "வரவேற்கிறோம்! StoreSyncOS உடன் உங்கள் கடையை சிறப்பாக நிர்வகியுங்கள்।" },
    { value: "mr", flag: "🇮🇳", native: "मराठी",      english: "Marathi",   sampleText: "स्वागत आहे! StoreSyncOS सह तुमची दुकान हुशारीने चालवा।" },
    { value: "gu", flag: "🇮🇳", native: "ગુજરાતી",    english: "Gujarati",  sampleText: "સ્વાગત છે! StoreSyncOS સાથે તમારી દુકાન હોશિયારીથી ચલાવો।" },
    { value: "kn", flag: "🇮🇳", native: "ಕನ್ನಡ",      english: "Kannada",   sampleText: "ಸ್ವಾಗತ! StoreSyncOS ನೊಂದಿಗೆ ನಿಮ್ಮ ಅಂಗಡಿಯನ್ನು ಚಾಣಾಕ್ಷವಾಗಿ ನಿರ್ವಹಿಸಿ।" },
  ]

  return (
    <OnboardingShell step={2} totalSteps={3} onBack={onBack}>
      <div className="w-full max-w-lg slide-up">
        {/* Header — updates live as you hover/select */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌐</div>
          <h2 className="font-display font-black text-3xl mb-1 transition-all" style={{ color: "var(--foreground)" }}>
            {TR[selected].chooseLanguage}
          </h2>
          <p className="text-sm transition-all" style={{ color: "var(--muted-foreground)" }}>
            {TR[selected].langSubtitle}
          </p>
        </div>

        {/* Language cards */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {options.map(opt => {
            const isSelected = selected === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                className="flex items-center gap-5 p-5 rounded-2xl border-2 text-left transition-all cursor-pointer"
                style={{
                  background: isSelected ? "rgba(245,158,11,0.07)" : "var(--card)",
                  borderColor: isSelected ? "var(--primary)" : "var(--border)",
                  boxShadow: isSelected ? "0 0 0 4px rgba(245,158,11,0.12)" : "none",
                }}
              >
                {/* Flag */}
                <span className="text-4xl shrink-0">{opt.flag}</span>

                <div className="flex-1 min-w-0">
                  {/* Language name row */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display font-black text-xl" style={{ color: "var(--foreground)" }}>{opt.native}</span>
                    <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{opt.english}</span>
                  </div>
                  {/* Live sample text */}
                  <p className="text-sm leading-relaxed truncate" style={{ color: isSelected ? "var(--foreground)" : "var(--muted-foreground)" }}>
                    {opt.sampleText}
                  </p>
                </div>

                {/* Check circle */}
                <div className="w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all"
                  style={{
                    borderColor: isSelected ? "var(--primary)" : "var(--border)",
                    background: isSelected ? "var(--primary)" : "transparent",
                  }}>
                  {isSelected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl font-display font-bold text-base border transition-all hover:opacity-80"
            style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--card)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <button
            onClick={() => onSelect(selected)}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-lg transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            {TR[selected].continue}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </OnboardingShell>
  )
}

// ── LoginScreen ────────────────────────────────────────────────────────────────
function LoginScreen({ lang, onLogin, onBack }: { lang: Lang; onLogin: (info: { shopName: string; ownerName: string }) => void; onBack: () => void }) {
  const [form, setForm] = useState({ shopName: "", ownerName: "", phone: "", password: "" })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onLogin({ shopName: form.shopName || "My Shop", ownerName: form.ownerName || "Shopkeeper" })
  }

  const inputStyle = { background: "var(--muted)", border: "1.5px solid var(--border)", color: "var(--foreground)" }

  return (
    <OnboardingShell step={3} totalSteps={3} onBack={onBack}>
      <div className="w-full max-w-md slide-up">
        <div className="rounded-3xl border overflow-hidden shadow-xl" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {/* Header */}
          <div className="px-8 py-8 text-center" style={{ background: "var(--secondary)" }}>
            <div className="flex justify-center mb-3"><StoreSyncLogo size={52} /></div>
            <h2 className="font-display font-black text-2xl mb-1" style={{ color: "#fff" }}>StoreSyncOS</h2>
            <p className="text-sm opacity-70" style={{ color: "#FDE68A" }}>{TR[lang].tagline}</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>{TR[lang].shopName} *</label>
              <input
                value={form.shopName}
                onChange={e => setForm(p => ({ ...p, shopName: e.target.value }))}
                placeholder="e.g. Sharma General Store"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>{TR[lang].ownerName} *</label>
              <input
                value={form.ownerName}
                onChange={e => setForm(p => ({ ...p, ownerName: e.target.value }))}
                placeholder="e.g. Ramesh Sharma"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>{TR[lang].phone}</label>
              <input
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210"
                type="tel"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>{TR[lang].password}</label>
              <input
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
              />
            </div>

            {/* AI tip */}
            <div className="rounded-xl p-4" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <p className="text-xs font-semibold flex items-center gap-2" style={{ color: "var(--primary)" }}>
                🤖 AI Tip: Fill in your shop type for smarter product recommendations!
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-display font-bold text-base transition-all hover:opacity-90 active:scale-95"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              {TR[lang].signIn} →
            </button>
          </form>
        </div>

        <p className="text-center mt-4 text-xs" style={{ color: "var(--muted-foreground)" }}>
          🔒 Your data is stored securely and works offline
        </p>
      </div>
    </OnboardingShell>
  )
}

// ── Dashboard ──────────────────────────────────────────────────────────────────
function Dashboard({ lang, shopInfo }: { lang: Lang; shopInfo: { shopName: string; ownerName: string } }) {
  const lowStock = INITIAL_PRODUCTS.filter(p => p.stock <= p.minStock)
  const todaySales = MOCK_BILLS.reduce((s, b) => s + b.total, 0)
  const topSuggestion = AI_SUGGESTIONS[0]

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Welcome header */}
      <div className="rounded-3xl p-6 md:p-8 relative overflow-hidden" style={{ background: "var(--secondary)" }}>
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 80% 50%, var(--primary), transparent)" }} />
        <div className="relative">
          <p className="text-sm font-semibold mb-1" style={{ color: "#FDE68A" }}>{getGreeting(lang)}</p>
          <h2 className="font-display font-black text-2xl md:text-3xl mb-1" style={{ color: "#fff" }}>{shopInfo.ownerName}</h2>
          <p className="text-sm opacity-70" style={{ color: "#fff" }}>🏪 {shopInfo.shopName} · {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="💰" label={TR[lang].totalSales} value={`₹${todaySales.toLocaleString("en-IN")}`} sub="↑ 12% vs yesterday" color="var(--accent)" />
        <StatCard icon="📈" label={TR[lang].profit} value="₹931" sub="↑ 8.4% margin" />
        <StatCard icon="👥" label={TR[lang].customers} value="18" sub="Today's visitors" />
        <StatCard icon="⚠️" label={TR[lang].stockAlert} value={`${lowStock.length} items`} sub="Need reorder" color="var(--destructive)" />
      </div>

      {/* Health score + AI suggestion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <HealthScoreRing score={74} lang={lang} />

        {/* AI Suggestion */}
        <div className="md:col-span-2 rounded-2xl p-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🤖</span>
            <h3 className="font-display font-bold" style={{ color: "var(--foreground)" }}>{TR[lang].aiSuggestions}</h3>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(245,158,11,0.1)", color: "var(--primary)" }}>{AI_SUGGESTIONS.length} alerts</span>
          </div>
          <div className="space-y-3">
            {AI_SUGGESTIONS.slice(0, 3).map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: s.priority === "high" ? "rgba(239,68,68,0.06)" : s.priority === "medium" ? "rgba(245,158,11,0.06)" : "var(--muted)" }}>
                <span className="text-xl shrink-0">{s.icon}</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{s.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.desc}</p>
                </div>
                <span className={`ml-auto shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold ${s.priority === "high" ? "bg-red-100 text-red-600" : s.priority === "medium" ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"}`}>
                  {s.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent bills + low stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent bills */}
        <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
            <h3 className="font-display font-bold" style={{ color: "var(--foreground)" }}>🧾 Recent Bills</h3>
            <span className="text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>Today</span>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {MOCK_BILLS.map(b => (
              <div key={b.id} className="flex items-center px-5 py-3 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>{b.customer}</p>
                  <p className="text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>{b.id} · {b.time}</p>
                </div>
                <p className="font-bold font-mono text-sm" style={{ color: "var(--foreground)" }}>₹{b.total}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${b.paid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {b.paid ? "Paid" : "Unpaid"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock */}
        <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
            <h3 className="font-display font-bold" style={{ color: "var(--foreground)" }}>📦 Low Stock Alert</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold">{lowStock.length} items</span>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {lowStock.map(p => (
              <div key={p.id} className="flex items-center px-5 py-3 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>{p.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-bold text-red-500">{p.stock} left</p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>min: {p.minStock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Catalogue ──────────────────────────────────────────────────────────────────
const CATEGORIES = ["Grocery", "Dairy", "Snacks", "FMCG", "Instant Food", "Personal Care", "Beverages", "Stationery", "Electronics", "Other"]

const BLANK_FORM = { name: "", category: "Grocery", price: "", stock: "", minStock: "", expiry: "", barcode: "", description: "" }

function CatalogueModule({ lang, products, setProducts }: {
  lang: Lang
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}) {
  const [view, setView] = useState<"list" | "add" | "edit">("list")
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState(BLANK_FORM)
  const [errors, setErrors] = useState<Partial<typeof BLANK_FORM>>({})
  const [search, setSearch] = useState("")
  const [catFilter, setCatFilter] = useState("All")
  const [saved, setSaved] = useState(false)

  const cats = ["All", ...Array.from(new Set(products.map(p => p.category)))]
  const filtered = products.filter(p =>
    (catFilter === "All" || p.category === catFilter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  function openAdd() {
    setForm(BLANK_FORM)
    setErrors({})
    setSaved(false)
    setEditId(null)
    setView("add")
  }

  function openEdit(p: Product) {
    setForm({ name: p.name, category: p.category, price: String(p.price), stock: String(p.stock), minStock: String(p.minStock), expiry: p.expiry, barcode: p.barcode, description: "" })
    setErrors({})
    setSaved(false)
    setEditId(p.id)
    setView("edit")
  }

  function validate() {
    const e: Partial<typeof BLANK_FORM> = {}
    if (!form.name.trim()) e.name = "Product name is required"
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = "Enter a valid price"
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0) e.stock = "Enter valid stock quantity"
    if (!form.minStock || isNaN(Number(form.minStock)) || Number(form.minStock) < 0) e.minStock = "Enter valid minimum stock"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSave() {
    if (!validate()) return
    if (view === "edit" && editId !== null) {
      setProducts(prev => prev.map(p => p.id === editId ? {
        ...p, name: form.name.trim(), category: form.category,
        price: Number(form.price), stock: Number(form.stock),
        minStock: Number(form.minStock), expiry: form.expiry || p.expiry, barcode: form.barcode || p.barcode,
      } : p))
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        minStock: Number(form.minStock),
        expiry: form.expiry || "2027-12-31",
        barcode: form.barcode || String(Math.floor(Math.random() * 9e12 + 1e12)),
      }
      setProducts(prev => [newProduct, ...prev])
    }
    setSaved(true)
    setTimeout(() => { setSaved(false); setView("list") }, 900)
  }

  function deleteProduct(id: number) {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const field = (label: string, key: keyof typeof BLANK_FORM, type = "text", placeholder = "") => (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition-all"
        style={{
          background: "var(--background)",
          borderColor: errors[key] ? "var(--destructive)" : "var(--border)",
          color: "var(--foreground)",
        }}
      />
      {errors[key] && <p className="text-xs mt-1 text-red-500">{errors[key]}</p>}
    </div>
  )

  // ── Add / Edit form page ──────────────────────────────────────────────────────
  if (view === "add" || view === "edit") {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setView("list")}
            className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--card)" }}>
            ←
          </button>
          <h2 className="font-display font-black text-2xl" style={{ color: "var(--foreground)" }}>
            {view === "edit" ? "✏️ Edit Product" : `📦 ${TR[lang].addProduct}`}
          </h2>
        </div>

        <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {/* Top accent */}
          <div className="h-1.5" style={{ background: "linear-gradient(90deg, var(--primary), var(--accent))" }} />

          <div className="p-6 space-y-5">
            {/* Name */}
            {field("Product Name *", "name", "text", "e.g. Tata Salt 1kg")}

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Category *</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Price + Stock row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("Selling Price (₹) *", "price", "number", "e.g. 28")}
              {field("Current Stock (units) *", "stock", "number", "e.g. 50")}
            </div>

            {/* Min stock + Expiry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field("Minimum Stock Alert *", "minStock", "number", "e.g. 10")}
              {field("Expiry Date", "expiry", "date", "")}
            </div>

            {/* Barcode */}
            {field("Barcode / SKU", "barcode", "text", "e.g. 8901234567890")}

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Description (optional)</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Short description or notes about this product"
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none resize-none"
                style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setView("list")}
                className="flex-1 py-3 rounded-xl font-bold text-sm border transition-all hover:opacity-80"
                style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--background)" }}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                style={{ background: saved ? "var(--accent)" : "var(--primary)", color: "#fff" }}>
                {saved ? "✓ Saved!" : view === "edit" ? "💾 Save Changes" : `+ ${TR[lang].addProduct}`}
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 rounded-xl p-4 text-xs space-y-1.5" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
          <p className="font-semibold" style={{ color: "var(--foreground)" }}>💡 Tips</p>
          <p>• Set Min Stock so you get low-stock alerts automatically</p>
          <p>• Barcode is optional — you can scan it later with the Bill Scanner</p>
          <p>• Products added here will appear in Billing &amp; POS immediately</p>
        </div>
      </div>
    )
  }

  // ── Product list ──────────────────────────────────────────────────────────────
  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-display font-black text-2xl" style={{ color: "var(--foreground)" }}>📦 {TR[lang].catalogue}</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
          style={{ background: "var(--primary)", color: "#fff" }}>
          + {TR[lang].addProduct}
        </button>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 flex-wrap">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={TR[lang].searchProduct}
          className="flex-1 min-w-48 px-4 py-2.5 rounded-xl text-sm outline-none border"
          style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
        />
        <div className="flex gap-2 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: catFilter === c ? "var(--primary)" : "var(--card)",
                color: catFilter === c ? "#fff" : "var(--foreground)",
                border: `1px solid ${catFilter === c ? "transparent" : "var(--border)"}`,
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">📦</p>
          <p className="font-display font-bold text-lg mb-1" style={{ color: "var(--foreground)" }}>No products found</p>
          <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>Try a different search or add a new product</p>
          <button onClick={openAdd} className="px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90"
            style={{ background: "var(--primary)", color: "#fff" }}>+ {TR[lang].addProduct}</button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => {
          const isLow = p.stock <= p.minStock
          const daysToExpiry = Math.round((new Date(p.expiry).getTime() - Date.now()) / 86400000)
          return (
            <div key={p.id} className="card-hover rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="h-2" style={{ background: isLow ? "var(--destructive)" : "var(--accent)" }} />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm leading-tight truncate" style={{ color: "var(--foreground)" }}>{p.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{p.category}</p>
                  </div>
                  <p className="font-display font-black text-lg ml-2 shrink-0" style={{ color: "var(--primary)" }}>₹{p.price}</p>
                </div>
                <div className="space-y-1.5 mt-3">
                  <div className="flex justify-between text-xs">
                    <span style={{ color: "var(--muted-foreground)" }}>Stock</span>
                    <span className={`font-semibold font-mono ${isLow ? "text-red-500" : ""}`}>{p.stock} units</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: "var(--muted-foreground)" }}>Expiry</span>
                    <span className={`font-mono ${daysToExpiry < 30 ? "text-amber-500 font-bold" : ""}`}>{daysToExpiry}d</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: "var(--muted-foreground)" }}>Barcode</span>
                    <span className="font-mono" style={{ color: "var(--muted-foreground)" }}>{p.barcode.slice(-6)}</span>
                  </div>
                </div>
                {isLow && (
                  <div className="mt-3 text-xs px-2 py-1 rounded-lg font-semibold" style={{ background: "rgba(239,68,68,0.08)", color: "var(--destructive)" }}>⚠️ Low Stock — Reorder</div>
                )}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => openEdit(p)} className="flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all hover:opacity-80"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>✏️ Edit</button>
                  <button onClick={() => deleteProduct(p.id)} className="py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all hover:opacity-80"
                    style={{ background: "rgba(239,68,68,0.08)", color: "var(--destructive)" }}>🗑</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Billing ────────────────────────────────────────────────────────────────────
function BillingModule({ lang, setModule, setPendingKhata, products }: {
  lang: Lang
  setModule: (m: Module) => void
  setPendingKhata: (k: { customer: string; items: { name: string; qty: number; price: number }[]; total: number }) => void
  products: Product[]
}) {
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([])
  const [search, setSearch] = useState("")
  const [customer, setCustomer] = useState("Walk-in")
  const [showReceipt, setShowReceipt] = useState(false)

  function addToCart(p: Product) {
    setCart(prev => {
      const ex = prev.find(x => x.product.id === p.id)
      if (ex) return prev.map(x => x.product.id === p.id ? { ...x, qty: x.qty + 1 } : x)
      return [...prev, { product: p, qty: 1 }]
    })
  }

  function removeFromCart(id: number) {
    setCart(prev => prev.filter(x => x.product.id !== id))
  }

  const total = cart.reduce((s, x) => s + x.product.price * x.qty, 0)
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  const billDate = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
  const billNo = `INV-${Date.now().toString().slice(-6)}`

  if (showReceipt) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4" style={{ background: "var(--background)" }}>
        {/* Receipt card */}
        <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {/* Header */}
          <div className="text-center py-6 px-5" style={{ background: "var(--secondary)" }}>
            <p className="font-display font-black text-white text-xl tracking-wide">StoreSyncOS</p>
            <p className="text-white/70 text-xs mt-1">Tax Invoice</p>
          </div>

          {/* Bill meta */}
          <div className="px-5 py-4 border-b flex justify-between text-xs" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
            <div>
              <p className="font-semibold">Bill No.</p>
              <p className="font-mono font-bold mt-0.5" style={{ color: "var(--foreground)" }}>{billNo}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Date & Time</p>
              <p className="font-mono font-bold mt-0.5" style={{ color: "var(--foreground)" }}>{billDate}</p>
            </div>
          </div>
          <div className="px-5 py-3 border-b text-sm" style={{ borderColor: "var(--border)" }}>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Customer: </span>
            <span className="font-semibold" style={{ color: "var(--foreground)" }}>{customer || "Walk-in"}</span>
          </div>

          {/* Items */}
          <div className="px-5 py-3 space-y-2">
            <div className="flex text-xs font-bold pb-2 border-b" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
              <span className="flex-1">Item</span>
              <span className="w-10 text-center">Qty</span>
              <span className="w-16 text-right">Rate</span>
              <span className="w-16 text-right">Amt</span>
            </div>
            {cart.map(x => (
              <div key={x.product.id} className="flex items-center text-sm">
                <span className="flex-1 truncate font-medium" style={{ color: "var(--foreground)" }}>{x.product.name}</span>
                <span className="w-10 text-center font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{x.qty}</span>
                <span className="w-16 text-right font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>₹{x.product.price}</span>
                <span className="w-16 text-right font-mono font-bold text-sm" style={{ color: "var(--foreground)" }}>₹{x.product.price * x.qty}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mx-5 my-3 rounded-xl p-4 space-y-1.5 text-sm" style={{ background: "var(--muted)" }}>
            <div className="flex justify-between" style={{ color: "var(--muted-foreground)" }}>
              <span>Subtotal</span><span className="font-mono">₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between" style={{ color: "var(--muted-foreground)" }}>
              <span>GST (0%)</span><span className="font-mono">₹0</span>
            </div>
            <div className="flex justify-between font-display font-black text-base pt-1.5 border-t" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
              <span>Total</span>
              <span style={{ color: "var(--primary)" }}>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs pb-5 px-5" style={{ color: "var(--muted-foreground)" }}>
            Thank you for shopping with us! 🙏<br />
            Powered by StoreSyncOS
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 w-full max-w-sm">
          <button
            onClick={() => setShowReceipt(false)}
            className="flex-1 py-3 rounded-xl font-bold text-sm border transition-all hover:opacity-80"
            style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--card)" }}>
            ← Back to Billing
          </button>
          <button
            onClick={() => { window.print(); setCart([]); setCustomer("Walk-in"); setShowReceipt(false); }}
            className="flex-1 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
            style={{ background: "var(--primary)", color: "#fff" }}>
            🖨️ Print / Save PDF
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="font-display font-black text-2xl mb-5" style={{ color: "var(--foreground)" }}>🧾 {TR[lang].billing}</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {/* Product picker */}
        <div className="md:col-span-3 space-y-4">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search to add product..."
            className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map(p => (
              <button key={p.id} onClick={() => addToCart(p)}
                className="card-hover text-left p-3 rounded-xl border transition-all"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <p className="text-xs font-bold truncate" style={{ color: "var(--foreground)" }}>{p.name}</p>
                <p className="font-display font-bold text-base mt-1" style={{ color: "var(--primary)" }}>₹{p.price}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Stock: {p.stock}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Bill cart */}
        <div className="md:col-span-2 rounded-2xl border overflow-hidden flex flex-col" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
            <p className="font-display font-bold text-white">{TR[lang].newBill}</p>
            <input
              value={customer}
              onChange={e => setCustomer(e.target.value)}
              placeholder="Customer name"
              className="mt-2 w-full px-3 py-1.5 rounded-lg text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
            />
          </div>

          <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: "var(--border)" }}>
            {cart.length === 0 && (
              <p className="text-center py-12 text-sm" style={{ color: "var(--muted-foreground)" }}>Click products to add ↑</p>
            )}
            {cart.map(x => (
              <div key={x.product.id} className="flex items-center px-4 py-3 gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>{x.product.name}</p>
                  <p className="text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>₹{x.product.price} each</p>
                </div>
                {/* Qty controls */}
                <div className="flex items-center gap-1 rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                  <button
                    onClick={() => setCart(prev => prev.map(c => c.product.id === x.product.id ? { ...c, qty: Math.max(1, c.qty - 1) } : c))}
                    className="w-7 h-7 flex items-center justify-center text-base font-bold transition-all hover:opacity-70"
                    style={{ background: "var(--muted)", color: "var(--foreground)" }}
                  >−</button>
                  <span className="w-7 text-center text-sm font-mono font-bold" style={{ color: "var(--foreground)" }}>{x.qty}</span>
                  <button
                    onClick={() => setCart(prev => prev.map(c => c.product.id === x.product.id ? { ...c, qty: c.qty + 1 } : c))}
                    className="w-7 h-7 flex items-center justify-center text-base font-bold transition-all hover:opacity-70"
                    style={{ background: "var(--muted)", color: "var(--foreground)" }}
                  >+</button>
                </div>
                <p className="font-bold font-mono text-sm w-16 text-right" style={{ color: "var(--foreground)" }}>₹{x.product.price * x.qty}</p>
                <button onClick={() => removeFromCart(x.product.id)} className="text-red-400 hover:text-red-600 ml-1 text-lg leading-none">✕</button>
              </div>
            ))}
          </div>

          <div className="border-t p-5 space-y-3" style={{ borderColor: "var(--border)" }}>
            <div className="flex justify-between font-display font-black text-lg">
              <span style={{ color: "var(--foreground)" }}>Total</span>
              <span style={{ color: "var(--primary)" }}>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setPendingKhata({
                    customer,
                    items: cart.map(x => ({ name: x.product.name, qty: x.qty, price: x.product.price })),
                    total,
                  })
                  setModule("khata")
                }}
                className="py-2.5 rounded-xl text-sm font-bold border transition-all hover:opacity-80"
                style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>
                💳 {TR[lang].khata}
              </button>
              <button
                onClick={() => cart.length > 0 && setShowReceipt(true)}
                className="py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: cart.length > 0 ? "var(--primary)" : "var(--muted)", color: cart.length > 0 ? "#fff" : "var(--muted-foreground)", cursor: cart.length > 0 ? "pointer" : "not-allowed" }}>
                ✓ Print Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Khata ──────────────────────────────────────────────────────────────────────
type KhataEntry = { id: number; customer: string; phone: string; items: { name: string; qty: number; price: number }[]; total: number; date: string; note: string; paid: boolean }

const INITIAL_KHATA: KhataEntry[] = MOCK_CUSTOMERS.filter(c => c.credit > 0).map((c, i) => ({
  id: i + 1,
  customer: c.name,
  phone: c.phone,
  items: [{ name: "Previous balance", qty: 1, price: c.credit }],
  total: c.credit,
  date: c.lastVisit,
  note: "",
  paid: false,
}))

function KhataModule({ lang, pendingKhata, clearPendingKhata }: {
  lang: Lang
  pendingKhata: { customer: string; items: { name: string; qty: number; price: number }[]; total: number } | null
  clearPendingKhata: () => void
}) {
  const [entries, setEntries] = useState<KhataEntry[]>(INITIAL_KHATA)
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const [form, setForm] = useState({ customer: "", phone: "", note: "", items: [{ name: "", qty: 1, price: 0 }] })

  // Pre-fill form when arriving from billing
  useEffect(() => {
    if (pendingKhata) {
      setForm({
        customer: pendingKhata.customer === "Walk-in" ? "" : pendingKhata.customer,
        phone: "",
        note: "",
        items: pendingKhata.items.length > 0 ? pendingKhata.items : [{ name: "", qty: 1, price: 0 }],
      })
      setShowForm(true)
      clearPendingKhata()
    }
  }, [pendingKhata])

  const formTotal = form.items.reduce((s, x) => s + x.qty * x.price, 0)

  function addItem() { setForm(f => ({ ...f, items: [...f.items, { name: "", qty: 1, price: 0 }] })) }
  function removeItem(i: number) { setForm(f => ({ ...f, items: f.items.filter((_, j) => j !== i) })) }
  function updateItem(i: number, field: "name" | "qty" | "price", val: string) {
    setForm(f => ({ ...f, items: f.items.map((x, j) => j === i ? { ...x, [field]: field === "name" ? val : Number(val) } : x) }))
  }

  function saveEntry() {
    if (!form.customer.trim()) return
    const entry: KhataEntry = {
      id: Date.now(),
      customer: form.customer,
      phone: form.phone,
      items: form.items.filter(x => x.name.trim()),
      total: formTotal,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      note: form.note,
      paid: false,
    }
    setEntries(prev => [entry, ...prev])
    setForm({ customer: "", phone: "", note: "", items: [{ name: "", qty: 1, price: 0 }] })
    setShowForm(false)
  }

  function markPaid(id: number) { setEntries(prev => prev.map(e => e.id === id ? { ...e, paid: true } : e)) }
  function deleteEntry(id: number) { setEntries(prev => prev.filter(e => e.id !== id)) }

  const grandTotal = entries.filter(e => !e.paid).reduce((s, e) => s + e.total, 0)

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-display font-black text-2xl" style={{ color: "var(--foreground)" }}>💳 {TR[lang].khata}</h2>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{TR[lang].totalCredit}</p>
            <p className="font-display font-black text-xl" style={{ color: "var(--destructive)" }}>₹{grandTotal.toLocaleString("en-IN")}</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setForm({ customer: "", phone: "", note: "", items: [{ name: "", qty: 1, price: 0 }] }) }}
            className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-90 flex items-center gap-1.5"
            style={{ background: "var(--primary)", color: "#fff" }}>
            + Add Entry
          </button>
        </div>
      </div>

      {/* ── Add / Edit form ── */}
      {showForm && (
        <div className="rounded-2xl border p-5 space-y-4" style={{ background: "var(--card)", borderColor: "var(--primary)" }}>
          <div className="flex items-center justify-between">
            <p className="font-display font-bold text-base" style={{ color: "var(--foreground)" }}>📋 New Credit Entry</p>
            <button onClick={() => setShowForm(false)} className="text-lg leading-none opacity-50 hover:opacity-100" style={{ color: "var(--foreground)" }}>✕</button>
          </div>

          {/* Customer info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--muted-foreground)" }}>Customer Name *</label>
              <input
                value={form.customer}
                onChange={e => setForm(f => ({ ...f, customer: e.target.value }))}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
                style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--muted-foreground)" }}>Phone Number</label>
              <input
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
                style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
              />
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>Items</label>
              <button onClick={addItem} className="text-xs font-bold px-2 py-1 rounded-lg" style={{ background: "rgba(245,158,11,0.12)", color: "var(--primary)" }}>+ Add Item</button>
            </div>
            <div className="space-y-2">
              {/* Column headers */}
              <div className="grid grid-cols-12 gap-2 text-xs font-semibold px-1" style={{ color: "var(--muted-foreground)" }}>
                <span className="col-span-5">Item Name</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-3 text-right">Price (₹)</span>
                <span className="col-span-2 text-right">Amt</span>
              </div>
              {form.items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    value={item.name}
                    onChange={e => updateItem(i, "name", e.target.value)}
                    placeholder="Item name"
                    className="col-span-5 px-2 py-1.5 rounded-lg text-sm border outline-none"
                    style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
                  />
                  <input
                    type="number" min="1"
                    value={item.qty}
                    onChange={e => updateItem(i, "qty", e.target.value)}
                    className="col-span-2 px-2 py-1.5 rounded-lg text-sm border outline-none text-center font-mono"
                    style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
                  />
                  <input
                    type="number" min="0"
                    value={item.price || ""}
                    onChange={e => updateItem(i, "price", e.target.value)}
                    placeholder="0"
                    className="col-span-3 px-2 py-1.5 rounded-lg text-sm border outline-none text-right font-mono"
                    style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
                  />
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <span className="text-xs font-mono font-bold" style={{ color: "var(--primary)" }}>₹{(item.qty * item.price).toLocaleString("en-IN")}</span>
                    {form.items.length > 1 && (
                      <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 text-sm ml-1">✕</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Total row */}
            <div className="flex justify-end mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="text-right">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Total Credit: </span>
                <span className="font-display font-black text-lg ml-2" style={{ color: "var(--destructive)" }}>₹{formTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--muted-foreground)" }}>Note (optional)</label>
            <input
              value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              placeholder="e.g. Festival advance, paid ₹200 cash"
              className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
              style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-sm font-bold border hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>Cancel</button>
            <button onClick={saveEntry} className="px-5 py-2 rounded-xl text-sm font-bold hover:opacity-90"
              style={{ background: form.customer.trim() ? "var(--primary)" : "var(--muted)", color: form.customer.trim() ? "#fff" : "var(--muted-foreground)", cursor: form.customer.trim() ? "pointer" : "not-allowed" }}>
              ✓ Save Entry
            </button>
          </div>
        </div>
      )}

      {/* ── Entry list ── */}
      <div className="space-y-3">
        {entries.length === 0 && (
          <p className="text-center py-16 text-sm" style={{ color: "var(--muted-foreground)" }}>No credit entries yet. Click "Add Entry" to start.</p>
        )}
        {entries.map(e => (
          <div key={e.id} className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: e.paid ? "var(--border)" : "rgba(239,68,68,0.25)" }}>
            {/* Summary row */}
            <div className="flex items-center gap-3 px-5 py-4 cursor-pointer" onClick={() => setExpandedId(expandedId === e.id ? null : e.id)}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-base shrink-0"
                style={{ background: e.paid ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)", color: e.paid ? "var(--accent)" : "var(--destructive)" }}>
                {e.customer[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate" style={{ color: "var(--foreground)" }}>{e.customer}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {e.phone ? `📞 ${e.phone} · ` : ""}{e.date} · {e.items.length} item{e.items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right shrink-0">
                {e.paid ? (
                  <p className="font-semibold text-sm" style={{ color: "var(--accent)" }}>✅ Cleared</p>
                ) : (
                  <p className="font-display font-black text-lg" style={{ color: "var(--destructive)" }}>₹{e.total.toLocaleString("en-IN")}</p>
                )}
              </div>
              <span className="text-xs opacity-40 ml-1" style={{ color: "var(--foreground)" }}>{expandedId === e.id ? "▲" : "▼"}</span>
            </div>

            {/* Expanded detail */}
            {expandedId === e.id && (
              <div className="border-t px-5 py-4 space-y-3" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                {/* Item lines */}
                <div className="space-y-1.5">
                  <div className="grid grid-cols-12 text-xs font-semibold mb-1" style={{ color: "var(--muted-foreground)" }}>
                    <span className="col-span-6">Item</span>
                    <span className="col-span-2 text-center">Qty</span>
                    <span className="col-span-2 text-right">Rate</span>
                    <span className="col-span-2 text-right">Amt</span>
                  </div>
                  {e.items.map((item, i) => (
                    <div key={i} className="grid grid-cols-12 text-sm">
                      <span className="col-span-6 truncate" style={{ color: "var(--foreground)" }}>{item.name}</span>
                      <span className="col-span-2 text-center font-mono" style={{ color: "var(--muted-foreground)" }}>{item.qty}</span>
                      <span className="col-span-2 text-right font-mono" style={{ color: "var(--muted-foreground)" }}>₹{item.price}</span>
                      <span className="col-span-2 text-right font-mono font-bold" style={{ color: "var(--foreground)" }}>₹{item.qty * item.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-end pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                    <span className="font-display font-black text-base" style={{ color: "var(--destructive)" }}>Total: ₹{e.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                {e.note && <p className="text-xs italic" style={{ color: "var(--muted-foreground)" }}>📝 {e.note}</p>}
                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  {!e.paid && (
                    <button onClick={() => markPaid(e.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-90"
                      style={{ background: "rgba(16,185,129,0.12)", color: "var(--accent)" }}>✅ Mark as Paid</button>
                  )}
                  <button className="px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-80"
                    style={{ background: "rgba(245,158,11,0.1)", color: "var(--primary)" }}>📲 Send Reminder</button>
                  <button onClick={() => deleteEntry(e.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-80 ml-auto"
                    style={{ background: "rgba(239,68,68,0.08)", color: "var(--destructive)" }}>🗑 Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── OCR ────────────────────────────────────────────────────────────────────────
function OCRModule({ lang }: { lang: Lang }) {
  const [state, setState] = useState<"idle" | "scanning" | "done">("idle")

  function simulate() {
    setState("scanning")
    setTimeout(() => setState("done"), 2500)
  }

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-xl mx-auto">
      <h2 className="font-display font-black text-2xl" style={{ color: "var(--foreground)" }}>📸 {TR[lang].ocr}</h2>
      <div className="rounded-3xl border-2 border-dashed p-10 text-center flex flex-col items-center gap-4"
        style={{ borderColor: state === "scanning" ? "var(--primary)" : "var(--border)", background: "var(--card)" }}>
        {state === "idle" && <>
          <div className="text-6xl">📷</div>
          <p className="font-display font-bold text-lg" style={{ color: "var(--foreground)" }}>Scan or Upload a Bill</p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>AI will auto-extract product names, prices, and quantities</p>
          <button onClick={simulate} className="px-6 py-3 rounded-2xl font-bold text-sm mt-2 transition-all hover:opacity-90"
            style={{ background: "var(--primary)", color: "#fff" }}>📷 Start Camera / Upload</button>
        </>}
        {state === "scanning" && <>
          <div className="text-6xl animate-bounce">🔍</div>
          <p className="font-display font-bold" style={{ color: "var(--primary)" }}>Scanning & Extracting...</p>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
            <div className="h-full rounded-full" style={{ background: "var(--primary)", width: "60%", transition: "width 0.5s" }} />
          </div>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>AI OCR processing in progress...</p>
        </>}
        {state === "done" && <>
          <div className="text-6xl">✅</div>
          <p className="font-display font-bold" style={{ color: "var(--accent)" }}>Extraction Complete!</p>
          <div className="w-full text-left space-y-2 mt-2">
            {[
              { name: "Parle-G 1kg", qty: 2, price: 80 },
              { name: "Maggi 70g ×6", qty: 1, price: 84 },
              { name: "Tata Salt 1kg", qty: 3, price: 84 },
            ].map((x, i) => (
              <div key={i} className="flex justify-between px-4 py-2 rounded-xl" style={{ background: "var(--muted)" }}>
                <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{x.name}</span>
                <span className="font-mono text-sm" style={{ color: "var(--primary)" }}>₹{x.price}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-2">
            <button onClick={() => setState("idle")} className="flex-1 py-2.5 rounded-xl text-sm font-bold border"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>Scan Another</button>
            <button className="flex-1 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: "var(--primary)", color: "#fff" }}>Add to Inventory</button>
          </div>
        </>}
      </div>
    </div>
  )
}

// ── Supplier ───────────────────────────────────────────────────────────────────
type SupplierType = { id: number; name: string; category: string; rating: number; lastOrder: string; contact: string; email: string; address: string; notes: string }

const BLANK_SUPPLIER = { name: "", category: "Grocery", contact: "", email: "", address: "", notes: "", rating: "4.0" }

function SupplierModule({ lang }: { lang: Lang }) {
  const [suppliers, setSuppliers] = useState<SupplierType[]>(
    MOCK_SUPPLIERS.map(s => ({ ...s, email: "", address: "", notes: "" }))
  )
  const [view, setView] = useState<"list" | "add" | "edit">("list")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(BLANK_SUPPLIER)
  const [errors, setErrors] = useState<Partial<typeof BLANK_SUPPLIER>>({})
  const [saved, setSaved] = useState(false)
  const [search, setSearch] = useState("")

  const SUPPLIER_CATEGORIES = ["Grocery", "Dairy", "FMCG", "Snacks", "Instant Food", "Personal Care", "Beverages", "Stationery", "Electronics", "Tobacco/Food", "Other"]

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  )

  function openAdd() {
    setForm(BLANK_SUPPLIER)
    setErrors({})
    setSaved(false)
    setEditingId(null)
    setView("add")
  }

  function openEdit(s: SupplierType) {
    setForm({ name: s.name, category: s.category, contact: s.contact, email: s.email, address: s.address, notes: s.notes, rating: String(s.rating) })
    setErrors({})
    setSaved(false)
    setEditingId(s.id)
    setView("edit")
  }

  function validate() {
    const e: Partial<typeof BLANK_SUPPLIER> = {}
    if (!form.name.trim()) e.name = "Supplier name is required"
    if (!form.contact.trim()) e.contact = "Contact number is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSave() {
    if (!validate()) return
    if (view === "edit" && editingId !== null) {
      setSuppliers(prev => prev.map(s => s.id === editingId
        ? { ...s, name: form.name.trim(), category: form.category, contact: form.contact, email: form.email, address: form.address, notes: form.notes, rating: parseFloat(form.rating) || s.rating }
        : s))
    } else {
      setSuppliers(prev => [{
        id: Date.now(),
        name: form.name.trim(),
        category: form.category,
        contact: form.contact,
        email: form.email,
        address: form.address,
        notes: form.notes,
        rating: parseFloat(form.rating) || 4.0,
        lastOrder: "Never",
      }, ...prev])
    }
    setSaved(true)
    setTimeout(() => { setSaved(false); setView("list") }, 900)
  }

  function deleteSupplier(id: number) {
    setSuppliers(prev => prev.filter(s => s.id !== id))
  }

  const inputSt = { background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }

  const Field = ({ label, k, type = "text", placeholder = "" }: { label: string; k: keyof typeof BLANK_SUPPLIER; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>{label}</label>
      <input type={type} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition-all"
        style={{ ...inputSt, borderColor: errors[k] ? "var(--destructive)" : "var(--border)" }} />
      {errors[k] && <p className="text-xs mt-1 text-red-500">{errors[k]}</p>}
    </div>
  )

  // ── Add / Edit form ───────────────────────────────────────────────────────────
  if (view === "add" || view === "edit") {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView("list")}
            className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--card)" }}>←</button>
          <h2 className="font-display font-black text-2xl" style={{ color: "var(--foreground)" }}>
            {view === "edit" ? "✏️ Edit Supplier" : "🛒 Add Supplier"}
          </h2>
        </div>

        <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="h-1.5" style={{ background: "linear-gradient(90deg, var(--primary), var(--accent))" }} />
          <div className="p-6 space-y-5">

            <Field label="Supplier / Company Name *" k="name" placeholder="e.g. Metro Cash & Carry" />

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Category *</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                style={inputSt}>
                {SUPPLIER_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Contact Number *" k="contact" type="tel" placeholder="e.g. 9876543210" />
              <Field label="Email Address" k="email" type="email" placeholder="e.g. supplier@example.com" />
            </div>

            <Field label="Address" k="address" placeholder="e.g. Sector 14, Gurugram, Haryana" />

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Rating (0–5)</label>
              <div className="flex items-center gap-3">
                <input type="range" min="0" max="5" step="0.1" value={form.rating}
                  onChange={e => setForm(f => ({ ...f, rating: e.target.value }))}
                  className="flex-1" />
                <span className="font-display font-black text-lg w-10 text-center" style={{ color: "var(--primary)" }}>
                  {parseFloat(form.rating).toFixed(1)}
                </span>
                <span className="text-lg">⭐</span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>Notes (optional)</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="e.g. Credit terms, delivery days, min order amount..."
                rows={3} className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none resize-none"
                style={inputSt} />
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={() => setView("list")}
                className="flex-1 py-3 rounded-xl font-bold text-sm border transition-all hover:opacity-80"
                style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--background)" }}>Cancel</button>
              <button onClick={handleSave}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ background: saved ? "var(--accent)" : "var(--primary)", color: "#fff" }}>
                {saved ? "✓ Saved!" : view === "edit" ? "💾 Save Changes" : "+ Add Supplier"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Supplier list ─────────────────────────────────────────────────────────────
  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-display font-black text-2xl" style={{ color: "var(--foreground)" }}>🛒 {TR[lang].supplier}</h2>
        <button onClick={openAdd} className="px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all"
          style={{ background: "var(--primary)", color: "#fff" }}>+ Add Supplier</button>
      </div>

      {/* Search */}
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search suppliers by name or category..."
        className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
        style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }} />

      {/* Smart restock banner */}
      <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" }}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔮</span>
          <div>
            <p className="font-display font-bold text-white mb-1">{TR[lang].smartRestock}</p>
            <p className="text-sm opacity-80 text-white">AI recommends ordering: <strong>Colgate Toothpaste ×24, Amul Butter ×12</strong> before Thursday.</p>
            <button className="mt-3 px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: "var(--primary)", color: "#fff" }}>Auto-Generate Order</button>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🛒</p>
          <p className="font-display font-bold text-lg mb-1" style={{ color: "var(--foreground)" }}>No suppliers found</p>
          <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>Try a different search or add a new supplier</p>
          <button onClick={openAdd} className="px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90"
            style={{ background: "var(--primary)", color: "#fff" }}>+ Add Supplier</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(s => (
          <div key={s.id} className="card-hover rounded-2xl border p-5 space-y-3"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="font-bold font-display truncate" style={{ color: "var(--foreground)" }}>{s.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.category}</p>
                {s.address && <p className="text-xs mt-0.5 truncate" style={{ color: "var(--muted-foreground)" }}>📍 {s.address}</p>}
              </div>
              <div className="flex items-center gap-1.5 ml-2 shrink-0">
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(16,185,129,0.1)", color: "var(--accent)" }}>
                  ⭐ {s.rating.toFixed(1)}
                </span>
                <button onClick={() => openEdit(s)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all hover:opacity-70"
                  style={{ background: "rgba(245,158,11,0.12)", color: "var(--primary)" }} title="Edit">✏️</button>
                <button onClick={() => deleteSupplier(s.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all hover:opacity-70"
                  style={{ background: "rgba(239,68,68,0.1)", color: "var(--destructive)" }} title="Delete">🗑️</button>
              </div>
            </div>
            <div className="flex gap-4 text-xs">
              <span style={{ color: "var(--muted-foreground)" }}>Last order: <span className="font-semibold" style={{ color: "var(--foreground)" }}>{s.lastOrder}</span></span>
            </div>
            {s.notes && <p className="text-xs italic" style={{ color: "var(--muted-foreground)" }}>📝 {s.notes}</p>}
            <div className="flex gap-2 pt-1">
              <button className="flex-1 py-2 rounded-xl text-xs font-bold border transition-all hover:opacity-80"
                style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>📞 {s.contact}</button>
              <button className="flex-1 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                style={{ background: "var(--primary)", color: "#fff" }}>{TR[lang].orderNow}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Analytics ──────────────────────────────────────────────────────────────────
function AnalyticsModule({ lang }: { lang: Lang }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const sales = [1240, 890, 1560, 1100, 2340, 3100, 2800]
  const maxSales = Math.max(...sales)

  return (
    <div className="p-4 md:p-6 space-y-5">
      <h2 className="font-display font-black text-2xl" style={{ color: "var(--foreground)" }}>📊 {TR[lang].analytics}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="💰" label="Weekly Sales" value="₹13,030" sub="↑ 18% vs last week" color="var(--accent)" />
        <StatCard icon="📦" label="Items Sold" value="486" sub="Avg 69/day" />
        <StatCard icon="💳" label="Credit Sales" value="₹4,100" sub="12 customers" color="var(--destructive)" />
        <StatCard icon="🏆" label="Top Product" value="Parle-G" sub="₹1,960 this week" color="var(--primary)" />
      </div>

      {/* Weekly bar chart */}
      <div className="rounded-2xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <h3 className="font-display font-bold mb-5" style={{ color: "var(--foreground)" }}>Weekly Sales Trend</h3>
        <div className="flex items-end gap-3 h-40">
          {days.map((d, i) => (
            <div key={d} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-mono" style={{ color: "var(--muted-foreground)" }}>
                ₹{(sales[i] / 1000).toFixed(1)}k
              </span>
              <div className="w-full rounded-t-lg transition-all" style={{
                height: `${(sales[i] / maxSales) * 100}%`,
                background: i === 5 ? "var(--primary)" : "var(--secondary)",
                opacity: i === 5 ? 1 : 0.6,
              }} />
              <span className="text-xs font-semibold" style={{ color: i === 5 ? "var(--primary)" : "var(--muted-foreground)" }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="rounded-2xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <h3 className="font-display font-bold mb-4" style={{ color: "var(--foreground)" }}>Sales by Category</h3>
        <div className="space-y-3">
          {[
            { cat: "Grocery", pct: 38, color: "var(--primary)" },
            { cat: "Snacks", pct: 24, color: "var(--accent)" },
            { cat: "Dairy", pct: 18, color: "var(--secondary)" },
            { cat: "FMCG", pct: 12, color: "#8B5CF6" },
            { cat: "Others", pct: 8, color: "var(--muted-foreground)" },
          ].map(x => (
            <div key={x.cat} className="flex items-center gap-3">
              <span className="w-24 text-sm font-semibold shrink-0" style={{ color: "var(--foreground)" }}>{x.cat}</span>
              <div className="flex-1 h-3 rounded-full" style={{ background: "var(--muted)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${x.pct}%`, background: x.color }} />
              </div>
              <span className="w-10 text-right text-sm font-mono font-bold" style={{ color: x.color }}>{x.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── AICopilot ──────────────────────────────────────────────────────────────────
function AICopilotModule({ lang }: { lang: Lang }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Namaste! 🙏 I'm your StoreSyncOS AI Copilot. I can help you with inventory, billing advice, customer insights, and business tips. What can I do for you today?" }
  ])
  const [input, setInput] = useState("")

  function sendMessage() {
    if (!input.trim()) return
    const q = input.trim()
    setInput("")
    setMessages(prev => [...prev,
      { role: "user", text: q },
      { role: "assistant", text: "Let me analyze your shop data... Based on your sales trends, I'd recommend focusing on restocking your fast-moving items and considering a promotional offer on slow-moving stock before expiry. Would you like a detailed breakdown?" }
    ])
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      <h2 className="font-display font-black text-2xl" style={{ color: "var(--foreground)" }}>🤖 {TR[lang].copilot}</h2>

      {/* Suggestions grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {AI_SUGGESTIONS.map((s, i) => (
          <div key={i} className="card-hover rounded-2xl border p-4 space-y-2"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{s.icon}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.priority === "high" ? "bg-red-100 text-red-600" : s.priority === "medium" ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"}`}>
                {s.priority}
              </span>
            </div>
            <p className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{s.title}</p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.desc}</p>
            <button className="text-xs font-semibold" style={{ color: "var(--primary)" }}>Take Action →</button>
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
          <span className="text-xl">🤖</span>
          <div>
            <p className="font-display font-bold text-white text-sm">AI Shopkeeper Copilot</p>
            <p className="text-xs opacity-60 text-white">Powered by StoreSyncOS Intelligence</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-xs md:max-w-md px-4 py-2.5 rounded-2xl text-sm"
                style={{
                  background: m.role === "user" ? "var(--primary)" : "var(--muted)",
                  color: m.role === "user" ? "#fff" : "var(--foreground)",
                  borderRadius: m.role === "user" ? "1.5rem 1.5rem 0 1.5rem" : "1.5rem 1.5rem 1.5rem 0",
                }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask about your shop, inventory, analytics..."
            className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none border"
            style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }}
          />
          <button onClick={sendMessage} className="px-4 py-2.5 rounded-xl font-bold text-sm"
            style={{ background: "var(--primary)", color: "#fff" }}>Send</button>
        </div>
      </div>
    </div>
  )
}

// ── Voice ──────────────────────────────────────────────────────────────────────
function VoiceModule({ lang }: { lang: Lang }) {
  const [state, setState] = useState<"idle" | "listening" | "processing" | "done">("idle")
  const [transcript, setTranscript] = useState("")

  function startListening() {
    setState("listening")
    setTimeout(() => {
      setState("processing")
      setTranscript(lang === "hi" ? "कितना स्टॉक बचा है कोलगेट का?" : lang === "bn" ? "কোলগেটের কত স্টক বাকি আছে?" : "How much Colgate stock is remaining?")
      setTimeout(() => setState("done"), 1500)
    }, 2500)
  }

  const responses: Record<Lang, string> = {
    en: "Colgate Toothpaste has 3 units remaining. This is below your minimum stock level of 15. I recommend ordering 24 units from HUL distributor.",
    hi: "कोलगेट टूथपेस्ट में 3 यूनिट बची हैं। यह आपके न्यूनतम स्टॉक 15 से कम है। HUL डिस्ट्रीब्यूटर से 24 यूनिट ऑर्डर करने की सलाह है।",
    bn: "কোলগেট টুথপেস্টে ৩টি ইউনিট বাকি আছে। এটি আপনার ন্যূনতম স্টক ১৫-এর নিচে। HUL ডিস্ট্রিবিউটর থেকে ২৪টি ইউনিট অর্ডার করার পরামর্শ।",
    te: "కోల్‌గేట్ టూత్‌పేస్ట్‌లో 3 యూనిట్లు మాత్రమే మిగిలాయి. ఇది మీ కనీస స్టాక్ 15 కంటే తక్కువ. HUL డిస్ట్రిబ్యూటర్ నుండి 24 యూనిట్లు ఆర్డర్ చేయండి.",
    ta: "கோல்கேட் பற்பசையில் 3 யூனிட்கள் மட்டுமே உள்ளன. இது உங்கள் குறைந்தபட்ச இருப்பு 15 ஐ விட குறைவு. HUL விநியோகஸ்தரிடம் 24 யூனிட்கள் ஆர்டர் செய்யுங்கள்.",
    mr: "कोलगेट टूथपेस्टमध्ये 3 युनिट शिल्लक आहेत. हे तुमच्या किमान स्टॉक 15 पेक्षा कमी आहे. HUL डिस्ट्रीब्यूटरकडून 24 युनिट ऑर्डर करण्याची शिफारस आहे.",
    gu: "કોલગેટ ટૂથપેસ્ટમાં 3 યુનિટ બાકી છે. આ તમારા ન્યૂનતમ સ્ટૉક 15 કરતાં ઓછું છે. HUL ડિસ્ટ્રિબ્યૂટર પાસેથી 24 યુનિટ ઑર્ડર કરો.",
    kn: "ಕೋಲ್ಗೇಟ್ ಟೂತ್‌ಪೇಸ್ಟ್‌ನಲ್ಲಿ 3 ಯೂನಿಟ್‌ಗಳು ಮಾತ್ರ ಉಳಿದಿವೆ. ಇದು ನಿಮ್ಮ ಕನಿಷ್ಠ ಸ್ಟಾಕ್ 15 ಕ್ಕಿಂತ ಕಡಿಮೆ. HUL ವಿತರಕರಿಂದ 24 ಯೂನಿಟ್‌ಗಳನ್ನು ಆರ್ಡರ್ ಮಾಡಿ.",
  }

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto space-y-6">
      <h2 className="font-display font-black text-2xl" style={{ color: "var(--foreground)" }}>🎙️ {TR[lang].voice}</h2>

      <div className="rounded-3xl border text-center p-10 flex flex-col items-center gap-6"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        {/* Mic button */}
        <button
          onClick={state === "idle" || state === "done" ? startListening : undefined}
          className="relative w-28 h-28 rounded-full flex items-center justify-center text-4xl transition-all"
          style={{
            background: state === "listening" ? "var(--destructive)" : "var(--primary)",
            boxShadow: state === "listening" ? "0 0 0 16px rgba(239,68,68,0.2), 0 0 0 32px rgba(239,68,68,0.1)" : "0 8px 32px rgba(245,158,11,0.4)",
          }}
        >
          🎙️
          {state === "listening" && (
            <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping" />
          )}
        </button>

        <div>
          <p className="font-display font-bold text-lg" style={{ color: "var(--foreground)" }}>
            {state === "idle" ? "Tap to speak" : state === "listening" ? "Listening..." : state === "processing" ? "Processing..." : "Response ready"}
          </p>
          {transcript && (
            <div className="mt-3 px-4 py-3 rounded-xl text-left" style={{ background: "var(--muted)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--muted-foreground)" }}>You said:</p>
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>"{transcript}"</p>
            </div>
          )}
          {state === "done" && (
            <div className="mt-3 px-4 py-3 rounded-xl text-left" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--primary)" }}>🤖 AI Response:</p>
              <p className="text-sm" style={{ color: "var(--foreground)" }}>{responses[lang]}</p>
            </div>
          )}
        </div>

        <div className="w-full space-y-2 text-left">
          <p className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>Try saying:</p>
          {[
            lang === "hi" ? "\"आज कितनी बिक्री हुई?\"" : lang === "bn" ? "\"আজ কত বিক্রি হয়েছে?\"" : "\"How much did I sell today?\"",
            lang === "hi" ? "\"रमेश का उधार कितना है?\"" : lang === "bn" ? "\"রমেশের ধার কত?\"" : "\"What is Ramesh's credit balance?\"",
            lang === "hi" ? "\"कोलगेट का ऑर्डर दो\"" : lang === "bn" ? "\"কোলগেট অর্ডার করো\"" : "\"Order more Colgate\"",
          ].map((t, i) => (
            <div key={i} className="px-3 py-2 rounded-lg text-xs font-mono" style={{ background: "var(--muted)", color: "var(--foreground)" }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Settings ───────────────────────────────────────────────────────────────────
function SettingsModule({ lang, setLang, theme, setTheme }: { lang: Lang; setLang: (l: Lang) => void; theme: Theme; setTheme: (t: Theme) => void }) {
  const themes: { value: Theme; label: string; desc: string }[] = [
    { value: "light", label: "Light", desc: "Clean warm cream background" },
    { value: "dark", label: "Dark", desc: "Easy on eyes at night" },
    { value: "saffron", label: "Saffron 🧡", desc: "Vibrant Indian saffron palette" },
  ]
  const langs: { value: Lang; label: string; native: string; flag: string }[] = [
    { value: "en", label: "English",   native: "English",   flag: "🇬🇧" },
    { value: "hi", label: "Hindi",     native: "हिंदी",     flag: "🇮🇳" },
    { value: "bn", label: "Bengali",   native: "বাংলা",     flag: "🇧🇩" },
    { value: "te", label: "Telugu",    native: "తెలుగు",    flag: "🇮🇳" },
    { value: "ta", label: "Tamil",     native: "தமிழ்",     flag: "🇮🇳" },
    { value: "mr", label: "Marathi",   native: "मराठी",     flag: "🇮🇳" },
    { value: "gu", label: "Gujarati",  native: "ગુજરાતી",   flag: "🇮🇳" },
    { value: "kn", label: "Kannada",   native: "ಕನ್ನಡ",     flag: "🇮🇳" },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-2xl">
      <h2 className="font-display font-black text-2xl" style={{ color: "var(--foreground)" }}>⚙️ {TR[lang].settings}</h2>

      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-display font-bold" style={{ color: "var(--foreground)" }}>{TR[lang].selectTheme}</h3>
        </div>
        <div className="p-4 flex flex-col gap-3">
          {themes.map(t => (
            <button key={t.value} onClick={() => setTheme(t.value)}
              className="flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left"
              style={{
                borderColor: theme === t.value ? "var(--primary)" : "var(--border)",
                background: theme === t.value ? "rgba(245,158,11,0.06)" : "transparent",
              }}>
              <div className="w-8 h-8 rounded-full border-2" style={{
                background: t.value === "light" ? "#FFFBF3" : t.value === "dark" ? "#0F172A" : "#FFF7ED",
                borderColor: t.value === "light" ? "#F59E0B" : t.value === "dark" ? "#FBBF24" : "#EA580C",
              }} />
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{t.label}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{t.desc}</p>
              </div>
              {theme === t.value && <span style={{ color: "var(--primary)" }}>✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-display font-bold" style={{ color: "var(--foreground)" }}>🌐 {TR[lang].chooseLanguage}</h3>
        </div>
        <div className="p-4 flex flex-col gap-3">
          {langs.map(l => (
            <button key={l.value} onClick={() => setLang(l.value)}
              className="flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left"
              style={{
                borderColor: lang === l.value ? "var(--primary)" : "var(--border)",
                background: lang === l.value ? "rgba(245,158,11,0.06)" : "transparent",
              }}>
              <span className="text-2xl">{l.flag}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{l.native}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{l.label}</p>
              </div>
              {lang === l.value && <span style={{ color: "var(--primary)" }}>✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Contact ────────────────────────────────────────────────────────────────────
function ContactModule({ lang }: { lang: Lang }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      <h2 className="font-display font-black text-2xl" style={{ color: "var(--foreground)" }}>📞 {TR[lang].contact}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact info */}
        <div className="space-y-4">
          <div className="rounded-2xl p-6" style={{ background: "var(--secondary)" }}>
            <h3 className="font-display font-bold text-xl text-white mb-4">StoreSyncOS Support</h3>
            <div className="space-y-3">
              {[
                { icon: "📞", label: "Phone", value: "1800-STORESYNC (Free)" },
                { icon: "📧", label: "Email", value: "help@storesyncos.in" },
                { icon: "💬", label: "WhatsApp", value: "+91 98765 00000" },
                { icon: "🕐", label: "Hours", value: "Mon–Sat, 8 AM – 9 PM" },
              ].map(x => (
                <div key={x.label} className="flex items-center gap-3">
                  <span className="text-xl">{x.icon}</span>
                  <div>
                    <p className="text-xs opacity-60 text-white">{x.label}</p>
                    <p className="text-sm font-semibold text-white">{x.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <h3 className="font-display font-bold mb-3" style={{ color: "var(--foreground)" }}>Quick Help</h3>
            <div className="space-y-2">
              {["How to add products?", "Set up printer?", "Export sales report", "Backup & sync data"].map(q => (
                <button key={q} className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between"
                  style={{ background: "var(--muted)", color: "var(--foreground)" }}>
                  {q} <span style={{ color: "var(--primary)" }}>→</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border p-6 space-y-4"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="font-display font-bold" style={{ color: "var(--foreground)" }}>{TR[lang].sendMessage}</h3>

          {[
            { key: "name" as const, label: TR[lang].yourName, type: "text" },
            { key: "email" as const, label: TR[lang].email, type: "email" },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>{f.label}</label>
              <input
                type={f.type}
                value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
                style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--foreground)" }}>{TR[lang].message}</label>
            <textarea
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none border resize-none"
              style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }}
            />
          </div>

          {sent && (
            <div className="px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: "rgba(16,185,129,0.1)", color: "var(--accent)" }}>
              ✅ Message sent! We'll respond within 24 hours.
            </div>
          )}

          <button type="submit" className="w-full py-3 rounded-xl font-bold transition-all hover:opacity-90"
            style={{ background: "var(--primary)", color: "#fff" }}>
            {TR[lang].send} →
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Module order for prev/next navigation ─────────────────────────────────────

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome")
  const [lang, setLang] = useState<Lang>("en")
  const [theme, setTheme] = useState<Theme>("light")
  const [activeModule, setActiveModule] = useState<Module>("dashboard")
  const [shopInfo, setShopInfo] = useState({ shopName: "My Shop", ownerName: "Shopkeeper" })
  const [online, setOnline] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [showThemePage, setShowThemePage] = useState(false)
  const [pendingKhata, setPendingKhata] = useState<{ customer: string; items: { name: string; qty: number; price: number }[]; total: number } | null>(null)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)

  useEffect(() => {
    const body = document.documentElement
    body.classList.remove("dark", "theme-saffron")
    if (theme === "dark") body.classList.add("dark")
    if (theme === "saffron") body.classList.add("theme-saffron")
  }, [theme])

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncing(true)
      setTimeout(() => setSyncing(false), 1500)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  function handleLogin(info: { shopName: string; ownerName: string }) {
    setShopInfo(info)
    setScreen("app")
  }

  if (screen === "welcome") {
    return <WelcomeScreen onEnter={() => setScreen("language")} lang={lang} />
  }
  if (screen === "language") {
    return (
      <LanguageScreen
        currentLang={lang}
        onSelect={l => { setLang(l); setScreen("login") }}
        onBack={() => setScreen("welcome")}
      />
    )
  }
  if (screen === "login") {
    return <LoginScreen lang={lang} onLogin={handleLogin} onBack={() => setScreen("language")} />
  }

  const moduleMap: Record<Module, React.ReactNode> = {
    dashboard: <Dashboard lang={lang} shopInfo={shopInfo} />,
    catalogue: <CatalogueModule lang={lang} products={products} setProducts={setProducts} />,
    billing: <BillingModule lang={lang} setModule={setActiveModule} setPendingKhata={setPendingKhata} products={products} />,
    pos: <BillingModule lang={lang} setModule={setActiveModule} setPendingKhata={setPendingKhata} products={products} />,
    khata: <KhataModule lang={lang} pendingKhata={pendingKhata} clearPendingKhata={() => setPendingKhata(null)} />,
    ocr: <OCRModule lang={lang} />,
    supplier: <SupplierModule lang={lang} />,
    analytics: <AnalyticsModule lang={lang} />,
    copilot: <AICopilotModule lang={lang} />,
    voice: <VoiceModule lang={lang} />,
    settings: <SettingsModule lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />,
    contact: <ContactModule lang={lang} />,
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      <TopBar
        lang={lang} setLang={setLang}
        theme={theme}
        activeModule={activeModule} setModule={setActiveModule}
        shopName={shopInfo.shopName}
        online={online} syncing={syncing}
        onOpenTheme={() => setShowThemePage(true)}
      />

      <main className="flex-1 max-w-6xl mx-auto w-full">
        {moduleMap[activeModule]}
      </main>

      <Footer lang={lang} setModule={setActiveModule} />

      {showThemePage && (
        <ThemePage
          theme={theme}
          setTheme={setTheme}
          onClose={() => setShowThemePage(false)}
          lang={lang}
        />
      )}
    </div>
  )
}
