var cssFile = null;
var cssText = null;
var uploadEnabled = false;
var woffFile = null;
var woffData = null;
var urlUpload = "";
var fontName = "";
var oldName = "";
var lowerFonts = null;
var clientFonts = {};
var fonts=[];
var styles=[];
function loadStorage() {
    if (sessionStorage.getItem("clientFonts") != null)
       clientFonts = JSON.parse(sessionStorage.getItem("clientFonts"));

    if (sessionStorage.getItem("styles") != null) {
        styles = JSON.parse(sessionStorage.getItem("styles"));
        for(var z=0; z<styles.length; z++){
            var newStyle = document.createElement('style');
            newStyle.appendChild(document.createTextNode(styles[z]));
            document.head.appendChild(newStyle);

        }

    }

    if (sessionStorage.getItem("fonts") != null)
        fonts = JSON.parse(sessionStorage.getItem("fonts"));
    else
        fonts = ["ABeeZee", "Abel", "Abhaya Libre", "Abril Fatface", "Aclonica", "Acme", "Actor", "Adamina", "Advent Pro", "Agency FB", "Aguafina Script", "Akronim", "Aladin", "Aldrich", "Alef", "Alegreya", "Alegreya SC", "Alegreya Sans", "Alegreya Sans SC", "Alex Brush", "Alfa Slab One", "Algerian", "Alice", "Alike", "Alike Angular", "Allan", "Allerta", "Allerta Stencil", "Allura", "Almendra", "Almendra Display", "Almendra SC", "Amarante", "Amaranth", "Amatic SC", "Amatica SC", "American Typewriter", "Amethysta", "Amiko", "Amiri", "Amita", "Anaheim", "Andada", "Andale Mono", "Andika", "Angkor", "Annie Use Your Telescope", "Anonymous Pro", "Antic", "Antic Didone", "Antic Slab", "Anton", "Apple Casual", "Apple Chancery", "Arapey", "Arbutus", "Arbutus Slab", "Architects Daughter", "Archivo", "Archivo Black", "Archivo Narrow", "Aref Ruqaa", "Arial", "Arima Madurai", "Arimo", "Arizonia", "Armata", "Arsenal", "Artifika", "Arvo", "Arya", "Asap", "Asap Condensed", "Asar", "Asset", "Assistant", "Astloch", "Asul", "Athelas", "Athiti", "Atma", "Atomic Age", "Aubrey", "Audiowide", "Autour One", "Avenir", "Average", "Average Sans", "Averia Gruesa Libre", "Averia Libre", "Averia Sans Libre", "Averia Serif Libre", "Bad Script", "Bahiana", "Baloo", "Baloo Bhai", "Baloo Bhaijaan", "Baloo Bhaina", "Baloo Chettan", "Baloo Da", "Baloo Paaji", "Baloo Tamma", "Baloo Tammudu", "Baloo Thambi", "Balthazar", "Bangers", "Barrio", "Basic", "Baskerville", "Battambang", "Bauhaus 93", "Baumans", "Bayon", "Belgrano", "Bell MT", "Bellefair", "Belleza", "BenchNine", "Bentham", "Berkshire Swash", "Berlin Sans FB", "Bernard MT Condensed", "Bevan", "Big Caslon", "Bigelow Rules", "Bigshot One", "Bilbo", "Bilbo Swash Caps", "BioRhyme", "BioRhyme Expanded", "Biryani", "Bitter", "Black Ops One", "Blackadder", "Bodoni MT", "Bokor", "Bonbon", "Boogaloo", "Book Antiqua", "Bookman Old Style", "Bowlby One", "Bowlby One SC", "Brawler", "Bree Serif", "Broadway", "Brush Script MT", "Bubblegum Sans", "Bubbler One", "Buda", "Buenard", "Bungee", "Bungee Hairline", "Bungee Inline", "Bungee Outline", "Bungee Shade", "Butcherman", "Butterfly Kids", "Cabin", "Cabin Condensed", "Cabin Sketch", "Caesar Dressing", "Cagliostro", "Cairo", "Calibri", "Californian FB", "Calisto MT", "Calligraffitti", "Cambay", "Cambo", "Cambria", "Candal", "Candara", "Cantarell", "Cantata One", "Cantora One", "Capriola", "Cardo", "Carme", "Carrois Gothic", "Carrois Gothic SC", "Carter One", "Castellar", "Catamaran", "Caudex", "Caveat", "Caveat Brush", "Cedarville Cursive", "Centaur", "Century", "Century Gothic", "Century Schoolbook", "Ceviche One", "Chalkboard", "Chalkduster", "Changa", "Changa One", "Chango", "Charter", "Chathura", "Chau Philomene One", "Chela One", "Chelsea Market", "Chenla", "Cherry Cream Soda", "Cherry Swash", "Chewy", "Chicle", "Chiller", "Chivo", "Chonburi", "Cinzel", "Cinzel Decorative", "Clicker Script", "Cochin", "Coda", "Coda Caption", "Codystar", "Coiny", "Colonna MT", "Combo", "Comfortaa", "Comic Sans MS", "Coming Soon", "Concert One", "Condiment", "Consolas", "Constantia", "Content", "Contrail One", "Convergence", "Cookie", "Cooper Black", "Copperplate", "Copse", "Corbel", "Corben", "Cormorant", "Cormorant Garamond", "Cormorant Infant", "Cormorant SC", "Cormorant Unicase", "Cormorant Upright", "Courgette", "Courier", "Courier New", "Cousine", "Coustard", "Covered By Your Grace", "Crafty Girls", "Creepster", "Crete Round", "Crimson Text", "Croissant One", "Crushed", "Cuprum", "Curlz MT", "Cutive", "Cutive Mono", "Damion", "Dancing Script", "Dangrek", "David Libre", "Dawning of a New Day", "Days One", "Dekko", "Delius", "Delius Swash Caps", "Delius Unicase", "Della Respira", "Denk One", "Devonshire", "Dhurjati", "Didact Gothic", "Didot", "Diplomata", "Diplomata SC", "Domine", "Donegal One", "Doppio One", "Dorsa", "Dosis", "Dr Sugiyama", "Droid Sans", "Droid Sans Mono", "Droid Serif", "Duru Sans", "Dynalight", "EB Garamond", "Eagle Lake", "Eater", "Economica", "Eczar", "Edwardian Script ITC", "El Messiri", "Electrolize", "Elephant", "Elsie", "Elsie Swash Caps", "Emblema One", "Emilys Candy", "Encode Sans", "Encode Sans Condensed", "Encode Sans Expanded", "Encode Sans Semi Condensed", "Encode Sans Semi Expanded", "Engagement", "Englebert", "Engravers MT", "Enriqueta", "Eras ITC", "Erica One", "Esteban", "Euphoria Script", "Ewert", "Exo", "Exo 2", "Expletus Sans", "Fanwood Text", "Farsan", "Fascinate", "Fascinate Inline", "Faster One", "Fasthand", "Fauna One", "Faustina", "Federant", "Federo", "Felipa", "Felix Titling", "Fenix", "Finger Paint", "Fira Mono", "Fira Sans", "Fira Sans Condensed", "Fira Sans Extra Condensed", "Fjalla One", "Fjord One", "Flamenco", "Flavors", "Fondamento", "Fontdiner Swanky", "Footlight MT Light", "Forte", "Forum", "Francois One", "Frank Ruhl Libre", "Franklin Gothic", "Freckle Face", "Fredericka the Great", "Fredoka One", "Freehand", "Freestyle Script", "French Script MT", "Fresca", "Frijole", "Fruktur", "Fugaz One", "Futura", "GFS Didot", "GFS Neohellenic", "Gabriela", "Gabriola", "Gafata", "Galada", "Galdeano", "Galindo", "Garamond", "Geneva", "Gentium Basic", "Gentium Book Basic", "Geo", "Georgia", "Geostar", "Geostar Fill", "Germania One", "Gidugu", "Gigi", "Gilda Display", "Gill Sans", "Gill Sans MT", "Give You Glory", "Glass Antiqua", "Glegoo", "Gloria Hallelujah", "Gloucester MT Extra Cond.", "Goblin One", "Gochi Hand", "Gorditas", "Goudy Bookletter 1911", "Goudy Old Style", "Goudy Stout", "Graduate", "Grand Hotel", "Gravitas One", "Great Vibes", "Griffy", "Gruppo", "Gudea", "Gurajada", "Habibi", "Haettenschweiler", "Halant", "Hammersmith One", "Hanalei", "Hanalei Fill", "Handlee", "Hanuman", "Happy Monkey", "Harlow Solid Italic", "Harmattan", "Harrington", "Headland One", "Heebo", "Helvetica", "Helvetica Neue", "Henny Penny", "Herculanum", "Herr Von Muellerhoff", "High Tower Text", "Hind", "Hind Guntur", "Hind Madurai", "Hind Siliguri", "Hind Vadodara", "Hoefler Text", "Holtwood One SC", "Homemade Apple", "Homenaje", "IM Fell DW Pica", "IM Fell DW Pica SC", "IM Fell Double Pica", "IM Fell Double Pica SC", "IM Fell English", "IM Fell English SC", "IM Fell French Canon", "IM Fell French Canon SC", "IM Fell Great Primer", "IM Fell Great Primer SC", "ITC Bodoni 72", "ITC Bradley Hand", "ITC Britannic Bold", "Iceberg", "Iceland", "Impact", "Imprima", "Imprint MT Shadow", "Inconsolata", "Inder", "Indie Flower", "Informal Roman", "Inika", "Inknut Antiqua", "Iowan Old Style", "Irish Grover", "Istok Web", "Italiana", "Italianno", "Itim", "Jacques Francois", "Jacques Francois Shadow", "Jaldi", "Jim Nightshade", "Jockey One", "Jokerman", "Jolly Lodger", "Jomhuria", "Josefin Sans", "Josefin Slab", "Joti One", "Judson", "Juice ITC", "Julee", "Julius Sans One", "Junge", "Jura", "Just Another Hand", "Just Me Again Down Here", "Kadwa", "Kalam", "Kameron", "Kanit", "Kantumruy", "Karla", "Karma", "Katibeh", "Kaushan Script", "Kavivanar", "Kavoon", "Kdam Thmor", "Keania One", "Kelly Slab", "Kenia", "Khand", "Khmer", "Khula", "Kite One", "Knewave", "Kotta One", "Koulen", "Kranky", "Kreon", "Kristen ITC", "Kristi", "Krona One", "Kumar One", "Kumar One Outline", "Kunstler Script", "Kurale", "La Belle Aurore", "Laila", "Lakki Reddy", "Lalezar", "Lancelot", "Lateef", "Lato", "League Script", "Leckerli One", "Ledger", "Lekton", "Lemon", "Lemonada", "Libre Barcode 128", "Libre Barcode 128 Text", "Libre Barcode 39", "Libre Barcode 39 Extended", "Libre Barcode 39 Extended Text", "Libre Barcode 39 Text", "Libre Baskerville", "Libre Franklin", "Life Savers", "Lilita One", "Lily Script One", "Limelight", "Linden Hill", "Lobster", "Lobster Two", "Londrina Outline", "Londrina Shadow", "Londrina Sketch", "Londrina Solid", "Lora", "Love Ya Like A Sister", "Loved by the King", "Lovers Quarrel", "Lucida (all styles)", "Luckiest Guy", "Luminari", "Lusitana", "Lustria", "Macondo", "Macondo Swash Caps", "Mada", "Magneto", "Magra", "Maiandra GD", "Maiden Orange", "Maitree", "Mako", "Mallanna", "Mandali", "Manuale", "Marcellus", "Marcellus SC", "Marck Script", "Margarine", "Marker Felt", "Marko One", "Marmelad", "Martel", "Martel Sans", "Marvel", "Mate", "Mate SC", "Matura MT Script Capitals", "Maven Pro", "McLaren", "Meddon", "MedievalSharp", "Medula One", "Meera Inimai", "Megrim", "Meie Script", "Menlo", "Merienda", "Merienda One", "Merriweather", "Merriweather Sans", "Metal", "Metal Mania", "Metamorphous", "Metrophobic", "Michroma", "Milonga", "Miltonian", "Miltonian Tattoo", "Miniver", "Miriam Libre", "Mirza", "Miss Fajardose", "Mistral", "Mitr", "Modak", "Modern Antiqua", "Modern No. 20", "Mogra", "Molengo", "Molle", "Monaco", "Monda", "Monofett", "Monoton", "Monotype Corsiva", "Monsieur La Doulaise", "Montaga", "Montez", "Montserrat", "Montserrat Alternates", "Montserrat Subrayada", "Moul", "Moulpali", "Mountains of Christmas", "Mouse Memoirs", "Mr Bedfort", "Mr Dafoe", "Mr De Haviland", "Mrs Saint Delafield", "Mrs Sheppards", "Mukta", "Mukta Mahee", "Mukta Malar", "Mukta Vaani", "Muli", "Mystery Quest", "NTR", "Neucha", "Neuton", "New Rocker", "News Cycle", "Niagara Solid & Engraved", "Niconne", "Nixie One", "Nobile", "Nokora", "Norican", "Nosifer", "Noteworthy", "Nothing You Could Do", "Noticia Text", "Noto Sans", "Noto Serif", "Nova Cut", "Nova Flat", "Nova Mono", "Nova Oval", "Nova Round", "Nova Script", "Nova Slim", "Nova Square", "Numans", "Nunito", "Nunito Sans", "OCR A Extended", "Odor Mean Chey", "Offside", "Old English Text MT", "Old Standard TT", "Oldenburg", "Oleo Script", "Oleo Script Swash Caps", "Onyx", "Open Sans", "Open Sans Condensed", "Optima", "Oranienbaum", "Orbitron", "Oregano", "Orienta", "Original Surfer", "Oswald", "Over the Rainbow", "Overlock", "Overlock SC", "Overpass", "Overpass Mono", "Ovo", "Oxygen", "Oxygen Mono", "PT Mono", "PT Sans", "PT Sans Caption", "PT Sans Narrow", "PT Serif", "PT Serif Caption", "Pacifico", "Padauk", "Palace Script MT", "Palanquin", "Palanquin Dark", "Palatino", "Pangolin", "Paprika", "Papyrus", "Parchment", "Parisienne", "Passero One", "Passion One", "Pathway Gothic One", "Patrick Hand", "Patrick Hand SC", "Pattaya", "Patua One", "Pavanam", "Paytone One", "Peddana", "Peralta", "Permanent Marker", "Perpetua", "Petit Formal Script", "Petrona", "Philosopher", "Phosphate", "Piedra", "Pinyon Script", "Pirata One", "Plantagenet Cherokee", "Plaster", "Play", "Playball", "Playbill", "Playfair Display", "Playfair Display SC", "Podkova", "Poiret One", "Poller One", "Poly", "Pompiere", "Pontano Sans", "Poor Richard", "Poppins", "Port Lligat Sans", "Port Lligat Slab", "Pragati Narrow", "Prata", "Preahvihear", "Press Start 2P", "Pridi", "Princess Sofia", "Pristina", "Prociono", "Prompt", "Prosto One", "Proza Libre", "Puritan", "Purple Purse", "Quando", "Quantico", "Quattrocento", "Quattrocento Sans", "Questrial", "Quicksand", "Quintessential", "Qwigley", "Racing Sans One", "Radley", "Rage Italic", "Rajdhani", "Rakkas", "Raleway", "Raleway Dots", "Ramabhadra", "Ramaraja", "Rambla", "Rammetto One", "Ranchers", "Rancho", "Ranga", "Rasa", "Rationale", "Ravi Prakash", "Ravie", "Redressed", "Reem Kufi", "Reenie Beanie", "Revalia", "Rhodium Libre", "Ribeye", "Ribeye Marrow", "Righteous", "Risque", "Roboto", "Roboto Condensed", "Roboto Mono", "Roboto Slab", "Rochester", "Rock Salt", "Rockwell", "Rokkitt", "Romanesco", "Ropa Sans", "Rosario", "Rosarivo", "Rouge Script", "Rozha One", "Rubik", "Rubik Mono One", "Ruda", "Rufina", "Ruge Boogie", "Ruluko", "Rum Raisin", "Ruslan Display", "Russo One", "Ruthie", "Rye", "Sacramento", "Sahitya", "Sail", "Saira", "Saira Condensed", "Saira Extra Condensed", "Saira Semi Condensed", "Salsa", "Sanchez", "Sancreek", "Sansita", "Sarala", "Sarina", "Sarpanch", "Satisfy", "Savoye", "Scada", "Scheherazade", "Schoolbell", "Scope One", "Script MT Bold", "Seaweed Script", "Secular One", "Sedgwick Ave", "Sedgwick Ave Display", "Segoe Print", "Segoe Script", "Segoe UI", "Seravek", "Sevillana", "Seymour One", "Shadows Into Light", "Shadows Into Light Two", "Shanti", "Share", "Share Tech", "Share Tech Mono", "Shojumaru", "Short Stack", "Showcard Gothic", "Shrikhand", "Siemreap", "Sigmar One", "SignPainter", "Signika", "Signika Negative", "Simonetta", "Sintony", "Sirin Stencil", "Sitka", "Six Caps", "Skia", "Skranji", "Slabo 13px", "Slabo 27px", "Slackey", "Smokum", "Smythe", "Snap ITC", "Snell Round", "Sniglet", "Snippet", "Snowburst One", "Sofadi One", "Sofia", "Sonsie One", "Sorts Mill Goudy", "Source Code Pro", "Source Sans Pro", "Source Serif Pro", "Space Mono", "Special Elite", "Spectral", "Spicy Rice", "Spinnaker", "Spirax", "Squada One", "Sree Krushnadevaraya", "Sriracha", "Stalemate", "Stalinist One", "Stardos Stencil", "Stencil", "Stint Ultra Condensed", "Stint Ultra Expanded", "Stoke", "Strait", "Sue Ellen Francisco", "Suez One", "Sumana", "Sunshiney", "Supermercado One", "Sura", "Suranna", "Suravaram", "Suwannaphum", "Swanky and Moo Moo", "Syncopate", "Tahoma", "Tangerine", "Taprom", "Tauri", "Taviraj", "Teko", "Telex", "Tempus Sans ITC", "Tenali Ramakrishna", "Tenor Sans", "Text Me One", "The Girl Next Door", "Tienne", "Tillana", "Times New Roman", "Timmana", "Tinos", "Titan One", "Titillium Web", "Trade Winds", "Trattatello", "Trebuchet MS", "Trirong", "Trocchi", "Trochut", "Trykker", "Tulpen One", "Tw Cen MT", "Ubuntu", "Ubuntu Condensed", "Ubuntu Mono", "Ultra", "Uncial Antiqua", "Underdog", "Unica One", "UnifrakturCook", "UnifrakturMaguntia", "Unkempt", "Unlock", "Unna", "VT323", "Vampiro One", "Varela", "Varela Round", "Vast Shadow", "Verdana", "Vesper Libre", "Vibur", "Vidaloka", "Viga", "Viner Hand ITC", "Vivaldi", "Vladimir Script", "Voces", "Volkhov", "Vollkorn", "Voltaire", "Waiting for the Sunrise", "Wallpoet", "Walter Turncoat", "Warnes", "Wellfleet", "Wendy One", "Wide Latin", "Wire One", "Work Sans", "Yanone Kaffeesatz", "Yantramanav", "Yatra One", "Yellowtail", "Yeseva One", "Yesteryear", "Yrsa", "Zapfino", "Zeyada", "Zilla Slab", "Zilla Slab Highlight"];

}