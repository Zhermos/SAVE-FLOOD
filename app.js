/* app.js - SAFE-FLOOD Application Logic */

// State Manager
let isOffline = false;
let sosActive = false;
let currentView = 'dashboard'; // 'dashboard', 'chat'
let currentChatType = 'manual'; // 'manual', 'mesh'
let unifiedChannel = 'manual'; // 'manual' or 'mesh' (for offline unified command chat)

// Real-World Emergency Manual Database (13 Practical Chapters)
const chatbotDatabase = {
  // --- MEDICAL CATEGORY ---
  'first-aid-shock': {
    title: '⚡ การปฐมพยาบาลผู้ประสบภัยไฟฟ้าดูด / ไฟช็อต',
    steps: [
      '1. ตัดกระแสไฟฟ้าหลักทันที: ทำการสับคัตเอาต์หรือเบรกเกอร์ตัวหลักในบ้าน หากไม่สามารถเข้าถึงตู้ไฟได้ ให้โทรหาการไฟฟ้านครหลวงด่วนเพื่อตัดไฟภายนอก',
      '2. ห้ามสัมผัสร่างกายผู้ป่วยโดยตรง: หากร่างกายผู้ป่วยยังสัมผัสอยู่กับแหล่งไฟฟ้า ห้ามใช้มือเปล่าหรือผิวหนังแตะต้องผู้ป่วยเด็ดขาด',
      '3. ใช้วัตถุที่เป็นฉนวนผลักตัวนำไฟออก: ใช้ไม้กวาดแห้ง ไม้กระดาน ท่อพลาสติก หรือผ้าขนหนูหนาๆ ม้วนตัวผู้ป่วยหรือเขี่ยสายไฟออกจากตัวผู้ประสบภัย',
      '4. เคลื่อนย้ายและเช็กสัญญาณชีพ: ย้ายผู้ประสบภัยไปนอนบนพื้นที่แห้งราบ ตรวจชีพจรและดูการหายใจ หากพบว่าหยุดหายใจหรือหัวใจหยุดเต้น ให้รีบโทร 1669 และเริ่มทำ CPR ทันที',
      '5. ปฐมพยาบาลบาดแผลเบื้องต้น: พันปิดบาดแผลที่เกิดจากรอยไหม้ของไฟฟ้าด้วยผ้าแห้งสะอาด ห้ามทาครีม ยาสีฟัน หรือน้ำมันใดๆ ลงบนแผล'
    ],
    synonyms: ['ไฟดูด', 'ไฟช็อต', 'ไฟฟ้าดูด', 'ไฟฟ้าช็อต', 'กระแสไฟ', 'shock', 'electrocution']
  },
  'first-aid-wounds': {
    title: '🩹 บาดแผลฉีกขาดและการป้องกันโรคระบาดทางน้ำ',
    steps: [
      '1. ล้างทำความสะอาดแผลทันที: ล้างเศษโคลนและฝุ่นละอองออกจากบาดแผลด้วยน้ำสะอาดสะอาดที่สุด (ควรเป็นน้ำดื่มขวด) และถูสบู่เบาๆ รอบแผล',
      '2. ใส่ยาฆ่าเชื้อ: ซับแผลให้แห้งสนิทด้วยผ้าสะอาด ทาน้ำยาโพวิโดน-ไอโอดีน (เบตาดีน) เพื่อลดความเสี่ยงในการอักเสบติดเชื้อ',
      '3. ปิดแผลด้วยวัสดุแห้งและกันน้ำ: ปิดบาดแผลด้วยพลาสเตอร์กันน้ำ หรือพันแผลให้มิดชิด หลีกเลี่ยงไม่ให้ปากแผลแช่หรือสัมผัสกับน้ำท่วมโดยตรง',
      '4. สังเกตอาการโรคฉี่หนู (Leptospirosis): หากประวัติแผลลุยน้ำสกปรก แล้วมีไข้สูงเฉียบพลัน ปวดศีรษะรุนแรง ปวดเมื่อยกล้ามเนื้อน่อง ให้สงสัยว่าติดโรคฉี่หนู ห้ามซื้อยาไอบูโพรเฟนทานเอง และรีบไปพบแพทย์ทันที',
      '5. สังเกตอาการแผลอักเสบรุนแรง: หากแผลมีอาการ บวม แดง ร้อน มีหนอง หรือปวดบวมลามขึ้นมา ให้รีบทานยาฆ่าเชื้อและนำตัวผู้ป่วยส่งโรงพยาบาล'
    ],
    synonyms: ['แผล', 'บาดแผล', 'ฉี่หนู', 'แผลสด', 'แผลถลอก', 'ติดเชื้อ', 'ตาแดง', 'ท้องร่วง', 'ท้องเสีย', 'wound', 'cut', 'infection']
  },
  'first-aid-bites': {
    title: '🐍 การปฐมพยาบาลสัตว์มีพิษกัดต่อย (งู / ตะขาบ / แมงป่อง)',
    steps: [
      '1. ล้างแผลและลดการเคลื่อนไหว: ล้างแผลด้วยน้ำสะอาดและสบู่ เคลื่อนไหวอวัยวะส่วนที่ถูกกัดให้น้อยที่สุด ดามด้วยแผ่นไม้หรือผ้าม้วนเพื่อจำกัดการกระจายของพิษ',
      '2. จัดท่าอวัยวะให้อยู่ต่ำกว่าหัวใจ: จัดตำแหน่งแขนหรือขาที่โดนงูกัดให้อยู่ในระดับต่ำกว่าระดับหัวใจเสมอ เพื่อลดอัตราการไหลเวียนของพิษเข้าสู่ร่างกายส่วนกลาง',
      '3. ห้ามกรีด ดูดพิษ หรือรัดขันชะเนาะแน่นเกินไป: การขันชะเนาะ (Tourniquet) แน่นเกินไปอาจขัดขวางเส้นเลือดแดงทำให้แขนขาขาดเลือดไปเลี้ยงจนเนื้อตายได้ ห้ามใช้ปากดูดพิษหรือกรีดแผลเด็ดขาด',
      '4. ถ่ายภาพสัตว์หรือจดจำลักษณะ: จดจำลักษณะงู สี ลวดลาย หรือถ่ายภาพเก็บไว้ (ถ้าทำได้ปลอดภัย) เพื่อประสานกู้ภัยเตรียมเซรุ่มที่ตรงกับประเภทพิษงู',
      '5. ประคบเย็นกรณีแมงป่องหรือตะขาบ: หากถูกตะขาบหรือแมงป่องกัด ให้ประคบด้วยน้ำแข็งหรือผ้าเย็นเพื่อลดความเจ็บปวดและลดการบวมอักเสบ'
    ],
    synonyms: ['งู', 'ตะขาบ', 'แมงป่อง', 'งูกัด', 'สัตว์มีพิษ', 'กัด', 'ต่อย', 'snake', 'bite']
  },
  'first-aid-cpr': {
    title: '🫀 ขั้นตอนการปั๊มหัวใจ CPR และช่วยชีวิตเบื้องต้น',
    steps: [
      '1. ประเมินความปลอดภัยรอบข้าง: ก่อนเข้าไปช่วยเหลือผู้ป่วย ต้องแน่ใจว่าบริเวณนั้นปลอดภัยจากกระแสไฟฟ้ารั่ว โครงสร้างอาคารพัง หรือน้ำท่วมไหลเชี่ยว',
      '2. ปลุกเรียกประเมินความรู้สึกตัว: ตบไหล่ทั้งสองข้างแรงๆ แล้วเรียกชื่อเสียงดัง "คุณๆ เป็นอย่างไรบ้าง" หากไม่มีการตอบสนองและไม่มีการหายใจปกติ (หรือหายใจเฮือก)',
      '3. โทรสายด่วน 1669: ประสานงานเจ้าหน้าที่กู้ชีพฉุกเฉิน แจ้งพิกัดอาการผู้ป่วยและระบุว่าต้องการเครื่องกระตุกหัวใจอัตโนมัติ (AED) ถ้ามีในพื้นที่ใกล้เคียง',
      '4. เริ่มกดหน้าอก (Chest Compressions): วางส้นมือหนึ่งบนกึ่งกลางหน้าอก (แนวกึ่งกลางหัวนม) เอาอีกมือประสานทับ กดลงลึก 5-6 เซนติเมตร ด้วยจังหวะสม่ำเสมอ 100-120 ครั้งต่อนาที (จังหวะเพลงช้างช้างช้าง หรือ Stayin Alive)',
      '5. ปล่อยอกให้คืนตัวเต็มที่และห้ามหยุดกด: ทำการกดหน้าอกต่อไปเรื่อยๆ จนกว่าทีมกู้ชีพที่มีอุปกรณ์ระดับสูงจะเดินทางมาถึงหน้างาน หรือจนกว่าผู้ป่วยจะเริ่มรู้สึกตัวหายใจได้เอง'
    ],
    synonyms: ['cpr', 'ปั๊มหัวใจ', 'ช่วยหายใจ', 'หยุดหายใจ', 'หมดสติ', 'กู้ชีพ', 'ช่วยชีวิต']
  },

  // --- EVACUATION CATEGORY ---
  'evac-swiftwater': {
    title: '⛵ คู่มือการลุยกระแสน้ำเชี่ยวและการอพยพทางเรือ',
    steps: [
      '1. ห้ามเดินลุยกระแสน้ำที่สูงเกินระดับเข่า: ระดับน้ำเพียง 15 ซม. (ครึ่งแข้ง) ที่ไหลเชี่ยวสามารถทำให้ตัวล้มได้ และระดับน้ำ 30 ซม. สามารถลอยตัวคนและพัดรถเก๋งขนาดเล็กให้ไหลไปตามน้ำได้',
      '2. ใช้ไม้ค้ำยันนำทางเสมอ: ถือร่มยาว ไม้กวาด ไม้ค้ำ เพื่อแยงลงน้ำตรวจสอบฝาท่อระบายน้ำที่อาจหลุดลอย, ตรวจสอบเศษแก้ว แผ่นสังกะสีแหลมคม หรือสายไฟจมน้ำ',
      '3. สวมใส่รองเท้าหุ้มส้นและมิดชิด: ห้ามเดินเท้าเปล่าเด็ดขาด ให้สวมรองเท้าผ้าใบ รองเท้าบูทยาง หรือรองเท้าแตะรัดส้นที่หนาเพื่อหลีกเลี่ยงการโดนบาดทะยักใต้น้ำ',
      '4. สวมชูชีพขณะเดินทางด้วยเรือ: หากต้องอพยพทางเรือท้องแบนหรือเรือกู้ภัย สวมเสื้อชูชีพตลอดเวลา ห้ามเอามือหรือเท้าออกนอกขอบเรือ และห้ามยืนบนเรือขณะเคลื่อนที่',
      '5. ระวังสิ่งของระโยงระยางริมทาง: คอยสังเกตกิ่งไม้ต่ำ สายไฟฟ้าที่ห้อยลงมาตามระดับน้ำ หรือเสาไฟฟ้าที่เอียงเอียงสะสมตลอดเส้นทางพายเรือ'
    ],
    synonyms: ['อพยพ', 'หนี', 'น้ำเชี่ยว', 'เดินลุยน้ำ', 'ลุยน้ำ', 'เรือ', 'เรือกู้ภัย', 'ลุยน้ำท่วม', 'evac', 'boat']
  },
  'evac-bag': {
    title: '🎒 การเตรียมกระเป๋าเป้ยังชีพฉุกเฉิน 72 ชั่วโมง (Go-Bag Checklist)',
    steps: [
      '1. น้ำดื่มสะอาดเพื่อการดำรงชีพ: เตรียมนับอัตราส่วนน้ำดื่ม 3 ลิตรต่อคนต่อวัน สำหรับ 3 วัน (รวม 9 ลิตร) เป็นอันดับแรก',
      '2. อาหารแห้งพลังงานสูง: อาหารพร้อมทานที่ไม่ต้องใช้ไฟต้ม เช่น ขนมปังกรอบ ปลากระป๋องฝาดึง ช็อกโกแลตแท่ง นมกล่อง และบะหมี่สำเร็จรูปชนิดแห้ง',
      '3. ยารักษาโรคและปฐมพยาบาล: ยารักษาโรคประจำตัวของผู้ประสบภัย, ยาสามัญประจำบ้าน (ยาพาราเซตามอล, ยาแก้ท้องเสีย, พลาสเตอร์, แอลกอฮอล์)',
      '4. ซองเอกสารสำคัญกันน้ำ: บรรจุบัตรประชาชน ทะเบียนบ้าน เอกสารสิทธิ์ที่ดิน กรมธรรม์ สูจิบัตร ใส่ซองซิปล็อกกันน้ำอย่างน้อย 2 ชั้น',
      '5. อุปกรณ์ช่วยเหลือตนเองส่วนบุคคล: นกหวีดพลาสติก (สำหรับเป่าชี้พิกัดเสียงเรียกกู้ภัย), ไฟฉายกระบอกกันน้ำพร้อมถ่านสำรอง, เงินสดจำนวนหนึ่ง และพาวเวอร์แบงก์ชาร์จไฟเต็ม'
    ],
    synonyms: ['เป้', 'กระเป๋า', 'เป้ฉุกเฉิน', 'ถุงยังชีพ', 'อาหารแห้ง', 'เตรียมพร้อม', 'bag', 'backpack', 'go-bag']
  },
  'evac-center': {
    title: '🏢 ข้อควรปฏิบัติและระเบียบปฏิบัติในศูนย์อพยพพักพิง',
    steps: [
      '1. ลงทะเบียนตัวตนเมื่อเข้าถึง: รีบรายงานตัวต่อเจ้าหน้าที่ควบคุมศูนย์อพยพทันทีเพื่อยืนยันสิทธิและรับป้ายรับอาหาร/น้ำดื่มของทางราชการ',
      '2. ปฏิบัติตามสุขลักษณะเพื่อป้องกันโรคระบาด: ใช้หน้ากากอนามัย ล้างมือด้วยเจลแอลกอฮอล์สม่ำเสมอ และแยกทิ้งขยะติดเชื้อ เช่น หน้ากาก ทิชชูเปียก ในจุดเฉพาะ',
      '3. จัดการสัมภาระส่วนบุคคลให้มิดชิด: เก็บของมีค่าติดตัวหรือเก็บในเป้ฉุกเฉินตลอดเวลา ระมัดระวังการสูญหายเนื่องจากคนอยู่รวมกันเป็นกลุ่มจำนวนมาก',
      '4. เข้าร่วมระบบการแบ่งปันทรัพยากร: ปฏิบัติตามรอบเวลาแจกจ่ายอาหาร ยารักษาโรค และการใช้งานส่วนกลาง เช่น รอบเวลาการใช้น้ำอาบเพื่อปันทรัพยากรให้ผู้ลี้ภัยคนอื่น',
      '5. รายงานปัญหาสาธารณสุขทันที: หากเริ่มมีอาการไม่สบาย ท้องเสีย อาเจียน หรือตาแดง ให้รีบติดต่อเจ้าหน้าที่สาธารณสุขประจำศูนย์อพยพทันทีเพื่อทำการแยกกักตัว'
    ],
    synonyms: ['ศูนย์อพยพ', 'ศูนย์พักพิง', 'พักพิง', 'ที่พัก', 'ลี้ภัย', 'โรงเรียน', 'วัด', 'shelter']
  },

  // --- HOME SAFETY CATEGORY ---
  'safety-breaker': {
    title: '🔌 ขั้นตอนการสับคัตเอาต์และเช็กระบบไฟฟ้าภายในบ้าน',
    steps: [
      '1. สับสะพานไฟแยกส่วนที่เสี่ยงท่วม: หากตู้ควบคุมแยกชั้นบน-ชั้นล่าง ให้ทำการสับเบรกเกอร์ชั้นล่างลงทันทีที่ระดับน้ำเริ่มปริ่มขอบประตูบ้าน',
      '2. ปลดปลั๊กไฟเครื่องใช้ไฟฟ้าชั้นล่าง: ดึงปลั๊กอุปกรณ์ไฟฟ้าระดับต่ำทั้งหมดออก และทำการยกขึ้นเก็บไว้ที่ระดับชั้น 2 หรือบนพื้นที่ที่พ้นระดับการท่วมขัง',
      '3. ตรวจเช็กระบบสายไฟภายนอกอาคาร: คอยสังเกตเสาไฟฟ้าใกล้บ้าน สายสัญญาณอินเทอร์เน็ต และหม้อแปลงไฟฟ้า หากพบรอยประกายไฟหรือเสียงเสียงแปลกๆ ห้ามเข้าใกล้เด็ดขาด',
      '4. ห้ามจับสัมผัสอุปกรณ์ไฟฟ้าขณะเปียกชื้น: หากมือเท้าเปียกน้ำ หรือตัวยังเปียกน้ำอยู่ ห้ามปิด-เปิดสวิตช์ไฟหรือเสียบปลั๊กใดๆ ทั้งสิ้นเพื่อเลี่ยงกระแสไฟไหลผ่านร่างกาย',
      '5. สังเกตปลาตายริมน้ำ: หากน้ำรอบบ้านที่ท่วมขังมีฟองอากาศแปลกๆ มีเสียงเสียงแปลกๆ หรือมีสัตว์น้ำว่ายวนแล้วหงายท้องตาย ควรรีบอพยพหนีห่างรัศมีน้ำจุดนั้น'
    ],
    synonyms: ['คัตเอาต์', 'สะพานไฟ', 'สวิตช์', 'ตัดไฟ', 'ปิดไฟ', 'ปลั๊ก', 'ตู้ไฟ', 'ไฟรั่ว', 'breaker', 'fuse', 'power']
  },
  'safety-gas': {
    title: '🔥 การจัดการถังแก๊สหุงต้มและการควบคุมอัคคีภัยฉุกเฉิน',
    steps: [
      '1. ปิดวาล่วถังแก๊ส (LPG) ให้สนิท: หมุนปิดวาล์วที่หัวถังแก๊สให้สนิททันที ดึงสายส่งแก๊สและถอดหัวปรับความดันแก๊สออก',
      '2. ผูกยึดถังแก๊สหรือย้ายขึ้นที่สูง: ถังแก๊สเหล็กเปล่าหรือถังแก๊สมีแก๊สบางส่วนสามารถลอยน้ำได้ ควรรีบย้ายขึ้นชั้น 2 หรือผูกเชือกมัดถังแก๊สให้แน่นหนากับตัวเสาบ้านเพื่อป้องกันการลอยกระแทกเกิดรูรั่วหรือประกายไฟ',
      '3. ตรวจสอบการรั่วไหลด้วยน้ำสบู่: หากได้กลิ่นแก๊สหรือเสียงรั่วไหล ห้ามจุดไฟ ห้ามเปิดไฟสวิตช์ไฟฟ้า (เพื่อเลี่ยงประกายไฟจากหน้าสัมผัส) ให้เปิดหน้าต่างระบายอากาศ และทาสบู่เหลวเช็กจุดรั่วไหล',
      '4. ดับไฟฟลัดวาล์วด้วยสารเคมีแห้ง: กรณีเกิดไฟฟ้าลัดวงจรเกิดอัคคีภัย ห้ามใช้น้ำธรรมดาสาดดับไฟสะพานไฟเด็ดขาด ให้ใช้ถังดับเพลิงเคมีแห้งสีแดงหรือสีเขียวฉีดพ่นแทน'
    ],
    synonyms: ['แก๊ส', 'ถังแก๊ส', 'ถังแก๊สหุงต้ม', 'ไฟไหม้', 'แก๊สรั่ว', 'อัคคีภัย', 'ถังดับเพลิง', 'gas', 'fire']
  },

  // --- LIVING & SANITATION CATEGORY ---
  'living-water': {
    title: '💧 เทคนิคการผลิตน้ำดื่มฉุกเฉินและการปรับปรุงคุณภาพน้ำ',
    steps: [
      '1. วิธีการต้มเดือด ฆ่าเชื้อจุลชีพ: กรองฝุ่นตะกอนหยาบออกก่อนด้วยผ้าขาวบางสะอาด ต้มน้ำให้เดือดพล่านต่อเนื่องเป็นเวลา 1-3 นาทีเพื่อฆ่าเชื้อแบคทีเรียและไวรัส',
      '2. วิธีบำบัดด้วยวิธี SODIS (แสงอาทิตย์): บรรจุน้ำดิบที่ผ่านการกรองตะกอนแล้วลงขวดพลาสติกใสสะอาด วางวางราบบนหลังคาสังกะสีตากแดดจัดทิ้งไว้ 6 ชั่วโมง (หรือ 2 วันหากเมฆครึ้ม) รังสี UV จะช่วยฆ่าเชื้อจุลชีพ',
      '3. การใช้คลอรีนน้ำยาฆ่าเชื้อ: หยดน้ำยาคลอรีนฆ่าเชื้อ (ความเข้มข้นเหมาะสม) หรือใช้คลอรีนเม็ดละลายน้ำทิ้งไว้ 30 นาทีก่อนนำมาใช้ดื่ม',
      '4. สังเกตคราบปนเปื้อนสารเคมี: ห้ามเก็บน้ำท่วมมาต้มใช้ดื่มเด็ดขาดหากพบว่ามีคราบน้ำมันเงาเลื่อมลอยอยู่ หรือมีสีน้ำและกลิ่นเคมีรุนแรง เพราะความร้อนไม่สามารถสลายสารเคมีปนเปื้อนได้'
    ],
    synonyms: ['น้ำดื่ม', 'กรองน้ำ', 'ต้มน้ำ', 'น้ำกิน', 'sodis', 'water', 'purify']
  },
  'living-waste': {
    title: '🚽 คู่มือการจัดการสุขาฉุกเฉินและการจัดการสิ่งปฏิกูลในบ้าน',
    steps: [
      '1. เตรียมอุปกรณ์ส้วมถุงดำ: กรณีระบบชักโครกบ้านอุดตันกดไม่ลง ให้ใช้ถุงดำสวมครอบส้วมเดิม หรือครอบถังพลาสติกก้นลึกเพื่อทำเป็นสุขาชั่วคราว',
      '2. ใช้ปูนขาวหรือขี้เถ้าเพื่อกำจัดกลิ่น: หลังจากขับถ่ายเสร็จทุกครั้ง ให้โรยปูนขาว แกลบ ดิน หรือขี้เถ้าเตาถ่านทับลงไปเพื่อดูดซับความชื้นและฆ่าเชื้อโรคเลี่ยงการแพร่พันธุ์ของแมลงวัน',
      '3. มัดปากถุงดำให้แน่นสนิท: เมื่อใช้งานถุงดำถึง 2 ใน 3 ส่วน ให้รีดไล่อากาศออกแล้วมัดปากถุงให้แน่น ซ้อนด้วยถุงดำอีกชั้นเพื่อความมิดชิดกันรั่วซึม',
      '4. แยกทิ้งถุงปฏิกูลในจุดคัดกรองขยะ: ห้ามโยนถุงขยะปฏิกูลทิ้งลงน้ำท่วมขังรอบบ้านเด็ดขาด เพราะจะเกิดการแพร่กระจายของโรคอหิวาตกโรค ให้รวบรวมใส่ถังขยะรอเรือเก็บกักขยะสิ่งปฏิกูลของเขต'
    ],
    synonyms: ['ส้วม', 'อุจจาระ', 'ปัสสาวะ', 'สุขา', 'สิ่งปฏิกูล', 'ขยะ', 'ถุงดำ', 'ส้วมฉุกเฉิน', 'ขยะติดเชื้อ', 'toilet', 'waste']
  },

  // --- CONTACTS CATEGORY ---
  'contacts-national': {
    title: '📞 รายการเบอร์โทรสายด่วนกู้ภัยและหน่วยงานรัฐส่วนกลาง',
    steps: [
      '• 1784 - สายด่วนกรมป้องกันและบรรเทาสาธารณภัย (รับแจ้งเหตุน้ำท่วม ขอเรือท้องแบนอพยพ และแจ้งเตือนภัยหลัก)',
      '• 1669 - เจ็บป่วยฉุกเฉิน / สถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ. ประสานส่งรถพยาบาล หรือทีมเรือพยาบาลกู้ชีพ)',
      '• 1111 กด 9 - ศูนย์ปฏิบัติการช่วยเหลืออุทกภัยแห่งชาติ (สปม. ประสานงานภาครัฐทุกสังกัด)',
      '• 1567 - สายด่วนศูนย์ดำรงธรรม (ประสานงานบรรเทาทุกข์ในส่วนภูมิภาค และขอถุงยังชีพฉุกเฉิน)',
      '• 1362 - ศูนย์เตือนภัยพิบัติแห่งชาติ (ตรวจสอบความสูงคันกั้นน้ำ แนวตลิ่งล้น และเรืออพยพ)'
    ],
    synonyms: ['เบอร์', 'ติดต่อ', 'โทร', 'กู้ภัย', 'แจ้ง', '1669', '1784', 'สายด่วน', 'เบอร์กู้ภัย', 'ขอความช่วยเหลือ', 'hotline', 'call']
  },
  'contacts-local': {
    title: '🏥 ช่องทางติดต่อกู้ภัยและโรงพยาบาลพื้นที่เขตบางพลัด',
    steps: [
      '• 02-424-3532 - ฝ่ายป้องกันและบรรเทาสาธารณภัย สำนักงานเขตบางพลัด (สายด่วนกู้ภัยท้องที่ ดำเนินการช่วยอพยพน้ำท่วมทางเรือ)',
      '• 02-433-8008 - โรงพยาบาลเจ้าพระยา (ตั้งอยู่โซนปิ่นเกล้า-จรัญสนิทวงศ์ รองรับผู้เจ็บป่วยฉุกเฉินในเขตบางพลัด)',
      '• 02-419-7000 - โรงพยาบาลศิริราช (ประสานส่งตัวผู้ป่วยวิกฤตทางน้ำกรณีจราจรตัดขาด)',
      '• 02-883-2000 - โรงพยาบาลยันฮี (ตั้งอยู่เส้นจรัญสนิทวงศ์บางพลัด ประสานฉุกเฉินกู้ชีพตลอด 24 ชั่วโมง)'
    ],
    synonyms: ['บางพลัด', 'เจ้าพระยา', 'ศิริราช', 'ยันฮี', 'โรงพยาบาล', 'รพ', 'รพ.', 'hospital']
  }
};

