const BASE = import.meta.env.BASE_URL;

const products = [
  //節慶禮盒
  {
    id: "festival-001",
    name: "聖誕鐵盒餅乾",
    price: 680,
    images: [`${BASE}productsImage/festival-001.jpg`],
    description: ` ｜🎄聖誕造型鐵盒餅乾｜
    尺寸：13.5×13.5cm，均附提袋

｜🌲鐵盒餅乾內容｜
蔓越莓牛軋方塊酥*6
開心果牛軋方塊酥*6
羅蜜亞餅乾*5
抹茶聖誕樹造型餅乾*2
原味聖誕小熊造型餅乾*2
貓舌餅乾*20g`,
    category: "festival",
  },
  {
    id: "festival-002",
    name: "牛軋餅綜合口味禮盒-18入",
    price: 360,
    images: [
      `${BASE}productsImage/festival-002.jpg`,
      `${BASE}productsImage/festival-002(1).jpg`,
    ],
    description: `｜原味/蔓越莓/巧克力/綠茶/咖啡/辣起司
  ｜規格:6入，每入兩份
   ｜保存期限:常溫兩週
  `,
    category: "festival",
  },
  {
    id: "festival-003",
    name: "貓舌鐵盒餅乾",
    price: 320,
    images: [
      `${BASE}productsImage/festival-003.jpg`,
      `${BASE}productsImage/festival-003(1).jpg`,
      `${BASE}productsImage/festival-003(2).jpg`,
    ],
    description: `｜貓舌餅乾鐵盒餅乾-200g+神秘壓模餅乾*2
      ｜口感酥脆，送禮自用兩相宜`,
    category: "festival",
  },

  //餅乾專區
  {
    id: "cookies-001",
    name: "牛軋餅",
    price: 180,
    images: [
      `${BASE}productsImage/cookies-001.jpg`,
      `${BASE}productsImage/cookies-001(1).jpg`,
      `${BASE}productsImage/cookies-001(2).jpg`,
      `${BASE}productsImage/cookies-001(3).jpg`,
    ],
    description: `｜一盒16入  
      ｜口味：原味、蔓越莓、巧克力、綠茶、咖啡、辣起司、綜合`,
    category: "cookies",
  },
  {
    id: "cookies-002",
    name: "莎布蕾綜合包",
    price: 260,
    images: [
      `${BASE}productsImage/cookies-002.jpg`,
      `${BASE}productsImage/cookies-002(1).jpg`,
    ],
    description: `｜16塊/一包
      ｜4種口味:原味/紅茶/巧克力杏仁/抹茶巧克力`,
    category: "cookies",
  },
  {
    id: "cookies-003",
    name: "杏仁瓦片",
    price: 150,
    images: [
      `${BASE}productsImage/cookies-003.jpg`,
      ` ${BASE}productsImage/cookies-003(1).jpg`,
      ,
    ],
    description: `｜12片/包 
    ｜滿滿的杏仁片製作而成，每一口都是杏仁的香味`,
    category: "cookies",
  },
  {
    id: "cookies-004",
    name: "貓舌餅乾(罐裝)",
    price: 180,
    images: [`${BASE}productsImage/cookies-004.jpg`],
    description:
      "一包100g左右，使用發酵奶油製作，味道有白色戀人的香味，喜歡奶香味的一定要買一包試試👍👍，好多小朋友都指定要吃這款❤️",
    category: "cookies",
  },
];

export default products;
