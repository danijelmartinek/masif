// Copyright © 2020, Danijel Martinek. All rights reserved. 
// This project was created by Danijel Martinek (danijel@martinek.xyz) 

const hexToRGBA = (h: string, a: number): string => {
	let r: number | string = 0, g: number | string = 0, b: number | string = 0;

    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

    // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }
    
    return "rgba("+ +r + "," + +g + "," + +b + "," + String(a) + ")";
};

export {
    hexToRGBA
}