// 5 Main Categories Configuration
const categories = {
  'medical': {
    name: '🩺 การแพทย์และปฐมพยาบาล',
    topics: ['first-aid-shock', 'first-aid-wounds', 'first-aid-bites', 'first-aid-cpr']
  },
  'evacuation': {
    name: '⛵ การอพยพและกู้ภัย',
    topics: ['evac-swiftwater', 'evac-bag', 'evac-center']
  },
  'safety': {
    name: '🔌 ไฟฟ้าและอัคคีภัย',
    topics: ['safety-breaker', 'safety-gas']
  },
  'living': {
    name: '💧 น้ำดื่มและสุขอนามัย',
    topics: ['living-water', 'living-waste']
  },
  'contacts': {
    name: '📞 เบอร์ฉุกเฉินและกู้ภัย',
    topics: ['contacts-national', 'contacts-local']
  }
};

// Morse SOS Duration sequence array (in milliseconds)
const morsePattern = [
  { state: true, duration: 150 },
  { state: false, duration: 150 },
  { state: true, duration: 150 },
  { state: false, duration: 150 },
  { state: true, duration: 150 },
  { state: false, duration: 400 },
  { state: true, duration: 450 },
  { state: false, duration: 150 },
  { state: true, duration: 450 },
  { state: false, duration: 150 },
  { state: true, duration: 450 },
  { state: false, duration: 400 },
  { state: true, duration: 150 },
  { state: false, duration: 150 },
  { state: true, duration: 150 },
  { state: false, duration: 150 },
  { state: true, duration: 150 },
  { state: false, duration: 1200 }
];

