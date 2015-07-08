(function(){
    Frost.ItemManager.addItems([
        {
            name: 'Body',
            back: [
            ],
            front: [
                "HAIRBLKT.GIF",
                "BODY3.GIF",
                "BODY1.GIF",
                "HAIRBLKS.GIF",
                "BODYLIPS.GIF",
                "BODY2.GIF"
            ]
        },
        {
            name: 'Leather Pants',
            back: [
                "PANTS_4B.GIF"
            ],
            front: [
                "PANTS_4F.GIF",
                "PANTS_4L.GIF",
                "PANTS_4M.GIF"
            ],
            collisions: [
                {image: "BODY1.GIF", x: 54, y:157}
            ]
        },
        {
            name: 'Shirt',
            back: [
                "SHIRT5B.GIF",
                "SHIRT5RX.GIF",
                "SHIRT5LX.GIF"
            ],
            front: [
                "SHIRT5F.GIF",
                "SHIRT5R1.GIF",
                "SHIRT5L1.GIF"
            ],
            collisions: [
                {image: "BODY1.GIF", x: 11, y:66}
            ]
        },
        {
            name: 'Leather Boot Right',
            back: [],
            front: [
                "BOOT_6R.GIF"
            ],
            collisions: [
                {image: "BODY1.GIF", x: 63, y:292}
            ]
        },
        {
            name: 'Leather Boot Left',
            back: [],
            front: [
                "BOOT_6L.GIF"
            ],
            collisions: [
                {image: "BODY1.GIF", x: 115, y:294}
            ]
        },
        {
            name: 'Leather Belt',
            back: [
                "BELT_5B.GIF"
            ],
            front: [
                "BELT_5F.GIF"
            ],
            collisions: [
                {image: "BODY1.GIF", x: 56, y:186}
            ]
        },
        {
            name: 'Leather Glove Left',
            back: [],
            front: [
                "GLOV_5L.GIF"
            ],
            collisions: [
                {image: "BODY3.GIF", x: 154, y:124}
            ]
        },
        {
            name: 'Knife',
            back: [
            ],
            front: [
                "DAGGR1H1.GIF",
                "DAGGR1B1.GIF"
            ],
            collisions: [
                {image: "SHEATHD1.GIF", x: 1, y:0, front:["DAGGR1H2.GIF", "DAGGR2B2.GIF"], link:true},
                {image: "BODY2.GIF", x: -27, y:187, front:["DAGGR1H1.GIF", "DAGGR1B1.GIF"]},
                {image: "BODY3.GIF", x: 150, y:116, front:["DAGGR1H1.GIF", "DAGGR1B1.GIF"]}
            ]
        },
        {
            name: 'Knife Sheath',
            back: [],
            front: [
                "SHEATHD1.GIF"
            ],
            collisions: [
                {image: "BELT_5B.GIF", x: 19, y:-24}
            ]
        },
        {
            name: 'Hands',
            back: [
            ],
            front: [
                "BODY3F.GIF",
                "BODY2H.GIF"
            ]
        },
        {
            layer: "GLOV_5L.GIF",
            front: ["GLOV_5LF.GIF"]
        },
        {
            name: 'Leather Glove Right',
            back: [],
            front: [
                "GLOV_5R.GIF"
            ],
            collisions: [
                {image: "BODY2.GIF", x: 6, y:155}
            ]
        },
    ]);
})();