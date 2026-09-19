// ============================================================
// 江湖侠客成长模拟器 — 七身份专属修行（按身份生成）
// 每种身份有专属：晨修(mornings) / 本业(cores) / 修身(bodies) / 心法(wisdoms) / 江湖事(events)
// 切换身份，当日修行内容随之而变；属性成长亦随身份而异
// ============================================================

const JIANGHU_IDENTITY_CULTIVATION = {

  // ========== 江湖游侠 ==========
  youxia: {
    mornings: [
      { type:'行路', title:'晓行山路', imageKey:'bamboo',
        desc:'天未明，你束紧行囊，独上青岭。\n露重苔滑，石阶生凉。\n你一步步踩着前人足迹，也踩出自己的路。\n\n行至半坡，遇一樵夫歇担。他指远处云深处：『那厢有匪，少侠留意。』\n你谢过，手按剑柄，神色自若。\n\n游侠之路，从无坦途。\n正因如此，每一步才作数。\n你迎风而行，衣袂翻飞如旗。',
        effects:{ xiaoyi:2, wuli:2, xinjing:1 } },
      { type:'探看', title:'市井访闻', imageKey:'inn',
        desc:'你混入市集，茶棚酒肆皆是你耳目。\n卖花翁说东街米贵，渔家女说西河舟沉，乞儿说县衙夜里抬出一口箱。\n\n你将零碎之言拼成一幅江湖图。\n游侠之智，不在书斋，在人心。\n谁有冤，谁藏刀，谁在笑里藏刀——你听得出。\n\n日暮归去，你已在心中记下三桩待查之事。',
        effects:{ zhihui:2, xiaoyi:2, caiyi:1 } },
      { type:'仗义', title:'路见不平', imageKey:'sword',
        desc:'桥头恶仆正欺一老妪，抢她最后一枚铜钱。\n你未及多想，已挡在二人之间。\n\n『光天化日，欺老弱算什么好汉。』\n恶仆拔拳，你侧身一让，反手将他按在墙上。\n围观者喝彩，老妪千恩万谢。\n\n你扶起她：『江湖儿女，本该如此。』\n侠义不是口号，是出手的那一瞬。',
        effects:{ xiaoyi:4, wuli:1 } }
    ],
    cores: [
      { type:'行侠', title:'夜探匪窟', imageKey:'sword',
        desc:'你循线索入山贼巢穴，借月色潜行。\n草垛后听得分赃密语，记下落款印信。\n\n正欲退出，忽被巡夜察觉。\n你屏息贴壁，心跳如鼓，却不动如山。\n待其远去，你如狸猫般逸去，怀里已多一卷账册。\n\n明早，这账册便是救人的凭据。\n游侠的剑，先救人，后扬名。',
        effects:{ xiaoyi:3, wuli:2, zhihui:1 } },
      { type:'结义', title:'义结陌路', imageKey:'inn',
        desc:'酒肆中，你与一落难书生同桌。\n他盘缠被劫，欲投亲不得。\n你解囊相助，又授他防身三招。\n\n书生泣拜：『他日若有寸进，必报兄恩。』\n你笑：『江湖相逢，便是缘。报什么。』\n\n你知，今日种下的善意，\n他年或成一柄护你之盾。\n游侠的江湖，是用义气垒起来的。',
        effects:{ xiaoyi:3, caiyi:1, xinjing:1 } },
      { type:'追凶', title:'千里追迹', imageKey:'observe',
        desc:'为查一桩旧案，你循马蹄印追出三百里。\n风餐露宿，鞋底磨穿，不改其志。\n\n至一渡口，船夫认得那匹黑马：『三日前过江去了。』\n你望对岸烟柳，眼中火未熄。\n\n游侠最重一个『信』字——\n答应了的事，便是刀山也要去。\n你登船，江风满袖。',
        effects:{ zhihui:2, wuli:2, xiaoyi:1 } }
    ],
    bodies: [
      { type:'身手', title:'听风辨形', imageKey:'bamboo',
        desc:'你蒙眼立于竹林，听风辨物。\n师言：高手之战，先听其息，后见其形。\n\n一片竹叶落，你知风向；一步轻响，你知来敌方位。\n半个时辰，你竟能于暗中接住同门掷来的十粒石子。\n\n耳力既成，身法自快。\n游侠保命，靠的从不是蛮力。',
        effects:{ wuli:3, xinjing:1 } },
      { type:'轻功', title:'踏檐走壁', imageKey:'sword',
        desc:'你于夜市屋脊间腾挪，如履平地。\n瓦上无声，影过无痕。\n\n俯看人间灯火，你忽觉——\n所谓逍遥，不过是不被任何墙困住。\n\n落地时，一更鼓响。\n你笑：『这身轻功，今日算成了三分。』',
        effects:{ wuli:3, caiyi:1 } }
    ],
    wisdoms: [
      { type:'心法', title:'义利之辨', imageKey:'inner',
        desc:'灯下，你读《游侠列传》。\n司马迁写郭解：『振人不赡，先从贫贱始。』\n\n你悟：真侠者，救人不为名，济贫不图报。\n若救人只为扬名，那便与恶霸无异——\n不过换了个好听的名号。\n\n你将『无名』二字刻于剑鞘。',
        effects:{ xiaoyi:3, xinjing:2 } },
      { type:'心法', title:'自由之重', imageKey:'observe',
        desc:'你坐看笼中鸟，忽有所感。\n鸟失自由便失了神采，人若被名缰利锁，亦然。\n\n游侠之自由，是用孤独换的。\n你甘否？你答：甘。\n\n因为唯有自由身，\n才能在他人落难时，说一句『我来』。',
        effects:{ xinjing:3, zhihui:1 } },
      { type:'心法', title:'恩怨分明', imageKey:'taiji',
        desc:'老丐授你一饭之恩，你记三年；\n恶霸辱你之仇，你亦记三年，却未报。\n\n你问己：为何不报？\n答：恩要涌泉，怨要随风。\n纠缠于怨，便是把别人的错，\n活成了自己的牢。\n\n你学会：记恩，忘怨。',
        effects:{ xinjing:2, xiaoyi:2 } }
    ],
    events: [
      { title:'桥头惩恶', imageKey:'sword',
        narrative:'你再过旧桥，那恶仆竟带兄弟来寻仇。桥上围了数十人，指你欺行霸市。',
        choices:[
          { text:'当场揭其旧恶，还老妪清白', result:'你当众说出前情，围观者倒戈，恶仆狼狈而逃。老妪含泪递来热粥。', effects:{ xiaoyi:3, zhihui:1 } },
          { text:'不与纠缠，飘然离去', result:'你笑一声，踏栏杆而过，留众人面面相觑。是非留与后人说。', effects:{ xinjing:2, wuli:1 } }
        ] },
      { title:'异乡遇故', imageKey:'inn',
        narrative:'千里外客栈，你竟遇去岁救过的书生，如今已中举人，执意要谢。',
        choices:[
          { text:'坦然受其一拜，赠言勉励', result:'你受拜，嘱他『做了官，莫忘桥下人』。书生肃然记之。', effects:{ xiaoyi:2, xueshi:1 } },
          { text:'不认旧恩，夜半悄悄离去', result:'你留银两压于枕下，趁夜去也。恩不求报，方是游侠。', effects:{ xiaoyi:2, xinjing:1 } }
        ] },
      { title:'孤村送信', imageKey:'stream',
        narrative:'暴雨冲断官道，一村被困，你受托冒雨送求救信出山。',
        choices:[
          { text:'涉水攀崖，星夜送达', result:'你浑身泥泞抵县衙，信到，兵发。村中百口得救，无人知是你。', effects:{ xiaoyi:3, wuli:2 } },
          { text:'先护送村中老弱至高处', result:'你舍送信而先救人，虽误了时限，却无一人伤亡。你自担责。', effects:{ xiaoyi:3, xinjing:1 } }
        ] }
    ]
  },

  // ========== 世家弟子 ==========
  shijia: {
    mornings: [
      { type:'家训', title:'晨诵祖训', imageKey:'reading',
        desc:'卯时，你于祠堂前跪诵家训。\n『忠厚传家，诗书继世。』八字，祖辈刻于照壁。\n\n你一字一字念，念的是规，也是枷。\n世家子弟，生来便背着一座祠堂。\n\n但你渐懂：枷锁亦可成铠甲——\n因有此训，你待人自有分寸，临事自有根基。',
        effects:{ xueshi:2, zhihui:2, xiaoyi:1 } },
      { type:'骑射', title:'演武场上', imageKey:'sword',
        desc:'你披祖传软甲，于演武场驰马试箭。\n三箭连珠，皆中红心。教头颔首：『虎父无犬子。』\n\n你却想起：祖父当年一箭定边城。\n你差的，不是手，是那份临危不乱的胆。\n\n下马时，你暗誓：不负此甲，不负此姓。',
        effects:{ wuli:3, xinjing:1 } },
      { type:'理账', title:'清点族产', imageKey:'calligraphy',
        desc:'你于账房核对田庄租册，朱笔点过千亩良田。\n一笔错，便是百口饥寒。\n\n你方知：世家之『贵』，不在风光，\n在有人倚你而生。\n\n算至日斜，你抚账册：\n原来责任二字，重逾千斤。',
        effects:{ zhihui:2, caiyi:1, xueshi:1 } }
    ],
    cores: [
      { type:'家学', title:'演剑谱秘招', imageKey:'sword',
        desc:'你于密室展祖传剑谱，习那一招『回风落雁』。\n谱旁小注乃曾祖手笔：『此招非攻，乃护。』\n\n你悟：世家武学，重守成多于杀伐。\n剑出，是为护满门老小，非为扬名立万。\n\n你反复演练，直至剑随心动。',
        effects:{ wuli:3, xinjing:1, zhihui:1 } },
      { type:'交游', title:'接待宾客', imageKey:'inn',
        desc:'今日府中宴客，你执子弟之礼，周旋其间。\n一言一行，皆是门第脸面。\n\n你记下谁言诚恳，谁语藏锋。\n世家之子，从小便在人心这盘棋上学步。\n\n宴散，父亲难得一笑：『今日，你像样了。』',
        effects:{ zhihui:2, caiyi:2 } },
      { type:'治家', title:'裁断家务', imageKey:'taiji',
        desc:'两房争一爿铺面，闹至你前。\n你不以长房压人，反细查契据，公允分之。\n\n族人初不服，后服。\n你懂：治家如治国，公则立，私则崩。\n\n夜深，你于灯下记：『家不和，何以和天下。』',
        effects:{ zhihui:3, xiaoyi:1 } }
    ],
    bodies: [
      { type:'武学', title:'桩功筑基', imageKey:'bamboo',
        desc:'你扎马步于庭，半柱香不动如松。\n教头以竹竿轻点你膝：『世家武功，根基在正。』\n\n你汗落如雨，却觉一股沉稳自足底生起。\n那份稳，恰如你门第——不显山，却立得久。',
        effects:{ wuli:3, xinjing:1 } },
      { type:'武学', title:'夜巡府墙', imageKey:'moonNight',
        desc:'你披夜行衣巡府墙，防宵小亦防仇家。\n世家之富，常招祸端，故夜夜不可松懈。\n\n巡至角楼，你望见城中万家灯火。\n暗忖：这一墙之隔，护的是满门，也是这太平。',
        effects:{ wuli:2, xinjing:2 } }
    ],
    wisdoms: [
      { type:'心法', title:'荣耀与枷', imageKey:'inner',
        desc:'你读史，见多少世家因骄而败。\n『富贵传家，不过三代。』先人早诫。\n\n你悟：荣耀是盔甲，也是枷锁。\n戴久了，易忘了自己本是谁。\n\n你立誓：做姓氏的脊，不做姓氏的囚。',
        effects:{ zhihui:3, xinjing:1 } },
      { type:'心法', title:'担当之重', imageKey:'reading',
        desc:'父亲病中托你管一季租税。\n你减了灾年之租，自家贴补。\n族人怨你『败家』，你不言。\n\n你知：真正的担当，\n常不被理解，却问心无愧。\n账平那日，你瘦了一圈，却稳了一寸。',
        effects:{ xiaoyi:2, zhihui:2 } },
      { type:'心法', title:'谦光自牧', imageKey:'taiji',
        desc:'宴上有人夸你『世家风仪』。\n你起身一揖：『不过是家教严些。』\n满座更敬。\n\n你懂：真正贵气，从不在人前耀，\n而在人前低得下头。\n谦，不是弱，是装得下天地。',
        effects:{ xinjing:2, zhihui:2 } }
    ],
    events: [
      { title:'族田纠纷', imageKey:'calligraphy',
        narrative:'佃户因灾恳免租，管事欲强收。族人看你如何断。',
        choices:[
          { text:'奏请减租，自家补亏', result:'你减租赈灾，虽损岁入，佃户感泣，来年倍勤。父亲赞你『有宰相量』。', effects:{ xiaoyi:3, zhihui:1 } },
          { text:'依律收租，恩威并施', result:'你准缓交不减免，既全规矩又显仁厚。族人服其明。', effects:{ zhihui:2, caiyi:1 } }
        ] },
      { title:'门第联姻', imageKey:'inn',
        narrative:'世交来求亲，欲结两姓之好。父母属意，问你心意。',
        choices:[
          { text:'以家族大义允之', result:'你应下亲事，换得两族守望。你知，有些选择本不由己。', effects:{ zhihui:2, xinjing:1 } },
          { text:'婉拒，求自在之身', result:'你婉言辞婚，父母愠而终谅。你守住了半分自我。', effects:{ xinjing:2, xiaoyi:1 } }
        ] },
      { title:'仇家寻隙', imageKey:'sword',
        narrative:'夜中刺客入府，直奔你书房。你察觉，短兵相接。',
        choices:[
          { text:'生擒问明主使', result:'你以家传剑法制住刺客，查出仇家，却未杀——留一线，免结死仇。', effects:{ wuli:3, zhihui:1 } },
          { text:'护母突围，弃财保人', result:'你舍了库房金银，护母安然出府。你知，人比财重。', effects:{ xiaoyi:2, wuli:2 } }
        ] }
    ]
  },

  // ========== 书院学子 ==========
  shuyuan: {
    mornings: [
      { type:'诵读', title:'晨读经史', imageKey:'reading',
        desc:'寅时即起，你于书斋朗声诵读。\n《论语》《孟子》《左传》，一字一句，唇齿生香。\n\n同窗犹眠，你已温书三卷。\n学子之苦，在枯燥；学子之乐，\n亦在枯燥里嚼出回甘。\n\n晨光入窗，你合卷长舒——今日，又多懂了一分天下。',
        effects:{ xueshi:3, zhihui:1 } },
      { type:'临帖', title:'晨起临帖', imageKey:'calligraphy',
        desc:'你铺纸研墨，临《兰亭》百字。\n起笔藏锋，行笔中锋，收笔回锋。\n\n字如其人——你写的是字，\n练的是沉得住气的性子。\n\n一柱香后，竟得一行神似。\n你笑：原来耐心，也是能练出来的。',
        effects:{ caiyi:2, xinjing:2 } },
      { type:'思辨', title:'灯下问难', imageKey:'reading',
        desc:'昨夜读书生疑：『民贵君轻』，岂非悖逆？\n今晨你寻山长辩之。\n\n山长不答，反问：『汝以何为国？』\n你怔住，忽有所悟——\n国非一家一姓，乃天下生民。\n\n你躬身：学生，今日方知『问』字之重。',
        effects:{ zhihui:3, xueshi:1 } }
    ],
    cores: [
      { type:'策论', title:'草拟策论', imageKey:'calligraphy',
        desc:'你铺开长卷，论治河之策。\n引古证今，条分缕析。\n一篇千言，字字关民生。\n\n你知：书生手中笔，\n重可抵十万兵。\n一篇好策，能活一方百姓。\n\n搁笔时，天已微白。你揉腕：值。',
        effects:{ xueshi:3, zhihui:2 } },
      { type:'论辩', title:'书院论会', imageKey:'reading',
        desc:'今日论题：『法治与人治，孰为先？』\n你起而立论，引经据典，滔滔不绝。\n\n对方学子据理反驳，你从容接招。\n唇枪舌剑间，真理愈辩愈明。\n\n山长评：『辩不在胜，在明理。』\n你记下了。',
        effects:{ zhihui:3, caiyi:1 } },
      { type:'算学', title:'推演算术', imageKey:'weiqi',
        desc:'你习《九章》，算田亩赋税、差分均输。\n算至『勾股』，以竿测塔高，分毫不差。\n\n你悟：治国需算学，\n不知数，便不知民力几何。\n书生不止会之乎者也，\n亦要算得清天下账。',
        effects:{ zhihui:2, xueshi:2, caiyi:1 } }
    ],
    bodies: [
      { type:'体魄', title:'晨间舒体', imageKey:'taiji',
        desc:'你虽文弱，亦知身体是载道之器。\n每日习五禽戏，舒展筋骨。\n\n同窗笑你『书呆养生』，你不与辩。\n你知：没有好身子，\n读再多的书，也撑不到用世那日。',
        effects:{ wuli:1, xinjing:2 } },
      { type:'静养', title:'静坐养神', imageKey:'meditation',
        desc:'你于古柏下静坐，调息凝神。\n读书人最易耗神，故需以静养之。\n\n一刻钟后，眼明心清。\n你觉：静，不是停，\n是把散乱的自己，收回来。',
        effects:{ xinjing:3 } }
    ],
    wisdoms: [
      { type:'心法', title:'为学之序', imageKey:'reading',
        desc:'你读朱子：『循序而渐进，熟读而精思。』\n想起自己急于求成，往往半途。\n\n你改：一日只精一事，不贪多。\n月余，反觉进境更快。\n\n你记：学问如登山，\n莫嫌步子小，只怕停下脚。',
        effects:{ xueshi:2, zhihui:2 } },
      { type:'心法', title:'忧乐天下', imageKey:'landscape',
        desc:'你读范公『先天下之忧而忧』，热血上涌。\n书生虽弱，胸中当有天下。\n\n你暗誓：他日若得用世，\n必不负这灯下读过的万卷。\n\n窗外风雨，你忽觉——\n这风雨里，有无数待你济的苍生。',
        effects:{ xiaoyi:2, zhihui:2 } },
      { type:'心法', title:'不耻下问', imageKey:'taiji',
        desc:'你遇一樵夫，竟解得你三日之惑。\n你初矜持，后释然躬问。\n\n你悟：道在天下，不在书里独尊。\n农夫、匠人、商贾，皆可为师。\n\n你删去心中那点『读书人傲气』。',
        effects:{ zhihui:2, xinjing:1 } }
    ],
    events: [
      { title:'科场献策', imageKey:'calligraphy',
        narrative:'州试加策问，考官出『灾年赈济』之题，限你当场作答。',
        choices:[
          { text:'上《平价粜粮疏》', result:'你从容献策，条分缕析。考官击节，取你为案首。你知，此策将活人。', effects:{ xueshi:3, zhihui:1 } },
          { text:'直言弊政，不惜触讳', result:'你直言县令瞒灾，虽险却得清流赏识。你守住了书生风骨。', effects:{ xiaoyi:2, xueshi:1 } }
        ] },
      { title:'同窗有难', imageKey:'inn',
        narrative:'贫寒同窗病倒，无钱请医，将辍学。',
        choices:[
          { text:'典衣集资，延医救之', result:'你典了冬衣，偕众助学。同窗得愈，泣受恩。你知，同窗即同道。', effects:{ xiaoyi:3, caiyi:1 } },
          { text:'代其抄书卖钱', result:'你夜抄典籍换钱，既救同窗又练了字。一举两得。', effects:{ caiyi:2, xueshi:1 } }
        ] },
      { title:'乡民问字', imageKey:'reading',
        narrative:'乡民持地契来，求你辨一字之伪，契关良田十亩。',
        choices:[
          { text:'细辨笔迹，力证其伪', result:'你据字学断契为伪，乡民保住田产，跪谢。你知，识字亦能活人。', effects:{ xueshi:3, xiaoyi:1 } },
          { text:'教乡民识字自护', result:'你不只辨契，更教数人识字。授人以渔，惠泽更长。', effects:{ xueshi:2, zhihui:1 } }
        ] }
    ]
  },

  // ========== 医者 ==========
  yizhe: {
    mornings: [
      { type:'采药', title:'晨入药山', imageKey:'herb',
        desc:'你背药篓入山，露水打湿布鞋。\n辨桔梗、挖黄精、采金银花。\n一草一木，皆是救命之物。\n\n老药农教你看『望形识性』：\n叶背泛红者清热，根须黏者补脾。\n\n你记：医者之知，\n不在书，在天地四时的馈赠里。',
        effects:{ xueshi:2, zhihui:1, xinjing:1 } },
      { type:'诵方', title:'晨诵汤头', imageKey:'reading',
        desc:'你诵《汤头歌诀》，四百方烂熟于心。\n『麻黄汤中用桂枝，杏仁甘草四般施。』\n\n方剂如阵法，君臣佐使，各司其职。\n你渐懂：用药如用兵，\n贵在配伍得宜，不贵在猛。\n\n诵毕，你为昨夜那桩疑症，又添一分把握。',
        effects:{ xueshi:3, caiyi:1 } },
      { type:'净手', title:'焚香净室', imageKey:'temple',
        desc:'你于诊室焚一炷安息香，净手静心。\n医者之手，将触生死，不可不敬。\n\n你闭目片刻，把杂念滤去。\n待第一位病人进门，\n你眼中只剩『病』与『人』，\n再无自己。',
        effects:{ xinjing:3 } }
    ],
    cores: [
      { type:'诊脉', title:'细究脉象', imageKey:'herb',
        desc:'今日你随师临证，遇一妇久咳。\n你三部九候，细辨脉之浮沉迟数。\n\n师问：『何证？』你答：『非风寒，乃忧思伤肺。』\n师颔首，嘱以逍遥散加减。\n\n你悟：脉不会骗人，\n骗人的是医者不够静的心。',
        effects:{ xueshi:2, zhihui:2, xinjing:1 } },
      { type:'施针', title:'银针渡穴', imageKey:'herb',
        desc:'你为患者施『银针渡穴』。\n取穴如取敌要害，一针定乾坤。\n\n针入三里，患者旧疾之痛顿缓。\n他涕零：『十年顽疾，一针而松。』\n\n你收针：『非针之神，是穴之准，\n与汝信医之心。』',
        effects:{ caiyi:2, xueshi:2, wuli:1 } },
      { type:'制药', title:'炮制药材', imageKey:'herb',
        desc:'你于药庐炮制：蒸、炒、炙、煅，各有火候。\n一味生地黄，九蒸九晒方成熟地，温补而不腻。\n\n你守炉半日，不敢离。\n医者之仁，\n常藏在旁人看不见的火候里。',
        effects:{ caiyi:2, xueshi:1, xinjing:1 } }
    ],
    bodies: [
      { type:'身法', title:'夜行送药', imageKey:'moonNight',
        desc:'深夜急召，你提灯涉水赴邻村救产难。\n山路滑，你跌了两次，药箱却护得紧。\n\n抵时，你已满身泥，手却稳。\n接生、止血、定惊，一气呵成。\n\n婴儿啼声起，你累坐门槛：值。',
        effects:{ wuli:2, xiaoyi:2 } },
      { type:'养生', title:'导引吐纳', imageKey:'taiji',
        desc:'你习导引术，以养己身。\n医者先医己，方能医人。\n\n你运转周天，觉精气渐充。\n暗忖：若自己病骨支离，\n何谈悬壶？养生，亦是医道一端。',
        effects:{ wuli:1, xinjing:2 } }
    ],
    wisdoms: [
      { type:'心法', title:'大医精诚', imageKey:'inner',
        desc:'你读孙思邈：『见彼苦恼，若己有之。』\n医者无贫富亲疏，唯有病痛轻重。\n\n你记一桩：昔年拒诊豪绅，反救路边乞儿。\n人问何故，你答：『乞儿等不得。』\n\n精诚二字，是你一生准绳。',
        effects:{ xiaoyi:3, xinjing:1 } },
      { type:'心法', title:'生死之畏', imageKey:'observe',
        desc:'你首次见死，手抖而不能针。\n师言：『怕，是医者最初的课。\n怕，才知手中是命，不是木偶。』\n\n你反复练胆，终能于慌中定。\n你懂：不惧死，便轻命；\n惧死而仍能行，才是真勇。',
        effects:{ xinjing:3, zhihui:1 } },
      { type:'心法', title:'药外之心', imageKey:'inner',
        desc:'有一妇，药石罔效。你查，方知其为夫所弃，心病也。\n你不止开方，更常去话其家常。\n月余，妇自愈。\n\n你悟：有时药不及一言。\n医者手里是针，心里该有火——\n那火，叫慈悲。',
        effects:{ xiaoyi:2, xinjing:2 } }
    ],
    events: [
      { title:'疫起乡里', imageKey:'herb',
        narrative:'邻村突发时疫，患者发热呕泻，一日数人。',
        choices:[
          { text:'冒险入村施救，自拟方', result:'你辨为湿热，立方普济，活者甚众。你名动乡野，却瘦脱形。', effects:{ xiaoyi:3, xueshi:2 } },
          { text:'先报官请封村隔离', result:'你冷静封村、疏汤药，止疫于初。你知，治未病胜治已病。', effects:{ zhihui:2, xiaoyi:1 } }
        ] },
      { title:'贫者求医', imageKey:'temple',
        narrative:'一贫者携子来，子病重却无钱，跪地不起。',
        choices:[
          { text:'免诊施药，倾囊相助', result:'你免费诊治，又赠银为归资。贫者叩首。你知，医者本分。', effects:{ xiaoyi:3, caiyi:1 } },
          { text:'收徒代诊，教其自助', result:'你收贫者为徒，授采药之术。授渔之惠，长远于施银。', effects:{ xueshi:2, zhihui:1 } }
        ] },
      { title:'误诊之愧', imageKey:'stream',
        narrative:'你一时误判，险致一老者药误。幸师及时更正。',
        choices:[
          { text:'公开己过，立誓精进', result:'你自陈其失于同门，引为戒。师言：『肯认错，方成良医。』', effects:{ zhihui:2, xinjing:1 } },
          { text:'埋首重读医典', result:'你闭门三月，专攻脉理，从此诊疾更慎。愧，成了你的师。', effects:{ xueshi:3 } }
        ] }
    ]
  },

  // ========== 琴师 ==========
  qinshi: {
    mornings: [
      { type:'抚琴', title:'晨抚一曲', imageKey:'guqin',
        desc:'你于窗下理弦，弹《仙翁操》一遍。\n弦弦清越，如山泉漱石。\n\n你觉：晨起抚琴，不是练技，\n是调心——把一夜的浊气，弹出去。\n\n曲终，你神清气爽。\n原来琴，是琴师的第一味药。',
        effects:{ caiyi:3, xinjing:2 } },
      { type:'听音', title:'辨音习律', imageKey:'guqin',
        desc:'你习十二律吕，以管校弦。\n黄钟之宫，林钟之徵，丝毫不差。\n\n师言：『律正，则心正；心正，则音正。』\n你反复校，直校到耳能辨毫厘。\n\n你悟：琴师之耳，\n比琴师之手更要紧。',
        effects:{ caiyi:2, xueshi:1, xinjing:1 } },
      { type:'净心', title:'焚香静坐', imageKey:'temple',
        desc:'你焚一炷沉水，对琴静坐。\n未弹先静，是琴师规矩。\n\n你听窗外风声、檐马铃声，\n皆成天然之韵。\n\n你笑：原来天地本有一张琴，\n你手中的，只是它的回响。',
        effects:{ xinjing:3 } }
    ],
    cores: [
      { type:'琴艺', title:'习《阳关》', imageKey:'guqin',
        desc:'你习《阳关三叠》，送别之曲。\n『劝君更尽一杯酒，西出阳关无故人。』\n\n你初弹只得其调，后弹得其情。\n送客时弹之，客竟泪下。\n\n你懂：琴之高低，\n不在指法繁简，在有没有『人』。',
        effects:{ caiyi:3, xinjing:2 } },
      { type:'琴艺', title:'即兴操缦', imageKey:'guqin',
        desc:'今无谱，你依当下心境随手成调。\n闻雨则雨，闻喜则喜。\n\n师言：『谱是死的，心是活的。\n能离谱而不乱，方入化境。』\n你第一次，弹出了只属于自己的声音。',
        effects:{ caiyi:3, zhihui:1 } },
      { type:'琴艺', title:'对月独奏', imageKey:'moonNight',
        desc:'月圆之夜，你临水独奏。\n琴声与月色、水声相和，分不清谁是谁。\n\n你忽觉：此刻无听众，\n琴却弹得最好——\n因为弹给了天地，也弹给了自己。',
        effects:{ caiyi:2, xinjing:3 } }
    ],
    bodies: [
      { type:'养指', title:'养甲调息', imageKey:'taiji',
        desc:'琴师重甲，你以凤仙花汁养甲，又以温水舒指。\n指柔而韧，方按得长吟。\n\n你亦习吐纳，使臂不酸、气不断。\n你知：好琴音，\n是从放松的身体里流出来的。',
        effects:{ caiyi:1, xinjing:2 } },
      { type:'身韵', title:'抚琴之姿', imageKey:'landscape',
        desc:'你练『沉肩坠肘、虚灵顶劲』之姿。\n抚琴非坐定便罢，身正则气顺，气顺则音清。\n\n对镜自正，竟得几分仙风。\n你笑：琴师的身，\n本就是一曲无声的琴。',
        effects:{ caiyi:2, xinjing:1 } }
    ],
    wisdoms: [
      { type:'心法', title:'琴者情也', imageKey:'inner',
        desc:'你读《琴论》：『琴者，情也。』\n同一曲，欢者弹之则悦，悲者弹之则哀。\n\n你悟：琴是心的镜子。\n你想藏的情绪，琴都替你说了。\n\n于是你学：先正己心，再抚琴弦。',
        effects:{ caiyi:2, xinjing:2 } },
      { type:'心法', title:'大音希声', imageKey:'taiji',
        desc:'师弹一曲，将至妙处，忽止。\n你问其故，师曰：『余韵在无声处。』\n\n你思老聃『大音希声』，豁然。\n最好的琴音，\n有时是那一个停下来的休止。\n\n你学会：留白，亦是琴。',
        effects:{ xinjing:3, zhihui:1 } },
      { type:'心法', title:'知音之难', imageKey:'stream',
        desc:'你遍弹于人前，懂者寥寥。\n你曾怅然：『世无钟子期，奈何操琴？』\n\n师言：『你弹给山水听，便不孤。\n且你弹的，本也不是给人懂的，\n是给你自己安心的。』\n你遂释然。',
        effects:{ xinjing:3 } }
    ],
    events: [
      { title:'知音来访', imageKey:'guqin',
        narrative:'一陌生客闻琴而来，言『此曲有缺，第三叠当转羽』。你惊其识货。',
        choices:[
          { text:'虚心得教，改谱相和', result:'你纳其言，琴艺更进一层。你叹：真知音，或在陌路。', effects:{ caiyi:3, zhihui:1 } },
          { text:'邀其共谱新声', result:'你与客合创一曲，传为美谈。琴师的幸，莫过于此。', effects:{ caiyi:2, xiaoyi:1 } }
        ] },
      { title:'王侯索乐', imageKey:'inn',
        narrative:'一权贵强邀你入府为专职琴伶，许以重金。',
        choices:[
          { text:'婉拒，守琴之自由', result:'你辞金而退：琴非娱人之具。权贵虽愠，你心安。', effects:{ xinjing:2, xiaoyi:1 } },
          { text:'赴宴一曲即辞', result:'你赴宴弹《广陵》明志，曲终飘然而去。不辱琴，亦不结怨。', effects:{ caiyi:2, zhihui:1 } }
        ] },
      { title:'抚琴退敌', imageKey:'sword',
        narrative:'流寇围庄，喧哗不止。你登墙抚《十面》之肃杀，声震四野。',
        choices:[
          { text:'以杀伐之音夺其气', result:'琴声如千军，寇疑有伏，惊退。你以琴退兵，传为奇谈。', effects:{ caiyi:3, wuli:1 } },
          { text:'改弹安魂之曲', result:'你转《普庵》，寇竟渐静，首领叹『此非战场』而退。琴化干戈。', effects:{ caiyi:2, xinjing:2 } }
        ] }
    ]
  },

  // ========== 剑客 ==========
  jianke: {
    mornings: [
      { type:'练剑', title:'晨挥百剑', imageKey:'sword',
        desc:'寅时，你于庭中挥剑百次。\n每一式都求准、求稳、求快。\n汗坠如雨，剑光如练。\n\n师言：『剑客的剑，是练出来的，\n不是想出来的。』\n你信。万遍之后，手自有记忆。\n\n百剑毕，你觉臂更沉，心更定。',
        effects:{ wuli:4, xinjing:1 } },
      { type:'悟剑', title:'观剑冢', imageKey:'sword',
        desc:'你立于后山剑冢前，万千断剑埋于黄土。\n皆是前辈葬于此地的骄傲与遗憾。\n\n你摸一截锈剑：『你败在何处？』\n风过，似有回音。\n你悟：剑客最大的敌，\n从来不是别人，是自己那点不甘。',
        effects:{ wuli:2, zhihui:2 } },
      { type:'凝神', title:'临流照剑', imageKey:'stream',
        desc:'你临溪而立，以水面为镜，观剑亦观己。\n水静时，剑影分明；水乱时，剑影亦乱。\n\n你悟：心乱则剑乱，心静则剑明。\n自此每日先静心，再出手。\n\n溪声潺潺，是你最好的陪练。',
        effects:{ xinjing:3, wuli:1 } }
    ],
    cores: [
      { type:'剑道', title:'参无影诀', imageKey:'sword',
        desc:'你习家传『无影剑诀』第一重：人剑合一。\n手中是剑，心中亦是剑。\n\n你闭目试之，竟能于黑暗中刺中悬叶。\n师言：『此重易成，难在放下。』\n你不解，却记下。\n\n剑道之门，你刚推开一条缝。',
        effects:{ wuli:3, xinjing:2 } },
      { type:'剑道', title:'以木代剑', imageKey:'bamboo',
        desc:'师令你弃真剑，以木枝对敌三月。\n你初不耐：木枝何能战？\n\n月余，你发现：无锋之枝，\n逼你以巧胜力、以静制动。\n\n你忽懂：剑客之强，\n不在剑利，在人心活。',
        effects:{ wuli:3, zhihui:1 } },
      { type:'剑道', title:'独斗群木', imageKey:'bamboo',
        desc:'你入竹林，以竹为敌，左右腾挪。\n竹影如千剑齐至，你于隙中穿行。\n\n师观之：『善。剑客要的，\n是在乱中不乱的本事。』\n你浑身是汗，却笑得畅快。',
        effects:{ wuli:4 } }
    ],
    bodies: [
      { type:'体魄', title:'负剑长跑', imageKey:'bamboo',
        desc:'你负剑奔山道十里，练腿力亦练肺。\n剑客之力，不在一时的猛，\n在能打到最后一刻的耐久。\n\n归来时腿颤，你却觉——\n体内那股气，比昨日长了一截。',
        effects:{ wuli:3 } },
      { type:'体魄', title:'石锁练臂', imageKey:'taiji',
        desc:'你举石锁百次，臂肌渐紧。\n剑要稳，先要臂有根。\n\n你知：花巧的剑招，\n根基都在这点笨力气上。\n无根之剑，风一吹就散。',
        effects:{ wuli:3, xinjing:1 } }
    ],
    wisdoms: [
      { type:'心法', title:'三境之始', imageKey:'inner',
        desc:'师授剑道三境。\n第一境人剑合一，你已在；\n第二境剑我两忘，你遥望；\n第三境无剑无我，你只敢想。\n\n你立誓：此生必要摸到第二境的门。\n哪怕穷尽岁月。',
        effects:{ wuli:2, xinjing:2 } },
      { type:'心法', title:'不逞之勇', imageKey:'taiji',
        desc:'你曾因一时意气，伤一无辜。\n夜不能寐，师言：『真剑客，不欺弱，不逞强。\n剑出，是为了该出之时。』\n\n你从此戒急。\n你懂：能收住剑的人，\n比拔剑的人，更难。',
        effects:{ xinjing:3, xiaoyi:1 } },
      { type:'心法', title:'剑与生死', imageKey:'sword',
        desc:'你首杀一人，呕至深夜。\n师抱你：『杀，是剑客的劫。\n劫后要么成魔，要么成佛。\n你选后者——记住这条命的分量。』\n\n你将那夜刻入骨。\n自此出手，更慎一分。',
        effects:{ xinjing:3, zhihui:1 } }
    ],
    events: [
      { title:'擂台争锋', imageKey:'sword',
        narrative:'江湖擂台，一狂徒连败数人，指名要与你一战。',
        choices:[
          { text:'登台以巧破力', result:'你不硬接，以无影诀游走，三招制其腕。全场喝彩，你却未伤其性命。', effects:{ wuli:3, zhihui:1 } },
          { text:'谦退不战', result:'你笑言『技不如人』拂袖去。狂徒失了彩头，你得了清名。', effects:{ xinjing:2, caiyi:1 } }
        ] },
      { title:'旧仇寻来', imageKey:'moonNight',
        narrative:'灭门仇家之子寻至，约你悬崖决战，言『今日了断』。',
        choices:[
          { text:'应战而以德报', result:'你胜而不杀，言『父债不子偿』。仇家子怔而立誓退隐。你放了心魔。', effects:{ wuli:3, xiaoyi:2 } },
          { text:'先问清当年真相', result:'你未急于战，反查出当年误会。仇怨化烟，你免铸大错。', effects:{ zhihui:3, xinjing:1 } }
        ] },
      { title:'护送孤童', imageKey:'inn',
        narrative:'你受托护一遗孤赴少林，途中遇劫匪欲夺孩。',
        choices:[
          { text:'以剑开道，护孩周全', result:'你剑光所至，匪不敢近。孤童安然抵寺。你以剑护了最弱的人。', effects:{ wuli:3, xiaoyi:2 } },
          { text:'佯败诱敌，智取保', result:'你佯装不敌引匪入伏，借地形退敌。勇之外，你更懂谋。', effects:{ zhihui:2, wuli:2 } }
        ] }
    ]
  },

  // ========== 隐士 ==========
  yinshi: {
    mornings: [
      { type:'观天', title:'晨起观云', imageKey:'landscape',
        desc:'你倚柴扉，看云卷云舒。\n一云如山，一云如帆，转眼又散。\n\n你悟：世间诸相，\n莫不如此——聚散无常，执之何益。\n\n你看云，云不知；\n你看破，云自在。\n这便是隐者的第一堂课：不执着。',
        effects:{ xinjing:3, zhihui:1 } },
      { type:'躬耕', title:'晨耘菜畦', imageKey:'bamboo',
        desc:'你荷锄至菜畦，拔草、培土、引泉。\n双手沾泥，心里却清。\n\n你觉：耕种最是修行——\n你种什么，便得什么，\n不欺，不伪，不急。\n\n一畦青蔬，胜却万卷浮名。',
        effects:{ xinjing:2, wuli:1 } },
      { type:'煮茶', title:'松下煮茗', imageKey:'temple',
        desc:'你拾松枝煮泉，瀹一壶粗茶。\n水初沸如鱼目，再沸缘边如涌泉。\n\n你啜一口，山风入喉。\n忽觉：茶之味不在贵，\n在煮茶人那个『闲』字。\n\n闲，不是懒，是心不被事牵。',
        effects:{ xinjing:3 } }
    ],
    cores: [
      { type:'隐修', title:'临溪独钓', imageKey:'stream',
        desc:'你坐溪畔垂钓，实非为鱼。\n竿静、水静、心静，三静合一。\n\n日暮无获，你却满足。\n师言：『钓者之意，\n在不在鱼。得其意，便不空归。』\n你收竿：今日，钓到了一个『无』字。',
        effects:{ xinjing:3, zhihui:1 } },
      { type:'隐修', title:'访旧友僧', imageKey:'temple',
        desc:'你踏落叶访山中老僧，对坐无言，共饮一瓯。\n不言而契，是隐者之交。\n\n归途你思：世人千方百计要说话，\n隐者却惜字如金——\n因为有些境地，\n一说就破。',
        effects:{ xinjing:2, zhihui:2 } },
      { type:'隐修', title:'夜观星象', imageKey:'moonNight',
        desc:'你夜卧石上，数天上星。\n银河横斜，人间如蚁。\n\n你忽觉：平生得失，\n在这苍穹下，不过一瞬微尘。\n何必较真？\n你笑，把烦恼都还给了夜风。',
        effects:{ xinjing:3, zhihui:1 } }
    ],
    bodies: [
      { type:'导引', title:'五禽戏身', imageKey:'taiji',
        desc:'你仿五禽之戏：熊之沉、鸟之轻、鹿之舒。\n身随自然，不争不抗。\n\n一套毕，四肢温润。\n你知：隐者不练杀伐之武，\n练的是与天地同息的柔劲。',
        effects:{ wuli:1, xinjing:2 } },
      { type:'采药', title:'山行采薇', imageKey:'herb',
        desc:'你入深山采薇蕨，权当散步。\n山气日夕佳，飞鸟相与还。\n\n你觉：行走山林，\n本就是一味养心的药。\n归来筐中有菜，心中有安。',
        effects:{ xinjing:2, xueshi:1 } }
    ],
    wisdoms: [
      { type:'心法', title:'大隐于市', imageKey:'inner',
        desc:'友问：『何不归山，偏居市隅？』\n你答：『小隐隐于野，大隐隐于市。\n心若超然，闹市亦深山。』\n\n你悟：隐，不是躲，\n是身在何处，心都不被绊住。\n\n真正的隐士，在人群里，也孤独得自由。',
        effects:{ xinjing:3, zhihui:2 } },
      { type:'心法', title:'无用之用', imageKey:'taiji',
        desc:'你读庄生：『无用之大用。』\n世人争有用，你独守无用。\n一株不开花的老树，因无用而得终其天年。\n\n你笑：我这一生『无用』，\n却也因此，少了许多刀兵加身。\n无用，原来是种保全。',
        effects:{ zhihui:3, xinjing:1 } },
      { type:'心法', title:'知足之足', imageKey:'observe',
        desc:'你一箪食一瓢饮，人不堪其忧，你不改其乐。\n非矫情，是真知足。\n\n你算过：日需不过三餐、夜需不过一榻。\n多余的，皆是负。\n你放下，于是轻。\n轻，才能走得远，也活得久。',
        effects:{ xinjing:3, xiaoyi:1 } }
    ],
    events: [
      { title:'朝廷征辟', imageKey:'inn',
        narrative:'官府闻你贤名，遣使持诏，聘你出山为官。',
        choices:[
          { text:'婉拒，守此清贫', result:'你辞诏：『草民疏懒，不堪驱使。』使者叹惋而去。你守住了自由。', effects:{ xinjing:3, zhihui:1 } },
          { text:'荐友代己', result:'你举隐中贤友自代，既全朝廷面，亦不污己志。圆融之隐。', effects:{ zhihui:2, xiaoyi:1 } }
        ] },
      { title:'迷途客至', imageKey:'stream',
        narrative:'一失路书生投宿你家，愁眉不展，言功名落空。',
        choices:[
          { text:'以淡泊点化之', result:'你与之看云、煮茶，不言教而教。书生豁然：『原来路不止一条。』', effects:{ zhihui:2, xiaoyi:1 } },
          { text:'留宿赠资，送其归', result:'你资其盘缠，送行于渡口。书生拜别，你归去，心中无波。', effects:{ xiaoyi:2, xinjing:1 } }
        ] },
      { title:'山火临庐', imageKey:'landscape',
        narrative:'野火延山，将及你茅庐与邻庵。',
        choices:[
          { text:'先助邻庵转移', result:'你舍己庐，先护邻庵经卷。庐虽焚，你无憾——物可重建，经难再得。', effects:{ xiaoyi:3, xinjing:1 } },
          { text:'掘沟隔火保两家', result:'你冷静掘防火沟，保住两处。隐者亦有用世之智。', effects:{ zhihui:2, wuli:1 } }
        ] }
    ]
  }
};