let patternIndex = 0;
let currentMorseTimeout = null;

// Camera stream and physical torch state holders
let videoStream = null;
let torchTrack = null;

// Weather state caching to avoid API spamming
let lastFetchedWeatherTime = 0;
const weatherCacheDuration = 300000; // 5 minutes

// DOM Elements cache
let modeToggleBtn, toggleKnob, toggleIcon, statusBadge, statusText, brandIcon, brandName, brandSub, navBar, bottomNav;
let onlineDashboardHeader, offlineDashboardHeader;
let chatTerminal, dynamicChatContainer, sosTriggerBtn, sosOverlay, sosOverlayText;
let meshChatFeed, meshChatInput, sendMeshBtn, meshStatusAlert;
let offlineChatInput, sendOfflineChatBtn;
let sosBtnInstruction;
let viewDashboard, viewChat;
let chatBadge;

// Document Ready Setup
document.addEventListener('DOMContentLoaded', () => {
  // Mode Toggle Elements
  modeToggleBtn = document.getElementById('modeToggleBtn');
  toggleKnob = document.getElementById('toggleKnob');
  toggleIcon = document.getElementById('toggleIcon');
  statusBadge = document.getElementById('statusBadge');
  statusText = document.getElementById('statusText');
  brandIcon = document.getElementById('brandIcon');
  brandName = document.getElementById('brandName');
  brandSub = document.getElementById('brandSub');
  navBar = document.getElementById('navBar');
  bottomNav = document.getElementById('bottomNav');

  // Views
  viewDashboard = document.getElementById('view-dashboard');
  viewChat = document.getElementById('view-chat');

  // Dashboards sections
  onlineDashboardHeader = document.getElementById('onlineDashboardHeader');
  offlineDashboardHeader = document.getElementById('offlineDashboardHeader');

  // Chat & SOS Elements
  chatTerminal = document.getElementById('chatTerminal');
  dynamicChatContainer = document.getElementById('dynamicChatContainer');
  sosTriggerBtn = document.getElementById('sosTriggerBtn');
  sosOverlay = document.getElementById('sosOverlay');
  sosOverlayText = document.getElementById('sosOverlayText');
  sosBtnInstruction = document.getElementById('sosBtnInstruction');

  // Mesh Chat Elements
  meshChatFeed = document.getElementById('meshChatFeed');
  meshChatInput = document.getElementById('meshChatInput');
  sendMeshBtn = document.getElementById('sendMeshBtn');
  meshStatusAlert = document.getElementById('meshStatusAlert');
  chatBadge = document.getElementById('chatBadge');

  // Offline Manual Query Elements
  offlineChatInput = document.getElementById('offlineChatInput');
  sendOfflineChatBtn = document.getElementById('sendOfflineChatBtn');

  // Setup Toggle Switch Listener
  modeToggleBtn.addEventListener('click', toggleNetworkMode);

  // Setup SOS Button Listener
  if (sosTriggerBtn) {
    sosTriggerBtn.addEventListener('click', () => {
      if (!sosActive) {
        startSOSBeacon();
      }
    });
  }

  // Close SOS via click anywhere on the overlay
  sosOverlay.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      stopSOSBeacon();
    }
  });

  // Allow cancelling SOS overlay with Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sosActive) {
      stopSOSBeacon();
    }
  });

  // Setup Mesh Chat Send button
  if (sendMeshBtn) {
    sendMeshBtn.addEventListener('click', sendMeshMessage);
  }
  if (meshChatInput) {
    meshChatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendMeshMessage();
      }
    });
  }

  // Setup Offline Manual Input Submit
  if (sendOfflineChatBtn) {
    sendOfflineChatBtn.addEventListener('click', handleCustomOfflineQuery);
  }
  if (offlineChatInput) {
    offlineChatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleCustomOfflineQuery();
      }
    });
  }

  // Setup Unified Offline Commands Input listeners
  const sendUnifiedBtn = document.getElementById('sendUnifiedBtn');
  const unifiedChatInput = document.getElementById('unifiedChatInput');
  if (sendUnifiedBtn) {
    sendUnifiedBtn.addEventListener('click', handleUnifiedChatQuery);
  }
  if (unifiedChatInput) {
    unifiedChatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleUnifiedChatQuery();
      }
    });
  }

  // Initialize Live Fluctuation Simulation
  startLiveSensorsSimulation();

  // Initialize Geolocation Tracking (100% Offline GPS)
  startGPSTracking();

  // Initial Real Weather fetch using Bang Phlat coordinates
  fetchLiveWeather(13.7932, 100.4930);

  // Trigger simulated mesh notification badge after 5s
  setTimeout(() => {
    if (chatBadge) {
      chatBadge.classList.remove('hidden');
    }
  }, 5000);
});

