const MENU_ITEMS = [
  {
    "category": "Traditional Sweets",
    "en": "Bellam Sunnundalu",
    "te": "బెల్లం సున్నుండలు",
    "unit": "1 Kg",
    "price": 640
  },
  {
    "category": "Traditional Sweets",
    "en": "Ravva Laddu",
    "te": "రవ్వ లడ్డు",
    "unit": "1 Kg",
    "price": 480
  },
  {
    "category": "Traditional Sweets",
    "en": "Nuvvula Undalu",
    "te": "నువ్వులుండలు",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Traditional Sweets",
    "en": "Kobbari Laddu",
    "te": "కొబ్బరి లడ్డు",
    "unit": "1 Kg",
    "price": 500
  },
  {
    "category": "Traditional Sweets",
    "en": "Dry Fruits Pootharekulu",
    "te": "డ్రై ఫ్రూట్స్ పూతరేకులు",
    "unit": "5 Pcs",
    "price": 120
  },
  {
    "category": "Traditional Sweets",
    "en": "Kobbari Kajjikayalu",
    "te": "కొబ్బరి కజ్జికాయలు",
    "unit": "1 Kg",
    "price": 440
  },
  {
    "category": "Traditional Sweets",
    "en": "Paakam Kajjikayalu",
    "te": "పాకం కజ్జికాయలు",
    "unit": "1 Kg",
    "price": 440
  },
  {
    "category": "Traditional Sweets",
    "en": "Palli Chekki",
    "te": "పల్లీ చెక్కి",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Traditional Sweets",
    "en": "Nuvvula Chekki",
    "te": "నువ్వుల చెక్కి",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Traditional Sweets",
    "en": "Seeds Nuts Chekki",
    "te": "నువ్వు – శనగ చెక్కి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Traditional Sweets",
    "en": "Bellam Gavvalu",
    "te": "బెల్లం గవ్వలు",
    "unit": "1 Kg",
    "price": 360
  },
  {
    "category": "Traditional Sweets",
    "en": "Bellam Kommulu",
    "te": "బెల్లం కొమ్ములు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Traditional Sweets",
    "en": "Gorimetailu",
    "te": "గోరిమెట్లలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Traditional Sweets",
    "en": "Ariselu",
    "te": "అరిసెలు",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Traditional Sweets",
    "en": "Pakundalu",
    "te": "పాకుండలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Traditional Sweets",
    "en": "Chalimidi",
    "te": "చలిమిడి",
    "unit": "1 Kg",
    "price": 360
  },
  {
    "category": "Traditional Sweets",
    "en": "Ghulabi Puvvulu",
    "te": "గులాబీ పువ్వులు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Traditional Sweets",
    "en": "Dry Fruits Halwa",
    "te": "డ్రై ఫ్రూట్స్ పాకం",
    "unit": "1 Kg",
    "price": 1000
  },
  {
    "category": "Traditional Sweets",
    "en": "Goduma Halwa",
    "te": "గోధుమ హల్వా",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Traditional Sweets",
    "en": "Carrot Halwa",
    "te": "క్యారెట్ హల్వా",
    "unit": "1 Kg",
    "price": 800
  },
  {
    "category": "Traditional Sweets",
    "en": "Badam Milk",
    "te": "బాదం పాలు",
    "unit": "",
    "price": 50
  },
  {
    "category": "Traditional Sweets",
    "en": "Ghee Bobbatlu",
    "te": "నెయ్యి బొబ్బట్లు",
    "unit": "5 Pcs",
    "price": null
  },
  {
    "category": "Traditional Sweets",
    "en": "Bellam Junnu",
    "te": "బెల్లం జున్ను",
    "unit": "1 Kg",
    "price": 500
  },
  {
    "category": "Traditional Sweets",
    "en": "Ghee Laddu",
    "te": "నెయ్యి లడ్డు",
    "unit": "1 Kg",
    "price": 800
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Thokudu Laddu",
    "te": "తొక్కుడు లడ్డు",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Boondi Laddu",
    "te": "బూందీ లడ్డు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Motichoor Laddu",
    "te": "మోతిచూర్ లడ్డు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Badusha",
    "te": "బాదుషా",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Mysore Pak",
    "te": "మైసూర్ పాక్",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Jangiri",
    "te": "జాంగిరి",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Nuvvula Palli Laddu",
    "te": "నువ్వుల పల్లి లడ్డు",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Chimili Laddu",
    "te": "చిమిలి లడ్డు",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Ravva Gajji Kayalu",
    "te": "రవ్వ గజ్జి కాయలు",
    "unit": "5 Pcs",
    "price": 500
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Thati Garelu",
    "te": "తాటి గారెలు",
    "unit": "1 Piece",
    "price": 15
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Kaju Chekki",
    "te": "కాజు చెక్కి",
    "unit": "1 Kg",
    "price": 1200
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Boondi Chekki",
    "te": "బూందీ చెక్కి",
    "unit": "1 Kg",
    "price": 300
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Thati Bellam Chimili",
    "te": "తాటి బెల్లం చిమిలి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Black Sesame Laddu",
    "te": "నల్ల నువ్వుల లడ్డు",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Avisa Laddu",
    "te": "అవిస లడ్డు",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Laddu & Special Sweets",
    "en": "Dry Fruit Laddu",
    "te": "డ్రై ఫ్రూట్ లడ్డు",
    "unit": "1 Kg",
    "price": 1200
  },
  {
    "category": "Pickles",
    "en": "Avakaya",
    "te": "ఆవకాయ",
    "unit": "1 Kg",
    "price": 520
  },
  {
    "category": "Pickles",
    "en": "Magaya",
    "te": "మాగాయ",
    "unit": "1 Kg",
    "price": 520
  },
  {
    "category": "Pickles",
    "en": "Lemon Pickle",
    "te": "నిమ్మకాయ పచ్చడి",
    "unit": "1 Kg",
    "price": 520
  },
  {
    "category": "Pickles",
    "en": "Vusiri Kaya",
    "te": "ఉసిరికాయ",
    "unit": "1 Kg",
    "price": 520
  },
  {
    "category": "Pickles",
    "en": "Vusiri Thoku",
    "te": "ఉసిరి తొక్కు",
    "unit": "1 Kg",
    "price": 520
  },
  {
    "category": "Pickles",
    "en": "Tomato Pickle",
    "te": "టమాటా పచ్చడి",
    "unit": "1 Kg",
    "price": 500
  },
  {
    "category": "Pickles",
    "en": "Pandu Mirchi",
    "te": "పండు మిరపకాయ",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Pickles",
    "en": "Coriander Pickle",
    "te": "కొత్తిమీర పచ్చడి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Pickles",
    "en": "Gongura Pickle",
    "te": "గోంగూర పచ్చడి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Pickles",
    "en": "Ginger Pickle",
    "te": "అల్లం పచ్చడి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Pickles",
    "en": "Bellam Avakaya",
    "te": "బెల్లం ఆవకాయ",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Pickles",
    "en": "Debbakaya Pickle",
    "te": "దెబ్బకాయ పచ్చడి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Kandi Podi",
    "te": "కంది పొడి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Dhaniyala Podi",
    "te": "ధనియాల పొడి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Avasi",
    "te": "అవిసె పొడి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Pasara",
    "te": "పసర పొడి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Sesame Karam Podi",
    "te": "నువ్వుల కారం పొడి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Sesame Verusanga Karam",
    "te": "నువ్వుల వేరుశనగ కారం పొడి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Sondi Podi",
    "te": "సోంటి పొడి",
    "unit": "1 Kg",
    "price": 800
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Pala Sondi",
    "te": "పాల సోంటి పొడి",
    "unit": "1 Kg",
    "price": 800
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Curry Leaf",
    "te": "కరివేపాకు పొడి",
    "unit": "1 Kg",
    "price": 800
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Munagaku Karam",
    "te": "మునగాకు కారం పొడి",
    "unit": "1 Kg",
    "price": 800
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Nalla Karam",
    "te": "నల్ల కారం పొడి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Velluli Karam",
    "te": "వెల్లుల్లి కారం పొడి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Kakarikai Karam",
    "te": "కాకరకాయ కారం పొడి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Gongura",
    "te": "గోంగూర పొడి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Pudina",
    "te": "పుదీనా పొడి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Kutimera",
    "te": "కొత్తిమీర పొడి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Mirchi Karam",
    "te": "మిర్చి కారం పొడి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Dry Fruit Karam",
    "te": "డ్రై ఫ్రూట్ కారం పొడి",
    "unit": "1 Kg",
    "price": 1000
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Jira Powder",
    "te": "జీలకర్ర పొడి",
    "unit": "1 Kg",
    "price": 500
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Chicken Masala",
    "te": "చికెన్ మసాలా పొడి",
    "unit": "1 Kg",
    "price": 1000
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Mutton Masala",
    "te": "మటన్ మసాలా పొడి",
    "unit": "1 Kg",
    "price": 1000
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Rasam Podi",
    "te": "రసం పొడి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Sambar Podi",
    "te": "సాంబార్ పొడి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Karam Podi & Masalas",
    "en": "Instant Chutney Powder",
    "te": "ఇన్‌స్టంట్ చట్నీ పొడి",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Milk Sweets",
    "en": "Milk Sweet",
    "te": "మిల్క్ స్వీట్",
    "unit": "1 Piece",
    "price": 25
  },
  {
    "category": "Milk Sweets",
    "en": "Kaju Burfi",
    "te": "కాజు బర్ఫీ",
    "unit": "1 Kg",
    "price": 1000
  },
  {
    "category": "Milk Sweets",
    "en": "Kaju Sompapidi",
    "te": "కాజు సోంపాపిడి",
    "unit": "1 Kg",
    "price": 1200
  },
  {
    "category": "Milk Sweets",
    "en": "Ghee Mysore Pak",
    "te": "నెయ్యి మైసూర్ పాక్",
    "unit": "1 Kg",
    "price": 800
  },
  {
    "category": "Milk Sweets",
    "en": "Milk Mysore Pak",
    "te": "మిల్క్ మైసూర్ పాక్",
    "unit": "1 Kg",
    "price": 600
  },
  {
    "category": "Milk Sweets",
    "en": "Gulab Jamun",
    "te": "గులాబ్ జామ్",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Milk Sweets",
    "en": "Meethu Chaman Laddu",
    "te": "మీతూ చమన్ లడ్డు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Milk Sweets",
    "en": "Pala Kova",
    "te": "పాల కోవా",
    "unit": "1 Kg",
    "price": 840
  },
  {
    "category": "Milk Sweets",
    "en": "Kalakand",
    "te": "కలాకంద్",
    "unit": "1 Kg",
    "price": 1000
  },
  {
    "category": "Milk Sweets",
    "en": "Rasugula",
    "te": "రసగుల్లా",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Milk Sweets",
    "en": "Badam Milk",
    "te": "బాదం మిల్క్",
    "unit": "",
    "price": 55
  },
  {
    "category": "Milk Sweets",
    "en": "Kova Cashew Kajjikayalu",
    "te": "కోవా జీడి కజ్జికాయలు",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Milk Sweets",
    "en": "Paneer Jilabi",
    "te": "పనీర్ జిలేబి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Milk Sweets",
    "en": "Dry Fruit Burfi",
    "te": "డ్రై ఫ్రూట్ బర్ఫీ",
    "unit": "1 Kg",
    "price": 800
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Jantikalu",
    "te": "జంతికలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Ragi Chekkalu",
    "te": "రాగి చెక్కలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Jonna Chekkalu",
    "te": "జొన్న చెక్కలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Varipindi Chekkalu",
    "te": "వరిపిండి చెక్కలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Saggubiyyam Chekkalu",
    "te": "సగ్గుబియ్యం చెక్కలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Masala Chekkalu",
    "te": "మసాలా చెక్కలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Chitti Appadalu",
    "te": "చిట్టి అప్పడాలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Chitti Chegodi",
    "te": "చిట్టి చేగోడీలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Pappu Chegodi",
    "te": "పప్పు చేగోడీలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Karapu Chegodi",
    "te": "కారపు చేగోడీలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Pudina Murukulu",
    "te": "పుదీనా మురుకులు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Betroot Murukulu",
    "te": "బీట్‌రూట్ మురుకులు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Murukulu Jantikalu",
    "te": "మురుకుల జంతికలు",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Karam Boondi",
    "te": "కారం బూంది",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Sanna Karamposa",
    "te": "సన్న కారప్పూస",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Pedha Karamposa",
    "te": "పెద్ద కారప్పూస",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Dry Fruits Mix",
    "te": "డ్రై ఫ్రూట్స్ మిక్స్",
    "unit": "1 Kg",
    "price": 1200
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Kaju Karam",
    "te": "కాజు కారం",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Kaju Pakodi",
    "te": "కాజు పకోడి",
    "unit": "1 Kg",
    "price": 1200
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Palli Pakodi",
    "te": "పల్లి పకోడి",
    "unit": "1 Kg",
    "price": 400
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Kakarikai Pakodi",
    "te": "కాకరకాయ పకోడి",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Corn Flakes",
    "te": "కార్న్ ఫ్లేక్స్",
    "unit": "1 Kg",
    "price": 280
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Atukulu Mixture",
    "te": "అటుకుల మిక్స్",
    "unit": "1 Kg",
    "price": 280
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Dal Mixture",
    "te": "పప్పు మిక్స్",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Aku Pakodi",
    "te": "ఆకు పకోడి",
    "unit": "1 Kg",
    "price": 320
  },
  {
    "category": "Hot Items & Snacks",
    "en": "Karam Gavvalu",
    "te": "కారం గవ్వలు",
    "unit": "1 Kg",
    "price": 320
  }
];