// Geolocation Tracker (Real-World GPS Telemetry)
function startGPSTracking() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
    return;
  }

  navigator.geolocation.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      const gpsDistanceAlert = document.getElementById('gpsDistanceAlert');
      const gpsDistanceText = document.getElementById('gpsDistanceText');
      const gpsDistanceStatus = document.getElementById('gpsDistanceStatus');
      const mapCoords = document.getElementById('mapCoords');
      const userLocationPin = document.getElementById('userLocationPin');

      if (!gpsDistanceAlert || !gpsDistanceText || !gpsDistanceStatus || !mapCoords || !userLocationPin) return;

      // Reveal alert warning bar and map pin
      gpsDistanceAlert.classList.remove('hidden');
      userLocationPin.setAttribute('class', ''); // Remove 'hidden' class from SVG <g>

      // Update map coordinate text
      mapCoords.textContent = `${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`;

      // Update actual weather conditions using live coordinates
      fetchLiveWeather(lat, lon);

      // Active hazard location coordinates (Charan 75)
      const hazardLat = 13.7932;
      const hazardLon = 100.4930;
      const distance = getHaversineDistance(lat, lon, hazardLat, hazardLon);

      // SVG Bounding Box coordinates (Local Bang Phlat area)
      const mapMinLat = 13.7850;
      const mapMaxLat = 13.8000;
      const mapMinLon = 100.4850;
      const mapMaxLon = 100.5050;

      const isInsideMap = (lat >= mapMinLat && lat <= mapMaxLat && lon >= mapMinLon && lon <= mapMaxLon);

      if (isInsideMap) {
        // Map user position as relative translation offsets in the 400x200 SVG coordinates
        const xSvg = ((lon - mapMinLon) / (mapMaxLon - mapMinLon)) * 400;
        const ySvg = (1 - ((lat - mapMinLat) / (mapMaxLat - mapMinLat))) * 200;

        userLocationPin.setAttribute('transform', `translate(${xSvg}, ${ySvg})`);
        document.getElementById('userLocationPinLabel').textContent = "คุณ (You)";
      } else {
        // Outside bounds: Pin to mock position to show rendering works, but warning is clear
        userLocationPin.setAttribute('transform', `translate(180, 130)`);
        document.getElementById('userLocationPinLabel').textContent = "จุดสาธิต";
      }

      // Display warning distance banner with danger states
      if (distance <= 500) {
        // High danger: close to Charan 75 electrical leakage
        gpsDistanceText.textContent = `ใกล้เขตไฟฟ้ารั่ว! (ห่างประมาณ ${Math.round(distance)} ม.) โปรดหลีกเลี่ยงกระแสน้ำท่วมขัง`;
        gpsDistanceAlert.className = "mt-2.5 p-3 rounded-xl bg-red-950/20 border border-red-500/35 flex items-center justify-between text-[10px] select-none text-red-400";
        gpsDistanceStatus.className = "font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[8px]";
        gpsDistanceStatus.textContent = "อันตราย";
      } else {
        // Safe distance
        const distStr = distance < 1000 ? `${Math.round(distance)} ม.` : `${(distance/1000).toFixed(2)} กม.`;
        gpsDistanceText.textContent = `พิกัดของคุณ: อยู่ห่างจากจุดเสี่ยงภัยไฟฟ้ารั่วประมาณ ${distStr}`;
        gpsDistanceAlert.className = "mt-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between text-[10px] select-none text-slate-400";
        gpsDistanceStatus.className = "font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px]";
        gpsDistanceStatus.textContent = "ปลอดภัย";
      }
    },
    (error) => {
      console.log("GPS Location Error:", error);
    },
    { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
  );
}

// Distance helper
function getHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const phi1 = lat1 * Math.PI/180;
  const phi2 = lat2 * Math.PI/180;
  const deltaPhi = (lat2-lat1) * Math.PI/180;
  const deltaLambda = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

// Navigation Switcher Logic (Tab / Views Router)
function switchView(viewName) {
  currentView = viewName;

  // Hide all views
  viewDashboard.classList.add('hidden');
  viewChat.classList.add('hidden');

  // Show selected view
  if (viewName === 'dashboard') {
    viewDashboard.classList.remove('hidden');
  } else if (viewName === 'chat') {
    viewChat.classList.remove('hidden');
    if (chatBadge) {
      chatBadge.classList.add('hidden');
    }
  }

  updateNavIndicators();
}

function updateNavIndicators() {
  const tabs = ['dashboard', 'chat'];
  const activeColorClass = isOffline ? 'text-yellow-400' : 'text-orange-500';

  tabs.forEach(tab => {
    const btn = document.getElementById(`nav-${tab}`);
    if (!btn) return;

    if (tab === currentView) {
      btn.className = `flex flex-col items-center gap-1 font-extrabold transition-all duration-300 focus:outline-none ${activeColorClass}`;
    } else {
      btn.className = `flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 font-semibold transition-all duration-300 focus:outline-none relative`;
    }
  });
}

// Make navigation switch global
window.switchView = switchView;

// Toggle Chat Types inside Chat View (Manual vs Mesh)
function switchChatType(chatType) {
  if (isOffline) {
    // In offline mode, both manual and mesh are merged on one page, ignore clicks
    return;
  }
  currentChatType = chatType;
  const manualContainer = document.getElementById('chat-manual-container');
  const meshContainer = document.getElementById('chat-mesh-container');
  const btnManual = document.getElementById('btn-manual-tab');
  const btnMesh = document.getElementById('btn-mesh-tab');

  if (chatType === 'manual') {
    manualContainer.classList.remove('hidden');
    meshContainer.classList.add('hidden');

    btnManual.className = "flex-1 py-2.5 rounded-lg bg-yellow-400 text-black text-center font-extrabold transition-all focus:outline-none";
    btnMesh.className = "flex-1 py-2.5 text-slate-400 text-center font-bold hover:text-slate-200 transition-all focus:outline-none";
  } else {
    manualContainer.classList.add('hidden');
    meshContainer.classList.remove('hidden');

    const activeMeshBg = isOffline ? 'bg-yellow-400 text-black' : 'bg-emerald-600 text-slate-950';
    btnMesh.className = `flex-1 py-2.5 rounded-lg text-center font-extrabold transition-all focus:outline-none ${activeMeshBg}`;
    btnManual.className = "flex-1 py-2.5 text-slate-400 text-center font-bold hover:text-slate-200 transition-all focus:outline-none";
  }
}

// Make chat switcher global
window.switchChatType = switchChatType;


// Toggle Network Mode Action with Telemetry Loading Delay
function toggleNetworkMode() {
  const telemetryOverlay = document.getElementById('telemetryOverlay');
  const telemetryTitle = document.getElementById('telemetryOverlayTitle');
  const telemetryDesc = telemetryOverlay ? telemetryOverlay.querySelector('p') : null;

  if (telemetryOverlay) {
    telemetryOverlay.classList.remove('hidden');
    if (!isOffline) {
      // Transitioning to Offline
      if (telemetryTitle) telemetryTitle.textContent = "🔌 DISCONNECTING GRID...";
      if (telemetryDesc) telemetryDesc.textContent = "กำลังเปลี่ยนผ่านช่องทางสัญญาณวิทยุและแบตเตอรี่สำรอง";
    } else {
      // Transitioning to Online
      if (telemetryTitle) telemetryTitle.textContent = "🛰️ CONNECTING TELEMETRY...";
      if (telemetryDesc) telemetryDesc.textContent = "กำลังเจรจาสัญญาณเชื่อมต่อระบบดาวเทียมสำรองภายนอก";
    }
  }

  // Delay the switch by 800ms for realistic handshake feel
  setTimeout(() => {
    executeNetworkToggle();
    if (telemetryOverlay) {
      telemetryOverlay.classList.add('hidden');
    }
  }, 800);
}

function executeNetworkToggle() {
  isOffline = !isOffline;
  
  const chatSelector = document.getElementById('chatSelector');
  const manualContainer = document.getElementById('chat-manual-container');
  const meshContainer = document.getElementById('chat-mesh-container');
  const unifiedContainer = document.getElementById('chat-offline-unified-container');

  if (isOffline) {
    // Transition to Offline Mode
    toggleKnob.className = "w-8 h-8 rounded-full bg-yellow-400 shadow-md shadow-yellow-400/40 flex items-center justify-center transition-transform duration-500 ease-in-out translate-x-10";
    toggleIcon.className = "fa-solid fa-wifi-slash text-slate-950 text-xs rotate-12";
    
    statusBadge.className = "text-[10px] font-extrabold tracking-wider px-2 py-1 rounded-full uppercase bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 flex items-center gap-1 transition-all duration-300";
    statusText.textContent = "OFFLINE";
    
    brandIcon.className = "w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/20 transition-transform duration-500 scale-105 rotate-6";
    brandIcon.innerHTML = `<i class="fa-solid fa-bolt text-black text-lg"></i>`;
    
    brandName.className = "font-black text-xl tracking-wider text-yellow-400 flex items-center gap-1.5 transition-all duration-500";
    brandSub.className = "text-[10px] text-yellow-400/80 tracking-widest font-black transition-all duration-500";

    navBar.className = "sticky top-0 z-50 transition-all duration-500 bg-black/95 border-b border-yellow-400/30 px-4 py-3 flex items-center justify-between";
    bottomNav.className = "fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-black/95 border-t border-yellow-400/30 px-6 py-3 flex items-center justify-around shadow-[0_-5px_25px_rgba(0,0,0,0.9)]";
    bottomNav.classList.remove('hidden');
    document.body.className = "bg-black text-white font-sans min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-yellow-400 selection:text-black pb-24";

    // Toggle Dashboard Sections
    onlineDashboardHeader.classList.add('hidden');
    offlineDashboardHeader.classList.remove('hidden');

    // Hide family status in offline mode
    const familyStatusSection = document.getElementById('familyStatusSection');
    if (familyStatusSection) familyStatusSection.classList.add('hidden');

    // Offline: Hide normal selector tabs and show Unified Chat Container
    if (chatSelector) chatSelector.classList.add('hidden');
    if (manualContainer) manualContainer.classList.add('hidden');
    if (meshContainer) meshContainer.classList.add('hidden');
    if (unifiedContainer) unifiedContainer.classList.remove('hidden');

    // Resize buttons and text within Offline elements
    document.querySelectorAll('.offline-btn').forEach(btn => {
      btn.classList.add('py-5', 'px-4', 'text-base');
    });
    
  } else {
    // Transition back to Online Mode
    toggleKnob.className = "w-8 h-8 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/30 flex items-center justify-center transition-transform duration-500 ease-in-out translate-x-0";
    toggleIcon.className = "fa-solid fa-wifi text-slate-950 text-xs";
    
    statusBadge.className = "text-[10px] font-extrabold tracking-wider px-2 py-1 rounded-full uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 transition-all duration-300";
    statusText.textContent = "ONLINE";
    
    brandIcon.className = "w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center shadow-lg shadow-blue-500/10 transition-transform duration-500";
    brandIcon.innerHTML = `<i class="fa-solid fa-house-flood-water text-white text-lg"></i>`;
    
    brandName.className = "font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 flex items-center gap-1.5 transition-all duration-500";
    brandSub.className = "text-[10px] text-slate-400 tracking-wide font-medium transition-all duration-500";

    navBar.className = "sticky top-0 z-50 transition-all duration-500 backdrop-blur-md bg-slate-950/80 border-b border-slate-900 px-4 py-3 flex items-center justify-between";
    bottomNav.classList.add('hidden');
    document.body.className = "bg-slate-950 text-slate-100 font-sans min-h-screen grid-bg transition-colors duration-500 overflow-x-hidden selection:bg-orange-500 selection:text-white";
    switchView('dashboard');

    // Toggle Dashboard Sections
    offlineDashboardHeader.classList.add('hidden');
    onlineDashboardHeader.classList.remove('hidden');

    // Show family status in online mode
    const familyStatusSection = document.getElementById('familyStatusSection');
    if (familyStatusSection) familyStatusSection.classList.remove('hidden');

    // Online: Show normal selectors, hide Unified Command Container
    if (chatSelector) chatSelector.classList.remove('hidden');
    if (unifiedContainer) unifiedContainer.classList.add('hidden');
    
    // Normal container toggle logic
    switchChatType(currentChatType);

    // Normalize buttons and text sizing
    document.querySelectorAll('.offline-btn').forEach(btn => {
      btn.classList.remove('py-5', 'px-4', 'text-base');
    });
  }

  // Update nav colors for active/inactive tabs
  updateNavIndicators();
}

// Interactive Map Zooming via SVG viewBox coordinates
let mapZoomLevel = 1;
function zoomMap(direction) {
  const svg = document.getElementById('mapSvg');
  if (!svg) return;

  if (direction === 'in') {
    mapZoomLevel = 2;
    // Zoomed in viewBox centered around Charan 75 area
    svg.setAttribute('viewBox', '110 30 200 100');
  } else {
    mapZoomLevel = 1;
    // Default viewBox
    svg.setAttribute('viewBox', '0 0 400 200');
  }
}
window.zoomMap = zoomMap;

// Pinning Radio Mesh messages to Pinned Alert Board
function pinMeshMessage(text) {
  const pinnedAlertText = document.getElementById('pinnedAlertText');
  if (pinnedAlertText) {
    pinnedAlertText.textContent = text;
  }
  const unifiedPinnedAlertText = document.getElementById('unifiedPinnedAlertText');
  if (unifiedPinnedAlertText) {
    unifiedPinnedAlertText.textContent = text;
  }
}
window.pinMeshMessage = pinMeshMessage;

// WMO Weather Code Decoder
function getWMOWeatherDescription(code) {
  switch (code) {
    case 0: return "ท้องฟ้าโปร่ง";
    case 1:
    case 2:
    case 3: return "ท้องฟ้ามีเมฆบางส่วน";
    case 45:
    case 48: return "มีหมอกลงหนา";
    case 51:
    case 53:
    case 55: return "ฝนตกละออง";
    case 61: return "ฝนตกเล็กน้อย";
    case 63: return "ฝนตกปานกลาง";
    case 65: return "ฝนตกหนักมาก";
    case 80:
    case 81:
    case 82: return "ฝนตกไล่ช้าง";
    case 95:
    case 96:
    case 99: return "พายุฝนฟ้าคะนอง";
    default: return "สภาพอากาศปกติ";
  }
}

// Fetch real-world weather from Open-Meteo API
function fetchLiveWeather(lat, lon) {
  // If we are currently simulating offline state, block real network requests
  if (isOffline) return;

  const now = Date.now();
  if (now - lastFetchedWeatherTime < weatherCacheDuration) return; 

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.current) return;
      lastFetchedWeatherTime = now;

      const temp = data.current.temperature_2m;
      const humidity = data.current.relative_humidity_2m;
      const precip = data.current.precipitation;
      const code = data.current.weather_code;
      const wind = data.current.wind_speed_10m;

      const descText = getWMOWeatherDescription(code);
      
      const weatherDescText = document.getElementById('weatherDescText');
      const weatherStatusText = document.getElementById('weatherStatusText');

      if (weatherDescText) {
        weatherDescText.textContent = `${descText} ${temp}°C`;
      }
      if (weatherStatusText) {
        weatherStatusText.textContent = `ลม: ${wind} กม./ชม. • ความชื้น: ${humidity}% • ฝน: ${precip} มม.`;
      }
    })
    .catch(err => console.log("Failed to fetch live weather API:", err));
}

// Unified Offline Chat Command Center Handlers
function toggleUnifiedChannel() {
  const btn = document.getElementById('channelModeBtn');
  const text = document.getElementById('channelModeText');
  const input = document.getElementById('unifiedChatInput');
  const sendBtn = document.getElementById('sendUnifiedBtn');

  if (!btn || !input || !sendBtn) return;

  if (unifiedChannel === 'manual') {
    unifiedChannel = 'mesh';
    btn.className = "px-2.5 py-1.5 rounded-lg bg-emerald-600 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase transition-colors shrink-0 flex items-center gap-1 select-none focus:outline-none";
    btn.innerHTML = `<i class="fa-solid fa-tower-broadcast animate-pulse"></i><span id="channelModeText">วิทยุเพื่อนบ้าน</span>`;
    input.placeholder = "พิมพ์ข้อความส่งวิทยุถึงคนรอบข้าง...";
    sendBtn.className = "p-2.5 bg-emerald-600 text-slate-950 font-black rounded-lg hover:bg-emerald-500 transition-colors text-xs flex items-center justify-center gap-1 shrink-0 focus:outline-none";
  } else {
    unifiedChannel = 'manual';
    btn.className = "px-2.5 py-1.5 rounded-lg bg-yellow-400 text-black font-extrabold text-[10px] tracking-wider uppercase transition-colors shrink-0 flex items-center gap-1 select-none focus:outline-none";
    btn.innerHTML = `<i class="fa-solid fa-book-bookmark"></i><span id="channelModeText">คู่มือออฟไลน์</span>`;
    input.placeholder = "พิมพ์ข้อความค้นหาคู่มือ...";
    sendBtn.className = "p-2.5 bg-yellow-400 text-black font-black rounded-lg hover:bg-yellow-300 transition-colors text-xs flex items-center justify-center gap-1 shrink-0 focus:outline-none";
  }
}
window.toggleUnifiedChannel = toggleUnifiedChannel;

function handleUnifiedChatQuery() {
  const input = document.getElementById('unifiedChatInput');
  const val = input ? input.value.trim() : '';
  if (!val) return;

  if (unifiedChannel === 'mesh') {
    // Send Mesh Broadcast Message in Unified Feed
    appendMeshMessageToFeed('คุณ (ส่งผ่านวิทยุ Mesh)', val, 'ตอนนี้', true);
    input.value = '';
  } else {
    // Query Offline Manual Bot in Unified Feed
    handleManualQueryInUnified(val);
    input.value = '';
  }
}

function appendMeshMessageToFeed(sender, text, time, isUser) {
  const feed = document.getElementById('unifiedChatFeed');
  if (!feed) return;

  const msgDiv = document.createElement('div');
  if (isUser) {
    msgDiv.className = "p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 leading-relaxed text-slate-350";
    msgDiv.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-emerald-400 font-black"><i class="fa-solid fa-wifi text-[9px]"></i> \${sender}</span>
        <button onclick="pinMeshMessage('\${escapeHTML(text)}')" class="text-[9px] text-slate-500 hover:text-red-400 focus:outline-none flex items-center gap-0.5 select-none">
          <i class="fa-solid fa-thumbtack text-[8px]"></i> ปักหมุด
        </button>
      </div>
      <p class="mt-1 text-slate-100">\${escapeHTML(text)}</p>
      <span class="text-[8px] text-slate-500 font-mono block text-right mt-0.5">\${time}</span>
    `;
  } else {
    msgDiv.className = "p-2.5 rounded-xl bg-neutral-900 border border-slate-850 leading-relaxed text-slate-350";
    msgDiv.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-pink-400 font-bold"><i class="fa-solid fa-house-user text-[9px]"></i> \${sender}</span>
        <button onclick="pinMeshMessage('\${escapeHTML(text)}')" class="text-[9px] text-slate-500 hover:text-red-400 focus:outline-none flex items-center gap-0.5 select-none">
          <i class="fa-solid fa-thumbtack text-[8px]"></i> ปักหมุด
        </button>
      </div>
      <p class="mt-1 text-slate-100">\${escapeHTML(text)}</p>
      <span class="text-[8px] text-slate-500 font-mono block text-right mt-0.5">\${time}</span>
    `;
  }

  feed.appendChild(msgDiv);
  feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });

  if (isUser) {
    const unifiedStatusAlert = document.getElementById('unifiedStatusAlert');
    if (unifiedStatusAlert) {
      unifiedStatusAlert.classList.remove('hidden');
      setTimeout(() => {
        unifiedStatusAlert.classList.add('hidden');
      }, 4000);
    }
  }
}

function handleManualQueryInUnified(queryText) {
  const queryLower = queryText.toLowerCase();
  let matchedKeys = [];

  for (const [key, config] of Object.entries(chatbotDatabase)) {
    const isMatched = config.synonyms.some(keyword => queryLower.includes(keyword));
    if (isMatched) {
      matchedKeys.push(key);
    }
  }

  if (matchedKeys.length === 1) {
    handleBotQueryInUnified(matchedKeys[0], queryText);
  } else if (matchedKeys.length > 1) {
    triggerMultiMatchResponseInUnified(queryText, matchedKeys);
  } else {
    triggerOfflineFallbackResponseInUnified(queryText);
  }
}

function handleBotQueryInUnified(queryKey, rawQuery) {
  const data = chatbotDatabase[queryKey];
  if (!data) return;

  const feed = document.getElementById('unifiedChatFeed');
  if (!feed) return;

  // Add user query bubble
  const userMsgNode = document.createElement('div');
  userMsgNode.className = "flex items-start gap-2.5 justify-end";
  userMsgNode.innerHTML = `
    <div class="bg-yellow-400 text-black font-extrabold px-3 py-2 rounded-2xl rounded-tr-none text-xs md:text-sm shadow-md">
      ค้นหา: "\${escapeHTML(rawQuery)}"
    </div>
  `;
  feed.appendChild(userMsgNode);
  feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });

  // Create Bot Answer Node container
  const botMsgNode = document.createElement('div');
  botMsgNode.className = "flex items-start gap-2.5";
  
  const avatarNode = document.createElement('div');
  avatarNode.className = "w-6 h-6 rounded-md bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-[10px] shrink-0 mt-0.5";
  avatarNode.innerText = "📟";
  botMsgNode.appendChild(avatarNode);

  const textBubble = document.createElement('div');
  textBubble.className = "bg-neutral-900 border border-slate-800 text-yellow-400 p-3.5 rounded-2xl rounded-tl-none max-w-[90%] text-xs md:text-sm font-light leading-relaxed tracking-wide space-y-2.5";
  
  const titleNode = document.createElement('div');
  titleNode.className = "text-white font-extrabold border-b border-slate-800 pb-1.5 flex items-center gap-1.5";
  titleNode.innerText = data.title;
  textBubble.appendChild(titleNode);

  const stepsDiv = document.createElement('div');
  stepsDiv.className = "space-y-2";
  textBubble.appendChild(stepsDiv);
  botMsgNode.appendChild(textBubble);
  feed.appendChild(botMsgNode);

  let currentStepIndex = 0;
  function typeStep() {
    if (currentStepIndex >= data.steps.length) {
      feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });
      return;
    }

    const stepText = data.steps[currentStepIndex];
    const stepParagraph = document.createElement('p');
    stepParagraph.className = "opacity-0 transition-opacity duration-300 text-[11px] leading-relaxed text-slate-200 border-l-2 border-yellow-400/40 pl-2";
    stepsDiv.appendChild(stepParagraph);

    let charIndex = 0;
    stepParagraph.classList.remove('opacity-0');

    function typeChar() {
      if (charIndex < stepText.length) {
        stepParagraph.textContent += stepText.charAt(charIndex);
        charIndex++;
        feed.scrollTop = feed.scrollHeight;
        setTimeout(typeChar, 4);
      } else {
        currentStepIndex++;
        setTimeout(typeStep, 60);
      }
    }
    typeChar();
  }
  setTimeout(typeStep, 250);
}

function triggerMultiMatchResponseInUnified(userQuery, matchedKeys) {
  const feed = document.getElementById('unifiedChatFeed');
  if (!feed) return;

  const userMsgNode = document.createElement('div');
  userMsgNode.className = "flex items-start gap-2.5 justify-end";
  userMsgNode.innerHTML = `
    <div class="bg-yellow-400 text-black font-extrabold px-3 py-2 rounded-2xl rounded-tr-none text-xs md:text-sm shadow-md">
      ค้นหา: "\${escapeHTML(userQuery)}"
    </div>
  `;
  feed.appendChild(userMsgNode);
  feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });

  const botMsgNode = document.createElement('div');
  botMsgNode.className = "flex items-start gap-2.5";

  const avatarNode = document.createElement('div');
  avatarNode.className = "w-6 h-6 rounded-md bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-[10px] shrink-0 mt-0.5";
  avatarNode.innerText = "📟";
  botMsgNode.appendChild(avatarNode);

  const textBubble = document.createElement('div');
  textBubble.className = "bg-neutral-900 border border-slate-800 text-yellow-400 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-xs md:text-sm font-light leading-relaxed tracking-wide space-y-2";
  
  const titleNode = document.createElement('div');
  titleNode.className = "text-white font-extrabold border-b border-slate-800 pb-1 flex items-center gap-1.5";
  titleNode.innerText = "🔎 ผลการค้นหาคู่มือออฟไลน์";
  textBubble.appendChild(titleNode);

  const descNode = document.createElement('p');
  descNode.className = "text-slate-350 text-xs";
  descNode.innerText = `พบข้อมูลที่เกี่ยวข้องกับ "\${userQuery}" ทั้งหมด \${matchedKeys.length} รายการ โปรดแตะเลือกหัวข้อที่คุณต้องการอ่านด้านล่าง:`;
  textBubble.appendChild(descNode);

  const btnsDiv = document.createElement('div');
  btnsDiv.className = "flex flex-col gap-1.5 pt-1.5";
  
  matchedKeys.forEach(topicKey => {
    const topic = chatbotDatabase[topicKey];
    if (!topic) return;

    const btn = document.createElement('button');
    btn.className = "w-full text-left py-2 px-3 rounded-lg bg-slate-950 border border-slate-850 text-[11px] font-semibold text-slate-200 hover:border-yellow-400 hover:text-yellow-400 transition-all focus:outline-none";
    btn.innerHTML = topic.title;
    btn.onclick = () => handleBotQueryInUnified(topicKey, topic.title.substring(2));
    btnsDiv.appendChild(btn);
  });

  textBubble.appendChild(btnsDiv);
  botMsgNode.appendChild(textBubble);
  feed.appendChild(botMsgNode);
  feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });
}

function triggerOfflineFallbackResponseInUnified(userQuery) {
  const feed = document.getElementById('unifiedChatFeed');
  if (!feed) return;

  const userMsgNode = document.createElement('div');
  userMsgNode.className = "flex items-start gap-2.5 justify-end";
  userMsgNode.innerHTML = `
    <div class="bg-yellow-400 text-black font-extrabold px-3 py-2 rounded-2xl rounded-tr-none text-xs md:text-sm shadow-md">
      ค้นหา: "\${escapeHTML(userQuery)}"
    </div>
  `;
  feed.appendChild(userMsgNode);
  feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });

  const botMsgNode = document.createElement('div');
  botMsgNode.className = "flex items-start gap-2.5";

  const avatarNode = document.createElement('div');
  avatarNode.className = "w-6 h-6 rounded-md bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-[10px] shrink-0 mt-0.5";
  avatarNode.innerText = "📟";
  botMsgNode.appendChild(avatarNode);

  const textBubble = document.createElement('div');
  textBubble.className = "bg-neutral-900 border border-slate-800 text-yellow-400 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-xs md:text-sm font-light leading-relaxed tracking-wide space-y-2";
  
  const titleNode = document.createElement('div');
  titleNode.className = "text-white font-extrabold border-b border-slate-800 pb-1 flex items-center gap-1.5";
  titleNode.innerText = "📟 ไม่พบข้อมูลคู่มือในระบบ";
  textBubble.appendChild(titleNode);

  const stepsDiv = document.createElement('div');
  stepsDiv.className = "space-y-2 text-slate-350 text-xs";
  textBubble.appendChild(stepsDiv);
  botMsgNode.appendChild(textBubble);
  feed.appendChild(botMsgNode);

  const fallbackSteps = [
    `ไม่พบข้อมูลที่ตรงกับ "\${userQuery}" ในระบบคีย์เวิร์ดออฟไลน์`,
    `โปรดแตะปุ่มหมวดหมู่ด่วนด้านบน หรือพิมพ์คำค้นหาภัยกู้ภัย เช่น:`,
    `• "ไฟดูด", "คัตเอาต์" หรือ "แผล"`,
    `• "อพยพ", "สัตว์มีพิษ" หรือ "น้ำดื่ม"`,
    `• "ส้วม", "โรงพยาบาล" หรือ "บางพลัด"`
  ];

  let currentStepIndex = 0;
  function typeStep() {
    if (currentStepIndex >= fallbackSteps.length) {
      feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });
      return;
    }

    const stepText = fallbackSteps[currentStepIndex];
    const stepParagraph = document.createElement('p');
    stepParagraph.className = "opacity-0 transition-opacity duration-300";
    stepsDiv.appendChild(stepParagraph);

    let charIndex = 0;
    stepParagraph.classList.remove('opacity-0');

    function typeChar() {
      if (charIndex < stepText.length) {
        stepParagraph.textContent += stepText.charAt(charIndex);
        charIndex++;
        feed.scrollTop = feed.scrollHeight;
        setTimeout(typeChar, 8);
      } else {
        stepParagraph.className += " mb-2 last:mb-0";
        currentStepIndex++;
        setTimeout(typeStep, 80);
      }
    }
    typeChar();
  }
  setTimeout(typeStep, 250);
}

function handleCategoryQueryInUnified(categoryKey) {
  const cat = categories[categoryKey];
  if (!cat) return;

  const feed = document.getElementById('unifiedChatFeed');
  if (!feed) return;

  const userMsgNode = document.createElement('div');
  userMsgNode.className = "flex items-start gap-2.5 justify-end";
  userMsgNode.innerHTML = `
    <div class="bg-yellow-400 text-black font-extrabold px-3 py-2 rounded-2xl rounded-tr-none text-xs md:text-sm shadow-md">
      หมวด: \${cat.name}
    </div>
  `;
  feed.appendChild(userMsgNode);
  feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });

  const botMsgNode = document.createElement('div');
  botMsgNode.className = "flex items-start gap-2.5";

  const avatarNode = document.createElement('div');
  avatarNode.className = "w-6 h-6 rounded-md bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-[10px] shrink-0 mt-0.5";
  avatarNode.innerText = "📟";
  botMsgNode.appendChild(avatarNode);

  const textBubble = document.createElement('div');
  textBubble.className = "bg-neutral-900 border border-slate-800 text-yellow-400 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-xs md:text-sm font-light leading-relaxed tracking-wide space-y-2";
  
  const titleNode = document.createElement('div');
  titleNode.className = "text-white font-extrabold border-b border-slate-800 pb-1.5 flex items-center gap-1.5";
  titleNode.innerText = `📖 เลือกหัวข้อย่อยในหมวด \${cat.name.split(' ').pop()}`;
  textBubble.appendChild(titleNode);

  const descNode = document.createElement('p');
  descNode.className = "text-slate-350 text-xs";
  descNode.innerText = "พบหัวข้อคำแนะนำที่เป็นประโยชน์ออฟไลน์ดังต่อไปนี้ โปรดแตะเลือกเพื่อเปิดอ่านคำแนะนำ:";
  textBubble.appendChild(descNode);

  const btnsDiv = document.createElement('div');
  btnsDiv.className = "flex flex-col gap-1.5 pt-1.5";
  
  cat.topics.forEach(topicKey => {
    const topic = chatbotDatabase[topicKey];
    if (!topic) return;

    const btn = document.createElement('button');
    btn.className = "w-full text-left py-2 px-3 rounded-lg bg-slate-950 border border-slate-850 text-[11px] font-semibold text-slate-200 hover:border-yellow-400 hover:text-yellow-400 transition-all focus:outline-none";
    btn.innerHTML = topic.title;
    btn.onclick = () => handleBotQueryInUnified(topicKey, topic.title.substring(2));
    btnsDiv.appendChild(btn);
  });

  textBubble.appendChild(btnsDiv);
  botMsgNode.appendChild(textBubble);
  feed.appendChild(botMsgNode);
  feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });
}

function handleCategoryQuery(categoryKey) {
  if (isOffline) {
    handleCategoryQueryInUnified(categoryKey);
    return;
  }
  const cat = categories[categoryKey];
  if (!cat) return;

  const userMsgNode = document.createElement('div');
  userMsgNode.className = "flex items-start gap-2.5 justify-end";
  userMsgNode.innerHTML = `
    <div class="bg-yellow-400 text-black font-extrabold px-3 py-2 rounded-2xl rounded-tr-none text-xs md:text-sm shadow-md">
      หมวด: \${cat.name}
    </div>
  `;
  dynamicChatContainer.appendChild(userMsgNode);
  chatTerminal.scrollTo({ top: chatTerminal.scrollHeight, behavior: 'smooth' });

  const botMsgNode = document.createElement('div');
  botMsgNode.className = "flex items-start gap-2.5";

  const avatarNode = document.createElement('div');
  avatarNode.className = "w-6 h-6 rounded-md bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-[10px] shrink-0 mt-0.5";
  avatarNode.innerText = "📟";
  botMsgNode.appendChild(avatarNode);

  const textBubble = document.createElement('div');
  textBubble.className = "bg-neutral-900 border border-slate-800 text-yellow-400 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-xs md:text-sm font-light leading-relaxed tracking-wide space-y-2";
  
  const titleNode = document.createElement('div');
  titleNode.className = "text-white font-extrabold border-b border-slate-800 pb-1.5 flex items-center gap-1.5";
  titleNode.innerText = `📖 เลือกหัวข้อย่อยในหมวด \${cat.name.split(' ').pop()}`;
  textBubble.appendChild(titleNode);

  const descNode = document.createElement('p');
  descNode.className = "text-slate-350 text-xs";
  descNode.innerText = "พบหัวข้อคำแนะนำในการรับมือภัยพิบัติที่เป็นประโยชน์แบบออฟไลน์ดังต่อไปนี้ โปรดแตะเลือกหัวข้อเพื่อเปิดอ่านคำแนะนำปฏิบัติการจริงโดยละเอียด:";
  textBubble.appendChild(descNode);

  const btnsDiv = document.createElement('div');
  btnsDiv.className = "flex flex-col gap-1.5 pt-1.5";
  
  cat.topics.forEach(topicKey => {
    const topic = chatbotDatabase[topicKey];
    if (!topic) return;

    const btn = document.createElement('button');
    btn.className = "w-full text-left py-2 px-3 rounded-lg bg-slate-950 border border-slate-850 text-[11px] font-semibold text-slate-200 hover:border-yellow-400 hover:text-yellow-400 transition-all focus:outline-none";
    btn.innerHTML = topic.title;
    btn.onclick = () => handleBotQuery(topicKey);
    btnsDiv.appendChild(btn);
  });

  textBubble.appendChild(btnsDiv);
  botMsgNode.appendChild(textBubble);
  dynamicChatContainer.appendChild(botMsgNode);
  chatTerminal.scrollTo({ top: chatTerminal.scrollHeight, behavior: 'smooth' });
}
window.handleCategoryQuery = handleCategoryQuery;

function handleBotQuery(queryKey) {
  const data = chatbotDatabase[queryKey];
  if (!data) return;

  const userMsgNode = document.createElement('div');
  userMsgNode.className = "flex items-start gap-2.5 justify-end";
  userMsgNode.innerHTML = `
    <div class="bg-yellow-400 text-black font-extrabold px-3 py-2 rounded-2xl rounded-tr-none text-xs md:text-sm shadow-md animate-pulse">
      อ่านคู่มือ: \${data.title.substring(2)}
    </div>
  `;
  dynamicChatContainer.appendChild(userMsgNode);
  chatTerminal.scrollTo({ top: chatTerminal.scrollHeight, behavior: 'smooth' });

  const botMsgNode = document.createElement('div');
  botMsgNode.className = "flex items-start gap-2.5";
  
  const avatarNode = document.createElement('div');
  avatarNode.className = "w-6 h-6 rounded-md bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-[10px] shrink-0 mt-0.5";
  avatarNode.innerText = "📟";
  botMsgNode.appendChild(avatarNode);

  const textBubble = document.createElement('div');
  textBubble.className = "bg-neutral-900 border border-slate-800 text-yellow-400 p-3.5 rounded-2xl rounded-tl-none max-w-[90%] text-xs md:text-sm font-light leading-relaxed tracking-wide space-y-2.5";
  
  const titleNode = document.createElement('div');
  titleNode.className = "text-white font-extrabold border-b border-slate-800 pb-1.5 flex items-center gap-1.5";
  titleNode.innerText = data.title;
  textBubble.appendChild(titleNode);

  const stepsDiv = document.createElement('div');
  stepsDiv.className = "space-y-2";
  textBubble.appendChild(stepsDiv);
  botMsgNode.appendChild(textBubble);
  dynamicChatContainer.appendChild(botMsgNode);

  let currentStepIndex = 0;
  function typeStep() {
    if (currentStepIndex >= data.steps.length) {
      chatTerminal.scrollTo({ top: chatTerminal.scrollHeight, behavior: 'smooth' });
      return;
    }

    const stepText = data.steps[currentStepIndex];
    const stepParagraph = document.createElement('p');
    stepParagraph.className = "opacity-0 transition-opacity duration-300 text-[11px] leading-relaxed text-slate-200 border-l-2 border-yellow-400/40 pl-2";
    stepsDiv.appendChild(stepParagraph);

    let charIndex = 0;
    stepParagraph.classList.remove('opacity-0');

    function typeChar() {
      if (charIndex < stepText.length) {
        stepParagraph.textContent += stepText.charAt(charIndex);
        charIndex++;
        chatTerminal.scrollTop = chatTerminal.scrollHeight;
        setTimeout(typeChar, 4);
      } else {
        currentStepIndex++;
        setTimeout(typeStep, 60);
      }
    }
    typeChar();
  }
  setTimeout(typeStep, 250);
}

function handleCustomOfflineQuery() {
  const queryText = offlineChatInput.value.trim();
  if (!queryText) return;

  const queryLower = queryText.toLowerCase();
  let matchedKeys = [];
  for (const [key, config] of Object.entries(chatbotDatabase)) {
    const isMatched = config.synonyms.some(keyword => queryLower.includes(keyword));
    if (isMatched) {
      matchedKeys.push(key);
    }
  }

  if (matchedKeys.length === 1) {
    handleBotQuery(matchedKeys[0]);
  } else if (matchedKeys.length > 1) {
    triggerMultiMatchResponse(queryText, matchedKeys);
  } else {
    triggerOfflineFallbackResponse(queryText);
  }
  offlineChatInput.value = '';
}

function matchesKeywords(input, keywords) {
  return keywords.some(keyword => input.includes(keyword));
}

function triggerMultiMatchResponse(userQuery, matchedKeys) {
  const userMsgNode = document.createElement('div');
  userMsgNode.className = "flex items-start gap-2.5 justify-end";
  userMsgNode.innerHTML = `
    <div class="bg-yellow-400 text-black font-extrabold px-3 py-2 rounded-2xl rounded-tr-none text-xs md:text-sm shadow-md">
      ค้นหา: "\${escapeHTML(userQuery)}"
    </div>
  `;
  dynamicChatContainer.appendChild(userMsgNode);
  chatTerminal.scrollTo({ top: chatTerminal.scrollHeight, behavior: 'smooth' });

  const botMsgNode = document.createElement('div');
  botMsgNode.className = "flex items-start gap-2.5";

  const avatarNode = document.createElement('div');
  avatarNode.className = "w-6 h-6 rounded-md bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-[10px] shrink-0 mt-0.5";
  avatarNode.innerText = "📟";
  botMsgNode.appendChild(avatarNode);

  const textBubble = document.createElement('div');
  textBubble.className = "bg-neutral-900 border border-slate-800 text-yellow-400 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-xs md:text-sm font-light leading-relaxed tracking-wide space-y-2";
  
  const titleNode = document.createElement('div');
  titleNode.className = "text-white font-extrabold border-b border-slate-800 pb-1 flex items-center gap-1.5";
  titleNode.innerText = "🔎 ผลการค้นหาคู่มือออฟไลน์";
  textBubble.appendChild(titleNode);

  const descNode = document.createElement('p');
  descNode.className = "text-slate-350 text-xs";
  descNode.innerText = `พบข้อมูลที่เกี่ยวข้องกับ "\${userQuery}" ทั้งหมด 	ext{\${matchedKeys.length}} รายการ โปรดแตะเลือกหัวข้อที่คุณต้องการอ่านด้านล่าง:`;
  textBubble.appendChild(descNode);

  const btnsDiv = document.createElement('div');
  btnsDiv.className = "flex flex-col gap-1.5 pt-1.5";
  
  matchedKeys.forEach(topicKey => {
    const topic = chatbotDatabase[topicKey];
    if (!topic) return;

    const btn = document.createElement('button');
    btn.className = "w-full text-left py-2 px-3 rounded-lg bg-slate-950 border border-slate-850 text-[11px] font-semibold text-slate-200 hover:border-yellow-400 hover:text-yellow-400 transition-all focus:outline-none";
    btn.innerHTML = topic.title;
    btn.onclick = () => handleBotQuery(topicKey);
    btnsDiv.appendChild(btn);
  });

  textBubble.appendChild(btnsDiv);
  botMsgNode.appendChild(textBubble);
  dynamicChatContainer.appendChild(botMsgNode);
  chatTerminal.scrollTo({ top: chatTerminal.scrollHeight, behavior: 'smooth' });
}

function triggerOfflineFallbackResponse(userQuery) {
  const userMsgNode = document.createElement('div');
  userMsgNode.className = "flex items-start gap-2.5 justify-end";
  userMsgNode.innerHTML = `
    <div class="bg-yellow-400 text-black font-extrabold px-3 py-2 rounded-2xl rounded-tr-none text-xs md:text-sm shadow-md">
      ค้นหา: "\${escapeHTML(userQuery)}"
    </div>
  `;
  dynamicChatContainer.appendChild(userMsgNode);
  chatTerminal.scrollTo({ top: chatTerminal.scrollHeight, behavior: 'smooth' });

  const botMsgNode = document.createElement('div');
  botMsgNode.className = "flex items-start gap-2.5";

  const avatarNode = document.createElement('div');
  avatarNode.className = "w-6 h-6 rounded-md bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-[10px] shrink-0 mt-0.5";
  avatarNode.innerText = "📟";
  botMsgNode.appendChild(avatarNode);

  const textBubble = document.createElement('div');
  textBubble.className = "bg-neutral-900 border border-slate-800 text-yellow-400 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-xs md:text-sm font-light leading-relaxed tracking-wide space-y-2";
  
  const titleNode = document.createElement('div');
  titleNode.className = "text-white font-extrabold border-b border-slate-800 pb-1 flex items-center gap-1.5";
  titleNode.innerText = "📟 ไม่พบข้อมูลคู่มือในระบบ";
  textBubble.appendChild(titleNode);

  const stepsDiv = document.createElement('div');
  stepsDiv.className = "space-y-2 text-slate-350 text-xs";
  textBubble.appendChild(stepsDiv);
  botMsgNode.appendChild(textBubble);
  dynamicChatContainer.appendChild(botMsgNode);

  const fallbackSteps = [
    `ไม่พบข้อมูลที่จัดคีย์เวิร์ดตรงกับ "\${userQuery}" คลังข้อมูลออฟไลน์ในเครื่องจัดเก็บคำแนะนำกู้ภัยหลัก 13 หมวดหมู่สำคัญ`,
    `โปรดแตะเลือกตามหมวดหมู่ด้านล่าง (ใต้ช่องพิมพ์แชท) หรือลองพิมพ์ค้นหาคีย์เวิร์ดกู้ภัยทางกายภาพเด่นๆ เช่น:`,
    `• "ไฟดูด", "คัตเอาต์" หรือ "แผล"`,
    `• "อพยพ", "สัตว์มีพิษ" หรือ "น้ำดื่ม"`,
    `• "ส้วม", "โรงพยาบาล" หรือ "บางพลัด"`
  ];

  let currentStepIndex = 0;
  function typeStep() {
    if (currentStepIndex >= fallbackSteps.length) {
      chatTerminal.scrollTo({ top: chatTerminal.scrollHeight, behavior: 'smooth' });
      return;
    }

    const stepText = fallbackSteps[currentStepIndex];
    const stepParagraph = document.createElement('p');
    stepParagraph.className = "opacity-0 transition-opacity duration-300";
    stepsDiv.appendChild(stepParagraph);

    let charIndex = 0;
    stepParagraph.classList.remove('opacity-0');

    function typeChar() {
      if (charIndex < stepText.length) {
        stepParagraph.textContent += stepText.charAt(charIndex);
        charIndex++;
        chatTerminal.scrollTop = chatTerminal.scrollHeight;
        setTimeout(typeChar, 8);
      } else {
        stepParagraph.className += " mb-2 last:mb-0";
        currentStepIndex++;
        setTimeout(typeStep, 80);
      }
    }
    typeChar();
  }
  setTimeout(typeStep, 250);
}
window.handleBotQuery = handleBotQuery;

async function startTorch() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    const track = videoStream.getVideoTracks()[0];
    if (track) {
      const capabilities = track.getCapabilities();
      if (capabilities.torch) {
        torchTrack = track;
      }
    }
  } catch (err) {}
}

async function stopTorch() {
  if (torchTrack) {
    try {
      await torchTrack.applyConstraints({ advanced: [{ torch: false }] });
    } catch (e) {}
    torchTrack = null;
  }
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
    videoStream = null;
  }
}

function setTorchState(state) {
  if (torchTrack) {
    torchTrack.applyConstraints({
      advanced: [{ torch: state }]
    }).catch(err => {});
  }
}

function playMorsePattern() {
  if (!sosActive) return;
  const current = morsePattern[patternIndex];
  if (current.state) {
    sosOverlay.classList.remove('bg-black');
    sosOverlay.classList.add('bg-white');
    sosOverlayText.className = "text-5xl font-black tracking-widest text-black transition-colors duration-100 scale-105";
    setTorchState(true); 
  } else {
    sosOverlay.classList.remove('bg-white');
    sosOverlay.classList.add('bg-black');
    sosOverlayText.className = "text-5xl font-black tracking-widest text-red-600 transition-colors duration-100 scale-100";
    setTorchState(false); 
  }
  patternIndex = (patternIndex + 1) % morsePattern.length;
  currentMorseTimeout = setTimeout(playMorsePattern, current.duration);
}

async function startSOSBeacon() {
  sosActive = true;
  patternIndex = 0;
  sosOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; 
  await startTorch();
  playMorsePattern();
}

function stopSOSBeacon() {
  sosActive = false;
  clearTimeout(currentMorseTimeout);
  stopTorch();
  sosOverlay.classList.add('hidden');
  sosOverlay.classList.remove('bg-white');
  sosOverlay.classList.add('bg-black');
  document.body.style.overflow = ''; 
}
window.stopSOSBeacon = stopSOSBeacon;

function sendMeshMessage() {
  const text = meshChatInput.value.trim();
  if (!text) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = "p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 leading-relaxed text-slate-350";
  msgDiv.innerHTML = `
    <div class="flex items-center justify-between">
      <span class="text-emerald-400 font-black"><i class="fa-solid fa-wifi text-[9px]"></i> คุณ (ส่งผ่านวิทยุ Mesh)</span>
      <button onclick="pinMeshMessage('\${escapeHTML(text)}')" class="text-[9px] text-slate-500 hover:text-red-400 focus:outline-none flex items-center gap-0.5 select-none">
        <i class="fa-solid fa-thumbtack text-[8px]"></i> ปักหมุด
      </button>
    </div>
    <p class="mt-1 text-slate-100">\${escapeHTML(text)}</p>
    <span class="text-[8px] text-slate-500 font-mono block text-right mt-0.5">ตอนนี้</span>
  `;
  meshChatFeed.appendChild(msgDiv);
  meshChatInput.value = '';
  meshChatFeed.scrollTo({ top: meshChatFeed.scrollHeight, behavior: 'smooth' });

  meshStatusAlert.classList.remove('hidden');
  setTimeout(() => {
    meshStatusAlert.classList.add('hidden');
  }, 4000);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function startLiveSensorsSimulation() {
  const waterValElement = document.querySelector('h3.text-3xl.font-extrabold.text-white');
  const lastUpdatedTextNode = document.querySelector('p.text-\[9px\].text-slate-400.font-bold.mt-0.5');
  if (!waterValElement) return;

  let baseWaterLevel = 2.50;
  let secondsAgo = 0;

  setInterval(() => {
    secondsAgo++;
    if (lastUpdatedTextNode) {
      lastUpdatedTextNode.textContent = `สถานี C.29A (อัปเดตเมื่อ \${secondsAgo} วินาทีที่แล้ว)`;
    }
    if (secondsAgo % 4 === 0) {
      const delta = (Math.random() * 0.04 - 0.02); 
      const currentLevel = (baseWaterLevel + delta).toFixed(2);
      waterValElement.innerHTML = `\${currentLevel}<span class="text-lg font-bold text-slate-400">m</span>`;
      secondsAgo = 0; 
    }
  }, 1000);
}
